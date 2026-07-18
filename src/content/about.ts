/**
 * About-section copy for the bento grid (presentation content layered on top
 * of the credibility data in `credibility.ts`, which remains the source of
 * truth for employer, role focus, certifications, and metrics — Req 2.1–2.4).
 */

export interface AboutContent {
  /** Short bio paragraph shown in the profile card. */
  bio: string;
  /** Home base shown in the timezone card (bold lead). */
  location: string;
  /** Supporting phrase after the location. */
  locationNote: string;
  /** Eyebrow label for the timezone card. */
  timezoneLabel: string;
  /** Availability status line. */
  availability: string;
  /** Three-line CTA headline: white line, rose line, italic tail. */
  visionLine1: string;
  visionLine2: string;
  visionTail: string;
  /** Label under the analog clock. */
  clockLabel: string;
  /** Featured quote card. */
  quote: { text: string; attribution: string };
}

export const about: AboutContent = {
  bio: "I'm a software engineer with a data background who builds and ships production systems on AWS — retrieval-augmented and agentic AI applications, serverless platforms, and type-safe full-stack products. I own engineering end to end, from architecture through production.",
  location: "Based in Milton, ON,",
  locationNote: "available globally",
  timezoneLabel: "Flexible with timezones",
  availability: "Available for work",
  visionLine1: "Have a vision?",
  visionLine2: "Let's build it",
  visionTail: "together.",
  clockLabel: "Toronto",
  quote: {
    text: "It's still Day 1.",
    attribution: "Jeff Bezos",
  },
};

export default about;
