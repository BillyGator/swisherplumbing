# SEO Phase 0 — Emergency Technical Stabilization Report

**Date:** 2026-09-03
**Branch:** `seo/phase-0-foundation`
**Scope:** technical stabilization only. No content expansion, no new pages, no framework migration, no redesign.

> **Status update, 2026-09-03 evening: DEPLOYED and verified live.** This branch was
> reviewed locally, committed as `a14eae6f`, merged to `main` via PR #1, and auto-deployed
> by Plesk. The first deploy failed with a site-wide HTTP 500 caused by a `LocationMatch`
> block in `.htaccess`; hotfix `607d83f7` corrected it and the site recovered within about
> a minute. See §7 (".htaccess"), §11, and §14 for the deployment record. Sections written
> before deployment are left as the historical account of the work.

---

## 1. Starting branch and commit

```
$ git branch --show-current
main

$ git rev-parse HEAD
69d4c0ea519c4ad9604b4356f0d353a9da6c941a

$ git status --short
?? Swisher_Plumbing_SEO_Audit_2026-09-03.md

$ git remote -v
origin	https://github.com/BillyGator/swisherplumbing.git (fetch)
origin	https://github.com/BillyGator/swisherplumbing.git (push)

$ git log -5 --oneline
69d4c0ea Update business hours and restore emergency services
a7e27e1e Update Sewer Line Services text to 'Grinder Pumps' and rebuild site for deployment
c6c8f4c4 Add explicit deployment documentation
8e054d2c Update production build files in dist for deployment
0f9a5949 Optimize mobile layout, center logo on mobile, remove exposed email
```

**Working-tree baseline:** clean apart from one untracked file,
`Swisher_Plumbing_SEO_Audit_2026-09-03.md`, which is the audit document supplied with this
task. No tracked file was modified, staged, or stashed before work began.

`seo/phase-0-foundation` did not already exist and was created from `69d4c0ea`.

## 2. Deployment source of truth

Both `README.md` and `.agent/workflows/DEPLOYMENT.md` state that the live site is served
from **`/dist`**, and that `src/` changes do not reach production until `npm run build`
regenerates `dist/`, which is then committed.

This was confirmed against the repository rather than assumed:

- `.gitignore` ignores `node_modules/` and `build/` but **not** `dist/` — `dist/` is tracked.
- `vite.config.ts` sets `base: './'`, so build output uses relative asset paths.
- Files placed in `public/` are copied verbatim into `dist/` by the build (verified — see §7).

**The stale `swisher-plumbing-website/` directory is NOT authoritative.** It is a tracked
copy of a much older build: its `index.html` still has the title `Swisher Plumbing` with no
metadata at all, and its JS bundle still contains `service@swisherplumbing.com`, an email
address that was removed from the current source in commit `0f9a5949`. Its `.htaccess`
contains the SPA catch-all rewrite this phase was told not to preserve. The
`swisher-plumbing-website.tar.gz` archive and the `zioyZFH6` / `ziLHQGcZ` blobs are likewise
not the deployment path. **These were left untouched** — see §11.

## 3. Baseline findings

### Wrong-domain search, BEFORE

Search across the whole repository, excluding `.git`, `node_modules`, `package-lock.json`,
and the audit document:

```
$ grep -rn -E 'swisherplumbing\.com' . --exclude-dir=.git --exclude-dir=node_modules ...
./dist/index.html:18:  <link rel="canonical" href="https://swisherplumbing.com/" />
./dist/index.html:22:  <meta property="og:url" content="https://swisherplumbing.com/" />
./dist/index.html:26:  <meta property="og:image" content="https://swisherplumbing.com/images/pelican-poses.jpg" />
./dist/index.html:30:  <meta property="twitter:url" content="https://swisherplumbing.com/" />
./dist/index.html:34:  <meta property="twitter:image" content="https://swisherplumbing.com/images/pelican-poses.jpg" />
./dist/index.html:42:        "image": "https://swisherplumbing.com/images/logo-with-mascot.png",
./dist/index.html:44:        "url": "https://swisherplumbing.com",
./dist/robots.txt:4:Sitemap: https://swisherplumbing.com/sitemap.xml
./dist/sitemap.xml:4:    <loc>https://swisherplumbing.com/</loc>
./index.html:18:  <link rel="canonical" href="https://swisherplumbing.com/" />
./index.html:22:  <meta property="og:url" content="https://swisherplumbing.com/" />
./index.html:26:  <meta property="og:image" content="https://swisherplumbing.com/images/pelican-poses.jpg" />
./index.html:30:  <meta property="twitter:url" content="https://swisherplumbing.com/" />
./index.html:34:  <meta property="twitter:image" content="https://swisherplumbing.com/images/pelican-poses.jpg" />
./index.html:42:        "image": "https://swisherplumbing.com/images/logo-with-mascot.png",
./index.html:44:        "url": "https://swisherplumbing.com",
./public/robots.txt:4:Sitemap: https://swisherplumbing.com/sitemap.xml
./public/sitemap.xml:4:    <loc>https://swisherplumbing.com/</loc>
./swisher-plumbing-website/assets/index-0bs2TUxV.js:9: (stale build: "mailto:service@swisherplumbing.com")
```

**18 wrong-domain references in live production files**, plus one in the stale directory.

```
$ grep -rn 'swisherplumbingllc\.com' . (same exclusions)
(no matches)
```

The correct production domain appeared **nowhere** in the repository.

