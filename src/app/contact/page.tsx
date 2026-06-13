import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig, supportMailto } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Kagura Gear support for product, order, wholesale, and setup questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/10 bg-edge-light">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Need support or want to talk setup?"
            body="Send product questions, wholesale requests, and order support messages to the Kagura Gear support inbox."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <aside className="border border-white/10 bg-smoke p-7">
          <h2 className="text-2xl font-black text-bone">Support</h2>
          <p className="mt-4 leading-7 text-steel">
            Customers can contact Kagura Gear directly. Replies come from the same
            official support inbox, so the conversation stays clean.
          </p>
          <a
            href={supportMailto()}
            className="mt-6 inline-flex border border-sakura px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-sakura transition hover:bg-sakura hover:text-ink"
          >
            {siteConfig.supportEmail}
          </a>
          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-steel">
            <p>
              <span className="font-black text-bone">Product questions:</span> sizing,
              surfaces, drops, and desk setup advice.
            </p>
            <p>
              <span className="font-black text-bone">Order support:</span> Shopify order
              questions once checkout is connected.
            </p>
          </div>
        </aside>

        <ContactForm />
      </section>
    </main>
  );
}
