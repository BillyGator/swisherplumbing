# Swisher Plumbing SEO and AI-Readiness Audit

**Audit date:** September 3, 2026  
**Prepared for:** John  
**Source reviewed:** `Kimi_Agent_Swisher Plumbing Site Update.zip` plus the live site at `https://swisherplumbingllc.com/`

## Executive verdict

The low visibility is explainable. This is not merely a case of needing more keywords.

The live Florida business site is `https://swisherplumbingllc.com/`, but the site repeatedly declares `https://swisherplumbing.com/` as its canonical and authoritative domain. That second domain belongs to an unrelated Pennsylvania plumbing company. The wrong domain appears in the canonical tag, Open Graph metadata, Twitter metadata, local-business JSON-LD, `robots.txt`, and `sitemap.xml`. Google treats a canonical tag as a strong signal and sitemap inclusion as another canonicalization signal, so this configuration is actively sending conflicting ownership and indexing instructions. See [Google's canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

The Florida site also has only one indexable page, no real internal-link architecture, an empty raw HTML body that depends on JavaScript to reveal the content, thin service descriptions, incomplete and contradictory local-business information, invalid structured-data typing, oversized images, broken placeholder links, and a server that returns HTTP `500` for missing URLs. Public search currently exposes the homepage but no service or location pages.

This combination makes the site weak on all three fronts that matter:

1. **Technical clarity:** Google receives contradictory canonical, sitemap, schema, and business signals.
2. **Topical relevance:** one generic page cannot compete well for individual high-intent services and locations.
3. **Local trust/prominence:** the website's name/address/hours/reviews do not align consistently with public business listings.

No ethical SEO project can guarantee a particular position or a time to rank. The defects below are nevertheless serious and fixable, and correcting them should materially improve the site's ability to be crawled, understood, indexed, and evaluated.

## Critical findings

### P0 — Wrong canonical domain across the live site

The live page is served from:

- `https://swisherplumbingllc.com/`

But the following all point to `https://swisherplumbing.com/`:

- `<link rel="canonical">`
- `og:url`
- `og:image`
- Twitter URL and image
- JSON-LD `url`, `image`, and implied entity identity
- the sitemap URL declared in `robots.txt`
- the only URL inside `sitemap.xml`

`www.swisherplumbing.com` resolves to F. H. Swisher Plumbing & Heating in Downingtown, Pennsylvania, a separate business. This is the most urgent defect.

**Required fix:** Every canonical, structured-data, social, sitemap, robots, internal, and asset URL must use one chosen production origin: `https://swisherplumbingllc.com`. `http://` and `www` variants should permanently redirect in one hop to the HTTPS non-`www` origin. Every indexable page should use an absolute self-referential canonical.

### P0 — Only one indexable page exists

The sitemap contains only the homepage. Navigation uses fragments such as `#services`, `#about`, and `#contact`. Service cards are not links to service pages. A public `site:swisherplumbingllc.com` search currently surfaces only the homepage.

The site therefore has no independently rankable URLs for searches such as:

- plumber in Milton, FL
- plumber in Pace, FL
- drain cleaning in Pace
- water-heater repair in Milton
- sewer-line repair or grinder-pump service
- commercial plumbing
- emergency plumbing, if the business truly offers it

Competitors appearing for the sampled searches use dedicated location and service pages. The solution is not to generate dozens of nearly identical city pages. It is to build a modest set of genuinely useful pages with distinct local information, services, FAQs, proof, and internal links.

### P0 — The HTML response is an empty application shell

The body delivered to a crawler contains only:

```html
<div id="root"></div>
```

All visible headings, text, links, and service information arrive after React executes. Google can render JavaScript, but rendering is a separate queued phase. Google explicitly recommends server-side rendering or prerendering because it is faster for users and crawlers and not all bots run JavaScript. See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

**Required fix:** Make every indexable route return its principal title, headings, body copy, links, NAP information, and structured data in the initial HTML response. For this site, static generation/prerendering is preferable to a JavaScript-only SPA.

### P0 — Local-business data is invalid, incomplete, and contradictory

The JSON-LD uses `"@type": "PlumbingService"`. Schema.org's actual local-business type is [`Plumber`](https://schema.org/Plumber). The current object also has an empty `@id`, an empty street address, the wrong domain, and unverified coordinates.

Business hours conflict:

| Source inside/currently associated with the site | Hours shown |
| --- | --- |
| Meta description | Claims help is available `24/7` |
| Contact section | Mon–Fri 7 a.m.–7 p.m.; Sat 8 a.m.–12 p.m.; Sun closed |
| JSON-LD | Mon–Fri 7 a.m.–6 p.m.; Sat 8 a.m.–4 p.m. |
| Chamber/BestPros listings | Mon–Fri 7 a.m.–5 p.m.; Sat 7 a.m.–12 p.m.; Sun closed |

Location signals also conflict. The website presents `Pace, FL 32571` without a street address. Public listings associate `3679 US-90, 32571` with either Pace or Milton. The business's Google Business Profile must be treated as the source of truth after the owner confirms whether customers are received at the address or the company is a service-area business.

Google's structured-data guidance requires the markup to describe the visible page accurately and recommends validation and URL inspection after deployment. See [Google's LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business).

