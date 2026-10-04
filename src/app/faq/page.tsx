import Link from "next/link";
import styles from "@/components/SupportPages.module.css";
import { getLocale } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/metadata";
import { supportCopy } from "@/lib/support-copy";

export async function generateMetadata() {
  const copy = supportCopy[await getLocale()].faq;
  return pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: "/faq" });
}

export default async function FaqPage() {
  const copy = supportCopy[await getLocale()].faq;
  return <main className={styles.page}>
    <section className={styles.hero} aria-labelledby="faq-title">
      <p className={styles.eyebrow}>{copy.label}</p>
      <h1 id="faq-title">{copy.title}</h1>
      <p className={styles.intro}>{copy.intro}</p>
    </section>
    <section className={styles.faqItems} aria-labelledby="faq-title">
      {copy.items.map((item, index) => <details className={styles.faqItem} key={item.question}>
        <summary><span className={styles.faqNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><span className={styles.faqPlus} aria-hidden="true">+</span></summary>
        <p>{item.answer}</p>
      </details>)}
    </section>
    <section className={styles.contactCard}>
      <div><h2>{copy.contactTitle}</h2><p>{copy.contactCopy}</p></div>
      <Link className={styles.contactAction} href="/contact">{copy.contactAction}<span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
