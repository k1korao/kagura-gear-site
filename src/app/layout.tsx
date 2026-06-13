import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: absoluteUrl(),
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    url: absoluteUrl(),
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 675,
        alt: "Kagura Gear Japanese-inspired gaming desk setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
