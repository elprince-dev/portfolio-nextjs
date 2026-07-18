"use client";

import { useState } from "react";
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

/**
 * Persistent site navigation (Requirements 4.3–4.6, 11.2).
 *
 * - Renders one link per section exposed by {@link getNavItems} (Req 4.3).
 * - Provides a desktop bar and a mobile collapsible menu that expose the same
 *   link set (Req 4.6).
 * - Activating a link scrolls the viewport to the matching section via
 *   `scrollIntoView`, downgraded from `smooth` to `auto` under the
 *   reduced-motion preference (Req 4.4, 12.3).
 * - Indicates the section currently in view using {@link useActiveSection}
 *   (Req 4.5).
 * - Exposes a theme toggle that switches the light/dark Theme applied to all
 *   sections (Req 11.2).
 */

// The navigation link set is derived once from the canonical registry.
const navItems: SectionDefinition[] = getNavItems(sectionRegistry);
const navIds: SectionId[] = navItems.map((item) => item.id);

export function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeSection = useActiveSection(navIds);

  /** Scroll to a section, honoring the reduced-motion preference (Req 4.4). */
  const navigateToSection = (id: SectionId) => {
    if (typeof document !== "undefined") {
      const target = document.getElementById(id);
      target?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const renderLink = (item: SectionDefinition) => {
    const isActive = activeSection === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => navigateToSection(item.id)}
        aria-current={isActive ? "page" : undefined}
        data-active={isActive ? "true" : "false"}
        className={`block w-full cursor-pointer rounded-full px-4 py-1.5 text-center text-sm font-medium transition-colors md:inline-block md:w-auto ${
          isActive
            ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-[0_0_14px_var(--color-rose-glow)]"
            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        }`}
      >
        {item.navLabel}
      </button>
    );
  };

  const themeToggleButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        currentTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <button
          type="button"
          onClick={() => navigateToSection("hero")}
          className="cursor-pointer font-mono text-sm font-semibold tracking-widest text-[var(--color-text-primary)]"
        >
          MEP
        </button>

        {/* Desktop navigation: floating centered pill (Req 4.3). */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/90 px-1.5 py-1.5 shadow-lg backdrop-blur-md md:flex"
        >
          {navItems.map(renderLink)}
        </nav>

        <div className="flex items-center gap-2">
          {themeToggleButton}

          {/* Mobile menu toggle (Req 4.6). */}
          <button
            type="button"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
        </nav>
      )}
    </header>
  );
}

export default Navbar;
