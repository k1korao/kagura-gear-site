import { products } from "@/lib/products";

export const siteHost = "kaguragear.com";
export const siteUrl = `https://${siteHost}`;

export const siteConfig = {
  name: "Kagura Gear",
  slogan: "Precision Meets Ritual",
  url: siteUrl,
  description:
    "Premium Japanese-inspired gaming mousepads, desk mats, keyboard accessories, and setup gear for FPS players, mechanical keyboard users, and desk setup fans.",
  ogImage: "/images/kagura-hero.png",
};

export const coreRoutes = [
  "",
  "/shop",
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
