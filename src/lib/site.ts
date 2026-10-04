import { products } from "@/lib/products";

export const siteHost = "kaguragear.com";
export const siteUrl = `https://${siteHost}`;

export const siteConfig = {
  name: "Kagura Gear",
  slogan: "Precision Meets Ritual",
  url: siteUrl,
  supportEmail: "support@kaguragear.com",
  description:
    "Music, gaming, your desk. Explore Kagura Gear glass mousepads, album-inspired artwork concepts, and our upcoming keycap collection.",
  ogImage: "/images/kagura-logo-card.jpg",
};

export const coreRoutes = [
  "",
  "/shop",
  "/shrine",
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
