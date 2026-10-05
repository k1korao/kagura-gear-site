"use client";

import Link from "next/link";
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { useLocale } from "./LocaleProvider";
import { productCopy } from "@/lib/product-copy";
import styles from "./ArtistGlassExperience.module.css";

const translations = {
  zh: {
    drag: "拖动查看形态 · 方向键也可以调整", view: "选择观察视角", views: ["整体", "表面", "边缘"], viewer: "Artist 玻璃鼠标垫概念模型", keyboard: "左右方向键旋转，上下方向键调整倾斜；Home 键复位。", tilt: "倾斜角度", turn: "左右旋转", reset: "复位视角",
    back: "玻璃鼠标垫 / 全部系列", label: "02 / 画师系列", title: "让一个世界，留在桌面。", intro: "从画师的视角出发，让独特的表达拥有可以触碰的形态。",
    gallery: "Artist 概念展厅", study: "构图研究 — 001", studio: "KIKORA / 原创抽象研究",
    artAlt: "蓝灰色的抽象几何构图，层层方框向画面中心延伸", artworkTitle: "另一种空间。", artworkNote: "蓝灰、光线，与层叠的几何形态。", preview: "概念预览", concept: "当前为原创视觉研究，具体画师合作与最终款式尚未公布。",
    scroll: "向下走进创作", firstLabel: "从表达出发", firstTitle: "每位创作者，\n都有自己的世界。", firstBody: "一个角色的神情，一种难以替代的画风，一段还在生长的故事。我们希望每件作品都能留下创作者的视角，让你认出，也让你产生共鸣。",
    secondLabel: "让创作成为物件", secondTitle: "不只被看见，\n也被日常陪伴。", secondBody: "将构图放进一块玻璃，重新考虑边界、留白与观看距离。Artist 系列探索作品从画面走向桌面的可能，让收藏进入每天使用的空间。",
    dimension: "设计尺寸", specNote: "厚度、表面工艺与底部结构仍在开发中。", invitation: "下一幅作品，也许来自你的世界。", invitationText: "面向独立画师与个人 IP 创作者。欢迎带着作品集，和我们聊聊属于你的表达。", contact: "与我们聊聊共创", next: "继续探索", core: "Core 基础系列", covers: "Cover 专辑封面系列",
  },
  en: {
    drag: "Drag to explore · Arrow keys work too", view: "Choose a view", views: ["Overview", "Surface", "Edge"], viewer: "Artist glass mousepad concept model", keyboard: "Use left and right arrows to turn, up and down to tilt, and Home to reset.", tilt: "Tilt", turn: "Rotation", reset: "Reset view",
    back: "Glass mousepads / All collections", label: "02 / ARTIST EDITIONS", title: "An artist’s world. A place on your desk.", intro: "A point of view becomes an object. A world you connect with becomes part of your everyday.",
    gallery: "Artist concept gallery", study: "COMPOSITION STUDY — 001", studio: "KIKORA / ORIGINAL ABSTRACT STUDY",
    artAlt: "A blue-grey abstract composition of nested geometric frames receding into the centre", artworkTitle: "Another sense of space.", artworkNote: "Blue-grey, light, and layers of geometry.", preview: "CONCEPT PREVIEW", concept: "An original visual study. Collaborating artists and final editions have not yet been announced.",
    scroll: "Step into the story", firstLabel: "A POINT OF VIEW", firstTitle: "Every artist has\na world of their own.", firstBody: "A character’s expression. A style you would recognise anywhere. A story still taking shape. We want each piece to hold on to its creator’s perspective, and give you something to connect with.",
    secondLabel: "FROM IMAGE TO OBJECT", secondTitle: "Art to look at.\nArt to live with.", secondBody: "A composition finds its way onto glass. Its edges, empty spaces and viewing distance take on new meaning. Artist editions explores how a work of art can become part of the desk you return to each day.",
    dimension: "Design dimensions", specNote: "Thickness, surface finish and base construction are in development.", invitation: "Your world could be next.", invitationText: "Independent artist or original IP creator? Share your portfolio and tell us what you would love to make.", contact: "Start a collaboration conversation", next: "Keep exploring", core: "Core glass", covers: "Cover series",
  },
  ja: {
    drag: "ドラッグで角度を変更 · 矢印キーでも操作できます", view: "見る角度を選ぶ", views: ["全体", "表面", "エッジ"], viewer: "Artist ガラスマウスパッドのコンセプトモデル", keyboard: "左右キーで回転、上下キーで傾きを調整。Home キーで元の角度に戻ります。", tilt: "傾き", turn: "回転", reset: "角度をリセット",
    back: "ガラスマウスパッド / すべてのシリーズ", label: "02 / ARTIST シリーズ", title: "誰かの世界が、自分のデスクに。", intro: "描き手ならではの視点を、手に取れるかたちへ。好きな世界と過ごす、もうひとつの方法。",
    gallery: "Artist コンセプトギャラリー", study: "構成のスタディ — 001", studio: "KIKORA / オリジナルの抽象表現",
    artAlt: "ブルーグレーの幾何学的なフレームが、中心へと重なり合う抽象的な構図", artworkTitle: "もうひとつの奥行き。", artworkNote: "ブルーグレーと光、幾何学の重なり。", preview: "コンセプト展示", concept: "現在はオリジナルのビジュアルスタディを展示しています。参加アーティストや製品の最終デザインは未発表です。",
    scroll: "創作の背景へ", firstLabel: "表現から、はじまる", firstTitle: "描き手の数だけ、\n世界がある。", firstBody: "キャラクターの表情。ひと目でわかる、その人だけの画風。まだ続いていく物語。一つひとつの作品に描き手の視点を残し、共感できる出会いを届けたいと考えています。",
    secondLabel: "絵から、ものへ", secondTitle: "眺めるだけでなく、\n日々をともにする。", secondBody: "一枚のガラスに絵を置くとき、余白や輪郭、目との距離をあらためて考える。Artist シリーズは、作品がいつものデスクにある暮らしを探っていきます。",
    dimension: "デザイン寸法", specNote: "厚さ、表面の仕上げ、ベース構造は開発中です。", invitation: "次は、あなたの世界から。", invitationText: "イラストレーターやオリジナル IP のクリエイターの皆さまへ。ポートフォリオとともに、かたちにしたい想いを聞かせてください。", contact: "共創について相談する", next: "ほかのシリーズへ", core: "Core シリーズ", covers: "Cover シリーズ",
  },
};

