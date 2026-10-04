"use client";

import Link from "next/link";
import { siteConfig, supportMailto } from "@/lib/site";
import { KaguraWordmark } from "./KaguraWordmark";
import styles from "./Navbar.module.css";

function selectCategory(category: "glass" | "keycaps" | "metal", collection?: "core" | "artist" | "covers") {
  window.dispatchEvent(new CustomEvent("kagura:category", { detail: { category, ...(collection ? { collection } : {}) } }));
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label="Kagura home"><KaguraWordmark /></Link>
          <p>Make your desk your own.<br />Glass mousepads. Keycaps. Metal customs.</p>
          <a href={supportMailto()}>{siteConfig.supportEmail}</a>
        </div>
        <div className={styles.footerGroup}>
          <h2>EXPLORE</h2>
          <Link href="/explore/glass" onClick={() => selectCategory("glass")}>Glass mousepads</Link>
          <Link className={styles.footerSubLink} href="/explore/glass#core" onClick={() => selectCategory("glass", "core")}>Core</Link>
          <Link className={styles.footerSubLink} href="/explore/glass#artist" onClick={() => selectCategory("glass", "artist")}>Artist</Link>
          <Link className={styles.footerSubLink} href="/explore/glass#covers" onClick={() => selectCategory("glass", "covers")}>Covers / album editions</Link>
          <Link href="/explore/keycaps" onClick={() => selectCategory("keycaps")}>Keycaps</Link>
          <Link href="/explore/metal" onClick={() => selectCategory("metal")}>Metal customs</Link>
        </div>
        <div className={styles.footerGroup}>
          <h2>INFORMATION</h2>
          <Link href="/about">About KAGURA</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/shipping-policy">Shipping</Link>
          <Link href="/return-policy">Returns</Link>
        </div>
        <div className={styles.footerNote}>
          <span>IN DEVELOPMENT</span>
          <h2>The next chapter<br />of your setup.</h2>
          <p>Follow new designs, product details, and upcoming releases.</p>
          <Link href="/#newsletter">Get release updates <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Kagura Gear. All rights reserved.</span>
        <div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-of-service">Terms of service</Link></div>
        <span>PRECISION / CHARACTER / EXPRESSION</span>
      </div>
    </footer>
  );
}
