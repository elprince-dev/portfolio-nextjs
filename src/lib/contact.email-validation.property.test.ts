import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { isValidEmail } from "@/lib/contact";

// Builds a well-formed `local@domain` address from constrained parts so the
// generator stays inside the valid input space: a non-empty local part of
// dot-separated labels, one or more domain labels, and a >= 2 letter TLD.
const labelArb = fc
  .string({ minLength: 1, maxLength: 8 })
  .filter((s) => /^[^\s@.]+$/.test(s));

const validEmailArb: fc.Arbitrary<string> = fc
  .record({
    local: fc.array(labelArb, { minLength: 1, maxLength: 3 }),
    domain: fc.array(labelArb, { minLength: 1, maxLength: 3 }),
    tld: fc
      .string({ minLength: 2, maxLength: 6 })
      .filter((s) => /^[A-Za-z]+$/.test(s)),
  })
  .map(
    ({ local, domain, tld }) =>
      `${local.join(".")}@${domain.join(".")}.${tld}`,
  );

describe("isValidEmail (Property 16)", () => {
  // Feature: portfolio-redesign, Property 16: Email validation rejects malformed addresses
  // Validates: Requirements 10.5
  it("accepts well-formed addresses and rejects malformed input", () => {
    fc.assert(
      fc.property(validEmailArb, (email) => {
        expect(isValidEmail(email)).toBe(true);
      }),
      { numRuns: 100 },
    );

    // Arbitrary strings must never be accepted unless they happen to satisfy
    // the structural definition of a well-formed address; the oracle below
    // expresses that same definition independently of the implementation regex.
    const looksWellFormed = (value: string): boolean => {
      if (value.trim() !== value || value.length === 0) {
        return false;
      }
      const at = value.split("@");
      if (at.length !== 2) {
        return false;
      }
      const [local, domain] = at;
      const localOk =
        local.length > 0 &&
        !/\s/.test(local) &&
        !local.startsWith(".") &&
        !local.endsWith(".") &&
        !local.includes("..");
      const labels = domain.split(".");
      const domainOk =
        labels.length >= 2 &&
        labels.every((l) => l.length > 0 && !/\s/.test(l)) &&
        /^[A-Za-z]{2,}$/.test(labels[labels.length - 1]);
      return localOk && domainOk;
    };

    fc.assert(
      fc.property(fc.string({ maxLength: 40 }), (value) => {
        expect(isValidEmail(value)).toBe(looksWellFormed(value));
      }),
      { numRuns: 100 },
    );
  });
});