function StudioComposition({ label }: { label: string }) {
  const id = useId().replaceAll(":", "");
  return (
    <svg viewBox="0 0 1400 1200" role="img" aria-label={label} className={styles.composition}>
      <defs>
        <linearGradient id={`${id}-base`} x1="1" y1="0" x2="0" y2="1"><stop stopColor="#d8e1e6" /><stop offset=".45" stopColor="#8c9ead" /><stop offset="1" stopColor="#273e55" /></linearGradient>
        <radialGradient id={`${id}-light`} cx="70%" cy="28%" r="62%"><stop stopColor="#e0edf2" stopOpacity=".47" /><stop offset="1" stopColor="#e0edf2" stopOpacity="0" /></radialGradient>
      </defs>
      <path fill={`url(#${id}-base)`} d="M0 0h1400v1200H0z" />
      <g transform="translate(714 528) rotate(-27.5)" fill="none">
        {Array.from({ length: 15 }, (_, index) => {
          const size = 800 - index * 44;
          return <rect key={index} x={-size / 2 + index * 6} y={-size / 2} width={size} height={size} stroke={index % 3 === 0 ? "#dbe8f0" : "#273a4d"} strokeOpacity={index % 3 === 0 ? .58 : .42} strokeWidth={index % 3 === 0 ? 15 : 2} />;
        })}
      </g>
      <path fill={`url(#${id}-light)`} d="M0 0h1400v1200H0z" />
      <text x="54" y="1137" fill="#f3f6f7" fontFamily="Arial, sans-serif" fontSize="21" letterSpacing="1">KIKORA / STUDIO</text>
      <text x="1145" y="1137" fill="#f3f6f7" fontFamily="monospace" fontSize="14">FORM STUDY — 001</text>
    </svg>
  );
}

