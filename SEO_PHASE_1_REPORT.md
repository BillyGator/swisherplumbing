# SEO Phase 1 — Crawlable Static Architecture Report

**Date:** 2026-09-03 (technical corrections pass 2026-09-04)
**Branch:** `seo/phase-1-crawlable-architecture`
**Scope:** convert the one-page client-rendered site into a small, crawlable,
statically generated local-business website. No framework migration, no
redesign, no invented business facts.

> **Status: corrections pass complete, locally verified, delivered as one
> commit on this branch with a pull request opened against `main`. The PR was
> NOT merged and nothing was deployed** (merging auto-deploys via Plesk).
> Every live-server statement below is about the *previous* Phase 0 state
> unless explicitly marked otherwise.
>
> **Content policy update (2026-09-04):** the owner confirmed that all content
> on the pre-existing client-approved website — business history, service
> areas, services, hours, testimonials, statistics, emergency-service wording,
> licensing information, and other original claims — is verified and approved.
> `OWNER_FACT_CHECK.md` carries this confirmation at the top of the file. The
> Phase 1 interior pages intentionally stay conservative anyway (they were
> written before the confirmation), and no approved claim was removed or
> neutralized anywhere.

## Corrections pass (2026-09-04)

Twelve focused technical fixes applied on top of the initial implementation,
per independent review:

1. **`code-path` debugging attributes removed from all production output.**
   `vite.config.ts` now loads `kimi-plugin-inspect-react` only for `vite serve`
   in ordinary local development; production builds and the SSR prerender
   (`scripts/prerender.mjs` sets `PRERENDER=1`) exclude it. The validator
   asserts zero `code-path=` occurrences on every route.
2. **React startup corrected for prerendered pages.** `src/main.tsx` uses
   `hydrateRoot()` when `#root` already contains SSR markup and falls back to
   `createRoot()` only for an empty root (development). `RevealOnScroll` was
   rewritten so server and first client render emit identical plain markup;
   the reveal-hidden states are applied post-hydration via an
   IntersectionObserver effect and are gated behind an `html.js` class set by
   an inline script, so content never flashes away and reduced-motion users
   get no animation. Server/client markup match is guaranteed by construction
   (no browser-API reads during render); a live browser click-through is
   still listed for the reviewer in the checklist.
3. **`scripts/validate-static.mjs` made genuine.** `check()` now returns a
   Boolean; the JSON-LD branch actually executes. JSON-LD validation parses
   every block and asserts: exactly one block, parseable JSON, correct
   `@context`, non-empty `@graph`, no empty values (deep scan), unique and
   stable `@id`s (`#business`, `#website`, per-route `#webpage`), route-specific
   node types, `Service.provider` referencing the `Plumber` entity,
   sequential `BreadcrumbList` positions with canonical absolute item URLs
   ending at the page canonical. A built-in negative self-test (malformed
   JSON, wrong `@context`, wrong provider reference) proves invalid input is
   rejected — if any fixture passes, the validator fails itself. Asset
   validation now discovers every local reference from HTML (`src`, `href`,
   `srcset`, absolute metadata URLs), the built CSS (`url()`), and
   `manifest.json`, and confirms all optimized WebP/JPEG/PNG variants exist.
4. **Image-tooling documentation:** `scripts/requirements-images.txt` records
   the tested environment (Python 3.11.15, Pillow 12.2.0), and
   `phase-1-image-assets-sha256.txt` lists SHA-256 checksums for every image
   in `public/images/`.
5. **Client path normalization fixed:** `/plumbing-services` →
   `/plumbing-services/`, multiple trailing slashes collapse to one, `/`
   stays `/`. Apache remains responsible for the real production `301`.
6. **Footer heading hierarchy:** the three footer `h4` headings are now `h2`,
   so interior pages no longer skip from H2 to H4.
7. **Visible `focus-visible` styling** added globally (3px `#38BDF8` outline,
   offset 3px) with a brighter variant on primary/secondary buttons; covers
   navigation, service links, breadcrumbs, mobile-menu controls, and the
   scroll-to-top control.
8. **Complete social-image metadata on every route:** `og:image:width=1200`,
   `og:image:height=630`, `og:image:type=image/jpeg`, and
   `twitter:image:alt` (serializer: `src/lib/head.ts`).
