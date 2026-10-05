import { NewsletterForm } from "@/components/NewsletterForm";
import { BrandStory } from "@/components/BrandStory";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";
import { homeCopy } from "@/lib/home-copy";
import { searchAppearanceCopy } from "@/lib/search-appearance";

export async function generateMetadata() { const copy = searchAppearanceCopy[getLocale()]; return pageMetadata({ title: copy.title, description: copy.description, path: "/" }); }

export default function CollectionPage() {
  const copy = homeCopy[getLocale()];
  return <main className="kagura-collection-page">
    <BrandStory />
    <section id="newsletter" className="kagura-newsletter" aria-labelledby="newsletter-title">
      <div><p className="kagura-label">{copy.label}</p><h2 id="newsletter-title">{copy.newsletter}</h2><p>{copy.updates}</p></div>
      <NewsletterForm light />
    </section>
  </main>;
}
