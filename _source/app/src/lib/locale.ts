export const locales = ["zh", "en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const localeCookie = "kagura-language";
export const htmlLanguages: Record<Locale, string> = { zh: "zh-CN", en: "en", ja: "ja" };
export function isLocale(value: unknown): value is Locale { return typeof value === "string" && locales.includes(value as Locale); }
