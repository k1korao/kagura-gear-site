import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { ShopifyBuyButtonSlot } from "@/components/ShopifyBuyButtonSlot";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group border border-white/10 bg-smoke shadow-card transition duration-300 hover:-translate-y-1 hover:border-sakura/50 hover:bg-[#13161d]">
      <Link href={`/products/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
        <ProductVisual product={product} />
      </Link>
      <div className="grid gap-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sakura">
              {product.series}
            </p>
            <h3 className="mt-2 text-xl font-black text-bone">{product.name}</h3>
          </div>
          <p className="text-lg font-black text-bone">{product.price}</p>
        </div>
        <p className="text-sm font-semibold text-bone/80">{product.tagline}</p>
        <p className="min-h-16 text-sm leading-6 text-steel">{product.shortDescription}</p>
        <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10 text-center text-[0.62rem] font-black uppercase tracking-[0.12em] text-steel">
          {[
            ["Speed", product.speed],
            ["Control", product.control],
            ["Base", "4mm"],
          ].map(([label, value]) => (
            <span key={label} className="bg-black/45 px-2 py-3">
              <span className="block text-[0.54rem] text-sakura/80">{label}</span>
              <span className="mt-1 block text-bone/80">{value}</span>
            </span>
          ))}
        </div>
        <ShopifyBuyButtonSlot productName={product.name} compact />
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-black uppercase tracking-[0.18em] text-sakura transition hover:text-bone"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
