import Image from "next/image";
import { HiOutlineBadgeCheck, HiOutlineDownload } from "react-icons/hi";
import { RiDoubleQuotesR } from "react-icons/ri";
import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Clock } from "@/components/Clock";
import { Globe } from "@/components/Globe";
import { GlowCard } from "@/components/GlowCard";
import { StatGrid } from "@/components/StatGrid";
import { localizedAbout, localizedCredibility } from "@/i18n/content";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * CredibilitySection — the "About Me" bento grid, carrying the trust signals
 * shown early to establish credibility (Req 2.1–2.4).
 *
 * Bento cards present the current employer (Amazon) and role focus (Software
 * Development) alongside a short bio (Req 2.1), the count of AWS
 * certifications actually held together with their names (Req 2.2), and the
 * quantified credibility metrics as color-coded stat counters with orbiting
 * accent dots (Req 2.3 — the orbit animation is a user-approved exception to
 * the no-looping-effects rule, disabled under prefers-reduced-motion). All
 * values come from the typed credibility content so they stay consistent
 * with the preserved resume content (Req 2.4).
 */

const RESUME_HREF = "/Resume - External.pdf";

/** Shared focus-visible indicator for keyboard users (Req 14.3). */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

/** Shared bento card shell. */
const CARD =
  "rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]";

/** Hover treatment for the top bento row: solid rose border + glow. */
const CARD_HOVER =
  "transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_30px_var(--color-rose-glow)]";

/** Spotlight color for the top bento row's pointer-following glow. */
const ROSE_SPOTLIGHT = "rgba(212,84,126,0.14)";

/** Green-bordered card shell for the availability row. */
const GREEN_CARD =
  "rounded-3xl border border-[rgba(0,210,148,0.4)] bg-[var(--color-surface)] transition-[border-color,box-shadow] duration-300";

/** Locale-specific labels for this section's small chrome strings. */
const LOCAL_STRINGS = {
  en: {
    certifications: "Certifications",
    certified: "Certified",
    awsCertifications: "AWS certifications:",
    resume: "Resume",
    at: "at",
    firstName: "Mohammad",
  },
  ar: {
    certifications: "الشهادات",
    certified: "معتمد",
    awsCertifications: "شهادات AWS:",
    resume: "السيرة الذاتية",
    at: "في",
    firstName: "محمد",
  },
} as const;

