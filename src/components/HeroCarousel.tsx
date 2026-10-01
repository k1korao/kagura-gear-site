"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";

const cards = [
  { name: "The Everyday Collection", href: "/collections/keycaps", image: "/images/kagura-studio-concept.webp", alt: "Kagura Gear design concept: ivory, rose and burgundy keycaps on a mechanical keyboard" },
  { name: "Kagura Shrine", href: "/shrine", image: "/images/kagura-hero.png", alt: "Dark Japanese-inspired Kagura Shrine desk setup" },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const gesture = useRef<{ id: number; x: number; y: number; width: number; dragging: boolean } | null>(null);
  const suppressClickUntil = useRef(0);

  function show(index: number) {
    setActive((index + cards.length) % cards.length);
    setDrag(0);
  }

  function start(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, width: event.currentTarget.clientWidth, dragging: false };
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.dragging) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        gesture.current = null;
        return;
      }
      if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return;
      current.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    // Add gentle resistance at the ends; arrows can wrap to the other card.
    setDrag((active === 0 && dx > 0) || (active === cards.length - 1 && dx < 0) ? dx * 0.2 : dx);
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    if (current.dragging) {
      suppressClickUntil.current = performance.now() + 250;
      const dx = event.clientX - current.x;
      if (!cancelled && Math.abs(dx) > Math.min(100, current.width * 0.15)) {
        setActive(Math.max(0, Math.min(cards.length - 1, active + (dx < 0 ? 1 : -1))));
      }
    }
    setDrag(0);
  }

  return (
    <section className={`store-hero-image store-hero-carousel${active === 1 ? " is-shrine" : ""}`} aria-label="Featured collections" aria-roledescription="carousel" tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          show(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}>
      <div className="store-carousel-viewport" onPointerDown={start} onPointerMove={move} onPointerUp={(event) => finish(event)} onPointerCancel={(event) => finish(event, true)}
        onClickCapture={(event) => {
          if (performance.now() < suppressClickUntil.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }} onDragStart={(event) => event.preventDefault()}>
        <div className={`store-carousel-track${drag ? " is-dragging" : ""}`} style={{ transform: `translateX(calc(-${active * 100}% + ${drag}px))` }}>
          {cards.map((card, index) => (
            <div key={card.name} className={`store-carousel-card${index === 1 ? " store-carousel-shrine" : ""}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${cards.length}: ${card.name}`} aria-hidden={index !== active} inert={index !== active}>
              <Link href={card.href} className="store-carousel-card-link" aria-label={index === 1 ? "Explore Kagura Shrine" : "Explore the Everyday Collection"} draggable={false}>
                <Image src={card.image} alt={card.alt} fill priority={index === 0} loading="eager" sizes="(max-width: 800px) 100vw, 58vw" className="object-cover" draggable={false} />
                {index === 0 ? <><span className="store-carousel-tag">DESIGN CONCEPT</span><div className="store-carousel-copy"><span className="store-eyebrow">THE EVERYDAY COLLECTION</span><h2>Color, with <em>character.</em></h2><span className="store-carousel-cta">Explore keycaps <span aria-hidden="true">↗</span></span></div></> : <><div className="store-carousel-shade" /><span className="store-carousel-tag">THE PREMIUM COLLECTION</span><div className="store-carousel-copy"><span className="store-eyebrow">PRECISION MEETS RITUAL</span><h2>Kagura <em>Shrine.</em></h2><p>Premium keycaps &amp; deskmats.</p><span className="store-carousel-cta">Enter the Shrine <span aria-hidden="true">↗</span></span></div></>}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="store-carousel-controls">
        <div className="store-carousel-pagination" aria-label="Choose a collection">{cards.map((card, index) => <button key={card.name} type="button" aria-label={`Show ${card.name}`} aria-pressed={active === index} onClick={() => show(index)}><span /></button>)}<span className="store-carousel-count" aria-hidden="true">0{active + 1} / 0{cards.length}</span></div>
        <div className="store-carousel-arrows"><button type="button" aria-label="Previous collection" onClick={() => show(active - 1)}><span aria-hidden="true">←</span></button><button type="button" aria-label="Next collection" onClick={() => show(active + 1)}><span aria-hidden="true">→</span></button></div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">{active + 1} of {cards.length}: {cards[active].name}</span>
    </section>
  );
}
