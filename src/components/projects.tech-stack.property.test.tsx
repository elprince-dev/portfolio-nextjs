import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import fc from "fast-check";
import { CaseStudy } from "@/components/CaseStudy";
import { projects } from "@/content/projects";
import type { CaseStudy as CaseStudyData } from "@/content/types";

/**
 * Property 3: Tech stack is preserved faithfully.
 *
 * For any CaseStudy, the rendered tech-stack labels equal the tech-stack labels
 * defined in that project's preserved content — same labels, in the same order,
 * with nothing added or dropped (Req 3.6).
 *
 * Feature: portfolio-redesign, Property 3: Tech stack is preserved faithfully
 * Validates: Requirements 3.6
 */

describe("Tech stack is preserved faithfully (Property 3)", () => {
  it("rendered tech-stack labels equal the preserved content labels for every project", () => {
    expect(projects.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom<CaseStudyData>(...projects),
        (caseStudy) => {
          render(<CaseStudy caseStudy={caseStudy} />);
          try {
            const renderedLabels = screen
              .getAllByTestId("tech-stack-item")
              .map((el) => (el.textContent ?? "").trim());

            const expectedLabels = caseStudy.techStack.map(
              (item) => item.label
            );

            expect(renderedLabels).toEqual(expectedLabels);
          } finally {
            cleanup();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
