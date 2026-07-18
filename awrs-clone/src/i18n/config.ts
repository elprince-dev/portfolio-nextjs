// English-only site. The locale routing is kept (URLs live under /en) so the
// structure can be re-internationalized later without a rewrite.
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
