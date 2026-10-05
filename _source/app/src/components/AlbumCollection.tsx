"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { coverEditions, productCopy } from "@/lib/product-copy";
import { glassCollectionCopy } from "@/lib/glass-collection-copy";
import { ShrineDetails } from "./ShrineDetails";
import shared from "./ShrineExperience.module.css";
import styles from "./AlbumCollection.module.css";

const GlassExplorer = dynamic(() => import("./GlassExplorer").then(module => module.GlassExplorer), { ssr: false });
const clamp = (index: number) => Math.max(0, Math.min(coverEditions.length - 1, Math.round(index)));

export function AlbumCollection({ initialEdition = 0 }: { initialEdition?: number }) {
  const locale = useLocale();
  const copy = productCopy[locale];
  const text = copy.experience;
  const album = glassCollectionCopy[locale];
  const [active, setActive] = useState(clamp(initialEdition));
  const [flat, setFlat] = useState(false);
  const [open, setOpen] = useState(false);
  const edition = coverEditions[active];
  const name = copy.editionNames[active];

  const select = useCallback((index: number) => {
    const next = clamp(index);
    setActive(next);
    const url = new URL(window.location.href);
    url.searchParams.set("art", coverEditions[next].id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  useEffect(() => {
    function readLocation() {
      const art = new URLSearchParams(window.location.search).get("art");
      const index = coverEditions.findIndex(item => item.id === art);
      setActive(index < 0 ? 0 : index);
    }
    readLocation();
    window.addEventListener("popstate", readLocation);
    return () => window.removeEventListener("popstate", readLocation);
  }, []);

  return <div className={`${shared.root} ${styles.root}`}>
    <section className={`${shared.stage} ${styles.stage}`} aria-label={copy.collections[2].name}>
      <div className={`${shared.filters} ${styles.heading}`}>
        <Link href="/explore/glass" className={shared.back}>← {album.allGlass}</Link>
        <p className={styles.eyebrow}>{album.coverLabel}</p>
        <h1 className={styles.title}>{copy.collections[2].name}</h1>
        <p className={styles.intro}>{album.coverIntro}</p>
      </div>

      <div className={`${shared.viewer} ${styles.viewer}`} role="group" tabIndex={0} aria-label={album.viewer} onKeyDown={event => {
        let next: number;
        if (event.key === "ArrowLeft") next = active - 1;
        else if (event.key === "ArrowRight") next = active + 1;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = coverEditions.length - 1;
        else return;
        event.preventDefault();
        select(next);
      }}>
        <GlassExplorer active={active} topView={flat} onSelect={select} />
      </div>

      <article className={`${shared.productInfo} ${styles.productInfo}`} aria-labelledby="album-edition-title">
        <p className={shared.productKicker}>{copy.artwork[active].caption}</p>
        <h2 id="album-edition-title" className={styles.editionTitle}>{name}</h2>
        <div className={shared.tags}><span>{copy.categories.glass}</span><span>{text.developing}</span></div>
        <dl className={shared.specs}><div><dt>{text.format}</dt><dd>490 × 420 <small>mm</small></dd></div><div><dt>{album.edition}</dt><dd>{String(active + 1).padStart(2, "0")} / {String(coverEditions.length).padStart(2, "0")}</dd></div></dl>
        <p className={shared.description}>{copy.collections[2].description}</p>
        <button className={shared.more} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>{text.more} <span aria-hidden="true">+</span></button>
        <Link href="/#newsletter" className={shared.primaryButton}>{text.release} <span aria-hidden="true">↗</span></Link>
        <p className={shared.conceptNote}>{text.conceptNote}</p>
      </article>

      <div className={`${shared.stageBottom} ${styles.controls}`}>
        <div className={shared.viewControl} role="group" aria-label={text.viewingAngle}><button type="button" aria-pressed={!flat} onClick={() => setFlat(false)}>{text.deskView}</button><button type="button" aria-pressed={flat} onClick={() => setFlat(true)}>{text.topView}</button></div>
        <div className={`${shared.pagination} ${styles.pagination}`}><button type="button" aria-label={album.previous} disabled={active === 0} onClick={() => select(active - 1)}>←</button><span aria-live="polite" aria-atomic="true">{active + 1} {text.of} {coverEditions.length}<span className={shared.srOnly}>: {name}</span></span><button type="button" aria-label={album.next} disabled={active === coverEditions.length - 1} onClick={() => select(active + 1)}>→</button></div>
        <span className={shared.help}>{album.help}</span>
      </div>
    </section>
    <section className={styles.notes} aria-label={text.designStudy}>
      <p>{text.coverNote}</p>
      <span>{album.artwork} / {edition.title}</span>
    </section>
    <ShrineDetails open={open} onClose={() => setOpen(false)} kind="glass" collection="covers" edition={active} />
  </div>;
}
