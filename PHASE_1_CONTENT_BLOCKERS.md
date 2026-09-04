# Phase 1 Content Blockers — Facts That Prevented Publication

**Created:** 2026-09-03 (SEO Phase 1)
**Branch:** `seo/phase-1-crawlable-architecture`
**Companion ledger:** `OWNER_FACT_CHECK.md` (all items `UNVERIFIED` until the owner answers in writing)

Phase 1 published only facts that are either marked verified in
`OWNER_FACT_CHECK.md` or are Phase 0 safe identity facts (business name,
canonical origin, telephone). This document records every fact that **blocked
a page, a section, a link, or a schema property** from being published.

When the owner verifies a fact below, update `OWNER_FACT_CHECK.md`, remove the
entry here, and publish the corresponding content.

---

## Deferred pages (entire routes)

| Page | Blocked by | Needed owner answer |
| --- | --- | --- |
| ~~`/about/`~~ — **published 2026-09-04** | — (resolved) | The owner confirmed all pre-existing website content is verified and client-approved (banner at the top of `OWNER_FACT_CHECK.md`), so `/about/` was published reusing the approved homepage About content verbatim. The JSON-LD for the page still omits the claims (no aggregateRating/review in schema). |
| `/service-areas/` and all location pages | Items 2–4 (address, Pace vs Milton), 8 (verified cities/counties) | The verified service-area list and the address/service-area-business decision. |
| `/plumbing-services/emergency-calls/` | Items 5–7 (hours, emergency hours, 24/7) | Exact emergency availability. An emergency page without verified availability wording would either be thin or misleading. Emergency calls are mentioned only on the hub page with the explicit note that availability is not published. |
| `/commercial-plumbing/` | Item 10 | Confirmation that commercial work is offered and its scope. |
| `/gas-plumbing/` (or gas sections) | Item 11 | Gas/propane offering and licensing. Not mentioned anywhere on the new pages. |
| `/privacy-policy/` | Item 23 | Owner-approved (ideally lawyer-reviewed) policy text that discloses `formsubmit.co`. The Phase 0 conservative form wording is preserved on both homepage and contact page. |
| Reviews/testimonials page | Items 18, 19 | Provenance and publication permission for every testimonial; the approved rating source. |

## Claims kept off the new pages

Per the owner's 2026-09-04 confirmation (banner at the top of
`OWNER_FACT_CHECK.md`), all pre-existing website content is verified and
client-approved, so `/about/` reuses the approved homepage About content
verbatim — statistics, testimonials, values and all. The claims below were
**not invented for any page**, remain absent from metadata, JSON-LD, and the
llms.txt assertions, and appear on interior pages only where they are part of
that verbatim approved copy (`/about/`):

- `23+ Years Experience` / `10K+ Happy Customers` / `100% Satisfaction
  Guarantee` / `5.0 Rating` (items 15–17, 19)
- Same-day service language (item 13) — service pages say "describe what you are
  seeing", never response times; the About page's approved value card mentions
  same-day service as published copy
- Free-estimate language (item 12) — the reused contact form copy is
  parameterized: on `/contact/` the "free estimate" and "within 24 hours"
  lines are replaced with neutral wording; the homepage keeps its original copy
- Background-checked technicians (item 14), licensed-and-insured status and
  licence `CFC1429751` (item 20), warranties/guarantees (item 15) — visible in
  the approved About/footer copy; never emitted into structured data
- 24/7 availability (items 6–7) — absent everywhere except the hub page's
  explicit "availability is not published" note

## Structured-data properties withheld

The JSON-LD on every route omits, pending verification: `address`, `geo`,
`openingHoursSpecification`, `areaServed`, `aggregateRating`, `review`,
`priceRange`, `sameAs`, and any licence/guarantee property. See the policy
comment in `src/lib/schema.ts`.

## Link destinations withheld

- Social profile links (item 21) — no verified Facebook/Instagram/Google URLs
  exist; Phase 0 removal stands.
- Map/directions link (items 2–4) — the Location card remains a non-link.
- The "Emergency Calls" card on the homepage links to `/contact/` because no
  emergency page exists yet.

## Other

- Real job photos for service/location pages (item 24) — all current imagery
  is brand illustration; no verified photography exists.
- Favicon optimization — the 684 KB SVG favicon was left as-is (rasterizing it
  safely needs the source artwork or owner sign-off on a replacement).
- Unreferenced images in `public/images/` (~6.4 MB per the Phase 0 inventory)
  were not deleted; owner sign-off required.
- `lastmod` in the sitemap requires a reliable content-modification source;
  none is wired up, so it stays omitted.