const presets = [{ x: 46, y: -12, z: -18 }, { x: 14, y: 0, z: -7 }, { x: 72, y: -8, z: -14 }];
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function ArtistGlassExperience() {
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
      <div className={styles.topline}><Link href="/explore/glass">↖ {text.back}</Link><span>KIKORA / ARTIST</span></div>
      <header className={styles.header}><p className={styles.eyebrow}>{text.label}</p><div className={styles.titleRow}><h1>Artist<span>.</span></h1><div><h2>{text.title}</h2><p>{text.intro}</p></div></div></header>

      <section className={styles.experience} aria-label={text.viewer}>
        <div className={styles.stageTop}><span>{text.study}</span><span>490 × 420</span></div>
        <div
          className={`${styles.stage} ${dragging ? styles.dragging : ""}`}
          style={{ "--tilt-x": `${angle.x}deg`, "--tilt-y": `${angle.y}deg`, "--tilt-z": `${angle.z}deg` } as CSSProperties}
          role="group" tabIndex={0} aria-label={text.viewer} aria-describedby={`${id}-instructions`}
          onKeyDown={handleKey} onPointerDown={startDrag} onPointerMove={moveDrag}
          onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
        >
          <div className={styles.stageCoordinates} aria-hidden="true"><span>01</span><span>+</span><span>+</span><span>+</span></div>
          <div className={styles.shadow} aria-hidden="true" />
          <div className={styles.pad}>
            <div className={styles.padSurface}><StudioComposition label={text.artAlt} /><span className={styles.reflection} aria-hidden="true" /></div>
          </div>
          <div className={styles.surfaceLabel} aria-hidden="true"><span />ARTIST — 001</div>
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

      <div className={styles.galleryColumn}>
          <div className={styles.exhibitCaption}><div><span>{text.studio}</span><h2>{text.artworkTitle}</h2><p>{text.artworkNote}</p></div><span className={styles.swatches} aria-hidden="true"><i /><i /><i /></span></div>
          <p className={styles.conceptNote}>{text.concept}</p>
        </div>

      <section className={styles.gallery} aria-label={text.gallery}>
        <div className={styles.story}>
          <div className={styles.storyIntro}><span>{text.scroll}</span><span aria-hidden="true">↓</span></div>
          <article className={styles.chapter}><span className={styles.chapterNumber}>01</span><p className={styles.eyebrow}>{text.firstLabel}</p><h2>{text.firstTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p className={styles.body}>{text.firstBody}</p><span className={styles.rule} aria-hidden="true" /></article>
          <article className={styles.chapter}><span className={styles.chapterNumber}>02</span><p className={styles.eyebrow}>{text.secondLabel}</p><h2>{text.secondTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p className={styles.body}>{text.secondBody}</p><dl className={styles.dimension}><dt>{text.dimension}</dt><dd>490 × 420 mm</dd></dl><p className={styles.specNote}>{text.specNote}</p></article>
        </div>


      </section>

      <section className={styles.invitation}><span className={styles.eyebrow}>KIKORA / OPEN STUDIO</span><div><h2>{text.invitation}</h2><p>{text.invitationText}</p><Link href="/contact">{text.contact}<span aria-hidden="true">↗</span></Link></div></section>
      <nav className={styles.next} aria-label={text.next}><span>{text.next}</span><Link href="/explore/glass/core"><small>{copy.collections[0].caption}</small>{text.core}<span aria-hidden="true">↗</span></Link><Link href="/explore/glass/covers"><small>{copy.collections[2].caption}</small>{text.covers}<span aria-hidden="true">↗</span></Link></nav>

    </main>
  );
}
