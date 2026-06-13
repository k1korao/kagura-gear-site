import Link from "next/link";
import { siteConfig, supportMailto } from "@/lib/site";

const policies = [
  { href: "/shipping-policy", label: "Shipping" },
  { href: "/return-policy", label: "Returns" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
];

const socials = ["Instagram", "TikTok", "X", "YouTube"];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-sakura/40 bg-shrine/20 text-sm font-black text-bone">
              KG
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.26em] text-bone">
                Kagura Gear
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-sakura">
                Precision Meets Ritual
              </span>
            </span>
          </div>
          <p className="max-w-md text-sm leading-6 text-steel">
            Japanese-inspired gaming surfaces for FPS players, desk setup builders,
            and mechanical keyboard enthusiasts.
          </p>
          <a
            href={supportMailto()}
            className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.16em] text-sakura transition hover:text-bone"
          >
            {siteConfig.supportEmail}
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-bone">
            Social
          </h2>
          <div className="grid gap-2">
            {socials.map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm font-semibold text-steel transition hover:text-sakura"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-bone">
            Policies
          </h2>
          <div className="grid gap-2">
            {policies.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-steel transition hover:text-sakura"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs uppercase tracking-[0.2em] text-steel">
        Copyright 2026 Kagura Gear. Checkout powered by Shopify.
      </div>
    </footer>
  );
}
