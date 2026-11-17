"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroDeck.module.css";
import { KaguraWordmark } from "./KaguraWordmark";
import { LogoKeyGlyph } from "./LogoKeyGlyph";
import { useLocale } from "./LocaleProvider";
import { MonochromePadSurface } from "./MonochromePadSurface";

const KEYS = ["K", "I", "K", "O", "R", "A"] as const;
const COPY = {
  en: {
    label: "KIKORA PLAY", prompt: "TAP THE KEYS", display: "Your lettering", clear: "Clear lettering",
    play: (key: string) => `Play ${key}`, explore: "EXPLORE", idle: "A little play. A world of ideas.",
    finish: "GLASS FINISH",
  },
  ja: {
    label: "KIKORA PLAY", prompt: "キーを押してみよう", display: "入力した文字", clear: "文字を消去",
    play: (key: string) => `${key} キーで遊ぶ`, explore: "コレクションを見る", idle: "遊び心から、アイデアが広がる。",
    finish: "ガラスのカラー",
  },
} as const;

/** A local brand interaction alongside the glass finish preview. */
export function HeroDeck({ padLabel, keysLabel }: { padLabel: string; keysLabel: string }) {
  const locale = useLocale();
  const copy = COPY[locale];
  const deck = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pressed, setPressed] = useState<number | null>(null);
  const [lettering, setLettering] = useState("");
  const [tone, setTone] = useState<"white" | "black">("white");
  const isBlack = tone === "black";
  const finish = locale === "ja" ? (isBlack ? "ブラック" : "ホワイト") : (isBlack ? "Black" : "White");
  const switchLabel = locale === "ja"
    ? `${isBlack ? "ホワイト" : "ブラック"}のガラスパッドに切り替え`
    : `Switch to ${isBlack ? "white" : "black"} glass`;

  useEffect(() => () => {
    if (releaseTimer.current !== null) clearTimeout(releaseTimer.current);
  }, []);

  function playKey(index: number) {
    setPressed(index);
    setLettering(value => (value + KEYS[index]).slice(-12));
    if (releaseTimer.current !== null) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => setPressed(null), 160);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const host = deck.current;
    const surface = pad.current;
    if (!host || !surface || (event.target as HTMLElement).closest("button, a") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

    <div className={styles.keys} role="group" aria-label={keysLabel} onFocus={resetPointer}>
      <div className={styles.keyboardLabel}><span>{copy.label}</span><span aria-hidden="true">↙ {copy.prompt}</span></div>
      <div className={styles.screen}>
        <output className={styles.lettering} aria-label={copy.display} aria-live="polite">{lettering || "KIKORA"}</output>
        <button type="button" className={styles.clear} aria-label={copy.clear} disabled={!lettering} onClick={() => setLettering("")}>×</button>
      </div>
      <div className={styles.row}>
        {KEYS.map((key, index) => <button key={index} type="button" className={styles.key} data-down={pressed === index} data-hot={index === 0}
          onClick={() => playKey(index)} aria-label={copy.play(key)}>
          <span className={styles.keyGlyph}><LogoKeyGlyph letter={key} variant={index === 0 ? "emblem" : "letter"} /></span>
        </button>)}
      </div>
      <a href="#discover" className={`${styles.key} ${styles.space}`}><span>{copy.explore}<b aria-hidden="true">↘</b></span></a>
      <div className={styles.feedback}><p>{copy.idle}</p></div>
    </div>
  </div>;
}
