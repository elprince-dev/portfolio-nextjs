"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/lib/sections";

/**
 * Tracks which section is currently in view using an `IntersectionObserver`,
 * driving the Navigation's active-section indication (Requirement 4.5).
 *
 * The hook observes the DOM elements whose ids match the supplied section ids
 * and reports the id of the section with the greatest visible area. It is
 * SSR-safe (returns `null` until mounted) and degrades gracefully when
 * `IntersectionObserver` is unavailable.
 *
 * @param ids - The section ids to observe, in navigation order.
 * @returns The id of the section currently in view, or `null` if none.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  // Serialize the ids so the effect re-runs only when the set actually changes,
  // not on every render that produces a fresh array reference.
  const idsKey = ids.join("|");

  useEffect(() => {
    if (
      typeof document === "undefined" ||
      typeof IntersectionObserver !== "function"
    ) {
      return;
    }

    const sectionIds = idsKey ? (idsKey.split("|") as SectionId[]) : [];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    // Track the visible ratio of each intersecting section and surface the
    // most-visible one as active.
    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }

        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of visibleRatios) {
          if (best === null || ratio > best.ratio) {
            best = { id, ratio };
          }
        }

        if (best !== null) {
          setActiveId(best.id as SectionId);
        }
      },
      {
        // Bias detection toward the section occupying the vertical center of
        // the viewport so the active item matches what the visitor is reading.
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
