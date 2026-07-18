/**
 * Section registry and ordering logic for the portfolio's information architecture.
 *
 * This module is the single source of truth for the canonical section order
 * (Requirement 4.1), enforces unique section positions (Requirement 4.2), and
 * exposes the navigation link set (Requirement 4.3). `assertUniqueOrder` is
 * invoked at module load so a misconfigured registry fails fast.
 */

/** The stable identifier for each home-page section. */
export type SectionId =
  | "hero"
  | "credibility"
  | "projects"
  | "ai-engineering"
  | "engineering-excellence"
  | "experience"
  | "skills"
  | "certifications"
  | "contact";

/** Describes a single section's position and navigation presence. */
export interface SectionDefinition {
  /** Stable identifier used for the section's DOM id and scroll targeting. */
  id: SectionId;
  /** Unique position in the canonical layout sequence; duplicates raise an error. */
  order: number;
  /** Human-readable navigation label; present only for sections exposed in Navigation. */
  navLabel?: string;
  /** Whether this section is exposed as a navigation link. */
  showInNav: boolean;
}

/**
 * Returns the section definitions sorted ascending by `order`, producing the
 * canonical layout sequence required by Requirement 4.1. Does not mutate the
 * input array.
 */
export function getOrderedSections(
  defs: SectionDefinition[],
): SectionDefinition[] {
  return [...defs].sort((a, b) => a.order - b.order);
}

/**
 * Throws a descriptive error if two or more section definitions share the same
 * `order` value, enforcing the unique-position requirement (Requirement 4.2).
 */
export function assertUniqueOrder(defs: SectionDefinition[]): void {
  const seen = new Map<number, SectionId>();
  for (const def of defs) {
    const existing = seen.get(def.order);
    if (existing !== undefined) {
      throw new Error(
        `Duplicate section order ${def.order}: "${existing}" and "${def.id}" share the same position.`,
      );
    }
    seen.set(def.order, def.id);
  }
}

/**
 * Returns exactly the sections marked `showInNav`, preserving input order
 * (Requirement 4.3).
 */
export function getNavItems(
  defs: SectionDefinition[],
): SectionDefinition[] {
  return defs.filter((def) => def.showInNav);
}

/**
 * The canonical section registry. Order follows Requirement 4.1:
 * Hero, Credibility (About), Experience, Projects, AI Engineering,
 * Engineering Excellence, Skills, Certifications, Contact.
 *
 * Navigation links (Requirement 4.3) are exposed for Experience, Projects,
 * AI Engineering, Skills, and Contact.
 */
export const sectionRegistry: SectionDefinition[] = [
  { id: "hero", order: 0, showInNav: false },
  { id: "credibility", order: 1, showInNav: false },
  { id: "experience", order: 2, navLabel: "Experience", showInNav: true },
  { id: "projects", order: 3, navLabel: "Projects", showInNav: true },
  {
    id: "ai-engineering",
    order: 4,
    navLabel: "AI Engineering",
    showInNav: true,
  },
  { id: "engineering-excellence", order: 5, showInNav: false },
  { id: "skills", order: 6, navLabel: "Skills", showInNav: true },
  { id: "certifications", order: 7, showInNav: false },
  { id: "contact", order: 8, navLabel: "Contact", showInNav: true },
];

// Fail fast at module load if the registry is misconfigured (Requirement 4.2).
assertUniqueOrder(sectionRegistry);
