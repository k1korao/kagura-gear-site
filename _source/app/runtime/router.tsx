import { createContext, useContext } from "react";
import { shopifyUrl, sourceRoute } from "../routes";
export type RouteState = { pathname: string; search: string; navigate: (href: string, replace?: boolean) => void };
export const RouterContext = createContext<RouteState>({ pathname: "/", search: "", navigate: () => undefined });
export function useRoute() { return useContext(RouterContext); }
export function browserRoute() {
  return { pathname: sourceRoute(window.location.pathname), search: window.location.search };
}
export function internalHref(href: string) {
  const mapped = shopifyUrl(href);
  if (typeof window === "undefined" || !mapped.startsWith("/")) return mapped;
  const preview = new URLSearchParams(window.location.search).get("preview_theme_id");
  if (!preview) return mapped;
  const url = new URL(mapped, window.location.origin);
  url.searchParams.set("preview_theme_id", preview);
  return url.pathname + url.search + url.hash;
}
