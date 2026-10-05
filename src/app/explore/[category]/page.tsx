import { notFound } from "next/navigation";
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
  return pageMetadata({ title: `${copy.categories[category as ProductCategory]} — KIKORA`, description: copy.metadata[category as ProductCategory], path: `/explore/${category}` });
}
export default async function ExplorePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.includes(category as ProductCategory)) notFound();
  return <main className="kagura-collection-page"><ShrineExperience key={category} category={category as ProductCategory} /></main>;
}
