import { useCallback, useEffect, useState } from "react";
import { LocaleProvider } from "./src/components/LocaleProvider";
import { Navbar } from "./src/components/Navbar";
import { Footer } from "./src/components/Footer";
import { SiteEffects } from "./src/components/SiteEffects";
import HomePage from "./src/app/shrine/page";
import AboutPage from "./src/app/about/page";
import ContactPage from "./src/app/contact/page";
import FaqPage from "./src/app/faq/page";
import NotFound from "./src/app/not-found";
import { PolicyPage } from "./src/components/PolicyPage";
import { GlassCollectionsHub } from "./src/components/GlassCollectionsHub";
import { ArtistGlassExperience } from "./src/components/ArtistGlassExperience";
import { CoreGlassExperience } from "./src/components/CoreGlassExperience";
import { AlbumCollection } from "./src/components/AlbumCollection";
import { ShrineExperience } from "./src/components/ShrineExperience";
import { RouterContext, browserRoute, internalHref } from "./runtime/router";
import { sourceRoute } from "./routes";
import { htmlLanguages, type Locale } from "./src/lib/locale";
import { productCopy, coverEditions } from "./src/lib/product-copy";
import { policies } from "./src/lib/policies";
import { searchAppearanceCopy } from "./src/lib/search-appearance";
import { supportCopy } from "./src/lib/support-copy";
import { aboutCopy } from "./src/lib/about-copy";

const policyRoutes = { "/shipping-policy": "shipping", "/return-policy": "returns", "/privacy-policy": "privacy", "/terms-of-service": "terms" } as const;
export function pageTitle(path: string, locale: Locale) {
  const route = sourceRoute(path);
  if (route === "/") return `KIKORA (Kikora Gear) | ${searchAppearanceCopy[locale].title}`;
  if (route === "/about") return `${aboutCopy[locale].title} | KIKORA`;
  if (route === "/contact") return `${supportCopy[locale].contact.metaTitle} | KIKORA`;
  if (route === "/faq") return `${supportCopy[locale].faq.metaTitle} | KIKORA`;
  if (route in policyRoutes) return `${policies[locale][policyRoutes[route as keyof typeof policyRoutes]].title} | KIKORA`;
  const collection = route.split("/")[3] as "core" | "artist" | "covers";
  if (collection && productCopy[locale].concepts[collection]) return `${productCopy[locale].concepts[collection].title} | KIKORA`;
  const category = route.split("/")[2] as "glass" | "keycaps" | "metal";
  return `${productCopy[locale].categories[category] || "KIKORA"} | KIKORA`;
}
function Page({ pathname, search, locale }: { pathname: string; search: string; locale: Locale }) {
  if (pathname === "/") return <HomePage />;
  if (pathname === "/about") return <AboutPage />;
  if (pathname === "/contact") return <ContactPage />;
  if (pathname === "/faq") return <FaqPage />;
  if (pathname in policyRoutes) return <PolicyPage content={policies[locale][policyRoutes[pathname as keyof typeof policyRoutes]]} />;
  if (pathname === "/explore/glass") return <main className="kagura-collection-page"><GlassCollectionsHub /></main>;
  if (pathname === "/explore/glass/core") return <CoreGlassExperience />;
  if (pathname === "/explore/glass/artist") return <ArtistGlassExperience />;
  if (pathname === "/explore/glass/covers") {
    const art = new URLSearchParams(search).get("art");
    return <main className="kagura-collection-page"><AlbumCollection initialEdition={Math.max(0, coverEditions.findIndex(item => item.id === art))} /></main>;
  }
  if (pathname === "/explore/keycaps" || pathname === "/explore/metal") return <main className="kagura-collection-page"><ShrineExperience category={pathname.endsWith("keycaps") ? "keycaps" : "metal"} /></main>;
  return <NotFound />;
}
export function App({ path = "/", search = "", locale = "zh" }: { path?: string; search?: string; locale?: Locale }) {
  const [route, setRoute] = useState({ pathname: sourceRoute(path), search });
  const navigate = useCallback((href: string, replace = false) => {
    const target = new URL(internalHref(href), window.location.origin);
    window.history[replace ? "replaceState" : "pushState"]({}, "", target);
    setRoute(browserRoute());
    requestAnimationFrame(() => {
      if (target.hash) document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, []);
  useEffect(() => {
    const update = () => setRoute(browserRoute());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = htmlLanguages[locale];
    document.documentElement.translate = false;
    document.title = pageTitle(route.pathname, locale);
    if (window.location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
  }, [route.pathname, locale]);
  return <LocaleProvider locale={locale}><RouterContext.Provider value={{ ...route, navigate }}>
    <SiteEffects /><Navbar /><Page key={route.pathname} pathname={route.pathname} search={route.search} locale={locale} /><Footer />
  </RouterContext.Provider></LocaleProvider>;
}
