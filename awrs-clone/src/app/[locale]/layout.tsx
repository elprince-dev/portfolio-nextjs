import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import {
  isLocale,
  locales,
  localeDirection,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile, siteUrl } from "@/content/profile";
import { tl } from "@/content/types";
import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const name = tl(profile.name, loc);
  const title = `${name} — ${tl(profile.jobTitle, loc)}`;
  const description = tl(profile.jobTitle, loc);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${name}` },
    description,
    alternates: {
      canonical: `/${loc}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${loc}`,
      siteName: name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const dir = localeDirection[locale];
  const brand = tl(profile.name, locale).split(" ")[0];

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen">
        <Providers>
          <Navbar
            locale={locale}
            nav={dict.nav}
            themeLabel={dict.theme.toggle}
            brand={brand}
          />
          <main>{children}</main>
          <Footer
            locale={locale}
            dict={dict.footer}
            name={tl(profile.name, locale)}
          />
        </Providers>
      </body>
    </html>
  );
}
