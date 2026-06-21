import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

import { credibility } from "@/content/credibility";
import { experienceStages } from "@/content/experience";
import { skills } from "@/content/skills";
import { aiCapabilities } from "@/content/ai";
import { engineeringDepthAreas } from "@/content/engineering";
import { projects } from "@/content/projects";
import type { AICapabilityKey, ExpertiseDomain } from "@/content/types";

/**
 * Example tests for content correspondence (Task 5.8).
 *
 * Concrete (non-property) assertions that pin down the authored content against
 * the preserved source material and the required content structure:
 *  - metric values match preserved resume/site content (Req 2.4)
 *  - required experience stages are present (Req 7.2)
 *  - required skill domains are present (Req 8.1)
 *  - all AI capability keys are present (Req 5.1)
 *  - engineering depth areas and evidence are present (Req 6.1, 6.2)
 *  - referenced project assets exist in /public (Req 16.3)
 *
 * Requirements: 2.4, 5.1, 6.1, 6.2, 7.2, 8.1, 16.3
 */

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, "../..");
const publicDir = resolve(repoRoot, "public");

// ---------------------------------------------------------------------------
// Req 2.4 — metric values match preserved resume/site content
// ---------------------------------------------------------------------------

describe("credibility metric values match preserved content (Req 2.4)", () => {
  // Preserved quantified values from the resume (15+ serverless apps, 100% test
  // coverage) and the existing AboutSection stats (2+ years, 15+ projects, 20+
  // technologies).
  const preservedMetricValues = new Set(["2+", "15+", "20+", "100%"]);

  it("every displayed metric value corresponds to a preserved value", () => {
    for (const metric of credibility.metrics) {
      expect(preservedMetricValues.has(metric.value)).toBe(true);
    }
  });

  it("includes the headline preserved metrics (15+ and 100%)", () => {
    const values = credibility.metrics.map((metric) => metric.value);
    expect(values).toContain("15+");
    expect(values).toContain("100%");
  });
});

// ---------------------------------------------------------------------------
// Req 7.2 — required experience stages present
// ---------------------------------------------------------------------------

describe("required experience stages are present (Req 7.2)", () => {
  const hasStage = (predicate: (text: string) => boolean): boolean =>
    experienceStages.some((stage) =>
      predicate(
        `${stage.title} ${stage.organization} ${stage.description ?? ""}`.toLowerCase(),
      ),
    );

  it("includes the Mechanical Engineering education stage", () => {
    expect(
      hasStage(
        (text) =>
          text.includes("mechanical engineering") &&
          text.includes("guelph"),
      ),
    ).toBe(true);
  });

  it("includes the Flatiron School bootcamp stage", () => {
    expect(hasStage((text) => text.includes("flatiron"))).toBe(true);
  });

  it("includes the Amazon operations stage", () => {
    expect(
      hasStage(
        (text) => text.includes("amazon") && text.includes("operations"),
      ),
    ).toBe(true);
  });

  it("includes the Amazon software development stage", () => {
    expect(
      hasStage(
        (text) =>
          text.includes("amazon") && text.includes("software development"),
      ),
    ).toBe(true);
  });

  it("includes the AI Engineering focus stage", () => {
    expect(hasStage((text) => text.includes("ai engineering"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Req 8.1 — required skill domains present
// ---------------------------------------------------------------------------

describe("required skill domains are present (Req 8.1)", () => {
  it("groups skills into Backend, Frontend, Cloud, AI, and Databases domains", () => {
    const requiredDomains: ExpertiseDomain[] = [
      "Backend",
      "Frontend",
      "Cloud",
      "AI",
      "Databases",
    ];
    for (const domain of requiredDomains) {
      expect(skills.domains).toContain(domain);
      // Each required domain has at least one preserved skill entry.
      expect(skills.entries.some((entry) => entry.domain === domain)).toBe(
        true,
      );
    }
  });
});

// ---------------------------------------------------------------------------
// Req 5.1 — all AI capability keys present
// ---------------------------------------------------------------------------

describe("all AI capability keys are present (Req 5.1)", () => {
  it("presents all six required capability areas", () => {
    const requiredKeys: AICapabilityKey[] = [
      "rag",
      "llm-applications",
      "agents",
      "retrieval-embedding-pipelines",
      "tool-calling",
      "evaluation-pipelines",
    ];
    const presentKeys = aiCapabilities.map((area) => area.key);
    for (const key of requiredKeys) {
      expect(presentKeys).toContain(key);
    }
  });
});

// ---------------------------------------------------------------------------
// Req 6.1, 6.2 — engineering depth areas and evidence present
// ---------------------------------------------------------------------------

describe("engineering depth areas and evidence are present (Req 6.1, 6.2)", () => {
  it("presents the required engineering depth areas (Req 6.1)", () => {
    const titles = engineeringDepthAreas.map((area) => area.title.toLowerCase());
    for (const required of [
      "system design",
      "scalability",
      "cloud architecture",
      "aws services",
      "backend engineering",
    ]) {
      expect(titles).toContain(required);
    }
  });

  it("references concrete evidence for every depth area (Req 6.2)", () => {
    for (const area of engineeringDepthAreas) {
      expect(area.evidence.length).toBeGreaterThan(0);
      for (const evidence of area.evidence) {
        expect(evidence.trim().length).toBeGreaterThan(0);
      }
      // AWS services used are listed for each area.
      expect(area.awsServices.length).toBeGreaterThan(0);
    }
  });

  it("references the multi-region serverless platform evidence (Req 6.2)", () => {
    const corpus = engineeringDepthAreas
      .flatMap((area) => [area.description, ...area.evidence])
      .join(" ")
      .toLowerCase();
    expect(corpus).toContain("multi-region");
    expect(corpus).toContain("serverless");
  });
});

// ---------------------------------------------------------------------------
// Req 16.3 — referenced project assets exist in /public
// ---------------------------------------------------------------------------

describe("referenced project assets exist in /public (Req 16.3)", () => {
  it("every project image asset exists in the public directory", () => {
    for (const project of projects) {
      const assetPath = resolve(publicDir, project.imageAsset);
      expect(
        existsSync(assetPath),
        `missing image asset for "${project.slug}": ${project.imageAsset}`,
      ).toBe(true);
    }
  });

  it("every tech-stack icon asset exists in the public directory", () => {
    for (const project of projects) {
      for (const item of project.techStack) {
        if (!item.iconAsset) continue;
        const assetPath = resolve(publicDir, item.iconAsset);
        expect(
          existsSync(assetPath),
          `missing icon asset for "${project.slug}" / "${item.label}": ${item.iconAsset}`,
        ).toBe(true);
      }
    }
  });
});
