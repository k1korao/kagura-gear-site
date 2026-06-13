import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { categories, products } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Shop",
  description: "Shop Kagura Gear mousepads, desk mats, and accessories.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/10 bg-edge-light">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-sakura">
              Kagura Gear Shop
            </p>
            <h1 className="text-4xl font-black leading-tight text-bone sm:text-6xl">
              Mousepads, desk mats, and keyboard setup gear.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
              A product-led storefront for the launch collection. Shopify Buy Button
              slots are ready for live checkout when your catalog is connected.
            </p>
          </div>
          <div className="grid gap-3 self-end sm:grid-cols-2">
            {["FPS aim", "Keyboard setups", "Desk mats", "Shopify checkout"].map((item) => (
              <div key={item} className="border border-white/10 bg-black/40 p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-bone">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="series" className="border-b border-white/10 bg-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.title}
                href="#products"
                className="border border-white/10 bg-smoke p-5 transition hover:border-sakura/50 hover:bg-white/[0.055]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sakura">
                  Series
                </p>
                <h2 className="mt-4 text-xl font-black text-bone">{category.title}</h2>
                <p className="mt-3 text-sm leading-6 text-steel">{category.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Launch Products"
            title="Choose your surface."
            body="Placeholder products can be replaced with real Shopify products later."
          />
          <div className="grid grid-cols-3 gap-2 text-center text-[0.65rem] font-black uppercase tracking-[0.12em] text-steel">
            <span className="border border-white/10 bg-smoke px-3 py-2">Control</span>
            <span className="border border-white/10 bg-smoke px-3 py-2">Speed</span>
            <span className="border border-white/10 bg-smoke px-3 py-2">Desk</span>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["No custom payment", "Buy Now buttons are placeholders for Shopify Buy Button embed code."],
              ["Catalog ready", "Product names, prices, descriptions, sizes, and surface types are structured."],
              ["Vercel live", "Every push to GitHub can redeploy this storefront automatically."],
            ].map(([title, body]) => (
              <article key={title} className="border border-white/10 bg-smoke p-6">
                <h2 className="text-xl font-black text-bone">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-steel">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
