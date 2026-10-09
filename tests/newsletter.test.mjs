import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const team = ["jeremy@kikoragear.com", "official@kikoragear.com", "yimin@kikoragear.com"];
const fixedInstant = "2026-10-08T18:30:45.000Z";

// Load the real route and its local dependencies, with an isolated environment,
// fixed clock, and mocked fetch. No request can reach an email provider.
function loadRoute({ results = [], locale = "en", env = {} } = {}) {
  const requests = [];
  const cache = new Map();
  class FixedDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [fixedInstant]));
    }
    static now() { return Date.parse(fixedInstant); }
  }
  const context = vm.createContext({
    Date: FixedDate,
    Intl,
    URL,
    URLSearchParams,
    Headers,
    Request,
    Response,
    process: { env: {
      RESEND_API_KEY: "test-key-not-a-credential",
      NEWSLETTER_FROM_EMAIL: "KIKORA <updates@kikoragear.com>",
      NEXT_PUBLIC_SITE_URL: "https://kikoragear.com",
      NEXT_PUBLIC_SUPPORT_EMAIL: "support@kikoragear.com",
      ...env,
    } },
    fetch: async (url, options) => {
      requests.push({ url, options, email: JSON.parse(options.body) });
      const result = results[requests.length - 1];
      if (result instanceof Error) throw result;
      return new Response("{}", { status: result ?? 200 });
    },
  });

  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const loadedModule = { exports: {} };
    cache.set(file, loadedModule);
    const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const execute = vm.runInContext(`(function(exports, require, module) {\n${compiled}\n})`, context, { filename: file });
    execute(loadedModule.exports, (specifier) => {
      if (specifier === "@/lib/locale-server") return { getLocale: async () => locale };
      if (specifier.startsWith("@/")) return load(path.join(root, "src", `${specifier.slice(2)}.ts`));
      if (specifier.startsWith(".")) return load(path.resolve(path.dirname(file), `${specifier}.ts`));
      if (specifier === "next/server") return require("next/server");
      throw new Error(`Unexpected module in newsletter test: ${specifier}`);
    }, loadedModule);
    return loadedModule.exports;
  }

  return { route: load(path.join(root, "src/app/api/newsletter/route.ts")), requests };
}

function request(body, headers = {}) {
  return new Request("https://kikoragear.com/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://kikoragear.com", ...headers },
    body: JSON.stringify(body),
  });
}

const validSignup = { email: "reader@example.com", consent: true, locale: "en" };

for (const category of ["keycaps", "other"]) {
test(`${category}: welcome email goes only to the subscriber; internal notification goes to exactly the three team members`, async () => {
  const { route, requests } = loadRoute();
  const response = await route.POST(request({ ...validSignup, category, email: " Reader@Example.com " }));
  assert.equal(response.status, 200);
  assert.equal(requests.length, 2);
  const [welcome, notification] = requests.map(({ email }) => email);
  assert.deepEqual(welcome.to, ["reader@example.com"]);
  assert.equal(welcome.cc, undefined);
  assert.equal(welcome.bcc, undefined);
  for (const recipient of team) assert.equal(JSON.stringify(welcome).includes(recipient), false);
  assert.match(welcome.headers["List-Unsubscribe"], /^<mailto:support@kikoragear\.com\?/);
  assert.deepEqual(notification.to, team);
  assert.equal(notification.reply_to, "reader@example.com");
  assert.equal(notification.headers, undefined);
  assert.match(notification.text, /订阅邮箱：reader@example\.com/);
  assert.match(notification.html, /reader@example\.com/);
  const publicResponse = await response.text();
  for (const recipient of team) assert.equal(publicResponse.includes(recipient), false);
  for (const call of requests) {
    assert.equal(call.url, "https://api.resend.com/emails");
    assert.equal(call.options.method, "POST");
  }
});
}

for (const locale of ["en", "ja"]) {
  for (const [category, label, expectedPaths, excludedPaths] of [
    ["keycaps", "键帽订阅", ["/explore/keycaps/set", "/explore/keycaps/artisan"], ["/explore/glass", "/explore/metal"]],
    ["other", "其他订阅", ["/explore/glass"], ["/explore/keycaps", "/explore/metal"]],
  ]) {
    test(`${locale} ${category}: welcome links and the internal subject/text/HTML match the chosen category`, async () => {
      const { route, requests } = loadRoute();
      assert.equal((await route.POST(request({ ...validSignup, locale, category }))).status, 200);
      assert.equal(requests.length, 2);
      const [welcome, notification] = requests.map(({ email }) => email);
      assert.deepEqual(notification.to, team);
      assert.equal(notification.subject, `【KIKORA】新订阅通知｜${label}`);
      assert.ok(notification.text.includes(`订阅类别：${label}`));
      assert.ok(notification.html.replace(/<[^>]*>/g, "").includes(`订阅类别：${label}`));
      assert.match(welcome.html, new RegExp(`lang="${locale}"`));
      for (const content of [welcome.text, welcome.html]) {
        for (const expectedPath of expectedPaths) assert.ok(content.includes(`https://kikoragear.com${expectedPath}`));
        for (const excludedPath of excludedPaths) assert.equal(content.includes(excludedPath), false);
      }
    });
  }
}

