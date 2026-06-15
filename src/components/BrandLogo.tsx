import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${compact ? "gap-3" : "gap-4"} ${className}`}
      aria-label="Kagura Gear home"
    >
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden border border-sakura/30 bg-black/45 shadow-glow ${
          compact ? "h-11 w-11" : "h-14 w-14"
        }`}
      >
        <Image
          src={compact ? "/images/kagura-logo-icon.png" : "/images/kagura-logo-mark.png"}
          alt=""
          fill
          sizes={compact ? "44px" : "56px"}
          className="object-contain p-1 transition duration-300 drop-shadow-[0_0_12px_rgba(246,165,189,0.28)] group-hover:scale-105"
        />
      </span>
      <span className="flex flex-col leading-none">
        <Image
          src="/images/kagura-logo-full.png"
          alt="Kagura Gear"
          width={compact ? 148 : 220}
          height={compact ? 54 : 80}
          priority={compact}
          className={`${compact ? "h-7 w-auto" : "h-10 w-auto"} object-contain object-left`}
        />
        <span className="mt-1 text-[0.6rem] font-black uppercase tracking-[0.28em] text-sakura/85">
          Precision Meets Ritual
        </span>
      </span>
    </Link>
  );
}
