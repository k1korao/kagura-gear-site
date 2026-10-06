import { notFound } from "next/navigation";
import { GlassCollectionsHub } from "@/components/GlassCollectionsHub";
import { ShrineExperience, type ProductCategory } from "@/components/ShrineExperience";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";
import { productCopy } from "@/lib/product-copy";

const categories = ["glass", "keycaps", "metal"] as const;
export const dynamicParams = false;
export function generateStaticParams() { return categories.map(category => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as ProductCategory)) return {};
  const locale = await getLocale();
  const copy = productCopy[locale];
  const image = category === "glass"
    ? { url: "/images/album-concept-wraith.webp", width: 1254, height: 1254, alt: { en: "KIKORA Void FM glass mousepad cover artwork concept", ja: "KIKORA ガラスマウスパッド「虚空ラジオ」のカバーデザインコンセプト" }[locale] }
    : category === "metal"
      ? { url: "/brand/kikora-symbol.png", width: 512, height: 512, alt: "KIKORA" }
      : undefined;
  return pageMetadata({ title: copy.categories[category as ProductCategory], description: copy.metadata[category as ProductCategory], path: `/explore/${category}`, image });
}
export default async function ExplorePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as ProductCategory)) notFound();
  if (category === "glass") {
    return <main className="kagura-collection-page"><GlassCollectionsHub /></main>;
  }
  return <main className="kagura-collection-page"><ShrineExperience key={category} category={category as "keycaps" | "metal"} /></main>;
}
