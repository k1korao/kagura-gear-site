import { notFound } from "next/navigation";
import { StoreCatalog } from "@/components/StoreCatalog";
import { collectionDetails, isCollection } from "@/lib/collections";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ category: string }> };
export function generateStaticParams() { return Object.keys(collectionDetails).map((category) => ({ category })); }
export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  if (!isCollection(category)) return { title: "Collection Not Found" };
  return pageMetadata({ title: collectionDetails[category].title, description: collectionDetails[category].intro, path: `/collections/${category}` });
}
export default async function CollectionPage({ params }: Props) {
  const { category } = await params;
  if (!isCollection(category)) notFound();
  return <StoreCatalog collection={category} />;
}
