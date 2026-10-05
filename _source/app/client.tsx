import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { getLocale } from "./runtime/locale";
import { warmDynamicImports } from "./shims/dynamic";
import "./runtime/assets";
async function boot() {
  const mount = document.getElementById("kikora-root");
  if (!mount) return;
  await warmDynamicImports();
  const page = window.KIKORA_PAGE || {};
  const locale = getLocale();
  const node = <App path={page.route || window.location.pathname} search={window.location.search} locale={locale} />;
  const editionOverride = new URLSearchParams(window.location.search).has("art");
  if (page.prerendered && page.locale === locale && !editionOverride && mount.hasChildNodes()) hydrateRoot(mount, node);
  else createRoot(mount).render(node);
  document.documentElement.dataset.kikoraReady = "true";
}
void boot();
