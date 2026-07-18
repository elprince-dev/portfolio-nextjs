import { getOrderedSections, sectionRegistry } from "@/lib/sections";
import { sectionComponents } from "@/components/sectionComponents";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Home page — composes the ordered section registry into the single-page
 * portfolio (Req 4.1) for the active locale.
 *
 * Sections are rendered in `getOrderedSections` order. Each section
 * component renders its own `<section>` with a stable DOM id (equal to its
 * section id) used for scroll navigation and active-section detection, and
 * receives the locale for localized copy. The single `<h1>` lives in the
 * Hero section and every other section uses `<h2>` (Req 14.6).
 */
export default function Home({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const orderedSections = getOrderedSections(sectionRegistry);

  return (
    <main className="pt-16">
      {orderedSections.map((section) => {
        const SectionComponent = sectionComponents[section.id];
        return <SectionComponent key={section.id} locale={locale} />;
      })}
    </main>
  );
}
