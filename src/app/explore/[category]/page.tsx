import { notFound } from "next/navigation";
import { ShrineExperience, type ProductCategory } from "@/components/ShrineExperience";
import { pageMetadata } from "@/lib/metadata";

const labels = { glass: "Glass Mousepads", keycaps: "Keycaps", metal: "Metal Customs" };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(labels).map(category => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!(category in labels)) return {};
  return pageMetadata({ title: `${labels[category as ProductCategory]} — KAGURA`, description: `Explore KAGURA ${labels[category as ProductCategory].toLowerCase()}. A collection of independent design studies for your desk.`, path: `/explore/${category}` });
}
export default async function ExplorePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!(category in labels)) notFound();
  return <main className="kagura-collection-page"><ShrineExperience key={category} category={category as ProductCategory} /></main>;
}
