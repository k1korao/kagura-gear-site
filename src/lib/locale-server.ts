import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { isLocale, localeCookie, type Locale } from "./locale";
export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(localeCookie)?.value;
  return isLocale(value) ? value : "zh";
});
