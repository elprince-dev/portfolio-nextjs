"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import type { Locale } from "@/i18n/config";

interface HeroDict {
  greeting: string;
  name: string;
  roles: string[];
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scroll: string;
}

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HeroDict;
}) {
  const root = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Entrance animation
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Rotating role text
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % dict.roles.length),
      2600
    );
    return () => clearInterval(id);
  }, [dict.roles.length]);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-16"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "var(--color-primary-glow)" }}
      />

      <div className="mx-auto w-full max-w-4xl">
        <p
          data-hero
          className="mb-4 font-mono text-sm tracking-wide text-primary"
        >
          {dict.greeting}
        </p>

        <h1
          data-hero
          className="font-serif text-5xl font-black leading-[1.05] tracking-tight text-text sm:text-7xl"
        >
          {dict.name}
        </h1>

        <div data-hero className="mt-5 h-9 overflow-hidden">
          <span
            key={roleIndex}
            className="block text-2xl font-semibold text-gradient sm:text-3xl"
            style={{ animation: "fadeUp 0.5s ease" }}
          >
            {dict.roles[roleIndex]}
          </span>
        </div>

        <p
          data-hero
          className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
        >
          {dict.tagline}
        </p>

        <div data-hero className="mt-9 flex flex-wrap gap-4">
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white transition-transform hover:scale-[1.03]"
          >
            {dict.ctaPrimary}
            <FiArrowRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            {dict.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-text-tertiary">
        <span className="text-xs uppercase tracking-widest">{dict.scroll}</span>
        <FiArrowDown className="animate-bounce" />
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}
