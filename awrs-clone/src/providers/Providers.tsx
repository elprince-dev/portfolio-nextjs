"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Global client providers: theme (class-based dark mode via next-themes) and
 * Lenis smooth scrolling, matching the awrs.me experience.
 */
export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.1,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
