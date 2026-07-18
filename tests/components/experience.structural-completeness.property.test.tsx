import { describe, it, expect } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import fc from "fast-check";
import { ExperienceSection } from "@/components/ExperienceSection";
import { experienceStages } from "@/content/experience";

/**
 * Property 11: Experience stages are structurally complete.
 *
 * For any ExperienceStage, the rendered output includes a non-empty title,
 * organization, and time reference.
 *
 * The ExperienceSection renders the authored experience content, so we quantify
 * over each rendered stage and assert that its title, organization, and time
 * reference are all present and non-empty in the rendered output.
 *
 * Feature: portfolio-redesign, Property 11: Experience stages are structurally complete
 * Validates: Requirements 7.3
 */

describe("Experience stages are structurally complete (Property 11)", () => {
  it("every rendered stage shows a non-empty title, organization, and time reference", () => {
    // Sanity: there is at least one stage to quantify over.
    expect(experienceStages.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...experienceStages), (stage) => {
        render(<ExperienceSection />);
        try {
          const rendered = screen.getAllByTestId("experience-stage");
          // Locate the rendered stage element carrying this stage's title.
          const match = rendered.find((el) =>
            within(el).queryByText(stage.title) !== null,
          );
          expect(match, `no rendered stage for "${stage.title}"`).toBeDefined();

          const scoped = within(match as HTMLElement);

          const title = scoped.getByTestId("experience-title");
          const organization = scoped.getByTestId("experience-organization");
          const timeReference = scoped.getByTestId("experience-time-reference");

          expect(title.textContent?.trim().length ?? 0).toBeGreaterThan(0);
          expect(organization.textContent?.trim().length ?? 0).toBeGreaterThan(0);
          expect(timeReference.textContent?.trim().length ?? 0).toBeGreaterThan(0);

          // And the rendered text matches the content values.
          expect(title).toHaveTextContent(stage.title);
          expect(organization).toHaveTextContent(stage.organization);
          expect(timeReference).toHaveTextContent(stage.timeReference);
        } finally {
          cleanup();
        }
      }),
      { numRuns: 100 },
    );
  });
});
