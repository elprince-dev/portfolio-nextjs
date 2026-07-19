import { describe, it, expect } from "vitest";
import { generateMetadata } from "@/app/[locale]/layout";
import { personJsonLd } from "@/lib/structured-data";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteUrl } from "@/lib/site";
import { contact } from "@/content/contact";

// The locale layout builds metadata per locale; assert on the default (en).
const metadata = generateMetadata({ params: { locale: "en" } });

/**
 * Metadata, structured-data, sitemap, and robots tests (Req 15.1–15.4).
 *
 * Asserts the home page defines a title and description (Req 15.1), Open Graph
 * and Twitter Card metadata with a preview image (Req 15.2), a sitemap and
 * robots that return valid content (Req 15.3), and Person structured data
 * (Req 15.4).
 */

describe("home page title and description (Req 15.1)", () => {
  it("defines a non-empty page title", () => {
    const title = metadata.title;
    const resolved =
      typeof title === "string"
        ? title
        : (title as { default?: string } | null)?.default;
    expect(resolved).toBeTruthy();
    expect(resolved).toMatch(/mohammad el prince/i);
  });

  it("defines a non-empty meta description", () => {
    expect(metadata.description).toBeTruthy();
    expect((metadata.description ?? "").length).toBeGreaterThan(20);
  });
});

describe("Open Graph and Twitter Card metadata (Req 15.2)", () => {
  it("defines Open Graph title, description, and a preview image", () => {
    const og = metadata.openGraph;
    expect(og).toBeTruthy();
    expect(og?.title).toBeTruthy();
    expect((og as { description?: string })?.description).toBeTruthy();
    const images = (og as { images?: unknown }).images;
    expect(Array.isArray(images)).toBe(true);
    expect((images as unknown[]).length).toBeGreaterThan(0);
  });

  it("defines a Twitter Card with title, description, and image", () => {
    const twitter = metadata.twitter;
    expect(twitter).toBeTruthy();
    expect((twitter as { card?: string })?.card).toBe("summary_large_image");
    expect((twitter as { title?: string })?.title).toBeTruthy();
    expect((twitter as { description?: string })?.description).toBeTruthy();
    const images = (twitter as { images?: unknown }).images;
    expect(Array.isArray(images) ? (images as unknown[]).length : 0).toBeGreaterThan(
      0,
    );
  });

  it("sets a metadataBase so relative URLs resolve absolutely (Req 15.3)", () => {
    expect(metadata.metadataBase).toBeInstanceOf(URL);
  });
});

describe("sitemap.xml content (Req 15.3)", () => {
  it("returns entries for the home and contact routes in both locales with absolute URLs", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(0);
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain(`${siteUrl}/en`);
    expect(urls).toContain(`${siteUrl}/en/contact`);
    expect(urls).toContain(`${siteUrl}/ar`);
    expect(urls).toContain(`${siteUrl}/ar/contact`);
    for (const entry of entries) {
      expect(entry.url.startsWith("http")).toBe(true);
    }
  });
});

describe("robots.txt content (Req 15.3)", () => {
  it("allows crawling and references the sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules?.userAgent).toBe("*");
    expect(rules?.allow).toBe("/");
    expect(result.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });
});

describe("Person structured data (Req 15.4)", () => {
  it("describes Mohammad as a schema.org Person", () => {
    expect(personJsonLd["@context"]).toBe("https://schema.org");
    expect(personJsonLd["@type"]).toBe("Person");
    expect(personJsonLd.name).toMatch(/mohammad el prince/i);
  });

  it("includes the contact email and social profiles", () => {
    expect(personJsonLd.email).toBe(`mailto:${contact.email}`);
    expect(personJsonLd.sameAs).toContain(contact.linkedinUrl);
    expect(personJsonLd.sameAs).toContain(contact.githubUrl);
  });

  it("serializes to valid JSON for the ld+json script", () => {
    const serialized = JSON.stringify(personJsonLd);
    expect(() => JSON.parse(serialized)).not.toThrow();
    expect(JSON.parse(serialized)["@type"]).toBe("Person");
  });
});
