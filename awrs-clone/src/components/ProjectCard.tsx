import Link from "next/link";
import { FiArrowUpRight, FiLock } from "react-icons/fi";
import type { CaseStudy } from "@/content/types";
import { tl } from "@/content/types";
import type { Locale } from "@/i18n/config";

export default function ProjectCard({
  project,
  locale,
}: {
  project: CaseStudy;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary"
    >
      {/* gradient header */}
      <div
        className="relative h-40 w-full"
        style={{
          background: `linear-gradient(135deg, ${project.gradient}, #050505)`,
        }}
      >
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-mono text-xs text-white/70">
            {tl(project.dateLabel, locale)}
          </span>
        </div>
        {project.confidential && (
          <span className="absolute end-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white/90 backdrop-blur">
            <FiLock size={11} /> Private
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-center gap-1.5 text-lg font-semibold text-text">
          {tl(project.name, locale)}
          <FiArrowUpRight className="text-text-tertiary transition-all group-hover:text-primary rtl:rotate-[270deg]" />
        </h3>
        <p className="mt-2 flex-1 leading-relaxed text-text-secondary">
          {tl(project.shortDesc, locale)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
