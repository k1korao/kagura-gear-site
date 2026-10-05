import { forwardRef, type AnchorHTMLAttributes } from "react";
import { useRoute, internalHref } from "../runtime/router";
import { pageRoutes, sourceRoute } from "../routes";
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string | { pathname?: string; query?: Record<string, string>; hash?: string }; replace?: boolean; scroll?: boolean; prefetch?: boolean };
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, children, onClick, replace, scroll: _scroll, prefetch: _prefetch, ...props }, ref) {
  const { navigate } = useRoute();
  const raw = typeof href === "string" ? href : `${href.pathname || "/"}${href.query ? `?${new URLSearchParams(href.query)}` : ""}${href.hash || ""}`;
  const target = internalHref(raw);
  return <a {...props} ref={ref} href={target} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target || props.download !== undefined) return;
    const url = new URL(target, window.location.origin);
    if (url.origin !== window.location.origin || !pageRoutes.includes(sourceRoute(url.pathname))) return;
    event.preventDefault();
    navigate(url.pathname + url.search + url.hash, replace);
  }}>{children}</a>;
});
export default Link;
