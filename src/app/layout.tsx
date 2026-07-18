import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig, siteUrl } from "@/lib/site";
import { personJsonLd } from "@/lib/structured-data";

/**
 * RootLayout — mounts the ThemeProvider, persistent Navbar, and Footer, and
 * defines the document-level SEO metadata and Person structured data
 * (Req 11.2, 14.6, 15.1–15.4).
 *
 * - Page title and description (Req 15.1).
 * - Open Graph + Twitter Card metadata with a preview image (Req 15.2).
 * - `metadataBase` so `sitemap.xml`/`robots.txt` and OG image resolve to
 *   absolute URLs (Req 15.3).
 * - Person structured data injected as JSON-LD (Req 15.4).
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  keywords: [
    "AI Engineer",
    "Software Engineer",
    "Backend Engineer",
    "AWS",
    "TypeScript",
    "Serverless",
    "RAG",
    "LLM applications",
    "Mohammad El Prince",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.previewImage,
        width: siteConfig.previewImageWidth,
        height: siteConfig.previewImageHeight,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.previewImage],
    creator: siteConfig.twitterHandle,
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
    apple: {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
};

/**
 * Google Fonts stylesheet for the editorial design language: Playfair Display
 * for the large serif display type, Inter for body copy, and JetBrains Mono
 * for the small mono accents (eyebrows, tickers, metadata). Loaded as a
 * runtime stylesheet (rather than next/font) so builds succeed in offline
 * environments; the CSS variables consumed by Tailwind's `fontFamily` theme
 * (--font-sans/--font-serif/--font-mono) are defined in globals.css with
 * system fallbacks.
 */
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;500&display=swap";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </head>
      <body className="bg-background font-sans text-text-primary">
        <script
          type="application/ld+json"
          // Person structured data (Req 15.4).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          defaultTheme="dark"
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
