import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Amiri, JetBrains_Mono, Philosopher } from "next/font/google";
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
 * Fonts via `next/font/google` (Philosopher as the production English face,
 * JetBrains Mono for mono accents, and Amiri for the Arabic locale).
 * next/font downloads the files at build time and self-hosts them, so there
 * is no render-blocking request to fonts.googleapis.com at runtime — a
 * runtime stylesheet was the single biggest FCP cost on simulated mobile
 * (Req 13.1, 13.5). Philosopher carries both body copy (--font-sans) and
 * the large editorial headings (--font-serif) via the stacks in
 * globals.css.
 */
// Philosopher is a static family (regular/bold, each with an italic), so all
// four cuts are loaded: 400 carries body copy, 700 the bold/black headings
// (the browser maps the stack's 500–900 requests onto it), and the italics
// carry the editorial quote accents. As the face behind the LCP heading in
// production it stays preloaded.
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-philosopher",
});
// Mono accents stay off the critical network path (`preload: false`); with
// `display: swap` they still swap in as soon as they arrive (Req 13.1, 13.2).
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains",
});
// Amiri has no variable version (static 400/700 only) and its Arabic subset
// is heavy; `preload: false` keeps it off the critical path (with
// `display: swap` the Arabic text renders in a fallback face until it
// arrives, so LCP is unaffected).
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-amiri",
});

const FONT_VARIABLES = `${philosopher.variable} ${jetbrainsMono.variable} ${amiri.variable}`;

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
    <html
      lang={locale}
      dir={dir(locale)}
      className={FONT_VARIABLES}
      suppressHydrationWarning
    >
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
