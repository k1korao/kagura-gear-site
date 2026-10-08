"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { MonochromePadSurface } from "./MonochromePadSurface";
import styles from "./ArtGallery.module.css";

const PADS = [
  { tone: "white", title: "WHITE" },
  { tone: "black", title: "BLACK" },
] as const;

const COPY = {
  en: {
    label: "KIKORA / MONOCHROME CONCEPTS",
    title: ["Simply glass.", "Simply KIKORA."],
    copy: "White or black. A quiet glass surface, with only the KIKORA name. Drag, swipe or use the arrow keys to explore both concepts.",
    prev: "Previous finish", next: "Next finish", format: "GLASS PAD / CONCEPT", status: "Glass mousepad concept — in development.",
    pads: ["White glass mousepad concept", "Black glass mousepad concept"],
  },
  ja: {
    label: "KIKORA / MONOCHROME CONCEPTS",
    title: ["白と黒。", "KIKORAのかたち。"],
    copy: "白、または黒。ガラスの上には、KIKORAの名前だけ。ドラッグ、スワイプ、または矢印キーで、2つのコンセプトをご覧いただけます。",
    prev: "前のカラー", next: "次のカラー", format: "GLASS PAD / CONCEPT", status: "ガラスマウスパッドのコンセプト。開発中です。",
    pads: ["白いガラスマウスパッドのコンセプト", "黒いガラスマウスパッドのコンセプト"],
  },
} as const;

export function ArtGallery() {
  const copy = COPY[useLocale()];
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; moved: boolean; index: number | null } | null>(null);
  const wheelLock = useRef(0);
  const go = (step: number) => setActive(value => (value + step + PADS.length) % PADS.length);

  function onTilt(event: React.PointerEvent<HTMLElement>) {
    if (drag.current) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--rx", `${((.5 - y) * 10).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${((x - .5) * 12).toFixed(2)}deg`);
  }

  function resetTilt(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  return <section className={styles.gallery} aria-labelledby="gallery-title">
    <div className={styles.heading}>
      <div><p className={styles.label}>{copy.label}</p><h2 id="gallery-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2></div>
      <p>{copy.copy}</p>
    </div>

    <div
      className={styles.stage}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={copy.label}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      }}
      onWheel={event => {
        if (Math.abs(event.deltaX) < 12 || Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Date.now() < wheelLock.current) return;
        wheelLock.current = Date.now() + 450;
        go(event.deltaX > 0 ? 1 : -1);
      }}
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        const target = event.target instanceof Element ? event.target.closest("[data-pad-index]") : null;
        const index = target?.getAttribute("data-pad-index");
        drag.current = { x: event.clientX, moved: false, index: index == null ? null : Number(index) };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => {
        const start = drag.current;
        if (!start || start.moved) return;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 50) { start.moved = true; go(dx < 0 ? 1 : -1); }
      }}
      onPointerUp={event => {
        const start = drag.current;
        if (start && !start.moved && start.index !== null) setActive(start.index);
        drag.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
    >
      <div className={styles.floor} aria-hidden="true" />
      {PADS.map((pad, index) => <article
        key={pad.tone}
        className={styles.card}
        data-active={index === active}
        data-pad-index={index}
        style={{ "--side": index === 0 ? -1 : 1 } as React.CSSProperties}
        aria-label={copy.pads[index]}
        onPointerMove={index === active ? onTilt : undefined}
        onPointerLeave={resetTilt}
      >
        <div className={styles.slab}>
          <MonochromePadSurface tone={pad.tone} />
        </div>
        <div className={styles.caption}><span>{pad.title}</span><span>{copy.format}</span></div>
      </article>)}
    </div>

    <div className={styles.controls}>
      <button type="button" onClick={() => go(-1)} aria-label={copy.prev}>←</button>
      <div className={styles.choices}>{PADS.map((pad, index) => <button key={pad.tone} type="button" aria-label={copy.pads[index]} aria-pressed={index === active} onClick={() => setActive(index)}><span className={styles.swatch} data-tone={pad.tone} aria-hidden="true" />{pad.title}</button>)}</div>
      <button type="button" onClick={() => go(1)} aria-label={copy.next}>→</button>
    </div>
    <p className={styles.status} aria-live="polite"><b>{PADS[active].title}</b> — {copy.status}</p>
  </section>;
}
