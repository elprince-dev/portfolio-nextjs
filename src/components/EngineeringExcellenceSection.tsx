import type { CSSProperties } from "react";
import { GlowCard } from "@/components/GlowCard";
import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { localizedEngineeringAreas } from "@/i18n/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * EngineeringExcellenceSection — system design and cloud-architecture depth
 * (Req 6.1–6.3).
 *
 * Presents the engineering depth areas (system design, scalability, cloud
 * architecture, AWS services, backend engineering) from the typed content
 * (Req 6.1), each with concrete evidence drawn from preserved content including
 * the multi-region serverless platform (Req 6.2). Each named AWS service is
 * rendered using the label defined in the content, which is kept consistent
 * with the Skills section terminology (Req 6.3).
 *
 * Cards use the shared glass treatment: translucent gradient + backdrop blur,
 * gray resting borders, and — per card — a distinct accent color driving the
 * cursor-following spotlight, the hover glow, and the traveling border beam.
 */

/** Per-card accent colors (spotlight / beam / hover glow). */
const AREA_COLORS: { solid: string; spotlight: string; glow: string }[] = [
  { solid: "#00d294", spotlight: "rgba(0,210,148,0.13)", glow: "rgba(0,210,148,0.3)" },
  { solid: "#38bdf8", spotlight: "rgba(56,189,248,0.13)", glow: "rgba(56,189,248,0.3)" },
  { solid: "#a78bfa", spotlight: "rgba(167,139,250,0.13)", glow: "rgba(167,139,250,0.3)" },
  { solid: "#fbbf24", spotlight: "rgba(251,191,36,0.13)", glow: "rgba(251,191,36,0.3)" },
  { solid: "#e0245e", spotlight: "rgba(224,36,94,0.13)", glow: "rgba(224,36,94,0.3)" },
];

/**
 * Shared glass card shell: translucent white-tinted gradient over a strong
 * backdrop blur with a thin inner top highlight (the "glass edge"). Border +
 * hover glow colors come from the per-card CSS vars.
 */
const CARD_CLASSES =
  "h-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(255,255,255,0.42))] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-[var(--card-color)] hover:shadow-[0_0_32px_var(--card-glow),inset_0_1px_0_rgba(255,255,255,0.14)] dark:border-[rgba(255,255,255,0.1)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] dark:hover:shadow-[0_0_32px_var(--card-glow),inset_0_1px_0_rgba(255,255,255,0.12)]";

export function EngineeringExcellenceSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  return (
    <section
      id="engineering-excellence"
      aria-label="Engineering excellence"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <MotionReveal complexity="simple">
          <SectionHeading title={t(locale).sections.engineeringExcellence} />
        </MotionReveal>

        <MotionReveal complexity="standard">
          <ul className="grid gap-6 lg:grid-cols-2" role="list">
            {localizedEngineeringAreas(locale).map((area, index) => {
              const color = AREA_COLORS[index % AREA_COLORS.length];
              return (
                <li key={area.title}>
                  <GlowCard
                    spotlight={color.spotlight}
                    beamColor={color.solid}
                    data-testid="engineering-depth-area"
                    className={CARD_CLASSES}
                    style={
                      {
                        "--card-color": color.solid,
                        "--card-glow": color.glow,
                      } as CSSProperties
                    }
                  >
                    <div className="flex h-full flex-col gap-4 p-6 sm:p-7">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-text-secondary)]">
                          {area.title}
                        </h3>
                        <p className="mt-2 text-[var(--color-text-secondary)]">
                          {area.description}
                        </p>
                      </div>

                      {/* Concrete evidence (Req 6.2). */}
                      <ul
                        className="space-y-1.5 text-sm text-[var(--color-text-muted)]"
                        role="list"
                      >
                        {area.evidence.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: color.solid }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* AWS service labels consistent with Skills terminology (Req 6.3). */}
                      {area.awsServices.length > 0 && (
                        <ul
                          data-testid="aws-services"
                          className="mt-auto flex flex-wrap gap-2"
                          role="list"
                        >
                          {area.awsServices.map((service) => (
                            <li
                              key={service}
                              data-testid="aws-service-label"
                              className="rounded-full border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.5)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] backdrop-blur-sm dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.05)]"
                            >
                              {service}
                            </li>
                          ))}
                        </ul>
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

export default EngineeringExcellenceSection;
