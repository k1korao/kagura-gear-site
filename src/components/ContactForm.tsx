"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig, supportMailto } from "@/lib/site";

type FormState = {
  status: "idle" | "sending" | "sent" | "error";
  message: string;
  mailtoHref?: string;
};

const inputClass =
  "min-h-12 border border-white/15 bg-black/35 px-4 text-bone outline-none transition placeholder:text-steel/50 focus:border-sakura";
const labelClass = "text-sm font-black uppercase tracking-[0.18em] text-bone";

export function ContactForm() {
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const defaultMailto = useMemo(
    () =>
      supportMailto(
        "Kagura Gear support request",
        "Hi Kagura Gear,\n\nI need help with:\n\n",
      ),
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({
      status: "sending",
      message: "Sending your message...",
    });

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
        mailtoHref?: string;
      };

      if (!response.ok) {
        setState({
          status: "error",
          message: result.message || "Message could not be sent.",
          mailtoHref: result.mailtoHref || defaultMailto,
        });
        return;
      }

      form.reset();
      setState({
        status: "sent",
        message: result.message || `Message sent. We will reply from ${siteConfig.supportEmail}.`,
      });
    } catch {
      setState({
        status: "error",
        message: "Message could not be sent from the website. Please email support directly.",
        mailtoHref: defaultMailto,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 border border-white/10 bg-smoke p-7">
      <div className="grid gap-2">
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div className="grid gap-2">
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <label className={labelClass} htmlFor="topic">
          Topic
        </label>
        <select id="topic" name="topic" className={inputClass} defaultValue="Product question">
          <option>Product question</option>
          <option>Order support</option>
          <option>Wholesale</option>
          <option>Collaboration</option>
          <option>Other</option>
        </select>
      </div>
      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-2">
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="border border-white/15 bg-black/35 p-4 text-bone outline-none transition placeholder:text-steel/50 focus:border-sakura"
          placeholder="Tell us what you need help with."
        />
      </div>
      <button
        type="submit"
        disabled={state.status === "sending"}
        className="border border-sakura bg-sakura px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/15 disabled:text-steel"
      >
        {state.status === "sending" ? "Sending..." : "Send Message"}
      </button>
      <div className="border border-white/10 bg-black/25 p-4 text-sm leading-6 text-steel">
        {state.message ? <p>{state.message}</p> : <p>We reply from {siteConfig.supportEmail}.</p>}
        {state.mailtoHref ? (
          <a
            href={state.mailtoHref}
            className="mt-3 inline-flex font-black uppercase tracking-[0.16em] text-sakura transition hover:text-bone"
          >
            Open email app
          </a>
        ) : null}
      </div>
    </form>
  );
}
