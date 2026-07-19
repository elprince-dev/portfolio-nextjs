"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { RiSunLine, RiMoonFill } from "react-icons/ri";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import {
  getNavItems,
  sectionRegistry,
  type SectionDefinition,
  type SectionId,
} from "@/lib/sections";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useActiveSection } from "@/lib/useActiveSection";
import {
  otherLocale,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * Persistent site navigation (Requirements 4.3–4.6, 11.2), bilingual.
 *
 * - Renders one link per section exposed by {@link getNavItems} (Req 4.3),
 *   plus a Contact page link to the dedicated /[locale]/contact route.
 * - Provides a desktop bar and a mobile collapsible menu that expose the same
 *   link set (Req 4.6).
 * - Activating a link scrolls the viewport to the matching section via
 *   `scrollIntoView` (downgraded to `auto` under reduced motion, Req 4.4,
 *   12.3); on other pages it navigates home to the section anchor.
 * - Indicates the section currently in view using {@link useActiveSection}
 *   (Req 4.5).
 * - Exposes a theme toggle (Req 11.2) and a language toggle (EN ⇄ AR) that
 *   switches the locale prefix while preserving the current path.
 */

// The navigation link set is derived once from the canonical registry.
const navItems: SectionDefinition[] = getNavItems(sectionRegistry);
const navIds: SectionId[] = navItems.map((item) => item.id);

/** Nav labels come from the UI dictionary, keyed by section id. */
const NAV_LABEL_KEY: Partial<
  Record<SectionId, "experience" | "skills" | "projects" | "aiEngineering">
> = {
  experience: "experience",
  skills: "skills",
  projects: "projects",
  "ai-engineering": "aiEngineering",
};

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeSection = useActiveSection(navIds);
  const pathname = usePathname();
  const router = useRouter();
  const dict = t(locale);
  const onContactPage = pathname === `/${locale}/contact`;

  /** Scroll to a section, honoring the reduced-motion preference (Req 4.4).
   * On pages without the section anchors, navigate home to the anchor. */
  const navigateToSection = (id: SectionId) => {
    if (typeof document !== "undefined") {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      } else {
        router.push(`/${locale}#${id}`);
      }
    }
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  /** Shared link shell: the active item sits on a soft pill. */
  const linkClasses = (isActive: boolean) =>
    `relative block w-full cursor-pointer rounded-full px-5 py-2 text-center text-[15px] font-semibold transition-colors md:inline-block md:w-auto ${
      isActive
        ? "bg-black/10 text-[var(--color-text-primary)] dark:bg-white/10"
        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
    }`;

  /** Rose "lamp" glowing at the pill's top edge above the active item. */
  const activeLamp = (
    <>
      <span
        aria-hidden="true"
        className="absolute -top-[9px] left-1/2 h-[3px] w-9 -translate-x-1/2 rounded-full bg-[var(--color-accent)]"
      />
      <span
        aria-hidden="true"
        className="absolute -top-3.5 left-1/2 h-3.5 w-16 -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-50 blur-md"
      />
    </>
  );

  const renderLink = (item: SectionDefinition) => {
    const isActive = activeSection === item.id;
    const labelKey = NAV_LABEL_KEY[item.id];
    const label = labelKey ? dict.nav[labelKey] : item.navLabel;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => navigateToSection(item.id)}
        aria-current={isActive ? "page" : undefined}
        data-active={isActive ? "true" : "false"}
        className={linkClasses(isActive)}
      >
        {isActive && activeLamp}
        {label}
      </button>
    );
  };

  /** Contact lives on its own page — a route link, not a scroll target. */
  const contactLink = (
    <Link
      href={`/${locale}/contact`}
      prefetch={false}
      onClick={() => setMenuOpen(false)}
      aria-current={onContactPage ? "page" : undefined}
      data-active={onContactPage ? "true" : "false"}
      className={linkClasses(onContactPage)}
    >
      {onContactPage && activeLamp}
      {dict.nav.contact}
    </Link>
  );

  const themeToggleButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        currentTheme === "dark" ? dict.nav.switchToLight : dict.nav.switchToDark
      }
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
    >
      {currentTheme === "dark" ? (
        <RiSunLine size={18} aria-hidden="true" />
      ) : (
        <RiMoonFill size={18} aria-hidden="true" />
      )}
    </button>
  );

  /** Language toggle: switch the locale prefix, preserving the path. */
  const languageToggleButton = (
    <button
      type="button"
      onClick={() => {
        router.push(switchLocalePath(pathname ?? `/${locale}`, otherLocale(locale)));
        setMenuOpen(false);
      }}
      aria-label={dict.nav.languageToggleLabel}
      data-testid="language-toggle"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-xs font-bold text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
    >
      {dict.nav.languageToggle}
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href={`/${locale}`}
          onClick={(event) => {
            // Already on the home page: just scroll back to the top.
            if (pathname === `/${locale}`) {
              event.preventDefault();
              navigateToSection("hero");
            }
            setMenuOpen(false);
          }}
          aria-label={dict.nav.logoLabel}
          // Pill surface matching the right-side controls: the header is
          // fixed and transparent, so without a background the logo mark
          // collides visually with content scrolling underneath it.
          className="cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-1.5 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          {/* Logo mark rendered in the current theme color via CSS mask. */}
          <span aria-hidden="true" className="logo-mark" />
        </Link>

        {/* Desktop navigation: floating centered pill (Req 4.3). */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/95 px-2 py-2 shadow-lg backdrop-blur-md md:flex"
        >
          {navItems.map(renderLink)}
          {contactLink}
        </nav>

        <div className="flex items-center gap-2">
          {languageToggleButton}
          {themeToggleButton}

          {/* Mobile menu toggle (Req 4.6). */}
          <button
            type="button"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile collapsible menu exposing the same link set (Req 4.6). */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mx-auto mt-2 flex max-w-7xl flex-col items-center gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-3 shadow-lg backdrop-blur-md md:hidden"
        >
          {navItems.map(renderLink)}
          {contactLink}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