9. **"Book Online" → "Request Service"** in the navigation, and the homepage
   hero CTA is now a real `<a href="/contact/">` link that works without
   JavaScript (the destination is a service-request form, not a live
   scheduler).
10. **Form wording corrected:** "We never share your information" replaced
    with accurate wording noting that submissions are delivered and processed
    through formsubmit.co so Swisher Plumbing can reply. No privacy-policy
    page was fabricated.
11. **Trailing whitespace eliminated at the generator** (`src/lib/head.ts`
    no longer indents blank head lines), so `git diff --check` is clean.
12. **Reports updated** (this section and the P1.5 checklist addendum) — no
    new audit produced.

---

## 1. Starting branch and full SHA

```
$ git branch --show-current
main
$ git rev-parse HEAD
1b13df2440b0630aa43fa7be968530bc8a7277a5
```

## 2. Preflight results

- Worktree: **clean** (`git status --short` empty). No foreign changes at risk.
- After `git fetch --all --prune`: `main` was **in sync with `origin/main`** (no
  ahead/behind in either direction).
- `seo/phase-1-crawlable-architecture` did not exist locally or on origin — created
  from `1b13df24`.
- `seo/phase-0-foundation` was not touched; `main` was not edited directly.

## 3. Phase 0 live verification (re-run 2026-09-03 before any change)

| Check | Result |
| --- | --- |
| `https://swisherplumbingllc.com/` | `200 text/html` |
| `https://www.swisherplumbingllc.com/` | `301` → apex, one hop |
| `http://swisherplumbingllc.com/` | `301` → HTTPS apex, one hop |
| `/robots.txt` | `200 text/plain` |
| `/sitemap.xml` | `200 application/xml` |
| `/llms.txt` | `200 text/plain` |
| `/404.html` | `200` |
| `/nonexistent-seo-test` | **`404`** (the Phase 0 fix still holds) |
| Live canonical | `<link rel="canonical" href="https://swisherplumbingllc.com/" />` ✅ |
| Live JSON-LD types | `Plumber`, `WebSite`, `WebPage` ✅ |
| Live wrong-domain refs | `0` ✅ |
| **Raw homepage HTML** | **4,837 bytes containing only `<div id="root"></div>`** — the crawlability defect this phase fixes |

No Phase 0 regressions found. The one structural problem — invisible without
JavaScript — is what Phase 1 addresses.

## 4. New working branch

`seo/phase-1-crawlable-architecture`, created from `origin/main` @ `1b13df24`.

## 5. Static-generation approach and rationale

**Approach: build-time prerendering with React server rendering.** No new
dependencies were added.

- `npm run build` is now `tsc -b && vite build && node scripts/prerender.mjs`.
- `vite build` produces the client bundle exactly as before.
- `scripts/prerender.mjs` spins up Vite's SSR module runner, loads
  `src/prerender-entry.tsx`, and calls `renderToString(<App path={route}/>)`
  for every route in the manifest (`src/site.ts`). It writes one real file per
  route and injects each route's unique head (title, description, canonical,
  Open Graph, Twitter, JSON-LD) built by `src/lib/head.ts` from `src/site.ts`
  metadata and `src/pages/jsonld.ts` graphs.
- The client bundle still loads on every page and restores interactivity
  (mobile menu, contact form, parallax). `App` selects the page from
  `window.location.pathname`, so no router dependency was needed.
- **Why not a browser-snapshot tool:** SSR at build time is deterministic,
  uses the same components the client runs, and needs no extra packages.
- **Progressive enhancement fixes** so the static HTML is genuinely usable
  without JavaScript:
  - an inline head script adds a `js` class before React loads;
    `RevealOnScroll` only applies its hidden-until-revealed classes when that
    class is present — the SSR HTML therefore contains **zero hidden content**;
  - the mobile menu (a JS-only button) gets a `<noscript>` fallback link bar;
  - parallax was already rAF-gated and reduced-motion aware (Phase 0).
- `vite.config.ts` `base` changed `'./'` → `'/'` (required for nested routes;
  flagged as a Phase 0 prerequisite).
- **No SPA catch-all** anywhere: `public/.htaccess` gained no rewrite rules;
  each URL maps to a real file, and unknown URLs still hit
  `ErrorDocument 404`.

## 6. Routes created

