import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, products } from "@/lib/products";

const features = [
  {
    title: "Hall-ready desk feel",
    body: "Mouse surface, keyboard position, and cable space are tuned as one focused setup.",
  },
  {
    title: "FPS control layers",
    body: "Each surface is framed around glide speed, stopping power, and repeatable aim movement.",
  },
  {
    title: "Ritual visual system",
    body: "Sakura accents, shrine-line artwork, and restrained esports contrast give each drop a clear identity.",
  },
];

const setupModes = [
  "65% keyboard space",
  "Low mouse cable drag",
  "Full desk coverage",
  "Support-ready ordering",
];

const comparisonRows = [
  ["Kagura Control Pad", "High", "Medium", "Tactical FPS", "490 x 420 mm"],
  ["Sakura Speed Pad", "Medium", "Fast", "Tracking aim", "500 x 500 mm"],
  ["Shrine Desk Mat", "Balanced", "Balanced", "Keyboard setups", "900 x 400 mm"],
];

const sakuraPetals = [
  ["8%", "7px", "18s", "-3s", "24vw", "28deg", "0.38"],
  ["18%", "5px", "22s", "-12s", "16vw", "-14deg", "0.28"],
  ["31%", "6px", "19s", "-7s", "-18vw", "64deg", "0.36"],
  ["44%", "4px", "25s", "-17s", "12vw", "11deg", "0.24"],
  ["57%", "8px", "21s", "-9s", "-22vw", "-38deg", "0.34"],
  ["69%", "5px", "24s", "-4s", "18vw", "48deg", "0.26"],
  ["82%", "7px", "20s", "-14s", "-14vw", "-22deg", "0.32"],
  ["93%", "4px", "27s", "-21s", "-26vw", "19deg", "0.22"],
];

