"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, supportMailto } from "@/lib/site";

export function Footer() {
  const premium = usePathname().startsWith("/shrine");
  return <footer className={`store-footer ${premium ? "store-footer-premium" : ""}`}>
    <div className="store-footer-grid"><div><Link className="store-wordmark" href="/" aria-label="Kagura Gear home">kagura<span className="store-wordmark-dot">.</span><small>GEAR</small></Link><p>Make your desk your own.<br />Keycaps, deskmats, and a little more character.</p><a href={supportMailto()}>{siteConfig.supportEmail}</a></div><div><h2>EXPLORE</h2><Link href="/collections/keycaps">Keycaps</Link><Link href="/collections/deskmats">Deskmats</Link><Link href="/collections/accessories">Accessories</Link><Link href="/shrine">Kagura Shrine ↗</Link></div><div><h2>HERE TO HELP</h2><Link href="/about">Our story</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact us</Link><Link href="/shipping-policy">Shipping</Link><Link href="/return-policy">Returns</Link></div><div className="store-footer-premium-note"><span className="store-eyebrow">THE PREMIUM WORLD</span><h2>Kagura Shrine.</h2><p>Japanese artistry.<br />A more considered setup.</p><Link className="store-text-link" href="/shrine">Enter the Shrine <span aria-hidden="true">↗</span></Link></div></div>
    <div className="store-footer-bottom"><span>© {new Date().getFullYear()} Kagura Gear. All rights reserved.</span><div><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-of-service">Terms of service</Link></div><span>PRECISION MEETS PERSONALITY.</span></div>
  </footer>;
}
