import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Kagura Gear support.",
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
            body="Route launch questions, wholesale requests, and order support through your final support inbox."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <aside className="border border-white/10 bg-smoke p-7">
          <h2 className="text-2xl font-black text-bone">Support</h2>
          <p className="mt-4 leading-7 text-steel">
            Replace this placeholder email with your real support address before launch.
          </p>
          <a
            href="mailto:support@kaguragear.com"
            className="mt-6 inline-flex border border-sakura px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-sakura transition hover:bg-sakura hover:text-ink"
          >
            support@kaguragear.com
          </a>
        </aside>

        <form className="grid gap-4 border border-white/10 bg-smoke p-7">
          <div className="grid gap-2">
            <label className="text-sm font-black uppercase tracking-[0.18em] text-bone" htmlFor="name">
              Name
            </label>
            <input id="name" className="min-h-12 border border-white/15 bg-black/35 px-4 text-bone outline-none focus:border-sakura" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-black uppercase tracking-[0.18em] text-bone" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" className="min-h-12 border border-white/15 bg-black/35 px-4 text-bone outline-none focus:border-sakura" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-black uppercase tracking-[0.18em] text-bone" htmlFor="message">
              Message
            </label>
            <textarea id="message" rows={6} className="border border-white/15 bg-black/35 p-4 text-bone outline-none focus:border-sakura" />
          </div>
          <button
            type="submit"
            className="border border-sakura bg-sakura px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
