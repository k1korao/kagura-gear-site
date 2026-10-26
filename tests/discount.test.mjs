import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const instant = "2026-10-27T12:00:00.000Z";
const campaign = {
  __typename: "DiscountCodeBasic", status: "ACTIVE",
  startsAt: "2026-10-01T00:00:00Z", endsAt: "2026-11-01T00:00:00Z",
  usageLimit: 100, asyncUsageCount: 20,
  customerGets: { value: { __typename: "DiscountPercentage", percentage: 0.15 } },
};
const payloadFor = (discount) => ({ data: { codeDiscountNodeByCode: { codeDiscount: discount } } });

// The real route and server library run in isolation with a fixed clock.
// Only this test harness supplies mocked fetch/env; application code has no mock mode.
function loadRoute({ env = {}, payload = payloadFor(campaign), responseStatus = 200, failure, timeout = false, rawResponse } = {}) {
  const requests = [];
  const timeouts = [];
  const cache = new Map();
  class FixedDate extends Date {
    constructor(...args) { super(...(args.length ? args : [instant])); }
    static now() { return Date.parse(instant); }
  }
  const context = vm.createContext({
    Date: FixedDate, URL, Headers, Request, Response, TextDecoder,
    AbortSignal: { timeout(ms) {
      timeouts.push(ms);
      return timeout ? AbortSignal.abort(new DOMException("test timeout", "TimeoutError")) : AbortSignal.timeout(ms);
    } },
    process: { env: {
      SHOPIFY_STORE_DOMAIN: "kikora-test.myshopify.com",
      SHOPIFY_ADMIN_ACCESS_TOKEN: "test-only-secret",
      KIKORA_DROP_CODES: "PRIVATE-DROP, SECOND-CODE",
      ...env,
    } },
    fetch: async (url, options) => {
      requests.push({ url, options });
      options.signal.throwIfAborted();
      if (failure) throw failure;
      return new Response(rawResponse ?? JSON.stringify(payload), { status: responseStatus });
    },
  });
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const execute = vm.runInContext(`(function(exports, require, module) {\n${compiled}\n})`, context, { filename: file });
    execute(module.exports, (specifier) => {
      if (specifier === "server-only") return {}; // Next's server boundary marker, not provider behavior.
      if (specifier.startsWith("@/")) return load(path.join(root, "src", `${specifier.slice(2)}.ts`));
      throw new Error(`Unexpected import in discount tests: ${specifier}`);
    }, module);
    return module.exports;
  }
  return { route: load(path.join(root, "src/app/api/discount/route.ts")), requests, timeouts };
}

function request(body = { code: "PRIVATE-DROP" }, headers = {}, raw = false, url = "https://kikoragear.com/api/discount") {
  const requestHeaders = new Headers({ "Content-Type": "application/json", Origin: "https://kikoragear.com" });
  for (const [key, value] of Object.entries(headers)) {
    if (value === null) requestHeaders.delete(key);
    else requestHeaders.set(key, value);
  }
  return new Request(url, {
    method: "POST", headers: requestHeaders, body: raw ? body : JSON.stringify(body),
  });
}

