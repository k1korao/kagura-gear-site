"use client";

import { useLocale } from "@/components/LocaleProvider";
import { NewsletterForm } from "@/components/NewsletterForm";
import styles from "./KeycapsNewsletter.module.css";

export function KeycapsNewsletter() {
  const japanese = useLocale() === "ja";
  return <section id="newsletter" className={styles.section} aria-labelledby="keycaps-newsletter-title">
    <div>
      <p className={styles.eyebrow}>KIKORA / KEYCAPS</p>
      <h2 id="keycaps-newsletter-title">{japanese ? "キーキャップの最新情報" : "Keycap updates"}</h2>
      <p className={styles.description}>{japanese ? "キーキャップセットとアーティザンキーキャップの制作の進捗や、今後の発売情報をお届けします。" : "Follow the development of our keycap sets and artisan keycaps, and hear about future releases."}</p>
    </div>
    <NewsletterForm light />
  </section>;
}
