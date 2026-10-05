"use client";

import Link from "next/link";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { useLocale } from "./LocaleProvider";
import { productCopy } from "@/lib/product-copy";
import styles from "./CoreGlassExperience.module.css";

const translations = {
  zh: {
    back: "玻璃鼠标垫 / 全部系列", label: "01 / 基础系列", title: "留白，也有分量。", intro: "一块安静的表面，把空间留给你。",
    study: "形态研究", drag: "拖动查看形态 · 方向键也可以调整", view: "选择观察视角", views: ["整体", "表面", "边缘"],
    viewer: "Core 玻璃鼠标垫概念模型", keyboard: "左右方向键旋转，上下方向键调整倾斜；Home 键复位。", tilt: "倾斜角度", turn: "左右旋转", reset: "复位视角",
    detailTitles: ["从整体，看比例。", "靠近一点，看留白。", "换个角度，看轮廓。"],
    detailText: ["490 × 420 mm 的设计尺寸，让简洁的轮廓成为桌面的一部分。", "炭黑色的视觉概念，让标识和画面都保持克制。表面工艺仍在打样确认中。", "用光线勾勒边界，观察平面如何成为一件物件。最终厚度、倒角与底部结构尚未确定。"],
    dimensions: "设计尺寸", finish: "视觉方向", charcoal: "炭黑 / 简洁", status: "产品进度", developing: "概念开发中", note: "当前为造型概念展示。颜色、厚度与表面效果不代表最终生产规格。",
    next: "继续探索", artist: "走进画师系列", covers: "浏览专辑封面系列", release: "关注发售动态",
  },
  en: {
    back: "Glass mousepads / All collections", label: "01 / CORE COLLECTION", title: "Quiet, with presence.", intro: "A considered surface. Space to make your own.",
    study: "FORM STUDY", drag: "Drag to explore · Arrow keys work too", view: "Choose a view", views: ["Overview", "Surface", "Edge"],
    viewer: "Core glass mousepad concept model", keyboard: "Use left and right arrows to turn, up and down to tilt, and Home to reset.", tilt: "Tilt", turn: "Rotation", reset: "Reset view",
    detailTitles: ["Start with the proportions.", "A closer look at restraint.", "Find another perspective."],
    detailText: ["A planned 490 × 420 mm format, with a quiet silhouette that finds its place on your desk.", "A charcoal visual study, with a restrained mark and an uncluttered surface. The final finish is still being developed.", "Light traces the outline, turning a plane into an object. Thickness, edge treatment and base construction are still to be confirmed."],
    dimensions: "Design dimensions", finish: "Visual direction", charcoal: "Charcoal / Minimal", status: "Development", developing: "Concept stage", note: "A form study. Colour, thickness and surface appearance do not represent final production specifications.",
    next: "Keep exploring", artist: "Visit Artist editions", covers: "Explore the Cover series", release: "Get release updates",
  },
  ja: {
    back: "ガラスマウスパッド / すべてのシリーズ", label: "01 / CORE シリーズ", title: "静かに、存在する。", intro: "余白を残した一枚を、自分らしいデスクに。",
    study: "かたちのスタディ", drag: "ドラッグで角度を変更 · 矢印キーでも操作できます", view: "見る角度を選ぶ", views: ["全体", "表面", "エッジ"],
    viewer: "Core ガラスマウスパッドのコンセプトモデル", keyboard: "左右キーで回転、上下キーで傾きを調整。Home キーで元の角度に戻ります。", tilt: "傾き", turn: "回転", reset: "角度をリセット",
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
  const [angle, setAngle] = useState(presets[0]);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef<{ id: number; x: number; y: number; angle: typeof angle } | null>(null);
  const id = useId();

  function selectView(index: number) {
    setView(index);
    setAngle(presets[index]);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, { x?: number; y?: number }> = { ArrowLeft: { y: -5 }, ArrowRight: { y: 5 }, ArrowUp: { x: -5 }, ArrowDown: { x: 5 } };
    if (event.key === "Home") { event.preventDefault(); setAngle(presets[view]); return; }
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    setAngle(previous => ({ ...previous, x: clamp(previous.x + (step.x || 0), 10, 76), y: clamp(previous.y + (step.y || 0), -35, 35) }));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, angle };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    if (!start || start.id !== event.pointerId) return;
    setAngle({ ...start.angle, y: clamp(start.angle.y + (event.clientX - start.x) * .14, -35, 35), x: event.pointerType === "touch" ? start.angle.x : clamp(start.angle.x - (event.clientY - start.y) * .12, 10, 76) });
  }

  function endDrag() { pointer.current = null; setDragging(false); }

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
          style={{ "--tilt-x": `${angle.x}deg`, "--tilt-y": `${angle.y}deg`, "--tilt-z": `${angle.z}deg` } as CSSProperties}
          role="group" tabIndex={0} aria-label={text.viewer} aria-describedby={`${id}-instructions`}
          onKeyDown={handleKey} onPointerDown={startDrag} onPointerMove={moveDrag}
          onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
        >
          <div className={styles.stageCoordinates} aria-hidden="true"><span>01</span><span>+</span><span>+</span><span>+</span></div>
          <div className={styles.shadow} aria-hidden="true" />
          <div className={styles.pad} aria-hidden="true">
            <div className={styles.padSurface}><span className={styles.brand}>KIKORA</span><span className={styles.padCaption}>CORE / 001</span><span className={styles.reflection} /></div>
          </div>
          <div className={styles.surfaceLabel} aria-hidden="true"><span />CORE — 001</div>
        </div>
        <div className={styles.stageBottom}><p>{text.drag}</p><span aria-hidden="true">↔</span></div>
        <p id={`${id}-instructions`} className={styles.srOnly}>{text.keyboard}</p>
      </section>

      <div className={styles.controls}>
        <div className={styles.presets} role="group" aria-label={text.view}>{text.views.map((label, index) => <button type="button" key={label} aria-pressed={view === index} onClick={() => selectView(index)}><span>0{index + 1}</span>{label}</button>)}</div>
        <div className={styles.sliders}>
          <label htmlFor={`${id}-tilt`}><span>{text.tilt}<output>{Math.round(angle.x)}°</output></span><input id={`${id}-tilt`} type="range" min="10" max="76" value={Math.round(angle.x)} onChange={event => setAngle(previous => ({ ...previous, x: Number(event.target.value) }))} /></label>
          <label htmlFor={`${id}-turn`}><span>{text.turn}<output>{Math.round(angle.y)}°</output></span><input id={`${id}-turn`} type="range" min="-35" max="35" value={Math.round(angle.y)} onChange={event => setAngle(previous => ({ ...previous, y: Number(event.target.value) }))} /></label>
          <button type="button" className={styles.reset} onClick={() => setAngle(presets[view])}>{text.reset} ↺</button>
        </div>
      </div>

      <section className={styles.notes}>
        <div className={styles.detail} aria-live="polite"><span className={styles.eyebrow}>0{view + 1} / CORE</span><h2>{text.detailTitles[view]}</h2><p>{text.detailText[view]}</p></div>
        <div><dl className={styles.specs}><div><dt>{text.dimensions}</dt><dd>490 × 420 mm</dd></div><div><dt>{text.finish}</dt><dd>{text.charcoal}</dd></div><div><dt>{text.status}</dt><dd>{text.developing}</dd></div></dl><p className={styles.note}>{text.note}</p><Link className={styles.release} href="/#newsletter">{text.release}<span aria-hidden="true">↗</span></Link></div>
      </section>

      <nav className={styles.next} aria-label={text.next}><span>{text.next}</span><Link href="/explore/glass/artist"><small>{copy.collections[1].name}</small>{text.artist}<span aria-hidden="true">↗</span></Link><Link href="/explore/glass/covers"><small>{copy.collections[2].name}</small>{text.covers}<span aria-hidden="true">↗</span></Link></nav>
    </main>
  );
}
