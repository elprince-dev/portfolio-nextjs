import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { credibility } from "@/content/credibility";

/**
 * CredibilitySection — trust signals shown early to establish credibility
 * (Req 2.1–2.3).
 *
 * Displays the current employer (Amazon) and role focus (Software Development)
 * (Req 2.1), the count of AWS certifications actually held together with their
 * names (Req 2.2), and at least three quantified credibility metrics, each with
 * a numeric value and a descriptive label (Req 2.3). All values come from the
 * typed credibility content so they stay consistent with the preserved resume
 * content (Req 2.4).
 */

export function CredibilitySection() {
  const { employer, roleFocus, awsCertificationCount, awsCertifications, metrics } =
    credibility;

  return (
    <section
      id="credibility"
      aria-label="Credibility and trust signals"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <MotionReveal complexity="standard" className="mx-auto max-w-6xl">
        {/* Employer / role focus (Req 2.1). */}
        <p className="text-center text-lg text-[var(--color-text-secondary)]">
          Currently{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {roleFocus}
          </span>{" "}
          at{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {employer}
          </span>
        </p>

        {/* Certification count + names (Req 2.2). */}
        <p
          data-testid="aws-certification-count"
          className="mt-2 text-center text-[var(--color-text-muted)]"
        >
          {awsCertificationCount} AWS certifications:{" "}
          {awsCertifications.join(" · ")}
        </p>

        {/* Quantified metrics (Req 2.3). */}
        <ul
          data-testid="credibility-metrics"
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          role="list"
        >
          {metrics.map((metric) => (
            <li key={metric.label}>
              <Surface
                variant="elevated"
                className="flex h-full flex-col items-center rounded-2xl p-6 text-center"
              >
                <span className="text-3xl font-bold text-[var(--color-accent)] sm:text-4xl">
                  {metric.value}
                </span>
                <span className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {metric.label}
                </span>
              </Surface>
            </li>
          ))}
        </ul>
      </MotionReveal>
    </section>
  );
}

export default CredibilitySection;
