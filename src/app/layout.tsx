import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getLocale } from "@/lib/locale-server";
import { htmlLanguages } from "@/lib/locale";
import { LocaleProvider } from "@/components/LocaleProvider";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const description = { zh: "KAGURA 面向动漫、游戏与潮流玩家，探索独立画师、个人 IP 与限定艺术作品。让创作者的世界，成为你的收藏。", en: "KAGURA brings independent art and original characters into collectible objects for people who live and love games, anime and design.", ja: "作家の世界を、あなたのコレクションに。KAGURAは、アニメ・ゲーム・ストリートカルチャーを愛する人に向けた、オリジナルIPとアートピースの可能性を探るブランドです。" }[locale];
  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  other: { google: "notranslate" },
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: absoluteUrl(),
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/favicon.svg?v=4", type: "image/svg+xml" },
      { url: "/images/kagura-favicon.png?v=4", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=4",
    apple: [{ url: "/apple-touch-icon.png?v=4", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: {zh:"zh_CN",en:"en_US",ja:"ja_JP"}[locale],
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description,
    url: absoluteUrl(),
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1536,
        height: 1024,
        alt: "KAGURA independent keycap design study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description,
    images: [siteConfig.ogImage],
  },
};
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={htmlLanguages[locale]} translate="no">
      <body>
        <LocaleProvider locale={locale}>
        <SiteEffects />
        <Navbar />
        {children}
        <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
