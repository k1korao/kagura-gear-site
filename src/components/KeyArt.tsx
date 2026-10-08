import { useId } from "react";

/**
 * Procedural, high-saturation key-art posters used as concept placeholders until
 * commissioned original illustrations replace them. Every scene is built around a
 * single vanishing point so it reads as deep perspective on glass, cards and pads.
 */
// To use commissioned character art, set `image` to a file in /public (4:5, ≥2000px, keep the subject centred).
export const KEY_ARTS: readonly { id: string; title: string; kanji: string; palette: readonly [string, string, string, string]; image?: string }[] = [
  { id: "ronin", title: "NEON RONIN", kanji: "浪人", palette: ["#ff2bd6", "#7a1cff", "#00e5ff", "#ffe14d"], image: "/images/characters/ronin.webp" },
  { id: "starplayer", title: "STARPLAYER", kanji: "星使", palette: ["#0038ff", "#00c8ff", "#ffe600", "#ff3b24"], image: "/images/characters/starplayer.webp" },
  { id: "void", title: "VOID FM", kanji: "虚空", palette: ["#12002b", "#7a00ff", "#c6ff00", "#ff2bd6"], image: "/images/characters/void.webp" },
  { id: "sakura", title: "SAKURA DRIVE", kanji: "桜道", palette: ["#ff7a00", "#ff2d75", "#ffd1e8", "#2a0b4a"], image: "/images/characters/sakura.webp" },
];

export type KeyArtId = string;

const W = 800;
const H = 800;
const VX = 400;
const VY = 470;

function floorLines(count: number, spread = 1400) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const x = Math.round(VX - spread / 2 + (spread / count) * i);
    return `M${VX} ${VY} L${x} ${H}`;
  }).join(" ");
}

function floorRows(rows: number) {
  return Array.from({ length: rows }, (_, i) => {
    const t = Math.pow((i + 1) / rows, 2.2);
    const y = VY + (H - VY) * t;
    return `M0 ${y.toFixed(1)} H${W}`;
  }).join(" ");
}

function rays(count: number, inner: number, outer: number, cx = VX, cy = VY - 120) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    const b = a + Math.PI / count * .55;
    const p = (angle: number, r: number) => `${(cx + Math.cos(angle) * r).toFixed(1)} ${(cy + Math.sin(angle) * r).toFixed(1)}`;
    return `M${p(a, inner)} L${p(a, outer)} L${p(b, outer)}Z`;
  }).join(" ");
}

function star(cx: number, cy: number, r: number, inner: number, points = 8) {
  return Array.from({ length: points * 2 }, (_, i) => {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 ? inner : r;
    return `${i ? "L" : "M"}${(cx + Math.cos(a) * radius).toFixed(1)} ${(cy + Math.sin(a) * radius).toFixed(1)}`;
  }).join(" ") + "Z";
}

