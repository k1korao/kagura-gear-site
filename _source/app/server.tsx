import { renderToString } from "react-dom/server";
import { App, pageTitle } from "./App";
import { warmDynamicImports } from "./shims/dynamic";
import { pageRoutes, routeMap } from "./routes";
import type { Locale } from "./src/lib/locale";
export async function renderPage(path: string, locale: Locale, assets: Record<string, string> = {}) {
  globalThis.__KIKORA_ASSETS__ = assets;
  globalThis.__KIKORA_LOCALE__ = locale;
  await warmDynamicImports();
  return { path, shopifyPath: routeMap[path] || path, locale, title: pageTitle(path, locale), html: renderToString(<App path={path} locale={locale} />) };
}
export { pageRoutes };
