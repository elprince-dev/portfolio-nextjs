import type { CSSProperties } from "react";

/**
 * Marquee — an infinitely scrolling ticker band of keywords, as seen at the
 * bottom of the hero. Purely decorative: the whole band is `aria-hidden` so
 * screen readers skip the repeated keyword noise, and the CSS animation is
 * disabled under `prefers-reduced-motion` (see `.marquee` in globals.css).
 *
 * The track is rendered twice so the -50% translate loop is seamless.
 */

export interface MarqueeProps {
  /** Keywords to scroll, joined with a dot separator. */
  items: string[];
  /** Reverses the scroll direction (used to alternate stacked bands). */
  reverse?: boolean;
  /** Seconds for one full loop; lower is faster. Defaults to 30. */
  duration?: number;
  /** Extra classes for the outer band (background, borders, padding). */
  className?: string;
}

export function Marquee({
  items,
  reverse = false,
  duration = 30,
  className = "",
}: MarqueeProps) {
  const group = (
    <div className="marquee-track gap-8 pe-8">
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.15em]"
        >
          {item}
          <span className="text-[0.55em] opacity-60">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      data-direction={reverse ? "reverse" : "forward"}
      className={`marquee ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {group}
      {group}
    </div>
  );
}

export default Marquee;
