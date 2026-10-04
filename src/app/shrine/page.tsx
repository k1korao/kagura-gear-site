import { NewsletterForm } from "@/components/NewsletterForm";
import { ShrineExperience } from "@/components/ShrineExperience";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Kagura — Glass Mousepads & Keycaps", description: "Album-cover energy, reimagined for your desk. Explore KAGURA glass mousepad design concepts and our upcoming keycap collection.", path: "/shrine" });

export default function CollectionPage() {
  return <main className="kagura-collection-page">
    <ShrineExperience />
    <section id="newsletter" className="kagura-newsletter" aria-labelledby="newsletter-title">
      <div><p className="kagura-label">GOOD THINGS. NEXT IN LINE.</p><h2 id="newsletter-title">Stay in the <em>loop.</em></h2><p>New artwork, collection news, and the first word on our next release.</p></div>
      <NewsletterForm light />
    </section>
  </main>;
}
