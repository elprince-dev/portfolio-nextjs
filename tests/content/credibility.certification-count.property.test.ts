import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { credibility } from "@/content/credibility";

/**
 * Property 13: Credibility certification count matches the named list.
 *
 * For any CredibilityContent, the `awsCertificationCount` equals the number of
 * named AWS certifications, and that list includes the AWS Solutions Architect
 * Associate and AWS Cloud Practitioner certifications.
 *
 * Feature: portfolio-redesign, Property 13: Credibility certification count matches the named list
 * Validates: Requirements 2.2
 */

/** Lowercase + collapse whitespace for tolerant name matching. */
function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

describe("Credibility certification count matches the named list (Property 13)", () => {
  it("count equals the number of named certifications and includes the two required certs", () => {
    fc.assert(
      fc.property(
        // Quantify over each required certification keyword.
        fc.constantFrom(
          "solutions architect associate",
          "cloud practitioner",
        ),
        (requiredKeyword) => {
          // The count is exactly the length of the named list.
          expect(credibility.awsCertificationCount).toBe(
            credibility.awsCertifications.length,
          );

          // The named list includes the required certification.
          const present = credibility.awsCertifications.some((name) =>
            normalize(name).includes(requiredKeyword),
          );
          expect(present).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});
