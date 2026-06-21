import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { CaseStudy } from "@/components/CaseStudy";
import { aiCapabilities } from "@/content/ai";
import { classifyCapability } from "@/lib/ai";

/**
 * AIEngineeringSection — AI engineering capability areas (Req 5.1–5.5).
 *
 * Presents all six required capability areas (Req 5.1). For each area,
 * {@link classifyCapability} decides how it is presented (Req 5.2–5.5):
 *   - `"project"`    — render the supplied project as a case study only.
 *   - `"competency"` — render the described competency without claiming a
 *     shipped project (Req 5.3).
 *   - `"both"`       — render both the described competency and the project
 *     case study (Req 5.5).
 *
 * The form is surfaced via a labeled badge so a project-backed area is visually
 * distinguished from a described competency (Req 5.4). With the current content
 * gap every area is a described competency.
 */

const FORM_LABEL = {
  project: "Shipped project",
  competency: "Described competency",
  both: "Project + competency",
} as const;

export function AIEngineeringSection() {
  return (
    <section
      id="ai-engineering"
      aria-label="AI engineering"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        AI Engineering
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <MotionReveal complexity="standard" className="mx-auto max-w-6xl">
        <ul className="grid gap-6 md:grid-cols-2" role="list">
          {aiCapabilities.map((area) => {
            const form = classifyCapability(area);
            const showCompetency = form === "competency" || form === "both";
            const showProject =
              (form === "project" || form === "both") && area.project;

            return (
              <li key={area.key}>
                <Surface
                  variant="elevated"
                  data-testid="ai-capability"
                  data-capability-key={area.key}
                  data-capability-form={form}
                  className="flex h-full flex-col gap-3 rounded-2xl p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      {area.title}
                    </h3>
                    {/* Project-vs-competency distinction (Req 5.4). */}
                    <span
                      data-testid="ai-capability-form-label"
                      className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]"
                    >
                      {FORM_LABEL[form]}
                    </span>
                  </div>

                  {showCompetency && (
                    <p className="text-[var(--color-text-secondary)]">
                      {area.competencyDescription}
                    </p>
                  )}

                  {showProject && area.project && (
                    <div className="mt-2 border-t border-[var(--color-border)] pt-4">
                      <CaseStudy caseStudy={area.project} />
                    </div>
                  )}
                </Surface>
              </li>
            );
          })}
        </ul>
      </MotionReveal>
    </section>
  );
}

export default AIEngineeringSection;
