/**
 * Lighthouse CI configuration — Final verification (Task 11.2).
 *
 * Runs Lighthouse against a production build of the home page (both locales)
 * and asserts the external performance, accessibility, and SEO metrics
 * defined by the design's "Integration Tests (external metrics)" section.
 * Each assertion is annotated with the requirement it validates.
 *
 * Lighthouse defaults to an emulated mobile device with simulated network/CPU
 * throttling, which matches the "Lighthouse simulated mobile conditions"
 * language in Requirements 13.2 and 13.5.
 *
 * Usage (requires a production build first):
 *   npm run build
 *   npm run lighthouse           # lhci autorun: build server + collect + assert
 *
 * See docs/lighthouse-ci.md for details and CI wiring.
 *
 * Requirements covered:
 *   13.1 Performance   >= 95   (categories:performance >= 0.95)
 *   13.2 LCP           <= 2.5s (largest-contentful-paint <= 2500ms, mobile sim)
 *   13.3 CLS           <= 0.1  (cumulative-layout-shift <= 0.1)
 *   13.5 Route render  <  1s   (first-contentful-paint <= 1000ms, mobile sim)
 *   14.1 Accessibility >= 95   (categories:accessibility >= 0.95)
 *   15.5 SEO           >= 95   (categories:seo >= 0.95)
 *   15.3 sitemap/robots return valid content (robots-txt audit + crawlable-anchors;
 *        full sitemap.xml/robots.txt content validated by scripts/check-seo-routes.mjs)
 */

// Locale-prefixed targets: "/" 307-redirects to the default locale (/en)
// via the i18n middleware. Lighthouse must audit the final URLs directly —
// auditing a redirecting URL adds a navigation hop under simulated mobile
// throttling, which unfairly blows the FCP/LCP budgets and dings the SEO
// category. Both locales of the home page are asserted.
const TARGET_URLS = [
  "http://localhost:3000/en",
  "http://localhost:3000/ar",
];

module.exports = {
  ci: {
    collect: {
      // Serve the production build, then collect Lighthouse runs against it.
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in|started server on|- Local:",
      startServerReadyTimeout: 60000,
      url: TARGET_URLS,
      // Multiple runs reduce metric variance; LHCI takes the median run.
      numberOfRuns: 3,
      settings: {
        // Explicit mobile emulation with simulated throttling so the LCP/FCP
        // budgets are evaluated under "simulated mobile conditions"
        // (Requirements 13.2, 13.5).
        formFactor: "mobile",
        throttlingMethod: "simulate",
      },
    },
    assert: {
      // Category-score budgets apply to every collected URL. The metric and
      // SEO-route assertions below are the home-page acceptance criteria.
      assertions: {
        // 13.1 Performance category >= 95
        "categories:performance": ["error", { minScore: 0.95 }],
        // 14.1 Accessibility category >= 95
        "categories:accessibility": ["error", { minScore: 0.95 }],
        // 15.5 SEO category >= 95
        "categories:seo": ["error", { minScore: 0.95 }],

        // 13.2 Largest Contentful Paint within 2.5s (mobile simulation)
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        // 13.3 Cumulative Layout Shift at most 0.1
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        // 13.5 Destination route primary content rendered within 1s
        // (first contentful paint, mobile simulation)
        "first-contentful-paint": ["error", { maxNumericValue: 1000 }],

        // 15.3 robots.txt is present and valid (Lighthouse SEO audit). The
        // sitemap.xml/robots.txt body content is additionally validated over
        // HTTP by scripts/check-seo-routes.mjs (npm run check:seo-routes).
        "robots-txt": ["error", { minScore: 1 }],
      },
    },
    upload: {
      // Store reports in temporary public storage by default. Override in CI
      // (e.g. with LHCI server / filesystem target) as needed.
      target: "temporary-public-storage",
    },
  },
};
