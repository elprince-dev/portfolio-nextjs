import { describe, it, expect } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import fc from "fast-check";
import { CertificationsSection } from "@/components/CertificationsSection";
import { certifications } from "@/content/certifications";

/**
 * Property 15: Certifications are structurally complete.
 *
 * For any Certification, the rendered item includes both the certification name
 * and the issuing organization.
 *
 * The CertificationsSection renders the authored certifications content, so we
 * quantify over each rendered certification item and assert that both its name
 * and issuer text are present in the rendered output.
 *
 * Feature: portfolio-redesign, Property 15: Certifications are structurally complete
 * Validates: Requirements 9.2
 */

describe("Certifications are structurally complete (Property 15)", () => {
  it("every rendered certification item shows its name and issuer", () => {
    // Sanity: there is at least one certification to quantify over.
    expect(certifications.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...certifications), (certification) => {
        render(<CertificationsSection />);
        try {
          const items = screen.getAllByTestId("certification-item");
          // Find the rendered item whose name matches this certification.
          const match = items.find((item) =>
            within(item).queryByText(certification.name) !== null,
          );
          expect(match, `no rendered item for "${certification.name}"`).toBeDefined();

          const scoped = within(match as HTMLElement);
          // Both the name and the issuing organization are present (Req 9.2).
          expect(scoped.getByText(certification.name)).toBeInTheDocument();
          expect(scoped.getByText(certification.issuer)).toBeInTheDocument();
        } finally {
          cleanup();
        }
      }),
      { numRuns: 100 },
    );
  });
});
