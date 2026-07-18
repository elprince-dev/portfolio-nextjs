import type { CSSProperties } from "react";
import Link from "next/link";
import { BsLockFill } from "react-icons/bs";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import { AiOutlineGithub } from "react-icons/ai";
import type { CaseStudy } from "@/content/types";
import { BrowserFrame, ConfidentialFrame } from "@/components/ProjectFrames";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { GlowCard } from "@/components/GlowCard";
import { MotionReveal } from "@/components/MotionReveal";
import { localizedProjectMeta } from "@/i18n/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * ProjectDetailPage — the dedicated page for one featured project
 * (/projects/[slug]), the web-app adaptation of the reference portfolio's
 * project pages.
 *
 * Layout: back link → hero (category eyebrow, giant title, tagline, action
 * buttons) → meta chips (type / released / role / stack) → screenshot
 * showcase (browser frames, or the confidential lock treatment, Req 3.5) →
 * problem & solution cards → architecture (overview + diagram, Req 3.3)
 * → tech stack → challenges & results (Req 3.1).
 *
 * The link policy (Req 3.4, 3.5) is honored: confidential projects render a
 * confidentiality indicator and no source/demo links, even if URLs exist in
 * the content.
 */

/** Shared glass card shell (accent border/glow via CSS vars). */
const CARD_CLASSES =
  "h-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(255,255,255,0.42))] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-[var(--card-color)] hover:shadow-[0_0_32px_var(--card-glow)] dark:border-[rgba(255,255,255,0.1)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] dark:hover:shadow-[0_0_32px_var(--card-glow),inset_0_1px_0_rgba(255,255,255,0.12)]";

/** Per-block accent colors. */
const ACCENTS = {
  problem: { solid: "#e0245e", spotlight: "rgba(224,36,94,0.13)", glow: "rgba(224,36,94,0.3)" },
  solution: { solid: "#00d294", spotlight: "rgba(0,210,148,0.13)", glow: "rgba(0,210,148,0.3)" },
  architecture: { solid: "#38bdf8", spotlight: "rgba(56,189,248,0.13)", glow: "rgba(56,189,248,0.3)" },
  challenges: { solid: "#fbbf24", spotlight: "rgba(251,191,36,0.13)", glow: "rgba(251,191,36,0.3)" },
  results: { solid: "#a78bfa", spotlight: "rgba(167,139,250,0.13)", glow: "rgba(167,139,250,0.3)" },
} as const;

function accentVars(accent: {
  solid: string;
  glow: string;
}): CSSProperties {
  return {
    "--card-color": accent.solid,
    "--card-glow": accent.glow,
  } as CSSProperties;
}

/**
 * Hero tagline: first sentence of the solution with the trailing period
 * dropped, so it is never an exact duplicate of the full solution text
 * rendered in the Solution card below.
 */
function tagline(solution: string): string {
  return (solution.split(/(?<=\.)\s/)[0] ?? solution).replace(/\.$/, "");
}

/** Small mono section label with a colored tick. */
function BlockLabel({ color, children }: { color: string; children: string }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {children}
    </p>
  );
}

