import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { skills } from "@/content/skills";

/**
 * Property 12: Skills form a partition over domains.
 *
 * For any SkillsContent, grouping the skill entries by domain forms a
 * partition: every entry appears under exactly one domain group, and the union
 * of all domain groups equals the full set of entries.
 *
 * Feature: portfolio-redesign, Property 12: Skills form a partition over domains
 * Validates: Requirements 8.2, 8.3
 */

describe("Skills form a partition over domains (Property 12)", () => {
  it("declares a set of domains with no duplicates", () => {
    expect(new Set(skills.domains).size).toBe(skills.domains.length);
  });

  it("assigns every skill entry to exactly one declared domain", () => {
    fc.assert(
      fc.property(
        // Quantify over each skill entry.
        fc.constantFrom(...skills.entries),
        (entry) => {
          // The entry's domain is one of the declared domains...
          const matchingDomains = skills.domains.filter(
            (domain) => domain === entry.domain,
          );
          // ...and it matches exactly one (no entry lands in zero or multiple groups).
          expect(matchingDomains).toHaveLength(1);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("grouping by domain reconstitutes the full entry set without loss or overlap", () => {
    const groups = skills.domains.map((domain) =>
      skills.entries.filter((entry) => entry.domain === domain),
    );

    // Union of all groups has the same cardinality as the full entry set:
    // because domains are unique and each entry has a single domain, this
    // proves a partition (every entry counted exactly once).
    const groupedCount = groups.reduce((sum, group) => sum + group.length, 0);
    expect(groupedCount).toBe(skills.entries.length);

    // Every entry belongs to a declared domain (no orphaned entries).
    for (const entry of skills.entries) {
      expect(skills.domains).toContain(entry.domain);
    }
  });
});
