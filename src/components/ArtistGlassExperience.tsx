"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useLocale } from "./LocaleProvider";
import { productCopy } from "@/lib/product-copy";
import styles from "./ArtistGlassExperience.module.css";

const translations = {
  zh: {
    back: "玻璃鼠标垫 / 全部系列", label: "02 / 画师系列", title: "让一个世界，留在桌面。", intro: "从画师的视角出发，让独特的表达拥有可以触碰的形态。",
    gallery: "Artist 概念展厅", study: "构图研究 — 001", studio: "KIKORA / 原创抽象研究", artwork: "正面构图", object: "桌面视角", edge: "侧看轮廓", drag: "拖动旋转 · 方向键微调", light: "移动光线", reset: "重置视角", inspect: "进入作品细节", zoomLevel: "放大倍率", zoomIn: "放大", zoomOut: "缩小", pan: "放大后拖动查看 · 方向键移动 · + / − 缩放 · 0 复位", resetArt: "回到全幅", lightNote: "光影为展示效果", mode: "选择作品呈现方式", zoom: "放大欣赏", close: "关闭作品大图",
    artAlt: "蓝灰色的抽象几何构图，层层方框向画面中心延伸", artworkTitle: "另一种空间。", artworkNote: "蓝灰、光线，与层叠的几何形态。", preview: "概念预览", concept: "当前为原创视觉研究，具体画师合作与最终款式尚未公布。",
    scroll: "向下走进创作", firstLabel: "从表达出发", firstTitle: "每位创作者，\n都有自己的世界。", firstBody: "一个角色的神情，一种难以替代的画风，一段还在生长的故事。我们希望每件作品都能留下创作者的视角，让你认出，也让你产生共鸣。",
    secondLabel: "让创作成为物件", secondTitle: "不只被看见，\n也被日常陪伴。", secondBody: "将构图放进一块玻璃，重新考虑边界、留白与观看距离。Artist 系列探索作品从画面走向桌面的可能，让收藏进入每天使用的空间。",
    dimension: "设计尺寸", specNote: "厚度、表面工艺与底部结构仍在开发中。", invitation: "下一幅作品，也许来自你的世界。", invitationText: "面向独立画师与个人 IP 创作者。欢迎带着作品集，和我们聊聊属于你的表达。", contact: "与我们聊聊共创", next: "继续探索", core: "Core 基础系列", covers: "Cover 专辑封面系列", zoomTitle: "构图研究 — 001 / 原作视角",
  },
  en: {
    back: "Glass mousepads / All collections", label: "02 / ARTIST EDITIONS", title: "An artist’s world. A place on your desk.", intro: "A point of view becomes an object. A world you connect with becomes part of your everyday.",
    gallery: "Artist concept gallery", study: "COMPOSITION STUDY — 001", studio: "KIKORA / ORIGINAL ABSTRACT STUDY", artwork: "Artwork", object: "On the desk", edge: "The profile", drag: "Drag to rotate · Arrow keys to fine-tune", light: "Move the light", reset: "Reset view", inspect: "Explore the details", zoomLevel: "Zoom level", zoomIn: "Zoom in", zoomOut: "Zoom out", pan: "Zoom, then drag · Arrow keys to pan · + / − to zoom · 0 to reset", resetArt: "Full artwork", lightNote: "Lighting is illustrative", mode: "Choose a presentation", zoom: "View in detail", close: "Close enlarged artwork",
    artAlt: "A blue-grey abstract composition of nested geometric frames receding into the centre", artworkTitle: "Another sense of space.", artworkNote: "Blue-grey, light, and layers of geometry.", preview: "CONCEPT PREVIEW", concept: "An original visual study. Collaborating artists and final editions have not yet been announced.",
    scroll: "Step into the story", firstLabel: "A POINT OF VIEW", firstTitle: "Every artist has\na world of their own.", firstBody: "A character’s expression. A style you would recognise anywhere. A story still taking shape. We want each piece to hold on to its creator’s perspective, and give you something to connect with.",
    secondLabel: "FROM IMAGE TO OBJECT", secondTitle: "Art to look at.\nArt to live with.", secondBody: "A composition finds its way onto glass. Its edges, empty spaces and viewing distance take on new meaning. Artist editions explores how a work of art can become part of the desk you return to each day.",
    dimension: "Design dimensions", specNote: "Thickness, surface finish and base construction are in development.", invitation: "Your world could be next.", invitationText: "Independent artist or original IP creator? Share your portfolio and tell us what you would love to make.", contact: "Start a collaboration conversation", next: "Keep exploring", core: "Core glass", covers: "Cover series", zoomTitle: "Composition study — 001 / Artwork view",
  },
  ja: {
    back: "ガラスマウスパッド / すべてのシリーズ", label: "02 / ARTIST シリーズ", title: "誰かの世界が、自分のデスクに。", intro: "描き手ならではの視点を、手に取れるかたちへ。好きな世界と過ごす、もうひとつの方法。",
    gallery: "Artist コンセプトギャラリー", study: "構成のスタディ — 001", studio: "KIKORA / オリジナルの抽象表現", artwork: "正面から", object: "デスクの上で", edge: "横から眺める", drag: "ドラッグで回転 · 矢印キーで微調整", light: "光を動かす", reset: "視点をリセット", inspect: "作品の細部へ", zoomLevel: "拡大率", zoomIn: "拡大", zoomOut: "縮小", pan: "拡大してドラッグ · 矢印キーで移動 · + / − で拡大・縮小 · 0 で戻す", resetArt: "全体を見る", lightNote: "光の表現はイメージです", mode: "作品の見せ方を選ぶ", zoom: "大きく見る", close: "拡大表示を閉じる",
    artAlt: "ブルーグレーの幾何学的なフレームが、中心へと重なり合う抽象的な構図", artworkTitle: "もうひとつの奥行き。", artworkNote: "ブルーグレーと光、幾何学の重なり。", preview: "コンセプト展示", concept: "現在はオリジナルのビジュアルスタディを展示しています。参加アーティストや製品の最終デザインは未発表です。",
    scroll: "創作の背景へ", firstLabel: "表現から、はじまる", firstTitle: "描き手の数だけ、\n世界がある。", firstBody: "キャラクターの表情。ひと目でわかる、その人だけの画風。まだ続いていく物語。一つひとつの作品に描き手の視点を残し、共感できる出会いを届けたいと考えています。",
    secondLabel: "絵から、ものへ", secondTitle: "眺めるだけでなく、\n日々をともにする。", secondBody: "一枚のガラスに絵を置くとき、余白や輪郭、目との距離をあらためて考える。Artist シリーズは、作品がいつものデスクにある暮らしを探っていきます。",
    dimension: "デザイン寸法", specNote: "厚さ、表面の仕上げ、ベース構造は開発中です。", invitation: "次は、あなたの世界から。", invitationText: "イラストレーターやオリジナル IP のクリエイターの皆さまへ。ポートフォリオとともに、かたちにしたい想いを聞かせてください。", contact: "共創について相談する", next: "ほかのシリーズへ", core: "Core シリーズ", covers: "Cover シリーズ", zoomTitle: "構成のスタディ — 001 / 作品ビュー",
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

const views = [
  { x: 0, y: 0, z: 0 },
  { x: 48, y: -10, z: -19 },
  { x: 70, y: -12, z: -12 },
];
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
type ArtPosition = { scale: number; x: number; y: number };

export function ArtistGlassExperience() {
  const locale = useLocale();
  const text = translations[locale];
  const copy = productCopy[locale];
  const [view, setView] = useState(1);
  const [angle, setAngle] = useState(views[1]);
  const [light, setLight] = useState(38);
  const [dragging, setDragging] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [artPosition, setArtPosition] = useState<ArtPosition>({ scale: 1, x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const stagePointer = useRef<{ id: number; x: number; y: number; angle: typeof angle } | null>(null);
  const panPointer = useRef<{ id: number; x: number; y: number; position: ArtPosition } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const inspector = useRef<HTMLDivElement>(null);
  const inspectorArt = useRef<HTMLDivElement>(null);
  const id = useId();
  const viewLabels = [text.artwork, text.object, text.edge];

  function selectView(nextView: number) {
    setView(nextView);
    setAngle(views[nextView]);
  }

  function endStageDrag(event: PointerEvent<HTMLDivElement>) {
    if (stagePointer.current?.id !== event.pointerId) return;
    stagePointer.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function boundArt(position: ArtPosition): ArtPosition {
    const viewport = inspector.current;
    const artwork = inspectorArt.current;
    if (!viewport || !artwork) return position;
    const maxX = Math.max(0, (artwork.offsetWidth * position.scale - viewport.clientWidth + 32) / 2);
    const maxY = Math.max(0, (artwork.offsetHeight * position.scale - viewport.clientHeight + 32) / 2);
    return { ...position, x: clamp(position.x, -maxX, maxX), y: clamp(position.y, -maxY, maxY) };
  }

  function changeZoom(scale: number) {
    setArtPosition(previous => {
      const nextScale = clamp(Math.round(scale * 10) / 10, 1, 3);
      return boundArt({ scale: nextScale, x: previous.x * nextScale / previous.scale, y: previous.y * nextScale / previous.scale });
    });
  }

  function resetArtwork() {
    setArtPosition({ scale: 1, x: 0, y: 0 });
  }

  function endPan(event: PointerEvent<HTMLDivElement>) {
    if (panPointer.current?.id !== event.pointerId) return;
    panPointer.current = null;
    setPanning(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  useEffect(() => {
    const element = dialog.current;
    if (!zoomOpen || !element) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      panPointer.current = null;
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [zoomOpen]);

  useEffect(() => {
    const viewport = inspector.current;
    const artwork = inspectorArt.current;
    if (!zoomOpen || !viewport || !artwork) return;
    const observer = new ResizeObserver(() => {
      setArtPosition(previous => {
        const maxX = Math.max(0, (artwork.offsetWidth * previous.scale - viewport.clientWidth + 32) / 2);
        const maxY = Math.max(0, (artwork.offsetHeight * previous.scale - viewport.clientHeight + 32) / 2);
        return { ...previous, x: clamp(previous.x, -maxX, maxX), y: clamp(previous.y, -maxY, maxY) };
      });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [zoomOpen]);

  return (
    <main className={styles.page}>
      <div className={styles.topline}><Link href="/explore/glass">↖ {text.back}</Link><span>KIKORA / ARTIST</span></div>
      <header className={styles.header}><p className={styles.eyebrow}>{text.label}</p><div className={styles.titleRow}><h1>Artist<span>.</span></h1><div><h2>{text.title}</h2><p>{text.intro}</p></div></div></header>

      <section className={styles.gallery} aria-label={text.gallery}>
        <div className={styles.galleryColumn}>
          <div className={styles.exhibit}>
            <div className={styles.exhibitTop}><span>{text.study}</span><span>{text.preview}</span></div>
            <div
              className={`${styles.artStage} ${dragging ? styles.dragging : ""} ${view === 0 ? styles.artworkView : ""}`}
              style={{ "--tilt-x": `${angle.x}deg`, "--tilt-y": `${angle.y}deg`, "--tilt-z": `${angle.z}deg`, "--light-x": `${light}%`, "--light-angle": `${55 + light * 1.2}deg` } as CSSProperties}
              tabIndex={0} role="group" aria-label={text.gallery} aria-describedby={`${id}-rotate-hint`}
              onPointerDown={event => {
                if (!event.isPrimary || event.button !== 0) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                stagePointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, angle };
                setDragging(true);
              }}
              onPointerMove={event => {
                const pointer = stagePointer.current;
                if (!pointer || pointer.id !== event.pointerId) return;
                setAngle({ x: event.pointerType === "touch" ? pointer.angle.x : clamp(pointer.angle.x - (event.clientY - pointer.y) * .18, -16, 76), y: clamp(pointer.angle.y + (event.clientX - pointer.x) * .2, -40, 40), z: pointer.angle.z });
              }}
              onPointerUp={endStageDrag} onPointerCancel={endStageDrag} onLostPointerCapture={endStageDrag}
              onKeyDown={event => {
                const changes: Record<string, { x: number; y: number }> = { ArrowLeft: { x: 0, y: -5 }, ArrowRight: { x: 0, y: 5 }, ArrowUp: { x: 5, y: 0 }, ArrowDown: { x: -5, y: 0 } };
                if (event.key === "Home") { event.preventDefault(); selectView(view); return; }
                const change = changes[event.key];
                if (!change) return;
                event.preventDefault();
                setAngle(previous => ({ ...previous, x: clamp(previous.x + change.x, -16, 76), y: clamp(previous.y + change.y, -40, 40) }));
              }}
            >
              <div className={styles.stageGrid} aria-hidden="true" />
              <span className={styles.stageIndex} aria-hidden="true">A—001</span>
              <div className={styles.objectShadow} aria-hidden="true" />
              <div className={styles.artFrame}><StudioComposition label={text.artAlt} /><span className={styles.reflection} aria-hidden="true" /></div>
              <span className={styles.wallMark} aria-hidden="true">KIKORA<br />ARTIST EDITIONS</span>
              <span className={styles.dragHint} id={`${id}-rotate-hint`}><span aria-hidden="true">↔</span>{text.drag}</span>
            </div>
            <div className={styles.galleryControls}>
              <div className={styles.viewButtons} role="group" aria-label={text.mode}>{viewLabels.map((label, index) => <button key={label} type="button" aria-pressed={view === index} onClick={() => selectView(index)}><span aria-hidden="true">0{index + 1}</span>{label}</button>)}</div>
              <button type="button" className={styles.zoom} onClick={() => { resetArtwork(); setPanning(false); setZoomOpen(true); }}>{text.inspect}<span aria-hidden="true">↗</span></button>
            </div>
            <div className={styles.lightControls}>
              <label htmlFor={`${id}-light`}><span aria-hidden="true">◐</span>{text.light}</label>
              <input id={`${id}-light`} type="range" min={0} max={100} value={light} onChange={event => setLight(Number(event.target.value))} />
              <span className={styles.lightNote}>{text.lightNote}</span>
              <button type="button" onClick={() => { selectView(view); setLight(38); }}>{text.reset}<span aria-hidden="true">↺</span></button>
            </div>
          </div>
          <div className={styles.exhibitCaption}><div><span>{text.studio}</span><h2>{text.artworkTitle}</h2><p>{text.artworkNote}</p></div><span className={styles.swatches} aria-hidden="true"><i /><i /><i /></span></div>
          <p className={styles.conceptNote}>{text.concept}</p>
        </div>

        <div className={styles.story}>
          <div className={styles.storyIntro}><span>{text.scroll}</span><span aria-hidden="true">↓</span></div>
          <div className={styles.chapters}>
            <article className={styles.chapter}><span className={styles.chapterNumber}>01</span><p className={styles.eyebrow}>{text.firstLabel}</p><h2>{text.firstTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p className={styles.body}>{text.firstBody}</p><span className={styles.rule} aria-hidden="true" /></article>
            <article className={styles.chapter}><span className={styles.chapterNumber}>02</span><p className={styles.eyebrow}>{text.secondLabel}</p><h2>{text.secondTitle.split("\n").map(line => <span key={line}>{line}</span>)}</h2><p className={styles.body}>{text.secondBody}</p><dl className={styles.dimension}><dt>{text.dimension}</dt><dd>490 × 420 mm</dd></dl><p className={styles.specNote}>{text.specNote}</p></article>
          </div>
        </div>
      </section>

      <section className={styles.invitation}><span className={styles.eyebrow}>KIKORA / OPEN STUDIO</span><div><h2>{text.invitation}</h2><p>{text.invitationText}</p><Link href="/contact">{text.contact}<span aria-hidden="true">↗</span></Link></div></section>
      <nav className={styles.next} aria-label={text.next}><span>{text.next}</span><Link href="/explore/glass/core"><small>{copy.collections[0].caption}</small>{text.core}<span aria-hidden="true">↗</span></Link><Link href="/explore/glass/covers"><small>{copy.collections[2].caption}</small>{text.covers}<span aria-hidden="true">↗</span></Link></nav>

      <dialog ref={dialog} className={styles.dialog} aria-labelledby={`${id}-zoom-title`} onCancel={event => { event.preventDefault(); setZoomOpen(false); }} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setZoomOpen(false);
      }}>
        <header className={styles.dialogHeader}><div><span>{text.preview}</span><h2 id={`${id}-zoom-title`}>{text.zoomTitle}</h2></div><button type="button" aria-label={text.close} onClick={() => setZoomOpen(false)} autoFocus>✕</button></header>
        <div
          ref={inspector} className={`${styles.inspector} ${panning ? styles.panning : ""} ${artPosition.scale > 1 ? styles.canPan : ""}`}
          tabIndex={0} role="group" aria-label={text.artAlt} aria-describedby={`${id}-pan-hint`}
          onPointerDown={event => {
            if (!event.isPrimary || event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            panPointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, position: artPosition };
            setPanning(true);
          }}
          onPointerMove={event => {
            const pointer = panPointer.current;
            if (!pointer || pointer.id !== event.pointerId) return;
            setArtPosition(boundArt({ ...pointer.position, x: pointer.position.x + event.clientX - pointer.x, y: pointer.position.y + event.clientY - pointer.y }));
          }}
          onPointerUp={endPan} onPointerCancel={endPan} onLostPointerCapture={endPan}
          onKeyDown={event => {
            if (event.key === "+" || event.key === "=") { event.preventDefault(); changeZoom(artPosition.scale + .2); return; }
            if (event.key === "-") { event.preventDefault(); changeZoom(artPosition.scale - .2); return; }
            if (event.key === "0" || event.key === "Home") { event.preventDefault(); resetArtwork(); return; }
            const changes: Record<string, { x: number; y: number }> = { ArrowLeft: { x: 40, y: 0 }, ArrowRight: { x: -40, y: 0 }, ArrowUp: { x: 0, y: 40 }, ArrowDown: { x: 0, y: -40 } };
            const change = changes[event.key];
            if (!change) return;
            event.preventDefault();
            setArtPosition(previous => boundArt({ ...previous, x: previous.x + change.x, y: previous.y + change.y }));
          }}
        >
          <div ref={inspectorArt} className={styles.enlargedArt} style={{ transform: `translate(${artPosition.x}px, ${artPosition.y}px) scale(${artPosition.scale})` }}><StudioComposition label={text.artAlt} /></div>
          <span className={styles.zoomReadout} aria-hidden="true">{Math.round(artPosition.scale * 100)}%</span>
        </div>
        <div className={styles.inspectorControls}>
          <button type="button" aria-label={text.zoomOut} disabled={artPosition.scale <= 1} onClick={() => changeZoom(artPosition.scale - .2)}>−</button>
          <input aria-label={text.zoomLevel} type="range" min={1} max={3} step={.1} value={artPosition.scale} aria-valuetext={`${Math.round(artPosition.scale * 100)}%`} onChange={event => changeZoom(Number(event.target.value))} />
          <button type="button" aria-label={text.zoomIn} disabled={artPosition.scale >= 3} onClick={() => changeZoom(artPosition.scale + .2)}>+</button>
          <output aria-live="polite">{Math.round(artPosition.scale * 100)}%</output>
          <button type="button" className={styles.resetArt} onClick={resetArtwork}>{text.resetArt}<span aria-hidden="true">↺</span></button>
        </div>
        <p className={styles.panHint} id={`${id}-pan-hint`}>{text.pan}</p>
        <p className={styles.dialogConcept}>{text.concept}</p>
      </dialog>
    </main>
  );
}
