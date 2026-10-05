import type { Locale } from "@/lib/locale";
import { homeStructuredData } from "@/lib/search-appearance";

export function SearchStructuredData({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(homeStructuredData(locale)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
