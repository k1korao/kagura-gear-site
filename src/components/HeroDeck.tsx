"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroDeck.module.css";
import { KaguraSymbol } from "./KaguraSymbol";
import { KEY_ARTS, KeyArt } from "./KeyArt";

const KEYS = ["K", "I", "K", "O", "R", "A"];
const TRAIL_MS = 900;

type Point = { x: number; y: number; t: number };

/** Interactive peripheral playground: a glass pad that tracks the pointer, live keycaps and a metal token. */
export function HeroDeck({ hint, padLabel, keysLabel }: { hint: string; padLabel: string; keysLabel: string }) {
  const deck = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const trail = useRef<Point[]>([]);
  const frame = useRef(0);
  const last = useRef<Point | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [readout, setReadout] = useState({ x: 0, y: 0, speed: 0 });
  const [pulse, setPulse] = useState(0);
  const [artIndex, setArtIndex] = useState(0);

  useEffect(() => {
    const el = canvas.current;
    const host = pad.current;
    if (!el || !host) return;
    const resize = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      el.width = host.clientWidth * ratio;
      el.height = host.clientHeight * ratio;
      el.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
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
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function press(key: string) {
    setPressed(key);
    setTyped(value => (value + key).slice(-10));
    window.setTimeout(() => setPressed(current => (current === key ? null : current)), 160);
  }

  function draw() {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const now = performance.now();
    trail.current = trail.current.filter(point => now - point.t < TRAIL_MS);
    ctx.clearRect(0, 0, el.width, el.height);
    const points = trail.current;
    for (let i = 1; i < points.length; i++) {
      const life = 1 - (now - points[i].t) / TRAIL_MS;
      ctx.strokeStyle = `rgba(255, 255, 255, ${life * .95})`;
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1 + life * 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(points[i - 1].x, points[i - 1].y);
      ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }
    frame.current = points.length ? requestAnimationFrame(draw) : 0;
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const host = deck.current;
    const surface = pad.current;
    if (!host || !surface) return;
    const bounds = host.getBoundingClientRect();
    host.style.setProperty("--px", ((event.clientX - bounds.left) / bounds.width - .5).toFixed(3));
    host.style.setProperty("--py", ((event.clientY - bounds.top) / bounds.height - .5).toFixed(3));
    const padBounds = surface.getBoundingClientRect();
    const x = event.clientX - padBounds.left;
    const y = event.clientY - padBounds.top;
    if (x < 0 || y < 0 || x > padBounds.width || y > padBounds.height) { last.current = null; return; }
    surface.style.setProperty("--lx", `${(x / padBounds.width) * 100}%`);
    surface.style.setProperty("--ly", `${(y / padBounds.height) * 100}%`);
    const point = { x, y, t: performance.now() };
    const previous = last.current;
    const speed = previous ? Math.hypot(x - previous.x, y - previous.y) / Math.max(1, point.t - previous.t) * 1000 : 0;
    last.current = point;
    setReadout({ x: Math.round((x / padBounds.width) * 4096), y: Math.round((y / padBounds.height) * 2304), speed: Math.round(speed) });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    trail.current.push(point);
    if (!frame.current) frame.current = requestAnimationFrame(draw);
  }

  const pad4 = (value: number) => String(value).padStart(4, "0");

  return <div ref={deck} className={styles.deck} onPointerMove={onPointerMove} onPointerLeave={() => { last.current = null; }}>
    <div className={styles.padWrap}>
      <div ref={pad} className={styles.pad} aria-label={padLabel} role="img">
        <KeyArt key={KEY_ARTS[artIndex].id} art={KEY_ARTS[artIndex].id} className={styles.padArtwork} showTitle={false} />
        <div className={styles.etch} aria-hidden="true" />
        <div className={styles.padStripe} aria-hidden="true" />
        <div className={styles.padArt} aria-hidden="true"><KaguraSymbol /></div>
        <canvas ref={canvas} className={styles.trail} aria-hidden="true" />
        <div className={styles.glare} aria-hidden="true" />
        {pulse ? <span key={pulse} className={styles.pulse} aria-hidden="true" /> : null}
        <div className={styles.padMark} aria-hidden="true"><KaguraSymbol /><span>KIKORA / GLASS</span></div>
        <dl className={styles.readout} aria-hidden="true">
          <div><dt>X</dt><dd>{pad4(readout.x)}</dd></div>
          <div><dt>Y</dt><dd>{pad4(readout.y)}</dd></div>
          <div><dt>PX/S</dt><dd>{pad4(Math.min(9999, readout.speed))}</dd></div>
        </dl>
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
      <button type="button" className={`${styles.key} ${styles.space}`} onClick={() => { setPulse(value => value + 1); setArtIndex(value => (value + 1) % KEY_ARTS.length); }} lang="en"><span>NEXT WORLD ↻</span></button>
    </div>
  </div>;
}
