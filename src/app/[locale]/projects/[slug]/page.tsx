import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { localizedProject } from "@/i18n/content";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import { isLocale, locales, type Locale } from "@/lib/i18n";

/**
 * /[locale]/projects/[slug] — the dedicated detail page for each featured
 * project. Statically generated for every project × locale; unknown slugs
 * 404. Presentation lives in {@link ProjectDetailPage}.
 */

interface Params {
  params: { locale: string; slug: string };
}

export const dynamicParams = false;

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const project = localizedProject(locale, params.slug);
  if (!project) return {};
  const description =
    project.solution.length > 160
      ? `${project.solution.slice(0, 157)}…`
      : project.solution;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/${locale}/projects/${params.slug}` },
    openGraph: {
      title: project.name,
      description,
    },
  };
}

export default function ProjectPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const project = localizedProject(locale, params.slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} locale={locale} />;
}
