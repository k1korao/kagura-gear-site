import type { MetadataRoute } from "next";
import { absoluteUrl, coreRoutes, productRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [...coreRoutes, ...productRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "" || route === "/shop" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/shop" ? 0.9 : route.startsWith("/products") ? 0.8 : 0.7,
  }));
}
