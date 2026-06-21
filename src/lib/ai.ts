/**
 * AI Engineering capability classification.
 *
 * Pure logic over `AICapabilityArea` content that drives the
 * project-vs-described-competency distinction in the AI Engineering section
 * (Requirements 5.2–5.5).
 */
import type { AICapabilityArea } from "@/content/types";

/**
 * The form in which an AI capability area is presented:
 * - `"project"`    — backed by a supplied project only.
 * - `"competency"` — described competency only (no supplied project).
 * - `"both"`       — backed by a supplied project AND a described competency.
 */
export type CapabilityForm = "project" | "competency" | "both";

/**
 * Classify how an AI capability area should be presented based on the evidence
 * it carries.
 *
 * - Returns `"both"` when a supplied project exists AND the competency
 *   description is non-empty.
 * - Returns `"project"` when only a supplied project exists (no/empty
 *   competency description).
 * - Returns `"competency"` when only a competency description exists (no
 *   supplied project).
 *
 * In the current content model `competencyDescription` is always present, so in
 * practice a present `project` yields `"both"` and an absent `project` yields
 * `"competency"`. The full three-way logic is implemented faithfully so the
 * classification remains correct if a project is ever supplied without a
 * description.
 *
 * Requirements: 5.2, 5.3, 5.4, 5.5
 */
export function classifyCapability(area: AICapabilityArea): CapabilityForm {
  const hasProject = area.project !== undefined;
  const hasCompetency = area.competencyDescription.trim().length > 0;

  if (hasProject && hasCompetency) {
    return "both";
  }
  if (hasProject) {
    return "project";
  }
  return "competency";
}
