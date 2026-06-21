import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { getRevealVariants } from "@/lib/motion";

const complexityArb = fc.constantFrom<"simple" | "standard">(
  "simple",
  "standard",
);

// The 600ms ceiling expressed in framer-motion's seconds convention.
const CEILING_SECONDS = 0.6;

const entranceDuration = (
  reduced: boolean,
  complexity: "simple" | "standard",
): number => {
  const variants = getRevealVariants(reduced, complexity);
  const visible = variants.visible as Record<string, unknown>;
  const transition = (visible.transition ?? {}) as Record<string, unknown>;
  return (transition.duration as number) ?? 0;
};

describe("getRevealVariants entrance duration ceiling (Property 19)", () => {
  // Feature: portfolio-redesign, Property 19: Entrance animations respect the duration ceiling
  // Validates: Requirements 12.4
  it("keeps entrance duration within 600ms, and strictly under 600ms for simple complexity", () => {
    fc.assert(
      fc.property(fc.boolean(), complexityArb, (reduced, complexity) => {
        const duration = entranceDuration(reduced, complexity);

        // Never exceeds the ceiling, for any complexity or reduced-motion state.
        expect(duration).toBeLessThanOrEqual(CEILING_SECONDS);

        // Simple animations are strictly faster than the ceiling.
        if (complexity === "simple") {
          expect(duration).toBeLessThan(CEILING_SECONDS);
        }
      }),
      { numRuns: 100 },
    );
  });
});
