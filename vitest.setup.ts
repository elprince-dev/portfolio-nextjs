import "@testing-library/jest-dom/vitest";
import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

// Components use next/navigation's useRouter/usePathname (locale switching,
// nav fallbacks). Outside a real App Router these throw, so provide inert
// implementations while preserving the module's other exports.
vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return {
    ...actual,
    useRouter: () => ({
      push: () => {},
      replace: () => {},
      prefetch: () => {},
      back: () => {},
      forward: () => {},
      refresh: () => {},
    }),
    usePathname: () => "/en",
  };
});

// The locale layout loads fonts through next/font/google (Philosopher,
// JetBrains Mono, Amiri), which requires Next's build pipeline and throws
// under Vitest. Mock every export as a loader returning the shape the
// layout consumes (className/variable/style).
vi.mock("next/font/google", () => {
  const fontLoader = () => ({
    className: "mock-font",
    variable: "--mock-font",
    style: { fontFamily: "mock-font" },
  });
  return {
    Philosopher: fontLoader,
    JetBrains_Mono: fontLoader,
    Amiri: fontLoader,
  };
});

// Register jest-axe's `toHaveNoViolations` matcher with Vitest's expect.
expect.extend(toHaveNoViolations);

// jsdom does not implement matchMedia; provide a non-matching stub so hooks like
// usePrefersReducedMotion (and next-themes) behave deterministically in tests.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// jsdom does not implement IntersectionObserver; framer-motion's `whileInView`
// relies on it. Provide a minimal stub so motion components render their
// children without throwing.
if (typeof globalThis.IntersectionObserver === "undefined") {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

// jsdom does not implement ResizeObserver; React Flow (@xyflow/react) needs
// it to measure the diagram canvas. Provide a no-op stub so FlowDiagram
// renders without throwing.
if (typeof globalThis.ResizeObserver === "undefined") {
  class MockResizeObserver implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver =
    MockResizeObserver as unknown as typeof ResizeObserver;
}

// Ensure the DOM is reset between tests.
afterEach(() => {
  cleanup();
});