export function ProjectDetailPage({
  project,
  locale = "en",
}: {
  project: CaseStudy;
  locale?: Locale;
}) {
  const meta = localizedProjectMeta(locale, project.slug);
  const dict = t(locale).projects;

  const metaChips = [
    { label: dict.type, value: meta.category },
    { label: dict.released, value: meta.timeframe || "—" },
    { label: dict.role, value: meta.role },
    {
      label: dict.stack,
      value: `${project.techStack.length} ${dict.technologies}`,
    },
  ];

  return (
    <main className="min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back to the projects section on the home page. */}
        <MotionReveal complexity="simple">
          <Link
            href={`/${locale}/#projects`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <HiArrowLeft aria-hidden="true" className="rtl:rotate-180" />
            {dict.backToProjects}
          </Link>
        </MotionReveal>

        {/* Hero. */}
        <MotionReveal complexity="standard" className="mt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--color-accent)]">
            {meta.category}
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-7xl">
            {project.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            {tagline(project.solution)}
          </p>

          {/* Actions: live demo + source — or the confidentiality indicator
              (Req 3.4, 3.5). */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {project.confidential ? (
              <span
                data-testid="confidentiality-indicator"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)]"
              >
                <BsLockFill aria-hidden="true" />
                {dict.confidentialNotice}
              </span>
            ) : (
              <>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    {dict.liveDemo}
                    <HiArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.6)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_25px_var(--color-rose-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] dark:border-[rgba(255,255,255,0.2)] dark:bg-[rgba(255,255,255,0.06)]"
                  >
                    <AiOutlineGithub aria-hidden="true" size={18} />
                    {dict.github}
                  </a>
                )}
              </>
            )}
          </div>
        </MotionReveal>

        {/* Meta chips. */}
        <MotionReveal complexity="standard" className="mt-12">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metaChips.map((chip) => (
              <div
                key={chip.label}
                className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.55)] px-4 py-3.5 text-center backdrop-blur-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.04)]"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                  {chip.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-[var(--color-text-secondary)]">
                  {chip.value}
                </dd>
              </div>
            ))}
          </dl>
        </MotionReveal>

        {/* Screenshot showcase. */}
        <MotionReveal complexity="standard" className="mt-12">
          <div
            className="rounded-2xl p-4 sm:p-6"
            style={{
              background: `linear-gradient(160deg, ${meta.from}, ${meta.to})`,
            }}
          >
            {project.confidential ? (
              <div className="h-72 sm:h-[26rem]">
                <ConfidentialFrame
                  accent="#2dd4bf"
                  lockLabel={dict.confidentialLock}
                  lockSub={dict.confidentialSub}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Hero screenshot. */}
                <BrowserFrame
                  from={meta.from}
                  to={meta.to}
                  label={project.name}
                  src={`/projects/${project.slug}/1.png`}
                  className="flex h-72 flex-col sm:h-[26rem]"
                />
                {/* Two supporting screenshots. */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <BrowserFrame
                    from={meta.to}
                    to={meta.from}
                    label={dict.screenshot}
                    src={`/projects/${project.slug}/2.png`}
                    className="flex h-52 flex-col sm:h-64"
                  />
                  <BrowserFrame
                    from={meta.from}
                    to={meta.to}
                    label={dict.screenshot}
                    src={`/projects/${project.slug}/3.png`}
                    className="flex h-52 flex-col sm:h-64"
                  />
                </div>
              </div>
            )}
          </div>
        </MotionReveal>

        {/* Problem & Solution. */}
        <MotionReveal complexity="standard" className="mt-12">
          <div className="grid gap-6 md:grid-cols-2">
            <GlowCard
              spotlight={ACCENTS.problem.spotlight}
              beamColor={ACCENTS.problem.solid}
              className={CARD_CLASSES}
              style={accentVars(ACCENTS.problem)}
            >
              <div className="flex h-full flex-col gap-3 p-6 sm:p-7">
                <BlockLabel color={ACCENTS.problem.solid}>
                  {dict.theProblem}
                </BlockLabel>
                <p className="text-[var(--color-text-secondary)]">
                  {project.problem}
                </p>
              </div>
            </GlowCard>

            <GlowCard
              spotlight={ACCENTS.solution.spotlight}
              beamColor={ACCENTS.solution.solid}
              className={CARD_CLASSES}
              style={accentVars(ACCENTS.solution)}
            >
              <div className="flex h-full flex-col gap-3 p-6 sm:p-7">
                <BlockLabel color={ACCENTS.solution.solid}>
                  {dict.theSolution}
                </BlockLabel>
                <p className="text-[var(--color-text-secondary)]">
                  {project.solution}
                </p>
              </div>
            </GlowCard>
          </div>
        </MotionReveal>

        {/* Architecture (Req 3.3). */}
        <MotionReveal complexity="standard" className="mt-6">
          <GlowCard
            spotlight={ACCENTS.architecture.spotlight}
            beamColor={ACCENTS.architecture.solid}
            className={CARD_CLASSES}
            style={accentVars(ACCENTS.architecture)}
          >
            <div className="flex flex-col gap-4 p-6 sm:p-7">
              <BlockLabel color={ACCENTS.architecture.solid}>
                {dict.architecture}
              </BlockLabel>
              <p className="text-[var(--color-text-secondary)]">
                {project.architectureOverview}
              </p>
              {project.diagram && (
                <ArchitectureDiagram diagram={project.diagram} locale={locale} />
              )}
            </div>
          </GlowCard>
        </MotionReveal>

        {/* Built with (Req 3.6). */}
        <MotionReveal complexity="standard" className="mt-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            {dict.builtWith}
          </p>
          <ul
            className="mt-5 flex flex-wrap justify-center gap-2.5"
            role="list"
          >
            {project.techStack.map((item) => (
              <li
                key={item.label}
                data-testid="tech-stack-item"
                className="rounded-full border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.55)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] backdrop-blur-md dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.05)]"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </MotionReveal>

        {/* Challenges & Results. */}
        <MotionReveal complexity="standard" className="mt-12">
          <div className="grid gap-6 md:grid-cols-2">
            <GlowCard
              spotlight={ACCENTS.challenges.spotlight}
              beamColor={ACCENTS.challenges.solid}
              className={CARD_CLASSES}
              style={accentVars(ACCENTS.challenges)}
            >
              <div className="flex h-full flex-col gap-4 p-6 sm:p-7">
                <BlockLabel color={ACCENTS.challenges.solid}>
                  {dict.challenges}
                </BlockLabel>
                <ul
                  className="space-y-2.5 text-sm text-[var(--color-text-secondary)]"
                  role="list"
                >
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: ACCENTS.challenges.solid }}
                      />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>

            <GlowCard
              spotlight={ACCENTS.results.spotlight}
              beamColor={ACCENTS.results.solid}
              className={CARD_CLASSES}
              style={accentVars(ACCENTS.results)}
            >
              <div className="flex h-full flex-col gap-4 p-6 sm:p-7">
                <BlockLabel color={ACCENTS.results.solid}>
                  {dict.results}
                </BlockLabel>
                <ul
                  className="space-y-2.5 text-sm text-[var(--color-text-secondary)]"
                  role="list"
                >
                  {project.results.map((result, index) => (
                    <li key={index} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: ACCENTS.results.solid }}
                      />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </div>
        </MotionReveal>

        {/* Closing CTA. */}
        <MotionReveal complexity="simple" className="mt-16 text-center">
          <Link
            href={`/${locale}/#projects`}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.6)] px-7 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_25px_var(--color-rose-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] dark:border-[rgba(255,255,255,0.2)] dark:bg-[rgba(255,255,255,0.06)]"
          >
            <HiArrowLeft aria-hidden="true" className="rtl:rotate-180" />
            {dict.exploreMore}
          </Link>
        </MotionReveal>
      </div>
    </main>
  );
}

export default ProjectDetailPage;
