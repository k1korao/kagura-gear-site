"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { navigationCopy } from "@/lib/navigation-copy";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CollectionSound } from "./CollectionSound";
import { KaguraIdentity } from "./KaguraIdentity";
import styles from "./Navbar.module.css";

type Category = "glass" | "metal";
type Collection = "core" | "artist" | "covers";


export function Navbar() {
  const pathname = usePathname();
  const copy = navigationCopy[useLocale()];
  const glassCollections = copy.collections;
  const premium = pathname === "/" || pathname.startsWith("/shrine") || pathname.startsWith("/explore");
  const [menuOpen, setMenuOpen] = useState(false);
  const [glassOpen, setGlassOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const glassTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen && !glassOpen) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setGlassOpen(false);
      }
    }
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [menuOpen, glassOpen]);

  function closeMenus() { setMenuOpen(false); setGlassOpen(false); }
  function followCategory(category: Category, collection?: Collection) {
    closeMenus();
    window.dispatchEvent(new CustomEvent("kagura:category", { detail: { category, ...(collection ? { collection } : {}) } }));
  }

  return (
    <header ref={headerRef} className={styles.header} onKeyDown={(event) => {
      if (event.key !== "Escape") return;
      if (menuOpen) { event.preventDefault(); closeMenus(); menuTrigger.current?.focus(); }
      else if (glassOpen) { event.preventDefault(); setGlassOpen(false); glassTrigger.current?.focus(); }
    }}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={copy.home} onClick={closeMenus}><KaguraIdentity compact /></Link>
        <nav className={styles.desktopNav} aria-label={copy.primary}>
          <div className={styles.glassNav} onMouseEnter={() => { if (!menuOpen) setGlassOpen(true); }} onMouseLeave={() => { if (!menuOpen) setGlassOpen(false); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setGlassOpen(false); }}>
            <div className={styles.glassLink}>
              <Link href="/explore/glass" aria-current={pathname === "/explore/glass" ? "page" : undefined} onClick={() => followCategory("glass")}>{copy.glass}</Link>
              <button ref={glassTrigger} type="button" className={styles.submenuToggle} aria-label={copy.glassCollections} aria-expanded={glassOpen && !menuOpen} aria-controls="glass-navigation" onClick={() => { setMenuOpen(false); setGlassOpen((value) => !value); }}><svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="m2 4 4 4 4-4" /></svg></button>
            </div>
            {glassOpen && !menuOpen ? <div id="glass-navigation" className={styles.glassDropdown}><span className={styles.dropdownLabel}>{copy.glassDirections}</span>{glassCollections.map((collection) => <Link key={collection.id} href={`/explore/glass/${collection.id}`} onClick={() => followCategory("glass", collection.id)}><span>{collection.label}<small>{collection.note}</small></span><span aria-hidden="true">↗</span></Link>)}</div> : null}
          </div>
          <Link href="/explore/metal" aria-current={pathname === "/explore/metal" ? "page" : undefined} onClick={() => followCategory("metal")}>{copy.metal}</Link>
        </nav>
        <div className={styles.tools}>
          {premium ? <CollectionSound /> : null}
          <LanguageSwitcher />
          <button ref={menuTrigger} type="button" className={`${styles.menuToggle} ${menuOpen ? styles.menuActive : ""}`} aria-expanded={menuOpen} aria-controls="site-navigation-menu" aria-label={menuOpen ? copy.closeMenu : copy.openMenu} onClick={() => { setMenuOpen((value) => !value); setGlassOpen(false); }}><span>{menuOpen ? copy.close : copy.menu}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">{menuOpen ? <path d="m4 4 12 12M4 16 16 4" /> : <path d="M2 6h16M2 13h16" />}</svg></button>
        </div>
      </div>
      {menuOpen ? <nav id="site-navigation-menu" className={styles.menuPanel} aria-label={copy.expanded}>
        <div className={styles.menuProducts}>
          <span className={styles.menuLabel}>{copy.exploreObjects}</span>
          <div className={styles.mobileGlassRow}><Link href="/explore/glass" onClick={() => followCategory("glass")}>{copy.glass}</Link><button type="button" aria-label={glassOpen ? copy.hideGlass : copy.showGlass} aria-expanded={glassOpen} aria-controls="menu-glass-collections" onClick={() => setGlassOpen((value) => !value)}>{glassOpen ? "−" : "+"}</button></div>
          {glassOpen ? <div id="menu-glass-collections" className={styles.menuSubnav}>{glassCollections.map((collection) => <Link key={collection.id} href={`/explore/glass/${collection.id}`} onClick={() => followCategory("glass", collection.id)}>{collection.label}<span aria-hidden="true">↗</span></Link>)}</div> : null}
          <Link className={styles.menuCategory} href="/explore/metal" onClick={() => followCategory("metal")}>{copy.metal}<span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.menuMore}><span className={styles.menuLabel}>KIKORA</span><Link href="/" onClick={closeMenus}>{copy.story}</Link><Link href="/about" onClick={closeMenus}>{copy.about}</Link><Link href="/contact" onClick={closeMenus}>{copy.contact}</Link><Link href="/faq" onClick={closeMenus}>{copy.faq}</Link><Link href="/#newsletter" onClick={closeMenus}>{copy.updates} <span aria-hidden="true">↗</span></Link></div>
      </nav> : null}
    </header>
  );
}
