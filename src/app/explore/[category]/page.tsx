import { notFound } from "next/navigation";
import { GlassCollectionsHub } from "@/components/GlassCollectionsHub";
import { KeycapsCollectionsHub } from "@/components/KeycapsCollectionsHub";
import { keycapsCollectionCopy } from "@/lib/keycaps-collection-copy";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";
import { productCopy } from "@/lib/product-copy";

const categories = ["glass", "metal"] as const;
export const dynamicParams = false;
export function generateStaticParams() { return categories.map(category => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (category !== "glass" && category !== "metal") return {};
  const locale = await getLocale();
  if (category === "metal") {
    const keycaps = keycapsCollectionCopy[locale];
    return pageMetadata({ title: keycaps.hubTitle, description: keycaps.hubDescription, path: "/explore/keycaps", image: { url: "/brand/kikora-symbol.png", width: 512, height: 512, alt: "KIKORA / Keycaps" } });
  }
  const copy = productCopy[locale];
  return pageMetadata({ title: copy.categories[category], description: copy.metadata[category], path: `/explore/${category}` });
}
export default async function ExplorePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (category !== "glass" && category !== "metal") notFound();
  if (category === "glass") {
    return <main className="kagura-collection-page"><GlassCollectionsHub /></main>;
  }
  return <main className="kagura-collection-page"><KeycapsCollectionsHub /></main>;
}
