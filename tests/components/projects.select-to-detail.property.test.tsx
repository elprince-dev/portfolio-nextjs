import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import fc from "fast-check";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { projects } from "@/content/projects";
import type { CaseStudy as CaseStudyData } from "@/content/types";

/**
 * Property 4: Selecting a project reveals its full detail.
 *
 * For any featured project, its card links to that project's dedicated page
 * (/projects/[slug]), and that page renders the full case-study detail for
 * the same project — its problem, solution, architecture, tech stack,
 * challenges, and results (Req 3.7).
 *
 * Feature: portfolio-redesign, Property 4: Selecting a project reveals its full detail
 * Validates: Requirements 3.7
 */

describe("Selecting a project reveals its full detail (Property 4)", () => {
  it("every featured project card links to that project's dedicated page", () => {
    expect(projects.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom<CaseStudyData>(...projects), (project) => {
        const { container } = render(<ProjectsSection />);
        try {
          const card = container.querySelector(
            `[data-testid="project-select"][data-slug="${project.slug}"]`,
          );
          expect(card).not.toBeNull();
          // The card is a link to the project's dedicated detail page
          // (locale-prefixed; components default to the "en" locale).
          expect(card?.getAttribute("href")).toBe(
            `/en/projects/${project.slug}`,
          );
        } finally {
          cleanup();
        }
      }),
      { numRuns: 100 },
    );
  });

  it("the project page shows that same project's full case-study detail", () => {
    fc.assert(
      fc.property(fc.constantFrom<CaseStudyData>(...projects), (project) => {
        render(<ProjectDetailPage project={project} />);
        try {
          // Full case-study detail is present: problem, solution, architecture.
          expect(screen.getByText(project.problem)).toBeInTheDocument();
          expect(screen.getByText(project.solution)).toBeInTheDocument();
          expect(
            screen.getByText(project.architectureOverview),
          ).toBeInTheDocument();

          // Tech stack rendered faithfully — same labels, same order.
          const renderedLabels = screen
            .getAllByTestId("tech-stack-item")
            .map((el) => (el.textContent ?? "").trim());
          expect(renderedLabels).toEqual(
            project.techStack.map((item) => item.label),
          );

          // Challenges and results are all present.
          for (const challenge of project.challenges) {
            expect(screen.getByText(challenge)).toBeInTheDocument();
          }
          for (const result of project.results) {
            expect(screen.getByText(result)).toBeInTheDocument();
          }

          // Link policy (Req 3.4, 3.5): confidential pages expose no
          // source/demo links and show the confidentiality indicator.
          if (project.confidential) {
            expect(
              screen.getByTestId("confidentiality-indicator"),
            ).toBeInTheDocument();
            const externalLinks = screen
              .queryAllByRole("link")
              .map((el) => el.getAttribute("href") ?? "")
              .filter((href) => href.startsWith("http"));
            expect(externalLinks).toHaveLength(0);
          }
        } finally {
          cleanup();
        }
      }),
      { numRuns: 100 },
    );
  });
});
