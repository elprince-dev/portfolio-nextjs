/**
 * SEO route content check — Final verification (Task 11.2, Requirement 15.3).
 *
 * Complements the Lighthouse CI run (lighthouserc.js) by asserting that the
 * `sitemap.xml` and `robots.txt` routes are served and return valid content.
 * Lighthouse's `robots-txt` audit only validates syntax, so this script makes
 * the "return valid content" guarantee explicit for both routes.
 *
 * Usage (against a running production server):
 *   npm run build
 *   npm run start &           # serve on http://localhost:3000
 *   npm run check:seo-routes  # validates /sitemap.xml and /robots.txt
 *
 * Override the base URL via SEO_CHECK_BASE_URL (defaults to localhost:3000).
 */

const BASE_URL = (process.env.SEO_CHECK_BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Fetch a route and assert it returns HTTP 200 with non-empty body content. */
async function fetchRoute(path) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url);
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`${path} returned HTTP ${res.status} (expected 200)`);
  }
  if (body.trim().length === 0) {
    throw new Error(`${path} returned an empty body`);
  }
  return { res, body };
}

/** 15.3 — sitemap.xml must be valid XML listing at least the home route. */
async function checkSitemap() {
  const { body } = await fetchRoute("/sitemap.xml");
  if (!/<urlset[\s>]/i.test(body) || !/<\/urlset>/i.test(body)) {
    throw new Error("/sitemap.xml is missing a <urlset> document element");
  }
  if (!/<loc>\s*https?:\/\/[^<]+<\/loc>/i.test(body)) {
    throw new Error("/sitemap.xml does not contain any <loc> URL entries");
  }
  console.log("PASS  /sitemap.xml returns a valid urlset with URL entries");
}

/** 15.3 — robots.txt must be valid and reference the sitemap. */
async function checkRobots() {
  const { body } = await fetchRoute("/robots.txt");
  if (!/user-agent:/i.test(body)) {
    throw new Error("/robots.txt is missing a User-agent directive");
  }
  if (!/sitemap:\s*https?:\/\/\S+\/sitemap\.xml/i.test(body)) {
    throw new Error("/robots.txt does not reference the sitemap.xml URL");
  }
  console.log("PASS  /robots.txt returns valid directives referencing the sitemap");
}

async function main() {
  console.log(`Checking SEO routes against ${BASE_URL} ...`);
  await checkSitemap();
  await checkRobots();
  console.log("All SEO route content checks passed (Requirement 15.3).");
}

main().catch((err) => {
  console.error(`FAIL  ${err.message}`);
  process.exit(1);
});
