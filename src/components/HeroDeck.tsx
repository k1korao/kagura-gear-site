"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./HeroDeck.module.css";
import { KaguraWordmark } from "./KaguraWordmark";
import { LogoKeyGlyph } from "./LogoKeyGlyph";
import { useLocale } from "./LocaleProvider";
import { MonochromePadSurface } from "./MonochromePadSurface";

const KEYS = ["K", "I", "K", "O", "R", "A"] as const;
const MAX_CODE_LENGTH = 64;
type DiscountResult = {
  status: "valid";
  code: string;
  discount: { type: "percentage"; value: number } | { type: "amount"; value: number; currency: string; appliesOnEachItem?: boolean };
  checkoutUrl: string;
  endsAt: string | null;
};
type CodeStatus = "idle" | "checking" | "empty" | "invalid" | "not_started" | "expired" | "unavailable" | "valid";

const COPY = {
  en: {
    label: "PRIVATE DROP", prompt: "TYPE YOUR CODE", input: "Private discount code", clear: "Clear code", enter: "ENTER", checking: "CHECKING…",
    insert: (key: string) => `Insert ${key}`,
    idle: "Private codes. Limited time. Limited uses.",
    empty: "Enter your community code first.",
    invalid: "Code not found. Check it and try again.",
    not_started: "This drop hasn’t opened yet. Come back at launch.",
    expired: "This drop has ended or is no longer available.",
    unavailable: "Code checks are unavailable right now. Please try again later.",
    valid: "CODE UNLOCKED", off: "OFF ELIGIBLE ITEMS", each: "OFF EACH ELIGIBLE ITEM", checkout: "SHOP WITH THIS CODE ↗",
    terms: "Eligibility and remaining uses are confirmed at checkout. Checking a code doesn’t reserve a use.",
    until: "Ends", finish: "GLASS FINISH",
  },
  ja: {
    label: "PRIVATE DROP", prompt: "コードを入力", input: "コミュニティ限定の割引コード", clear: "コードを消去", enter: "ENTER", checking: "確認中…",
    insert: (key: string) => `${key} を入力`,
    idle: "コミュニティ限定コード。期間・利用回数限定。",
    empty: "まず割引コードを入力してください。",
    invalid: "コードが見つかりません。入力内容をご確認ください。",
    not_started: "このキャンペーンはまだ始まっていません。",
    expired: "このキャンペーンは終了、または利用できなくなりました。",
    unavailable: "現在コードを確認できません。しばらくしてからお試しください。",
    valid: "コードを確認しました", off: "対象商品が割引に", each: "対象商品1点ごとに割引", checkout: "このコードでショップへ ↗",
    terms: "対象条件と残り利用回数はチェックアウトで確認されます。コードの確認では利用枠は確保されません。",
    until: "終了", finish: "ガラスのカラー",
  },
} as const;

