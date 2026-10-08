export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kikoragear.com").origin;
export const siteHost = new URL(siteUrl).host;

export const siteConfig = {
  name: "KIKORA",
  slogan: "Collect Your World",
  url: siteUrl,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@kikoragear.com",
  description:
    "Discover KIKORA: independent glass mousepads, artist editions and machined metal keycaps. Precision meets personality.",
  ogImage: "/brand/kikora-search-cover.webp",
};

export const coreRoutes = [
  "",
  "/explore/glass",
  "/explore/glass/core",
  "/explore/glass/artist",
  "/explore/glass/covers",
  "/explore/metal",
  "/about",
  "/faq",
  "/contact",
  "/shipping-policy",
  "/return-policy",
  "/privacy-policy",
  "/terms-of-service",
];

export const productRoutes: string[] = [];

export function absoluteUrl(path = "") {
  if (!path) {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function supportMailto(subject = "KIKORA support request", body = "") {
  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${siteConfig.supportEmail}?${params.toString()}`;
}
