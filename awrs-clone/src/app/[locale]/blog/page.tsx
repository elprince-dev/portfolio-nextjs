import type { Metadata } from "next";
import { FiEdit3 } from "react-icons/fi";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);
  return { title: dict.blog.title };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);

  // Placeholder — wire to MDX or a CMS when you start publishing.
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <Reveal className="mb-12">
        <p className="mb-2 font-mono text-sm text-primary">
          {dict.blog.subtitle}
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-text sm:text-5xl">
          {dict.blog.title}
        </h1>
        <span className="mt-4 block h-1 w-16 rounded-full bg-primary" />
      </Reveal>

      <Reveal className="grid place-items-center rounded-3xl border border-dashed border-border bg-card py-24 text-center">
        <FiEdit3 className="mb-4 text-text-tertiary" size={32} />
        <p className="text-text-secondary">{dict.blog.empty}</p>
      </Reveal>
    </div>
  );
}
