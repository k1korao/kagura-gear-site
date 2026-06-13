import { PolicyPage } from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/metadata";
import { termsOfService } from "@/lib/policies";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Kagura Gear terms of service for site usage, products, checkout, and store limitations.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return <PolicyPage content={termsOfService} />;
}
