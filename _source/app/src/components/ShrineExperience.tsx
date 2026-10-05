"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { productCopy } from "@/lib/product-copy";
import { ShrineDetails } from "./ShrineDetails";
import styles from "./ShrineExperience.module.css";

export type ProductCategory = "glass" | "keycaps" | "metal";

export function ShrineExperience({ category }: { category: "keycaps" | "metal" }) {
  const copy = productCopy[useLocale()];
  const text = copy.experience;
  const [open, setOpen] = useState(false);
  const keycaps = category === "keycaps";
  const title = keycaps ? text.keyTitle : copy.categories.metal;

  return <div className={styles.root}>
    <section className={styles.stage} aria-label={`${text.explore} ${copy.categories[category]}`}>
      <div className={styles.filters}>
        <Link href="/#discover" className={styles.back}>← {text.allCollections}</Link>
        <span className={styles.filterLabel}>{copy.categories[category]}</span>
        <p className={styles.singleSeries}>{keycaps ? text.coverSeries : text.futureObjects}</p>
      </div>
      <div className={`${styles.viewer} ${styles.stillViewer}`} role="group" aria-label={`${title} ${text.conceptVisualization}`}>
        {keycaps ? <div className={styles.keysImage}><Image src="/images/kagura-keycaps-cover.webp" alt={text.keyAlt} fill priority sizes="(max-width: 760px) 100vw, 75vw" /></div> : <div className={styles.metalScene} aria-hidden="true"><div className={styles.metalKey}><i>↗</i></div><div className={styles.metalKeySmall} /><span>{text.formStudy}</span></div>}
      </div>
      <div className={styles.productInfo} key={category}>
        <p className={styles.productKicker}>{keycaps ? text.keyKicker : text.metalKicker}</p>
        <h1>{title}</h1>
        <div className={styles.tags}><span>{keycaps ? text.keyConcept : text.futureCollection}</span><span>{text.developing}</span></div>
        {keycaps ? <dl className={styles.specs}><div><dt>{text.palette}</dt><dd>{text.colors}</dd></div><div><dt>{text.series}</dt><dd>{text.coverNumber}</dd></div></dl> : null}
        <p className={styles.description}>{keycaps ? text.keyDescription : text.metalDescription}</p>
        <button className={styles.more} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>{text.more} <span aria-hidden="true">+</span></button>
        <Link href="/#newsletter" className={styles.primaryButton}>{text.release} <span aria-hidden="true">↗</span></Link>
        <p className={styles.conceptNote}>{text.conceptNote}</p>
      </div>
      <div className={styles.stageBottom}>
        <span className={styles.studyLabel}>{text.designStudy}</span>
        <span className={styles.studyLabel}>01 / 01</span>
        <span className={styles.help}>{text.unavailable}</span>
      </div>
    </section>
    <ShrineDetails open={open} onClose={() => setOpen(false)} kind={category} />
  </div>;
}
