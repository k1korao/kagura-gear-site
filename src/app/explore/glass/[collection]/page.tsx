import { notFound } from "next/navigation";
import { AlbumCollection } from "@/components/AlbumCollection";
import { CoreGlassExperience } from "@/components/CoreGlassExperience";
import { ArtistGlassExperience } from "@/components/ArtistGlassExperience";
import { glassCollectionIds, isGlassCollection } from "@/lib/glass-collection-copy";
import { coverEditions, productCopy } from "@/lib/product-copy";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";

type PageProps = {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ art?: string | string[] }>;
};
export const dynamicParams = false;
export function generateStaticParams() { return glassCollectionIds.map(collection => ({ collection })); }

export async function generateMetadata({ params }: PageProps) {
  const { collection } = await params;
  if (!isGlassCollection(collection)) return {};
  const locale = await getLocale();
  const concept = productCopy[locale].concepts[collection];
  return pageMetadata({
    title: concept.title,
    description: concept.story,
    path: `/explore/glass/${collection}`,
  });
}

export default async function GlassCollectionPage({ params, searchParams }: PageProps) {
  const { collection } = await params;
  if (!isGlassCollection(collection)) notFound();
  if (collection === "core") return <CoreGlassExperience />;
  if (collection === "artist") return <ArtistGlassExperience />;
  const { art } = await searchParams;
  const initialEdition = coverEditions.findIndex(edition => edition.id === art);
  return <main className="kagura-collection-page"><AlbumCollection initialEdition={Math.max(0, initialEdition)} /></main>;
}
