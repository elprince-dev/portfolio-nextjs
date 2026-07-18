import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import fc from "fast-check";
import { ProjectsSection } from "@/components/ProjectsSection";
import { projects } from "@/content/projects";
import type { CaseStudy as CaseStudyData } from "@/content/types";

/**
 * Property 4: Selecting a project reveals its full detail.
 *
 * For any featured project, selecting it renders the full case-study detail for
 * that same project — its problem, solution, architecture, tech stack,
 * challenges, and results (Req 3.7).
 *
 * Feature: portfolio-redesign, Property 4: Selecting a project reveals its full detail
 * Validates: Requirements 3.7
 */

describe("Selecting a project reveals its full detail (Property 4)", () => {
  it("selecting any featured project shows that same project's full case-study detail", () => {
    expect(projects.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom<CaseStudyData>(...projects),
        (project) => {
          const { container } = render(<ProjectsSection />);
          try {
            // Select the project from the list (select-to-detail interaction).
            const selectButton = container.querySelector(
              `[data-testid="project-select"][data-slug="${project.slug}"]`
            );
            expect(selectButton).not.toBeNull();
            fireEvent.click(selectButton as Element);

            // The detail panel shows the SAME project that was selected.
            const detail = container.querySelector(
              '[data-testid="case-study-detail"]'
            );
            expect(detail).not.toBeNull();
            expect(detail?.getAttribute("data-slug")).toBe(project.slug);

            // Full case-study detail is present: problem, solution, architecture.
            expect(screen.getByText(project.problem)).toBeInTheDocument();
            expect(screen.getByText(project.solution)).toBeInTheDocument();
            expect(
              screen.getByText(project.architectureOverview)
            ).toBeInTheDocument();

            // Tech stack rendered faithfully within the detail.
            const renderedLabels = screen
              .getAllByTestId("tech-stack-item")
              .map((el) => (el.textContent ?? "").trim());
            expect(renderedLabels).toEqual(
              project.techStack.map((item) => item.label)
            );

            // Challenges and results are all present.
            for (const challenge of project.challenges) {
              expect(screen.getByText(challenge)).toBeInTheDocument();
            }
            for (const result of project.results) {
              expect(screen.getByText(result)).toBeInTheDocument();
            }
          } finally {
            cleanup();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
