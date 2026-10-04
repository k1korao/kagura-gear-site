import { PolicyPage } from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/metadata";
import { policies } from "@/lib/policies";
import { getLocale } from "@/lib/locale-server";
export async function generateMetadata() { const content = policies[await getLocale()].privacy; return pageMetadata({ title: content.title, description: content.intro, path: "/privacy-policy" }); }
export default async function PrivacyPage() { return <PolicyPage content={policies[await getLocale()].privacy} />; }
