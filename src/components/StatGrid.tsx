"use client";

import type { CSSProperties, MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineCalendar,
  HiOutlineCube,
  HiOutlineLightningBolt,
  HiOutlineLocationMarker,
} from "react-icons/hi";

/**
 * StatGrid — the About-section credibility counters (Req 2.3) as floating
 * glass cards.
 *
 * Each card: a glassmorphism tile bobbing gently up and down (staggered), a
 * dashed ring spinning clockwise around the value with two faster
 * counter-rotating particles, and on hover a strong pointer-following glow
 * in the stat's own color, a traveling border beam, and a rose outer glow.
 * The bobbing/orbit/beam loops are user-approved exceptions to the
 * no-looping-effects rule and are disabled under prefers-reduced-motion.
 */

export interface StatGridProps {
  metrics: { value: string; label: string }[];
}

/** Per-metric accent color and icon. */
const STAT_STYLES: { color: string; icon: IconType }[] = [
  { color: "#d4547e", icon: HiOutlineCube },
  { color: "#38bdf8", icon: HiOutlineLocationMarker },
  { color: "#00d294", icon: HiOutlineCalendar },
  { color: "#f59e0b", icon: HiOutlineLightningBolt },
];

function onMouseMove(e: MouseEvent<HTMLLIElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function StatGrid({ metrics }: StatGridProps) {
  return (
    <ul
      data-testid="credibility-metrics"
      className="drift-gradient mt-4 grid grid-cols-2 gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:mt-5 sm:gap-5 sm:p-5 lg:grid-cols-4"
      role="list"
    >
      {metrics.map((metric, i) => {
        const style = STAT_STYLES[i % STAT_STYLES.length];
        const StatIcon = style.icon;
        return (
          <li
            key={metric.label}
            onMouseMove={onMouseMove}
            style={
              {
                "--stat-color": style.color,
                animationDelay: `${i * 0.8}s`,
              } as CSSProperties
            }
            className="stat-float group relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.55)] px-4 py-8 text-center backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--stat-color)] hover:shadow-[0_0_45px_rgba(224,36,94,0.4)] dark:border-[rgba(255,255,255,0.06)] dark:bg-[rgba(0,0,0,0.55)]"
          >
            {/* Hover glow: strong pointer-following spotlight plus an
                ambient center wash, both in the stat's color. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  `radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), ${style.color}66, transparent 70%), ` +
                  `radial-gradient(160px at 50% 40%, ${style.color}33, transparent 75%)`,
              }}
            />
            {/* Traveling border beam. */}
            <span aria-hidden="true" className="border-beam" />

            {/* Stat value ringed by a spinning dashed circle with two
                counter-rotating particles. */}
            <span className="relative flex h-24 w-24 items-center justify-center">
              <span aria-hidden="true" className="orbit-ring" />
              <span
                className="relative text-2xl font-black"
                style={{
                  color: style.color,
                  textShadow: `0 0 24px ${style.color}40`,
                }}
              >
                {metric.value}
              </span>
              <span aria-hidden="true" className="orbit-dot" />
              <span aria-hidden="true" className="orbit-dot orbit-dot--alt" />
            </span>
            <span className="relative flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
              <StatIcon aria-hidden="true" style={{ color: style.color }} />
              {metric.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default StatGrid;
