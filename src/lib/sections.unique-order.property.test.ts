import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  assertUniqueOrder,
  type SectionDefinition,
  type SectionId,
} from "@/lib/sections";

// The set of valid section ids; the generator draws arbitrary ids from this set
// so generated definitions are SectionDefinition-shaped without coupling the
// property to any particular registry content.
const SECTION_IDS: SectionId[] = [
  "hero",
  "credibility",
  "projects",
  "ai-engineering",
  "engineering-excellence",
  "experience",
  "skills",
  "certifications",
  "contact",
];

// Generates a single SectionDefinition with a constrained `order`. Drawing
// `order` from a small range across an array makes duplicate-order collisions
// likely, exercising the error branch; the wide tail still produces
// collision-free arrays, exercising the no-error branch.
const sectionDefinitionArb = (maxOrder: number): fc.Arbitrary<SectionDefinition> =>
  fc.record({
    id: fc.constantFrom(...SECTION_IDS),
    order: fc.integer({ min: 0, max: maxOrder }),
    showInNav: fc.boolean(),
  });

// True when two or more definitions share the same `order` value.
const hasDuplicateOrder = (defs: SectionDefinition[]): boolean =>
  new Set(defs.map((d) => d.order)).size !== defs.length;

describe("assertUniqueOrder", () => {
  // Feature: portfolio-redesign, Property 6: Section positions are unique or an error is raised
  it("raises an error if and only if two or more definitions share the same order", () => {
    fc.assert(
      fc.property(
        // A small max order forces frequent collisions; varying it keeps both
        // the duplicate and unique branches well represented.
        fc.integer({ min: 0, max: 6 }).chain((maxOrder) =>
          fc.array(sectionDefinitionArb(maxOrder), { minLength: 0, maxLength: 12 }),
        ),
        (defs) => {
          if (hasDuplicateOrder(defs)) {
            expect(() => assertUniqueOrder(defs)).toThrow();
          } else {
            expect(() => assertUniqueOrder(defs)).not.toThrow();
          }
        },
      ),
      { numRuns: 200 },
    );
  });
});
