import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";

export default function Footer({
  locale,
  dict,
  name,
}: {
  locale: Locale;
  dict: { rights: string; builtWith: string };
  name: string;
}) {
  const year = new Date().getFullYear();
  const socials = [
    { href: profile.social.github, icon: FiGithub, label: "GitHub" },
    { href: profile.social.linkedin, icon: FiLinkedin, label: "LinkedIn" },
    { href: `mailto:${profile.social.email}`, icon: FiMail, label: "Email" },
  ];

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-start">
          <p className="font-serif text-base font-semibold text-text">
            {name}
            <span className="text-primary">.</span>
          </p>
          <p className="mt-1 text-sm text-text-tertiary">
            © {year} {name}. {dict.rights}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-text-tertiary">
        {dict.builtWith}
      </p>
    </footer>
  );
}
