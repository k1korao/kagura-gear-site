import { PolicyPage } from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/metadata";
import { returnPolicy } from "@/lib/policies";

export const metadata = pageMetadata({
  title: "Return Policy",
  description: "Kagura Gear return policy, product condition notes, and return request guidance.",
  path: "/return-policy",
});

export default function ReturnPolicyPage() {
  return <PolicyPage content={returnPolicy} />;
}
