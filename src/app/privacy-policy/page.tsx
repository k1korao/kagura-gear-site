import { PolicyPage } from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/metadata";
import { privacyPolicy } from "@/lib/policies";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Kagura Gear privacy policy for store data, Shopify checkout, and support information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <PolicyPage content={privacyPolicy} />;
}
