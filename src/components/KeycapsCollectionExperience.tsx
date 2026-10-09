"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { KeycapsNewsletter } from "@/components/KeycapsNewsletter";
import { keycapsCollectionCopy, keycapsCollectionIds, type KeycapsCollection } from "@/lib/keycaps-collection-copy";
import styles from "./KeycapsCollectionExperience.module.css";

const keyRows = [
  ["esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "−"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "⌫"],
  ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "↵"],
  ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "↑", "shift"],
  ["ctrl", "⌘", "alt", "KIKORA", "alt", "←", "↓", "→"],
];

export function KeycapsPreview({ collection }: { collection: KeycapsCollection }) {
  return collection === "set" ? <div className={styles.setScene} aria-hidden="true">
    <div className={styles.keyboard}>
      {keyRows.map((row, index) => <div key={index} className={styles.keyRow}>
        {row.map((legend, keyIndex) => <div key={`${index}-${keyIndex}`} className={`${styles.key} ${legend === "KIKORA" ? styles.spacebar : ""} ${index === 0 && keyIndex === 0 ? styles.accent : ""}`}><span>{legend}</span></div>)}
      </div>)}
    </div>
  </div> : <div className={styles.artisanScene} aria-hidden="true">
    <div className={styles.artisanKey}><i>↗</i><span>KIKORA</span></div>
    <div className={styles.artisanSmall} />
  </div>;
}

export function KeycapsCollectionExperience({ collection }: { collection: KeycapsCollection }) {
  const copy = keycapsCollectionCopy[useLocale()];
  const selected = copy.collections[collection];

  return <div className={styles.root}>
    <div className={styles.topbar}>
      <Link href="/explore/keycaps" className={styles.back}>← {copy.allKeycaps}</Link>
      <nav className={styles.tabs} aria-label={copy.hubTitle}>
        {keycapsCollectionIds.map(id => <Link key={id} href={`/explore/keycaps/${id}`} aria-current={collection === id ? "page" : undefined}>{copy.collections[id].name}</Link>)}
      </nav>
    </div>
    <section className={styles.stage} aria-labelledby="keycaps-title">
      <div className={`${styles.visual} ${styles[collection]}`} role="img" aria-label={selected.preview}>
        <span className={styles.visualIndex}>{collection === "set" ? "01" : "02"} / {selected.study}</span>
        <KeycapsPreview collection={collection} />
        <span className={styles.previewLabel}>{copy.previewLabel}</span>
      </div>
      <div className={styles.info}>
        <p className={styles.kicker}>{selected.direction}</p>
        <h1 id="keycaps-title">{selected.name}</h1>
        <span className={styles.status}>{copy.developing}</span>
        <p className={styles.story}>{selected.story}</p>
        <Link href="#newsletter" className={styles.primaryButton}>{copy.release}<span aria-hidden="true">↗</span></Link>
        <p className={styles.note}>{copy.conceptNote}</p>
      </div>
    </section>
    <KeycapsNewsletter />
  </div>;
}
