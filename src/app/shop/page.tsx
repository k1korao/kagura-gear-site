import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { products } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Shop",
  description: "Shop Kagura Gear mousepads, desk mats, and accessories.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/10 bg-edge-light">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Shop"
            title="Launch collection."
            body="These products are placeholders until your Shopify catalog is connected. Each card has a clear Shopify Buy Button slot."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
