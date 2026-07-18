/**
 * Credibility / trust-signal content (Req 2.1–2.4).
 *
 * Values are preserved from the existing site content (`AboutSection`) and the
 * resume (`/public/Resume - External.md`):
 *  - Employer "Amazon" and a software-development role focus (Req 2.1).
 *  - The two AWS certifications actually held, with the count matching the named
 *    list (Req 2.2): AWS Solutions Architect Associate and AWS Cloud Practitioner.
 *  - At least three quantified metrics, each with a numeric value and a
 *    descriptive label, drawn from preserved content (Req 2.3, 2.4): 15+
 *    serverless applications, 8+ locations served, 2+ years of experience,
 *    and 20+ technologies.
 */

import type { CredibilityContent } from "@/content/types";

export const credibility: CredibilityContent = {
  employer: "Amazon",
  roleFocus: "Software Development",
  awsCertificationCount: 2,
  awsCertifications: [
    "AWS Solutions Architect Associate",
    "AWS Cloud Practitioner",
  ],
  metrics: [
    { value: "15+", label: "Serverless applications shipped" },
    { value: "8+", label: "Locations served" },
    { value: "2+", label: "Years of experience" },
    { value: "20+", label: "Technologies" },
  ],
};

export default credibility;
