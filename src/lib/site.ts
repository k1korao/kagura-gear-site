import { products } from "@/lib/products";

export const siteHost = "kaguragear.com";
export const siteUrl = `https://${siteHost}`;

export const siteConfig = {
  name: "Kagura Gear",
  slogan: "Precision Meets Personality",
  url: siteUrl,
  supportEmail: "support@kaguragear.com",
  description:
    "Discover Kagura Gear: independent glass mousepads, artist editions, keycaps and future metal custom objects. Precision meets personality.",
  ogImage: "/images/kagura-keycaps-cover.webp",
};

export const coreRoutes = [
  "",
  "/shop",
  "/shrine",
  "/explore/glass",
  "/explore/keycaps",
  "/explore/metal",
  "/collections/keycaps",
  "/collections/deskmats",
  "/collections/accessories",
  "/about",
  "/faq",
  "/contact",
  "/shipping-policy",
  "/return-policy",
  "/privacy-policy",
  "/terms-of-service",
];

export const productRoutes = products.map((product) => `/products/${product.slug}`);

export function absoluteUrl(path = "") {
  if (!path) {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function supportMailto(subject = "Kagura Gear support request", body = "") {
  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${siteConfig.supportEmail}?${params.toString()}`;
}
