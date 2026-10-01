import { StoreCatalog } from "@/components/StoreCatalog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({ title: "Shop the Collection", description: "Explore Kagura Gear keycaps, deskmats, mousepads and accessories.", path: "/shop" });
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <StoreCatalog initialSearch={typeof q === "string" ? q : ""} />;
}
