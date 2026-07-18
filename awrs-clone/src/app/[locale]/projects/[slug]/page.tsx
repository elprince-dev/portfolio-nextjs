import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiExternalLink,
  FiGithub,
  FiLock,
} from "react-icons/fi";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";
import { tl } from "@/content/types";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: tl(project.name, loc),
    description: tl(project.shortDesc, loc),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);
  const project = getProject(slug);
  if (!project) notFound();

  const p = dict.projects;

  return (
    <article className="pb-24 pt-24">
      {/* hero banner */}
      <header
        className="relative px-5 py-20"
        style={{
          background: `linear-gradient(135deg, ${project.gradient}, #050505)`,
        }}
      >
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${loc}/projects`}
            className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <FiArrowLeft className="rtl:rotate-180" /> {p.back}
          </Link>
          <h1 className="mt-6 font-serif text-4xl font-black tracking-tight text-white sm:text-6xl">
            {tl(project.name, loc)}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {tl(project.shortDesc, loc)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.confidential ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur">
                <FiLock size={14} /> {p.confidential}
              </span>
            ) : (
              <>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/25"
                  >
                    <FiGithub size={15} /> {p.viewCode}
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105"
                  >
                    <FiExternalLink size={15} /> {p.viewDemo}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto mt-14 grid max-w-4xl gap-12 px-5">
        <Reveal>
          <h2 className="mb-3 text-sm font-mono uppercase tracking-widest text-primary">
            {p.problem}
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            {tl(project.problem, loc)}
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mb-3 text-sm font-mono uppercase tracking-widest text-primary">
            {p.solution}
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            {tl(project.solution, loc)}
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mb-3 text-sm font-mono uppercase tracking-widest text-primary">
            {p.architecture}
          </h2>
          <p className="rounded-2xl border border-border bg-card p-6 leading-relaxed text-text-secondary">
            {tl(project.architectureOverview, loc)}
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mb-3 text-sm font-mono uppercase tracking-widest text-primary">
            {p.stack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t.label}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-text"
              >
                {t.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h2 className="mb-3 text-sm font-mono uppercase tracking-widest text-primary">
              {p.challenges}
            </h2>
            <ul className="space-y-3">
              {tl(project.challenges, loc).map((c, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="mb-3 text-sm font-mono uppercase tracking-widest text-primary">
              {p.results}
            </h2>
            <ul className="space-y-3">
              {tl(project.results, loc).map((r, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <FiCheckCircle className="mt-1 shrink-0 text-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