/** Glass finishes and a keyboard for private, server-validated discount drops. */
export function HeroDeck({ hint, padLabel, keysLabel }: { hint: string; padLabel: string; keysLabel: string }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const id = useId();
  const deck = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef<AbortController | null>(null);
  const revision = useRef(0);
  const submitting = useRef(false);
  const [ready, setReady] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<CodeStatus>("idle");
  const [result, setResult] = useState<DiscountResult | null>(null);
  const [tone, setTone] = useState<"white" | "black">("white");
  const isBlack = tone === "black";
  const finish = locale === "ja" ? (isBlack ? "ブラック" : "ホワイト") : (isBlack ? "Black" : "White");
  const switchLabel = locale === "ja"
    ? `${isBlack ? "ホワイト" : "ブラック"}のガラスパッドに切り替え`
    : `Switch to ${isBlack ? "white" : "black"} glass`;

  useEffect(() => {
    const requestRevision = revision;
    setReady(true);
    return () => {
      requestRevision.current++;
      request.current?.abort();
      if (releaseTimer.current !== null) clearTimeout(releaseTimer.current);
    };
  }, []);

  function animateKey(key: string) {
    setPressed(key);
    if (releaseTimer.current !== null) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => setPressed(null), 160);
  }

  function editCode(value: string) {
    revision.current++;
    request.current?.abort();
    submitting.current = false;
    setTyped(value.slice(0, MAX_CODE_LENGTH));
    setStatus("idle");
    setResult(null);
  }

  function insertKey(key: string) {
    const field = input.current;
    const start = field?.selectionStart ?? typed.length;
    const end = field?.selectionEnd ?? typed.length;
    animateKey(key);
    field?.focus({ preventScroll: true });
    if (typed.length - (end - start) >= MAX_CODE_LENGTH) return;
    const value = typed.slice(0, start) + key + typed.slice(end);
    editCode(value);
    requestAnimationFrame(() => field?.setSelectionRange(Math.min(start + 1, value.length), Math.min(start + 1, value.length)));
  }

  async function checkCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const code = typed.trim();
    if (!code) {
      setStatus("empty");
      input.current?.focus({ preventScroll: true });
      return;
    }
    submitting.current = true;
    const version = ++revision.current;
    const controller = new AbortController();
    request.current = controller;
    setStatus("checking");
    setResult(null);
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/discount", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }), signal: controller.signal, cache: "no-store",
      });
      const data = await response.json();
      if (revision.current !== version) return;
      if (response.ok && data.status === "valid" && data.discount && typeof data.checkoutUrl === "string") {
        setResult(data as DiscountResult);
        setStatus("valid");
      } else {
        setStatus(["invalid", "not_started", "expired"].includes(data.status) ? data.status : "unavailable");
      }
    } catch {
      if (revision.current === version) setStatus("unavailable");
    } finally {
      clearTimeout(timeout);
      if (revision.current === version) {
        request.current = null;
        submitting.current = false;
      }
    }
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const host = deck.current;
    const surface = pad.current;
    if (!host || !surface || (event.target as HTMLElement).closest("form, button") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = host.getBoundingClientRect();
    host.style.setProperty("--px", ((event.clientX - bounds.left) / bounds.width - .5).toFixed(3));
    host.style.setProperty("--py", ((event.clientY - bounds.top) / bounds.height - .5).toFixed(3));
    const padBounds = surface.getBoundingClientRect();
    surface.style.setProperty("--lx", `${Math.max(0, Math.min(100, (event.clientX - padBounds.left) / padBounds.width * 100))}%`);
    surface.style.setProperty("--ly", `${Math.max(0, Math.min(100, (event.clientY - padBounds.top) / padBounds.height * 100))}%`);
  }

  function resetPointer() {
    deck.current?.style.setProperty("--px", "0");
    deck.current?.style.setProperty("--py", "0");
  }

  const benefit = result?.discount.type === "percentage"
    ? `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(result.discount.value)}%`
    : result?.discount.type === "amount"
      ? new Intl.NumberFormat(locale, { style: "currency", currency: result.discount.currency }).format(result.discount.value)
      : "";

  return <div ref={deck} className={styles.deck} onPointerMove={onPointerMove} onPointerLeave={resetPointer}>
    <div className={styles.padWrap}>
      <div ref={pad} className={styles.pad} data-tone={tone} aria-label={`${padLabel} — ${finish}`} role="img">
        <MonochromePadSurface tone={tone} className={styles.padSurface} />
        <div className={styles.glare} aria-hidden="true" />
      </div>
    </div>
    <button type="button" className={styles.finishSwitch} onClick={() => setTone(value => value === "white" ? "black" : "white")} aria-label={switchLabel}>
      <i data-tone={tone} aria-hidden="true" /><span>{copy.finish} / {finish}</span><b aria-hidden="true">↔</b>
    </button>

    <div className={styles.token} aria-hidden="true"><div><KaguraWordmark /></div></div>

    <form className={styles.keys} aria-label={keysLabel} method="post" action="/api/discount" onSubmit={checkCode} onFocus={resetPointer} data-drop-unlocked={status === "valid"}>
      <label className={styles.codeLabel} htmlFor={`${id}-code`}><span>{copy.label}</span><span aria-hidden="true">↙ {copy.prompt}</span></label>
      <div className={styles.screen}>
        <input ref={input} id={`${id}-code`} name="discount-code" type="text" value={typed} disabled={!ready} onChange={event => editCode(event.target.value)}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing) { if (event.key === "Enter") event.preventDefault(); return; }
            if (!event.metaKey && !event.ctrlKey && !event.altKey) animateKey(event.key.toUpperCase());
          }}
          placeholder={hint} aria-label={copy.input} aria-describedby={`${id}-feedback`} aria-invalid={status === "invalid" || status === "empty"}
          maxLength={MAX_CODE_LENGTH} autoComplete="off" autoCapitalize="characters" spellCheck={false} enterKeyHint="go" />
        {typed && <button type="button" className={styles.clear} aria-label={copy.clear} onClick={() => { editCode(""); input.current?.focus({ preventScroll: true }); }}>×</button>}
      </div>
      <div className={styles.row}>
        {KEYS.map((key, index) => <button key={index} type="button" disabled={!ready} className={styles.key} data-down={pressed === key} data-hot={index === 0}
          onMouseDown={event => event.preventDefault()} onClick={() => insertKey(key)} aria-label={copy.insert(key)}>
          <span className={styles.keyGlyph}><LogoKeyGlyph letter={key} variant={index === 0 ? "emblem" : "letter"} /></span>
        </button>)}
      </div>
      <button type="submit" className={`${styles.key} ${styles.space}`} disabled={!ready || status === "checking"} data-down={pressed === "ENTER"}>
        <span>{status === "checking" ? copy.checking : copy.enter}<b aria-hidden="true">↵</b></span>
      </button>
      <div id={`${id}-feedback`} className={styles.feedback} data-status={status} role="status" aria-live="polite" aria-atomic="true">
        {result && status === "valid" ? <div className={styles.reward}>
          <span className={styles.rewardLabel}>{copy.valid}</span>
          <strong>{benefit}<small>{result.discount.type === "amount" && result.discount.appliesOnEachItem ? copy.each : copy.off}</small></strong>
          <a href={result.checkoutUrl} rel="nofollow noreferrer">{copy.checkout}</a>
          {result.endsAt && <p>{copy.until} {new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(result.endsAt))}</p>}
          <p>{copy.terms}</p>
        </div> : <p>{status === "checking" ? copy.checking : copy[status === "valid" ? "idle" : status]}</p>}
      </div>
    </form>
  </div>;
}