test("an active allowlisted percentage returns the real discount and fixed Shopify shopping link", async () => {
  const { route, requests, timeouts } = loadRoute();
  const response = await route.POST(request({ code: " private-drop " }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  const result = await response.json();
  assert.deepEqual(result, {
    status: "valid", code: "PRIVATE-DROP", discount: { type: "percentage", value: 15 },
    checkoutUrl: "https://kikora-test.myshopify.com/discount/PRIVATE-DROP?redirect=/collections/all",
    endsAt: "2026-11-01T00:00:00.000Z",
  });
  assert.equal(requests.length, 1);
  const [{ url, options }] = requests;
  assert.equal(url, "https://kikora-test.myshopify.com/admin/api/2026-10/graphql.json");
  assert.equal(options.headers["X-Shopify-Access-Token"], "test-only-secret");
  assert.equal(options.method, "POST");
  assert.equal(options.cache, "no-store");
  assert.equal(options.redirect, "error");
  assert.deepEqual(JSON.parse(options.body).variables, { code: "PRIVATE-DROP" });
  assert.doesNotMatch(JSON.parse(options.body).query, /\bmutation\b/);
  assert.deepEqual(timeouts, [5000]);
  assert.doesNotMatch(JSON.stringify(result), /test-only-secret|SECOND-CODE|usageCount|remaining/);
});

for (const appliesOnEachItem of [false, true]) {
  test(`fixed amount preserves currency and per-item setting ${appliesOnEachItem}`, async () => {
    const { route } = loadRoute({ payload: payloadFor({ ...campaign, customerGets: { value: {
      __typename: "DiscountAmount", amount: { amount: "12.50", currencyCode: "USD" }, appliesOnEachItem,
    } } }) });
    const response = await route.POST(request());
    assert.equal(response.status, 200);
    assert.deepEqual((await response.json()).discount, { type: "amount", value: 12.5, currency: "USD", appliesOnEachItem });
  });
}

for (const [name, patch, expected] of [
  ["future start", { startsAt: "2026-10-28T00:00:00Z" }, "not_started"],
  ["provider scheduled", { status: "SCHEDULED" }, "not_started"],
  ["end time exactly now", { endsAt: instant }, "expired"],
  ["past end", { endsAt: "2026-10-26T00:00:00Z" }, "expired"],
  ["provider expired", { status: "EXPIRED" }, "expired"],
  ["observed exhausted count", { asyncUsageCount: 100 }, "expired"],
  ["count exceeds limit", { asyncUsageCount: 101 }, "expired"],
  ["no expiry", { endsAt: null }, "unavailable"],
  ["bad expiry", { endsAt: "not-a-date" }, "unavailable"],
  ["invalid interval", { startsAt: "2026-12-01T00:00:00Z" }, "unavailable"],
  ["no start", { startsAt: null }, "unavailable"],
  ["unlimited code", { usageLimit: null }, "unavailable"],
  ["zero limit", { usageLimit: 0 }, "unavailable"],
  ["fractional limit", { usageLimit: 1.5 }, "unavailable"],
  ["unknown usage", { asyncUsageCount: null }, "unavailable"],
  ["unknown status", { status: "OTHER" }, "unavailable"],
  ["non-Basic code", { __typename: "DiscountCodeBxgy" }, "unavailable"],
  ["invalid percentage", { customerGets: { value: { __typename: "DiscountPercentage", percentage: 1.1 } } }, "unavailable"],
  ["missing amount semantics", { customerGets: { value: { __typename: "DiscountAmount", amount: { amount: "10", currencyCode: "USD" } } } }, "unavailable"],
]) {
  test(`${name} fails closed as ${expected}`, async () => {
    const { route } = loadRoute({ payload: payloadFor({ ...campaign, ...patch }) });
    const response = await route.POST(request());
    assert.equal(response.status, expected === "unavailable" ? 503 : 400);
    assert.deepEqual(await response.json(), { status: expected });
  });
}

test("a count below the limit only checks the campaign and never decrements or returns remaining uses", async () => {
  const { route, requests } = loadRoute({ payload: payloadFor({ ...campaign, asyncUsageCount: 99 }) });
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await route.POST(request());
    assert.equal(response.status, 200);
    assert.equal("remaining" in await response.json(), false);
  }
  assert.equal(requests.length, 2);
  assert.equal(requests[0].options.body, requests[1].options.body);
});

for (const [name, env] of [
  ["missing domain", { SHOPIFY_STORE_DOMAIN: "" }],
  ["missing token", { SHOPIFY_ADMIN_ACCESS_TOKEN: "" }],
  ["missing campaign list", { KIKORA_DROP_CODES: "" }],
  ["malformed campaign list", { KIKORA_DROP_CODES: "PRIVATE-DROP,,SECOND-CODE" }],
  ["control character token", { SHOPIFY_ADMIN_ACCESS_TOKEN: "invalid\r\ntoken" }],
  ...["localhost", "example.com", "myshopify.com", "shop.myshopify.com.evil.example", "https://shop.myshopify.com", "shop.myshopify.com:443", "shop.myshopify.com/path", "a.b.myshopify.com"].map((domain) => [domain, { SHOPIFY_STORE_DOMAIN: domain }]),
]) {
  test(`${name} makes configuration unavailable without a provider call`, async () => {
    const { route, requests } = loadRoute({ env });
    const response = await route.POST(request());
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { status: "unavailable" });
    assert.equal(requests.length, 0);
  });
}

test("an unlisted code never queries the store", async () => {
  const { route, requests } = loadRoute();
  const response = await route.POST(request({ code: "OTHER-STORE-CODE" }));
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { status: "invalid" });
  assert.equal(requests.length, 0);
});

test("a code deleted in Shopify is invalid", async () => {
  const { route } = loadRoute({ payload: { data: { codeDiscountNodeByCode: null } } });
  const response = await route.POST(request());
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { status: "invalid" });
});

