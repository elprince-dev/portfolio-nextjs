import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig, siteUrl } from "@/lib/site";
import { personJsonLd } from "@/lib/structured-data";
import { dir, isLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Locale-scoped root layout (/en, /ar) — mounts the ThemeProvider,
 * persistent Navbar, and Footer, sets `lang`/`dir` on <html> (Arabic renders
 * right-to-left), and defines the document-level SEO metadata and Person
 * structured data (Req 11.2, 14.6, 15.1–15.4).
 */

interface LayoutParams {
  params: { locale: string };
}

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

const AR_DESCRIPTION =
  "محمد البرنس — مهندس برمجيات ذكاء اصطناعي وكيلي في أمازون. يبني أنظمة RAG ووكلاء ومنصات بلا خوادم على AWS.";

export function generateMetadata({ params }: LayoutParams): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const description = locale === "ar" ? AR_DESCRIPTION : siteConfig.description;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteConfig.title,
      template: `%s — ${siteConfig.name}`,
    },
    description,
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
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description,
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
      description,
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
}

/**
 * Google Fonts stylesheet for the editorial design language: Playfair Display
 * (serif display), Inter (body), JetBrains Mono (mono accents), and Tajawal
 * for the Arabic locale. Loaded as a runtime stylesheet (rather than
 * next/font) so builds succeed in offline environments; the CSS variables
 * consumed by Tailwind's `fontFamily` theme are defined in globals.css with
 * system fallbacks (and overridden for [dir="rtl"]).
 */
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;500&family=Tajawal:wght@400;500;700;900&display=swap";

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
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
          defaultTheme="system"
        >
          <Navbar locale={locale} />
          {children}
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
