"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AlbumArtwork } from "./AlbumArtwork";
import { ShrineDetails } from "./ShrineDetails";
import styles from "./ShrineExperience.module.css";

const GlassExplorer = dynamic(() => import("./GlassExplorer").then(module => module.GlassExplorer), { ssr: false });
export type ProductCategory = "glass" | "keycaps" | "metal";
const collections = [
  { id: "core", name: "Core glass", caption: "THE ESSENTIALS", description: "A quiet surface. A clear point of view. Our essential glass mousepad direction, designed around the way you play." },
  { id: "artist", name: "Artist editions", caption: "A CANVAS FOR COLLABORATION", description: "A dedicated space for future artist and IP collaborations. The studio study shown here explores the possibilities; collaborations are still to come." },
  { id: "covers", name: "Cover series", caption: "MUSIC, REIMAGINED", description: "Game worlds meet the visual language of records. One artwork per edition, in a collection of character and album-inspired design studies." },
] as const;
const editions = [
  { name: "Starplayer.", color: "#ab4548" },
  { name: "Void FM.", color: "#3e5b94" },
  { name: "The Chemist.", color: "#7c8349" },
];

export function ShrineExperience({ category = "glass" }: { category?: ProductCategory }) {
  const [active, setActive] = useState(0);
  const [edition, setEdition] = useState(0);
  const [flat, setFlat] = useState(false);
  const [open, setOpen] = useState(false);
  const glass = category === "glass";
  const keycaps = category === "keycaps";
  const current = collections[active];
  const select = useCallback((index: number) => {
    const next = (index + collections.length) % collections.length;
    setActive(next);
    window.history.replaceState(null, "", `#${collections[next].id}`);
  }, []);

  useEffect(() => {
    function readHash() {
      const index = collections.findIndex(item => `#${item.id}` === window.location.hash);
      setActive(index === -1 ? 0 : index);
    }
    function handleCategory(event: Event) {
      const detail = (event as CustomEvent<{ category: ProductCategory; collection?: string }>).detail;
      if (detail?.category !== "glass") return;
      const index = collections.findIndex(item => item.id === detail.collection);
      setActive(Math.max(0, index));
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("kagura:category", handleCategory);
    return () => { window.removeEventListener("hashchange", readHash); window.removeEventListener("kagura:category", handleCategory); };
  }, []);

  const title = glass ? current.name : keycaps ? "Starplayer / Keys" : "Metal customs";
  return <div className={styles.root}>
    <section className={styles.stage} aria-label={`Explore ${category === "glass" ? "glass mousepads" : category === "keycaps" ? "keycaps" : "metal customs"}`}>
      <div className={styles.filters}>
        <Link href="/#discover" className={styles.back}>← ALL COLLECTIONS</Link>
        <span className={styles.filterLabel}>{glass ? "GLASS MOUSEPADS" : keycaps ? "KEYCAPS" : "METAL CUSTOMS"}</span>
        {glass ? <div className={styles.collectionTabs} role="group" aria-label="Glass mousepad collections">{collections.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} onClick={() => select(index)}><span>0{index + 1}</span>{item.name}</button>)}</div> : <p className={styles.singleSeries}>{keycaps ? "01 / THE COVER SERIES" : "01 / FUTURE OBJECTS"}</p>}
      </div>

      <div className={`${styles.viewer} ${!glass ? styles.stillViewer : ""}`} role="group" tabIndex={glass ? 0 : undefined} aria-label={glass ? "Glass mousepad 3D desk. Click a neighbouring pad, or use left and right arrow keys to change collection." : `${title} concept visualization`} onKeyDown={event => { if (glass && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1)); } }}>
        {glass ? <GlassExplorer active={active} edition={edition} topView={flat} onSelect={select} /> : keycaps ? <div className={styles.keysImage}><Image src="/images/kagura-keycaps-cover.webp" alt="KAGURA Reyna keycap concept: continuous red and violet character artwork across individual keycaps, on a silver-gray keyboard" fill priority sizes="(max-width: 760px) 100vw, 75vw" /></div> : <div className={styles.metalScene} aria-hidden="true"><div className={styles.metalKey}><i>↗</i></div><div className={styles.metalKeySmall} /><span>FORM STUDY — 001</span></div>}
      </div>

      <div className={styles.productInfo} key={`${category}-${active}`}>
        <p className={styles.productKicker}>{glass ? current.caption : keycaps ? "THE KEYCAP COLLECTION" : "A NEW MATERIAL LANGUAGE"}</p>
        <h1>{title}</h1>
        <div className={styles.tags}><span>{glass ? "Glass mousepad" : keycaps ? "Keycap concept" : "Future collection"}</span><span>In development</span></div>
        {glass ? <dl className={styles.specs}><div><dt>DESIGN FORMAT</dt><dd>490 × 420 <small>MM</small></dd></div><div><dt>SERIES</dt><dd>0{active + 1} / 03</dd></div></dl> : keycaps ? <dl className={styles.specs}><div><dt>PALETTE</dt><dd>Crimson / Violet</dd></div><div><dt>SERIES</dt><dd>Cover / 01</dd></div></dl> : null}
        <p className={styles.description}>{glass ? current.description : keycaps ? "Reyna, remixed. Red and violet album-cover energy printed across a field of individual keys. A companion concept to the Starplayer glass edition." : "Exploring sculptural forms and precise details for future custom metal objects. The first collection is on the drawing board."}</p>
        {glass && active === 2 ? <div className={styles.editionPicker} role="group" aria-label="Choose cover artwork">{editions.map((item, index) => <button key={item.name} aria-label={item.name} aria-pressed={edition === index} type="button" onClick={() => setEdition(index)}><span style={{ background: item.color }} /><span>{item.name}</span></button>)}</div> : null}
        <button className={styles.more} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>see more <span aria-hidden="true">+</span></button>
        <Link href="/#newsletter" className={styles.primaryButton}>Get release updates <span aria-hidden="true">↗</span></Link>
        <p className={styles.conceptNote}>{glass && active === 1 ? "Studio concept. Artist collaborations to be announced." : "Design preview. Final product details to be announced."}</p>
      </div>

      <div className={styles.stageBottom}>
        {glass ? <div className={styles.viewControl} role="group" aria-label="Viewing angle"><button type="button" aria-pressed={!flat} onClick={() => setFlat(false)}>DESK VIEW</button><button type="button" aria-pressed={flat} onClick={() => setFlat(true)}>TOP VIEW</button></div> : <span className={styles.studyLabel}>KAGURA / DESIGN STUDY</span>}
        {glass ? <div className={styles.pagination}><button type="button" aria-label="Previous glass collection" onClick={() => select(active - 1)}>←</button><span aria-live="polite" aria-atomic="true">{active + 1} of 3<span className={styles.srOnly}>: {current.name}</span></span><button type="button" aria-label="Next glass collection" onClick={() => select(active + 1)}>→</button></div> : <span className={styles.studyLabel}>01 / 01</span>}
        <span className={styles.help}>{glass ? "CLICK A PAD TO EXPLORE" : "CONCEPT / NOT YET AVAILABLE"}</span>
      </div>
    </section>
    {glass && active === 2 ? <section className={styles.coverCollection} aria-labelledby="covers-title"><div><p>WITHIN THE GLASS COLLECTION</p><h2 id="covers-title">One cover. One edition.</h2><span>Character and album-inspired artwork studies.</span></div><div className={styles.records}>{editions.map((item, index) => <button key={item.name} type="button" aria-pressed={edition === index} onClick={() => { setEdition(index); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}><div className={styles.recordArt}><AlbumArtwork edition={index} /></div><span>{item.name}<i aria-hidden="true">↗</i></span></button>)}</div><p className={styles.coverNote}>Independent concept artwork. No official game or recording-artist collaboration is implied.</p></section> : null}
    <ShrineDetails open={open} onClose={() => setOpen(false)} kind={category} collection={current.id} edition={edition} />
  </div>;
}