| Route | File generated | Notes |
| --- | --- | --- |
| `/` | `dist/index.html` | Homepage; same sections, copy, and H1 as before, now prerendered |
| `/plumbing-services/` | `dist/plumbing-services/index.html` | Services hub |
| `/plumbing-services/leak-detection-repair/` | …/leak-detection-repair/index.html | Full educational page |
| `/plumbing-services/drain-cleaning/` | …/drain-cleaning/index.html | Full educational page |
| `/plumbing-services/water-heater-services/` | …/water-heater-services/index.html | Full educational page |
| `/plumbing-services/fixture-upgrades/` | …/fixture-upgrades/index.html | Full educational page |
| `/plumbing-services/sewer-line-service/` | …/sewer-line-service/index.html | Full educational page |
| `/plumbing-services/grinder-pumps/` | …/grinder-pumps/index.html | Full educational page |
| `/contact/` | `dist/contact/index.html` | Reuses ContactSection (form identical); H1 + breadcrumbs added |

Every service page has: unique title/description, one canonical, one H1, H2
sections (warning signs / why professional diagnosis / what the work can
involve / factors / safety + "when to stop using it"), breadcrumbs (visible +
`BreadcrumbList` JSON-LD), related-service links, tel CTA, contact link, and
original general-plumbing copy written for this site (in
`src/content/services.ts`) that makes no Swisher-specific promises.

## 7. Routes deliberately deferred

`/about/` (thin without verified company facts), `/service-areas/` + all
location pages (address/Pace-vs-Milton/cities unverified), an emergency-calls
page (hours unverified), commercial/gas pages, reviews page, and
`/privacy-policy/` (no owner-approved text). Full reasoning:
`PHASE_1_CONTENT_BLOCKERS.md`.

## 8. Factual claims used and their source

Only: business name `Swisher Plumbing, LLC`, origin
`https://swisherplumbingllc.com`, telephone `+1-850-619-8613` (Phase 0 safe
identity facts), the six service names already listed on the live site, and
general plumbing education written fresh for these pages. The hub page's
emergency note reads: *"Emergency calls are listed among Swisher Plumbing's
services; availability is not published, so call to confirm."*

## 9. Claims excluded

`23+`, `10K+`, `100%`, `5.0`, same-day, free estimates, background checks,
licensing, warranties, 24/7, hours, address, geo, ratings, review counts,
price range, social profiles — all excluded from new pages, metadata, schema,
and `llms.txt`. Because `/contact/` reuses the homepage contact section, that
section gained a `pageVariant` flag so the *new* page shows neutral wording
("We reply to every message.") instead of the homepage's unverified "free
estimate" / "within 24 hours" copy. The homepage itself is unchanged.

Metadata: each route has a unique natural title and description, one absolute
self-canonical, `og:type/site_name/locale/url/title/description/image(+alt)`,
and `twitter:card/url/title/description/image` — all on
`https://swisherplumbingllc.com`, with a new 1200×630 `og-image.jpg`
(replacing the 6.7 MB `pelican-poses.jpg` social target).

## 10. Navigation, sitemap, robots, llms.txt, 404

- **Navigation** (desktop + mobile): real crawlable links — `/`,
  `/plumbing-services/`, `/#about` (homepage section; smooth-scrolls only when
  already on `/`), `/contact/`. "Book Online" is now a real link to
  `/contact/`. Logo links `/`.
- **Footer**: Quick Links are real URLs; the services list is now real links
  to all six service pages; the homepage services-section cards link to their
  detail pages (the Emergency Calls card links to `/contact/` since no
  emergency page exists).
- **sitemap.xml**: all nine canonical routes and nothing else; no fragments,
  no `lastmod`/`changefreq`/`priority`; well-formed (verified with
  `xml.dom.minidom`).
- **robots.txt**: unchanged, still points at the correct sitemap.
- **llms.txt**: lists the hub, six service pages, contact page, and the
  emergency-calls caveat; keeps the explicit do-not-infer preamble.
- **404**: `public/404.html` unchanged (static, `noindex`, no JS); real 404
  behavior preserved — the local HTTP smoke test confirms nonexistent paths
  return 404, never 200/500.

## 11. Performance results (before → after)

Generated by `scripts/optimize-images.py` (Pillow; WebP; originals untouched,
visually verified via image inspection this session):

