import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { absoluteUrl, siteConfig, supportMailto } from "@/lib/site";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";

type NewsletterBody = {
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

function buildProductLinks() {
  return products
    .map((product) => {
      const url = absoluteUrl(`/products/${product.slug}`);

      return {
        ...product,
        url,
      };
    })
    .slice(0, 3);
}

function buildCustomerText(email: string) {
  const lines = [
    "Welcome to Kagura Gear.",
    "",
    "Thanks for joining the drop list. Here are three recommended launch products:",
    "",
    ...buildProductLinks().flatMap((product) => [
      `${product.name} - ${product.price}`,
      product.shortDescription,
      product.url,
      "",
    ]),
    "Checkout will be handled by Shopify once live products are connected. Kagura Gear will never ask you to enter card details directly on this custom site.",
    "",
    `You signed up with ${email}. To unsubscribe, reply to this email with UNSUBSCRIBE.`,
    `${siteConfig.name} / ${siteConfig.supportEmail}`,
  ];

  return lines.join("\n");
}

function buildCustomerHtml(email: string) {
  const productCards = buildProductLinks()
    .map(
      (product) => `
        <tr>
          <td style="padding:18px 0;border-top:1px solid #2b2d34;">
            <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#f6a5bd;">${escapeHtml(product.series)}</p>
            <h2 style="margin:0 0 8px;font-size:22px;line-height:1.2;color:#f7f3ed;">${escapeHtml(product.name)} <span style="color:#8e98a8;">${escapeHtml(product.price)}</span></h2>
            <p style="margin:0 0 14px;color:#b8c0cc;line-height:1.6;">${escapeHtml(product.shortDescription)}</p>
            <a href="${product.url}" style="display:inline-block;border:1px solid #f6a5bd;background:#f6a5bd;color:#050507;padding:12px 16px;text-decoration:none;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;font-size:12px;">View Product</a>
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="margin:0;background:#050507;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#f7f3ed;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;border:1px solid #252832;background:#101217;">
        <tr>
          <td style="padding:28px 28px 8px;">
            <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#f6a5bd;">Precision Meets Ritual</p>
            <h1 style="margin:0;font-size:34px;line-height:1.05;color:#f7f3ed;">Welcome to Kagura Gear.</h1>
            <p style="margin:18px 0 0;color:#b8c0cc;line-height:1.7;">Thanks for joining the drop list. Here are three recommended launch products for FPS players, keyboard users, and desk setup fans.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:4px 28px 20px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              ${productCards}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px 28px;border-top:1px solid #252832;color:#8e98a8;font-size:12px;line-height:1.7;">
            <p style="margin:0 0 8px;">Checkout will be handled by Shopify once live products are connected. Kagura Gear will never ask you to enter card details directly on this custom site.</p>
            <p style="margin:0;">You signed up with ${escapeHtml(email)}. To unsubscribe, reply to this email with <strong style="color:#f7f3ed;">UNSUBSCRIBE</strong>.</p>
            <p style="margin:12px 0 0;">${escapeHtml(siteConfig.name)} / ${escapeHtml(siteConfig.supportEmail)}</p>
          </td>
        </tr>
      </table>
    </div>
  `;
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

export async function POST(request: Request) {
  let body: NewsletterBody;

  try {
    body = (await request.json()) as NewsletterBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = normalize(body.email, 120).toLowerCase();
  const company = normalize(body.company, 120);
  const consent = body.consent === true;

  if (company) {
    return NextResponse.json({
      message: "Signup accepted.",
    });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json(
      { message: "Please confirm that you want to receive Kagura Gear emails." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;
  const notifyEmail =
    process.env.NEWSLETTER_NOTIFY_EMAIL || process.env.CONTACT_TO_EMAIL || siteConfig.supportEmail;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "The automatic email sender is not connected yet. Please email support directly for launch updates.",
        mailtoHref: supportMailto("Kagura Gear newsletter signup", `Please add ${email} to the drop list.`),
      },
      { status: 503 },
    );
  }

  const customerText = buildCustomerText(email);
  const customerHtml = buildCustomerHtml(email);
  const customerResponse = await sendEmail({
    apiKey,
    fromEmail,
    to: email,
    replyTo: siteConfig.supportEmail,
    subject: "Welcome to Kagura Gear - recommended launch gear",
    text: customerText,
    html: customerHtml,
  });

  if (!customerResponse.ok) {
    return NextResponse.json(
      {
        message: "The recommendation email could not be sent. Please try again later.",
      },
      { status: 502 },
    );
  }

  await sendEmail({
    apiKey,
    fromEmail,
    to: notifyEmail,
    replyTo: email,
    subject: "New Kagura Gear newsletter signup",
    text: [`New newsletter signup: ${email}`, "", "A recommendation email was sent automatically."].join("\n"),
    html: `
      <h2>New Kagura Gear newsletter signup</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p>A recommendation email was sent automatically.</p>
    `,
  });

  return NextResponse.json({
    message: "Recommendation email sent. Check your inbox for the Kagura Gear launch picks.",
  });
}
