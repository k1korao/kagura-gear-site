export type NewsletterCategory = "keycaps" | "other";

export function isNewsletterCategory(value: unknown): value is NewsletterCategory {
  return value === "keycaps" || value === "other";
}

export function newsletterCategoryForPath(pathname: string): NewsletterCategory {
  return pathname === "/explore/keycaps" || pathname.startsWith("/explore/keycaps/") || pathname === "/explore/metal"
    ? "keycaps"
    : "other";
}

export function newsletterHrefForPath(pathname: string): string {
  return newsletterCategoryForPath(pathname) === "keycaps" ? `${pathname}#newsletter` : "/#newsletter";
}
