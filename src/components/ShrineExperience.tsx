"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { coverEditions, productCopy } from "@/lib/product-copy";
import { AlbumArtwork } from "./AlbumArtwork";
import { ShrineDetails } from "./ShrineDetails";
import styles from "./ShrineExperience.module.css";

const GlassExplorer = dynamic(() => import("./GlassExplorer").then(module => module.GlassExplorer), { ssr: false });
export type ProductCategory = "glass" | "keycaps" | "metal";
const collections = [
  { id: "core" },
  { id: "artist" },
  { id: "covers" },
] as const;

export function ShrineExperience({ category = "glass" }: { category?: ProductCategory }) {
  const locale = useLocale();
  const copy = productCopy[locale];
  const text = copy.experience;
  const [active, setActive] = useState(0);
  const [edition, setEdition] = useState(0);
  const [flat, setFlat] = useState(false);
  const [open, setOpen] = useState(false);
  const glass = category === "glass";
  const keycaps = category === "keycaps";
  const current = { ...collections[active], ...copy.collections[active] };
  const select = useCallback((index: number) => {
    const next = (index + collections.length) % collections.length;
    setActive(next);
    window.history.replaceState(null, "", `#${collections[next].id}`);
  }, []);
  const selectEdition = useCallback((index: number) => {
    const next = coverEditions[index] ? index : 0;
    setEdition(next);
    const url = new URL(window.location.href);
    url.searchParams.set("art", coverEditions[next].id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  useEffect(() => {
    function readLocation() {
      const index = collections.findIndex(item => `#${item.id}` === window.location.hash);
      setActive(index === -1 ? 0 : index);
      const art = new URLSearchParams(window.location.search).get("art");
      const selectedEdition = coverEditions.findIndex(item => item.id === art);
      setEdition(selectedEdition === -1 ? 0 : selectedEdition);
    }
    function handleCategory(event: Event) {
      const detail = (event as CustomEvent<{ category: ProductCategory; collection?: string }>).detail;
      if (detail?.category !== "glass") return;
      const index = collections.findIndex(item => item.id === detail.collection);
      setActive(Math.max(0, index));
    }
    readLocation();
    window.addEventListener("hashchange", readLocation);
    window.addEventListener("popstate", readLocation);
    window.addEventListener("kagura:category", handleCategory);
    return () => { window.removeEventListener("hashchange", readLocation); window.removeEventListener("popstate", readLocation); window.removeEventListener("kagura:category", handleCategory); };
  }, []);

  const title = glass ? current.name : keycaps ? text.keyTitle : copy.categories.metal;
  return <div className={styles.root}>
    <section className={styles.stage} aria-label={`${text.explore} ${copy.categories[category]}`}>
      <div className={styles.filters}>
        <Link href="/#discover" className={styles.back}>← {text.allCollections}</Link>
        <span className={styles.filterLabel}>{copy.categories[category]}</span>
        {glass ? <div className={styles.collectionTabs} role="group" aria-label={text.glassCollections}>{collections.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} onClick={() => select(index)}><span>0{index + 1}</span>{copy.collections[index].name}</button>)}</div> : <p className={styles.singleSeries}>{keycaps ? text.coverSeries : text.futureObjects}</p>}
      </div>

      <div className={`${styles.viewer} ${!glass ? styles.stillViewer : ""}`} role="group" tabIndex={glass ? 0 : undefined} aria-label={glass ? text.viewer : `${title} ${text.conceptVisualization}`} onKeyDown={event => { if (glass && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1)); } }}>
        {glass ? <GlassExplorer active={active} edition={edition} topView={flat} onSelect={select} /> : keycaps ? <div className={styles.keysImage}><Image src="/images/kagura-keycaps-cover.webp" alt={text.keyAlt} fill priority sizes="(max-width: 760px) 100vw, 75vw" /></div> : <div className={styles.metalScene} aria-hidden="true"><div className={styles.metalKey}><i>↗</i></div><div className={styles.metalKeySmall} /><span>{text.formStudy}</span></div>}
      </div>

      <div className={styles.productInfo} key={`${category}-${active}`}>
        <p className={styles.productKicker}>{glass ? current.caption : keycaps ? text.keyKicker : text.metalKicker}</p>
        <h1>{title}</h1>
        <div className={styles.tags}><span>{glass ? copy.categories.glass : keycaps ? text.keyConcept : text.futureCollection}</span><span>{text.developing}</span></div>
        {glass ? <dl className={styles.specs}><div><dt>{text.format}</dt><dd>490 × 420 <small>mm</small></dd></div><div><dt>{text.series}</dt><dd>0{active + 1} / 03</dd></div></dl> : keycaps ? <dl className={styles.specs}><div><dt>{text.palette}</dt><dd>{text.colors}</dd></div><div><dt>{text.series}</dt><dd>{text.coverNumber}</dd></div></dl> : null}
        <p className={styles.description}>{glass ? current.description : keycaps ? text.keyDescription : text.metalDescription}</p>
        {glass && active === 2 ? <div className={styles.editionPicker} role="group" aria-label={text.chooseArt}>{coverEditions.map((item, index) => <button key={item.id} aria-label={item.name} aria-pressed={edition === index} type="button" onClick={() => selectEdition(index)}><span style={{ background: item.color }} /><span>{item.name}</span></button>)}</div> : null}
        <button className={styles.more} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>{text.more} <span aria-hidden="true">+</span></button>
        <Link href="/#newsletter" className={styles.primaryButton}>{text.release} <span aria-hidden="true">↗</span></Link>
        <p className={styles.conceptNote}>{glass && active === 1 ? text.artistNote : text.conceptNote}</p>
      </div>

      <div className={styles.stageBottom}>
        {glass ? <div className={styles.viewControl} role="group" aria-label={text.viewingAngle}><button type="button" aria-pressed={!flat} onClick={() => setFlat(false)}>{text.deskView}</button><button type="button" aria-pressed={flat} onClick={() => setFlat(true)}>{text.topView}</button></div> : <span className={styles.studyLabel}>{text.designStudy}</span>}
        {glass ? <div className={styles.pagination}><button type="button" aria-label={text.previous} onClick={() => select(active - 1)}>←</button><span aria-live="polite" aria-atomic="true">{active + 1} {text.of} {collections.length}<span className={styles.srOnly}>: {current.name}</span></span><button type="button" aria-label={text.next} onClick={() => select(active + 1)}>→</button></div> : <span className={styles.studyLabel}>01 / 01</span>}
        <span className={styles.help}>{glass ? text.help : text.unavailable}</span>
      </div>
    </section>
    {glass && active === 2 ? <section className={styles.coverCollection} aria-labelledby="covers-title"><div><p>{text.withinGlass}</p><h2 id="covers-title">{text.coverTitle}</h2><span>{text.coverSubtitle}</span></div><div className={styles.records}>{coverEditions.map((item, index) => <button key={item.id} type="button" aria-pressed={edition === index} onClick={() => { selectEdition(index); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}><div className={styles.recordArt}><AlbumArtwork edition={index} /></div><span><span className={styles.recordLabel}>{item.name}<small>{copy.artwork[index]?.caption.split(/\s*\/\s*/)[0]}</small></span><i aria-hidden="true">↗</i></span></button>)}</div><p className={styles.coverNote}>{text.coverNote}</p></section> : null}
    <ShrineDetails open={open} onClose={() => setOpen(false)} kind={category} collection={current.id} edition={edition} />
  </div>;
}
