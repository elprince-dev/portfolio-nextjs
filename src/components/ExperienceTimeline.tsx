"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineCode,
  HiOutlineSparkles,
} from "react-icons/hi";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { ExperienceStage } from "@/content/types";

/**
 * ExperienceTimeline — the alternating career timeline (Req 7.1, 7.3).
 *
 * A central vertical line carries one colored icon node per stage; entries
 * alternate left/right of the line on desktop (single column on mobile). A
 * rose progress fill and glowing dot travel down the line as the visitor
 * scrolls — driven purely by scroll position (no autonomous animation), so
 * it is inherently reduced-motion friendly (Req 12.3).
 *
 * Rendering preserves the section's test contract: the ordered list exposes
 * `experience-timeline`, and each stage exposes `experience-stage`,
 * `experience-title`, `experience-organization`, and
 * `experience-time-reference`.
 */

export interface ExperienceTimelineProps {
  /** Stages already sorted chronologically (earliest first, Req 7.1). */
  stages: ExperienceStage[];
}

/** Per-stage accent color + node icon (applied in timeline order). */
const STAGE_STYLES: { color: string; icon: IconType }[] = [
  { color: "#d4547e", icon: HiOutlineAcademicCap },
  { color: "#38bdf8", icon: HiOutlineBriefcase },
  { color: "#00d294", icon: HiOutlineCode },
  { color: "#f59e0b", icon: HiOutlineChartBar },
  { color: "#a78bfa", icon: HiOutlineSparkles },
];

export function ExperienceTimeline({ stages }: ExperienceTimelineProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll-linked progress with easing: the target fraction tracks the
   * viewport center, while the displayed fraction lerps toward it each
   * frame for smooth trailing motion. Both the line fill and the dot grow
   * stronger and glowier as the fraction approaches 1. Under reduced motion
   * the displayed value snaps directly to the target (no trailing).
   */
  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number | null = null;
    let last = performance.now();

    const apply = (f: number) => {
      const progress = progressRef.current;
      const dot = dotRef.current;
      if (!progress || !dot) return;
      // The traveled trail is always a clearly visible pink line; progress
      // mainly ramps its thickness and glow so it reads stronger toward the
      // end of the section.
      progress.style.height = `${f * 100}%`;
      progress.style.opacity = `${0.75 + 0.25 * f}`;
      progress.style.width = `${2 + 1.5 * f}px`;
      progress.style.boxShadow = `0 0 ${4 + 12 * f}px rgba(224,90,140,${
        0.3 + 0.5 * f
      })`;
      // Dot: visible from the start, blazing with a wide halo at the end.
      dot.style.top = `${f * 100}%`;
      dot.style.opacity = `${0.7 + 0.3 * f}`;
      dot.style.transform = `translate(-50%, -50%) scale(${0.9 + 0.7 * f})`;
      dot.style.boxShadow = `0 0 ${8 + 26 * f}px ${2 + 4 * f}px rgba(224,90,140,${
        0.35 + 0.65 * f
      })`;
    };

    const measure = () => {
      const line = lineRef.current;
      if (!line) return;
      const rect = line.getBoundingClientRect();
      const anchor = window.innerHeight * 0.5;
      target = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (prefersReducedMotion) {
        current = target;
      } else {
        // Exponential ease toward the target (~120ms time constant).
        current += (target - current) * (1 - Math.exp(-dt / 120));
      }
      apply(current);
      if (Math.abs(target - current) > 0.0004) {
        rafId = requestAnimationFrame(tick);
      } else {
        current = target;
        apply(current);
        rafId = null;
      }
    };

    const schedule = () => {
      measure();
      if (rafId === null) {
        last = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative">
      {/* Central line, starting behind the first node's center. The
          progress fill and traveling dot live inside it so they share its
          coordinate space exactly. */}
      <div
        ref={lineRef}
        aria-hidden="true"
        className="absolute bottom-0 start-5 w-px bg-[var(--color-border)] opacity-70 md:start-1/2 md:ltr:-translate-x-1/2"
        style={{ top: "1.375rem" }}
      >
        <div
          ref={progressRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
          style={{ height: 0, width: 1, background: "#e05a8c" }}
        />
        {/* Traveling dot at the progress front. */}
        <div
          ref={dotRef}
          className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
          style={{ top: 0 }}
        />
      </div>

      <ol
        data-testid="experience-timeline"
        role="list"
        className="space-y-16 md:space-y-48"
      >
        {stages.map((stage, index) => {
          const style = STAGE_STYLES[index % STAGE_STYLES.length];
          const StageIcon = style.icon;
          const onLeft = index % 2 === 0;
          return (
            <li
              key={`${stage.title}-${stage.startDate}`}
              data-testid="experience-stage"
              className="relative md:grid md:grid-cols-2"
            >
              {/* Icon node on the line (left rail on mobile, center on md+),
                  scaling up on hover with perpetual ripple rings. */}
              <span
                aria-hidden="true"
                className="absolute start-5 top-0 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-white ring-4 ring-[var(--color-background)] transition-transform duration-300 hover:scale-125 rtl:translate-x-1/2 md:hidden"
                style={
                  {
                    backgroundColor: style.color,
                    boxShadow: `0 0 20px ${style.color}80`,
                    "--node-color": style.color,
                  } as CSSProperties
                }
              >
                <span className="node-ripple" />
                <span className="node-ripple node-ripple--late" />
                <StageIcon size={20} />
              </span>
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-10 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-white ring-4 ring-[var(--color-background)] transition-transform duration-300 hover:scale-125 md:flex"
                style={
                  {
                    backgroundColor: style.color,
                    boxShadow: `0 0 20px ${style.color}80`,
                    "--node-color": style.color,
                  } as CSSProperties
                }
              >
                <span className="node-ripple" />
                <span className="node-ripple node-ripple--late" />
                <StageIcon size={20} />
              </span>

              <div
                className={`ps-14 ${
                  onLeft
                    ? "md:col-start-1 md:pe-24 md:ps-0"
                    : "md:col-start-2 md:ps-24"
                }`}
              >
                <p
                  data-testid="experience-time-reference"
                  className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: style.color }}
                >
                  {stage.timeReference}
                </p>
                <h3
                  data-testid="experience-title"
                  className="mt-2 text-xl font-bold text-[var(--color-text-primary)]"
                >
                  {stage.title}
                </h3>
                <p
                  data-testid="experience-organization"
                  className="mt-0.5 text-sm font-semibold"
                  style={{ color: style.color }}
                >
                  {stage.organization}
                </p>
                {stage.description && (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {stage.description}
                  </p>
                )}
                {stage.skills && stage.skills.length > 0 && (
                  <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                    {stage.skills.join(" · ")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ExperienceTimeline;
