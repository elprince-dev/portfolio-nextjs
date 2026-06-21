import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { skills } from "@/content/skills";
import type { ExpertiseDomain, SkillEntry } from "@/content/types";

/**
 * SkillsSection — skills presented as expertise domains (Req 8.1–8.3).
 *
 * Groups the preserved skill entries into the expertise domains defined in the
 * content (Backend, Frontend, Cloud, AI, Databases) (Req 8.1). Within each
 * domain it presents the skill entries assigned to that domain (Req 8.2). Each
 * entry is grouped under exactly the single domain recorded on the entry
 * (Req 8.3), so the rendered grouping is a partition of the full entry set.
 */

function groupByDomain(
  domains: ExpertiseDomain[],
  entries: SkillEntry[],
): Array<{ domain: ExpertiseDomain; entries: SkillEntry[] }> {
  return domains.map((domain) => ({
    domain,
    entries: entries.filter((entry) => entry.domain === domain),
  }));
}

export function SkillsSection() {
  const groups = groupByDomain(skills.domains, skills.entries);

  return (
    <section
      id="skills"
      aria-label="Skills and expertise domains"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        Skills
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <MotionReveal complexity="standard" className="mx-auto max-w-6xl">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {groups.map(({ domain, entries }) => (
            <li key={domain}>
              <Surface
                variant="elevated"
                data-testid="skill-domain"
                data-domain={domain}
                className="flex h-full flex-col rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-[var(--color-accent)]">
                  {domain}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                  {entries.map((entry) => (
                    <li
                      key={entry.name}
                      data-testid="skill-entry"
                      className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                    >
                      {entry.name}
                    </li>
                  ))}
                </ul>
              </Surface>
            </li>
          ))}
        </ul>
      </MotionReveal>
    </section>
  );
}

export default SkillsSection;
