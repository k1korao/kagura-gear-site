import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { supportMailto } from "@/lib/site";
import { getLocale } from "@/lib/locale-server";
import { aboutCopy } from "@/lib/about-copy";
import styles from "./about.module.css";

export async function generateMetadata() {
  const copy = aboutCopy[await getLocale()];
  return pageMetadata({ title: copy.title, description: copy.description, path: "/about" });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const copy = aboutCopy[locale];
  return (
    <main className={`kagura-collection-page ${styles.page}`} lang={copy.lang} data-locale={locale}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 id="about-title">{copy.heroTitle[0]}<br />{copy.heroTitle[1]}</h1>
          <p className={styles.heroEnglish} lang="en">COLLECT<br /><span>YOUR WORLD.</span></p>
          <p className={styles.intro}>{copy.intro[0]}<br />{copy.intro[1]}</p>
          <a className={styles.textLink} href="#story">{copy.enter} <span aria-hidden="true">↓</span></a>
        </div>
        <figure className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <Image src="/images/album-concept-wraith.webp" alt={copy.wraithAlt} fill priority sizes="(max-width: 760px) 90vw, 46vw" />
            <span className={styles.imageMark}>{copy.visualMark[0]}<br />{copy.visualMark[1]}</span>
          </div>
          <figcaption><span>{copy.visualStudy}</span><span>{copy.visualNote}</span></figcaption>
        </figure>
      </section>

      <section className={styles.story} id="story" aria-labelledby="story-title">
        <div className={styles.chapterLabel}><span>{copy.beginning}</span><span>{copy.sharedPassion}</span></div>
        <div className={styles.storyBody}>
          <h2 id="story-title">{copy.storyTitle[0]}<br />{copy.storyTitle[1]}</h2>
          <div className={styles.prose}>
            {copy.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.beliefs} aria-labelledby="beliefs-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>{copy.beliefLabel}</p><h2 id="beliefs-title">{copy.beliefTitle[0]}<br />{copy.beliefTitle[1]}</h2></div>
        <div className={styles.beliefGrid}>
          {copy.beliefs.map((belief) => <article key={belief.number} className={styles.belief}><div className={styles.beliefIndex}><span>{belief.number}</span><span>{belief.label}</span></div><h3>{belief.title}</h3><p>{belief.body}</p></article>)}
        </div>
      </section>

      <section className={styles.creatorStory} aria-labelledby="creators-title">
        <figure className={styles.creatorVisual}>
          <div><Image src="/images/album-concept-reyna.webp" alt={copy.reynaAlt} fill sizes="(max-width: 760px) 90vw, 43vw" /></div>
          <figcaption>{copy.creatorVisualNote}</figcaption>
        </figure>
        <div className={styles.creatorCopy}>
          <p className={styles.eyebrow}>{copy.creatorLabel}</p>
          <h2 id="creators-title">{copy.creatorTitle[0]}<br />{copy.creatorTitle[1]}</h2>
          {copy.creatorBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <span className={styles.status}>{copy.creatorStatus}</span>
          <a className={styles.textLink} href={supportMailto(copy.mailSubject)}>{copy.creatorAction} <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className={styles.objects} aria-labelledby="objects-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>{copy.objectsLabel}</p><h2 id="objects-title">{copy.objectsTitle[0]}<br />{copy.objectsTitle[1]}</h2><p>{copy.objectsBody}</p></div>
        <div className={styles.objectGrid}>
          {copy.objects.map((object) => <Link key={object.href} className={styles.objectCard} href={object.href}><span className={styles.objectNumber}>{object.label}</span><h3>{object.title}</h3><p>{object.body}</p><span className={styles.objectLink}>{object.action} <span aria-hidden="true">↗</span></span></Link>)}
        </div>
      </section>

      <section className={styles.invitation} aria-labelledby="invitation-title">
        <p className={styles.eyebrow}>{copy.invitationLabel}</p>
        <h2 id="invitation-title">{copy.invitationTitle[0]}<br />{copy.invitationTitle[1]}</h2>
        <p>{copy.invitationBody[0]}<br />{copy.invitationBody[1]}</p>
        <Link className={styles.button} href="/#newsletter">{copy.invitationAction} <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