### Other baseline searches

| Pattern | Result |
| --- | --- |
| `24/7` | `index.html:13`, `:25`, `:33` — meta, OG, and Twitter descriptions |
| `call us anytime` | `src/sections/ContactSection.tsx:25` |
| `PlumbingService` | `index.html:40` — invalid Schema.org business type |
| `canonical` | `index.html:18` — pointing at the wrong domain |
| `sitemap` | `public/robots.txt:4`, `public/sitemap.xml:2` |
| `robots` | `index.html:17` |
| `application/ld+json` | `index.html:37` |
| `href="#"` | `src/components/Footer.tsx:71`, `:78` (Facebook, Instagram) plus two `href: '#'` entries at `src/sections/ContactSection.tsx:31`, `:38` (Location, Hours cards) |
| `10K+` | `src/sections/AboutSection.tsx:16` |
| `23+` | `src/sections/AboutSection.tsx:15`, `src/sections/ServicesSection.tsx:222` |
| `5.0 Rating` | `src/sections/AboutSection.tsx:134` |
| `Satisfaction Guarantee` | `src/sections/AboutSection.tsx:18` |

### Other baseline observations

- No `.htaccess` existed in `public/` or `dist/`. The only one in the repository was the
  stale `swisher-plumbing-website/.htaccess`, containing an SPA catch-all
  (`RewriteRule ^ index.html [L]`) and a one-year cache on **non-fingerprinted** images.
- `public/manifest.json` exists but is **not referenced** from `index.html`. It contains no
  wrong-domain URL, so it needed no correction and was left alone.
- The JSON-LD had an empty `"@id": ""` and an empty `"streetAddress": ""`.
- No test script exists in `package.json` (`dev`, `build`, `lint`, `preview` only).
- `public/images/` totals roughly 30 MB across 22 files; see §8.

### Baseline build and lint

```
$ npm run build
✓ 1717 modules transformed.
dist/index.html                   3.77 kB │ gzip:  1.15 kB
dist/assets/index-GiVufmp1.css  103.52 kB │ gzip: 16.71 kB
dist/assets/index-DPOG1xDK.js   285.56 kB │ gzip: 85.99 kB
✓ built in 3.88s
```

Build **passed** at baseline, and re-running it left `dist/` byte-identical — confirming
`dist/` was in sync with `src/` before any change.

```
$ npm run lint
✖ 9 problems (9 errors, 0 warnings)
```

Nine pre-existing lint errors, matching the prior audit. Itemised in §9.

## 4. Files changed

### Modified (tracked)

| File | Change |
| --- | --- |
| `index.html` | Domain, metadata, and JSON-LD rewritten (§5, §6) |
| `public/robots.txt` | Sitemap URL corrected |
| `public/sitemap.xml` | Correct origin; fragments, `changefreq`, `priority`, fabricated `lastmod` removed |
| `src/sections/HeroSection.tsx` | rAF parallax instead of scroll state; CSS entrance animation; image attributes |
| `src/sections/ServicesSection.tsx` | rAF parallax; per-service intrinsic image dimensions; lazy/async images |
| `src/sections/ContactSection.tsx` | `href="#"` cards → non-link containers; hours centralized; privacy wording |
| `src/sections/AboutSection.tsx` | Image dimensions + lazy/async on the 6 MB section background |
| `src/components/Footer.tsx` | Dead social links removed; image attributes; reduced-motion scroll |
| `src/components/Navigation.tsx` | Logo dimensions; reduced-motion scroll |
| `src/index.css` | Hero keyframes; global `prefers-reduced-motion` block |
| `dist/index.html`, `dist/robots.txt`, `dist/sitemap.xml`, `dist/assets/*` | Regenerated by `npm run build` |

### Added

| File | Purpose |
| --- | --- |
| `public/llms.txt` → `dist/llms.txt` | Conservative AI-readability file |
| `public/404.html` → `dist/404.html` | Static, JS-free, `noindex, follow` 404 page |
| `public/.htaccess` → `dist/.htaccess` | 404 handling, `www` canonicalization, cache policy |
| `src/lib/motion.ts` | Reduced-motion helper + rAF scroll observer |
| `OWNER_FACT_CHECK.md` | 25 unresolved business facts |
| `PLESK_SEO_DEPLOYMENT_CHECKLIST.md` | Operator verification steps |
| `SEO_PHASE_0_REPORT.md` | This document |

### Deliberately NOT changed

- The contact form's delivery path (`formsubmit.co` endpoint, payload, handlers) — verified byte-identical.
- Visible business hours, `23+`, `10K+`, `5.0 Rating`, `100% Satisfaction Guarantee`,
  testimonials, background-check / same-day / free-estimate / licensed claims.
- The stale `swisher-plumbing-website/` directory, the `.tar.gz`, and the two loose blobs.
- `public/manifest.json`.

## 5. Technical SEO corrections

### Wrong-domain search, AFTER

```
$ grep -rn -E 'swisherplumbing\.com' . (same exclusions)
./swisher-plumbing-website/assets/index-0bs2TUxV.js:9: (stale build: "mailto:service@swisherplumbing.com")

$ grep -rn -E 'www\.swisherplumbing\.com' . (same exclusions)
(no matches)
```

**All 18 production references are corrected.** The single remaining match is inside the
stale, non-deployed `swisher-plumbing-website/` build artifact, and it is an old `mailto:`
address, not a canonical, sitemap, or origin declaration. See §11.

