import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { ShopifyBuyButtonSlot } from "@/components/ShopifyBuyButtonSlot";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group border border-white/10 bg-smoke shadow-card transition duration-300 hover:-translate-y-1 hover:border-sakura/50">
      <Link href={`/products/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
        <ProductVisual product={product} />
      </Link>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sakura">
              {product.category}
            </p>
            <h3 className="mt-2 text-xl font-black text-bone">{product.name}</h3>
          </div>
          <p className="text-lg font-black text-bone">{product.price}</p>
        </div>
        <p className="min-h-16 text-sm leading-6 text-steel">{product.shortDescription}</p>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.16em] text-steel">
          <span className="border border-white/10 bg-black/24 px-3 py-2">FPS Ready</span>
          <span className="border border-white/10 bg-black/24 px-3 py-2">Stitched Edge</span>
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