**Required fix:** Establish one verified NAP/hours record, use it everywhere, and rebuild the markup as a valid `Plumber` entity. Do not publish a street address if the business is a service-area business that does not receive customers there. Do not claim 24/7 availability unless it is literally true.

### P0 — Missing URLs return server errors

Live checks returned HTTP `500` for:

- `/services`
- `/privacy-policy`
- `/llms.txt`
- `/favicon.ico`
- a random nonexistent URL

A nonexistent URL must return a real `404`, not a `200` application shell and not a `500`. Real published routes must return `200`. The production server/rewrite rules need to be fixed before adding the new page inventory.

### P1 — Thin content and no search-intent coverage

The entire business is represented by one broad page. Each service receives approximately one sentence and three feature labels. There is little information about symptoms, diagnosis, repair choices, materials, warranties, scheduling, price factors, service boundaries, local plumbing conditions, completed jobs, or who performs the work.

The business appears publicly associated with valuable specialties that are barely mentioned or absent on the website: grinder pumps, gas/propane plumbing, commercial work, tankless water heaters, sewer inspection/repair, water-service replacement, and hydro jetting. These must be verified before being promoted.

**Required fix:** Build pages around real customer tasks and verified capabilities, not around repeated city/keyword substitutions.

### P1 — Trust claims need evidence or removal

The source hard-codes the following claims:

- `23+ Years Experience`
- `10K+ Happy Customers`
- `100% Satisfaction Guarantee`
- `5.0 Rating`
- three named testimonials
- all plumbers are background checked
- most repairs receive same-day service
- free estimates
- licensed and insured

Some may be true, but the audit package contains no provenance. The visible `5.0 Rating` conflicts with public rating data. The company license number is shown, but the public BBB record reviewed during the audit listed an expiration of August 31, 2026, which had just passed; current status should be verified directly with Florida DBPR before publication.

**Required fix:** Create a claim ledger. Every statistic, testimonial, rating, guarantee, availability claim, credential, and service promise must have an owner-approved source and date. Remove or soften anything that cannot be substantiated. Never invent reviews or mark third-party reviews as the site's own aggregate rating.

### P1 — Performance is unnecessarily heavy

The production bundle is reasonable for React but the media is not:

- JavaScript: about 285 KB raw / 86 KB gzip
- CSS: about 104 KB raw / 17 KB gzip
- `SectionBackground.png`: 6.1 MB at 7761×3768
- `PelicanMascot.png`: 4.9 MB at 1937×2872
- hero background: 466 KB
- default service image: 445 KB
- logo: 276 KB and rendered repeatedly

