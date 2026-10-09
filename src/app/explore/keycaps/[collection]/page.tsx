import { notFound } from "next/navigation";
import { KeycapsCollectionExperience } from "@/components/KeycapsCollectionExperience";
import { isKeycapsCollection, keycapsCollectionCopy, keycapsCollectionIds } from "@/lib/keycaps-collection-copy";
import { getLocale } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ collection: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return keycapsCollectionIds.map(collection => ({ collection })); }

export async function generateMetadata({ params }: PageProps) {
  const { collection } = await params;
  if (!isKeycapsCollection(collection)) return {};
  const copy = keycapsCollectionCopy[await getLocale()].collections[collection];
  return pageMetadata({
    title: copy.name,
    description: copy.description,
    path: `/explore/keycaps/${collection}`,
    image: { url: "/brand/kikora-symbol.png", width: 512, height: 512, alt: `KIKORA / ${copy.name}` },
  });
}

export default async function KeycapsCollectionPage({ params }: PageProps) {
  const { collection } = await params;
  if (!isKeycapsCollection(collection)) notFound();
  return <main className="kagura-collection-page"><KeycapsCollectionExperience collection={collection} /></main>;
}
