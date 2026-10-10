import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteEffects } from "@/components/SiteEffects";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getLocale } from "@/lib/locale-server";
import { htmlLanguages } from "@/lib/locale";
import { LocaleProvider } from "@/components/LocaleProvider";
import { searchAppearanceCopy } from "@/lib/search-appearance";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { description, imageAlt } = searchAppearanceCopy[locale];
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: absoluteUrl(),
  },
  icons: {
    icon: [
      { url: "/brand/kikora.ico", type: "image/x-icon", sizes: "256x256" },
      { url: "/brand/kikora-symbol.svg", type: "image/svg+xml" },
      { url: "/brand/kikora-symbol.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/brand/kikora.ico",
    apple: [{ url: "/brand/kikora-apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: {en:"en_US",ja:"ja_JP"}[locale],
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description,
    url: absoluteUrl(),
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: imageAlt,
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
