import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";
import { localizedSkillDomain } from "@/i18n/content";
import {
  SiEslint,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiNx,
  SiPrettier,
  SiPython,
  SiReact,
  SiTrpc,
  SiTypescript,
  SiVite,
  SiVitest,
  SiGit,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";
import {
  HiOutlineAdjustments,
  HiOutlineArchive,
  HiOutlineBadgeCheck,
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCubeTransparent,
  HiOutlineDatabase,
  HiOutlineDocumentSearch,
  HiOutlineEye,
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineMap,
  HiOutlineShieldCheck,
  HiOutlineTemplate,
} from "react-icons/hi";
import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skills } from "@/content/skills";
import type { ExpertiseDomain, SkillEntry } from "@/content/types";

/**
 * SkillsSection — skills presented as expertise domains (Req 8.1–8.3), in
 * the awrs tile style: a grid of dark cards with brand-colored logos.
 *
 * Groups the preserved skill entries into the expertise domains defined in
 * the content (Backend, Frontend, Cloud, AI, Databases) (Req 8.1), rendering
 * each domain as a labeled tile grid (Req 8.2); every entry appears under
 * exactly the single domain recorded on it (Req 8.3). Hovering a tile lights
 * its border in the skill's brand color, adds a matching glow and interior
 * tint, and runs the traveling border beam (pure CSS via `.border-beam`).
 */

/** Brand icon + color per skill entry (fallback below for unmapped names). */
const SKILL_STYLES: Record<string, { icon: IconType; color: string }> = {
  // Backend
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  tRPC: { icon: SiTrpc, color: "#2596BE" },
  Vitest: { icon: SiVitest, color: "#6E9F18" },
  Git: { icon: SiGit, color: "#F05032" },
  Nx: { icon: SiNx, color: "#96D8E9" },
  ESLint: { icon: SiEslint, color: "#8080F2" },
  Prettier: { icon: SiPrettier, color: "#F7B93E" },
  // Frontend
  "React 19": { icon: SiReact, color: "#61DAFB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  "HTML/CSS": { icon: SiHtml5, color: "#E34F26" },
  Vite: { icon: SiVite, color: "#646CFF" },
  // Cloud (AWS brand hues; FontAwesome AWS mark where fitting)
  "AWS Lambda": { icon: FaAws, color: "#FF9900" },
  CDK: { icon: HiOutlineCubeTransparent, color: "#FF9900" },
  S3: { icon: HiOutlineArchive, color: "#569A31" },
  CloudFront: { icon: HiOutlineGlobeAlt, color: "#8C4FFF" },
  EventBridge: { icon: HiOutlineLightningBolt, color: "#E7157B" },
  SES: { icon: HiOutlineMail, color: "#DD344C" },
  SNS: { icon: HiOutlineBell, color: "#E7157B" },
  CloudWatch: { icon: HiOutlineChartBar, color: "#E7157B" },
  RUM: { icon: HiOutlineEye, color: "#E7157B" },
  WAF: { icon: HiOutlineShieldCheck, color: "#DD344C" },
  "Route 53": { icon: HiOutlineMap, color: "#8C4FFF" },
  "Infrastructure as Code": { icon: HiOutlineTemplate, color: "#FF9900" },
  // AI
  "Retrieval-Augmented Generation": {
    icon: HiOutlineDocumentSearch,
    color: "#38bdf8",
  },
  "LLM Applications": { icon: HiOutlineChat, color: "#a78bfa" },
  Agents: { icon: HiOutlineChip, color: "#00d294" },
  "Retrieval & Embedding Pipelines": {
    icon: HiOutlineDatabase,
    color: "#f59e0b",
  },
  "Tool Calling": { icon: HiOutlineAdjustments, color: "#e0245e" },
  "Evaluation Pipelines": { icon: HiOutlineBadgeCheck, color: "#38bdf8" },
  // Databases
  DynamoDB: { icon: HiOutlineDatabase, color: "#4D6BFE" },
  SQL: { icon: FaDatabase, color: "#38bdf8" },
};

const FALLBACK_STYLE = { icon: HiOutlineCode, color: "#d4547e" };

function groupByDomain(
  domains: ExpertiseDomain[],
  entries: SkillEntry[],
): Array<{ domain: ExpertiseDomain; entries: SkillEntry[] }> {
  return domains.map((domain) => ({
    domain,
    entries: entries.filter((entry) => entry.domain === domain),
  }));
}

export function SkillsSection({ locale = "en" }: { locale?: Locale }) {
  const groups = groupByDomain(skills.domains, skills.entries);

  return (
    <section
      id="skills"
      aria-label="Skills and expertise domains"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <MotionReveal complexity="simple">
          <SectionHeading title={t(locale).sections.skills} />
        </MotionReveal>

        {groups.map(({ domain, entries }) => (
          <MotionReveal
            key={domain}
            complexity="standard"
            data-testid="skill-domain"
            data-domain={domain}
            className="mt-10 first-of-type:mt-0"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">
              {localizedSkillDomain(locale, domain)}
            </h3>
            <ul
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
              role="list"
            >
              {entries.map((entry) => {
                const style = SKILL_STYLES[entry.name] ?? FALLBACK_STYLE;
                const SkillIcon = style.icon;
                return (
                  <li
                    key={entry.name}
                    data-testid="skill-entry"
                    style={
                      {
                        "--stat-color": style.color,
                        "--skill-glow": `${style.color}8c`,
                      } as CSSProperties
                    }
                    className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-xl border border-[rgba(0,0,0,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.75),rgba(255,255,255,0.45))] px-3 py-6 text-center backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--stat-color)] hover:shadow-[0_0_42px_var(--skill-glow)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))]"
                  >
                    {/* Interior glow in the logo's color: faint at rest,
                        full strength on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-35 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(120px at 50% 40%, ${style.color}30, transparent 70%)`,
                      }}
                    />
                    {/* Traveling bright border on hover. */}
                    <span aria-hidden="true" className="border-beam" />

                    <SkillIcon
                      aria-hidden="true"
                      size={28}
                      className="relative transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_var(--stat-color)]"
                      style={{ color: style.color }}
                    />
                    <span className="relative text-sm font-semibold text-[var(--color-text-secondary)]">
                      {entry.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
