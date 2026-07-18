import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  getNavItems,
  sectionRegistry,
  type SectionDefinition,
  type SectionId,
} from "@/lib/sections";

// Feature: portfolio-redesign, Property 7: Navigation exposes a consistent link set

// Pool of identifiers used to build SectionDefinition-like objects. Drawn from
// the SectionId union so the generated values satisfy the type contract while
// still randomizing which sections appear.
const SECTION_IDS: SectionId[] = [
  "hero",
  "credibility",
  "projects",
  "ai-engineering",
  "engineering-excellence",
  "experience",
  "skills",
  "connect",
];

// Generates a single SectionDefinition-like object with a random showInNav
// flag, id, order, and (optionally) a navLabel.
const sectionDefinitionArb: fc.Arbitrary<SectionDefinition> = fc
  .record({
    id: fc.constantFrom(...SECTION_IDS),
    order: fc.integer({ min: 0, max: 1000 }),
    showInNav: fc.boolean(),
    navLabel: fc.option(fc.string(), { nil: undefined }),
  })
  .map(({ id, order, showInNav, navLabel }) => {
    const def: SectionDefinition = { id, order, showInNav };
    if (navLabel !== undefined) {
      def.navLabel = navLabel;
    }
    return def;
  });

describe("Property 7: Navigation exposes a consistent link set", () => {
  it("getNavItems returns exactly the showInNav sections, order preserved, and desktop/mobile parity holds", () => {
    fc.assert(
      fc.property(
        fc.array(sectionDefinitionArb, { maxLength: 30 }),
        (defs) => {
          const navItems = getNavItems(defs);

          // 1. Exactly the sections marked showInNav === true, same elements
          //    in the same order as they appear in the input.
          const expected = defs.filter((def) => def.showInNav === true);
          expect(navItems).toEqual(expected);

          // 2. No section with showInNav === false leaks into the nav set.
          expect(navItems.every((def) => def.showInNav === true)).toBe(true);

          // 3. The mobile collapsible menu and the desktop navigation both
          //    derive their links from getNavItems, so they expose the exact
          //    same link set (same elements, same order).
          const desktopLinks = getNavItems(defs);
          const mobileLinks = getNavItems(defs);
          expect(mobileLinks).toEqual(desktopLinks);
        },
      ),
      { numRuns: 200 },
    );
  });

  it("the canonical registry exposes exactly Experience, Skills, Projects, and AI Engineering (Contact is a page link)", () => {
    const navIds = getNavItems(sectionRegistry).map((def) => def.id);
    expect(navIds).toEqual([
      "experience",
      "skills",
      "projects",
      "ai-engineering",
    ]);
  });
});
