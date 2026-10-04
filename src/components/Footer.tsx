"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, supportMailto } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  const premium = pathname === "/" || pathname.startsWith("/shrine");
  return <footer className={`store-footer ${premium ? "store-footer-premium" : ""}`}>
    <div className="store-footer-grid"><div><Link className="store-wordmark" href="/" aria-label="Kagura Gear home">kagura<span className="store-wordmark-dot">.</span><small>GEAR</small></Link><p>Make your desk your own.<br />{premium ? "Glass mousepads, keycaps, and a little character." : "Keycaps, deskmats, and a little more character."}</p><a href={supportMailto()}>{siteConfig.supportEmail}</a></div><div><h2>EXPLORE</h2><Link href={premium ? "/shrine#keycaps" : "/collections/keycaps"}>Keycaps</Link><Link href={premium ? "/shrine#collections" : "/collections/deskmats"}>{premium ? "Glass mousepads" : "Deskmats"}</Link>{!premium && <Link href="/collections/accessories">Accessories</Link>}<Link href="/shrine">New collection ↗</Link></div><div><h2>HERE TO HELP</h2><Link href="/about">Our story</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact us</Link><Link href="/shipping-policy">Shipping</Link><Link href="/return-policy">Returns</Link></div><div className="store-footer-premium-note"><span className="store-eyebrow">OBJECTS ON REPEAT</span><h2>Play your own way.</h2><p>Music. Gaming. Your desk.<br />A collection with character.</p><Link className="store-text-link" href="/shrine">Explore the collection <span aria-hidden="true">↗</span></Link></div></div>
    <div className="store-footer-bottom"><span>© {new Date().getFullYear()} Kagura Gear. All rights reserved.</span><div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-of-service">Terms of service</Link></div><span>PRECISION MEETS PERSONALITY.</span></div>
  </footer>;
}