### Homepage metadata, before → after

| Tag | Before | After |
| --- | --- | --- |
| `<title>` | Swisher Plumbing - Expert Plumbers in Pace & Milton, FL | **unchanged** (no technical reason to alter it) |
| `meta description` | "...our experienced team is here to help **24/7**." | "Swisher Plumbing provides licensed residential and commercial plumbing in Pace, Milton, and the Florida Panhandle: leak detection and repair, drain cleaning, water heaters, fixture upgrades, sewer lines, grinder pumps, and emergency calls." |
| `meta keywords` | present, 10 keywords | **removed** — no ranking value |
| `meta author` | Swisher Plumbing | Swisher Plumbing, LLC |
| `meta robots` | `index, follow` | unchanged |
| `link canonical` | `https://swisherplumbing.com/` | `https://swisherplumbingllc.com/` |
| `og:type` | website | unchanged |
| `og:site_name` | *absent* | **added** — `Swisher Plumbing, LLC` |
| `og:locale` | *absent* | **added** — `en_US` |
| `og:url` | `https://swisherplumbing.com/` | `https://swisherplumbingllc.com/` |
| `og:image` | wrong domain | `https://swisherplumbingllc.com/images/pelican-poses.jpg` |
| `og:image:alt` | *absent* | **added** |
| `twitter:*` | `property="twitter:..."`, wrong domain | `name="twitter:..."` (the documented form), correct domain |

The new description makes no promise of 24/7 availability, same-day arrival, free
estimates, fastest response, lowest pricing, background-checked technicians, or any
guarantee. It lists only the services already visible on the page.

## 6. Structured-data changes

### Before

```json
{
  "@context": "https://schema.org",
  "@type": "PlumbingService",
  "name": "Swisher Plumbing",
  "image": "https://swisherplumbing.com/images/logo-with-mascot.png",
  "@id": "",
  "url": "https://swisherplumbing.com",
  "telephone": "850-619-8613",
  "priceRange": "$$",
  "address": { "@type": "PostalAddress", "streetAddress": "", "addressLocality": "Pace",
               "addressRegion": "FL", "postalCode": "32571", "addressCountry": "US" },
  "geo": { "@type": "GeoCoordinates", "latitude": 30.599, "longitude": -87.160 },
  "openingHoursSpecification": [
    { "dayOfWeek": ["Monday"..."Friday"], "opens": "07:00", "closes": "18:00" },
    { "dayOfWeek": "Saturday", "opens": "08:00", "closes": "16:00" }
  ],
  "sameAs": ["https://www.facebook.com/swisherplumbing"]
}
```

Defects: `PlumbingService` is not a Schema.org local-business type; `@id` empty;
`streetAddress` empty; wrong domain in `image` and `url`; unverified coordinates;
hours contradicting the visible page; unverified `priceRange`; an unverified `sameAs`.

### After

A three-node `@graph` — `Plumber`, `WebSite`, `WebPage` — carrying only facts consistently
supported by the visible page:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Plumber",
      "@id": "https://swisherplumbingllc.com/#business",
      "name": "Swisher Plumbing, LLC",
      "url": "https://swisherplumbingllc.com/",
      "telephone": "+1-850-619-8613",
      "image": "https://swisherplumbingllc.com/images/logo-with-mascot.png",
      "logo": "https://swisherplumbingllc.com/images/logo-with-mascot.png" },
    { "@type": "WebSite",
      "@id": "https://swisherplumbingllc.com/#website",
      "url": "https://swisherplumbingllc.com/",
      "name": "Swisher Plumbing, LLC",
      "inLanguage": "en-US",
      "publisher": { "@id": "https://swisherplumbingllc.com/#business" } },
    { "@type": "WebPage",
      "@id": "https://swisherplumbingllc.com/#webpage",
      "url": "https://swisherplumbingllc.com/",
      "name": "Swisher Plumbing - Expert Plumbers in Pace & Milton, FL",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://swisherplumbingllc.com/#website" },
      "about": { "@id": "https://swisherplumbingllc.com/#business" },
      "primaryImageOfPage": "https://swisherplumbingllc.com/images/pelican-poses.jpg" }
  ]
}
```

Removed and **not** replaced with guesses: `address`, `geo`, `openingHoursSpecification`,
`priceRange`, `sameAs`, and `areaServed`. No `aggregateRating`, `review`, or testimonial
was introduced. A comment above the block in `index.html` lists each removed property and
why, so a future editor does not silently reinstate them.

```
$ node -e "...JSON.parse(ld)..."
dist/index.html JSON-LD: valid JSON
  - Plumber => https://swisherplumbingllc.com/#business
  - WebSite => https://swisherplumbingllc.com/#website
  - WebPage => https://swisherplumbingllc.com/#webpage
```

## 7. Robots, sitemap, `llms.txt`, and 404

### `robots.txt`

```diff
-Sitemap: https://swisherplumbing.com/sitemap.xml
+Sitemap: https://swisherplumbingllc.com/sitemap.xml
```

Ordinary crawling remains allowed. No speculative AI-bot blocks or crawler-specific
directives were added.

### `sitemap.xml`

Before: wrong-domain `<loc>`, a fixed `lastmod` of `2026-02-14`, `changefreq daily`, `priority 1.0`.
After: one real canonical URL, `https://swisherplumbingllc.com/`, with `lastmod`,
`changefreq`, and `priority` all removed. No `#services`-style fragments. An XML comment
records why each field is absent.

