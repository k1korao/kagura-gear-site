"use client";

import Link from "next/link";
import { Tektur } from "next/font/google";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { brandCopy } from "@/lib/brand-copy";
import { supportMailto } from "@/lib/site";
import styles from "./BrandStory.module.css";
import { KaguraSymbol } from "./KaguraSymbol";
import { HeroDeck } from "./HeroDeck";
import { ArtGallery } from "./ArtGallery";
import { MonochromePadSurface } from "./MonochromePadSurface";

const MARQUEE = ["GLASS MOUSEPADS", "490 × 420 MM", "METAL KEYCAPS", "ARTIST EDITIONS", "COLLECT YOUR WORLD"];

const DECK_COPY = {
  en: { hint: "TYPE OR TAP", pad: "KIKORA glass mousepad in white or black: move your pointer to explore the glass finish", keys: "Interactive metal keycaps: press K, I, O, R or A on your keyboard" },
  ja: { hint: "キーを押してみて", pad: "ホワイトとブラックの KIKORA ガラスマウスパッド：ポインターを動かしてガラスの質感をご覧ください", keys: "インタラクティブなメタルキーキャップ：キーボードで K・I・O・R・A を押してください" },
} as const;

const cyber = Tektur({ subsets: ["latin"], axes: ["wdth"], variable: "--font-cyber", display: "swap" });
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/** Decodes from random glyphs into the final word, then hands off to the CSS glitch layers. */
function Glitch({ text, className = "" }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / 900);
      const settled = Math.floor(progress * text.length);
      setShown(text.split("").map((char, index) => index < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(""));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text]);
  return <span className={`${styles.glitch} ${className}`} data-text={shown} aria-hidden="true">{shown}</span>;
}

function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => <Fragment key={`${index}-${line}`}>{index > 0 && <br />}{line}</Fragment>);
}

