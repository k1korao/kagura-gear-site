import { useMemo } from "react";
import { useRoute } from "../runtime/router";
export function usePathname() { return useRoute().pathname; }
export function useSearchParams() { const { search } = useRoute(); return useMemo(() => new URLSearchParams(search), [search]); }
export function useRouter() {
  const { navigate } = useRoute();
  return useMemo(() => ({ push: (href: string) => navigate(href), replace: (href: string) => navigate(href, true), back: () => window.history.back(), forward: () => window.history.forward(), refresh: () => window.location.reload(), prefetch: () => undefined }), [navigate]);
}
export function notFound(): never { throw new Error("KIKORA_PAGE_NOT_FOUND"); }
export function redirect(href: string): never { throw new Error(`KIKORA_REDIRECT:${href}`); }