export default function Home() {
  return (
    <main>
      <section className="hero-cinematic relative min-h-[88svh] overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/images/kagura-hero.png"
          alt="Kagura Gear Japanese-inspired gaming desk setup"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-woven-grid bg-[length:42px_42px] opacity-[0.08]" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent" />
        <div className="sakura-field" aria-hidden="true">
          {sakuraPetals.map(([left, size, duration, delay, drift, rotate, opacity], index) => (
            <span
              key={index}
              className="sakura-petal"
              style={
                {
                  "--petal-left": left,
                  "--petal-size": size,
                  "--petal-duration": duration,
                  "--petal-delay": delay,
                  "--petal-drift": drift,
                  "--petal-rotate": rotate,
                  "--petal-opacity": opacity,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid min-h-[88svh] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="max-w-3xl">
            <Image
              src="/images/kagura-logo-full.png"
              alt="Kagura Gear"
              width={420}
              height={170}
              priority
              data-reveal
              className="mb-6 h-20 w-auto max-w-full object-contain object-left sm:h-24"
            />
            <p data-reveal className="mb-5 inline-flex border border-sakura/40 bg-black/45 px-3 py-2 text-xs font-black uppercase tracking-[0.28em] text-sakura">
              Precision Meets Ritual
            </p>
            <h1 data-reveal style={{ "--reveal-delay": "90ms" } as CSSProperties} className="text-5xl font-black leading-none text-bone sm:text-7xl lg:text-8xl">
              Premium surfaces for focused play.
            </h1>
            <p data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties} className="mt-6 max-w-2xl text-lg leading-8 text-steel sm:text-xl">
              Japanese-inspired gaming desk gear for FPS players, mechanical keyboard
              users, and setup builders who want every movement to feel intentional.
            </p>
            <div data-reveal style={{ "--reveal-delay": "230ms" } as CSSProperties} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="premium-button border border-sakura bg-sakura px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone"
              >
                Shop Gear
              </Link>
              <Link
                href="/shop#series"
                className="premium-button border border-white/18 bg-black/35 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:border-sakura hover:text-sakura"
              >
                Explore Series
              </Link>
            </div>
            <dl data-reveal style={{ "--reveal-delay": "300ms" } as CSSProperties} className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/10 py-5">
              {[
                ["3", "Launch products"],
                ["4mm", "Base profile"],
                ["24/7", "Email support"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-black text-bone">{value}</dt>
                  <dd className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-steel">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal style={{ "--reveal-delay": "180ms" } as CSSProperties} className="hero-device relative hidden min-h-[520px] lg:block">
            <div className="absolute inset-x-8 top-28 h-72 keyboard-perspective border border-white/12 bg-black/70 shadow-card">
              <div className="absolute inset-4 border border-shrine/60" />
              <Image
                src="/images/kagura-logo-mark.png"
                alt=""
                width={180}
                height={180}
                className="absolute left-8 top-8 h-28 w-28 object-contain opacity-55 mix-blend-screen"
              />
              <div className="absolute left-8 top-8 h-8 w-36 border border-white/15 bg-white/5" />
              <div className="absolute bottom-10 right-10 h-16 w-16 border border-sakura/50 bg-black/50" />
            </div>
            <div className="absolute left-[13%] top-[16%] h-32 w-[70%] -skew-x-6 border border-white/14 bg-[#11131a] shadow-glow">
              <div className="grid h-full grid-cols-12 gap-1 p-3">
                {Array.from({ length: 48 }).map((_, index) => (
                  <span
                    key={index}
                    style={{ animationDelay: `${index * 42}ms` }}
                    className={`key-pulse border border-white/10 bg-white/[0.075] ${
                      index === 5 || index === 18 || index === 43 ? "bg-sakura" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-24 right-10 h-28 w-20 -skew-x-6 border border-white/14 bg-[#161922]">
              <div className="mx-auto mt-5 h-10 w-px bg-sakura" />
            </div>
            <div className="absolute bottom-8 left-10 border border-white/10 bg-black/70 px-4 py-3 text-xs font-black uppercase tracking-[0.22em] text-bone">
              Control pads / Desk mats / Keyboard accessories
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["01", "Control and speed surfaces"],
            ["02", "Keyboard-first desk sizing"],
            ["03", "Sakura and shrine visual language"],
            ["04", "Official support inbox"],
          ].map(([index, label]) => (
            <div key={label} data-reveal className="flex items-center gap-4 border-l border-white/10 pl-4">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-sakura">
                {index}
              </span>
              <span className="text-sm font-black uppercase tracking-[0.16em] text-bone">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="series" className="border-b border-white/10 bg-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Shop The System"
            title="Build the desk like a loadout."
            body="Clear series, clear product roles, and fast paths into the surface that matches your aim style."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <article
                key={category.title}
                data-tilt
                data-reveal
                className="group overflow-hidden border border-white/10 bg-smoke p-5 transition hover:border-sakura/50 hover:bg-white/[0.055]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.24em] text-brass">
                    0{index + 1}
                  </span>
                  <span className="h-px w-16 bg-white/15 transition group-hover:bg-sakura" />
                </div>
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
              eyebrow="Launch Collection"
              title="Three products, one visual world."
              body="Each launch product has a distinct surface role, size target, and setup purpose."
            />
            <Link
              href="/shop"
              className="premium-button w-fit border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:border-sakura hover:text-sakura"
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <BrandLogo />
            <div className="mt-8">
              <SectionHeading
                eyebrow="Setup Builder"
                title="A shrine-clean desk for serious play."
                body="Keyboard-space first, mouse movement second, visual ritual throughout."
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {setupModes.map((mode) => (
              <div key={mode} data-tilt data-reveal className="overflow-hidden border border-white/10 bg-black/45 p-6">
                <p className="text-xl font-black text-bone">{mode}</p>
                <p className="mt-3 text-sm leading-6 text-steel">
                  Built for a cleaner desk, faster decisions, and a consistent surface language.
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
            title="Clean looks. Competitive specs."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} data-tilt data-reveal className="overflow-hidden border border-white/10 bg-smoke p-7">
                <h3 className="text-2xl font-black text-bone">{feature.title}</h3>
                <p className="mt-4 leading-7 text-steel">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compare"
            title="Pick by aim feel, not by guesswork."
            body="A simple comparison table gives shoppers a product-led reason to click into the right page."
          />
          <div data-reveal className="mt-10 overflow-x-auto border border-white/10">
            <table className="min-w-[760px] w-full border-collapse bg-smoke text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs font-black uppercase tracking-[0.18em] text-sakura">
                  {["Product", "Control", "Speed", "Best for", "Size"].map((heading) => (
                    <th key={heading} className="px-5 py-4">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="border-b border-white/8 last:border-b-0">
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        className={`px-5 py-5 text-sm ${
                          index === 0 ? "font-black text-bone" : "font-semibold text-steel"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
              className="premium-button min-h-14 border border-sakura bg-sakura px-6 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:border-bone hover:bg-bone"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
