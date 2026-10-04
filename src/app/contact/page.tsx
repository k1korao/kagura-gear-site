import { ContactForm } from "@/components/ContactForm";
import styles from "@/components/SupportPages.module.css";
import { getLocale } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig, supportMailto } from "@/lib/site";
import { supportCopy } from "@/lib/support-copy";

export async function generateMetadata() {
  const copy = supportCopy[await getLocale()].contact;
  return pageMetadata({ title: copy.metaTitle, description: copy.metaDescription, path: "/contact" });
}

export default async function ContactPage() {
  const copy = supportCopy[await getLocale()].contact;
  return <main className={styles.page}>
    <section className={styles.hero} aria-labelledby="contact-title">
      <p className={styles.eyebrow}>{copy.label}</p>
      <h1 id="contact-title">{copy.title}</h1>
      <p className={styles.intro}>{copy.intro}</p>
    </section>
    <section className={styles.contactGrid}>
      <aside className={styles.inbox}>
        <h2>{copy.inboxTitle}</h2>
        <p>{copy.inboxCopy}</p>
        <a className={styles.emailLink} href={supportMailto(copy.mailSubject, copy.mailBody)}>{siteConfig.supportEmail}</a>
        {copy.topics.map(topic => <div className={styles.topic} key={topic.title}><h3>{topic.title}</h3><p>{topic.copy}</p></div>)}
        <p className={styles.status}>{copy.status}</p>
      </aside>
      <div className={styles.formPanel}><h2 className={styles.formHeading}>{copy.formTitle}</h2><ContactForm /></div>
    </section>
  </main>;
}
