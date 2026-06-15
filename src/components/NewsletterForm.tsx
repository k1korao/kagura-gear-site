"use client";

import { FormEvent, useState } from "react";

type NewsletterState = {
  status: "idle" | "sending" | "sent" | "error";
  message: string;
  mailtoHref?: string;
};

export function NewsletterForm() {
  const [state, setState] = useState<NewsletterState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const consent = formData.get("consent") === "on";

    setState({
      status: "sending",
      message: "Sending your product recommendations...",
    });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, consent, company }),
      });
      const result = (await response.json()) as {
        message?: string;
        mailtoHref?: string;
      };

      if (!response.ok) {
        setState({
          status: "error",
          message: result.message || "The signup could not be completed. Please try again.",
          mailtoHref: result.mailtoHref,
        });
        return;
      }

      form.reset();
      setState({
        status: "sent",
        message: result.message || "Recommendation email sent. Check your inbox.",
      });
    } catch {
      setState({
        status: "error",
        message: "The signup could not be completed. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 self-end">
      <div className="hidden">
        <label htmlFor="newsletter-company">Company</label>
        <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="min-h-14 flex-1 border border-white/15 bg-smoke px-4 text-bone outline-none transition placeholder:text-steel focus:border-sakura focus:shadow-[0_0_28px_rgba(246,165,189,0.12)]"
        />
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="premium-button min-h-14 border border-sakura bg-sakura px-6 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/15 disabled:text-steel"
        >
          {state.status === "sending" ? "Sending..." : "Sign Up"}
        </button>
      </div>
      <label className="flex gap-3 text-xs leading-5 text-steel">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-sakura"
        />
        <span>
          I agree to receive Kagura Gear product recommendations and launch emails. I can
          unsubscribe by replying UNSUBSCRIBE.
        </span>
      </label>
      <div className="min-h-6 text-sm font-semibold text-steel" aria-live="polite">
        {state.message ? <p>{state.message}</p> : null}
        {state.mailtoHref ? (
          <a
            href={state.mailtoHref}
            className="mt-2 inline-flex font-black uppercase tracking-[0.16em] text-sakura transition hover:text-bone"
          >
            Email support instead
          </a>
        ) : null}
      </div>
    </form>
  );
}