```
$ python -c "import xml.dom.minidom; xml.dom.minidom.parse('dist/sitemap.xml')"
dist/sitemap.xml: well-formed XML
```

### `llms.txt`

`public/llms.txt` → `dist/llms.txt`. Contains the business name, canonical homepage, phone
number, a restrained "a plumbing business serving Northwest Florida" description, the six
services visible on the site, and two links. It explicitly instructs consumers **not** to
infer 24/7 availability, hours, address, service areas, warranties, guarantees, ratings,
review counts, licensing status, or social profiles.

### `404.html`

`public/404.html` → `dist/404.html`. Static, no JavaScript, `noindex, follow`, inline CSS,
a link to `https://swisherplumbingllc.com/`, and a `tel:` link. No unverified claims.

### `.htaccess`

`public/.htaccess` → `dist/.htaccess`, with:

- `ErrorDocument 404 /404.html`
- `www` → non-`www` single permanent hop, preserving `%{REQUEST_SCHEME}`
- **no SPA catch-all** — the prior stale rule turned every missing URL into a soft-404 homepage
- **no HTTP→HTTPS rule** — cannot be proven safe against the Plesk reverse proxy from here,
  so the required Plesk setting is documented instead
- `immutable` one-year caching restricted to fingerprinted `/assets/`; HTML, `.txt`, and
  `.xml` set to `must-revalidate`; non-fingerprinted images 7 days, not a year

**Post-deploy correction (hotfix `607d83f7`).** The first version of this file scoped the
immutable cache header with `<LocationMatch "^/assets/">`. `<Location>` and
`<LocationMatch>` are only valid in server or virtual-host configuration; inside
`.htaccess` Apache rejects the whole file with "not allowed here" and answers **500 for
every request**, including static images. This is exactly what happened when PR #1
auto-deployed. The block was replaced with
`<FilesMatch "-[A-Za-z0-9_-]{8}\.(js|css|woff2?|ttf)$">`, which targets Vite's
fingerprinted output by filename. Lesson recorded in the file's comments.

### Local verification of the built output

`dist/` served over HTTP locally:

```
GET /                    -> 200
GET /robots.txt          -> 200
GET /sitemap.xml         -> 200
GET /llms.txt            -> 200
GET /404.html            -> 200
GET /nonexistent-seo-test-> 404
```

> The local check above does not prove production behaviour. The live results below do.

### Live verification after deployment (2026-09-03, commit `607d83f7` on `main`)

| Request | Status | Notes |
| --- | --- | --- |
| `https://swisherplumbingllc.com/` | `200` | canonical correct, 0 wrong-domain refs, new JSON-LD present, `must-revalidate` |
| `https://www.swisherplumbingllc.com/` | `301` | → `https://swisherplumbingllc.com/`, one hop |
| `http://swisherplumbingllc.com/` | `301` | → `https://swisherplumbingllc.com/`, one hop |
| `http://www.swisherplumbingllc.com/` | `301` | → `https://swisherplumbingllc.com/`, one hop |
| `/robots.txt` | `200` | `text/plain`, correct sitemap URL |
| `/sitemap.xml` | `200` | `application/xml`, single correct `<loc>` |
| `/llms.txt` | `200` | `text/plain` |
| `/404.html` | `200` | directly fetchable |
| `/nonexistent-seo-test` | **`404`** | branded page, `noindex` present — **the original `500` defect is fixed** |
| `/assets/index-CrvmSoJk.js` | `200` | `Cache-Control: public, max-age=31536000, immutable` |
| `/images/logo-with-mascot.png` | `200` | `image/png` |

Conclusions about the Plesk layer, established empirically: `.htaccess` **is** honoured;
`ErrorDocument`, `Rewrite*`, `Header`, `Expires*`, `AddType`, and `AddOutputFilterByType`
all take effect; static files pass through Apache rather than being short-circuited by
nginx; and the HTTP→HTTPS redirect is already handled by the hosting layer in a single hop.

## 8. Performance and accessibility changes

### Images

Every rendered `<img>` now carries explicit intrinsic `width`/`height`:

| Image | Intrinsic | Attributes applied |
| --- | --- | --- |
| `beach-background.jpg` (hero, LCP) | 2400×2032 | `fetchPriority="high"`, **not** lazy |
| `logo-with-mascot.png` (nav) | 600×339 | `decoding="async"`, **not** lazy (above the fold) |
| `logo-with-mascot.png` (hero mascot) | 600×339 | `decoding="async"`, **not** lazy |
| `PelicanMascot.png` | 1937×2872 | `loading="lazy"`, `decoding="async"` |
| service showcase (7 variants) | per-service | `loading="lazy"`, `decoding="async"`, dimensions switch with the active service |
| `SectionBackground.png` | 7761×3768 | `loading="lazy"`, `decoding="async"` |
| `logo-with-mascot.png` (footer) | 600×339 | `loading="lazy"`, `decoding="async"` |
| `logo-with-mascot.png` (footer decoration) | 600×339 | `alt=""` retained (decorative duplicate), lazy, async |

Alt text was preserved as-is; nothing was rewritten or keyword-stuffed. Explicit dimensions
give the browser an intrinsic aspect ratio before load, which matters most for the
`h-12 w-auto` / `h-20 w-auto` logos whose width was previously indeterminate until decode.

### Scroll-driven rendering

`src/lib/motion.ts` adds `observeScroll()`, which coalesces scroll events into one
`requestAnimationFrame` callback and writes transforms **directly to DOM nodes via refs**.

