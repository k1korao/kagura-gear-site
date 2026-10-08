"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { KEY_ARTS, KeyArt } from "./KeyArt";
import styles from "./ArtGallery.module.css";

const COPY = {
  en: {
    label: "ORIGINAL CHARACTERS / KIKORA WORLDS",
    title: ["Worlds,", "in full perspective."],
    copy: "Drag, scroll or use the arrow keys. Each concept is imagined as a limited glass mousepad — hover the front card to catch the holographic finish.",
    prev: "Previous artwork", next: "Next artwork", format: "GLASS PAD / 490 × 420 MM", status: "Original KIKORA character concept — glass edition in development.",
  },
  ja: {
    label: "ORIGINAL CHARACTERS / KIKORA WORLDS",
    title: ["世界を、", "奥行きのままに。"],
    copy: "ドラッグ、スクロール、または矢印キーで切り替え。各コンセプトは限定ガラスマウスパッドとして構想中です。手前のカードにカーソルを重ねると、ホログラムの質感が見えます。",
    prev: "前のアートワーク", next: "次のアートワーク", format: "GLASS PAD / 490 × 420 MM", status: "KIKORA オリジナルキャラクターのコンセプト。ガラスエディションは開発中です。",
  },
} as const;

export function ArtGallery() {
  const copy = COPY[useLocale()];
  const [active, setActive] = useState(1);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const wheelLock = useRef(0);
  const count = KEY_ARTS.length;
  const go = (step: number) => setActive(value => (value + step + count) % count);

  function onTilt(event: React.PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--rx", `${((.5 - y) * 16).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${((x - .5) * 20).toFixed(2)}deg`);
    card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  }

  function resetTilt(event: React.PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
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
      onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); go(1); } if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); } }}
      onWheel={event => { if (Math.abs(event.deltaX) < 12 || Date.now() < wheelLock.current) return; wheelLock.current = Date.now() + 450; go(event.deltaX > 0 ? 1 : -1); }}
      onPointerDown={event => { drag.current = { x: event.clientX, moved: false }; }}
      onPointerMove={event => { const start = drag.current; if (!start || start.moved) return; const dx = event.clientX - start.x; if (Math.abs(dx) > 50) { start.moved = true; go(dx < 0 ? 1 : -1); } }}
      onPointerUp={() => { window.setTimeout(() => { drag.current = null; }, 0); }}
      onPointerLeave={() => { drag.current = null; }}
    >
      <div className={styles.floor} aria-hidden="true" />
      {KEY_ARTS.map((art, index) => {
        let offset = index - active;
        if (offset > count / 2) offset -= count;
        if (offset < -count / 2) offset += count;
        const isActive = offset === 0;
        return <article
          key={art.id}
          className={styles.card}
          data-active={isActive}
          style={{ "--offset": offset, "--abs": Math.abs(offset) } as React.CSSProperties}
          aria-hidden={!isActive}
          onClick={() => { if (!drag.current?.moved && !isActive) setActive(index); }}
          onPointerMove={isActive ? onTilt : undefined}
          onPointerLeave={isActive ? resetTilt : undefined}
        >
          <div className={styles.slab}>
            <KeyArt art={art.id} className={styles.art} />
            <span className={styles.holo} aria-hidden="true" />
            <span className={styles.glare} aria-hidden="true" />
          </div>
          <div className={styles.caption}><span>{String(index + 1).padStart(2, "0")} / {art.title}</span><span>{copy.format}</span></div>
        </article>;
      })}
    </div>

    <div className={styles.controls}>
      <button type="button" onClick={() => go(-1)} aria-label={copy.prev}>←</button>
      <div className={styles.dots}>{KEY_ARTS.map((art, index) => <button key={art.id} type="button" aria-label={art.title} aria-current={index === active} onClick={() => setActive(index)} />)}</div>
      <button type="button" onClick={() => go(1)} aria-label={copy.next}>→</button>
    </div>
    <p className={styles.status} aria-live="polite"><b>{KEY_ARTS[active].title}</b> — {copy.status}</p>
  </section>;
}
