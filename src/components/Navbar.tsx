import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop#series", label: "Series" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <div className="border-b border-white/10 bg-[linear-gradient(90deg,#f6a5bd,#f2c0a7,#d6b56d)] px-4 py-2 text-center text-[0.7rem] font-black uppercase tracking-[0.2em] text-ink">
        Launch collection preview / Shopify checkout slots ready / support@kaguragear.com
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo compact />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-semibold text-steel transition hover:bg-white/5 hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/shop"
          className="hidden border border-sakura/40 bg-sakura px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:border-bone hover:bg-bone lg:inline-flex"
        >
          Shop Drop
        </Link>

        <details className="group relative md:hidden">
          <summary className="list-none border border-white/15 px-3 py-2 text-sm font-bold text-bone marker:hidden">
            Menu
          </summary>
          <nav className="absolute right-0 mt-3 grid min-w-44 gap-1 border border-white/10 bg-coal p-2 shadow-card">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-steel transition hover:bg-white/5 hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
