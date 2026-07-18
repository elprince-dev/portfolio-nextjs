"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import type { Locale } from "@/i18n/config";
import ThemeToggle from "./ThemeToggle";

interface NavDict {
  projects: string;
  blog: string;
  contact: string;
  wall: string;
}

export default function Navbar({
  locale,
  nav,
  themeLabel,
  brand,
}: {
  locale: Locale;
  nav: NavDict;
  themeLabel: string;
  brand: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: `${base}/projects`, label: nav.projects },
    { href: `${base}/blog`, label: nav.blog },
    { href: `${base}/wall`, label: nav.wall },
    { href: `${base}/contact`, label: nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-navbar backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href={base}
          className="font-serif text-lg font-bold tracking-tight text-text"
        >
          {brand}
          <span className="text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-text-secondary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-border" />
          <ThemeToggle label={themeLabel} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle label={themeLabel} />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-text"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-navbar backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-text-secondary transition-colors hover:bg-card-hover hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
