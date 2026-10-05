/** The original website URLs remain the application's internal route identities. */
export const routeMap: Record<string, string> = {
  "/": "/",
  "/shrine": "/",
  "/shop": "/pages/glass",
  "/about": "/pages/about",
  "/faq": "/pages/faq",
  "/contact": "/pages/contact",
  "/shipping-policy": "/pages/shipping-policy",
  "/return-policy": "/pages/return-policy",
  "/privacy-policy": "/pages/privacy-policy",
  "/terms-of-service": "/pages/terms-of-service",
  "/explore/glass": "/pages/glass",
  "/explore/glass/core": "/pages/glass-core",
  "/explore/glass/artist": "/pages/glass-artist",
  "/explore/glass/covers": "/pages/glass-covers",
  "/explore/keycaps": "/pages/keycaps",
  "/explore/metal": "/pages/metal",
  "/collections/all": "/pages/glass",
  "/collections/deskmats": "/pages/glass",
  "/collections/keycaps": "/pages/keycaps",
  "/collections/accessories": "/pages/metal"
};
export const pageRoutes = ["/", "/about", "/faq", "/contact", "/shipping-policy", "/return-policy", "/privacy-policy", "/terms-of-service", "/explore/glass", "/explore/glass/core", "/explore/glass/artist", "/explore/glass/covers", "/explore/keycaps", "/explore/metal"];
const reverseMap = Object.fromEntries(pageRoutes.map(route => [routeMap[route], route]));
export function sourceRoute(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (reverseMap[clean]) return reverseMap[clean];
  if (clean.startsWith("/products/")) return "/explore/glass";
  return reverseMap[routeMap[clean]] || clean;
}
export function shopifyUrl(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const match = href.match(/^([^?#]*)(.*)$/)!;
  const path = match[1].replace(/\/$/, "") || "/";
  return (routeMap[path] || path) + match[2];
}
