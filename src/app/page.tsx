import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, products } from "@/lib/products";

const features = [
  {
    title: "Aim Tuned",
    body: "Surfaces are planned around tracking, stopping power, and consistent glide instead of generic desk decor.",
  },
  {
    title: "Desk Ritual",
    body: "Clean lines, shrine-inspired accents, and sakura details bring atmosphere without visual noise.",
  },
  {
    title: "Setup Durable",
    body: "Dense rubber bases, stitched edges, and daily-use materials keep the surface ready for long sessions.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[82svh] overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/images/kagura-hero.png"
          alt="Kagura Gear dark Japanese-inspired gaming desk setup"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-woven-grid bg-[length:42px_42px] opacity-10" />

        <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex border border-sakura/40 bg-black/35 px-3 py-2 text-xs font-black uppercase tracking-[0.28em] text-sakura">
              Japanese-inspired gaming surfaces
            </p>
            <h1 className="text-5xl font-black leading-none text-bone sm:text-7xl lg:text-8xl">
              Precision Meets Ritual
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel sm:text-xl">
              Premium mousepads, desk mats, and keyboard accessories built for
              FPS players who want calm control, clean setups, and a sharper ritual.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="border border-sakura bg-sakura px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone"
              >
                Shop Gear
              </Link>
              <Link
                href="/about"
                className="border border-white/18 bg-black/35 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:border-sakura hover:text-sakura"
              >
                Brand Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product Categories"
            title="Surfaces for every desk ritual."
            body="Start with the surface that matches your aim style, then build the setup around it."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <article
                key={category.title}
                className="border border-white/10 bg-smoke p-5 transition hover:border-sakura/50 hover:bg-white/[0.055]"
              >
                <span className="text-xs font-black uppercase tracking-[0.24em] text-brass">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-xl font-black text-bone">{category.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Drop"
              title="Launch-ready gear."
              body="Three starter products are wired with Shopify Buy Button placeholders for checkout."
            />
            <Link
              href="/shop"
              className="w-fit border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:border-sakura hover:text-sakura"
            >
              View Shop
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-edge-light py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <SectionHeading
            eyebrow="Brand Story"
            title="Built like a pre-game ritual."
            body="Kagura Gear blends Japanese visual restraint with the performance mindset of modern esports. The goal is simple: a setup that feels focused before the first round starts."
          />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {["Focus", "Control", "Presence"].map((word) => (
              <div key={word} className="border border-white/10 bg-black/40 p-6">
                <h3 className="text-2xl font-black text-bone">{word}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">
                  Minimal visual noise, tactile materials, and details that reward a closer look.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Performance"
            title="Clean looks. Competitive intent."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="border border-white/10 bg-smoke p-7">
                <h3 className="text-2xl font-black text-bone">{feature.title}</h3>
                <p className="mt-4 leading-7 text-steel">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading
            eyebrow="Newsletter"
            title="Enter the next drop."
            body="Get launch notes, restock alerts, and desk setup releases before they go public."
          />
          <form className="flex flex-col gap-3 self-end sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="min-h-14 flex-1 border border-white/15 bg-smoke px-4 text-bone outline-none transition placeholder:text-steel focus:border-sakura"
            />
            <button
              type="submit"
              className="min-h-14 border border-sakura bg-sakura px-6 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
