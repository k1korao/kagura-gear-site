import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getLocale } from "@/lib/locale-server";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export async function pageMetadata({ title, description, path }: PageMetadataInput): Promise<Metadata> {
  const locale = await getLocale();
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      locale: { zh: "zh_CN", en: "en_US", ja: "ja_JP" }[locale],
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1536,
          height: 1024,
          alt: { zh: "KIKORA 键帽设计概念", en: "KIKORA keycap design concept", ja: "KIKORA キーキャップのデザインコンセプト" }[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
