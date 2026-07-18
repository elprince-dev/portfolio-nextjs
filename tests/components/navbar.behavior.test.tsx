import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { getNavItems, sectionRegistry } from "@/lib/sections";

/**
 * Component tests for navigation behavior.
 *
 * Covers:
 *  - Scroll-to-section on link activation (Req 4.4)
 *  - Active-section indication (Req 4.5)
 *  - Mobile menu link parity with desktop navigation (Req 4.6)
 *  - Theme application across sections via the theme toggle (Req 11.2, 11.3)
 *
 * Validates: Requirements 4.4, 4.5, 4.6, 11.2, 11.3
 */

const navLabels = getNavItems(sectionRegistry).map((item) => item.navLabel!);

/** Renders the home-page section anchors the Navbar scrolls to / observes. */
function SectionAnchors() {
  return (
    <>
      {sectionRegistry.map((section) => (
        <section key={section.id} id={section.id}>
          {section.id}
        </section>
      ))}
    </>
  );
}

function renderNavbar() {
  return render(
    <ThemeProvider attribute="class" enableSystem defaultTheme="light">
      <Navbar />
      <SectionAnchors />
    </ThemeProvider>,
  );
}

describe("Navbar navigation behavior", () => {
  describe("scroll-to-section on link activation (Req 4.4)", () => {
    let scrollIntoView: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      scrollIntoView = vi.fn();
      // jsdom does not implement scrollIntoView; provide a spy for all elements.
      Element.prototype.scrollIntoView = scrollIntoView;
    });

    it("scrolls the matching section into view when a nav link is activated", async () => {
      const user = userEvent.setup();
      renderNavbar();

      const primary = screen.getByRole("navigation", { name: "Primary" });
      await user.click(within(primary).getByText("Projects"));

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      // Reduced motion is off in tests (matchMedia stub returns matches:false),
      // so smooth scrolling is used.
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    });

    it("scrolls to the section corresponding to the activated link", async () => {
      const user = userEvent.setup();
      renderNavbar();

      const experienceEl = document.getElementById("experience")!;
      const experienceSpy = vi.fn();
      experienceEl.scrollIntoView = experienceSpy;

      const primary = screen.getByRole("navigation", { name: "Primary" });
      await user.click(within(primary).getByText("Experience"));

      expect(experienceSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("active-section indication (Req 4.5)", () => {
    let observerCallback: IntersectionObserverCallback | null;
    let originalIO: typeof IntersectionObserver;

    beforeEach(() => {
      observerCallback = null;
      originalIO = globalThis.IntersectionObserver;

      // Multiple observers may be constructed (e.g. next/link creates one
      // for viewport prefetching). Capture the callback belonging to the
      // observer that actually watches the <section> anchors — that's the
      // active-section tracker from useActiveSection.
      class CapturingObserver implements IntersectionObserver {
        readonly root: Element | Document | null = null;
        readonly rootMargin: string = "";
        readonly thresholds: ReadonlyArray<number> = [];
        private readonly cb: IntersectionObserverCallback;
        constructor(cb: IntersectionObserverCallback) {
          this.cb = cb;
        }
        observe(target: Element) {
          if (target.tagName === "SECTION") {
            observerCallback = this.cb;
          }
        }
        unobserve() {}
        disconnect() {}
        takeRecords(): IntersectionObserverEntry[] {
          return [];
        }
      }

      globalThis.IntersectionObserver =
        CapturingObserver as unknown as typeof IntersectionObserver;
    });

    afterEach(() => {
      globalThis.IntersectionObserver = originalIO;
    });

    it("marks the section currently in view as the active nav link", () => {
      renderNavbar();

      expect(observerCallback).not.toBeNull();

      // Simulate the Skills section entering the viewport.
      act(() => {
        observerCallback!(
          [
            {
              target: document.getElementById("skills"),
              isIntersecting: true,
              intersectionRatio: 1,
            } as unknown as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      });

      const primary = screen.getByRole("navigation", { name: "Primary" });
      const skillsLink = within(primary).getByText("Skills");
      expect(skillsLink).toHaveAttribute("aria-current", "page");

      // A non-active link must not carry the active indication.
      const projectsLink = within(primary).getByText("Projects");
      expect(projectsLink).not.toHaveAttribute("aria-current", "page");
    });

    it("moves the active indication when a different section enters view", () => {
      renderNavbar();

      act(() => {
        observerCallback!(
          [
            {
              target: document.getElementById("projects"),
              isIntersecting: true,
              intersectionRatio: 1,
            } as unknown as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      });

      const primary = screen.getByRole("navigation", { name: "Primary" });
      expect(within(primary).getByText("Projects")).toHaveAttribute(
        "aria-current",
        "page",
      );

      // Projects leaves and Experience enters.
      act(() => {
        observerCallback!(
          [
            {
              target: document.getElementById("projects"),
              isIntersecting: false,
              intersectionRatio: 0,
            } as unknown as IntersectionObserverEntry,
            {
              target: document.getElementById("experience"),
              isIntersecting: true,
              intersectionRatio: 1,
            } as unknown as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      });

      expect(within(primary).getByText("Experience")).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(within(primary).getByText("Projects")).not.toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });

  describe("mobile menu link parity (Req 4.6)", () => {
    it("exposes the same link set in the mobile menu as the desktop navigation", async () => {
      const user = userEvent.setup();
      renderNavbar();

      const primary = screen.getByRole("navigation", { name: "Primary" });
      for (const label of navLabels) {
        expect(within(primary).getByText(label)).toBeInTheDocument();
      }
      // The Contact page link is exposed alongside the section links.
      expect(within(primary).getByText("Contact")).toHaveAttribute(
        "href",
        "/en/contact",
      );

      // Open the collapsible mobile menu.
      await user.click(screen.getByRole("button", { name: "Open menu" }));

      const mobile = screen.getByRole("navigation", { name: "Mobile" });
      for (const label of navLabels) {
        expect(within(mobile).getByText(label)).toBeInTheDocument();
      }
      expect(within(mobile).getByText("Contact")).toHaveAttribute(
        "href",
        "/en/contact",
      );
    });
  });

  describe("theme application across sections (Req 11.2, 11.3)", () => {
    beforeEach(() => {
      document.documentElement.classList.remove("dark");
      window.localStorage.clear();
    });

    afterEach(() => {
      cleanup();
      document.documentElement.classList.remove("dark");
      window.localStorage.clear();
    });

    it("applies the dark theme to the document root when the theme is toggled", async () => {
      const user = userEvent.setup();
      renderNavbar();

      expect(document.documentElement.classList.contains("dark")).toBe(false);

      await user.click(
        screen.getByRole("button", { name: "Switch to dark theme" }),
      );

      // next-themes toggles the `.dark` class on the document root, which the
      // design-token CSS variables cascade to every section (Req 11.2, 11.3).
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("returns to the light theme when toggled back", async () => {
      const user = userEvent.setup();
      renderNavbar();

      await user.click(
        screen.getByRole("button", { name: "Switch to dark theme" }),
      );
      expect(document.documentElement.classList.contains("dark")).toBe(true);

      await user.click(
        screen.getByRole("button", { name: "Switch to light theme" }),
      );
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });
});
