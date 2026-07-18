"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Clock — decorative analog clock widget (About-section centerpiece).
 *
 * A large watch-style face: glossy multi-ring bezel, arrow hour markers
 * pointing inward, bold white hands, a smoothly sweeping red second hand
 * (driven by requestAnimationFrame with millisecond precision), a moon-phase
 * subdial on the left, a date chip on the right, and a place label. The face
 * is `aria-hidden` decoration. Under prefers-reduced-motion the second hand
 * is hidden and the face only updates once per minute (Req 12.3). Time is
 * only rendered after mount so server and client markup match.
 */

export interface ClockProps {
  /** Small place label under the face. */
  label: string;
}

// ---------------------------------------------------------------------------
// Lunar phase
// ---------------------------------------------------------------------------

const SYNODIC_DAYS = 29.53058867;
/** Reference new moon: 2000-01-06 18:14 UTC. */
const NEW_MOON_EPOCH = Date.UTC(2000, 0, 6, 18, 14);

/** Moon phase in [0,1): 0 = new, 0.25 = first quarter, 0.5 = full. */
function moonPhase(date: Date): number {
  const days = (date.getTime() - NEW_MOON_EPOCH) / 86_400_000;
  const p = (days % SYNODIC_DAYS) / SYNODIC_DAYS;
  return p < 0 ? p + 1 : p;
}

/**
 * SVG path of the illuminated part of the moon disc for phase `p`: an outer
 * semicircle on the lit side closed by a semi-elliptical terminator whose
 * horizontal radius is |cos(2πp)|.
 */
function moonLitPath(p: number, cx: number, cy: number, r: number): string {
  const rx = (Math.abs(Math.cos(2 * Math.PI * p)) * r).toFixed(2);
  const litRight = p < 0.5;
  const bulgeRight = p < 0.25 || (p >= 0.5 && p < 0.75);
  const outerSweep = litRight ? 1 : 0;
  const returnSweep = bulgeRight ? 0 : 1;
  return (
    `M ${cx} ${cy - r} ` +
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} ` +
    `A ${rx} ${r} 0 0 ${returnSweep} ${cx} ${cy - r} Z`
  );
}

/** Arrow-style hour marker pointing toward the center, drawn at 12 o'clock. */
function ArrowMarker({ angle, major }: { angle: number; major: boolean }) {
  return (
    <g transform={`rotate(${angle} 130 130)`} opacity={major ? 1 : 0.7}>
      {/* Shaft */}
      <line
        x1="130"
        y1="26"
        x2="130"
        y2={major ? "44" : "38"}
        stroke="var(--color-text-primary)"
        strokeWidth={major ? 3 : 2}
        strokeLinecap="round"
      />
      {/* Inward-pointing head */}
      <path
        d={
          major
            ? "M 130 52 L 124 42 L 136 42 Z"
            : "M 130 45 L 126 38 L 134 38 Z"
        }
        fill="var(--color-text-primary)"
      />
    </g>
  );
}

export function Clock({ label }: ClockProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    if (prefersReducedMotion) {
      const id = setInterval(() => setNow(new Date()), 60_000);
      return () => clearInterval(id);
    }
    // Smooth sweep: refresh every animation frame with ms precision.
    let raf: number;
    const loop = () => {
      setNow(new Date());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  // 10:08:30 as the classic static face before mount.
  const hours = now?.getHours() ?? 10;
  const minutes = now?.getMinutes() ?? 8;
  const seconds = now?.getSeconds() ?? 30;
  const millis = now?.getMilliseconds() ?? 0;
  const date = now?.getDate();

  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = (seconds + millis / 1000) * 6;

  return (
    <div
      aria-hidden="true"
      className="rounded-full shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
    >
      <svg viewBox="0 0 260 260" className="h-80 w-80 sm:h-[24rem] sm:w-[24rem]">
        <defs>
          {/* Glossy metallic bezel (theme-aware). */}
          <linearGradient id="clock-bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--widget-bezel-hi)" />
            <stop offset="35%" stopColor="var(--widget-bezel-mid)" />
            <stop offset="100%" stopColor="var(--widget-bezel-lo)" />
          </linearGradient>
        </defs>

        {/* Bezel rings */}
        <circle cx="130" cy="130" r="129" fill="url(#clock-bezel)" />
        <circle cx="130" cy="130" r="121" fill="var(--widget-ring)" />
        <circle
          cx="130"
          cy="130"
          r="113"
          fill="var(--widget-face)"
          stroke="var(--widget-face-stroke)"
          strokeWidth="1.5"
        />

        {/* Minute ticks */}
        {Array.from({ length: 60 }, (_, i) =>
          i % 5 === 0 ? null : (
            <line
              key={i}
              x1="130"
              y1="22"
              x2="130"
              y2="27"
              stroke="var(--color-text-muted)"
              strokeWidth="1"
              transform={`rotate(${i * 6} 130 130)`}
            />
          ),
        )}

        {/* Arrow hour markers */}
        {Array.from({ length: 12 }, (_, i) => (
          <ArrowMarker key={i} angle={i * 30} major={i % 3 === 0} />
        ))}

        {/* Moon-phase subdial (left of center): the real lunar phase. */}
        <circle
          cx="88"
          cy="130"
          r="17"
          fill="var(--widget-inset)"
          stroke="var(--widget-face-stroke)"
        />
        <circle cx="88" cy="130" r="9" fill="var(--moon-unlit)" />
        <path
          d={moonLitPath(moonPhase(now ?? new Date(NEW_MOON_EPOCH)), 88, 130, 9)}
          fill="var(--moon-lit)"
        />
        {/* Tiny stars */}
        <circle cx="80" cy="123" r="0.9" fill="#9a9aa4" />
        <circle cx="82" cy="138" r="0.7" fill="#9a9aa4" />

        {/* Date chip (right of center) */}
        {date !== undefined && (
          <>
            <rect
              x="160"
              y="119"
              width="26"
              height="22"
              rx="4"
              fill="var(--widget-inset)"
              stroke="var(--widget-face-stroke)"
            />
            <text
              x="173"
              y="135"
              textAnchor="middle"
              fontSize="13"
              fontWeight="bold"
              fill="var(--color-text-primary)"
            >
              {date}
            </text>
          </>
        )}

        {/* Place label */}
        <text
          x="130"
          y="196"
          textAnchor="middle"
          fontSize="10"
          letterSpacing="4"
          fill="var(--color-text-muted)"
        >
          {label.toUpperCase()}
        </text>

        {/* Hands */}
        <line
          x1="130"
          y1="138"
          x2="130"
          y2="72"
          stroke="var(--color-text-primary)"
          strokeWidth="7"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 130 130)`}
        />
        <line
          x1="130"
          y1="140"
          x2="130"
          y2="44"
          stroke="var(--color-text-primary)"
          strokeWidth="4.5"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 130 130)`}
        />
        {!prefersReducedMotion && (
          <g transform={`rotate(${secondAngle} 130 130)`}>
            <line
              x1="130"
              y1="148"
              x2="130"
              y2="38"
              stroke="#e0245e"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="130" cy="148" r="4" fill="#e0245e" />
          </g>
        )}
        <circle cx="130" cy="130" r="6" fill="var(--color-text-primary)" />
        <circle cx="130" cy="130" r="2.5" fill="var(--widget-face)" />
      </svg>
    </div>
  );
}

export default Clock;
