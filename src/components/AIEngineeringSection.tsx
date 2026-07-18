import type { CSSProperties } from "react";
import { GlowCard } from "@/components/GlowCard";
import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CaseStudy } from "@/components/CaseStudy";
import { classifyCapability } from "@/lib/ai";
import { localizedAICapabilities } from "@/i18n/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

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
 * The form is surfaced via a labeled badge so a project-backed area is
 * visually distinguished from a described competency (Req 5.4). Areas list
 * the concrete skills applied in Noor AI as pills.
 *
 * Cards share the glass treatment: translucent gradient + backdrop blur,
 * gray resting borders, and — per card — a distinct accent color driving the
 * cursor-following spotlight, the hover glow, and the traveling border beam.
 */

/** Form-badge labels come from the UI dictionary. */
const FORM_LABEL_KEY = {
  project: "shippedProject",
  competency: "describedCompetency",
  both: "projectAndCompetency",
} as const;

/** Per-card accent colors (spotlight / beam / hover glow). */
const AREA_COLORS: { solid: string; spotlight: string; glow: string }[] = [
  { solid: "#e0245e", spotlight: "rgba(224,36,94,0.13)", glow: "rgba(224,36,94,0.3)" },
  { solid: "#2dd4bf", spotlight: "rgba(45,212,191,0.13)", glow: "rgba(45,212,191,0.3)" },
  { solid: "#a78bfa", spotlight: "rgba(167,139,250,0.13)", glow: "rgba(167,139,250,0.3)" },
  { solid: "#38bdf8", spotlight: "rgba(56,189,248,0.13)", glow: "rgba(56,189,248,0.3)" },
  { solid: "#fbbf24", spotlight: "rgba(251,191,36,0.13)", glow: "rgba(251,191,36,0.3)" },
  { solid: "#00d294", spotlight: "rgba(0,210,148,0.13)", glow: "rgba(0,210,148,0.3)" },
];

/**
 * Shared glass card shell: translucent white-tinted gradient over a strong
 * backdrop blur with a thin inner top highlight (the "glass edge"). Border +
 * hover glow colors come from the per-card CSS vars.
 */
const CARD_CLASSES =
  "h-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(255,255,255,0.42))] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-[var(--card-color)] hover:shadow-[0_0_32px_var(--card-glow),inset_0_1px_0_rgba(255,255,255,0.14)] dark:border-[rgba(255,255,255,0.1)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] dark:hover:shadow-[0_0_32px_var(--card-glow),inset_0_1px_0_rgba(255,255,255,0.12)]";

export function AIEngineeringSection({ locale = "en" }: { locale?: Locale }) {
  const dict = t(locale);
  return (
    <section
      id="ai-engineering"
      aria-label="AI engineering"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <MotionReveal complexity="simple">
          <SectionHeading title={dict.sections.aiEngineering} />
        </MotionReveal>

        <MotionReveal complexity="standard">
          <ul className="grid gap-6 md:grid-cols-2" role="list">
            {localizedAICapabilities(locale).map((area, index) => {
              const form = classifyCapability(area);
              const showCompetency = form === "competency" || form === "both";
              const showProject =
                (form === "project" || form === "both") && area.project;
              const color = AREA_COLORS[index % AREA_COLORS.length];

              return (
                <li key={area.key}>
                  <GlowCard
                    spotlight={color.spotlight}
                    beamColor={color.solid}
                    data-testid="ai-capability"
                    data-capability-key={area.key}
                    data-capability-form={form}
                    className={CARD_CLASSES}
                    style={
                      {
                        "--card-color": color.solid,
                        "--card-glow": color.glow,
                      } as CSSProperties
                    }
                  >
                    <div className="flex h-full flex-col gap-3 p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl font-semibold text-[var(--color-text-secondary)]">
                          {area.title}
                        </h3>
                        {/* Project-vs-competency distinction (Req 5.4). */}
                        <span
                          data-testid="ai-capability-form-label"
                          className="rounded-full border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.5)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)] backdrop-blur-sm dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.05)]"
                        >
                          {dict.ai[FORM_LABEL_KEY[form]]}
                        </span>
                      </div>

                      {showCompetency && (
                        <p className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                          {area.competencyDescription}
                        </p>
                      )}

                      {/* Concrete skills applied in Noor AI. */}
                      {area.skills && area.skills.length > 0 && (
                        <ul
                          data-testid="ai-capability-skills"
                          className="mt-auto flex flex-wrap gap-2 pt-2"
                          role="list"
                        >
                          {area.skills.map((skill) => (
                            <li
                              key={skill}
                              className="rounded-full border px-3 py-1 text-xs font-medium"
                              style={{
                                borderColor: `${color.solid}55`,
                                color: color.solid,
                                background: `${color.solid}14`,
                              }}
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      )}

                      {showProject && area.project && (
                        <div className="mt-2 border-t border-[var(--color-border)] pt-4">
                          <CaseStudy caseStudy={area.project} />
                        </div>
                      )}
                    </div>
                  </GlowCard>
                </li>
              );
            })}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}

export default AIEngineeringSection;
