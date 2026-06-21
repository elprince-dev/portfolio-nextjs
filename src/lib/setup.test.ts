import { describe, it, expect } from "vitest";
import fc from "fast-check";

// Smoke test confirming the Vitest + fast-check toolchain runs under TypeScript.
describe("testing toolchain", () => {
  it("runs a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("runs a property-based assertion via fast-check", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return a + b === b + a;
      }),
    );
  });
});
