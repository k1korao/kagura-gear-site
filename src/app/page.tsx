import CollectionPage from "./shrine/page";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/locale-server";
import { homeCopy } from "@/lib/home-copy";

export async function generateMetadata() { const copy = homeCopy[await getLocale()]; return pageMetadata({ title: copy.title, description: copy.description, path: "/" }); }

export default CollectionPage;
