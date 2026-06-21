"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { Surface } from "@/components/Surface";
import { CaseStudy } from "@/components/CaseStudy";
import { MotionReveal } from "@/components/MotionReveal";

/**
 * ProjectsSection — presents the featured projects as selectable case studies
 * (Req 3.1–3.7).
 *
 * The section lists every preserved featured project (Req 3.2). Selecting a
 * project reveals the full case-study detail for that same project (Req 3.7)
 * via the {@link CaseStudy} presenter, which renders the problem, solution,
 * architecture (with diagram), tech stack, challenges, and results, and applies
 * the confidentiality/link policy (Req 3.3–3.6).
 */

export function ProjectsSection() {
  const [selectedSlug, setSelectedSlug] = useState<string>(
    projects[0]?.slug ?? ""
  );

  const selected =
    projects.find((project) => project.slug === selectedSlug) ?? projects[0];

  return (
    <section id="projects" className="section-spacing px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        Featured Projects
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[18rem_1fr]">
        {/* Selectable project list (select-to-detail, Req 3.7). */}
        <nav aria-label="Featured projects" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-col gap-2" role="list">
            {projects.map((project) => {
              const isActive = project.slug === selected?.slug;
              return (
                <li key={project.slug}>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(project.slug)}
                    aria-pressed={isActive}
                    aria-current={isActive ? "true" : undefined}
                    data-testid="project-select"
                    data-slug={project.slug}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                        : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                    }`}
                  >
                    {project.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Detail panel for the selected case study. */}
        {selected && (
          <MotionReveal key={selected.slug} complexity="standard">
            <Surface variant="elevated" as="div" className="rounded-2xl p-6 sm:p-8">
              <CaseStudy caseStudy={selected} />
            </Surface>
          </MotionReveal>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
