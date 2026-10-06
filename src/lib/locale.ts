export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "kagura-language";
export const htmlLanguages: Record<Locale, string> = { en: "en", ja: "ja" };
export function isLocale(value: unknown): value is Locale { return typeof value === "string" && locales.includes(value as Locale); }
