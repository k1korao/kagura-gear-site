"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { navigationCopy } from "@/lib/navigation-copy";
import { newsletterHrefForPath } from "@/lib/newsletter-category";
import { siteConfig, supportMailto } from "@/lib/site";
import { KaguraIdentity } from "./KaguraIdentity";
import styles from "./Navbar.module.css";

function selectCategory(category: "glass" | "metal", collection?: "core" | "artist" | "covers") {
  window.dispatchEvent(new CustomEvent("kagura:category", { detail: { category, ...(collection ? { collection } : {}) } }));
}

export function Footer() {
  const pathname = usePathname();
  const copy = navigationCopy[useLocale()];
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label={copy.home}><KaguraIdentity /></Link>
          <p>{copy.brand[0]}<br />{copy.brand[1]}</p>
          <a href={supportMailto(copy.supportSubject)}>{siteConfig.supportEmail}</a>
        </div>
        <div className={styles.footerGroup}>
          <h2>{copy.explore}</h2>
          <Link href="/explore/glass" onClick={() => selectCategory("glass")}>{copy.glass}</Link>
          <Link className={styles.footerSubLink} href="/explore/glass/core" onClick={() => selectCategory("glass", "core")}>{copy.collections[0].label}</Link>
          <Link className={styles.footerSubLink} href="/explore/glass/artist" onClick={() => selectCategory("glass", "artist")}>{copy.collections[1].label}</Link>
          <Link className={styles.footerSubLink} href="/explore/glass/covers" onClick={() => selectCategory("glass", "covers")}>{copy.collections[2].label}</Link>
          <Link href="/explore/keycaps">{copy.keycaps}</Link>
          {copy.keycapCollections.map(collection => <Link key={collection.id} className={styles.footerSubLink} href={`/explore/keycaps/${collection.id}`}>{collection.label}</Link>)}
        </div>
        <div className={styles.footerGroup}>
          <h2>{copy.information}</h2>
          <Link href="/about">{copy.about}</Link>
          <Link href="/faq">{copy.faq}</Link>
          <Link href="/contact">{copy.contact}</Link>
          <Link href="/shipping-policy">{copy.shipping}</Link>
          <Link href="/return-policy">{copy.returns}</Link>
        </div>
        <div className={styles.footerNote}>
          <span>{copy.status}</span>
          <h2>{copy.invitation[0]}<br />{copy.invitation[1]}</h2>
          <p>{copy.invitationBody}</p>
          <Link href={newsletterHrefForPath(pathname)}>{copy.updatesAction} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} KIKORA. {copy.copyright}</span>
        <div><Link href="/privacy-policy">{copy.privacy}</Link><Link href="/terms-of-service">{copy.terms}</Link></div>
        <span>{copy.principles}</span>
      </div>
    </footer>
  );
}
