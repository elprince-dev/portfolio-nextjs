"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { BrowserFrame, ConfidentialFrame } from "@/components/ProjectFrames";
import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { localizedProjects, localizedProjectMeta } from "@/i18n/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * ProjectsSection — presents the featured projects as awrs-style cards
 * (Req 3.1–3.7).
 *
 * Each card: a numbered header row with dotted rules around a category label
 * and timeframe, the project name, a one-line tagline, a visual panel with
 * three browser-frame screenshots in an expanding accordion (or the
 * confidential lock treatment, Req 3.5), and the tech stack as pills.
 *
 * Every card is a link to that project's dedicated page at
 * `/projects/[slug]`, where the full case-study detail lives (Req 3.7) —
 * problem, solution, architecture (with diagram), tech stack, challenges,
 * results, and the confidentiality/link policy (Req 3.3–3.6). While hovered,
 * a rotating "OPEN TO EXPLORE" badge follows the cursor over the card.
 */

/** Tracks the cursor anywhere inside a project card so the "open to explore"
 * badge can follow it (via the `--bx`/`--by` custom properties). */
function onCardMouseMove(e: MouseEvent<HTMLAnchorElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--bx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--by", `${e.clientY - rect.top}px`);
}

/**
 * First sentence of the solution as the card tagline. The trailing period is
 * dropped (and long sentences ellipsized) so the tagline is never an exact
 * duplicate of the full solution text rendered on the detail page.
 */
function tagline(solution: string): string {
  const first = (solution.split(/(?<=\.)\s/)[0] ?? solution).replace(/\.$/, "");
  return first.length > 150 ? `${first.slice(0, 147)}…` : first;
}

export function ProjectsSection({ locale = "en" }: { locale?: Locale }) {
  const dict = t(locale);
  return (
    <section id="projects" className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <MotionReveal complexity="simple">
          <SectionHeading title={dict.sections.projects} />
        </MotionReveal>

        {/* Project cards — each links to its /projects/[slug] page (Req 3.7). */}
        <MotionReveal complexity="standard">
          <ul className="grid gap-8" role="list">
            {localizedProjects(locale).map((project, index) => {
              const meta = localizedProjectMeta(locale, project.slug);
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={project.slug}>
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    onMouseMove={onCardMouseMove}
                    data-testid="project-select"
                    data-slug={project.slug}
                    className="group relative block h-full w-full overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.1)] bg-[linear-gradient(145deg,rgba(255,255,255,0.75),rgba(255,255,255,0.45))] p-6 text-left backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_35px_var(--color-rose-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] dark:border-[rgba(255,255,255,0.12)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] sm:p-8"
                  >
                    {/* Traveling rose glow around the border on hover. The
                        card is large, so the beam is thicker and slower than
                        the default to stay clearly visible. */}
                    <span
                      aria-hidden="true"
                      className="border-beam"
                      style={
                        {
                          "--stat-color": "var(--color-accent)",
                          "--beam-size": "2.5px",
                          "--beam-duration": "5s",
                        } as CSSProperties
                      }
                    />
                    {/* Header row: number ---- category ---- timeframe. */}
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em]">
                      <span className="text-[var(--color-accent)]">{number}</span>
                      <span className="h-px grow border-t border-dashed border-[var(--color-border)]" />
                      <span className="text-[var(--color-text-muted)]">
                        {meta.category}
                      </span>
                      <span className="h-px grow border-t border-dashed border-[var(--color-border)]" />
                      <span className="text-[var(--color-text-muted)]">
                        {meta.timeframe}
                      </span>
                    </div>

                    {/* Title row. */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <h3 className="text-2xl font-bold text-[var(--color-text-secondary)]">
                        {project.name}
                      </h3>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                        <HiArrowUpRight aria-hidden="true" size={14} />
                      </span>
                    </div>

                    <p className="mt-2 text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {tagline(project.solution)}
                    </p>

                    {/* Visual panel. Public projects: an accordion of three
                        browser frames — all fully visible at rest; hovering
                        one expands it while the others compress and dim
                        (.frame-panel / .frame-stage rules in globals.css).
                        Confidential projects: a single locked wireframe
                        instead of screenshots that can never be shown. */}
                    <div
                      className="frame-stage relative mt-6 flex h-64 gap-3 overflow-hidden rounded-xl p-4 sm:h-96 sm:gap-4 sm:p-6"
                      style={{
                        background: `linear-gradient(160deg, ${meta.from}, ${meta.to})`,
                      }}
                    >
                      {project.confidential ? (
                        <ConfidentialFrame
                          accent="#2dd4bf"
                          lockLabel={dict.projects.confidentialLock}
                          lockSub={dict.projects.confidentialSub}
                        />
                      ) : (
                        <>
                          <BrowserFrame
                            from={meta.from}
                            to={meta.to}
                            label={meta.category}
                            src={`/projects/${project.slug}/1.png`}
                          />
                          <BrowserFrame
                            from={meta.to}
                            to={meta.from}
                            label={dict.projects.screenshot}
                            src={`/projects/${project.slug}/2.png`}
                          />
                          <BrowserFrame
                            from={meta.from}
                            to={meta.to}
                            label={meta.timeframe || dict.projects.preview}
                            src={`/projects/${project.slug}/3.png`}
                          />
                        </>
                      )}
                    </div>

                    {/* Rotating "open to explore" badge: follows the cursor
                        anywhere over the card while hovered. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        // Transform-only positioning: GPU-composited and
                        // updated per mousemove, so it tracks smoothly.
                        transform:
                          "translate(var(--bx, 50%), var(--by, 50%)) translate(-50%, -50%)",
                      }}
                    >
                      <span className="relative block h-28 w-28 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.08)] shadow-2xl backdrop-blur-md">
                        <svg
                          viewBox="0 0 96 96"
                          className="spin-slow absolute inset-0 h-full w-full"
                        >
                          <defs>
                            <path
                              id={`badge-arc-${project.slug}`}
                              d="M 48 10 A 38 38 0 1 1 47.9 10"
                              fill="none"
                            />
                          </defs>
                          <text
                            fill="rgba(255,255,255,0.75)"
                            fontSize="9.5"
                            letterSpacing="2.5"
                          >
                            <textPath href={`#badge-arc-${project.slug}`}>
                              {dict.projects.openToExplore}
                            </textPath>
                          </text>
                        </svg>
                        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] text-white">
                          <HiArrowUpRight aria-hidden="true" size={14} />
                        </span>
                      </span>
                    </span>

                    {/* Tech stack pills. */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((item) => (
                        <span
                          key={item.label}
                          className="rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-sm text-[var(--color-text-secondary)]"
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}

export default ProjectsSection;
