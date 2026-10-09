"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { KeycapsPreview } from "@/components/KeycapsCollectionExperience";
import { KeycapsNewsletter } from "@/components/KeycapsNewsletter";
import { keycapsCollectionCopy, keycapsCollectionIds } from "@/lib/keycaps-collection-copy";
import styles from "./KeycapsCollectionsHub.module.css";

export function KeycapsCollectionsHub() {
  const copy = keycapsCollectionCopy[useLocale()];

  return <div className={styles.root}>
    <header className={styles.heading}>
      <Link href="/#discover" className={styles.back}>← {copy.allCollections}</Link>
      <p>{copy.hubLabel}</p>
      <h1>{copy.hubTitle}</h1>
      <div className={styles.intro}><span>{copy.developing}</span><p>{copy.hubDescription}</p></div>
    </header>
    <div className={styles.collections}>
      {keycapsCollectionIds.map((id, index) => {
        const collection = copy.collections[id];
        return <Link key={id} href={`/explore/keycaps/${id}`} className={`${styles.collection} ${styles[id]}`}>
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.index}>0{index + 1} / {id.toUpperCase()}</span>
            <KeycapsPreview collection={id} />
            <span className={styles.mode}>{collection.study}</span>
            <span className={styles.arrow}>↗</span>
          </div>
          <div className={styles.caption}>
            <p>{collection.direction}</p>
            <h2>{collection.name}</h2>
            <p className={styles.description}>{collection.description}</p>
            <span className={styles.enter}>{copy.enter}<span aria-hidden="true">↗</span></span>
          </div>
        </Link>;
      })}
    </div>
    <p className={styles.note}>{copy.conceptNote}</p>
    <KeycapsNewsletter />
  </div>;
}
