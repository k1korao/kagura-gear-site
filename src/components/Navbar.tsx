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

type Category = "glass" | "keycaps";

export function Navbar() {
  const pathname = usePathname();
  const copy = navigationCopy[useLocale()];
  const premium = pathname === "/" || pathname.startsWith("/shrine") || pathname.startsWith("/explore");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<Category | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const categoryTriggers = useRef<Partial<Record<Category, HTMLButtonElement | null>>>({});
  const categories = [
    { id: "glass", label: copy.glass, collectionsLabel: copy.glassCollections, directions: copy.glassDirections, collections: copy.collections, hide: copy.hideGlass, show: copy.showGlass },
    { id: "keycaps", label: copy.keycaps, collectionsLabel: copy.keycapsCollections, directions: copy.keycapsDirections, collections: copy.keycapCollections, hide: copy.hideKeycaps, show: copy.showKeycaps },
  ] as const;

  useEffect(() => {
    if (!menuOpen && !openCategory) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setOpenCategory(null);
      }
    }
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [menuOpen, openCategory]);

  function closeMenus() { setMenuOpen(false); setOpenCategory(null); }
  function followCategory(category: Category, collection?: string) {
    closeMenus();
    if (category === "glass") {
      window.dispatchEvent(new CustomEvent("kagura:category", { detail: { category, ...(collection ? { collection } : {}) } }));
    }
  }

  return (
    <header ref={headerRef} className={styles.header} onKeyDown={(event) => {
      if (event.key !== "Escape") return;
      if (menuOpen) { event.preventDefault(); closeMenus(); menuTrigger.current?.focus(); }
      else if (openCategory) { event.preventDefault(); setOpenCategory(null); categoryTriggers.current[openCategory]?.focus(); }
    }}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={copy.home} onClick={closeMenus}><KaguraIdentity compact /></Link>
        <nav className={styles.desktopNav} aria-label={copy.primary}>
          {categories.map(category => {
            const expanded = openCategory === category.id && !menuOpen;
            return <div key={category.id} className={styles.glassNav} onMouseEnter={() => { if (!menuOpen) setOpenCategory(category.id); }} onMouseLeave={() => { if (!menuOpen) setOpenCategory(null); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenCategory(null); }}>
              <div className={styles.glassLink}>
                <Link href={`/explore/${category.id}`} aria-current={pathname === `/explore/${category.id}` ? "page" : undefined} onClick={() => followCategory(category.id)}>{category.label}</Link>
                <button ref={element => { categoryTriggers.current[category.id] = element; }} type="button" className={styles.submenuToggle} aria-label={category.collectionsLabel} aria-expanded={expanded} aria-controls={`${category.id}-navigation`} onClick={() => { setMenuOpen(false); setOpenCategory(value => value === category.id ? null : category.id); }}><svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="m2 4 4 4 4-4" /></svg></button>
              </div>
              {expanded ? <div id={`${category.id}-navigation`} className={styles.glassDropdown}><span className={styles.dropdownLabel}>{category.directions}</span>{category.collections.map(collection => <Link key={collection.id} href={`/explore/${category.id}/${collection.id}`} aria-current={pathname === `/explore/${category.id}/${collection.id}` ? "page" : undefined} onClick={() => followCategory(category.id, collection.id)}><span>{collection.label}<small>{collection.note}</small></span><span aria-hidden="true">↗</span></Link>)}</div> : null}
            </div>;
          })}
        </nav>
        <div className={styles.tools}>
          {premium ? <CollectionSound /> : null}
          <LanguageSwitcher />
          <button ref={menuTrigger} type="button" className={`${styles.menuToggle} ${menuOpen ? styles.menuActive : ""}`} aria-expanded={menuOpen} aria-controls="site-navigation-menu" aria-label={menuOpen ? copy.closeMenu : copy.openMenu} onClick={() => { setMenuOpen(value => !value); setOpenCategory(null); }}><span>{menuOpen ? copy.close : copy.menu}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">{menuOpen ? <path d="m4 4 12 12M4 16 16 4" /> : <path d="M2 6h16M2 13h16" />}</svg></button>
        </div>
      </div>
      {menuOpen ? <nav id="site-navigation-menu" className={styles.menuPanel} aria-label={copy.expanded}>
        <div className={styles.menuProducts}>
          <span className={styles.menuLabel}>{copy.exploreObjects}</span>
          {categories.map(category => {
            const expanded = openCategory === category.id;
            return <div key={category.id}>
              <div className={styles.mobileGlassRow}><Link href={`/explore/${category.id}`} onClick={() => followCategory(category.id)}>{category.label}</Link><button type="button" aria-label={expanded ? category.hide : category.show} aria-expanded={expanded} aria-controls={`menu-${category.id}-collections`} onClick={() => setOpenCategory(value => value === category.id ? null : category.id)}>{expanded ? "−" : "+"}</button></div>
              {expanded ? <div id={`menu-${category.id}-collections`} className={styles.menuSubnav}>{category.collections.map(collection => <Link key={collection.id} href={`/explore/${category.id}/${collection.id}`} aria-current={pathname === `/explore/${category.id}/${collection.id}` ? "page" : undefined} onClick={() => followCategory(category.id, collection.id)}>{collection.label}<span aria-hidden="true">↗</span></Link>)}</div> : null}
            </div>;
          })}
        </div>
        <div className={styles.menuMore}><span className={styles.menuLabel}>KIKORA</span><Link href="/" onClick={closeMenus}>{copy.story}</Link><Link href="/about" onClick={closeMenus}>{copy.about}</Link><Link href="/contact" onClick={closeMenus}>{copy.contact}</Link><Link href="/faq" onClick={closeMenus}>{copy.faq}</Link><Link href="/#newsletter" onClick={closeMenus}>{copy.updates} <span aria-hidden="true">↗</span></Link></div>
      </nav> : null}
    </header>
  );
}