export function CredibilitySection({ locale = "en" }: { locale?: Locale }) {
  const {
    employer,
    roleFocus,
    awsCertificationCount,
    awsCertifications,
    metrics,
  } = localizedCredibility(locale);
  const about = localizedAbout(locale);
  const strings = LOCAL_STRINGS[locale];

  return (
    <section
      id="credibility"
      aria-label="Credibility and trust signals"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <MotionReveal complexity="simple">
          <SectionHeading title={t(locale).sections.about} />
        </MotionReveal>

        {/* Top bento row. */}
        <MotionReveal
          complexity="standard"
          className="grid gap-4 sm:gap-5 md:grid-cols-3"
        >
          {/* Profile card (Req 2.1). */}
          <GlowCard spotlight={ROSE_SPOTLIGHT} className={`${CARD} ${CARD_HOVER} p-7`}>
            <div className="flex items-center gap-5">
              <div className="shrink-0 rounded-full p-1 ring-2 ring-[var(--color-accent)]">
                <Image
                  src="/myPhoto.png"
                  width={72}
                  height={72}
                  alt="Mohammad El Prince"
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-accent)]">
                  {strings.firstName}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                  {roleFocus} {strings.at} {employer}
                </p>
              </div>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              {about.bio}
            </p>
          </GlowCard>

          {/* Timezone / interactive globe card. */}
          <GlowCard spotlight={ROSE_SPOTLIGHT} className={`${CARD} ${CARD_HOVER} p-7`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
              {about.timezoneLabel}
            </p>
            <h3 className="mt-3 text-lg font-bold leading-snug">
              <span className="text-[var(--color-text-primary)]">
                {about.location}
              </span>{" "}
              <span className="text-[var(--color-text-secondary)]">
                {about.locationNote}
              </span>
            </h3>
            {/* Draggable wireframe earth — click and move to spin. */}
            <div className="absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2">
              <Globe />
            </div>
            {/* Spacer keeps the card tall enough for the globe. */}
            <div aria-hidden="true" className="h-44" />
          </GlowCard>

          {/* AWS certifications card (Req 2.2). */}
          <GlowCard
            spotlight={ROSE_SPOTLIGHT}
            className={`${CARD} ${CARD_HOVER} p-7`}
          >
            <div className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-rose-glow)] text-[var(--color-accent)]">
                <HiOutlineBadgeCheck aria-hidden="true" size={18} />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                {strings.certifications}
              </p>
            </div>
            <div className="mt-auto pt-10">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-[var(--color-text-primary)]">
                  Amazon Web Services
                </h3>
                <span className="rounded-full bg-[rgba(0,210,148,0.12)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-mint)]">
                  {strings.certified}
                </span>
              </div>
              <p
                data-testid="aws-certification-count"
                className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]"
              >
                {awsCertificationCount} {strings.awsCertifications}{" "}
                {awsCertifications.join(" · ")}
              </p>
            </div>
            </div>
          </GlowCard>
        </MotionReveal>

        {/* Availability row: one wide card, with the clock floating on top
            of it and overflowing above/below the row. */}
        <MotionReveal complexity="standard" className="relative mt-4 sm:mt-5">
          <GlowCard
            spotlight="rgba(0,210,148,0.14)"
            spotlightSecondary="rgba(212,84,126,0.16)"
            className={`${GREEN_CARD} p-8 shadow-[0_0_22px_rgba(0,210,148,0.12)] hover:shadow-[0_0_38px_rgba(0,210,148,0.22)] md:p-10`}
            style={{
              backgroundImage:
                "radial-gradient(130% 150% at 25% 15%, rgba(0,210,148,0.10), transparent 60%)",
            }}
          >
            <div className="grid gap-10 md:grid-cols-2 md:gap-x-[26rem]">
              {/* CTA column. */}
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-mint)]">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-[var(--color-mint)] shadow-[0_0_6px_var(--color-mint)]"
                  />
                  {about.availability}
                </p>
                <p className="mt-5 text-3xl font-black uppercase leading-tight tracking-tight">
                  <span className="block text-[var(--color-text-primary)]">
                    {about.visionLine1}
                  </span>
                  <span className="block text-[var(--color-accent)]">
                    {about.visionLine2}
                  </span>
                </p>
                <p className="mt-1 font-serif text-lg italic text-[var(--color-text-secondary)]">
                  {about.visionTail}
                </p>
                <a
                  href={RESUME_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-mint)] px-5 py-2 text-sm font-medium text-[var(--color-mint)] transition-colors hover:bg-[rgba(0,210,148,0.1)] ${FOCUS_RING}`}
                >
                  <HiOutlineDownload aria-hidden="true" />
                  {strings.resume}
                </a>
              </div>

              {/* Quote column. */}
              <figure className="relative flex flex-col justify-center">
                <RiDoubleQuotesR
                  aria-hidden="true"
                  className="absolute right-0 top-0 text-5xl text-[var(--color-text-muted)] opacity-40"
                />
                <blockquote className="font-serif text-2xl font-bold italic text-[var(--color-accent)]">
                  {about.quote.text}
                </blockquote>
                <hr
                  aria-hidden="true"
                  className="my-4 border-t border-[rgba(212,84,126,0.3)]"
                />
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                  {about.quote.attribution}
                </figcaption>
              </figure>
            </div>
          </GlowCard>

          {/* Analog clock centerpiece: taller than the row, floating over
              the card and its neighbors (desktop only). */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <Clock label={about.clockLabel} />
          </div>
        </MotionReveal>

        {/* Quantified metrics as floating glass stat cards (Req 2.3). */}
        <MotionReveal complexity="standard">
          <StatGrid metrics={metrics} />
        </MotionReveal>
      </div>
    </section>
  );
}

export default CredibilitySection;
