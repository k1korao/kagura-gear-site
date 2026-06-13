import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductVisual } from "@/components/ProductVisual";
import { ShopifyBuyButtonSlot } from "@/components/ShopifyBuyButtonSlot";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Kagura Gear",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: {
      canonical: absoluteUrl(`/products/${product.slug}`),
    },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
      url: absoluteUrl(`/products/${product.slug}`),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 675,
          alt: `${product.name} from Kagura Gear`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-ink">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <ProductVisual product={product} />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Surface", "Base", "Edge"].map((label) => (
              <div key={label} className="border border-white/10 bg-smoke p-4 text-center">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sakura">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold text-steel">Premium</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-8">
          <Link
            href="/shop"
            className="text-sm font-black uppercase tracking-[0.18em] text-sakura transition hover:text-bone"
          >
            Back to Shop
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-sakura">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-bone sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-2xl font-black text-bone">{product.price}</p>
          <p className="mt-6 text-lg leading-8 text-steel">{product.description}</p>

          <div className="mt-8 grid gap-3 border-y border-white/10 py-6">
            <div className="flex justify-between gap-4 text-sm">
              <span className="font-black uppercase tracking-[0.18em] text-bone">Size</span>
              <span className="text-right text-steel">{product.size}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="font-black uppercase tracking-[0.18em] text-bone">Surface</span>
              <span className="text-right text-steel">{product.surface}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="font-black uppercase tracking-[0.18em] text-bone">Base</span>
              <span className="text-right text-steel">{product.base}</span>
            </div>
          </div>

          <div className="mt-8">
            <ShopifyBuyButtonSlot productName={product.name} />
          </div>
        </div>
      </section>
    </main>
  );
}
