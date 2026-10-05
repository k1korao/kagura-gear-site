import { PolicyPage } from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/metadata";
import { policies } from "@/lib/policies";
import { getLocale } from "@/lib/locale-server";
export async function generateMetadata() { const content = policies[await getLocale()].terms; return pageMetadata({ title: content.title, description: content.intro, path: "/terms-of-service" }); }
export default async function TermsPage() { return <PolicyPage content={policies[await getLocale()].terms} />; }
