"use client";
import { useState } from "react";
import { isLocale, localeCookie } from "@/lib/locale";
import { useLocale } from "./LocaleProvider";
import styles from "./LanguageSwitcher.module.css";
const labels = { en: "Site language", ja: "表示言語" };
export function LanguageSwitcher() {
  const locale = useLocale();
  const [switching, setSwitching] = useState(false);
  return <select className={styles.select} aria-label={labels[locale]} value={locale} disabled={switching} onChange={event => {
    const next = event.target.value;
    if (!isLocale(next) || next === locale) return;
    setSwitching(true);
    document.cookie = `${localeCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    window.location.reload();
  }}><option value="en" lang="en">EN</option><option value="ja" lang="ja">日本語</option></select>;
}
