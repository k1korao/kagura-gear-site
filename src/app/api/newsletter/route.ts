import { mailCors, mailPreflight } from "@/lib/cors";
import { getLocale } from "@/lib/locale-server";
import { htmlLanguages, isLocale, type Locale } from "@/lib/locale";
import { newsletterEmailCopy } from "@/lib/newsletter-copy";
import { isNewsletterCategory, type NewsletterCategory } from "@/lib/newsletter-category";
import { absoluteUrl, siteConfig, supportMailto } from "@/lib/site";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";
// Internal recipients are controlled on the server, never by signup form input.
const notificationRecipients = [
  "jeremy@kikoragear.com",
  "official@kikoragear.com",
  "yimin@kikoragear.com",
];

type NewsletterBody = {
  locale?: unknown;
  email?: unknown;
  consent?: unknown;
  company?: unknown;
  category?: unknown;
};

function normalize(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildCustomerText(email: string, locale: Locale, category: NewsletterCategory) {
  const copy = newsletterEmailCopy[locale];
  const selected = copy.categories[category];
  return [selected.heading, "", selected.body, "", ...selected.links.flatMap(link => [link.label, absoluteUrl(link.path)]), "", copy.unsubscribe, email, siteConfig.supportEmail].join("\n");
}

function buildCustomerHtml(email: string, locale: Locale, category: NewsletterCategory) {
  const copy = newsletterEmailCopy[locale];
  const selected = copy.categories[category];
  return `<div lang="${htmlLanguages[locale]}" style="background:#f7f7f5;color:#20242a;padding:36px;font-family:Arial,sans-serif;line-height:1.8;max-width:620px;margin:auto"><p>KIKORA</p><h1 style="font-size:30px;line-height:1.4">${escapeHtml(selected.heading)}</h1><p>${escapeHtml(selected.body)}</p>${selected.links.map(link => `<p><a style="color:#20242a" href="${absoluteUrl(link.path)}">${escapeHtml(link.label)} ↗</a></p>`).join("")}<hr style="border:0;border-top:1px solid #d5d8db;margin:32px 0"/><p style="font-size:12px">${escapeHtml(copy.unsubscribe)}<br/>${escapeHtml(email)}<br/>${escapeHtml(siteConfig.supportEmail)}</p></div>`;
}

async function sendEmail({
  apiKey,
  fromEmail,
  to,
  replyTo,
  subject,
  text,
  html,
  includeUnsubscribe = false,
}: {
  apiKey: string;
  fromEmail: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  includeUnsubscribe?: boolean;
}) {
  return fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      reply_to: replyTo,
      subject,
      text,
      html,
      headers: includeUnsubscribe ? {
        "List-Unsubscribe": `<mailto:${siteConfig.supportEmail}?subject=UNSUBSCRIBE>`,
      } : undefined,
    }),
  });
}

export function OPTIONS(request: Request) {
  return mailPreflight(request);
}

export async function POST(request: Request) {
  const cors = mailCors(request);
  if (!cors.allowed) return cors.reject();

  try {
    return await handlePost(request, cors.json);
  } catch {
    return cors.json({ message: "The request could not be completed. Please try again later." }, { status: 502 });
  }
}

async function handlePost(request: Request, json: ReturnType<typeof mailCors>["json"]) {
  let body: NewsletterBody;

  try {
    body = (await request.json()) as NewsletterBody;
  } catch {
    return json({ message: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ message: "Invalid request." }, { status: 400 });
  }

  const locale = isLocale(body.locale) ? body.locale : await getLocale();
  const copy = newsletterEmailCopy[locale];
  const email = normalize(body.email, 120).toLowerCase();
  const company = normalize(body.company, 120);
  const consent = body.consent === true;

  if (company) {
    return json({
      message: "Signup accepted.",
    });
  }

  if (!email || !isValidEmail(email)) {
    return json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return json(
      { message: "Please confirm that you want to receive KIKORA emails." },
      { status: 400 },
    );
  }

  // Requests from older forms belong to the non-keycap list by default.
  if (body.category !== undefined && !isNewsletterCategory(body.category)) {
    return json({ message: "Please select a valid subscription category." }, { status: 400 });
  }
  const category: NewsletterCategory = body.category ?? "other";
  const categoryLabel = category === "keycaps" ? "键帽订阅" : "其他订阅";
  const selectedCopy = copy.categories[category];

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return json(
      {
        message:
          "The automatic email sender is not connected yet. Please email support directly for launch updates.",
        mailtoHref: supportMailto(copy.fallback, `${copy.request}${email}\n${selectedCopy.label}`),
      },
      { status: 503 },
    );
  }

  const customerText = buildCustomerText(email, locale, category);
  const customerHtml = buildCustomerHtml(email, locale, category);
  const subscribedAt = new Date();
  const subscribedAtShanghai = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).format(subscribedAt);
  const customerResponse = await sendEmail({
    apiKey,
    fromEmail,
    to: [email],
    replyTo: siteConfig.supportEmail,
    subject: selectedCopy.subject,
    text: customerText,
    html: customerHtml,
    includeUnsubscribe: true,
  });

  if (!customerResponse.ok) {
    return json(
      {
        message: "The welcome email could not be sent. Please try again later.",
      },
      { status: 502 },
    );
  }

  const notificationResponse = await sendEmail({
    apiKey,
    fromEmail,
    to: notificationRecipients,
    replyTo: email,
    subject: `【KIKORA】新订阅通知｜${categoryLabel}`,
    text: [
      "网站收到一条新订阅。", "",
      `订阅类别：${categoryLabel}`,
      `订阅邮箱：${email}`,
      `订阅时间：${subscribedAtShanghai}（北京时间，UTC+08:00）`,
      `网站语言：${locale === "ja" ? "日语" : "英语"}`,
      `来源：${absoluteUrl("/")}`,
      "", "订阅者已同意接收更新，欢迎邮件已发送。",
    ].join("\n"),
    html: `
      <div lang="zh-CN">
        <h2>KIKORA 新订阅通知</h2>
        <p><strong>订阅类别：</strong>${categoryLabel}</p>
        <p><strong>订阅邮箱：</strong>${escapeHtml(email)}</p>
        <p><strong>订阅时间：</strong>${escapeHtml(subscribedAtShanghai)}（北京时间，UTC+08:00）</p>
        <p><strong>网站语言：</strong>${locale === "ja" ? "日语" : "英语"}</p>
        <p><strong>来源：</strong>${escapeHtml(absoluteUrl("/"))}</p>
        <p>订阅者已同意接收更新，欢迎邮件已发送。</p>
      </div>
    `,
  });

  if (!notificationResponse.ok) {
    return json({ message: "Signup could not be completed." }, { status: 502 });
  }

  return json({
    message: "Welcome email sent. Check your inbox.",
  });
}
