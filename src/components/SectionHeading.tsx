/**
 * SectionHeading — shared editorial heading for home-page sections: a large
 * bold title with a short rose underline bar beneath it. Renders an `<h2>`
 * to preserve the single-h1 heading hierarchy (Req 14.6).
 */

export interface SectionHeadingProps {
  /** The section title (h2). */
  title: string;
  /** Optional small uppercase mono eyebrow above the title. */
  eyebrow?: string;
  /** Optional muted subtitle line under the title, above the rose bar. */
  subtitle?: string;
  /** Optional centered layout; defaults to left-aligned. */
  centered?: boolean;
}

export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-sans text-4xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--color-text-secondary)]">{subtitle}</p>
      )}
      <span
        aria-hidden="true"
        className={`mt-4 block h-1.5 w-14 rounded-full bg-[var(--color-accent)] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

export default SectionHeading;