| Asset | Before | After | Where used |
| --- | --- | --- | --- |
| Hero background (LCP) | 465 KB JPG (2400px) | **83 KB WebP** (1920px) + original JPG fallback | `<picture>`, `fetchPriority="high"`, not lazy |
| `SectionBackground` | 6,104 KB PNG (7761px) | **21 KB WebP / 55 KB JPG** (2560px) | About section, lazy |
| `PelicanMascot` | 4,885 KB PNG (1937px) | **46/112 KB WebP** (288/576px) + 596 KB PNG fallback | srcset in services section, lazy |
| Social card (`pelican-poses`) | 6,888 KB JPG (5056px) | **187 KB JPG** (1200×630) | `og:image` / `twitter:image` everywhere |
| `Working_under_sink` | 1,400 KB | **91 KB WebP** (+465 KB PNG fallback) | leak page + homepage showcase |
| `Water_heater_repair` | 389 KB | **89 KB WebP** (+142 KB PNG) | water heater page + showcase |
| `Pelican_fixture_upgrade` | 430 KB | **103 KB WebP** (+141 KB PNG) | fixture page + showcase |
| `pelican-sewer` | 650 KB | **64 KB WebP** (+496 KB PNG) | sewer page + showcase |
| `pelican-emergency-final` | 1,064 KB | **97 KB WebP** (+493 KB PNG) | homepage showcase |
| Services collage default | 445 KB | **68 KB WebP** (+83 KB JPG) | homepage showcase default |
| `pelican-drain` | 110 KB | **28 KB WebP** (native size) | drain page + showcase |

All content images keep explicit `width`/`height`, `decoding="async"`, lazy
loading below the fold, and the LCP hero is neither lazy nor downsized
visibly. **No Core Web Vitals claims are made** — field data requires
deployment and traffic.

## 12. Files changed

**New:** `src/site.ts`, `src/lib/schema.ts`, `src/lib/head.ts`,
`src/content/services.ts`, `src/components/Breadcrumbs.tsx`,
`src/components/PageHero.tsx`, `src/pages/{HomePage,ServicesHubPage,ServicePage,ContactPage}.tsx`,
`src/pages/jsonld.ts`, `src/prerender-entry.tsx`, `scripts/prerender.mjs`,
`scripts/validate-static.mjs`, `scripts/optimize-images.py`,
20 generated image variants in `public/images/` (+ their copies in
`dist/images/`), `PHASE_1_CONTENT_BLOCKERS.md`, this report, plus the built
route files under `dist/`.

**Modified:** `index.html` (dev-shell comment + inline `js` script),
`vite.config.ts` (base `/`), `package.json` (build + validate scripts),
`src/App.tsx` (route-aware), `src/components/Navigation.tsx` (real links +
noscript fallback), `src/components/Footer.tsx` (real links),
`src/components/RevealOnScroll.tsx` (JS gating), `src/sections/*.tsx`
(WebP `<picture>` wiring, service links, contact pageVariant),
`public/sitemap.xml`, `public/llms.txt`, `public/.htaccess` (comment only),
regenerated `dist/`.

**Not touched:** contact-form delivery logic (endpoint, payload, handlers
byte-identical), the stale `swisher-plumbing-website/` directory, the
`.tar.gz`/`zioyZFH6`/`ziLHQGcZ` artifacts, unreferenced images (owner
sign-off required), `public/manifest.json`.

## 13. Build, lint, test, and validation results

```
$ npm run build
✓ built in ~3.4s — tsc clean, vite build OK, 9 routes prerendered
dist/index.html                   5.31 kB │ gzip: 1.69 kB
dist/assets/index-B0RcOSK-.css  105.20 kB │ gzip: 17.11 kB
dist/assets/index-CGuKTQoo.js   326.57 kB │ gzip: 97.45 kB
```

(JS bundle grew 285→327 KB gz 86→97 KB: the six content-rich pages and their
data. HTML is now real content per route instead of an empty root div.)

```
$ npm run validate:static
180 checks PASS, 0 FAIL, exit 0
```

The validator (run `npm run validate:static`) checks, per route: file exists;
one non-trivial `<title>`; exactly one self-canonical on the right origin; one
H1; >1500 chars of visible body text in raw HTML; ≥3 internal links that all
resolve to generated files; no wrong domain; no `href="#"`; no placeholder
content; parseable JSON-LD with ≥3 graph nodes, no empty values, allowed
types only; no prohibited claims on interior pages; `og:url`/`og:image`
correct; JS-gating script present; no hidden (opacity-0) content in raw HTML.
Plus sitemap/robots/404/llms checks and an HTTP smoke test (all routes 200,
trailing-slash 301, nonexistent path 404 with the branded page, WebP served).

