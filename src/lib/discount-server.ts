import "server-only";

export type DiscountResult =
  | {
      status: "valid";
      code: string;
      discount:
        | { type: "percentage"; value: number }
        | { type: "amount"; value: number; currency: string; appliesOnEachItem: boolean };
      checkoutUrl: string;
      endsAt: string;
    }
  | { status: "invalid" | "not_started" | "expired" | "unavailable" };

const API_VERSION = "2026-10";
const PROVIDER_TIMEOUT_MS = 5000;
const CODE_PATTERN = /^[A-Z0-9][A-Z0-9_-]{0,63}$/;
const STORE_DOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.myshopify\.com$/;

const DISCOUNT_QUERY = `
  query KikoraDropDiscount($code: String!) {
    codeDiscountNodeByCode(code: $code) {
      codeDiscount {
        __typename
        ... on DiscountCodeBasic {
          status
          startsAt
          endsAt
          usageLimit
          asyncUsageCount
          customerGets {
            value {
              __typename
              ... on DiscountPercentage { percentage }
              ... on DiscountAmount {
                amount { amount currencyCode }
                appliesOnEachItem
              }
            }
          }
        }
      }
    }
  }
`;

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeDiscountCode(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 80 || /[\u0000-\u001f\u007f]/.test(value)) return null;
  const code = value.trim().toUpperCase();
  return CODE_PATTERN.test(code) ? code : null;
}

function configuration() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim().toLowerCase();
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.trim();
  const configuredCodes = process.env.KIKORA_DROP_CODES;
  if (!domain || !STORE_DOMAIN_PATTERN.test(domain) || !token || /[\u0000-\u001f\u007f]/.test(token)) return null;
  if (!configuredCodes || configuredCodes.length > 8192) return null;
  const entries = configuredCodes.split(",");
  if (entries.length > 100) return null;
  const codes = entries.map(normalizeDiscountCode);
  if (codes.some((code) => code === null)) return null;
  return { domain, token, codes: new Set(codes) };
}

function timestamp(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(value)) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : null;
}

/** Checks a configured campaign only. It does not reserve or redeem a use. */
export async function checkDropDiscount(code: string): Promise<DiscountResult> {
  const config = configuration();
  if (!config) return { status: "unavailable" };
  // Unknown codes never reach Shopify, and this list is never sent to a browser.
  if (!config.codes.has(code)) return { status: "invalid" };

  try {
    const response = await fetch(`https://${config.domain}/admin/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": config.token },
      body: JSON.stringify({ query: DISCOUNT_QUERY, variables: { code } }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });
    if (!response.ok) return { status: "unavailable" };
    const payload: unknown = await response.json();
    if (!record(payload) || (payload.errors !== undefined && (!Array.isArray(payload.errors) || payload.errors.length > 0))) {
      return { status: "unavailable" };
    }
    if (!record(payload.data) || !("codeDiscountNodeByCode" in payload.data)) return { status: "unavailable" };
    const node = payload.data.codeDiscountNodeByCode;
    if (node === null) return { status: "invalid" };
    if (!record(node) || !record(node.codeDiscount)) return { status: "unavailable" };
    const discount = node.codeDiscount;
    if (discount.__typename !== "DiscountCodeBasic") return { status: "unavailable" };

    const startsAt = timestamp(discount.startsAt);
    const endsAt = timestamp(discount.endsAt);
    const usageLimit = discount.usageLimit;
    const usageCount = discount.asyncUsageCount;
    if (startsAt === null || endsAt === null || endsAt <= startsAt ||
        typeof usageLimit !== "number" || !Number.isSafeInteger(usageLimit) || usageLimit <= 0 ||
        typeof usageCount !== "number" || !Number.isSafeInteger(usageCount) || usageCount < 0) {
      return { status: "unavailable" };
    }
    if (!["ACTIVE", "SCHEDULED", "EXPIRED"].includes(String(discount.status))) return { status: "unavailable" };
    const now = Date.now();
    if (discount.status === "EXPIRED" || now >= endsAt) return { status: "expired" };
    if (discount.status === "SCHEDULED" || now < startsAt) return { status: "not_started" };
    // This count is asynchronous: a lower count never guarantees remaining uses.
    // Shopify checkout is the authority for the limit and final eligibility.
    if (usageCount >= usageLimit) return { status: "expired" };

    if (!record(discount.customerGets) || !record(discount.customerGets.value)) return { status: "unavailable" };
    const value = discount.customerGets.value;
    let displayDiscount: Extract<DiscountResult, { status: "valid" }>["discount"];
    if (value.__typename === "DiscountPercentage" && typeof value.percentage === "number" &&
        Number.isFinite(value.percentage) && value.percentage > 0 && value.percentage <= 1) {
      displayDiscount = { type: "percentage", value: Number((value.percentage * 100).toPrecision(15)) };
    } else if (value.__typename === "DiscountAmount" && record(value.amount) &&
        typeof value.amount.amount === "string" && /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value.amount.amount) &&
        typeof value.amount.currencyCode === "string" && /^[A-Z]{3}$/.test(value.amount.currencyCode) &&
        typeof value.appliesOnEachItem === "boolean") {
      const amount = Number(value.amount.amount);
      if (!Number.isFinite(amount) || amount <= 0 || amount > Number.MAX_SAFE_INTEGER) return { status: "unavailable" };
      displayDiscount = { type: "amount", value: amount, currency: value.amount.currencyCode, appliesOnEachItem: value.appliesOnEachItem };
    } else {
      return { status: "unavailable" };
    }

    return {
      status: "valid",
      code,
      discount: displayDiscount,
      // This applies the code on the Shopify store; no cart or checkout is created.
      checkoutUrl: `https://${config.domain}/discount/${encodeURIComponent(code)}?redirect=/collections/all`,
      endsAt: new Date(endsAt).toISOString(),
    };
  } catch {
    // Provider errors, credentials, and campaign data must not enter public responses or logs.
    return { status: "unavailable" };
  }
}
