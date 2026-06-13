import { NextResponse } from "next/server";
import { siteConfig, supportMailto } from "@/lib/site";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
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

function buildMailtoHref(name: string, email: string, topic: string, message: string) {
  return supportMailto(
    `Kagura Gear contact: ${topic || "Support"}`,
    [`Name: ${name}`, `Email: ${email}`, `Topic: ${topic || "Support"}`, "", message].join("\n"),
  );
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = normalize(body.name, 80);
  const email = normalize(body.email, 120).toLowerCase();
  const topic = normalize(body.topic, 80);
  const message = normalize(body.message, 4000);
  const company = normalize(body.company, 120);

  if (company) {
    return NextResponse.json({ message: "Message accepted." });
  }

  const mailtoHref = buildMailtoHref(name, email, topic, message);

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      {
        message: "Please enter your name, a valid email, and a message.",
        mailtoHref,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.supportEmail;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          `The secure website sender is not connected yet. Your email app should open with this message addressed to ${siteConfig.supportEmail}. Send it there so we can reply.`,
        mailtoHref,
      },
      { status: 503 },
    );
  }

  const subject = `Kagura Gear contact: ${topic || "Support"}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic || "Support"}`,
    "",
    message,
  ].join("\n");
  const html = `
    <h2>New Kagura Gear contact request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Topic:</strong> ${escapeHtml(topic || "Support")}</p>
    <hr />
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          `The message could not be sent from the website. Your email app should open with this message addressed to ${siteConfig.supportEmail}.`,
        mailtoHref,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: `Message sent. Kagura Gear will reply from ${siteConfig.supportEmail}.`,
  });
}
