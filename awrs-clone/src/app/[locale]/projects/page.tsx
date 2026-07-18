import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);
  return { title: dict.projects.title };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <Reveal className="mb-12">
        <p className="mb-2 font-mono text-sm text-primary">
          {dict.projects.subtitle}
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-text sm:text-5xl">
          {dict.projects.title}
        </h1>
        <span className="mt-4 block h-1 w-16 rounded-full bg-primary" />
      </Reveal>

      <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={loc} />
        ))}
      </Reveal>
    </div>
  );
}
