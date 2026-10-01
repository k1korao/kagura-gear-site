import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SurfaceCard } from "@/components/StoreCatalog";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Keycaps, Deskmats & a Desk That Feels Like You", description: "Explore Kagura Gear keycaps, deskmats and accessories, and discover Kagura Shrine, our premium Japanese-inspired collection.", path: "/" });

export default function Home() {
  return (
    <main className="storefront">
      <section className="store-hero">
        <div className="store-hero-copy">
          <span className="store-eyebrow"><span className="store-dot" /> A NEW PERSPECTIVE ON YOUR DESK</span>
          <h1>Your desk.<br />Your kind of<br /><em>different.</em></h1>
          <p>Little details. Big personality. Keycaps, deskmats, and accessories for a setup that feels like you.</p>
          <div className="store-actions"><Link className="store-button" href="/collections/keycaps">Explore keycaps <span aria-hidden="true">↗</span></Link><Link className="store-text-link" href="/collections/deskmats">Discover deskmats <span aria-hidden="true">→</span></Link></div>
          <div className="store-hero-note"><span>01 / THE EVERYDAY COLLECTION</span><span>Made for your space.</span></div>
        </div>
        <HeroCarousel />
      </section>
      <section className="store-category-strip" aria-label="Shop by category">
        <Link href="/collections/keycaps"><span className="store-category-number">01</span><span>Keycaps<small>A fresh point of view.</small></span><span aria-hidden="true">↗</span></Link>
        <Link href="/collections/deskmats"><span className="store-category-number">02</span><span>Deskmats<small>Set the scene.</small></span><span aria-hidden="true">↗</span></Link>
        <Link href="/collections/accessories"><span className="store-category-number">03</span><span>Accessories<small>Finish your setup.</small></span><span aria-hidden="true">↗</span></Link>
        <Link href="/shrine" className="store-category-premium"><span className="store-category-number">✦</span><span>Kagura Shrine<small>Our premium world.</small></span><span aria-hidden="true">↗</span></Link>
      </section>
      <section className="store-section" id="collections">
        <div className="store-section-heading"><div><span className="store-eyebrow">FIND YOUR EVERYDAY FAVORITE</span><h2>A little more <em>you.</em></h2></div><Link className="store-text-link" href="/shop">Explore collections <span aria-hidden="true">→</span></Link></div>
        <div className="store-collection-grid">
          <Link href="/collections/keycaps" className="store-collection-card store-keycap-card"><div className="store-collection-photo"><Image src="/images/kagura-studio-concept.webp" alt="Rose and ivory keycap color concept" fill sizes="(max-width: 700px) 100vw, 60vw" className="object-cover" /><span className="store-pill">IN DEVELOPMENT</span></div><div className="store-collection-label"><div><span className="store-eyebrow">THE KEYCAP EDIT</span><h3>Small keys. Endless character.</h3><p>New colors and new stories, one key at a time.</p></div><span className="store-round-arrow" aria-hidden="true">↗</span></div></Link>
          <Link href="/collections/deskmats" className="store-collection-card store-deskmat-card"><div className="store-collection-photo store-mat-art" aria-hidden="true"><div className="store-art-mat"><span className="store-art-orbit" /><span className="store-art-orbit orbit-two" /><span className="store-art-word">kagura.</span></div><span className="store-pill">SURFACE COLLECTION</span></div><div className="store-collection-label"><div><span className="store-eyebrow">ROOM TO MAKE IT YOURS</span><h3>A better place to play.</h3><p>Your whole setup, brought together.</p></div><span className="store-round-arrow" aria-hidden="true">↗</span></div></Link>
        </div>
      </section>
      <section className="store-shrine-banner" aria-labelledby="premium-title"><Image src="/images/kagura-hero.png" alt="Dark Japanese-inspired Kagura Shrine desk setup" fill sizes="100vw" className="object-cover" /><div className="store-shrine-shade" /><div className="store-shrine-copy"><span className="store-eyebrow">A PREMIUM SUBBRAND BY KAGURA GEAR</span><h2 id="premium-title">Kagura <em>Shrine.</em></h2><p>Precision meets ritual. Premium keycaps and deskmats inspired by Japanese artistry, created for a more considered setup.</p><Link className="store-button store-button-pink" href="/shrine">Enter the Shrine <span aria-hidden="true">↗</span></Link></div><span className="store-shrine-seal" aria-hidden="true">神楽<br /><small>THE PREMIUM COLLECTION</small></span></section>
      <section className="store-section"><div className="store-section-heading"><div><span className="store-eyebrow">EXPLORE THE LINEUP</span><h2>Set the <em>surface.</em></h2></div><Link className="store-text-link" href="/collections/deskmats">View all surfaces <span aria-hidden="true">→</span></Link></div><p className="store-section-intro">A preview of our current surface designs. Find the feel and footprint for your desk.</p><div className="store-product-grid">{products.map((product) => <SurfaceCard key={product.slug} product={product} />)}</div></section>
      <section className="store-values"><div><span>01 / EXPRESSION</span><h3>Your space, your signature.</h3><p>Thoughtful color and considered details that make a setup feel personal.</p></div><div><span>02 / DISCOVERY</span><h3>Find your next favorite.</h3><p>From everyday desk essentials to the premium world of Kagura Shrine.</p></div><div><span>03 / CONNECTION</span><h3>A real conversation.</h3><p>Questions about the collection? Our support inbox is always open.</p><Link href="/contact">Get in touch <span aria-hidden="true">↗</span></Link></div></section>
      <section className="store-newsletter-section" id="newsletter"><div><span className="store-eyebrow">GOOD THINGS ARE ON THE WAY</span><h2>Keep your desk<br /><em>in the loop.</em></h2><p>New collections, design stories, and the next Kagura drop.</p></div><NewsletterForm light /></section>
    </main>
  );
}
