"use client";

import { BsLockFill } from "react-icons/bs";

/**
 * Shared visual building blocks for project showcases (Featured Projects
 * cards and the /projects/[slug] detail pages).
 *
 * - {@link BrowserFrame}: a CSS browser-window mockup (traffic lights +
 *   address bar) showing a screenshot from `/public/projects/<slug>/`, with
 *   a gradient placeholder fallback when the file is missing (onError).
 * - {@link ConfidentialFrame}: the confidential-project visual — a blurred
 *   abstract dashboard wireframe under a lock-and-label overlay (Req 3.5) —
 *   used when real screenshots can never be shown.
 */

export function BrowserFrame({
  from,
  to,
  label,
  src,
  className = "frame-panel flex flex-col",
}: {
  from: string;
  to: string;
  label: string;
  src: string;
  /** Shell classes; defaults to the accordion panel behavior. */
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${className} overflow-hidden rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#101013]`}
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-[rgba(255,255,255,0.08)] bg-[#1a1a1f] px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ms-2 h-2.5 grow rounded-full bg-[rgba(255,255,255,0.08)]" />
      </div>
      {/* Screenshot over a gradient placeholder fallback. */}
      <div
        className="relative flex min-h-0 grow items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
      >
        <span className="truncate px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {label}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- plain img so
            a missing screenshot can fall back to the placeholder via onError */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </div>
  );
}

export function ConfidentialFrame({
  accent,
  lockLabel = "Amazon Confidential",
  lockSub = "Internal tooling — visuals withheld. Architecture and outcomes below.",
}: {
  accent: string;
  /** Localized lock title/subtitle (defaults to English). */
  lockLabel?: string;
  lockSub?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#101013]"
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-[rgba(255,255,255,0.08)] bg-[#1a1a1f] px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ms-2 h-2.5 grow rounded-full bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* Abstract dashboard wireframe, blurred so it reads as a suggestion
          of an internal tool rather than actual UI. */}
      <div className="flex min-h-0 grow gap-3 p-4 blur-[3px]">
        {/* Sidebar */}
        <div className="hidden w-1/5 flex-col gap-2 sm:flex">
          {[72, 48, 48, 48, 48].map((w, i) => (
            <div
              key={i}
              className="h-2.5 rounded-full bg-white/10"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        {/* Main area: stat tiles + bar chart */}
        <div className="flex min-w-0 grow flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 rounded-md bg-white/[0.07]" />
            ))}
          </div>
          <div className="flex grow items-end gap-2 rounded-md bg-white/[0.04] p-3">
            {[35, 60, 45, 80, 55, 90, 70, 50, 75, 65].map((h, i) => (
              <div
                key={i}
                className="grow rounded-sm"
                style={{
                  height: `${h}%`,
                  background: i % 3 === 0 ? accent : "rgba(255,255,255,0.12)",
                  opacity: i % 3 === 0 ? 0.55 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.08)] text-white/80 backdrop-blur-md">
          <BsLockFill size={20} />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/80">
          {lockLabel}
        </span>
        <span className="px-6 text-center text-xs text-white/50">
          {lockSub}
        </span>
      </div>
    </div>
  );
}
