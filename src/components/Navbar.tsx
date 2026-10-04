"use client";

import Link from "next/link";
import { CollectionSound } from "./CollectionSound";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const storeLinks = [{ href: "/collections/keycaps", label: "Keycaps" }, { href: "/collections/deskmats", label: "Deskmats" }, { href: "/collections/accessories", label: "Accessories" }, { href: "/shrine", label: "New collection", premium: true }];
const shrineLinks = [{ href: "/shrine#collections", label: "Glass mousepads" }, { href: "/shrine#keycaps", label: "Keycaps" }, { href: "/shrine#craft", label: "The idea" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const pathname = usePathname();
  const premium = pathname === "/" || pathname.startsWith("/shrine");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);
  function closeSearch() { setSearchOpen(false); searchTrigger.current?.focus(); }
  function closeMenus() { setMenuOpen(false); setSearchOpen(false); }
  function followCollection(href: string) { closeMenus(); if (href.endsWith("#collections")) window.dispatchEvent(new Event("kagura:show-glass")); }
  return <header className={premium ? "shrine-header" : "store-header"}>
    <div className={premium ? "shrine-announcement" : "store-announcement"}><span>{premium ? "GLASS MOUSEPADS + KEYCAPS / A NEW COLLECTION" : "A LITTLE MORE YOU. A LOT MORE CHARACTER."}</span><Link href={premium ? "/shop" : "/"} onClick={closeMenus}>{premium ? "Browse the store" : "Discover the new collection"} <span aria-hidden="true">↗</span></Link></div>
    <div className="store-nav-inner">
      {premium ? <Link className="store-wordmark" href="/shrine" aria-label="Kagura collection home" onClick={closeMenus}>kagura<span className="store-wordmark-dot">.</span><small>GEAR</small></Link> : <Link className="store-wordmark" href="/" aria-label="Kagura Gear home" onClick={closeMenus}>kagura<span className="store-wordmark-dot">.</span><small>GEAR</small></Link>}
      <nav className="store-desktop-nav" aria-label="Primary navigation">{(premium ? shrineLinks : storeLinks).map((item) => <Link key={item.href} href={item.href} className={`${pathname === item.href ? "is-current" : ""} ${"premium" in item && item.premium ? "nav-premium" : ""}`} aria-current={pathname === item.href ? "page" : undefined} onClick={() => followCollection(item.href)}>{item.label}{"premium" in item && item.premium ? <span aria-hidden="true"> ✦</span> : null}</Link>)}</nav>
      <div className="store-nav-tools">{premium && <CollectionSound />}<Link href="/faq" className="store-nav-help" onClick={closeMenus}>Help</Link><button type="button" ref={searchTrigger} onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }} aria-label={searchOpen ? "Close search" : "Search collections"} aria-expanded={searchOpen} aria-controls="store-header-search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg></button><button type="button" className="store-menu-toggle" onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="store-mobile-navigation">{menuOpen ? "Close" : "Menu"}</button></div>
    </div>
    {menuOpen ? <nav id="store-mobile-navigation" className="store-mobile-nav" aria-label="Mobile navigation">{(premium ? shrineLinks : storeLinks).map((item) => <Link key={item.href} href={item.href} onClick={() => followCollection(item.href)}>{item.label}<span aria-hidden="true">↗</span></Link>)}<Link href="/shop" onClick={closeMenus}>All collections <span aria-hidden="true">↗</span></Link><Link href="/contact" onClick={closeMenus}>Contact us</Link></nav> : null}
    {searchOpen ? <form id="store-header-search" className="store-header-search" action="/shop" onKeyDown={(event) => { if (event.key === "Escape") closeSearch(); }}><label htmlFor="store-global-search">What are you looking for?</label><div><input ref={searchInput} id="store-global-search" name="q" type="search" placeholder="Search the collection…" /><button type="submit">Search <span aria-hidden="true">→</span></button><button type="button" onClick={closeSearch} aria-label="Close search">×</button></div></form> : null}
  </header>;
}
