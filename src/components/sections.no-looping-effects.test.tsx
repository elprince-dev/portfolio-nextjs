import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import type { ReactElement } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CredibilitySection } from "@/components/CredibilitySection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { AIEngineeringSection } from "@/components/AIEngineeringSection";
import { EngineeringExcellenceSection } from "@/components/EngineeringExcellenceSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";

/**
 * Audit: the section components exclude particle effects, continuous looping
 * background animations, and neon/cyberpunk visual effects (Req 12.5).
 *
 * Each section is rendered and its markup is scanned for class tokens or
 * markers associated with the prohibited effects (looping spin/pulse/bounce/ping
 * utilities, particle/neon/cyberpunk markers). The entrance reveal used by
 * `MotionReveal` is a one-shot animation and is not a continuous loop, so it is
 * not flagged here.
 */

afterEach(cleanup);

const PROHIBITED = [
  // Continuous looping animation utilities.
  "animate-spin",
  "animate-ping",
  "animate-pulse",
  "animate-bounce",
  // Particle / neon / cyberpunk markers.
  "particle",
  "neon",
  "cyberpunk",
];

const sections: Array<{ name: string; element: ReactElement }> = [
  { name: "HeroSection", element: <HeroSection /> },
  { name: "CredibilitySection", element: <CredibilitySection /> },
  { name: "CertificationsSection", element: <CertificationsSection /> },
  { name: "AIEngineeringSection", element: <AIEngineeringSection /> },
  {
    name: "EngineeringExcellenceSection",
    element: <EngineeringExcellenceSection />,
  },
  { name: "ExperienceSection", element: <ExperienceSection /> },
  { name: "SkillsSection", element: <SkillsSection /> },
  { name: "ContactSection", element: <ContactSection /> },
];

describe("section components exclude particle/looping/neon effects (Req 12.5)", () => {
  for (const { name, element } of sections) {
    it(`${name} renders no prohibited looping or neon effects`, () => {
      const { container } = render(element);
      const markup = container.innerHTML.toLowerCase();
      for (const token of PROHIBITED) {
        expect(
          markup.includes(token),
          `${name} should not contain "${token}"`,
        ).toBe(false);
      }
    });
  }
});
