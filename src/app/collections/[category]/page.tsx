import { notFound, redirect } from "next/navigation";
const destinations: Record<string, string> = { keycaps: "/explore/keycaps", deskmats: "/explore/glass", accessories: "/explore/metal" };
export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!destinations[category]) notFound();
  redirect(destinations[category]);
}