for (const [name, options] of [
  ["HTTP authorization failure", { responseStatus: 401 }],
  ["provider throttling", { responseStatus: 429 }],
  ["provider failure", { responseStatus: 500 }],
  ["GraphQL partial failure", { payload: { ...payloadFor(campaign), errors: [{ message: "sensitive provider details" }] } }],
  ["malformed response", { rawResponse: "not JSON" }],
  ["missing data", { payload: {} }],
  ["network exception", { failure: new Error("sensitive provider details") }],
  ["provider timeout", { timeout: true }],
]) {
  test(`${name} returns only unavailable`, async () => {
    const { route, requests } = loadRoute(options);
    const response = await route.POST(request());
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { status: "unavailable" });
    assert.equal(requests.length, 1);
  });
}

for (const body of [null, [], {}, { code: 123 }, { code: "" }, { code: "a".repeat(65) }, { code: "PRIVATE-DROP\n" }, { code: "PRIVATE DROP" }, { code: "<script>" }]) {
  test(`invalid input ${JSON.stringify(body)} reaches no provider`, async () => {
    const { route, requests } = loadRoute();
    const response = await route.POST(request(body));
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { status: "invalid" });
    assert.equal(requests.length, 0);
  });
}

for (const [name, body, headers, raw, status] of [
  ["malformed JSON", "{", {}, true, 400],
  ["missing content type", {}, { "Content-Type": null }, false, 415],
  ["form content type", {}, { "Content-Type": "application/x-www-form-urlencoded" }, false, 415],
  ["oversized declared body", {}, { "Content-Length": "1025" }, false, 413],
  ["oversized actual body", { code: "PRIVATE-DROP", extra: "x".repeat(1024) }, {}, false, 413],
  ["false length header", { code: "PRIVATE-DROP", extra: "x".repeat(1024) }, { "Content-Length": "20" }, false, 413],
  ["foreign origin", { code: "PRIVATE-DROP" }, { Origin: "https://evil.example" }, false, 403],
  ["null origin", { code: "PRIVATE-DROP" }, { Origin: "null" }, false, 403],
  ["originless cross-site fetch", { code: "PRIVATE-DROP" }, { Origin: null, "Sec-Fetch-Site": "cross-site" }, false, 403],
]) {
  test(`${name} is rejected before provider access`, async () => {
    const { route, requests } = loadRoute();
    const response = await route.POST(request(body, headers, raw));
    assert.equal(response.status, status);
    assert.deepEqual(await response.json(), { status: "invalid" });
    assert.equal(requests.length, 0);
  });
}

test("same-origin JSON with charset and originless server requests remain usable", async () => {
  const { route } = loadRoute();
  assert.equal((await route.POST(request({ code: "PRIVATE-DROP" }, { "Content-Type": "application/json; charset=utf-8" }))).status, 200);
  assert.equal((await route.POST(request({ code: "PRIVATE-DROP" }, { Origin: null }))).status, 200);
});

test("the actual Host permits a same-origin request when Next reconstructs an internal localhost URL", async () => {
  const { route, requests } = loadRoute({ env: { SHOPIFY_STORE_DOMAIN: "" } });
  const response = await route.POST(request(undefined, {
    Host: "127.0.0.1:3000", Origin: "http://127.0.0.1:3000",
  }, false, "http://localhost:3000/api/discount"));
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "unavailable" });
  assert.equal(requests.length, 0);
});

for (const [name, host, origin, extra] of [
  ["internal URL cannot override actual Host", "127.0.0.1:3000", "http://localhost:3000", {}],
  ["a different port is a different origin", "127.0.0.1:3000", "http://127.0.0.1:3001", {}],
  ["a different scheme is a different origin", "127.0.0.1:3000", "https://127.0.0.1:3000", {}],
  ["forwarded host does not authorize an origin", "127.0.0.1:3000", "https://evil.example", { "X-Forwarded-Host": "evil.example", Referer: "https://evil.example/" }],
  ["malformed authority is rejected", "127.0.0.1:3000@evil.example", "http://evil.example", {}],
  ["comma-separated authorities are rejected", "127.0.0.1:3000,evil.example", "http://evil.example", {}],
]) {
  test(name, async () => {
    const { route, requests } = loadRoute();
    const response = await route.POST(request(undefined, { Host: host, Origin: origin, ...extra }, false, "http://localhost:3000/api/discount"));
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), { status: "invalid" });
    assert.equal(requests.length, 0);
  });
}
