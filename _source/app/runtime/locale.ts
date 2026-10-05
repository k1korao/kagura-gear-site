import { isLocale, localeCookie, type Locale } from "../src/lib/locale";
export function getLocale(): Locale {
  if (typeof window === "undefined") return isLocale(globalThis.__KIKORA_LOCALE__) ? globalThis.__KIKORA_LOCALE__ : "zh";
  const cookie = document.cookie.split(";").map(value => value.trim()).find(value => value.startsWith(`${localeCookie}=`));
  const value = cookie ? decodeURIComponent(cookie.slice(localeCookie.length + 1)) : window.KIKORA_PAGE?.locale;
  return isLocale(value) ? value : "zh";
}
