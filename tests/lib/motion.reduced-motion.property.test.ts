import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { getRevealVariants } from "@/lib/motion";

const complexityArb = fc.constantFrom<"simple" | "standard">(
  "simple",
  "standard",
);

// A variant entry can be a plain target object or an array of keyframes (a
// loop). This pulls a numeric channel out of either shape for inspection.
const channelValues = (entry: unknown, key: string): number[] => {
  const target = entry as Record<string, unknown>;
  const value = target?.[key];
  return Array.isArray(value) ? (value as number[]) : [value as number];
};

describe("getRevealVariants under reduced motion (Property 18)", () => {
  // Feature: portfolio-redesign, Property 18: Reduced motion disables non-essential animation
  // Validates: Requirements 12.3
  it("produces no positional or opacity entrance motion and no looping animation", () => {
    fc.assert(
      fc.property(complexityArb, (complexity) => {
        const variants = getRevealVariants(true, complexity);

        const hidden = variants.hidden as Record<string, unknown>;
        const visible = variants.visible as Record<string, unknown>;

        // No opacity entrance motion: opacity is identical (and fully visible)
        // between the hidden and visible states.
        const hiddenOpacity = channelValues(hidden, "opacity");
        const visibleOpacity = channelValues(visible, "opacity");
        expect(hiddenOpacity).toEqual([1]);
        expect(visibleOpacity).toEqual([1]);

        // No positional entrance motion: the y offset does not change.
        const hiddenY = channelValues(hidden, "y");
        const visibleY = channelValues(visible, "y");
        expect(hiddenY).toEqual([0]);
        expect(visibleY).toEqual([0]);

        // No looping animation: no channel is expressed as a keyframe array and
        // the transition declares no repeat.
        for (const state of [hidden, visible]) {
          for (const [k, v] of Object.entries(state)) {
            if (k === "transition") {
              const transition = v as Record<string, unknown>;
              expect(transition.repeat ?? 0).toBe(0);
              continue;
            }
            expect(Array.isArray(v)).toBe(false);
          }
        }
      }),
      { numRuns: 100 },
    );
  });
});
