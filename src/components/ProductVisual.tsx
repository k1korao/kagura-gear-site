import type { Product } from "@/lib/products";

const accentClasses = {
  red: "from-shrine/95 via-ember/55 to-black",
  pink: "from-sakura/90 via-shrine/45 to-black",
  brass: "from-brass/90 via-shrine/40 to-black",
};

export function ProductVisual({ product }: { product: Product }) {
  return (
    <div className="relative aspect-[1.25] overflow-hidden border border-white/10 bg-coal">
      {/* Replace this CSS placeholder with a real product image in public/images when product photography is ready. */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentClasses[product.accent]} opacity-80`} />
      <div className="absolute inset-5 bg-woven-grid bg-[length:24px_24px] opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[78%] -translate-x-1/2 -translate-y-1/2 border border-white/18 bg-black/44 shadow-card">
        <div className="absolute inset-3 border border-sakura/25" />
        <div className="absolute left-6 top-6 h-7 w-20 border border-white/25 bg-white/5" />
        <div className="absolute bottom-6 right-6 h-12 w-12 border border-sakura/40 bg-black/45" />
      </div>
      <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.22em] text-bone">
        {product.category}
      </div>
    </div>
  );
}
