import { NewsletterForm } from "@/components/NewsletterForm";
import { BrandStory } from "@/components/BrandStory";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";
import { homeCopy } from "@/lib/home-copy";

export async function generateMetadata() { const copy = homeCopy[await getLocale()]; return pageMetadata({ title: copy.title, description: copy.description, path: "/shrine" }); }

export default async function CollectionPage() {
  const copy = homeCopy[await getLocale()];
  return <main className="kagura-collection-page">
    <BrandStory />
    <section id="newsletter" className="kagura-newsletter" aria-labelledby="newsletter-title">
      <div><p className="kagura-label">{copy.label}</p><h2 id="newsletter-title">{copy.newsletter}</h2><p>{copy.updates}</p></div>
      <NewsletterForm light />
    </section>
  </main>;
}