The normal page can request roughly 12 MB of imagery before a visitor interacts with the individual service images. Image elements lack explicit dimensions, responsive `srcset`/`sizes`, modern AVIF/WebP variants, `loading="lazy"`, and `decoding="async"`. Two sections also update React state on every scroll event for parallax effects. Static-asset responses observed during the audit did not expose explicit long-lived `Cache-Control` headers.

**Required fix:** Generate responsive AVIF/WebP/JPEG fallbacks, size files to their rendered dimensions, preload only the true LCP image, lazy-load below-the-fold images, declare width/height, reduce scroll-driven React state, respect reduced-motion preferences, and add immutable caching for fingerprinted assets. Confirm field Core Web Vitals in Search Console after traffic accumulates.

### P1 — Broken and misleading links

- Footer Facebook and Instagram links are `href="#"`.
- The location and hours cards also use `href="#"`.
- The form says visitors agree to a privacy policy, but no policy page or link exists.
- The site has no crawlable service links, breadcrumbs, or HTML sitemap.

**Required fix:** Replace placeholders with verified destinations or remove them. Publish a real privacy page reviewed by the business. Use ordinary `<a href="/real-route/">` links for navigation and internal discovery.

### P2 — Metadata and measurement gaps

- The `meta keywords` tag can be removed; Google does not use it for web ranking. See [Google's statement](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag).
- There is no obvious GA4/GTM tag or HTML verification tag in the supplied code. Search Console may still be verified by DNS, so absence in source does not prove it is unconfigured.
- Social metadata lacks a verified site name and purpose-built social image dimensions.
- The sitemap uses a fixed date and meaningless `daily`/priority values. Future sitemaps should contain truthful canonical URLs and accurate modification dates.

## Recommended information architecture

Launch a focused first set. Do not create every possible service × city combination.

### Core pages

- `/` — primary business/home page
- `/plumbing-services/` — service hub
- `/about/`
- `/contact/`
- `/service-areas/`
- `/reviews/` or `/projects/` using verifiable material
- `/privacy-policy/`
- a genuine `/404.html`

### Initial service pages

- `/plumbing-services/leak-detection-repair/`
- `/plumbing-services/drain-cleaning-hydro-jetting/`
- `/plumbing-services/water-heater-repair-installation/`
- `/plumbing-services/sewer-line-repair/`
- `/plumbing-services/grinder-pumps/`
- `/plumbing-services/fixture-toilet-faucet-installation/`
- `/plumbing-services/commercial-plumbing/` if verified
- `/plumbing-services/gas-plumbing/` if verified and properly licensed
- `/plumbing-services/emergency-plumber/` only after exact availability is confirmed

### Initial location pages

- `/service-areas/pace-fl/`
- `/service-areas/milton-fl/`
- `/service-areas/pensacola-fl/` only if it is a substantial, routinely served market

Add Gulf Breeze, Navarre, Cantonment, Escambia County, Okaloosa County, or other areas only when the owner confirms meaningful coverage and the team can write genuinely distinct pages with local proof. Thin doorway pages can do more harm than good.

## Page-content standard

Every indexable page should include:

- a unique title, meta description, canonical, H1, and social metadata
- the service/location answered clearly in the opening paragraph
- an explanation of common problems or customer situations
- Swisher's actual diagnostic and repair process
- repair/replacement options and relevant equipment, where verified
- price factors without fabricated prices
- warranty/guarantee language only if documented
- real project photos with descriptive captions and image dimensions
- named credentials and license details where appropriate
- a short, relevant FAQ based on actual customer questions
- contextual links to adjacent services, locations, about, contact, and emergency guidance
- consistent phone, business name, hours, address/service-area status, and license number
- a clear conversion action that works without misleading urgency

## Local SEO work outside the website

Website work alone will not control the local map pack. Google describes local results in terms of relevance, distance, and prominence; distance cannot be engineered away. See [Google Business Profile's local-ranking guidance](https://support.google.com/business/answer/7091).

The owner or authorized manager should:

1. Confirm and fully complete the Google Business Profile.
2. Use the exact legal/public-facing business name without keyword stuffing.
3. Select `Plumber` as the primary category and only truthful secondary categories.
4. Correct the address/service-area configuration, hours, phone, website URL, appointment link, and services.
5. Upload current real job, team, truck, and storefront/office photos as applicable.
6. Establish a compliant process for requesting reviews from every real customer and responding professionally to all reviews.
7. Reconcile important citations such as BBB, Chamber of Commerce, Angi, Apple Business Connect, Bing Places, Facebook, and major local directories.
8. Earn legitimate local references and links through suppliers, chambers, sponsorships, trade associations, community projects, and partners.

## Search Console and measurement plan

Before deployment, export a baseline. After deployment, use the same measures so improvement is real rather than anecdotal.

1. Verify a domain-level Search Console property for `swisherplumbingllc.com`.
2. Export the last 16 months of queries, pages, countries/devices, clicks, impressions, CTR, and average positions.
3. Record Indexing > Pages reasons and the Google-selected canonical for the homepage.
4. Submit the corrected sitemap.
5. Inspect and request indexing for the homepage and representative service/location templates after release.
6. Monitor non-brand queries separately from branded searches.
7. Connect GA4 and track phone-click, form-submit, booking, and directions events as conversions.
8. Record Google Business Profile calls, website clicks, direction requests, and discovery terms.

Public search checks are useful for spotting obvious indexation problems, but they are not a substitute for Search Console or a location-controlled local rank grid.

## The `llms.txt` question

Billy was referring to `/llms.txt`. It is a community proposal that places a concise Markdown guide at the root of a site so compatible AI agents can understand the business and follow important links. See the current [llms.txt proposal](https://llmstxt.org/).

It is worth adding after the site's facts and real page URLs are settled. It can help compatible agents, but it is not a Google ranking shortcut. Google explicitly says that its AI Overviews and AI Mode require no special AI text file or special markup; ordinary crawlability, indexed pages, internal links, textual content, page experience, accurate structured data, and an up-to-date Business Profile remain the requirements. See [Google's AI-features guidance](https://developers.google.com/search/docs/appearance/ai-features).

The live request to `/llms.txt` currently returns HTTP `500`, so both the missing file and the site's error handling need correction.

A future file should resemble:

```md
# Swisher Plumbing, LLC

> State-certified plumbing contractor serving verified communities in Northwest Florida. Call (850) 619-8613.

Use the business name, hours, address/service-area status, licensing, services, and promises exactly as stated on the linked canonical pages. Do not infer 24/7 availability or services that are not listed.

## Primary pages

- [Home](https://swisherplumbingllc.com/): Business overview and contact information.
- [Plumbing services](https://swisherplumbingllc.com/plumbing-services/): Verified residential and commercial services.
- [Service areas](https://swisherplumbingllc.com/service-areas/): Verified geographic coverage.
- [About](https://swisherplumbingllc.com/about/): Company history, team, and credentials.
- [Contact](https://swisherplumbingllc.com/contact/): Phone, hours, service request, and location/service-area information.
```

Do not publish that sample verbatim until the owner facts and URLs are confirmed.

## Owner fact-check required before the content build

Obtain written answers to these questions:

1. Is `Swisher Plumbing, LLC` the exact public-facing name used on the Google Business Profile?
2. Is the business a walk-in/customer-facing location or a service-area business?
3. What address, if any, should be publicly displayed? Is `3679 US-90, Pace/Milton, FL 32571` current?
4. What city designation does the Google Business Profile use for that address?
5. What are the exact regular hours and emergency-call hours?
6. Is service genuinely available 24/7? If not, remove every 24/7/call-anytime claim.
7. Which counties and cities are actually served, and are there travel limits?
8. Which residential, commercial, gas, sewer, grinder-pump, hydro-jetting, water-heater, and installation services are currently offered?
9. Does the company provide free estimates, same-day scheduling, background-checked technicians, a satisfaction guarantee, warranties, financing, or senior/military discounts? Obtain exact terms.
10. What does `23+ years experience` mean, and whose experience is counted?
11. Can `10K+ happy customers` be substantiated?
12. Are the three testimonials on the site genuine and approved for publication? What are their source URLs/dates?
13. What are the current Google rating and review count, and may they be displayed with a live source link?
14. Is Florida license `CFC1429751` currently active after August 31, 2026?
15. What are the correct Facebook, Instagram, Google review, booking, directions, and email links?
16. Who owns/administers the domain, hosting, Google Business Profile, Search Console, GA4, and directory listings?

## Implementation sequence

### Release 0 — Emergency technical correction

- Back up production and work on a branch.
- Replace every wrong-domain signal with `https://swisherplumbingllc.com`.
- Fix `robots.txt` and the one-page sitemap immediately.
- Remove or repair invalid/inaccurate JSON-LD; never preserve false facts just to keep schema present.
- Make missing URLs return `404`, not `500`.
- Add a temporary valid `/404.html`.
- Confirm `http` and `www` redirect in one hop to the chosen HTTPS origin.
- Rebuild `dist`, deploy, smoke-test, submit the corrected sitemap, and request homepage recrawl.

### Release 1 — Crawlable architecture and factual cleanup

- Add static/prerendered routes and real internal links.
- Publish verified NAP/hours/license/service facts.
- Remove or substantiate claims and testimonials.
- Create the core pages, initial service pages, and the first two location pages.
- Add per-page metadata, `Plumber`/`WebSite`/`WebPage`/`BreadcrumbList`/`Service` schema where appropriate and fully supported by visible content.
- Publish privacy and 404 pages.

### Release 2 — Performance and local proof

- Optimize all images and scroll effects.
- Add real team, truck, equipment, and project proof.
- Complete Google Business Profile and citation cleanup.
- Establish review acquisition and local-link outreach.
- Add `/llms.txt` after canonical routes are stable.

### Release 3 — Measurement and iteration

- Review Search Console and Business Profile data monthly.
- Improve pages with impressions but weak CTR or positions.
- Add new service/location content only from verified demand and real expertise.
- Track leads, not rankings alone.

## Acceptance criteria

- No production file contains `swisherplumbing.com` unless it is in an explicit explanatory blocklist/test fixture.
- Every indexable URL returns `200`, has one self-canonical on `swisherplumbingllc.com`, and exposes its primary content in raw HTML without JavaScript.
- Every nonexistent URL returns `404`; no ordinary missing path returns `500`.
- `robots.txt`, sitemap URLs, JSON-LD, Open Graph, and internal links all use the chosen production origin.
- The sitemap includes every canonical indexable page and no redirects, errors, fragments, or `noindex` pages.
- Structured data passes Schema.org and Google Rich Results validation and matches visible text.
- Business name, phone, address/service-area status, hours, license, and service areas are identical wherever presented.
- Every review/statistic/promise is source-backed and owner approved.
- Every image has explicit dimensions; below-the-fold media is lazy-loaded; responsive modern formats are used.
- Mobile Core Web Vitals targets at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- No placeholder `href="#"` remains for business actions or social links.
- Phone, contact form, booking, directions, navigation, and error pages are smoke-tested on mobile and desktop.
- `npm run build` passes. The current source builds after restoring platform-appropriate dependencies, but `npm run lint` currently reports nine errors that should also be resolved.
- `/llms.txt` returns `200 text/plain` and contains only verified facts and canonical links.

## Bottom line

The site is visually polished enough to convert visitors, but its search foundation is presently unreliable. The wrong-domain canonicalization is an emergency. After that correction, the largest opportunity is to turn the site from one JavaScript-only brochure into a small, fast, statically rendered local-business website with authoritative service pages, honest local proof, a consistent Google Business Profile, and measurement through Search Console. `llms.txt` is a sensible finishing layer for AI agents, not the foundation and not a shortcut around the SEO work.