- `HeroSection` previously called `setScrollY(window.scrollY)` on every raw scroll event,
  re-rendering the whole hero. It now holds no scroll state at all.
- `ServicesSection` did the same for its two decorative blobs. Same fix.
- `Navigation` keeps its `setIsScrolled` boolean: React bails out when the value is
  unchanged, so it only re-renders when the 100 px threshold is actually crossed.

Verified empirically in the browser — at `scrollY = 400`:

| Element | Expected | Measured |
| --- | --- | --- |
| hero background | `400 × 0.5 = 200px` | `translate3d(0px, 200px, 0px)` |
| mascot layer | `400 × 0.1 = 40px` | `translate3d(0px, 40px, 0px)` |
| scroll indicator | `max(0, 1 − 400/200) = 0` | `0` |
| services blob L | `(400 − 1000) × 0.1 = −60px` | `translate3d(0px, -60px, 0px)` |
| services blob R | `(400 − 1000) × −0.05 = 30px` | `translate3d(0px, 30px, 0px)` |

### Reduced motion

- `src/index.css` gains a `@media (prefers-reduced-motion: reduce)` block that collapses
  animation and transition durations and forces `scroll-behavior: auto`. Confirmed present
  in the built stylesheet.
- `observeScroll()` attaches **no** scroll listener under reduced motion; it invokes the
  callback once with offset `0`, leaving elements unparallaxed.
- All four smooth-scroll call sites (`Navigation`, `Footer` links, `Footer` scroll-to-top,
  `HeroSection` and `ServicesSection` CTAs) now route through helpers that fall back to
  `behavior: 'auto'` under reduced motion.

### Hero entrance animation (replaces a React state flag)

The hero previously rendered at `opacity: 0` and became visible only after a `useEffect`
set `isLoaded` — the source of the `react-hooks/set-state-in-effect` error. It is now a CSS
keyframe animation with **no `fill-mode`**, deliberately: the elements' base styles are
already the finished state, so if the animation never runs the hero stays **visible**.
Verified by driving the animation to its end and then cancelling it outright:

| | Card | Mascot |
| --- | --- | --- |
| after animation end | `opacity 1`, `matrix(1,0,0,1,-400,-251)` | `opacity 1`, `transform: none` |
| if animation never runs | `opacity 1`, `matrix(1,0,0,1,-400,-251)` | `opacity 1`, `transform: none` |

Both states are identical, and both match the original component's final geometry
(`translate(-50%, -50%) scale(1)` on an 800×502 card; identity transform on the mascot).

### Accessibility checks performed (in-browser, against the built output)

| Check | Result |
| --- | --- |
| Exactly one H1 | ✅ one — "Florida Plumbing / Fixed Fast." |
| Heading hierarchy | ✅ H1 → H2 → H3 → H2 → H3 → H2 → H3 → H4, no level skipped |
| Business/social links using `href="#"` | ✅ **zero** dead anchors in the rendered DOM |
| Telephone links | ✅ all 5 `tel:850-619-8613` links intact |
| Contact-form labels | ✅ all 5 controls have a matching `<label for>` |
| Mobile menu | ✅ opens, closes, and closes on nav-link activation (375×812) |
| Descriptive button labels | ✅ `aria-label` on menu toggle and scroll-to-top retained |
| Alt behaviour | ✅ meaningful alt preserved; the duplicate decorative logo keeps `alt=""` |
| Console errors | ✅ none during page load and interaction |
| Horizontal overflow | ✅ none at 1280×720 or 375×812 (`scrollWidth == clientWidth`) |

**Focus treatment — a pre-existing gap, not fixed here.** There is no global `outline: none`
reset, so the browser's default `:focus-visible` ring still applies, and shadcn form controls
carry Tailwind ring utilities. But the site's own `.btn-primary` / `.btn-secondary` and its
nav/footer links have **no branded focus style**. Adding one is a visual-design decision and
was left for Phase 1 rather than introduced during a stabilization pass.

### Image optimization — NOT performed, deliberately

No image conversion was attempted. ImageMagick is not installed; the `convert` on `PATH` is
the Windows filesystem utility, not ImageMagick. Pillow and ffmpeg are available, but the
Browser pane in this session cannot composite frames — screenshots time out — so generated
variants **could not be visually verified**. Per the phase rules, originals were left intact.

Current `public/images/` inventory (~30 MB), with recommendations for Phase 1:

| File | Dimensions | Size | Rendered at | Recommendation |
| --- | --- | --- | --- | --- |
| `pelican-poses.jpg` | 5056×3392 | 6.7 MB | **not rendered** — only referenced as the OG/Twitter image | Replace with a purpose-built 1200×630 social card. A 6.7 MB OG image is far past what crawlers will fetch. |
| `SectionBackground.png` | 7761×3768 | 6.0 MB | full-bleed background | Resize to ~2560 px wide; emit AVIF + WebP + JPEG. PNG is the wrong format for a photographic background. |
| `PelicanMascot.png` | 1937×2872 | 4.8 MB | **192×192 CSS px** | Emit 192/384/576 px WebP + PNG via `srcset`. This is the single worst ratio on the site — ~25× oversampled per axis. |
| `logo-text.png` | 3740×1403 | 2.4 MB | **not referenced** | See the unreferenced-file list below. |
| `pelican-emergency-transparent.png` | 1200×1186 | 1.3 MB | **not referenced** | See below. |
| `Working_under_sink.png` | 1200×1193 | 1.3 MB | ~460 px wide | Resize + WebP. |
| `pelican-emergency-final.png` | 1072×1060 | 1.0 MB | ~460 px wide | Resize + WebP. |
| `Swisher_Favicon.svg` / `favicon.svg.svg` | 1773×1773 viewBox | 684 KB each | favicon | 684 KB for a favicon is pathological — simplify the paths or ship a small PNG/ICO. The two files are byte-identical duplicates; only `Swisher_Favicon.svg` is referenced. |
| `beach-background.jpg` | 2400×2032 | 455 KB | hero, LCP | Acceptable, but AVIF/WebP would roughly halve it. |
| remaining service art | ≤ 650 KB each | | ~460 px wide | Batch-resize + WebP. |