```
$ npm run lint
✖ 8 problems (8 errors, 0 warnings)   — unchanged from the Phase 0 baseline
```

All 8 are the pre-existing vendored shadcn/ui `react-refresh` /
`react-hooks/purity` errors itemized in `SEO_PHASE_0_REPORT.md` §9 (badge,
button-group, button, form, navigation-menu, sidebar ×2, toggle). One new
error introduced during this phase (`normalizePath` exported from `App.tsx`)
was fixed; **lint is exactly back to the pre-existing baseline.** No rule was
disabled, no ignore added.

**Tests:** the repository has no unit-test framework; `validate:static` is
the automated test added this phase. No `npm install` was needed —
`node_modules/` was already present and the lockfile is untouched.

## 14. Accessibility and functionality checks

- Exactly one H1 per route (validator-enforced); service pages: H1 → H2
  sections → H3 "When to stop using it" → footer H4s, no level skips.
- Real `<a href>` navigation everywhere; zero business/social `href="#"` in
  rendered HTML (validator-enforced).
- Telephone CTAs on every route (`tel:850-619-8613` ×5 on `/contact/`).
- Form labels, error/success behavior, and `formsubmit.co` delivery unchanged;
  new-page copy removes only the unverified "free estimate"/"24 hours"
  wording, not any behavior.
- Reduced-motion CSS block and rAF scroll handling intact from Phase 0.
- No-JS: all content visible (SSR renders reveal blocks visible; validator
  asserts no hidden content); mobile nav available via `<noscript>` bar.
- Visual checks of generated images performed by direct image inspection;
  layout itself was not screenshot-compared — a human should eyeball the new
  interior pages in a browser before merge (focus style for interior buttons
  is the same pre-existing gap noted in Phase 0 §8).

## 15. Remaining warnings and unresolved items

- Live server behavior of the new routes is **unproven until deployment**;
  §16 lists the exact verification commands.
- The 684 KB SVG favicon, unreferenced images (~6.4 MB), and stale build
  artifacts remain (documented; need owner sign-off).
- Homepage still displays the pre-existing claims (23+, 10K+, 5.0,
  guarantee, testimonials, same-day, free-estimate, licence number). Per the
  owner's 2026-09-04 confirmation recorded at the top of `OWNER_FACT_CHECK.md`,
  all pre-existing website content is verified and client-approved; these
  claims were preserved, not neutralized.
- Lint: 8 pre-existing vendored errors (see §13).

## 16. Owner questions blocking further content

All 25 items in `OWNER_FACT_CHECK.md` remain `UNVERIFIED` **except** the
2026-09-04 blanket confirmation (recorded at the top of that file) that all
pre-existing website content is verified and client-approved; the deferred-page
mapping is in `PHASE_1_CONTENT_BLOCKERS.md`. Items still needing per-fact
answers before new pages/schema properties: licence `CFC1429751` status,
23-years-vs-2017 contradiction (both figures appear in approved content),
hours/24/7, address Pace-vs-Milton, service areas, and approved
privacy-policy text.

## 17. Deployment and live-verification instructions

Merge = deploy on this host (Plesk pulls `main` automatically, ~60 s, no
staging). Before merging: `npm run build && npm run validate:static` must be
green. After merging, run the full curl battery in
`PLESK_SEO_DEPLOYMENT_CHECKLIST.md` §4 (Phase 0 table) **and** §P1.2 (new
route checks). Expected: nine routes `200 text/html`; non-trailing-slash URLs
single-`301` to the slash form; `/nonexistent-seo-test` still a real `404`;
images served. Then Search Console sitemap resubmission and Rich Results
Test per §6/§7/P1.3 of the checklist.

## 18. Delivery: one commit, PR opened, nothing merged or deployed

This phase is delivered as a **single commit** on
`seo/phase-1-crawlable-architecture`, pushed to origin, with a **pull request
opened against `main`**. The PR was **not merged** (merging auto-deploys via
Plesk) and no live server was touched. The exact commit SHA and PR URL are in
the final handoff message and on the GitHub PR page; `git log` on the branch
is the authoritative record. Phase 0's live state was only read (HTTP GETs).
