import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import {
  designTokens,
  lightPalette,
  darkPalette,
  type Palette,
} from "@/content/tokens";
import tailwindConfig from "../../tailwind.config";

/**
 * Token audit (Task 2.3).
 *
 * Asserts the Design_System tokens are both *defined* (typography, spacing,
 * color, gradients, surfaces, with the large section-spacing value present) and
 * *consumed* by the Tailwind theme extension and `globals.css`, and spot-checks
 * that the light/dark palette text/interactive pairings meet WCAG AA contrast.
 *
 * Validates: Requirements 11.1, 11.4, 11.5, 11.6, 14.5
 */

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, "../..");
const globalsCss = readFileSync(
  resolve(repoRoot, "src/styles/globals.css"),
  "utf8",
);

// ---------------------------------------------------------------------------
// WCAG contrast helpers (WCAG 2.1 relative luminance + contrast ratio).
// ---------------------------------------------------------------------------

/** Parse a `#rrggbb` hex color into its 0-255 RGB channels. */
function parseHex(hex: string): [number, number, number] {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) {
    throw new Error(`Expected a #rrggbb color, received: ${hex}`);
  }
  const value = match[1];
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

/** Relative luminance per WCAG 2.1 (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance). */
function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two colors, from 1:1 to 21:1. */
function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG AA: 4.5:1 for normal-size text, 3:1 for large text / UI components.
const AA_NORMAL_TEXT = 4.5;

// ---------------------------------------------------------------------------
// Tokens are defined
// ---------------------------------------------------------------------------

describe("design tokens are defined (Req 11.1, 11.5, 11.6)", () => {
  it("defines a non-empty typography scale and a six-level heading hierarchy", () => {
    expect(Object.keys(designTokens.typography.scale).length).toBeGreaterThan(0);
    // h1..h6 hierarchy (Req 11.5).
    expect(designTokens.typography.headingHierarchy).toHaveLength(6);
    // Every hierarchy key resolves to a defined scale step.
    for (const key of designTokens.typography.headingHierarchy) {
      expect(designTokens.typography.scale).toHaveProperty(key);
    }
  });

  it("defines a spacing scale containing the large section spacing value (Req 11.6)", () => {
    expect(Object.keys(designTokens.spacing).length).toBeGreaterThan(0);
    expect(designTokens.spacing).toHaveProperty("section");
    expect(designTokens.spacing.section).toBeTruthy();
  });

  it("defines light and dark color palettes with every semantic role", () => {
    const requiredRoles: (keyof Palette)[] = [
      "background",
      "surface",
      "surfaceElevated",
      "border",
      "textPrimary",
      "textSecondary",
      "textMuted",
      "accent",
      "accentForeground",
    ];
    for (const role of requiredRoles) {
      expect(designTokens.color.light[role]).toBeTruthy();
      expect(designTokens.color.dark[role]).toBeTruthy();
    }
  });

  it("defines gradients and glass/elevated surface styles", () => {
    expect(Object.keys(designTokens.gradients).length).toBeGreaterThan(0);
    expect(designTokens.surfaces.glass).toBeTruthy();
    expect(designTokens.surfaces.elevated).toBeTruthy();
  });

  it("treats the section spacing as the largest spacing step (Req 11.6)", () => {
    const toRem = (value: string): number => parseFloat(value);
    const sectionRem = toRem(designTokens.spacing.section);
    for (const [key, value] of Object.entries(designTokens.spacing)) {
      if (key === "section") continue;
      expect(sectionRem).toBeGreaterThanOrEqual(toRem(value));
    }
  });
});

// ---------------------------------------------------------------------------
// Tokens are consumed by Tailwind + globals.css
// ---------------------------------------------------------------------------

