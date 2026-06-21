import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { experienceStages } from "@/content/experience";
import { sortStagesChronologically } from "@/lib/experience";

/**
 * ExperienceSection — the chronological career timeline (Req 7.1–7.4).
 *
 * Renders the career stages in chronological order from earliest to most recent
 * via {@link sortStagesChronologically} (Req 7.1). Each stage displays its
 * title, associated organization or institution, and a time reference (Req 7.3),
 * and the included stages and their time references are sourced from the typed
 * content so they match the preserved resume content (Req 7.2, 7.4).
 */

export function ExperienceSection() {
  const stages = sortStagesChronologically(experienceStages);

  return (
    <section
      id="experience"
      aria-label="Experience timeline"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        Experience
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <MotionReveal complexity="standard" className="mx-auto max-w-3xl">
        <ol
          data-testid="experience-timeline"
          className="relative border-l border-[var(--color-border)] pl-6"
          role="list"
        >
          {stages.map((stage, index) => (
            <li
              key={`${stage.title}-${stage.startDate}`}
              data-testid="experience-stage"
              className="mb-8 last:mb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-[var(--color-accent)]"
              />
              <Surface variant="elevated" className="rounded-2xl p-5">
                <p
                  data-testid="experience-time-reference"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]"
                >
                  {stage.timeReference}
                </p>
                <h3
                  data-testid="experience-title"
                  className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]"
                >
                  {stage.title}
                </h3>
                <p
                  data-testid="experience-organization"
                  className="text-[var(--color-text-secondary)]"
                >
                  {stage.organization}
                </p>
                {stage.description && (
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    {stage.description}
                  </p>
                )}
              </Surface>
            </li>
          ))}
        </ol>
      </MotionReveal>
    </section>
  );
}

export default ExperienceSection;
