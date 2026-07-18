import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { skills } from "@/content/skills";

interface SkillsDict {
  title: string;
  subtitle: string;
}

export default function Skills({ dict }: { dict: SkillsDict }) {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading subtitle={dict.subtitle} title={dict.title} />

      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.domains.map((domain) => {
          const entries = skills.entries.filter((e) => e.domain === domain);
          return (
            <div
              key={domain}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {domain}
              </h3>
              <div className="flex flex-wrap gap-2">
                {entries.map((e) => (
                  <span
                    key={e.name}
                    className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-sm text-text-secondary"
                  >
                    {e.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
