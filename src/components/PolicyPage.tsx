import type { PolicyPageContent } from "@/lib/policies";
import styles from "./PolicyPage.module.css";
export function PolicyPage({ content }: { content: PolicyPageContent }) {
  return <main className={`kagura-collection-page ${styles.page}`}><header><p>{content.eyebrow}</p><h1>{content.title}</h1><div>{content.intro}</div></header><section>{content.sections.map(section => <article key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></article>)}</section></main>;
}
