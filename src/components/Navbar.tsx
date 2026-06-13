import Link from "next/link";

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/86 backdrop-blur-xl">
      <div className="border-b border-white/10 bg-bone px-4 py-2 text-center text-[0.7rem] font-black uppercase tracking-[0.2em] text-ink">
        Kagura Gear launch site live. Shopify checkout slots ready.
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Kagura Gear home">
          <span className="grid h-10 w-10 place-items-center border border-sakura/40 bg-shrine/20 text-sm font-black text-bone shadow-glow">
            KG
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-black uppercase tracking-[0.26em] text-bone">
              Kagura
            </span>
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.31em] text-sakura">
              Gear
            </span>
          </span>
        </Link>

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
          className="hidden border border-sakura/40 bg-sakura px-4 py-2 text-sm font-black uppercase text-ink transition hover:border-bone hover:bg-bone lg:inline-flex"
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
