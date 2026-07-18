import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { classifyCapability } from "@/lib/ai";
import type { AICapabilityArea, AICapabilityKey, CaseStudy } from "@/content/types";

const keyArb = fc.constantFrom<AICapabilityKey>(
  "rag",
  "llm-applications",
  "agents",
  "retrieval-embedding-pipelines",
  "tool-calling",
  "evaluation-pipelines",
);

// A minimal but structurally valid CaseStudy; its internals do not affect
// classification, only its presence/absence does.
const caseStudyArb: fc.Arbitrary<CaseStudy> = fc.record({
  slug: fc.string(),
  name: fc.string(),
  problem: fc.string(),
  solution: fc.string(),
  architectureOverview: fc.string(),
  techStack: fc.constant([]),
  challenges: fc.constant([]),
  results: fc.constant([]),
  confidential: fc.boolean(),
  imageAsset: fc.string(),
});

// Description generator that intentionally includes empty and whitespace-only
// strings so the "no competency" branch is exercised alongside real text.
const descriptionArb = fc.oneof(
  fc.constant(""),
  fc.constant("   "),
  fc.string({ minLength: 1, maxLength: 40 }),
);

const areaArb: fc.Arbitrary<AICapabilityArea> = fc.record({
  key: keyArb,
  title: fc.string(),
  competencyDescription: descriptionArb,
  project: fc.option(caseStudyArb, { nil: undefined }),
});

describe("classifyCapability (Property 8)", () => {
  // Feature: portfolio-redesign, Property 8: AI capability areas are classified and presented by evidence
  // Validates: Requirements 5.2, 5.3, 5.4, 5.5
  it("classifies by the evidence present: project, competency, or both", () => {
    fc.assert(
      fc.property(areaArb, (area) => {
        const hasProject = area.project !== undefined;
        const hasCompetency = area.competencyDescription.trim().length > 0;

        const expected = hasProject
          ? hasCompetency
            ? "both"
            : "project"
          : "competency";

        expect(classifyCapability(area)).toBe(expected);
      }),
      { numRuns: 100 },
    );
  });
});
