/**
 * Experience timeline ordering.
 *
 * Pure logic over `ExperienceStage` content that orders career stages
 * chronologically for the Experience section (Requirement 7.1).
 */
import type { ExperienceStage } from "@/content/types";

/**
 * Sort experience stages chronologically by `startDate` in nondecreasing
 * (ascending) order, from earliest to most recent.
 *
 * Does not mutate the input array; a new sorted array is returned. `startDate`
 * values are ISO date strings compared by their parsed time value so ordering
 * is correct regardless of string formatting differences.
 *
 * Requirements: 7.1
 */
export function sortStagesChronologically(
  stages: ExperienceStage[],
): ExperienceStage[] {
  return [...stages].sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}
