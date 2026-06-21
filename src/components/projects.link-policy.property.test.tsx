import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import fc from "fast-check";
import { CaseStudy } from "@/components/CaseStudy";
import type { CaseStudy as CaseStudyData } from "@/content/types";

/**
 * Property 2: Case-study link policy honors confidentiality.
 *
 * For any CaseStudy, when it is confidential the rendered output exposes no
 * source or demo links and displays a confidentiality indicator — even when the
 * repo/demo URL fields are populated. When it is not confidential, every
 * populated repo/demo URL is rendered as a link.
 *
 * The generator varies `confidential` independently of link presence so the
 * "indicator shown even when a link is present" clause (Req 3.5) is exercised.
 *
 * Feature: portfolio-redesign, Property 2: Case-study link policy honors confidentiality
 * Validates: Requirements 3.4, 3.5
 */

const nonEmptyString = fc
  .string({ minLength: 1, maxLength: 40 })
  .filter((s) => s.trim().length > 0);

// A CaseStudy arbitrary whose confidentiality is independent of whether the
// repo/demo URLs are populated.
const caseStudyArb: fc.Arbitrary<CaseStudyData> = fc.record({
  slug: nonEmptyString,
  name: nonEmptyString,
  problem: nonEmptyString,
  solution: nonEmptyString,
  architectureOverview: nonEmptyString,
  techStack: fc.array(fc.record({ label: nonEmptyString }), {
    minLength: 0,
    maxLength: 4,
  }),
  challenges: fc.array(nonEmptyString, { minLength: 0, maxLength: 3 }),
  results: fc.array(nonEmptyString, { minLength: 0, maxLength: 3 }),
  repoUrl: fc.option(fc.webUrl(), { nil: undefined }),
  demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
  confidential: fc.boolean(),
  imageAsset: fc.constant("coding.png"),
});

describe("Case-study link policy honors confidentiality (Property 2)", () => {
  it("confidential studies hide links and show an indicator; public studies render populated links", () => {
    fc.assert(
      fc.property(caseStudyArb, (caseStudy) => {
        const { container } = render(<CaseStudy caseStudy={caseStudy} />);
        try {
          if (caseStudy.confidential) {
            // Confidentiality indicator is shown (Req 3.5) ...
            expect(
              screen.queryByTestId("confidentiality-indicator")
            ).not.toBeNull();
            // ... and NO source/demo links are exposed, even though the URL
            // fields may be populated.
            expect(screen.queryAllByRole("link")).toHaveLength(0);
          } else {
            // No confidentiality indicator for public studies.
            expect(
              screen.queryByTestId("confidentiality-indicator")
            ).toBeNull();

            const renderedHrefs = Array.from(
              container.querySelectorAll("a")
            ).map((a) => a.getAttribute("href"));

            // Every populated repo/demo URL is rendered as a link (Req 3.4).
            const expectedHrefs = [caseStudy.repoUrl, caseStudy.demoUrl].filter(
              (url): url is string => Boolean(url)
            );
            for (const href of expectedHrefs) {
              expect(renderedHrefs).toContain(href);
            }
            // No extra links beyond the populated repo/demo URLs.
            expect(renderedHrefs).toHaveLength(expectedHrefs.length);
          }
        } finally {
          cleanup();
        }
      }),
      { numRuns: 100 }
    );
  });
});
