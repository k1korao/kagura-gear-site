"use client";

import Link from "next/link";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { useLocale } from "./LocaleProvider";
import { productCopy } from "@/lib/product-copy";
import styles from "./CoreGlassExperience.module.css";

const translations = {
  en: {
    back: "Glass mousepads / All collections", label: "01 / CORE COLLECTION", title: "Quiet, with presence.", intro: "A considered surface. Space to make your own.",
    study: "FORM STUDY", drag: "Choose a view, or swipe gently", view: "Choose a view", views: ["Overview", "Surface", "Edge"],
    viewer: "Core glass mousepad concept model", keyboard: "Swipe left or right, or use the left and right arrow keys to switch between Overview, Surface and Edge. Home returns to Overview.",
    detailTitles: ["Start with the proportions.", "A closer look at restraint.", "Find another perspective."],
    detailText: ["A planned 490 × 420 mm format, with a quiet silhouette that finds its place on your desk.", "A charcoal visual study, with a restrained mark and an uncluttered surface. The final finish is still being developed.", "Light traces the outline, turning a plane into an object. Thickness, edge treatment and base construction are still to be confirmed."],
    dimensions: "Design dimensions", finish: "Visual direction", charcoal: "Charcoal / Minimal", status: "Development", developing: "Concept stage", note: "A form study. Colour, thickness and surface appearance do not represent final production specifications.",
    next: "Keep exploring", artist: "Visit Artist editions", covers: "Explore the Cover series", release: "Get release updates",
  },
  ja: {
    back: "ガラスマウスパッド / すべてのシリーズ", label: "01 / CORE シリーズ", title: "静かに、存在する。", intro: "余白を残した一枚を、自分らしいデスクに。",
    study: "かたちのスタディ", drag: "角度を選ぶ、または左右にスワイプ", view: "見る角度を選ぶ", views: ["全体", "表面", "エッジ"],
    viewer: "Core ガラスマウスパッドのコンセプトモデル", keyboard: "左右へのスワイプ、または左右キーで全体・表面・エッジを切り替えられます。Home キーで全体に戻ります。",
    detailTitles: ["まずは、プロポーションから。", "近づくと見える、引き算。", "角度を変えて、輪郭を見る。"],
    detailText: ["想定サイズは 490 × 420 mm。すっきりとした輪郭が、いつものデスクになじみます。", "チャコールを基調に、ロゴも控えめに。表面の仕上げは、これから検証を重ねていきます。", "光が輪郭をなぞり、一枚の面に立体感を生みます。厚さ、エッジの処理、ベースの構造はまだ検討中です。"],
    dimensions: "デザイン寸法", finish: "デザインの方向性", charcoal: "チャコール / ミニマル", status: "開発状況", developing: "コンセプト段階", note: "かたちを検討するためのイメージです。色、厚さ、表面の表現は製品の最終仕様とは異なります。",
    next: "ほかのシリーズへ", artist: "Artist シリーズを見る", covers: "Cover シリーズを見る", release: "発売情報を受け取る",
  },
};

const presets = [{ x: 46, y: -12, z: -18 }, { x: 14, y: 0, z: -7 }, { x: 72, y: -8, z: -14 }];
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function CoreGlassExperience() {
  const locale = useLocale();
  const text = translations[locale];
  const copy = productCopy[locale];
  const [view, setView] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef<{ id: number; x: number; threshold: number } | null>(null);
  const id = useId();
  const angle = presets[view];

  function endDrag() {
    pointer.current = null;
    setDragOffset(0);
    setDragging(false);
  }

  function selectView(index: number) {
    endDrag();
    setView((index + presets.length) % presets.length);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Home") { event.preventDefault(); selectView(0); return; }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    selectView(view + (event.key === "ArrowRight" ? 1 : -1));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      threshold: clamp(event.currentTarget.clientWidth * .12, 45, 85),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    if (!start || start.id !== event.pointerId) return;
    setDragOffset(clamp((event.clientX - start.x) / start.threshold, -1, 1));
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    if (!start || start.id !== event.pointerId) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) >= start.threshold) selectView(view + (distance < 0 ? 1 : -1));
    else endDrag();
  }

  return (
    <main className={styles.page}>
      <div className={styles.topline}><Link href="/explore/glass">↖ {text.back}</Link><span>KIKORA / CORE</span></div>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>{text.label}</p><h1>Core<span>.</span></h1></div>
        <div className={styles.statement}><h2>{text.title}</h2><p>{text.intro}</p></div>
      </header>

      <section className={styles.experience} aria-label={text.viewer}>
        <div className={styles.stageTop}><span>{text.study} — 001</span><span>490 × 420</span></div>
        <div
          className={`${styles.stage} ${dragging ? styles.dragging : ""}`}
          style={{ "--tilt-x": `${angle.x}deg`, "--tilt-y": `${angle.y + dragOffset * 7}deg`, "--tilt-z": `${angle.z}deg`, "--drag-offset": `${dragOffset * 10}px` } as CSSProperties}
          role="group" tabIndex={0} aria-label={text.viewer} aria-describedby={`${id}-instructions`}
          onKeyDown={handleKey} onPointerDown={startDrag} onPointerMove={moveDrag}
          onPointerUp={finishDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
        >
          <div className={styles.stageCoordinates} aria-hidden="true"><span>01</span><span>+</span><span>+</span><span>+</span></div>
          <div className={styles.shadow} aria-hidden="true" />
          <div className={styles.pad} aria-hidden="true">
            <div className={styles.padSurface}><span className={styles.brand}>KIKORA</span><span className={styles.padCaption}>CORE / 001</span><span className={styles.reflection} /></div>
          </div>
          <div className={styles.surfaceLabel} aria-hidden="true"><span />CORE — 001</div>
        </div>
        <div className={styles.stageBottom}><p><span aria-hidden="true">↔</span>{text.drag}</p><span className={styles.viewCount} aria-hidden="true">0{view + 1}<i />03</span></div>
        <p id={`${id}-instructions`} className={styles.srOnly}>{text.keyboard}</p>
      </section>

      <div className={styles.controls}>
        <div className={styles.presets} role="group" aria-label={text.view}>{text.views.map((label, index) => <button type="button" key={label} aria-pressed={view === index} onClick={() => selectView(index)}><span>0{index + 1}</span>{label}</button>)}</div>
      </div>

      <section className={styles.notes}>
        <div className={styles.detail} aria-live="polite"><span className={styles.eyebrow}>0{view + 1} / CORE</span><h2>{text.detailTitles[view]}</h2><p>{text.detailText[view]}</p></div>
        <div><dl className={styles.specs}><div><dt>{text.dimensions}</dt><dd>490 × 420 mm</dd></div><div><dt>{text.finish}</dt><dd>{text.charcoal}</dd></div><div><dt>{text.status}</dt><dd>{text.developing}</dd></div></dl><p className={styles.note}>{text.note}</p><Link className={styles.release} href="/#newsletter">{text.release}<span aria-hidden="true">↗</span></Link></div>
      </section>

      <nav className={styles.next} aria-label={text.next}><span>{text.next}</span><Link href="/explore/glass/artist"><small>{copy.collections[1].name}</small>{text.artist}<span aria-hidden="true">↗</span></Link><Link href="/explore/glass/covers"><small>{copy.collections[2].name}</small>{text.covers}<span aria-hidden="true">↗</span></Link></nav>
    </main>
  );
}
