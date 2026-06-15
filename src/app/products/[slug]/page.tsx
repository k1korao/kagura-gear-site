import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductVisual } from "@/components/ProductVisual";
import { ShopifyBuyButtonSlot } from "@/components/ShopifyBuyButtonSlot";
import { absoluteUrl, siteConfig, supportMailto } from "@/lib/site";
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
      <section className="relative overflow-hidden border-b border-white/10 bg-edge-light">
        <div className="absolute inset-0 bg-woven-grid bg-[length:38px_38px] opacity-[0.08]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.88fr] lg:px-8">
          <div data-reveal className="relative z-10">
            <ProductVisual product={product} />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Speed", product.speed],
                ["Control", product.control],
                ["Profile", "4mm"],
              ].map(([label, value]) => (
                <div key={label} data-tilt className="overflow-hidden border border-white/10 bg-black/40 p-4 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sakura">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-steel">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="relative z-10 lg:pt-8">
            <Link
              href="/shop"
              className="text-sm font-black uppercase tracking-[0.18em] text-sakura transition hover:text-bone"
            >
              Back to Shop
            </Link>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-sakura">
              {product.series}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-bone sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl font-black text-bone/80">{product.tagline}</p>
            <p className="mt-5 text-2xl font-black text-bone">{product.price}</p>
            <p className="mt-6 text-lg leading-8 text-steel">{product.description}</p>

            <div className="mt-8">
              <ShopifyBuyButtonSlot productName={product.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div data-reveal>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-sakura">
            Product Details
          </p>
          <h2 className="text-3xl font-black leading-tight text-bone sm:text-4xl">
            Tuned for {product.useCase}.
          </h2>
          <div className="mt-8 grid gap-3">
            {product.features.map((feature) => (
              <div key={feature} data-tilt className="overflow-hidden border border-white/10 bg-smoke p-5">
                <p className="font-black text-bone">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          <div className="grid gap-3 border-y border-white/10 py-6">
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
            <div className="flex justify-between gap-4 text-sm">
              <span className="font-black uppercase tracking-[0.18em] text-bone">Best For</span>
              <span className="text-right text-steel">{product.useCase}</span>
            </div>
          </div>

          <p className="mt-8 border border-sakura/25 bg-sakura/10 p-5 text-sm leading-6 text-steel">
            Shopify checkout placeholder: paste this product Buy Button embed into
            the checkout slot above when your Shopify product is ready.
          </p>
          <a
            href={supportMailto(`Question about ${product.name}`)}
            className="premium-button mt-4 inline-flex border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-bone transition hover:border-sakura hover:text-sakura"
          >
            Ask support about this product
          </a>
        </div>
      </section>
    </main>
  );
}
