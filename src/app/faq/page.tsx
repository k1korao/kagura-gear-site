import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Kagura Gear.",
  path: "/faq",
});

const faqs = [
  {
    question: "How will checkout work?",
    answer:
      "Checkout should be handled by Shopify Checkout through Shopify Buy Button embeds. This website does not collect credit card data.",
  },
  {
    question: "Are these products final?",
    answer:
      "The first three products are launch placeholders. Replace product descriptions, images, pricing, and Shopify embeds once your Shopify catalog is ready.",
  },
  {
    question: "Can the site use my Shopify products automatically?",
    answer:
      "Yes. A future version can use Shopify Storefront API for dynamic products, cart behavior, and Shopify Checkout redirects.",
  },
  {
    question: "Where should policy details be edited?",
    answer:
      "Shipping, return, privacy, and terms pages are included. Update them to match your actual Shopify settings and legal requirements before launch.",
  },
];

export default function FaqPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/10 bg-edge-light">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Launch questions, answered cleanly."
            body="A starter FAQ for customers and for your Shopify launch workflow."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-4 px-4 py-16 sm:px-6 lg:px-8">
        {faqs.map((faq) => (
          <details key={faq.question} className="border border-white/10 bg-smoke p-6">
            <summary className="cursor-pointer text-lg font-black text-bone">
              {faq.question}
            </summary>
            <p className="mt-4 leading-7 text-steel">{faq.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
