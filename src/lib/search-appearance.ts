import { htmlLanguages, type Locale } from "@/lib/locale";
import { navigationCopy } from "@/lib/navigation-copy";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const searchAppearanceCopy = {
  en: {
    title: "Glass Mousepads, Keycaps & Artist Editions",
    description: "Meet KIKORA (Kikora Gear): glass mousepads and keycaps inspired by games, anime and independent art. Explore Core, Artist and Cover collections, Keycaps Set and Artisan Keycaps, and the story behind the brand.",
    imageAlt: "KIKORA original character Neon Ronin under a neon torii gate",
  },
  ja: {
    title: "ガラスマウスパッド・キーキャップとアート",
    description: "ゲームやアニメ、独立した作家の表現から生まれるKIKORA（Kikora Gear）。ガラスマウスパッドのCore・Artist・Coverシリーズ、キーキャップセット、アーティザンキーキャップとブランドの物語をご紹介します。",
    imageAlt: "ネオンの鳥居の下に立つ KIKORA オリジナルキャラクター「NEON RONIN」",
  },
} satisfies Record<Locale, { title: string; description: string; imageAlt: string }>;

export function homeStructuredData(locale: Locale) {
  const copy = searchAppearanceCopy[locale];
  const navigation = navigationCopy[locale];
  const homeUrl = absoluteUrl();
  const organizationId = `${homeUrl}#organization`;
  const websiteId = `${homeUrl}#website`;
  const imageId = `${homeUrl}#primary-image`;
  const links = [
    { name: navigation.glass, path: "/explore/glass" },
    ...navigation.collections.map((collection) => ({
      name: collection.label,
      path: `/explore/glass/${collection.id}`,
    })),
    { name: navigation.keycaps, path: "/explore/keycaps" },
    ...navigation.keycapCollections.map(collection => ({
      name: collection.label,
      path: `/explore/keycaps/${collection.id}`,
    })),
    { name: navigation.about, path: "/about" },
    { name: navigation.contact, path: "/contact" },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        alternateName: "Kikora Gear",
        url: homeUrl,
        logo: absoluteUrl("/brand/kikora-symbol.png"),
        description: copy.description,
        email: siteConfig.supportEmail,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        alternateName: ["Kikora Gear", "kikoragear.com"],
        url: homeUrl,
        description: copy.description,
        publisher: { "@id": organizationId },
        inLanguage: Object.values(htmlLanguages),
      },
      {
        "@type": "ImageObject",
        "@id": imageId,
        url: absoluteUrl(siteConfig.ogImage),
        contentUrl: absoluteUrl(siteConfig.ogImage),
        caption: copy.imageAlt,
        width: 1536,
        height: 1024,
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: `KIKORA (Kikora Gear) | ${copy.title}`,
        description: copy.description,
        inLanguage: htmlLanguages[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: { "@id": imageId },
        significantLink: links.map(({ path }) => absoluteUrl(path)),
      },
      {
        "@type": "ItemList",
        "@id": `${homeUrl}#site-navigation`,
        name: navigation.primary,
        numberOfItems: links.length,
        itemListElement: links.map(({ name, path }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: absoluteUrl(path),
        })),
      },
    ],
  };
}
