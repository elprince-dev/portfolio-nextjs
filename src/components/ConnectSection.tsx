"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { GlowCard } from "@/components/GlowCard";
import { MotionReveal } from "@/components/MotionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * ConnectSection — the call-to-action banner between the portfolio content
 * and the Contact section, aimed at visitors looking to hire or network.
 *
 * The banner is a large glass card (rose cursor-following spotlight via
 * {@link GlowCard}, hover border glow). Its text lines reveal in order —
 * each fading in while sliding up — as the banner scrolls into view
 * (staggered framer-motion children; every entrance stays under the 600ms
 * ceiling, Req 12.4, and reduced motion disables all movement, Req 12.3).
 *
 * "Get in Touch" navigates to the dedicated /contact page ("LET'S Connect")
 * as a client-side route transition.
 */

/** Per-line entrance: fade in while sliding up (Req 12.1, 12.4). */
function getLineVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
}

/** Container: reveals the lines one after another, top to bottom. */
function getStackVariants(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced ? { duration: 0 } : { staggerChildren: 0.15 },
    },
  };
}

export function ConnectSection({ locale = "en" }: { locale?: Locale }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lineVariants = getLineVariants(prefersReducedMotion);
  const stackVariants = getStackVariants(prefersReducedMotion);
  const dict = t(locale);
  const connect = dict.connect;

  return (
    <section id="connect" className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <MotionReveal complexity="simple">
          <SectionHeading
            title={dict.sections.connect}
            subtitle={dict.sections.connectSubtitle}
          />
        </MotionReveal>

        <GlowCard
          spotlight="rgba(212,84,126,0.14)"
          className="rounded-2xl border border-[rgba(0,0,0,0.1)] bg-[linear-gradient(145deg,rgba(255,255,255,0.75),rgba(255,255,255,0.45))] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_35px_var(--color-rose-glow)] dark:border-[rgba(255,255,255,0.12)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]"
        >
          <motion.div
            variants={stackVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="flex flex-col items-center gap-6 px-6 py-20 text-center sm:py-28"
          >
            {/* 1 — Giant headline. */}
            <motion.h3
              variants={lineVariants}
              className="font-sans text-4xl font-black uppercase tracking-tight text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl"
            >
              {connect.headlinePrefix}{" "}
              <span className="text-gradient-rose">{connect.headlineAccent}</span>
            </motion.h3>

            {/* 2 — Tagline. */}
            <motion.p
              variants={lineVariants}
              className="text-lg font-bold uppercase tracking-[0.12em] text-[var(--color-text-secondary)] sm:text-2xl"
            >
              {connect.tagline}
            </motion.p>

            {/* 3 — CTA: navigates to the /contact page. */}
            <motion.div variants={lineVariants} className="mt-2">
              <Link
                href={`/${locale}/contact`}
                data-testid="connect-cta"
                className="group/cta inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.6)] px-7 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_25px_var(--color-rose-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] dark:border-[rgba(255,255,255,0.2)] dark:bg-[rgba(255,255,255,0.06)]"
              >
                {connect.ctaLabel}
                <HiArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
                />
              </Link>
            </motion.div>

            {/* 4 — Availability. */}
            <motion.p
              variants={lineVariants}
              className="mt-2 text-sm text-[var(--color-text-muted)]"
            >
              {connect.availability}
            </motion.p>

            {/* 5 — Pitch. */}
            <motion.p
              variants={lineVariants}
              className="max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              {connect.pitch}
            </motion.p>
          </motion.div>
        </GlowCard>
      </div>
    </section>
  );
}

export default ConnectSection;
