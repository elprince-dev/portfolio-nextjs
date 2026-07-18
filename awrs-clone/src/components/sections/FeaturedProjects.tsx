import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";

interface ProjectsDict {
  title: string;
  subtitle: string;
  viewAll: string;
}

export default function FeaturedProjects({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ProjectsDict;
}) {
  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="bg-bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading subtitle={dict.subtitle} title={dict.title} />

        <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            {dict.viewAll}
            <FiArrowRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
