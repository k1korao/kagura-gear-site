import { KeycapsCollectionsHub } from "@/components/KeycapsCollectionsHub";
import { keycapsCollectionCopy } from "@/lib/keycaps-collection-copy";
import { getLocale } from "@/lib/locale-server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const copy = keycapsCollectionCopy[await getLocale()];
  return pageMetadata({
    title: copy.hubTitle,
    description: copy.hubDescription,
    path: "/explore/keycaps",
    image: { url: "/brand/kikora-symbol.png", width: 512, height: 512, alt: "KIKORA / Keycaps" },
  });
}

export default function KeycapsPage() {
  return <main className="kagura-collection-page"><KeycapsCollectionsHub /></main>;
}
