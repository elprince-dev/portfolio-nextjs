import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { projects } from "@/content/projects";
import type { DiagramSpec } from "@/content/types";

/**
 * Property 20: Informative images carry descriptive alt text.
 *
 * For any informative image or diagram defined in the content model, its alt
 * text is present and non-empty. In the content layer the informative visuals
 * with authored alt text are the project case-study diagrams (`DiagramSpec`).
 *
 * Feature: portfolio-redesign, Property 20: Informative images carry descriptive alt text
 * Validates: Requirements 14.2
 */

const diagrams: DiagramSpec[] = projects
  .map((project) => project.diagram)
  .filter((diagram): diagram is DiagramSpec => diagram !== undefined);

describe("Informative images carry descriptive alt text (Property 20)", () => {
  it("every content-model diagram has non-empty descriptive alt text", () => {
    // Sanity: there is at least one diagram to quantify over.
    expect(diagrams.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        // Quantify over each diagram defined in the projects content.
        fc.constantFrom(...diagrams),
        (diagram) => {
          expect(typeof diagram.alt).toBe("string");
          expect(diagram.alt.trim().length).toBeGreaterThan(0);
        },
      ),
      { numRuns: 100 },
    );
  });
});
