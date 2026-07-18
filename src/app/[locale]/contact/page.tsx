import type { Metadata } from "next";
import LetsConnectPage from "@/components/LetsConnectPage";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * /[locale]/contact — the dedicated "LET'S Connect" page. The Connect
 * banner's "Get in Touch" CTA navigates here. Presentation lives in
 * {@link LetsConnectPage}.
 */

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  return {
    title: locale === "ar" ? "تواصل" : "Contact",
    description:
      locale === "ar"
        ? "تواصل مع محمد البرنس — احجز مكالمة أو أرسل رسالة حول وظائف بدوام كامل أو مشاريع حرة أو لمجرد التحية."
        : "Get in touch with Mohammad El Prince — schedule a call or send a message about full-time roles, freelance projects, or just to say hi.",
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  return <LetsConnectPage locale={locale} />;
}
