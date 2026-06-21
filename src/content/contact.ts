/**
 * Contact content (Req 10.1, 10.2).
 *
 * Provides the contact channels displayed by the Contact section (Req 10.1) —
 * email, LinkedIn (`elprince-dev`), and GitHub (`elprince-dev`) — and the label
 * for the primary call-to-action that initiates contact (Req 10.2). Values are
 * preserved from the existing `Contact` and `Footer` components.
 *
 * The email-composition and clipboard-fallback behavior (Req 10.3, 10.4) is
 * implemented by the logic layer (`src/lib/contact.ts`) and the Contact section
 * component; this module only supplies the addresses and labels.
 */

import type { ContactContent } from "@/content/types";

export const contact: ContactContent = {
  email: "mohammad-elprince@proton.me",
  linkedinUrl: "https://www.linkedin.com/in/elprince-dev/",
  githubUrl: "https://github.com/elprince-dev",
  primaryCtaLabel: "Get in touch",
};

export default contact;