**Nine files in `public/images/` are referenced by nothing** — not by `src/`, `index.html`,
`404.html`, `manifest.json`, or `llms.txt` — yet all nine are copied into `dist/` on every
build and shipped to the server:

```
favicon.svg.svg                     684 KB   byte-identical duplicate of Swisher_Favicon.svg
logo-text.png                      2432 KB
Pelican_Underground_Services.png    543 KB
Pelican_Underground_Services.svg    426 KB
pelican-emergency.jpg               320 KB
pelican-emergency-transparent.png  1367 KB
pelican-fixture-v7.png              546 KB
pelican-torch.png                    91 KB
pelican-under-sink.png               40 KB
                                   ------
                                  ~6.4 MB
```

`favicon.svg.svg` and `Swisher_Favicon.svg` share the MD5 `601497df15b8d41325d006143a6cc34c`;
only the latter is referenced. These were **not** deleted in Phase 0 — removing assets is
outside this phase's remit and some may be intended for upcoming pages. Confirm with the
owner, then remove in Phase 1.

Note also that `pelican-poses.jpg` (6.7 MB, 5056×3392) is **never rendered on the page**. Its
only role is as the `og:image` / `twitter:image` / `primaryImageOfPage` target.

Lazy-loading now keeps `SectionBackground.png` and `PelicanMascot.png` off the initial
request chain, which is a real improvement, but it does not reduce their bytes. **No claim
is made about Core Web Vitals**; field data must come from Search Console after traffic
accumulates.

## 9. Build, lint, and test results

### Build — PASSES

```
$ npm run build

> my-app@0.0.0 build
> tsc -b && vite build

vite v7.3.0 building client environment for production...
transforming...
✓ 1718 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   4.84 kB │ gzip:  1.48 kB
dist/assets/index-BjW4EYMq.css  104.13 kB │ gzip: 16.93 kB
dist/assets/index-CrvmSoJk.js   285.05 kB │ gzip: 85.97 kB
✓ built in 10.29s
```

TypeScript (`tsc -b`) passes. JS is 0.5 kB smaller than baseline; CSS is 0.6 kB larger
(the reduced-motion block and hero keyframes); HTML is 1.1 kB larger (the expanded JSON-LD
graph and its explanatory comment).

`npm install` was **not** run: `node_modules/` was already present and the baseline build
succeeded against it. The lockfile was not touched, deleted, or regenerated.

> One transient `EPERM` occurred while Vite emptied `dist/images` (Dropbox holding a file
> handle on this machine). Re-running the build succeeded immediately. It is an environment
> artifact, not a build defect.

### Lint — DOES NOT PASS. 8 pre-existing errors remain.

```
$ npm run lint
✖ 8 problems (8 errors, 0 warnings)
```

Baseline was **9**. One was fixed; **8 remain and are reported honestly below.**

**Fixed:**

| File | Rule | How |
| --- | --- | --- |
| `src/sections/HeroSection.tsx:13` | `react-hooks/set-state-in-effect` | `setIsLoaded(true)` in an effect was replaced by CSS keyframe animations. The state flag no longer exists. |

**Remaining — all in vendored shadcn/ui scaffolding, none in first-party application code:**

| File | Line | Rule | Why not fixed in Phase 0 |
| --- | --- | --- | --- |
| `src/components/ui/badge.tsx` | 46:17 | `react-refresh/only-export-components` | Exports `badgeVariants` alongside `Badge`. |
| `src/components/ui/button-group.tsx` | 82:3 | `react-refresh/only-export-components` | Exports `buttonGroupVariants`. |
| `src/components/ui/button.tsx` | 62:18 | `react-refresh/only-export-components` | Exports `buttonVariants`, imported by `alert-dialog.tsx`, `calendar.tsx`, `pagination.tsx`. |
| `src/components/ui/form.tsx` | 159:3 | `react-refresh/only-export-components` | Exports the `useFormField` hook. |
| `src/components/ui/navigation-menu.tsx` | 167:3 | `react-refresh/only-export-components` | Exports `navigationMenuTriggerStyle`. |
| `src/components/ui/sidebar.tsx` | 611:26 | `react-hooks/purity` | `Math.random()` inside `useMemo` for a skeleton width. |
| `src/components/ui/sidebar.tsx` | 725:3 | `react-refresh/only-export-components` | Exports the `useSidebar` hook. |
| `src/components/ui/toggle.tsx` | 45:18 | `react-refresh/only-export-components` | Exports `toggleVariants`, imported by `toggle-group.tsx`. |

