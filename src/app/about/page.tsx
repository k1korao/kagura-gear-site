import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: "The story behind Kagura Gear.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="bg-ink">
      <section className="relative overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/images/kagura-hero.png"
          alt="Japanese-inspired gaming setup"
          fill
          sizes="100vw"
          className="object-cover opacity-38"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="Focused gear for focused play."
            body="Kagura Gear is built around the idea that a gaming setup should feel intentional. Every surface should make the desk quieter, sharper, and more ready for the next match."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          ["Inspired", "Shrine architecture, sakura tones, and restrained layouts guide the visual language."],
          ["Competitive", "The product direction starts with FPS control, glide consistency, and daily reliability."],
          ["Premium", "Materials, packaging, and product pages should feel elevated from the first visit."],
        ].map(([title, body]) => (
          <article key={title} className="border border-white/10 bg-smoke p-7">
            <h2 className="text-2xl font-black text-bone">{title}</h2>
            <p className="mt-4 leading-7 text-steel">{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