export function BrandStory() {
  const locale = useLocale();
  const copy = brandCopy[locale];
  const { hero, manifesto, creators, discover, closing } = copy;
  const storyCopy = copy.story;
  const { chapters } = storyCopy;
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 740px)");
    let frame = 0;
    function update() {
      frame = 0;
      const section = story.current;
      if (!section || !root.current) return;
      const bounds = section.getBoundingClientRect();
      const headerHeight = window.innerWidth <= 760 ? 68 : 76;
      const progress = Math.max(0, Math.min(1, (headerHeight - bounds.top) / Math.max(1, bounds.height - window.innerHeight + headerHeight)));
      root.current.style.setProperty("--story-progress", String(progress));
      root.current.style.setProperty("--intro-progress", String(Math.min(1, window.scrollY / window.innerHeight)));
      setReduced(media.matches);
      setChapter(Math.min(2, Math.floor(progress * 3)));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", schedule); };
  }, []);

  useEffect(() => {
    const intro = root.current?.querySelector<HTMLElement>("[data-hero]");
    if (!intro || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    function move(event: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = intro!.getBoundingClientRect();
        intro!.style.setProperty("--mx", ((event.clientX - bounds.left) / bounds.width - .5).toFixed(3));
        intro!.style.setProperty("--my", ((event.clientY - bounds.top) / bounds.height - .5).toFixed(3));
      });
    }
    intro.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); intro.removeEventListener("pointermove", move); };
  }, []);

  function selectChapter(index: number) {
    if (reduced) {
      document.getElementById(`story-chapter-${index}`)?.scrollIntoView({ behavior: "instant", block: "center" });
      return;
    }
    const section = story.current;
    if (!section) return;
    const headerHeight = window.innerWidth <= 760 ? 68 : 76;
    const start = section.getBoundingClientRect().top + window.scrollY - headerHeight;
    const range = section.offsetHeight - window.innerHeight + headerHeight;
    window.scrollTo({ top: start + range * (index === 0 ? 0 : (index + 0.12) / 3), behavior: "smooth" });
  }

  return <div ref={root} className={`${styles.root} ${cyber.variable}`} lang={copy.lang}>
    <section className={styles.intro} aria-labelledby="brand-title" data-hero>
      <div className={styles.introTop}><span>{hero.topline}</span><span>{hero.stamp}</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="brand-title" lang="en" aria-label="Break the screen."><Glitch text="BREAK" /><br /><Glitch text="THE" className={styles.outline} /><br /><Glitch text="SCREEN." className={styles.hot} /></h1>
          <h2><Lines lines={hero.title} /></h2>
          <p className={styles.heroDescription}><Lines lines={hero.description} /></p>
          <div className={styles.heroActions}><a href="#manifesto">{hero.storyAction} <span aria-hidden="true">↘</span></a><a href="#creators">{hero.creatorAction} <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className={styles.heroCollage}>
          <div className={styles.collageGrid} aria-hidden="true" />
          <span className={styles.collageCoordinates}>{hero.coordinates}</span>
          <HeroDeck hint={DECK_COPY[locale].hint} padLabel={DECK_COPY[locale].pad} keysLabel={DECK_COPY[locale].keys} />
        </div>
      </div>
      <div className={styles.introBottom}><a href="#manifesto">{hero.storyStart} <span aria-hidden="true">↓</span></a><p>{hero.disclaimer}</p><span>{hero.bottomLine}</span></div>
    </section>

    <div className={styles.marquee} aria-hidden="true" lang="en"><div className={styles.marqueeTrack}>{[0, 1].map(copyIndex => <span key={copyIndex}>{MARQUEE.map(item => <Fragment key={item}><b>{item}</b><i>✦</i></Fragment>)}</span>)}</div></div>

    <ArtGallery />

    <section id="manifesto" className={styles.manifesto} aria-labelledby="manifesto-title">
      <div className={styles.manifestoSide}><span className={styles.eyebrow}>{manifesto.label}</span><span className={styles.sectionIndex}>[ 01 — 03 ]</span></div>
      <div><h2 id="manifesto-title">{manifesto.title[0]}<br />{manifesto.title[1]}<span>{manifesto.title[2]}</span></h2><div className={styles.manifestoCopy}>{manifesto.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>
    </section>

    <section ref={story} id="our-story" className={styles.story} aria-label={storyCopy.aria}>
      <div className={styles.pinned}>
        <div className={styles.storyTop}><span>{storyCopy.strapline}</span><div className={styles.chapterNav} aria-label={storyCopy.navAria}>{chapters.map((item,index) => <button key={item.number} type="button" aria-label={storyCopy.chapterAction.replace("{number}", String(index + 1))} aria-current={chapter === index ? "step" : undefined} onClick={() => selectChapter(index)}>{item.number}<i /></button>)}</div></div>
        <div className={styles.chapters}>{chapters.map((item,index) => <article id={`story-chapter-${index}`} key={item.number} className={styles.chapter} data-active={chapter === index}>
          <div className={styles.chapterCopy}><p className={styles.eyebrow}>{item.number} / {item.label}</p><h2><Lines lines={item.title} /></h2><p className={styles.description}>{item.copy}</p><span className={styles.chapterNote}>{item.note}</span></div>
          <div className={`${styles.chapterVisual} ${styles[`visual${index}`]}`} aria-hidden="true">
            {index === 0 ? <><div className={styles.artistFrame}><MonochromePadSurface tone="white" className={styles.padSurface} /></div><div className={styles.artistSlip}><span><Lines lines={storyCopy.artistTitle} /></span><p><Lines lines={storyCopy.artistTopics} /></p><i>{storyCopy.artistNote}</i></div><span className={styles.visualCaption}>{storyCopy.artistCaption}</span></> : index === 1 ? <><div className={styles.materialPhoto}><div className={styles.matGlass}><MonochromePadSurface tone="white" /></div><span className={styles.matKey}><b>K</b></span><span className={styles.matMetal}><KaguraSymbol /></span></div><div className={styles.materialSwatches}>{storyCopy.materialNames.map(name => <span key={name}>{name}<i /></span>)}</div><span className={styles.visualCaption}>{storyCopy.materialCaption}</span></> : <><div className={styles.collectorArt}><MonochromePadSurface tone="black" className={styles.padSurface} /></div><div className={styles.collectorLabel}><span>{storyCopy.collectorLabel}</span><strong><Lines lines={storyCopy.collectorTitle} /></strong><p><Lines lines={storyCopy.collectorCopy} /></p><div>{storyCopy.collectorTags}</div></div><span className={styles.visualCaption}>{storyCopy.collectorCaption}</span></>}
          </div>
        </article>)}</div>
        <div className={styles.storyBottom}><span>{storyCopy.bottomLine}</span><div className={styles.progress} aria-hidden="true"><i /></div><a href="#creators">{storyCopy.nextChapter} <span aria-hidden="true">↘</span></a></div>
      </div>
    </section>

    <section id="creators" className={styles.creators} aria-labelledby="creators-title">
      <div className={styles.creatorsHeading}><div><p className={styles.eyebrow}>{creators.label}</p><h2 id="creators-title">{creators.title[0]}<br />{creators.title[1]}<span>{creators.title[2]}</span></h2></div><span className={styles.planStatus}><i />{creators.status}</span></div>
      <div className={styles.creatorGrid}>
        <div className={styles.creatorPoster}><span><Lines lines={creators.invitation} /></span><strong lang="en">YOUR IP.<br />OUR NEXT<br /><em>CHAPTER.</em></strong><p><Lines lines={creators.posterCopy} /></p><div className={styles.posterArt} aria-hidden="true"><i /><i /><i /><i /></div><span className={styles.posterFoot}>{creators.posterFoot}</span></div>
        <div className={styles.principles}>{creators.principles.map(item => <article key={item.number}><span>{item.number}</span><div><p>{item.label}</p><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}<a className={styles.creatorCta} href={supportMailto(creators.mailSubject, creators.mailBody)}><span>{creators.cta} <small>{creators.ctaNote}</small></span><span aria-hidden="true">↗</span></a></div>
      </div>
      <p className={styles.creatorDisclaimer}>{creators.disclaimer}</p>
    </section>

    <section id="discover" className={styles.discover} aria-labelledby="discover-title">
      <div className={styles.discoverHeading}><div><p className={styles.eyebrow}>{discover.label}</p><h2 id="discover-title" lang="en">A WORLD.<br /><span>MANY FORMS.</span></h2></div><p><Lines lines={discover.copy} /></p></div>
      <div className={styles.categories}>
        <article className={styles.category}><Link href="/explore/glass" className={styles.categoryVisual} aria-label={discover.categories[0].aria}><div className={styles.glassStudy} aria-hidden="true"><MonochromePadSurface tone="black" className={styles.padSurface} /></div><span className={styles.categoryArrow} aria-hidden="true">↗</span></Link><div className={styles.categoryHeading}><span>{discover.categories[0].label}</span><h3><Link href="/explore/glass">{discover.categories[0].title}</Link></h3><p>{discover.categories[0].copy}</p><div className={styles.subcategories}><Link href="/explore/glass/core">{discover.collections[0]}</Link><Link href="/explore/glass/artist">{discover.collections[1]}</Link><Link href="/explore/glass/covers">{discover.collections[2]}</Link></div></div></article>
        <article className={styles.category}><Link href="/explore/metal" className={styles.categoryVisual} aria-label={discover.categories[1].aria}><div className={`${styles.miniKeys} ${styles.metalKeys}`} aria-hidden="true">{["K", "I", "K", "O", "R", "A"].map((key, index) => <span key={index}>{key}</span>)}</div><span className={styles.categoryArrow} aria-hidden="true">↗</span></Link><div className={styles.categoryHeading}><span>{discover.categories[1].label}</span><h3><Link href="/explore/metal">{discover.categories[1].title}</Link></h3><p>{discover.categories[1].copy}</p><span className={styles.development}>{discover.categories[1].status}</span></div></article>
      </div>
    </section>
    <section className={styles.closing}><span>{closing.label}</span><h2><Lines lines={closing.title} /></h2><Link href="/about">{closing.link} <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
