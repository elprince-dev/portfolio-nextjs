"use client";

import { useEffect, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/content/profile";

interface GitHubDict {
  title: string;
  subtitle: string;
  contributions: string;
  viewProfile: string;
}

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const levelColors = [
  "var(--color-bg-tertiary)",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

export default function GitHubActivity({ dict }: { dict: GitHubDict }) {
  const user = profile.social.githubUser;
  const [data, setData] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (!active) return;
        setData(json.contributions ?? []);
        const totals = json.total as Record<string, number> | undefined;
        setTotal(totals ? Object.values(totals)[0] ?? null : null);
      })
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [user]);

  // Group days into week columns
  const weeks: Contribution[][] = [];
  if (data) {
    for (let i = 0; i < data.length; i += 7) {
      weeks.push(data.slice(i, i + 7));
    }
  }

  return (
    <section id="github" className="bg-bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading subtitle={dict.subtitle} title={dict.title} />

        <Reveal className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-text-secondary">
              {total !== null && (
                <span className="font-semibold text-text">
                  {total.toLocaleString()}{" "}
                </span>
              )}
              {dict.contributions}
            </p>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <FiGithub size={15} />
              {dict.viewProfile}
              <FiArrowUpRight size={14} className="rtl:rotate-[270deg]" />
            </a>
          </div>

          {error ? (
            <p className="py-8 text-center text-text-tertiary">
              Could not load contributions right now.
            </p>
          ) : !data ? (
            <div className="h-28 animate-pulse rounded-xl bg-bg-tertiary" />
          ) : (
            <div className="overflow-x-auto">
              <div className="flex min-w-max gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <span
                        key={day.date}
                        title={`${day.count} on ${day.date}`}
                        className="h-[11px] w-[11px] rounded-[2px]"
                        style={{ background: levelColors[day.level] }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
