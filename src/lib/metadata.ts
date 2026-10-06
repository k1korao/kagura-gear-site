import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getLocale } from "@/lib/locale-server";
import { searchAppearanceCopy } from "@/lib/search-appearance";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export async function pageMetadata({ title, description, path, image }: PageMetadataInput): Promise<Metadata> {
  const locale = await getLocale();
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? `KIKORA (Kikora Gear) | ${title}` : `${title} | ${siteConfig.name}`;
  const previewImage = image ?? {
    url: siteConfig.ogImage,
    width: 1536,
    height: 1024,
    alt: searchAppearanceCopy[locale].imageAlt,
  };

  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: { en: "en_US", ja: "ja_JP" }[locale],
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [previewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: previewImage.url, alt: previewImage.alt }],
    },
  };
}
