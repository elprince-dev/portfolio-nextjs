/**
 * Certifications content (Req 9.1, 9.2).
 *
 * Presents the two AWS certifications Mohammad actually holds (Req 9.1), each
 * with its name and issuing organization (Req 9.2). Values are preserved from
 * the resume (`/public/Resume - External.md`). The elevated surface treatment
 * (Req 9.3) is applied by the presentation layer.
 */

import type { Certification } from "@/content/types";

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
  },
];

export default certifications;
