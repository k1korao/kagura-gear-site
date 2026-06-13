import type { Product } from "@/lib/products";

const accentClasses = {
  red: {
    beam: "bg-shrine",
    glow: "shadow-[0_0_60px_rgba(215,51,77,0.32)]",
    key: "bg-ember",
    print: "border-shrine/70",
  },
  pink: {
    beam: "bg-sakura",
    glow: "shadow-[0_0_60px_rgba(246,165,189,0.26)]",
    key: "bg-sakura",
    print: "border-sakura/70",
  },
  brass: {
    beam: "bg-brass",
    glow: "shadow-[0_0_60px_rgba(214,181,109,0.22)]",
    key: "bg-brass",
    print: "border-brass/70",
  },
};

export function ProductVisual({ product }: { product: Product }) {
  const accent = accentClasses[product.accent];

  return (
    <div className="relative aspect-[1.18] overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_38%),linear-gradient(145deg,#171922,#050507_64%)]">
      {/* Replace this CSS placeholder with a real product image in public/images when product photography is ready. */}
      <div className="absolute inset-0 bg-woven-grid bg-[length:28px_28px] opacity-[0.08]" />
      <div className={`absolute -left-20 top-10 h-28 w-72 rotate-[-22deg] blur-3xl ${accent.beam} opacity-35`} />
      <div className="absolute right-[-15%] top-[-22%] h-52 w-52 border border-white/10 bg-white/[0.03]" />

      <div className="absolute left-1/2 top-[58%] h-[52%] w-[84%] -translate-x-1/2 -translate-y-1/2 -skew-x-6 border border-white/12 bg-black/60 shadow-card">
        <div className={`absolute inset-3 border ${accent.print} opacity-45`} />
        <div className="absolute left-6 top-6 h-5 w-24 border border-white/15 bg-white/5" />
        <div className="absolute bottom-5 left-6 right-6 h-px bg-white/12" />
        <div className={`absolute bottom-6 right-7 h-12 w-12 border ${accent.print} bg-black/50`} />
        <div className="absolute bottom-9 right-10 h-6 w-6 border border-white/15" />
      </div>

      <div className={`absolute left-[17%] top-[23%] h-[23%] w-[62%] -skew-x-6 border border-white/14 bg-[#11131a] ${accent.glow}`}>
        <div className="grid h-full grid-cols-12 gap-1 p-2">
          {Array.from({ length: 36 }).map((_, index) => (
            <span
              key={index}
              className={`border border-white/8 bg-white/[0.075] ${
                index === 2 || index === 14 || index === 27 ? accent.key : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-[15%] top-[44%] h-[21%] w-[12%] -skew-x-6 border border-white/14 bg-[#161922]">
        <div className={`mx-auto mt-3 h-6 w-px ${accent.beam}`} />
      </div>

      <div className="absolute bottom-4 left-4 border border-white/15 bg-black/70 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.22em] text-bone">
        {product.category}
      </div>
      <div className="absolute right-4 top-4 text-right text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/45">
        KG / {product.series.split(" ")[0]}
      </div>
    </div>
  );
}