**Reasoning.** These are development-only rules — Fast Refresh ergonomics plus one render
purity warning. They have **no effect on the production bundle, the rendered page, or any
SEO signal**; the application imports only `Button`, `Input`, and `Textarea` from this
directory, so most of these files are not in the bundle at all. Fixing them correctly means
relocating exports into sibling modules — and for `form.tsx` and `sidebar.tsx`, moving React
**contexts** across module boundaries in unused third-party-derived code. That is a
multi-file refactor of vendored scaffolding with real regression surface and zero
production benefit, which does not belong in an emergency stabilization branch.

No rule was disabled, no ignore pattern was widened, no `eslint-disable` comment was added,
and no component was deleted.

**Recommended Phase 1 chore:** extract `badgeVariants`, `buttonVariants`,
`buttonGroupVariants`, `toggleVariants`, and `navigationMenuTriggerStyle` into
`*-variants.ts` siblings; move `useFormField` and `useSidebar` (with their contexts) into
`use-*.ts` modules; and replace the `Math.random()` skeleton width with a value derived
from `React.useId()` so it stays varied but pure.

### Tests — none exist

`package.json` defines no `test` script and the repository contains no test files, so there
is no test result to report. This is unchanged from baseline.

## 10. Unresolved owner facts

`OWNER_FACT_CHECK.md` records **25** items, all `UNVERIFIED`. The 24 requested, plus one
found during this pass. The most urgent:

1. **Item 20 — Florida licence `CFC1429751`.** The audit reports a public record showing
   expiry on 31 August 2026, which has now passed. A publicly displayed expired licence
   number is a regulatory exposure, not just an SEO one. Verify with Florida DBPR now.
2. **Item 16 / 25 — "23+ Years Experience" vs "since 2017".** Both appear on the same page
   and cannot both be true. This contradiction is visible to any reader.
3. **Items 5–7 — hours and 24/7.** Four incompatible schedules exist. The visible hours are
   now centralized in one `BUSINESS_HOURS` constant, unchanged in value, with an in-code
   warning that owner verification is required.
4. **Items 2–4 — address and Pace vs Milton.** Blocks any `address`/`geo` schema and any
   location page.
5. **Item 19 — the `5.0 Rating`.** Conflicts with public data; no `aggregateRating` was published.
6. **Item 23 — privacy policy.** Still required; the form posts to the third party `formsubmit.co`.

## 11. Human Plesk actions — status after deployment

Full detail in `PLESK_SEO_DEPLOYMENT_CHECKLIST.md`. Summary:

1. ~~Determine whether `.htaccess` is honoured at all.~~ **Done, empirically.** It is
   honoured, and the live `500` for missing URLs is fixed (see §7 live verification).
2. ~~Enable the HTTP→HTTPS redirect in Plesk.~~ **Already in place.** `http://` and
   `http://www.` both 301 to `https://swisherplumbingllc.com/` in one hop, and TLS covers
   `www`.
3. ~~Confirm `.htaccess` actually uploads.~~ **Done.** Plesk deploys from Git, so dotfiles
   are not an issue.
4. ~~Run the eight `curl` checks.~~ **Done.** All pass.
5. **Verify a Search Console domain property, export a 16-month baseline first**, then
   submit the corrected sitemap and request a homepage recrawl. **Still required** —
   needs account access (`OWNER_FACT_CHECK.md` item 22).
6. **Validate the live structured data** with the Rich Results Test. Expect warnings
   about missing `address`, `openingHours`, and `priceRange` — those are intentional and
   must not be "fixed" by guessing. **Still required.**

**Deployment mechanism, now known:** a push to `main` on GitHub (including a PR merge)
is a live deploy. Plesk pulls automatically and the change is live in roughly 60 seconds.
There is no staging step. Treat every merge to `main` as a production release.

## 12. Risks and limitations

- ~~Live behaviour is unproven.~~ **Resolved.** Live behaviour was verified after
  deployment (§7). The remaining live-side risk is that `.htaccess` edits go straight to
  production on merge; test any future change to that file before merging.
- **The stale `swisher-plumbing-website/` directory was left in place.** It is tracked, it
  is an obsolete build, its bundle still contains `service@swisherplumbing.com`, and its
  `.htaccess` holds the SPA catch-all this phase removed. It is not on the deployment path,
  so it is not a production file — but if the repository root were ever served, it would be
  reachable as duplicate content. Deleting tracked files is outside Phase 0's remit;
  **recommend removing it, the `.tar.gz`, and the `zioyZFH6` / `ziLHQGcZ` blobs in Phase 1**
  with owner sign-off.
- **The site is still a single JavaScript-rendered page.** The raw HTML body is still
  `<div id="root"></div>`. Prerendering and the multi-page architecture are Phase 1.
- **No visual screenshot comparison was possible.** The Browser pane could not composite in
  this session, so verification was done through the DOM, computed styles, measured
  geometry, and animation-timeline inspection rather than image diffs. Layout, transforms,
  opacity, overflow, and heading structure were all measured directly; a human should still
  eyeball the hero and mascot on a real screen before merge.
- **Lint does not pass** — 8 pre-existing vendored-UI errors remain, itemised in §9.
- **`vite.config.ts` sets `base: './'`,** producing relative asset paths. That is correct
  while the homepage is the only route, but it will break assets on nested routes such as
  `/plumbing-services/leak-detection-repair/`. **Phase 1 must change `base` to `'/'`** when
  real routes are introduced.
- **Unverified claims remain visible** on the page by design. They were removed from the
  machine-readable layer only.
