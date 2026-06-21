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
        className={`block w-full cursor-pointer text-center font-medium transition-colors lg:inline-block lg:w-auto ${
          isActive
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
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
      className="rounded-xl bg-[var(--color-surface-elevated)] p-2"
    >
      {currentTheme === "dark" ? (
        <RiSunLine size={20} aria-hidden="true" />
      ) : (
        <RiMoonFill size={20} aria-hidden="true" />
      )}
    </button>
  );

  return (
    <header className="fixed top-0 z-50 w-full bg-[var(--color-surface)] px-4 shadow backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
        <button
          type="button"
          onClick={() => navigateToSection("hero")}
          className="cursor-pointer text-2xl font-bold text-[var(--color-text-primary)]"
        >
          Mohammad El Prince
        </button>

        {/* Desktop navigation (Req 4.3). */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex"
        >
          {navItems.map(renderLink)}
          {themeToggleButton}
        </nav>

        {/* Mobile menu toggle (Req 4.6). */}
        <button
          type="button"
          className="md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
        </button>
      </div>

      {/* Mobile collapsible menu exposing the same link set (Req 4.6). */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="flex flex-col items-center gap-6 pb-4 md:hidden"
        >
          {navItems.map(renderLink)}
          {themeToggleButton}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
