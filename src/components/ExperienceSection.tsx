import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { sortStagesChronologically } from "@/lib/experience";
import { localizedExperience } from "@/i18n/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * ExperienceSection — the chronological career timeline (Req 7.1–7.4).
 *
 * Renders the career stages in chronological order from earliest to most
 * recent via {@link sortStagesChronologically} (Req 7.1) as an alternating
 * left/right timeline around a central line with a scroll-driven progress
 * dot. Each stage displays its title, associated organization or
 * institution, and a time reference (Req 7.3), and the included stages and
 * their time references are sourced from the typed content so they match
 * the preserved resume content (Req 7.2, 7.4).
 */

export function ExperienceSection({ locale = "en" }: { locale?: Locale }) {
  // Chronologically sorted (Req 7.1), displayed newest-first to match the
  // reference design.
  const stages = [
    ...sortStagesChronologically(localizedExperience(locale)),
  ].reverse();

  return (
    <section
      id="experience"
      aria-label="Experience timeline"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <MotionReveal complexity="simple">
          <SectionHeading title={t(locale).sections.experience} />
        </MotionReveal>

        <MotionReveal complexity="standard">
          <ExperienceTimeline stages={stages} />
        </MotionReveal>
      </div>
    </section>
  );
}

export default ExperienceSection;
