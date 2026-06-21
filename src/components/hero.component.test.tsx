import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "jest-axe";
import { HeroSection } from "@/components/HeroSection";
import { contact } from "@/content/contact";

/**
 * Component and accessibility tests for HeroSection (Req 1.1–1.6, 14.3).
 *
 * Verifies the Hero composition and calls-to-action: name and positioning
 * statement covering AI Engineering and Software Engineering
 * (Req 1.1), the professional photo from `/myPhoto.png` (Req 1.2), the primary
 * CTA to Projects and the resume secondary action (Req 1.3), and the direct
 * LinkedIn/GitHub links (Req 1.5). Core elements render together so the section
 * is shown rather than hidden (Req 1.4, 1.6). Interactive elements expose a
 * visible focus indicator (Req 14.3).
 */

afterEach(cleanup);

describe("HeroSection composition and CTAs (Req 1.1–1.6)", () => {
  it("displays Mohammad's name (Req 1.1)", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: /mohammad el prince/i }),
    ).toBeInTheDocument();
  });

  it("displays a positioning statement covering AI and Software Engineering (Req 1.1)", () => {
    render(<HeroSection />);
    const section = screen.getByLabelText("Introduction");
    const text = section.textContent ?? "";
    expect(text).toMatch(/AI Engineer/i);
    expect(text).toMatch(/Software Engineer/i);
  });

  it("renders the professional photo from /myPhoto.png with descriptive alt (Req 1.2)", () => {
    render(<HeroSection />);
    const photo = screen.getByAltText("Mohammad El Prince");
    expect(photo).toBeInTheDocument();
    expect(photo.getAttribute("src") ?? "").toContain("myPhoto");
  });

  it("primary CTA navigates to the Projects section (Req 1.3)", () => {
    render(<HeroSection />);
    const primary = screen.getByTestId("hero-primary-cta");
    expect(primary).toHaveAttribute("href", "#projects");
  });

  it("secondary action opens the preserved resume PDF (Req 1.3)", () => {
    render(<HeroSection />);
    const resume = screen.getByTestId("hero-resume-cta");
    expect(resume).toHaveAttribute("href", "/Resume - External.pdf");
  });

  it("displays direct LinkedIn and GitHub links (Req 1.5)", () => {
    render(<HeroSection />);
    const linkedin = screen.getByRole("link", {
      name: /linkedin/i,
    });
    const github = screen.getByRole("link", { name: /github/i });
    expect(linkedin).toHaveAttribute("href", contact.linkedinUrl);
    expect(github).toHaveAttribute("href", contact.githubUrl);
  });

  it("renders the core elements together so the section is shown, not hidden (Req 1.4, 1.6)", () => {
    render(<HeroSection />);
    // Name, positioning statement, and primary CTA are all present.
    expect(
      screen.getByRole("heading", { level: 1, name: /mohammad el prince/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-primary-cta")).toBeInTheDocument();
    expect(screen.getByLabelText("Introduction").textContent).toMatch(
      /AI Engineer/i,
    );
  });

  it("interactive elements expose a visible focus indicator (Req 14.3)", () => {
    render(<HeroSection />);
    const interactives = [
      screen.getByTestId("hero-primary-cta"),
      screen.getByTestId("hero-resume-cta"),
    ];
    for (const el of interactives) {
      expect(el.className).toMatch(/focus-visible:ring/);
    }
  });

  it("has no accessibility violations (Req 14.3)", async () => {
    const { container } = render(<HeroSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
