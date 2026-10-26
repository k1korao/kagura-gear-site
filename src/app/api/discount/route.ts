import { checkDropDiscount, normalizeDiscountCode } from "@/lib/discount-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 1024;

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", Vary: "Origin" } });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin === null) return request.headers.get("sec-fetch-site") !== "cross-site";
  try {
    const url = new URL(request.url);
    const host = request.headers.get("host");
    // Next may reconstruct request.url with its internal hostname. Host is the
    // incoming request authority; browser scripts cannot set it. Do not trust
    // Origin, Referer, or arbitrary X-Forwarded-Host as an alternate authority.
    if (host !== null) {
      if (!/^(?:[a-z0-9.-]+|\[[a-f0-9:.]+\])(?::\d{1,5})?$/i.test(host)) return false;
      return origin === new URL(`${url.protocol}//${host}`).origin;
    }
    return origin === url.origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ status: "invalid" }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return json({ status: "invalid" }, 415);
  }
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_BODY_BYTES)) {
    return json({ status: "invalid" }, 413);
  }

  let body: unknown;
  try {
    // Bound the actual streamed body too: Content-Length can be absent or false.
    const reader = request.body?.getReader();
    if (!reader) return json({ status: "invalid" }, 400);
    let length = 0;
    let text = "";
    const decoder = new TextDecoder("utf-8", { fatal: true });
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > MAX_BODY_BYTES) {
          await reader.cancel();
          return json({ status: "invalid" }, 413);
        }
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
    } finally {
      reader.releaseLock();
    }
    body = JSON.parse(text);
  } catch {
    return json({ status: "invalid" }, 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body) || !("code" in body)) {
    return json({ status: "invalid" }, 400);
  }
  const code = normalizeDiscountCode(body.code);
  if (code === null) return json({ status: "invalid" }, 400);
  const result = await checkDropDiscount(code);
  return json(result, result.status === "valid" ? 200 : result.status === "unavailable" ? 503 : 400);
}
