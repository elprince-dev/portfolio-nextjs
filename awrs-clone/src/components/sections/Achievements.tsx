import { FiAward, FiCloud, FiCompass, FiShield, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { achievements } from "@/content/achievements";
import { tl } from "@/content/types";
import type { Locale } from "@/i18n/config";

const icons: Record<string, IconType> = {
  rocket: FiZap,
  shield: FiShield,
  compass: FiCompass,
  sparkles: FiAward,
  cloud: FiCloud,
};

interface AchievementsDict {
  title: string;
  subtitle: string;
}

export default function Achievements({
  locale,
  dict,
}: {
  locale: Locale;
  dict: AchievementsDict;
}) {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading subtitle={dict.subtitle} title={dict.title} />

      <Reveal stagger className="grid gap-5 sm:grid-cols-2">
        {achievements.map((a, i) => {
          const Icon = icons[a.icon] ?? FiAward;
          return (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                style={{
                  background: "var(--color-primary-glow)",
                  color: "var(--color-primary)",
                }}
              >
                <Icon size={22} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-text">
                    {tl(a.title, locale)}
                  </h3>
                  <span className="font-mono text-xs text-text-tertiary">
                    {a.year}
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-text-secondary">
                  {tl(a.description, locale)}
                </p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
