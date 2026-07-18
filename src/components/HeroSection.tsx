"use client";

import Image from "next/image";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { HiArrowRight, HiDocumentText } from "react-icons/hi";
import { MotionReveal } from "@/components/MotionReveal";
import { Marquee } from "@/components/Marquee";
import { contact } from "@/content/contact";

/**
 * HeroSection — the first above-the-fold section (Req 1.1–1.6), in the
 * editorial "awrs" style: a centered mono eyebrow over a giant rose-gradient
 * display name, with two ticker ribbons crossing at the bottom of the
 * viewport.
 *
 * The functional contract is unchanged: name and positioning statement
 * covering AI Engineering and Software Engineering (Req 1.1), the preserved
 * `/myPhoto.png` photo (Req 1.2), a primary CTA to Projects plus the resume
 * secondary action (Req 1.3), and direct LinkedIn/GitHub links (Req 1.5).
 * The ribbons are decorative (`aria-hidden`) and their animation is disabled
 * under prefers-reduced-motion (Req 12.3).
 */

const RESUME_HREF = "/Resume - External.pdf";

/** Shared focus-visible indicator for keyboard users (Req 14.3). */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

/** Keyword bands for the decorative crossing ribbons. */
const MARQUEE_PRIMARY = [
  "AI Engineer",
  "Software Engineer",
  "AWS Serverless",
  "RAG & Agentic Systems",
  "TypeScript",
  "Python",
  "Full-Stack Developer",
];

const MARQUEE_SECONDARY = [
  "Problem Solver",
  "Cloud Architect",
  "Type-Safe Systems",
  "Production AI",
  "End-to-End Ownership",
  "More Than an Engineer",
];

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden"
    >
      {/* Ambient rose glow, kept tight behind the display name. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-64 w-[28rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "var(--color-rose-glow)" }}
      />

      <MotionReveal
        complexity="standard"
        className="relative z-10 flex grow flex-col items-center justify-center px-4 pb-44 pt-16 text-center sm:px-6 sm:pb-48"
      >
        {/* Photo (Req 1.2), kept as a small editorial avatar. */}
        <Image
          src="/myPhoto.png"
          width={56}
          height={56}
          alt="Mohammad El Prince"
          priority
          className="mb-10 h-12 w-12 rounded-full object-cover ring-1 ring-[var(--color-border)]"
        />

        <p className="font-mono text-[11px] uppercase tracking-[0.6em] text-[var(--color-text-secondary)]">
          Hi, I&apos;m
        </p>

        <h1 className="text-gradient-rose mt-3 max-w-6xl pb-2 font-sans text-6xl font-black leading-[1.02] tracking-tight sm:text-7xl lg:text-[6.5rem]">
          Mohammad El Prince
        </h1>

        <p className="mt-5 text-base text-[var(--color-text-secondary)] sm:text-lg">
          AI Engineer &amp; Full-Stack Software Engineer
        </p>

        {/* Primary + secondary actions (Req 1.3), kept minimal. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            data-testid="hero-primary-cta"
            className={`group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-[var(--color-accent-foreground)] transition-transform hover:scale-[1.03] ${FOCUS_RING}`}
          >
            View my work
            <HiArrowRight
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-resume-cta"
            className={`inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] ${FOCUS_RING}`}
          >
            <HiDocumentText aria-hidden="true" />
            Resume
          </a>

          {/* Direct social links (Req 1.5). */}
          <a
            href={contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mohammad's GitHub profile"
            className={`rounded-full border border-[var(--color-border)] p-2.5 text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${FOCUS_RING}`}
          >
            <AiOutlineGithub aria-hidden="true" size={18} />
          </a>
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mohammad's LinkedIn profile"
            className={`rounded-full border border-[var(--color-border)] p-2.5 text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${FOCUS_RING}`}
          >
            <AiOutlineLinkedin aria-hidden="true" size={18} />
          </a>
        </div>
      </MotionReveal>

      {/* Decorative crossing ticker ribbons pinned to the bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-52"
      >
        {/* Red ribbon (behind), descending from left to right, white text. */}
        <div className="absolute inset-x-[-4%] bottom-9 rotate-[3.5deg]">
          <Marquee
            items={MARQUEE_PRIMARY}
            reverse
            duration={9}
            className="bg-[#dc2260] py-4 text-white shadow-xl"
          />
        </div>
        {/* Black ribbon (front), descending from right to left, gray text. */}
        <div className="absolute inset-x-[-4%] bottom-5 -rotate-[3deg]">
          <Marquee
            items={MARQUEE_SECONDARY}
            duration={11}
            className="border-y border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-4 text-[var(--color-text-secondary)] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