describe("design tokens are consumed (Req 11.1, 11.6)", () => {
  it("wires the typography scale into the Tailwind fontSize theme", () => {
    const fontSize = tailwindConfig.theme?.extend?.fontSize;
    expect(fontSize).toEqual(designTokens.typography.scale);
  });

  it("wires the spacing scale and section-spacing alias into Tailwind", () => {
    const spacing = tailwindConfig.theme?.extend?.spacing as
      | Record<string, string>
      | undefined;
    expect(spacing).toBeDefined();
    for (const [key, value] of Object.entries(designTokens.spacing)) {
      expect(spacing).toHaveProperty(key, value);
    }
    // The large section spacing value is exposed via the alias (Req 11.6).
    expect(spacing).toHaveProperty(
      "section-spacing",
      designTokens.spacing.section,
    );
  });

  it("wires the gradients into the Tailwind backgroundImage theme", () => {
    const backgroundImage = tailwindConfig.theme?.extend?.backgroundImage as
      | Record<string, string>
      | undefined;
    expect(backgroundImage).toBeDefined();
    expect(backgroundImage?.["gradient-brand"]).toBe(
      designTokens.gradients.brand,
    );
    expect(backgroundImage?.["gradient-subtle"]).toBe(
      designTokens.gradients.subtle,
    );
  });

  it("exposes the color palette through theme-aware CSS variables in globals.css", () => {
    // Light palette variables.
    expect(globalsCss).toContain(
      `--color-background: ${lightPalette.background}`,
    );
    expect(globalsCss).toContain(
      `--color-text-primary: ${lightPalette.textPrimary}`,
    );
    expect(globalsCss).toContain(`--color-accent: ${lightPalette.accent}`);
    // Dark palette variables (inside the `.dark` scope).
    expect(globalsCss).toContain(
      `--color-background: ${darkPalette.background}`,
    );
    expect(globalsCss).toContain(
      `--color-text-primary: ${darkPalette.textPrimary}`,
    );
    expect(globalsCss).toContain(`--color-accent: ${darkPalette.accent}`);
  });

  it("uses the large section spacing value for the section-spacing utility (Req 11.6)", () => {
    // The variable is defined with the token value...
    expect(globalsCss).toContain(
      `--spacing-section: ${designTokens.spacing.section}`,
    );
    // ...and the `.section-spacing` utility consumes that variable.
    const utilityMatch = /\.section-spacing\s*\{[^}]*\}/.exec(globalsCss);
    expect(utilityMatch).not.toBeNull();
    expect(utilityMatch?.[0]).toContain("var(--spacing-section)");
  });

  it("defines the glass and elevated surface utilities in globals.css", () => {
    expect(globalsCss).toContain(".surface-glass");
    expect(globalsCss).toContain(".surface-elevated");
  });
});

// ---------------------------------------------------------------------------
// Contrast spot-checks (Req 11.4, 14.5)
// ---------------------------------------------------------------------------

describe("palette contrast meets WCAG AA (Req 11.4, 14.5)", () => {
  const themes: { name: string; palette: Palette }[] = [
    { name: "light", palette: lightPalette },
    { name: "dark", palette: darkPalette },
  ];

  for (const { name, palette } of themes) {
    describe(`${name} theme`, () => {
      it("renders primary text over the background at >= 4.5:1", () => {
        expect(
          contrastRatio(palette.textPrimary, palette.background),
        ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      });

      it("renders secondary text over the background at >= 4.5:1", () => {
        expect(
          contrastRatio(palette.textSecondary, palette.background),
        ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      });

      it("renders muted text over the background at >= 4.5:1", () => {
        expect(
          contrastRatio(palette.textMuted, palette.background),
        ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      });

      it("renders primary text over the surface at >= 4.5:1", () => {
        expect(
          contrastRatio(palette.textPrimary, palette.surface),
        ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      });

      it("renders primary text over the elevated surface at >= 4.5:1", () => {
        expect(
          contrastRatio(palette.textPrimary, palette.surfaceElevated),
        ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      });

      it("renders accent-foreground over the accent at >= 4.5:1", () => {
        expect(
          contrastRatio(palette.accentForeground, palette.accent),
        ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      });
    });
  }
});
