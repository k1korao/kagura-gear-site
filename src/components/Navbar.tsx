"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const storeLinks = [{ href: "/collections/keycaps", label: "Keycaps" }, { href: "/collections/deskmats", label: "Deskmats" }, { href: "/collections/accessories", label: "Accessories" }, { href: "/shrine", label: "Kagura Shrine", premium: true }];
const shrineLinks = [{ href: "/shrine", label: "Shrine" }, { href: "/shrine#collections", label: "Collections" }, { href: "/shrine#craft", label: "Our world" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const pathname = usePathname();
  const premium = pathname.startsWith("/shrine");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);
  function closeSearch() { setSearchOpen(false); searchTrigger.current?.focus(); }
  function closeMenus() { setMenuOpen(false); setSearchOpen(false); }
  return <header className={premium ? "shrine-header" : "store-header"}>
    <div className={premium ? "shrine-ticker shrine-announcement" : "store-announcement"}><span>{premium ? "KAGURA SHRINE · THE PREMIUM WORLD OF KAGURA GEAR" : "A LITTLE MORE YOU. A LOT MORE CHARACTER."}</span><Link href={premium ? "/" : "/shrine"} onClick={closeMenus}>{premium ? "Back to Kagura Gear" : "Discover Kagura Shrine"} <span aria-hidden="true">↗</span></Link></div>
    <div className="store-nav-inner">
      {premium ? <div className="shrine-nav-brand"><BrandLogo compact /><span>SHRINE / PREMIUM COLLECTION</span></div> : <Link className="store-wordmark" href="/" aria-label="Kagura Gear home" onClick={closeMenus}>kagura<span className="store-wordmark-dot">.</span><small>GEAR</small></Link>}
      <nav className="store-desktop-nav" aria-label="Primary navigation">{(premium ? shrineLinks : storeLinks).map((item) => <Link key={item.href} href={item.href} className={`${pathname === item.href ? "is-current" : ""} ${"premium" in item && item.premium ? "nav-premium" : ""}`} aria-current={pathname === item.href ? "page" : undefined} onClick={closeMenus}>{item.label}{"premium" in item && item.premium ? <span aria-hidden="true"> ✦</span> : null}</Link>)}</nav>
      <div className="store-nav-tools"><Link href="/faq" className="store-nav-help" onClick={closeMenus}>Help</Link><button type="button" ref={searchTrigger} onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }} aria-label={searchOpen ? "Close search" : "Search collections"} aria-expanded={searchOpen} aria-controls="store-header-search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg></button><button type="button" className="store-menu-toggle" onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="store-mobile-navigation">{menuOpen ? "Close" : "Menu"}</button></div>
    </div>
    {menuOpen ? <nav id="store-mobile-navigation" className="store-mobile-nav" aria-label="Mobile navigation">{(premium ? shrineLinks : storeLinks).map((item) => <Link key={item.href} href={item.href} onClick={closeMenus}>{item.label}<span aria-hidden="true">↗</span></Link>)}<Link href="/shop" onClick={closeMenus}>All collections <span aria-hidden="true">↗</span></Link><Link href="/contact" onClick={closeMenus}>Contact us</Link></nav> : null}
    {searchOpen ? <form id="store-header-search" className="store-header-search" action="/shop" onKeyDown={(event) => { if (event.key === "Escape") closeSearch(); }}><label htmlFor="store-global-search">What are you looking for?</label><div><input ref={searchInput} id="store-global-search" name="q" type="search" placeholder="Search the collection…" /><button type="submit">Search <span aria-hidden="true">→</span></button><button type="button" onClick={closeSearch} aria-label="Close search">×</button></div></form> : null}
  </header>;
}
