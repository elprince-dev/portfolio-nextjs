import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile, siteUrl } from "@/content/profile";
import { tl } from "@/content/types";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Achievements from "@/components/sections/Achievements";
import GitHubActivity from "@/components/sections/GitHubActivity";
import ContactCTA from "@/components/sections/ContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tl(profile.name, loc),
    jobTitle: tl(profile.jobTitle, loc),
    url: siteUrl,
    email: profile.social.email,
    sameAs: [profile.social.github, profile.social.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero locale={loc} dict={dict.hero} />
      <About dict={dict.about} />
      <Experience locale={loc} dict={dict.experience} />
      <Skills dict={dict.skills} />
      <FeaturedProjects locale={loc} dict={dict.projects} />
      <Achievements locale={loc} dict={dict.achievements} />
      <GitHubActivity dict={dict.github} />
      <ContactCTA dict={dict.contact} />
    </>
  );
}
