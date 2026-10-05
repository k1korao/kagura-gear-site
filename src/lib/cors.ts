import { NextResponse } from "next/server";

const storefrontOrigins = new Set([
  "https://kikoragear.com",
  "https://www.kikoragear.com",
  "https://a6tuzq-ge.myshopify.com",
  "https://andakeyi.myshopify.com",
]);

// Origin checks protect browser callers; recipients and message templates stay
// controlled by the mail routes. CORS is not authentication for server clients.
export function mailCors(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = origin === null
    ? request.headers.get("sec-fetch-site") !== "cross-site"
    : storefrontOrigins.has(origin) || origin === new URL(request.url).origin;
  const corsHeaders = new Headers({ Vary: "Origin", "Cache-Control": "no-store" });

  if (allowed && origin !== null) {
    corsHeaders.set("Access-Control-Allow-Origin", origin);
  }

  function json(body: unknown, init: ResponseInit = {}) {
    const headers = new Headers(init.headers);
    corsHeaders.forEach((value, key) => headers.set(key, value));
    return NextResponse.json(body, { ...init, headers });
  }

  function reject() {
    return json({ message: "This origin is not allowed." }, { status: 403 });
  }

  return { allowed, json, reject, headers: corsHeaders };
}

export function mailPreflight(request: Request) {
  const cors = mailCors(request);
  if (!cors.allowed) return cors.reject();

  const method = request.headers.get("access-control-request-method");
  if (method !== null && method !== "POST") {
    return cors.json({ message: "Method not allowed." }, { status: 405, headers: { Allow: "POST, OPTIONS" } });
  }

  const requestedHeaders = (request.headers.get("access-control-request-headers") || "")
    .split(",").map(value => value.trim().toLowerCase()).filter(Boolean);
  if (requestedHeaders.some(header => header !== "content-type")) {
    return cors.json({ message: "Request headers are not allowed." }, { status: 403 });
  }

  const headers = new Headers(cors.headers);
  headers.set("Vary", "Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
  headers.set("Access-Control-Allow-Methods", "POST");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "600");
  return new NextResponse(null, { status: 204, headers });
}
