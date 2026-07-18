import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { engineeringDepthAreas } from "@/content/engineering";
import { skills } from "@/content/skills";

/**
 * Property 9: AWS service labels are consistent with Skills terminology.
 *
 * For any engineering depth area, every AWS service label it references also
 * appears as a label (skill-entry name) in the Skills content.
 *
 * Feature: portfolio-redesign, Property 9: AWS service labels are consistent with Skills terminology
 * Validates: Requirements 6.3
 */

const skillLabels = new Set(skills.entries.map((entry) => entry.name));

const referencedAwsServices = engineeringDepthAreas.flatMap(
  (area) => area.awsServices,
);

describe("AWS service labels are consistent with Skills terminology (Property 9)", () => {
  it("every referenced AWS service label exists as a Skills entry label", () => {
    // Sanity: there is at least one AWS service label to quantify over.
    expect(referencedAwsServices.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        // Quantify over each AWS service label referenced by any depth area.
        fc.constantFrom(...referencedAwsServices),
        (awsServiceLabel) => {
          expect(skillLabels.has(awsServiceLabel)).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});
