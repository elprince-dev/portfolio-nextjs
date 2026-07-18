import type { ComponentType } from "react";
import type { SectionId } from "@/lib/sections";
import type { Locale } from "@/lib/i18n";
import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import ProjectsSection from "@/components/ProjectsSection";
import AIEngineeringSection from "@/components/AIEngineeringSection";
import EngineeringExcellenceSection from "@/components/EngineeringExcellenceSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ConnectSection from "@/components/ConnectSection";

/**
 * Maps each {@link SectionId} to the component that renders it. The home page
 * iterates the ordered section registry and renders these components, so the
 * canonical ordering (Req 4.1) and the rendered sequence stay in sync from a
 * single source of truth. Each component renders its own `<section>` with a
 * stable DOM id equal to its {@link SectionId}, used for scroll navigation and
 * active-section detection.
 */
export const sectionComponents: Record<
  SectionId,
  ComponentType<{ locale?: Locale }>
> = {
  hero: HeroSection,
  credibility: CredibilitySection,
  projects: ProjectsSection,
  "ai-engineering": AIEngineeringSection,
  "engineering-excellence": EngineeringExcellenceSection,
  experience: ExperienceSection,
  skills: SkillsSection,
  connect: ConnectSection,
};
