"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { glassCollectionCopy, glassCollectionIds, isGlassCollection } from "@/lib/glass-collection-copy";
import { coverEditions, productCopy } from "@/lib/product-copy";
import styles from "./GlassCollectionsHub.module.css";

export function GlassCollectionsHub() {
  const locale = useLocale();
  const copy = glassCollectionCopy[locale];
  const product = productCopy[locale];
  const router = useRouter();

  useEffect(() => {
    function openLegacyCollection() {
      const collection = window.location.hash.slice(1);
      const art = new URLSearchParams(window.location.search).get("art");
      const edition = coverEditions.find(item => item.id === art);
      // The old page kept its artwork query while switching collection hashes.
      const target = isGlassCollection(collection) ? collection : edition ? "covers" : null;
      if (!target) return;
      const query = target === "covers" && edition ? `?art=${edition.id}` : "";
      router.replace(`/explore/glass/${target}${query}`);
    }
    openLegacyCollection();
    window.addEventListener("hashchange", openLegacyCollection);
    window.addEventListener("popstate", openLegacyCollection);
    return () => {
      window.removeEventListener("hashchange", openLegacyCollection);
      window.removeEventListener("popstate", openLegacyCollection);
    };
  }, [router]);

  return <div className={styles.root}>
    <header className={styles.heading}>
      <Link href="/#discover" className={styles.back}>← {product.experience.allCollections}</Link>
      <p>{copy.hubLabel}</p>
      <h1>{copy.hubTitle}</h1>
      <div className={styles.intro}><span>{product.categories.glass}</span><p>{copy.hubDescription}</p></div>
    </header>
    <div className={styles.collections}>
      {glassCollectionIds.map((id, index) => <Link key={id} href={`/explore/glass/${id}`} className={`${styles.collection} ${styles[id]}`}>
        <div className={styles.visual} aria-hidden="true">
          <span className={styles.index}>0{index + 1} / {id.toUpperCase()}</span>
          {id === "core" ? <div className={styles.corePad}><i /><span>KIKORA / CORE</span></div> : id === "artist" ? <div className={styles.artistPad}><i /><b /><span>KIKORA / ARTIST</span></div> : <div className={styles.albumPads}><div><Image src="/images/album-concept-wraith.webp" alt="" fill sizes="(max-width:760px) 65vw, 23vw" /></div><div><Image src="/images/album-concept-reyna.webp" alt="" fill sizes="(max-width:760px) 65vw, 23vw" /></div></div>}
          <span className={styles.mode}>{copy.interactions[index]}</span>
          <span className={styles.arrow}>↗</span>
        </div>
        <div className={styles.caption}><p>{copy.directions[index]}</p><h2>{product.collections[index].name}</h2><p className={styles.description}>{product.collections[index].description}</p><span className={styles.enter}>{copy.enter} <span aria-hidden="true">↗</span></span></div>
      </Link>)}
    </div>
    <p className={styles.note}>{product.experience.conceptNote}</p>
  </div>;
}
