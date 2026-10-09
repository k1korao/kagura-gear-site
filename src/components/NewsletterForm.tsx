"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { supportMailto } from "@/lib/site";
import { supportCopy } from "@/lib/support-copy";
import styles from "./SupportPages.module.css";

type NewsletterState = {
  status: "idle" | "sending" | "sent" | "error";
  notice?: keyof (typeof supportCopy)["en"]["newsletter"]["notices"];
  fallbackEmail?: string;
};

export function NewsletterForm({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const copy = supportCopy[locale].newsletter;
  const id = useId();
  const pending = useRef(false);
  const [state, setState] = useState<NewsletterState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "");
    const consent = formData.get("consent") === "on";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ status: "error", notice: "email" });
      form.querySelector<HTMLElement>('[name="email"]')?.focus();
      return;
    }
    if (!consent) {
      setState({ status: "error", notice: "consent" });
      form.querySelector<HTMLElement>('[name="consent"]')?.focus();
      return;
    }
    pending.current = true;
    setState({ status: "sending", notice: "sending" });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, consent, company, locale }),
      });
      await response.json();
      if (!response.ok) {
        const notice = response.status === 400 ? "invalid" : response.status === 429 ? "limited" : response.status === 503 ? "unavailable" : response.status === 502 ? "failed" : "uncertain";
        setState({ status: "error", notice, fallbackEmail: response.status === 400 ? undefined : email });
        return;
      }
      form.reset();
      setState({ status: "sent", notice: "sent" });
    } catch {
      setState({ status: "error", notice: "uncertain", fallbackEmail: email });
    } finally {
      pending.current = false;
    }
  }

  return <form onSubmit={handleSubmit} onChange={() => { if (!pending.current && state.status !== "idle") setState({ status: "idle" }); }} noValidate className={styles.newsletter} data-light={light} aria-busy={state.status === "sending"}>
    <div className={styles.trap} aria-hidden="true"><label htmlFor={`${id}-company`}>{copy.company}</label><input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" /></div>
    <div className={styles.newsletterRow}>
      <label className="sr-only" htmlFor={`${id}-email`}>{copy.email}</label>
      <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@example.com" className={styles.newsletterInput} disabled={state.status === "sending"} aria-describedby={`${id}-notice`} />
      <button type="submit" disabled={state.status === "sending"} className={styles.newsletterButton}>{state.status === "sending" ? copy.sending : copy.submit}</button>
    </div>
    <label className={styles.newsletterConsent}><input name="consent" type="checkbox" required disabled={state.status === "sending"} aria-describedby={`${id}-notice`} /><span>{copy.consent}</span></label>
    <div id={`${id}-notice`} className={styles.newsletterNotice} data-status={state.status} aria-live="polite" aria-atomic="true">
      {state.notice ? <p>{copy.notices[state.notice]}</p> : null}
      {state.fallbackEmail ? <a className={styles.fallback} href={supportMailto(copy.mailSubject, copy.mailBody.replace("{email}", state.fallbackEmail))}>{copy.emailAction}</a> : null}
    </div>
  </form>;
}
