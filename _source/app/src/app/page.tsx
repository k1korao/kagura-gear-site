import CollectionPage from "./shrine/page";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";
import { SearchStructuredData } from "@/components/SearchStructuredData";
import { searchAppearanceCopy } from "@/lib/search-appearance";

export async function generateMetadata() {
  const copy = searchAppearanceCopy[await getLocale()];
  return pageMetadata({ title: copy.title, description: copy.description, path: "/" });
}

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <SearchStructuredData locale={locale} />
      <CollectionPage />
    </>
  );
}
