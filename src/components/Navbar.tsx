"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CollectionSound } from "./CollectionSound";
import { KaguraWordmark } from "./KaguraWordmark";
import styles from "./Navbar.module.css";

type Category = "glass" | "keycaps" | "metal";
type Collection = "core" | "artist" | "covers";
const glassCollections: { id: Collection; label: string; note: string }[] = [
  { id: "core", label: "Core", note: "The essentials" },
  { id: "artist", label: "Artist", note: "A different perspective" },
  { id: "covers", label: "Covers", note: "Album-inspired editions" },
];

export function Navbar() {
  const pathname = usePathname();
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
        <Link href="/" className={styles.brand} aria-label="Kagura home" onClick={closeMenus}><KaguraWordmark /></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div className={styles.glassNav} onMouseEnter={() => { if (!menuOpen) setGlassOpen(true); }} onMouseLeave={() => { if (!menuOpen) setGlassOpen(false); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setGlassOpen(false); }}>
            <div className={styles.glassLink}>
              <Link href="/explore/glass" aria-current={pathname === "/explore/glass" ? "page" : undefined} onClick={() => followCategory("glass")}>Glass mousepads</Link>
              <button ref={glassTrigger} type="button" className={styles.submenuToggle} aria-label="Glass mousepad collections" aria-expanded={glassOpen && !menuOpen} aria-controls="glass-navigation" onClick={() => { setMenuOpen(false); setGlassOpen((value) => !value); }}><svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="m2 4 4 4 4-4" /></svg></button>
            </div>
            {glassOpen && !menuOpen ? <div id="glass-navigation" className={styles.glassDropdown}><span className={styles.dropdownLabel}>GLASS / THREE DIRECTIONS</span>{glassCollections.map((collection) => <Link key={collection.id} href={`/explore/glass#${collection.id}`} onClick={() => followCategory("glass", collection.id)}><span>{collection.label}<small>{collection.note}</small></span><span aria-hidden="true">↗</span></Link>)}</div> : null}
          </div>
          <Link href="/explore/keycaps" aria-current={pathname === "/explore/keycaps" ? "page" : undefined} onClick={() => followCategory("keycaps")}>Keycaps</Link>
          <Link href="/explore/metal" aria-current={pathname === "/explore/metal" ? "page" : undefined} onClick={() => followCategory("metal")}>Metal customs</Link>
        </nav>
        <div className={styles.tools}>
          {premium ? <CollectionSound /> : null}
          <button ref={menuTrigger} type="button" className={`${styles.menuToggle} ${menuOpen ? styles.menuActive : ""}`} aria-expanded={menuOpen} aria-controls="site-navigation-menu" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => { setMenuOpen((value) => !value); setGlassOpen(false); }}><span>{menuOpen ? "Close" : "Menu"}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">{menuOpen ? <path d="m4 4 12 12M4 16 16 4" /> : <path d="M2 6h16M2 13h16" />}</svg></button>
        </div>
      </div>
      {menuOpen ? <nav id="site-navigation-menu" className={styles.menuPanel} aria-label="Expanded navigation">
        <div className={styles.menuProducts}>
          <span className={styles.menuLabel}>EXPLORE THE OBJECTS</span>
          <div className={styles.mobileGlassRow}><Link href="/explore/glass" onClick={() => followCategory("glass")}>Glass mousepads</Link><button type="button" aria-label={glassOpen ? "Hide glass collections" : "Show glass collections"} aria-expanded={glassOpen} aria-controls="menu-glass-collections" onClick={() => setGlassOpen((value) => !value)}>{glassOpen ? "−" : "+"}</button></div>
          {glassOpen ? <div id="menu-glass-collections" className={styles.menuSubnav}>{glassCollections.map((collection) => <Link key={collection.id} href={`/explore/glass#${collection.id}`} onClick={() => followCategory("glass", collection.id)}>{collection.label}<span aria-hidden="true">↗</span></Link>)}</div> : null}
          <Link className={styles.menuCategory} href="/explore/keycaps" onClick={() => followCategory("keycaps")}>Keycaps<span aria-hidden="true">↗</span></Link>
          <Link className={styles.menuCategory} href="/explore/metal" onClick={() => followCategory("metal")}>Metal customs<span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.menuMore}><span className={styles.menuLabel}>KAGURA</span><Link href="/" onClick={closeMenus}>The story</Link><Link href="/about" onClick={closeMenus}>About us</Link><Link href="/contact" onClick={closeMenus}>Contact</Link><Link href="/faq" onClick={closeMenus}>FAQ</Link><Link href="/#newsletter" onClick={closeMenus}>Release updates <span aria-hidden="true">↗</span></Link></div>
      </nav> : null}
    </header>
  );
}
