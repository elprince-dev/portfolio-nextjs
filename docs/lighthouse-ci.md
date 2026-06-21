# Lighthouse CI — external performance, accessibility & SEO checks

This project verifies its external quality budgets (performance, Core Web
Vitals, accessibility, and SEO) with [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
plus a small SEO-route content check. These cover the "Integration Tests
(external metrics)" described in the design and the acceptance criteria below.

## What is asserted

Configured in [`lighthouserc.js`](../lighthouserc.js) and
[`scripts/check-seo-routes.mjs`](../scripts/check-seo-routes.mjs):

| Requirement | Assertion | Where |
| --- | --- | --- |
| 13.1 | Performance category score ≥ 95 | `categories:performance` ≥ 0.95 |
| 13.2 | LCP ≤ 2.5s (mobile simulation) | `largest-contentful-paint` ≤ 2500ms |
| 13.3 | CLS ≤ 0.1 | `cumulative-layout-shift` ≤ 0.1 |
| 13.5 | Route primary content render < 1s (mobile simulation) | `first-contentful-paint` ≤ 1000ms |
| 14.1 | Accessibility category score ≥ 95 | `categories:accessibility` ≥ 0.95 |
| 15.5 | SEO category score ≥ 95 | `categories:seo` ≥ 0.95 |
| 15.3 | `sitemap.xml` and `robots.txt` return valid content | `robots-txt` audit + `check:seo-routes` |

Lighthouse runs with `formFactor: "mobile"` and `throttlingMethod: "simulate"`,
matching the "Lighthouse simulated mobile conditions" wording in Requirements
13.2 and 13.5. The home page (`/`) and the preserved blog list (`/blog`) are
both collected.

## Running locally

Lighthouse needs a production build served over HTTP. The `lighthouse` script
uses `lhci autorun`, which builds a server from `npm run start`, collects three
runs per URL, and evaluates the assertions in `lighthouserc.js`.

```bash
npm install          # ensures @lhci/cli (devDependency) and Chrome deps are present
npm run build        # produce the optimized production build
npm run lighthouse   # collect Lighthouse runs and assert the budgets
```

To validate the SEO routes' content directly (Requirement 15.3) against a
running server:

```bash
npm run build
npm run start &                 # serve on http://localhost:3000
npm run check:seo-routes        # asserts /sitemap.xml and /robots.txt content
```

Override the base URL with `SEO_CHECK_BASE_URL` (for example when the server
runs on a different host/port in CI).

> Note: `npm run lighthouse` requires network access to install the Lighthouse
> CLI and a headless Chrome that can render the production build. In sandboxes
> without that access the thresholds above are still defined and ready to run;
> wire them into CI where Chrome is available.

## CI wiring

A minimal GitHub Actions job:

```yaml
- run: npm ci
- run: npm run build
- run: npm run lighthouse
- run: |
    npm run start &
    npx wait-on http://localhost:3000
    npm run check:seo-routes
```

The Lighthouse assertions fail the job (`["error", …]`) when any budget is not
met, so regressions in performance, accessibility, or SEO block the pipeline.
