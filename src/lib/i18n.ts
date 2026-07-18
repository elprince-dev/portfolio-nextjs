/**
 * Locale infrastructure for the bilingual site (English + Arabic).
 *
 * Routes are locale-prefixed (/en, /ar) via the `app/[locale]` segment; the
 * root middleware redirects unprefixed paths to the default locale. Arabic
 * renders right-to-left (`dir("ar") === "rtl"`).
 */

export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Type guard for a locale path segment. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text direction for a locale. */
export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** The other locale (used by the language toggle). */
export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

/**
 * Swap the locale prefix of a pathname (e.g. "/en/contact" -> "/ar/contact").
 * Paths without a known prefix are prefixed with the target locale.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }
  return `/${target}${pathname === "/" ? "" : pathname}`;
}
