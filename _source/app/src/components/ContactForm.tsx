"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { siteConfig, supportMailto } from "@/lib/site";
import { supportCopy } from "@/lib/support-copy";
import styles from "./SupportPages.module.css";

type ContactDraft = { name: string; email: string; topic: string; message: string; company: string };
type FormState = {
  status: "idle" | "sending" | "sent" | "error";
  notice: keyof (typeof supportCopy)["en"]["contactForm"]["notices"];
  draft?: ContactDraft;
};

export function ContactForm() {
  const locale = useLocale();
  const copy = supportCopy[locale].contactForm;
  const pending = useRef(false);
  const [state, setState] = useState<FormState>({ status: "idle", notice: "idle" });

  function mailtoFor(draft: ContactDraft) {
    const topic = copy.topics.find(item => item.value === draft.topic)?.label || draft.topic;
    return supportMailto(copy.mailSubject.replace("{topic}", topic), [
      copy.mailHeading, "", `${copy.name}: ${draft.name}`, `${copy.email}: ${draft.email}`,
      `${copy.topic}: ${topic}`, "", draft.message,
    ].join("\n"));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const draft: ContactDraft = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || ""),
    };
    const invalidField = !draft.name ? "name" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email) ? "email" : !draft.message ? "message" : null;
    if (invalidField) {
      setState({ status: "error", notice: "invalid" });
      form.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }
    pending.current = true;
    setState({ status: "sending", notice: "sending" });
    try {
      const response = await fetch("https://kagura-gear-site.vercel.app/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, locale }),
      });
      await response.json();
      if (!response.ok) {
        const notice = response.status === 400 ? "invalid" : response.status === 429 ? "limited" : response.status === 503 ? "unavailable" : response.status === 502 ? "failed" : "uncertain";
        setState({ status: "error", notice, draft: response.status === 400 ? undefined : draft });
        return;
      }
      form.reset();
      setState({ status: "sent", notice: "sent" });
    } catch {
      setState({ status: "error", notice: "uncertain", draft });
    } finally {
      pending.current = false;
    }
  }

  return <form onSubmit={handleSubmit} onChange={() => { if (!pending.current && state.status !== "idle") setState({ status: "idle", notice: "idle" }); }} noValidate className={styles.form} aria-busy={state.status === "sending"}>
    <div className={styles.field}>
      <label className={styles.label} htmlFor="contact-name">{copy.name}</label>
      <input id="contact-name" name="name" autoComplete="name" required maxLength={80} className={styles.input} placeholder={copy.namePlaceholder} disabled={state.status === "sending"} aria-describedby="contact-notice" />
    </div>
    <div className={styles.field}>
      <label className={styles.label} htmlFor="contact-email">{copy.email}</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={120} className={styles.input} placeholder="you@example.com" disabled={state.status === "sending"} aria-describedby="contact-notice" />
    </div>
    <div className={styles.field}>
      <label className={styles.label} htmlFor="contact-topic">{copy.topic}</label>
      <select id="contact-topic" name="topic" className={styles.input} defaultValue="Product question" disabled={state.status === "sending"}>
        {copy.topics.map(topic => <option key={topic.value} value={topic.value}>{topic.label}</option>)}
      </select>
    </div>
    <div className={styles.trap} aria-hidden="true"><label htmlFor="contact-company">{copy.company}</label><input id="contact-company" name="company" tabIndex={-1} autoComplete="off" /></div>
    <div className={styles.field}>
      <label className={styles.label} htmlFor="contact-message">{copy.message}</label>
      <textarea id="contact-message" name="message" rows={6} required maxLength={4000} className={styles.textarea} placeholder={copy.messagePlaceholder} disabled={state.status === "sending"} aria-describedby="contact-notice" />
    </div>
    <button type="submit" disabled={state.status === "sending"} className={styles.submit}>{state.status === "sending" ? copy.sending : copy.submit}</button>
    <div id="contact-notice" className={styles.notice} data-status={state.status} aria-live="polite" aria-atomic="true">
      <p>{copy.notices[state.notice].replace("{email}", siteConfig.supportEmail)}</p>
      {state.draft ? <a href={mailtoFor(state.draft)} className={styles.fallback}>{copy.emailAction}</a> : null}
    </div>
  </form>;
}