test("legacy signup without category defaults to other", async () => {
  const { route, requests } = loadRoute();
  assert.equal((await route.POST(request(validSignup))).status, 200);
  assert.equal(requests[1].email.subject, "【KIKORA】新订阅通知｜其他订阅");
  for (const content of [requests[0].email.text, requests[0].email.html]) {
    assert.ok(content.includes("https://kikoragear.com/explore/glass"));
    assert.equal(content.includes("/explore/keycaps"), false);
  }
});

for (const category of ["artisan", "set", "KEYCAPS", "", null, ["keycaps"], { category: "keycaps" }]) {
  test(`invalid category ${JSON.stringify(category)} returns 400 without sending mail`, async () => {
    const { route, requests } = loadRoute();
    assert.equal((await route.POST(request({ ...validSignup, category }))).status, 400);
    assert.equal(requests.length, 0);
  });
}

test("notification uses the server clock in Asia/Shanghai, including the date rollover, and English language", async () => {
  const { route, requests } = loadRoute();
  await route.POST(request({ ...validSignup, subscribedAt: "2001-01-01T00:00:00Z", timeZone: "UTC" }));
  const notification = requests[1].email;
  for (const content of [notification.text, notification.html]) {
    assert.match(content, /2026\/10\/09 02:30:45/);
    assert.match(content, /北京时间，UTC\+08:00/);
    assert.match(content, /英语/);
    assert.equal(content.includes("2001-01-01"), false);
  }
});

test("Japanese signup receives a Japanese welcome and the team receives the correct language", async () => {
  const { route, requests } = loadRoute();
  assert.equal((await route.POST(request({ ...validSignup, locale: "ja" }))).status, 200);
  assert.match(requests[0].email.subject, /KIKORA/);
  assert.match(requests[0].email.subject, /[\u3040-\u30ff\u4e00-\u9fff]/);
  assert.match(requests[0].email.html, /lang="ja"/);
  assert.match(requests[1].email.text, /网站语言：日语/);
});

test("unknown locale uses the server locale", async () => {
  const { route, requests } = loadRoute({ locale: "ja" });
  assert.equal((await route.POST(request({ ...validSignup, locale: "untrusted" }))).status, 200);
  assert.match(requests[1].email.text, /网站语言：日语/);
});

test("client input and the old notification environment variable cannot change internal recipients", async () => {
  const { route, requests } = loadRoute({ env: { NEWSLETTER_NOTIFY_EMAIL: "old@example.com", CONTACT_TO_EMAIL: "legacy@example.com" } });
  await route.POST(request({
    ...validSignup,
    to: ["injected@example.com"],
    notificationRecipients: ["injected@example.com"],
    notifyEmail: "injected@example.com",
  }));
  assert.deepEqual(requests[1].email.to, team);
  assert.equal(JSON.stringify(requests).includes("injected@example.com"), false);
});

for (const [name, body, status] of [
  ["invalid email", { ...validSignup, email: "not-an-email" }, 400],
  ["missing consent", { ...validSignup, consent: false }, 400],
  ["non-boolean consent", { ...validSignup, consent: "true" }, 400],
  ["honeypot", { ...validSignup, company: "spam" }, 200],
]) {
  test(`${name} sends no email`, async () => {
    const { route, requests } = loadRoute();
    assert.equal((await route.POST(request(body))).status, status);
    assert.equal(requests.length, 0);
  });
}

test("welcome provider failure returns 502 and does not send the internal notification", async () => {
  const { route, requests } = loadRoute({ results: [500] });
  assert.equal((await route.POST(request(validSignup))).status, 502);
  assert.equal(requests.length, 1);
});

test("internal notification provider failure returns 502", async () => {
  const { route, requests } = loadRoute({ results: [200, 500] });
  const response = await route.POST(request(validSignup));
  assert.equal(response.status, 502);
  assert.equal(requests.length, 2);
  for (const recipient of team) assert.equal(JSON.stringify(await response.clone().json()).includes(recipient), false);
});

for (const [stage, results, count] of [
  ["welcome", [new Error("provider network failure")], 1],
  ["internal notification", [200, new Error("provider network failure")], 2],
]) {
  test(`${stage} network exception returns 502`, async () => {
    const { route, requests } = loadRoute({ results });
    const response = await route.POST(request(validSignup));
    assert.equal(response.status, 502);
    assert.equal(requests.length, count);
    assert.equal((await response.text()).includes("provider network failure"), false);
  });
}

test("a repeated valid submission sends another welcome and team notification", async () => {
  const { route, requests } = loadRoute();
  assert.equal((await route.POST(request(validSignup))).status, 200);
  assert.equal((await route.POST(request(validSignup))).status, 200);
  assert.equal(requests.length, 4);
  assert.deepEqual(requests[1].email.to, team);
  assert.deepEqual(requests[3].email.to, team);
});

test("missing email provider configuration sends nothing and returns 503", async () => {
  const { route, requests } = loadRoute({ env: { RESEND_API_KEY: "" } });
  assert.equal((await route.POST(request(validSignup))).status, 503);
  assert.equal(requests.length, 0);
});

test("a forbidden browser origin is rejected before any mail is sent", async () => {
  const { route, requests } = loadRoute();
  assert.equal((await route.POST(request(validSignup, { Origin: "https://untrusted.example" }))).status, 403);
  assert.equal(requests.length, 0);
});
