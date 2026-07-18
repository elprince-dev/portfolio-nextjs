import type { Metadata } from "next";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/content/profile";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);
  return { title: dict.nav.contact };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(loc);

  const channels = [
    { href: `mailto:${profile.social.email}`, icon: FiMail, label: profile.social.email },
    { href: profile.social.linkedin, icon: FiLinkedin, label: "LinkedIn / elprince-dev" },
    { href: profile.social.github, icon: FiGithub, label: "GitHub / elprince-dev" },
  ];

  return (
    <div className="pt-16">
      <ContactCTA dict={dict.contact} />
      <div className="mx-auto -mt-10 max-w-3xl px-5 pb-24">
        <Reveal stagger className="grid gap-4 sm:grid-cols-3">
          {channels.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary"
            >
              <Icon className="text-primary" size={22} />
              <span className="break-all text-sm text-text-secondary">
                {label}
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
