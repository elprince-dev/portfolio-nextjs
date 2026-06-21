import Image from "next/image";
import { BsGithub, BsArrowUpRightSquare, BsLockFill } from "react-icons/bs";
import type { CaseStudy as CaseStudyData } from "@/content/types";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

/**
 * CaseStudy — the reusable case-study presenter (Req 3.1, 3.3–3.6).
 *
 * Renders the full structured detail of a single project: problem statement,
 * solution summary, architecture overview, tech stack, challenges, and results
 * (Req 3.1). When the case study carries a diagram it is shown via
 * {@link ArchitectureDiagram} (Req 3.3). The tech-stack labels are rendered
 * exactly as defined in the preserved content (Req 3.6).
 *
 * Link / confidentiality policy (Req 3.4, 3.5):
 *   - When `confidential` is true the presenter omits all source/demo links and
 *     shows a confidentiality indicator — even if `repoUrl`/`demoUrl` are
 *     populated.
 *   - When `confidential` is false every populated `repoUrl`/`demoUrl` is
 *     rendered as a link.
 */

export interface CaseStudyProps {
  caseStudy: CaseStudyData;
}

export function CaseStudy({ caseStudy }: CaseStudyProps) {
  const {
    name,
    problem,
    solution,
    architectureOverview,
    techStack,
    challenges,
    results,
    diagram,
    repoUrl,
    demoUrl,
    confidential,
    imageAsset,
  } = caseStudy;

  return (
    <article
      aria-label={`${name} case study`}
      data-testid="case-study-detail"
      data-slug={caseStudy.slug}
      className="space-y-6"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {name}
        </h3>

        {/* Link / confidentiality policy (Req 3.4, 3.5). */}
        {confidential ? (
          <span
            data-testid="confidentiality-indicator"
            className="inline-flex items-center gap-1 rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]"
          >
            <BsLockFill aria-hidden="true" /> Confidential
          </span>
        ) : (
          <div className="flex items-center gap-3">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} source repository`}
                className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:underline"
              >
                <BsGithub aria-hidden="true" /> Source
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} live demo`}
                className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:underline"
              >
                <BsArrowUpRightSquare aria-hidden="true" /> Demo
              </a>
            )}
          </div>
        )}
      </header>

      <div className="relative h-56 w-full overflow-hidden rounded-xl">
        <Image
          src={`/${imageAsset}`}
          alt={`${name} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      <section aria-label="Problem">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          Problem
        </h4>
        <p className="mt-1 text-[var(--color-text-secondary)]">{problem}</p>
      </section>

      <section aria-label="Solution">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          Solution
        </h4>
        <p className="mt-1 text-[var(--color-text-secondary)]">{solution}</p>
      </section>

      <section aria-label="Architecture">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          Architecture
        </h4>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          {architectureOverview}
        </p>
        {diagram && <ArchitectureDiagram diagram={diagram} className="mt-3" />}
      </section>

      <section aria-label="Tech stack">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          Tech Stack
        </h4>
        <ul className="mt-2 flex flex-wrap gap-2" data-testid="tech-stack">
          {techStack.map((item) => (
            <li
              key={item.label}
              data-testid="tech-stack-item"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm text-[var(--color-text-secondary)]"
            >
              {item.iconAsset && (
                <Image
                  src={`/${item.iconAsset}`}
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              )}
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Challenges">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          Challenges
        </h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-[var(--color-text-secondary)]">
          {challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
      </section>

      <section aria-label="Results">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          Results
        </h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-[var(--color-text-secondary)]">
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default CaseStudy;
