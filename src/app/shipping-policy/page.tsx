import { PolicyPage } from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/metadata";
import { shippingPolicy } from "@/lib/policies";

export const metadata = pageMetadata({
  title: "Shipping Policy",
  description: "Kagura Gear shipping policy, processing times, delivery notes, and tracking information.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return <PolicyPage content={shippingPolicy} />;
}
