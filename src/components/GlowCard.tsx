"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";

/**
 * GlowCard — a card whose interior glows with a soft radial spotlight that
 * follows the pointer while hovered (About-section bento cards).
 *
 * The spotlight is a purely decorative overlay (`aria-hidden`, no pointer
 * events) that fades in on hover and tracks the cursor via the `--mx`/`--my`
 * custom properties. When `spotlightSecondary` is provided, the glow color
 * switches between `spotlight` (left half) and `spotlightSecondary` (right
 * half) based on the pointer position. It only moves in direct response to
 * the pointer, so nothing animates autonomously (Req 12.5).
 */

export interface GlowCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onMouseMove"> {
  /** Spotlight color (include alpha), e.g. "rgba(0,210,148,0.14)". */
  spotlight: string;
  /** Optional second color used while hovering the right half. */
  spotlightSecondary?: string;
  /**
   * When set, renders a `.border-beam` (bright segment traveling along the
   * border while hovered) in this color. Rendered as a direct child of the
   * group element, as the beam CSS requires.
   */
  beamColor?: string;
  /** Card shell classes (border, background, padding, hover effects). */
  className?: string;
  /** Optional static styles (e.g. an ambient background tint). */
  style?: CSSProperties;
  children: ReactNode;
}

export function GlowCard({
  spotlight,
  spotlightSecondary,
  beamColor,
  className = "",
  style,
  children,
  ...rest
}: GlowCardProps) {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    if (spotlightSecondary) {
      e.currentTarget.style.setProperty(
        "--spot-color",
        x < rect.width / 2 ? spotlight : spotlightSecondary,
      );
    }
  };

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), var(--spot-color, ${spotlight}), transparent 70%)`,
        }}
      />
      {beamColor && (
        <span
          aria-hidden="true"
          className="border-beam"
          style={{ "--stat-color": beamColor } as CSSProperties}
        />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default GlowCard;
