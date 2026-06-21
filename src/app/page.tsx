import { getOrderedSections, sectionRegistry } from "@/lib/sections";
import { sectionComponents } from "@/components/sectionComponents";

/**
 * Home page — composes the ordered section registry into the single-page
 * portfolio (Req 4.1).
 *
 * Sections are rendered in `getOrderedSections` order, producing the canonical
 * sequence Hero, Credibility, Projects, AI Engineering, Engineering Excellence,
 * Experience, Skills, Certifications, Contact. Each section component renders
 * its own `<section>` with a stable DOM id (equal to its section id) used for
 * scroll navigation and active-section detection. The single `<h1>` lives in
 * the Hero section and every other section uses `<h2>`, preserving one
 * unbroken heading hierarchy (Req 14.6).
 */
export default function Home() {
  const orderedSections = getOrderedSections(sectionRegistry);

  return (
    <main className="pt-16">
      {orderedSections.map((section) => {
        const SectionComponent = sectionComponents[section.id];
        return <SectionComponent key={section.id} />;
      })}
    </main>
  );
}
