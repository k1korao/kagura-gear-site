"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./BrandStory.module.css";

const chapters = [
  { number: "01", label: "THE FEELING", title: <>A space.<br />Entirely yours.</>, copy: "The place you return to. To play, to make, to lose track of time. We believe the things around you should feel like you.", word: "INTENT" },
  { number: "02", label: "THE EXPRESSION", title: <>Made precise.<br />Never ordinary.</>, copy: "Quiet essentials. Artist-led editions. New points of view. One design language, with room for a thousand different personalities.", word: "EXPRESSION" },
  { number: "03", label: "THE OBJECT", title: <>From an idea.<br />Into your world.</>, copy: "Glass. Keys. Metal. We are exploring the meeting point of considered materials and a more personal way to play.", word: "CHARACTER" },
];

export function BrandStory() {
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      const section = story.current;
      if (!section || !root.current) return;
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (76 - bounds.top) / Math.max(1, bounds.height - window.innerHeight + 76)));
      root.current.style.setProperty("--story-progress", String(progress));
      root.current.style.setProperty("--intro-progress", String(Math.min(1, window.scrollY / window.innerHeight)));
      root.current.dataset.motion = media.matches ? "reduced" : "full";
      setChapter(Math.min(2, Math.floor(progress * 3)));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", schedule); };
  }, []);

  return <div ref={root} className={styles.root}>
    <section className={styles.intro} aria-labelledby="brand-title">
      <div className={styles.introTop}><span>INDEPENDENT OBJECTS. INDIVIDUAL EXPRESSION.</span><span>KAGURA GEAR / OBJECTS FOR PLAY</span></div>
      <div className={styles.heroMark} aria-hidden="true"><svg viewBox="0 0 420 480"><path d="M45 25h95v180L300 25h105L215 241l192 214H280L140 297v158H45z" /></svg><span>FORM / FEEL / IDENTITY</span></div>
      <h1 id="brand-title">MADE FOR<br />YOUR NEXT<br /><span>OBSESSION.</span></h1>
      <div className={styles.introBottom}><a href="#our-story" className={styles.scroll}>SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a><p>For the way you play.<br />And everything that makes it yours.</p><span className={styles.coordinates}>A NEW POINT OF VIEW<br />01 — 03</span></div>
    </section>

    <section ref={story} id="our-story" className={styles.story} aria-label="The Kagura story">
      <div className={styles.pinned}>
        <div className={styles.storyTop}><span>THE KAGURA PERSPECTIVE</span><div className={styles.progress} aria-hidden="true"><i /></div><span>0{chapter + 1} / 03</span></div>
        <div className={styles.chapters}>{chapters.map((item, index) => <article key={item.number} className={styles.chapter} data-active={chapter === index}>
          <div className={styles.copy}><p className={styles.label}>{item.number} / {item.label}</p><h2>{item.title}</h2><p className={styles.description}>{item.copy}</p><span className={styles.chapterWord}>{item.word}</span></div>
          <div className={`${styles.sculpture} ${styles[`sculpture${index}`]}`} aria-hidden="true">{index === 1 ? <div className={styles.artStudies}><div><Image src="/images/album-concept-wraith.webp" alt="Wraith character artwork study in cold blue light" fill sizes="(max-width:760px) 45vw, 24vw" /></div><div><Image src="/images/album-concept-reyna.webp" alt="Reyna character artwork study in red and violet light" fill sizes="(max-width:760px) 45vw, 24vw" /></div></div> : <div className={styles.orbit}><span /><span /><span /><span /><span /></div>}<span className={styles.sculptureCaption}>{["EVERY DETAIL HAS A PURPOSE", "AN OPEN SPACE FOR IDEAS", "DESIGNED TO BE PART OF YOUR EVERYDAY"][index]}</span></div>
        </article>)}</div>
        <div className={styles.storyBottom}><span>PRECISION MEETS PERSONALITY.</span><a href="#discover">MEET THE COLLECTIONS <span aria-hidden="true">↘</span></a></div>
      </div>
    </section>

    <section id="discover" className={styles.discover} aria-labelledby="discover-title">
      <div className={styles.discoverHeading}><p className={styles.label}>THREE DIRECTIONS. ONE POINT OF VIEW.</p><h2 id="discover-title">FIND YOUR<br /><span>NEXT OBJECT.</span></h2><p>A growing collection of objects for your desk.<br />Choose a category. Step into its world.</p></div>
      <div className={styles.categories}>
        <article className={styles.category}><Link href="/explore/glass" className={styles.categoryVisual} aria-label="Explore glass mousepads"><div className={styles.glassStudy}><Image src="/images/album-concept-wraith.webp" alt="Wraith glass mousepad artwork concept" fill sizes="(max-width:760px) 60vw, 26vw" /><span>KAGURA / GLASS</span></div><span className={styles.categoryArrow} aria-hidden="true">↗</span></Link><div className={styles.categoryHeading}><span>01 / PLAY</span><h3><Link href="/explore/glass">Glass mousepads</Link></h3><p>A surface for every point of view.</p><div className={styles.subcategories}><Link href="/explore/glass#core">Core</Link><Link href="/explore/glass#artist">Artist editions</Link><Link href="/explore/glass#covers">Cover series</Link></div></div></article>
        <article className={styles.category}><Link href="/explore/keycaps" className={styles.categoryVisual} aria-label="Explore keycaps"><Image src="/images/kagura-keycaps-cover.webp" alt="Reyna character artwork printed across individual keycaps in a red and violet album-inspired design" fill sizes="(max-width: 760px) 90vw, 32vw" className={styles.keycapsImage} /><span className={styles.categoryArrow} aria-hidden="true">↗</span></Link><div className={styles.categoryHeading}><span>02 / TYPE</span><h3><Link href="/explore/keycaps">Keycaps</Link></h3><p>Character, at your fingertips.</p><span className={styles.development}>DESIGN STUDIES / IN DEVELOPMENT</span></div></article>
        <article className={styles.category}><Link href="/explore/metal" className={styles.categoryVisual} aria-label="Explore metal customs"><div className={styles.metalStudy}><i>↗</i></div><span className={styles.categoryArrow} aria-hidden="true">↗</span></Link><div className={styles.categoryHeading}><span>03 / BUILD</span><h3><Link href="/explore/metal">Metal customs</Link></h3><p>A new form of personal expression.</p><span className={styles.development}>ON THE DRAWING BOARD</span></div></article>
      </div>
    </section>
  </div>;
}
