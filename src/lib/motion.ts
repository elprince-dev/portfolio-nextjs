"use client";

import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

/**
 * Media query string for the OS/browser reduced-motion preference.
 */
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Entrance-animation durations expressed in seconds (framer-motion convention).
 *
 * The Motion_System must complete each entrance animation within 600ms and use
 * strictly less than 600ms for simpler animations (Req 12.4):
 *   - `simple`   -> 0.4s  (strictly < 0.6s)
 *   - `standard` -> 0.6s  (<= 0.6s)
 */
const REVEAL_DURATIONS: Record<"simple" | "standard", number> = {
  simple: 0.4,
  standard: 0.6,
};

/**
 * React hook that tracks the `(prefers-reduced-motion: reduce)` media query.
 *
 * SSR-safe: returns `false` during server rendering and the first client render
 * (when `window`/`matchMedia` are unavailable), then synchronizes with the live
 * media query on mount and updates whenever the preference changes.
 *
 * Requirement 12.3.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Build the entrance-reveal variants for a section/element.
 *
 * When `reduced` is true the returned variants contain no positional or opacity
 * entrance motion and no looping animation — the element is simply present in its
 * final state (Req 12.3).
 *
 * When `reduced` is false the element fades and slides into place with a duration
 * bounded by the 600ms ceiling: strictly < 0.6s for `simple` complexity and
 * <= 0.6s for `standard` complexity (Req 12.1, 12.4).
 */
export function getRevealVariants(
  reduced: boolean,
  complexity: "simple" | "standard"
): Variants {
  if (reduced) {
    // No positional/opacity entrance motion and no looping animation.
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }

  const duration = REVEAL_DURATIONS[complexity];

  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: "easeOut" },
    },
  };
}
