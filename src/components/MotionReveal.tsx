"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { getRevealVariants, usePrefersReducedMotion } from "@/lib/motion";

/**
 * MotionReveal — the shared entrance-animation wrapper (Req 12.1, 12.3, 12.4).
 *
 * Wraps its children in a `motion.div` whose entrance variants come from
 * {@link getRevealVariants}, driven by the live reduced-motion preference from
 * {@link usePrefersReducedMotion}. When a section/element scrolls into the
 * viewport it animates from its `hidden` to its `visible` variant (Req 12.1);
 * when the visitor prefers reduced motion the variants carry no positional or
 * opacity entrance motion (Req 12.3). All durations are bounded by the 600ms
 * ceiling enforced inside `getRevealVariants` (Req 12.4).
 *
 * The component owns no business rules — it is purely a presentation wrapper
 * that consumes the motion logic layer.
 */

type MotionDivProps = ComponentPropsWithoutRef<typeof motion.div>;

export interface MotionRevealProps
  extends Omit<MotionDivProps, "variants" | "initial" | "whileInView"> {
  /**
   * Animation complexity. `simple` uses a shorter (< 600ms) entrance; `standard`
   * uses the full (<= 600ms) entrance. Defaults to `standard`.
   */
  complexity?: "simple" | "standard";
  /**
   * Fraction of the element that must be visible before the entrance triggers.
   * Forwarded to framer-motion's `viewport.amount`.
   */
  amount?: number;
  children: ReactNode;
}

export function MotionReveal({
  complexity = "standard",
  amount = 0.2,
  children,
  ...rest
}: MotionRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion, complexity);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default MotionReveal;
