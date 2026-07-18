import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  getOrderedSections,
  sectionRegistry,
  type SectionId,
} from "@/lib/sections";

// The documented canonical sequence from Requirement 4.1 (Experience moved
// directly after the About/credibility section in the awrs-style redesign).
const CANONICAL_ID_ORDER: SectionId[] = [
  "hero",
  "credibility",
  "experience",
  "projects",
  "ai-engineering",
  "engineering-excellence",
  "skills",
  "certifications",
  "contact",
];

describe("getOrderedSections canonical ordering (Property 5)", () => {
  // Feature: portfolio-redesign, Property 5: Sections render in canonical order
  // Validates: Requirements 4.1
  it("sorts any permutation of the registry back into the canonical sequence", () => {
    fc.assert(
      fc.property(
        // Generate random permutations of the full canonical registry.
        fc.shuffledSubarray(sectionRegistry, {
          minLength: sectionRegistry.length,
          maxLength: sectionRegistry.length,
        }),
        (permutation) => {
          const ordered = getOrderedSections(permutation);

          // Output is sorted nondecreasing by `order`.
          for (let i = 1; i < ordered.length; i++) {
            expect(ordered[i].order).toBeGreaterThanOrEqual(
              ordered[i - 1].order,
            );
          }

          // Resulting id sequence equals the documented canonical sequence.
          expect(ordered.map((section) => section.id)).toEqual(
            CANONICAL_ID_ORDER,
          );
        },
      ),
      { numRuns: 100 },
    );
  });
});
