"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { productCopy } from "@/lib/product-copy";
import { ShrineDetails } from "./ShrineDetails";
import styles from "./ShrineExperience.module.css";

export type ProductCategory = "glass" | "metal";

export function ShrineExperience({ category }: { category: "metal" }) {
  const copy = productCopy[useLocale()];
  const text = copy.experience;
  const [open, setOpen] = useState(false);
  const title = copy.categories.metal;

  return <div className={styles.root}>
    <section className={styles.stage} aria-label={`${text.explore} ${copy.categories[category]}`}>
      <div className={styles.filters}>
        <Link href="/#discover" className={styles.back}>← {text.allCollections}</Link>
        <span className={styles.filterLabel}>{copy.categories[category]}</span>
        <p className={styles.singleSeries}>{copy.concepts.metal.index}</p>
      </div>
      <div className={`${styles.viewer} ${styles.stillViewer}`} role="group" aria-label={`${title} ${text.conceptVisualization}`}>
        <div className={styles.metalScene} aria-hidden="true"><div className={styles.metalKey}><i>↗</i></div><div className={styles.metalKeySmall} /><span>{text.formStudy}</span></div>
      </div>
      <div className={styles.productInfo} key={category}>
        <p className={styles.productKicker}>{text.metalKicker}</p>
        <h1>{title}</h1>
        <div className={styles.tags}><span>{copy.concepts.metal.caption}</span><span>{text.developing}</span></div>
        <p className={styles.description}>{text.metalDescription}</p>
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
