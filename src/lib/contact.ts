/**
 * Contact logic layer (Requirements 10.3, 10.4, 10.5).
 *
 * Pure functions that isolate the contact-flow business rules from React
 * rendering so they can be verified independently (see design Properties 16
 * and 17).
 */

/**
 * Validates whether a string is a well-formed email address (Req 10.5).
 *
 * Accepts a single `local@domain` address where:
 * - the local part is non-empty and contains no whitespace or `@`,
 * - the domain has at least one dot-separated label and a top-level label of
 *   two or more letters,
 * - there is exactly one `@`.
 *
 * Returns `false` for anything else (empty strings, missing parts, leading or
 * trailing dots, consecutive dots, whitespace, etc.).
 */
export function isValidEmail(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  const trimmed = value.trim();

  // Reject values whose surrounding whitespace was significant, and any empty
  // input, before applying the structural check.
  if (trimmed.length === 0 || trimmed !== value) {
    return false;
  }

  // local@domain with:
  // - local: one or more chars excluding whitespace, @ and dots at the edges
  // - domain: dot-separated labels, TLD of >= 2 letters
  const emailPattern =
    /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[^\s@.]+\.)+[A-Za-z]{2,}$/;

  return emailPattern.test(trimmed);
}

/**
 * The outcome of attempting to start an email conversation with the visitor's
 * mail client (Req 10.3, 10.4).
 *
 * - `compose`: the email composition opened successfully and targets
 *   `mailto:<address>`.
 * - `fallback-copy`: composition failed; the address should be copied to the
 *   clipboard and the visitor notified.
 */
export type ContactAction =
  | { kind: "compose"; mailto: string }
  | { kind: "fallback-copy"; address: string };

/**
 * Resolves the contact action based on whether email composition opened
 * (Req 10.3, 10.4).
 *
 * @param opened - `true` when the mail client's compose window opened
 *   successfully, `false` when it failed to open.
 * @param address - the destination email address.
 * @returns a `compose` action targeting `mailto:<address>` when `opened` is
 *   `true`, otherwise a `fallback-copy` action carrying the raw `address`.
 */
export function resolveEmailAction(
  opened: boolean,
  address: string,
): ContactAction {
  if (opened) {
    return { kind: "compose", mailto: `mailto:${address}` };
  }

  return { kind: "fallback-copy", address };
}
