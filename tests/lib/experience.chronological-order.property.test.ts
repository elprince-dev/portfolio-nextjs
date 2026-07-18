import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { sortStagesChronologically } from "@/lib/experience";
import type { ExperienceStage } from "@/content/types";

// Generates a stage with a real ISO `startDate` drawn from a wide range so
// permutations exercise the full ordering logic.
const stageArb: fc.Arbitrary<ExperienceStage> = fc
  .record({
    title: fc.string({ minLength: 1, maxLength: 20 }),
    organization: fc.string({ minLength: 1, maxLength: 20 }),
    timeReference: fc.string({ minLength: 1, maxLength: 20 }),
    date: fc.date({
      min: new Date("1990-01-01T00:00:00.000Z"),
      max: new Date("2035-12-31T00:00:00.000Z"),
    }),
  })
  .map(({ title, organization, timeReference, date }) => ({
    title,
    organization,
    timeReference,
    startDate: date.toISOString(),
  }));

describe("sortStagesChronologically (Property 10)", () => {
  // Feature: portfolio-redesign, Property 10: Experience stages are ordered chronologically
  // Validates: Requirements 7.1
  it("returns stages in nondecreasing startDate order without dropping any", () => {
    fc.assert(
      fc.property(
        fc.array(stageArb, { minLength: 0, maxLength: 12 }),
        (stages) => {
          const sorted = sortStagesChronologically(stages);

          // Same number of stages: nothing added or dropped.
          expect(sorted).toHaveLength(stages.length);

          // Output is a permutation of the input (same multiset of stages).
          expect([...sorted].sort(byIso)).toEqual([...stages].sort(byIso));

          // Output times are nondecreasing from earliest to most recent.
          for (let i = 1; i < sorted.length; i++) {
            const prev = new Date(sorted[i - 1].startDate).getTime();
            const curr = new Date(sorted[i].startDate).getTime();
            expect(curr).toBeGreaterThanOrEqual(prev);
          }

          // The input array is not mutated.
          expect(sortStagesChronologically(stages)).not.toBe(stages);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Total-order comparator over the full stage used only to compare the two
// arrays as multisets (ties broken by every field so equal-date stages sort
// deterministically on both sides).
const byIso = (a: ExperienceStage, b: ExperienceStage): number => {
  const ka = JSON.stringify(a);
  const kb = JSON.stringify(b);
  return ka < kb ? -1 : ka > kb ? 1 : 0;
};
