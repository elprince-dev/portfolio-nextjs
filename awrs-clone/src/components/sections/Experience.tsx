import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import {
  experienceStages,
  sortStagesChronologically,
} from "@/content/experience";
import { tl } from "@/content/types";
import type { Locale } from "@/i18n/config";

interface ExperienceDict {
  title: string;
  subtitle: string;
}

export default function Experience({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ExperienceDict;
}) {
  const stages = sortStagesChronologically(experienceStages);

  return (
    <section id="experience" className="bg-bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading subtitle={dict.subtitle} title={dict.title} />

        <Reveal stagger className="relative">
          <span className="absolute bottom-0 start-[7px] top-2 w-px bg-border" />
          <div className="space-y-10">
            {stages.map((stage, i) => (
              <div key={i} className="relative ps-8">
                <span className="absolute start-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-primary bg-bg" />
                <p className="font-mono text-sm text-primary">
                  {tl(stage.timeReference, locale)}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-text">
                  {tl(stage.title, locale)}
                </h3>
                <p className="text-sm font-medium text-text-secondary">
                  {stage.organization}
                </p>
                <p className="mt-2 max-w-2xl leading-relaxed text-text-secondary">
                  {tl(stage.description, locale)}
                </p>
                {stage.bullets && (
                  <ul className="mt-3 max-w-2xl space-y-2">
                    {tl(stage.bullets, locale).map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
