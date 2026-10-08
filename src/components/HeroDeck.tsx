"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HeroDeck.module.css";
import { KaguraSymbol } from "./KaguraSymbol";
import { useLocale } from "./LocaleProvider";
import { MonochromePadSurface } from "./MonochromePadSurface";

const KEYS = ["K", "I", "K", "O", "R", "A"];

/** Plain glass finishes with interactive metal keycaps and a metal token. */
export function HeroDeck({ hint, padLabel, keysLabel }: { hint: string; padLabel: string; keysLabel: string }) {
  const locale = useLocale();
  const deck = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const releaseTimer = useRef<number | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [tone, setTone] = useState<"white" | "black">("white");
  const isBlack = tone === "black";
  const finish = locale === "ja" ? (isBlack ? "ブラック" : "ホワイト") : (isBlack ? "Black" : "White");
  const switchLabel = locale === "ja"
    ? `${isBlack ? "ホワイト" : "ブラック"}のガラスパッドに切り替え`
    : `Switch to ${isBlack ? "white" : "black"} glass`;

  const press = useCallback((key: string) => {
    setPressed(key);
    setTyped(value => (value + key).slice(-10));
    if (releaseTimer.current !== null) window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => setPressed(null), 160);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (event.metaKey || event.ctrlKey || event.altKey || target?.closest("input, textarea, select, [contenteditable]")) return;
      const key = event.key.toUpperCase();
      if (!/^[A-Z0-9]$/.test(key)) return;
      press(key);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (releaseTimer.current !== null) window.clearTimeout(releaseTimer.current);
    };
  }, [press]);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const host = deck.current;
    const surface = pad.current;
    if (!host || !surface || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

    <div className={styles.token} aria-hidden="true"><div><KaguraSymbol /></div></div>

    <div className={styles.keys} role="group" aria-label={keysLabel}>
      <div className={styles.screen} aria-hidden="true"><span>{typed || hint}</span><i /></div>
      <div className={styles.row}>
        {KEYS.map((key, index) => <button key={index} type="button" className={styles.key} data-down={pressed === key} data-hot={index === 5} onClick={() => press(key)} aria-label={key}>
          <span>{key}</span>
        </button>)}
      </div>
      <button type="button" className={`${styles.key} ${styles.space}`} onClick={() => setTone(value => value === "white" ? "black" : "white")} aria-label={switchLabel}>
        <span>{locale === "ja" ? (isBlack ? "ブラック → ホワイト" : "ホワイト → ブラック") : (isBlack ? "BLACK → WHITE" : "WHITE → BLACK")}</span>
      </button>
    </div>
  </div>;
}
