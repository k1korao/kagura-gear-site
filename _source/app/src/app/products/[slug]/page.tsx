import { notFound, redirect } from "next/navigation";
import { products } from "@/lib/products";
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!products.some(product => product.slug === slug)) notFound();
  redirect("/explore/glass");
}