export function KeyArt({ art, className = "", showTitle = true }: { art: KeyArtId; className?: string; showTitle?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const meta = KEY_ARTS.find(item => item.id === art) ?? KEY_ARTS[0];
  const [a, b, c, d] = meta.palette;
  const id = (name: string) => `${uid}-${name}`;

  if (meta.image) {
    // eslint-disable-next-line @next/next/no-img-element -- fills SVG-sized slots that are already sized by their parent
    return <img className={className} src={meta.image} alt={`${meta.title} — KIKORA original character art`} style={{ objectFit: "cover" }} loading="lazy" />;
  }

  return <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${meta.title} — KIKORA concept key art`}>
    <defs>
      <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={art === "sakura" ? d : a} />
        <stop offset=".55" stopColor={art === "sakura" ? b : b} />
        <stop offset="1" stopColor={art === "sakura" ? a : c} />
      </linearGradient>
      <linearGradient id={id("sun")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={art === "void" ? c : d} />
        <stop offset="1" stopColor={art === "void" ? d : a} />
      </linearGradient>
      <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={art === "void" ? a : "#0b0420"} stopOpacity=".2" />
        <stop offset="1" stopColor="#0b0420" />
      </linearGradient>
      <pattern id={id("dots")} width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.6" fill="#fff" />
      </pattern>
      <mask id={id("sunCut")}>
        <rect width={W} height={H} fill="#fff" />
        {Array.from({ length: 7 }, (_, i) => <rect key={i} x="0" y={VY - 150 + i * 22} width={W} height={2 + i * 2.2} fill="#000" />)}
      </mask>
      <radialGradient id={id("fade")} cx=".5" cy=".3" r=".8">
        <stop offset=".4" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#fff" stopOpacity=".55" />
      </radialGradient>
    </defs>

    <rect width={W} height={H} fill={`url(#${id("sky")})`} />
    <rect width={W} height={H} fill={`url(#${id("dots")})`} opacity=".08" />

    {art === "ronin" && <>
      <circle cx={VX} cy={VY - 120} r="190" fill={`url(#${id("sun")})`} mask={`url(#${id("sunCut")})`} />
      <path d="M90 470 L230 380 L330 440 L420 360 L560 450 L680 390 L800 470Z" fill="#2b0a5c" opacity=".85" />
      <g fill="#0b0420">
        <rect x="250" y="250" width="300" height="26" rx="4" />
        <path d="M220 236 Q400 210 580 236 L586 252 Q400 228 214 252Z" />
        <rect x="285" y="276" width="22" height="200" />
        <rect x="493" y="276" width="22" height="200" />
        <rect x="270" y="304" width="260" height="14" />
      </g>
      <path d="M40 760 L760 160" stroke={c} strokeWidth="5" opacity=".9" />
      <path d="M40 760 L760 160" stroke="#fff" strokeWidth="1.5" />
    </>}

    {art === "starplayer" && <>
      <path d={rays(28, 120, 900)} fill="#fff" opacity=".14" />
      <path d={star(VX, VY - 120, 210, 80)} fill={c} />
      <path d={star(VX, VY - 120, 140, 54)} fill="#fff" opacity=".9" />
      <path d={star(VX, VY - 120, 70, 28)} fill={d} />
      {[[150, 230, 22], [660, 250, 16], [600, 300, 12], [120, 330, 14]].map(([x, y, r], i) => <path key={i} d={star(x, y, r, r * .35, 4)} fill="#fff" />)}
    </>}

    {art === "void" && <>
      <circle cx={VX} cy={VY - 140} r="200" fill="none" stroke={c} strokeWidth="18" />
      <circle cx={VX + 40} cy={VY - 160} r="160" fill={a} />
      <circle cx={VX} cy={VY - 140} r="250" fill="none" stroke={d} strokeWidth="2" strokeDasharray="4 10" />
      {Array.from({ length: 28 }, (_, i) => {
        const h = Math.round(30 + Math.abs(Math.sin(i * 1.7) * 130));
        return <rect key={i} x={40 + i * 26} y={VY - h} width="12" height={h} fill={i % 5 === 0 ? d : c} opacity={[.35, .55, .75][i % 3]} />;
      })}
    </>}

    {art === "sakura" && <>
      <circle cx={VX} cy={VY - 90} r="170" fill={`url(#${id("sun")})`} mask={`url(#${id("sunCut")})`} opacity=".95" />
      <path d="M0 470 L120 330 L210 410 L330 250 L470 420 L560 340 L690 430 L800 360 L800 470Z" fill={d} opacity=".9" />
      <path d="M0 470 L160 400 L280 450 L420 390 L560 460 L800 410 L800 470Z" fill={d} />
      {Array.from({ length: 22 }, (_, i) => {
        const x = (i * 137) % W;
        const y = (i * 89) % 440 + 20;
        const s = 6 + (i % 4) * 3;
        return <ellipse key={i} cx={x} cy={y} rx={s} ry={s * .6} transform={`rotate(${i * 37} ${x} ${y})`} fill={c} opacity=".9" />;
      })}
    </>}

    {/* perspective floor */}
    <rect y={VY} width={W} height={H - VY} fill={`url(#${id("floor")})`} />
    <path d={art === "sakura" ? `M${VX} ${VY} L0 ${H} M${VX} ${VY} L${W} ${H} M${VX - 4} ${VY} L${VX - 60} ${H} M${VX + 4} ${VY} L${VX + 60} ${H}` : floorLines(20)} stroke={art === "starplayer" ? c : art === "sakura" ? c : a} strokeWidth="2" fill="none" opacity=".85" />
    <path d={floorRows(art === "sakura" ? 9 : 12)} stroke={art === "starplayer" ? c : art === "sakura" ? "#fff" : a} strokeWidth={art === "sakura" ? 6 : 2} strokeDasharray={art === "sakura" ? "0 380 40 380" : undefined} opacity=".7" />
    <rect x="0" y={VY - 2} width={W} height="4" fill="#fff" opacity=".85" />

    {/* typography */}
    <text x="668" y="176" fill="#fff" fontSize="84" fontWeight="900" writingMode="vertical-rl" letterSpacing="6" opacity=".92" style={{ fontFamily: "'Hiragino Sans','PingFang SC','Noto Sans JP',sans-serif" }}>{meta.kanji}</text>
    {showTitle && <>
      <text x="100" y="118" fill="#fff" fontSize="56" fontWeight="900" letterSpacing="-1" style={{ fontFamily: "var(--font-cyber), var(--font-display), sans-serif", fontStretch: "75%" }}>{meta.title}</text>
      <text x="102" y="148" fill="#fff" fontSize="14" letterSpacing="6" opacity=".8" style={{ fontFamily: "ui-monospace, monospace" }}>KIKORA ORIGINAL / CONCEPT</text>
    </>}
    <rect width={W} height={H} fill={`url(#${id("fade")})`} style={{ mixBlendMode: "soft-light" }} />
  </svg>;
}