- **The `og:image` is a 6.7 MB, 5056×3392 photo.** Correcting the URL does not make it a
  usable social card; see §8.

## 13. Exact git diff summary

```
$ git status --short
 D dist/assets/index-DPOG1xDK.js
 D dist/assets/index-GiVufmp1.css
 M dist/index.html
 M dist/robots.txt
 M dist/sitemap.xml
 M index.html
 M public/robots.txt
 M public/sitemap.xml
 M src/components/Footer.tsx
 M src/components/Navigation.tsx
 M src/index.css
 M src/sections/AboutSection.tsx
 M src/sections/ContactSection.tsx
 M src/sections/HeroSection.tsx
 M src/sections/ServicesSection.tsx
?? OWNER_FACT_CHECK.md
?? PLESK_SEO_DEPLOYMENT_CHECKLIST.md
?? Swisher_Plumbing_SEO_Audit_2026-09-03.md
?? dist/.htaccess
?? dist/404.html
?? dist/assets/index-BjW4EYMq.css
?? dist/assets/index-CrvmSoJk.js
?? dist/llms.txt
?? public/.htaccess
?? public/404.html
?? public/llms.txt
?? src/lib/motion.ts
```

```
$ git diff --stat
 dist/assets/index-DPOG1xDK.js    |   9 ---
 dist/assets/index-GiVufmp1.css   |   1 -
 dist/index.html                  | 127 ++++++++++++++++++++-------------------
 dist/robots.txt                  |   2 +-
 dist/sitemap.xml                 |  11 ++--
 index.html                       | 123 ++++++++++++++++++-------------------
 public/robots.txt                |   2 +-
 public/sitemap.xml               |  11 ++--
 src/components/Footer.tsx        |  45 +++++++-------
 src/components/Navigation.tsx    |   9 +--
 src/index.css                    |  68 +++++++++++++++++++++
 src/sections/AboutSection.tsx    |   4 ++
 src/sections/ContactSection.tsx  | 106 ++++++++++++++++++++++++--------
 src/sections/HeroSection.tsx     |  80 ++++++++++--------------
 src/sections/ServicesSection.tsx |  52 ++++++++++++----
 15 files changed, 394 insertions(+), 256 deletions(-)
```

The deleted/added `dist/assets/*` pairs are the old and new fingerprinted bundles from
`npm run build`; `Swisher_Plumbing_SEO_Audit_2026-09-03.md` is the supplied audit document,
untracked at baseline and untouched.

## 14. Deployment record

At the time §1–§13 were written, nothing had been committed, pushed, or deployed. The
sequence that followed:

| Step | Commit | Result |
| --- | --- | --- |
| Owner reviewed the built `dist/` locally via `vite preview` | — | approved |
| Phase 0 committed on `seo/phase-0-foundation` | `a14eae6f` | build passes, lint 8 pre-existing errors |
| Branch pushed; PR #1 opened and merged to `main` by the owner | `4539755f` | **Plesk auto-deployed → site-wide HTTP 500** |
| Cause: `<LocationMatch>` in `.htaccess` (invalid in per-directory context) | — | every URL 500, including images |
| Hotfix committed and pushed to `main` | `607d83f7` | site recovered ~60 s later |
| Eleven live checks run (see §7) | — | all pass; `/nonexistent-seo-test` → `404` |

- **No destructive git command was run** — no `reset --hard`, `checkout --`, `clean`, `stash`,
  or branch deletion.
- **No pre-existing user changes were discarded.**
- The outage lasted from the PR merge until roughly one minute after the hotfix push.

## 15. Recommended scope for Phase 1

1. **Resolve `OWNER_FACT_CHECK.md` first.** Items 20 (licence) and 16/25 (the visible
   23-years vs since-2017 contradiction) are the most urgent. Nothing else should be
   published until the NAP/hours record is settled.
2. **Confirm the Plesk layer** and re-run the eight `curl` checks. Do not build new pages on
   top of a server that still returns `500` for missing URLs.
3. **Make the HTML crawlable without JavaScript.** Static generation or prerendering, so
   each route's title, headings, copy, links, NAP, and structured data are in the initial
   response. Change `base` to `'/'` at the same time.
4. **Build the small, real page set** from the audit: `/plumbing-services/`, `/about/`,
   `/contact/`, `/service-areas/`, `/privacy-policy/`, plus the first service pages and
   only the location pages the owner confirms are genuinely served. Real `<a href>` links,
   self-referential canonicals, and per-page metadata. No doorway pages.
5. **Reconcile or remove every unverified claim** on the visible page, using the owner's
   written answers.
6. **Publish the owner-approved privacy policy**, disclose `formsubmit.co`, and link it from
   the contact form.
7. **Do the image work** listed in §8, with visual verification, starting with
   `PelicanMascot.png`, `SectionBackground.png`, the favicon, and a purpose-built
   1200×630 social card.
8. **Add a branded `:focus-visible` style** for `.btn-primary`, `.btn-secondary`, and
   nav/footer links.
9. **Clear the vendored-UI lint debt** as described in §9.
10. **Remove the stale build artifacts** — `swisher-plumbing-website/`,
    `swisher-plumbing-website.tar.gz`, `zioyZFH6`, `ziLHQGcZ` — and the nine unreferenced
    images in `public/images/` (~6.4 MB), with owner sign-off.
11. **Expand `llms.txt` and `sitemap.xml`** only once the new canonical routes are live and
    the facts are verified.
