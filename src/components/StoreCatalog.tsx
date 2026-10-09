"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products, type Product } from "@/lib/products";
import { collectionDetails, type CollectionKey } from "@/lib/collections";

export function SurfaceCard({ product }: { product: Product }) {
  return <article className={`store-product-card store-product-${product.accent}`}>
    <Link href={`/products/${product.slug}`} className="store-product-visual" aria-label={`View ${product.name}`}><span className="store-pill">COLLECTION PREVIEW</span><span className="store-product-mat"><span className="store-product-mat-border" /><Image src="/images/kagura-logo-mark.png" alt="" width={90} height={90} className="store-product-mark" /><span className="store-product-mat-line" /></span><span className="store-product-dimensions">{product.size}</span></Link>
    <div className="store-product-info"><span className="store-eyebrow">{product.series}{product.slug === "shrine-desk-mat" ? " · PREMIUM" : ""}</span><div><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><span>{product.price}</span></div><p>{product.tagline}</p><Link className="store-text-link" href={`/products/${product.slug}`}>Explore design <span aria-hidden="true">↗</span></Link></div>
  </article>;
}

export function StoreCatalog({ collection, initialSearch = "" }: { collection?: CollectionKey; initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch);
  const details = collection ? collectionDetails[collection] : undefined;
  const matching = (collection && collection !== "deskmats" ? [] : products).filter((p) => `${p.name} ${p.category} ${p.series} ${p.description}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <main className="storefront store-catalog">
    <div className="store-catalog-heading"><span className="store-eyebrow">THE KIKORA COLLECTION</span><h1>{details?.title ?? "Find your next favorite."}</h1><p>{details?.intro ?? "Keycaps, deskmats, and the details that make a desk your own."}</p></div>
    <div className="store-catalog-tools"><nav aria-label="Collection filters">{[{ href: "/shop", title: "All collections", active: !collection }, ...Object.entries(collectionDetails).map(([key, value]) => ({ href: `/collections/${key}`, title: key === "deskmats" ? "Deskmats" : value.title, active: collection === key }))].map((item) => <Link key={item.href} href={item.href} className={item.active ? "is-active" : ""} aria-current={item.active ? "page" : undefined}>{item.title}</Link>)}</nav><label className="store-catalog-search"><span className="sr-only">Search collection</span><input type="search" placeholder="Find a design…" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
    {collection === "keycaps" || collection === "accessories" ? <section className="store-coming-soon">{collection === "keycaps" ? <div className="store-coming-soon-image"><Image src="/images/kagura-studio-concept.webp" alt="KIKORA keycap design concept" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" /><span className="store-pill">DESIGN CONCEPT</span></div> : null}<div><span className="store-eyebrow">IN DEVELOPMENT</span><h2>{details?.empty}</h2><p>{details?.body}</p><Link className="store-button" href="/#newsletter">Get launch updates <span aria-hidden="true">↗</span></Link><Link className="store-text-link" href="/shrine">Discover our premium subbrand <span aria-hidden="true">→</span></Link></div></section> : <><p className="store-catalog-count" role="status">{matching.length} design{matching.length === 1 ? "" : "s"} · Collection preview</p>{matching.length ? <div className="store-product-grid">{matching.map((product) => <SurfaceCard key={product.slug} product={product} />)}</div> : <div className="store-empty"><h2>No designs found.</h2><p>Try a different search or browse the full collection.</p><button className="store-button" onClick={() => setSearch("")}>Clear search</button></div>}</>}
    <aside className="store-catalog-premium"><span className="store-eyebrow">LOOKING FOR SOMETHING MORE CONSIDERED?</span><h2>Step into KIKORA Shrine.</h2><p>Our premium world of Japanese-inspired keycaps and deskmats.</p><Link className="store-text-link" href="/shrine">Discover the subbrand <span aria-hidden="true">↗</span></Link></aside>
  </main>;
}
