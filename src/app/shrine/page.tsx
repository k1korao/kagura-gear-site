import { NewsletterForm } from "@/components/NewsletterForm";
import { BrandStory } from "@/components/BrandStory";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "KAGURA — Made for Your Next Obsession", description: "Independent objects. Individual expression. Discover the KAGURA story, glass mousepads, keycaps, and future metal customs.", path: "/shrine" });

export default function CollectionPage() {
  return <main className="kagura-collection-page">
    <BrandStory />
    <section id="newsletter" className="kagura-newsletter" aria-labelledby="newsletter-title">
      <div><p className="kagura-label">GOOD THINGS. NEXT IN LINE.</p><h2 id="newsletter-title">THE NEXT<br />CHAPTER.</h2><p>New artwork, collection news, and the first word on our next release.</p></div>
      <NewsletterForm light />
    </section>
  </main>;
}
