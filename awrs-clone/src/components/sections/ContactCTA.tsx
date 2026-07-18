"use client";

import { useState } from "react";
import { FiCheck, FiCopy, FiMail } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";

interface ContactDict {
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  copyEmail: string;
  copied: string;
}

export default function ContactCTA({ dict }: { dict: ContactDict }) {
  const [copied, setCopied] = useState(false);
  const email = profile.social.email;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 start-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-50 blur-[100px]"
          style={{ background: "var(--color-primary-glow)" }}
        />
        <p className="relative mb-2 font-mono text-sm text-primary">
          {dict.subtitle}
        </p>
        <h2 className="relative font-serif text-3xl font-bold tracking-tight text-text sm:text-5xl">
          {dict.title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-text-secondary">
          {dict.body}
        </p>

        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white transition-transform hover:scale-[1.03]"
          >
            <FiMail /> {dict.cta}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? (
              <>
                <FiCheck className="text-primary" /> {dict.copied}
              </>
            ) : (
              <>
                <FiCopy /> {email}
              </>
            )}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
