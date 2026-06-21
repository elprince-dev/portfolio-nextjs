"use client";

import Image from "next/image";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { HiArrowRight, HiDocumentText } from "react-icons/hi";
import { MotionReveal } from "@/components/MotionReveal";
import { contact } from "@/content/contact";

/**
 * HeroSection — the first above-the-fold section (Req 1.1–1.6).
 *
 * Presents Mohammad's name, a positioning statement covering AI
 * Engineering and Software Engineering, and a primary call-to-action within the
 * initial viewport (Req 1.1). Renders the professional photo from the preserved
 * `/myPhoto.png` asset (Req 1.2). The primary CTA navigates to the Projects
 * section and a secondary action opens the preserved resume PDF (Req 1.3).
 * Direct LinkedIn and GitHub links (`elprince-dev`) are shown (Req 1.5).
 *
 * Graceful degradation (Req 1.6): the layout uses fluid type and wrapping flex
 * rows so that when space is constrained the elements that fit are displayed
 * rather than hiding the section. The mobile layout stacks the content and
 * keeps the name, positioning statement, and primary CTA visible without
 * horizontal scrolling (Req 1.4) — no fixed widths or horizontal overflow.
 */

const RESUME_HREF = "/Resume - External.pdf";

/** Shared focus-visible indicator for keyboard users (Req 14.3). */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <MotionReveal
        complexity="standard"
        className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto]"
      >
        {/* Content column */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            AI &amp; Software Engineer
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            Mohammad El Prince
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
            AI Engineer and Software Engineer building production AI
            applications and scalable, type-safe systems on AWS. I design
            retrieval-augmented and agentic systems, ship serverless platforms,
            and own engineering from architecture through production.
          </p>

          {/* Primary + secondary actions (Req 1.3). */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              data-testid="hero-primary-cta"
              className={`inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-transform hover:-translate-y-0.5 ${FOCUS_RING}`}
            >
              View my work
              <HiArrowRight aria-hidden="true" />
            </a>

            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-resume-cta"
              className={`inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 font-semibold text-[var(--color-text-primary)] transition-transform hover:-translate-y-0.5 ${FOCUS_RING}`}
            >
              <HiDocumentText aria-hidden="true" />
              Resume
            </a>
          </div>

          {/* Direct social links (Req 1.5). */}
          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mohammad's GitHub profile"
              className={`rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] ${FOCUS_RING}`}
            >
              <AiOutlineGithub aria-hidden="true" size={24} />
            </a>
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mohammad's LinkedIn profile"
              className={`rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] ${FOCUS_RING}`}
            >
              <AiOutlineLinkedin aria-hidden="true" size={24} />
            </a>
          </div>
        </div>

        {/* Photo column (Req 1.2). */}
        <div className="order-first flex justify-center lg:order-none">
          <Image
            src="/myPhoto.png"
            width={320}
            height={320}
            alt="Mohammad El Prince"
            priority
            className="h-48 w-48 rounded-full border-4 border-[var(--color-surface-elevated)] object-cover shadow-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          />
        </div>
      </MotionReveal>
    </section>
  );
}

export default HeroSection;
