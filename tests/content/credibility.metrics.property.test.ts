import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { credibility } from "@/content/credibility";

/**
 * Property 14: Credibility presents at least three well-formed metrics.
 *
 * For any CredibilityContent, there are at least three metrics, and every
 * metric has a numeric value and a non-empty descriptive label.
 *
 * Feature: portfolio-redesign, Property 14: Credibility presents at least three well-formed metrics
 * Validates: Requirements 2.3
 */

describe("Credibility presents at least three well-formed metrics (Property 14)", () => {
  it("presents at least three metrics", () => {
    expect(credibility.metrics.length).toBeGreaterThanOrEqual(3);
  });

  it("every metric carries a numeric value and a non-empty descriptive label", () => {
    fc.assert(
      fc.property(
        // Quantify over each metric in the credibility content.
        fc.constantFrom(...credibility.metrics),
        (metric) => {
          // Value is non-empty and contains a numeric component.
          expect(metric.value.trim().length).toBeGreaterThan(0);
          expect(/\d/.test(metric.value)).toBe(true);

          // Label is a non-empty descriptive string.
          expect(metric.label.trim().length).toBeGreaterThan(0);
        },
      ),
      { numRuns: 100 },
    );
  });
});
