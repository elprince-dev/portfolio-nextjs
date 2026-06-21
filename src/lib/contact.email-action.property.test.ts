import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { resolveEmailAction } from "@/lib/contact";

describe("resolveEmailAction (Property 17)", () => {
  // Feature: portfolio-redesign, Property 17: Email action resolves to compose or clipboard fallback
  // Validates: Requirements 10.3, 10.4
  it("returns a compose action when composition opens and a clipboard fallback when it fails", () => {
    fc.assert(
      fc.property(fc.boolean(), fc.string(), (opened, address) => {
        const action = resolveEmailAction(opened, address);

        if (opened) {
          // Composition opened: compose action targeting mailto:<address>.
          expect(action.kind).toBe("compose");
          expect(action).toEqual({
            kind: "compose",
            mailto: `mailto:${address}`,
          });
        } else {
          // Composition failed: fallback copies the raw address to clipboard.
          expect(action.kind).toBe("fallback-copy");
          expect(action).toEqual({ kind: "fallback-copy", address });
        }
      }),
      { numRuns: 100 },
    );
  });
});
