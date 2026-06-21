import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { projects } from "@/content/projects";
import type { CaseStudy } from "@/content/types";

/**
 * Property 1: Case studies are structurally complete.
 *
 * For any CaseStudy in the projects content, it includes a non-empty problem
 * statement, solution summary, architecture overview, tech stack, challenges,
 * and results. The Projects section presents each featured project through this
 * same case-study structure (Req 3.1), which is also the structure reused by AI
 * project case studies (Req 5.2).
 *
 * Feature: portfolio-redesign, Property 1: Case studies are structurally complete
 * Validates: Requirements 3.1, 5.2
 */

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

describe("Case studies are structurally complete (Property 1)", () => {
  it("every featured project case study has all structural parts populated", () => {
    // Sanity: there is at least one case study to quantify over.
    expect(projects.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom<CaseStudy>(...projects), (caseStudy) => {
        expect(isNonEmpty(caseStudy.problem)).toBe(true);
        expect(isNonEmpty(caseStudy.solution)).toBe(true);
        expect(isNonEmpty(caseStudy.architectureOverview)).toBe(true);

        expect(caseStudy.techStack.length).toBeGreaterThan(0);
        for (const item of caseStudy.techStack) {
          expect(isNonEmpty(item.label)).toBe(true);
        }

        expect(caseStudy.challenges.length).toBeGreaterThan(0);
        for (const challenge of caseStudy.challenges) {
          expect(isNonEmpty(challenge)).toBe(true);
        }

        expect(caseStudy.results.length).toBeGreaterThan(0);
        for (const result of caseStudy.results) {
          expect(isNonEmpty(result)).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });
});
