import { mailCors, mailPreflight } from "@/lib/cors";
import { getLocale } from "@/lib/locale-server";
import { htmlLanguages, isLocale, type Locale } from "@/lib/locale";
import { newsletterEmailCopy } from "@/lib/newsletter-copy";
import { absoluteUrl, siteConfig, supportMailto } from "@/lib/site";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";

type NewsletterBody = {
  locale?: unknown;
  email?: unknown;
  consent?: unknown;
  company?: unknown;
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

function buildCustomerText(email: string, locale: Locale) {
  const copy = newsletterEmailCopy[locale];
  return [copy.heading, "", copy.body, "", copy.glass, absoluteUrl("/explore/glass"), copy.keycaps, absoluteUrl("/explore/keycaps"), copy.metal, absoluteUrl("/explore/metal"), "", copy.unsubscribe, email, siteConfig.supportEmail].join("\n");
}

function buildCustomerHtml(email: string, locale: Locale) {
  const copy = newsletterEmailCopy[locale];
  const links = [["glass", copy.glass], ["keycaps", copy.keycaps], ["metal", copy.metal]];
  return `<div lang="${htmlLanguages[locale]}" style="background:#f7f7f5;color:#20242a;padding:36px;font-family:Arial,sans-serif;line-height:1.8;max-width:620px;margin:auto"><p>KIKORA</p><h1 style="font-size:30px;line-height:1.4">${escapeHtml(copy.heading)}</h1><p>${escapeHtml(copy.body)}</p>${links.map(([path, name]) => `<p><a style="color:#20242a" href="${absoluteUrl(`/explore/${path}`)}">${escapeHtml(name)} ↗</a></p>`).join("")}<hr style="border:0;border-top:1px solid #d5d8db;margin:32px 0"/><p style="font-size:12px">${escapeHtml(copy.unsubscribe)}<br/>${escapeHtml(email)}<br/>${escapeHtml(siteConfig.supportEmail)}</p></div>`;
}

async function sendEmail({
  apiKey,
  fromEmail,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  apiKey: string;
  fromEmail: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  return fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
      headers: {
        "List-Unsubscribe": `<mailto:${siteConfig.supportEmail}?subject=UNSUBSCRIBE>`,
      },
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

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;
  const notifyEmail =
    process.env.NEWSLETTER_NOTIFY_EMAIL || process.env.CONTACT_TO_EMAIL || siteConfig.supportEmail;

  if (!apiKey || !fromEmail) {
    return json(
      {
        message:
          "The automatic email sender is not connected yet. Please email support directly for launch updates.",
        mailtoHref: supportMailto(copy.fallback, `${copy.request}${email}`),
      },
      { status: 503 },
    );
  }

  const customerText = buildCustomerText(email, locale);
  const customerHtml = buildCustomerHtml(email, locale);
  const customerResponse = await sendEmail({
    apiKey,
    fromEmail,
    to: email,
    replyTo: siteConfig.supportEmail,
    subject: copy.subject,
    text: customerText,
    html: customerHtml,
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
    to: notifyEmail,
    replyTo: email,
    subject: "New KIKORA newsletter signup",
    text: [`New newsletter signup: ${email}`, "", `A welcome email was sent. Preferred language: ${locale}.`].join("\n"),
    html: `
      <h2>New KIKORA newsletter signup</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p>A welcome email was sent. Preferred language: ${locale}.</p>
    `,
  });

  if (!notificationResponse.ok) {
    return json({ message: "Signup could not be completed." }, { status: 502 });
  }

  return json({
    message: "Welcome email sent. Check your inbox.",
  });
}
