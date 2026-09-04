# Swisher Plumbing, LLC — Owner Fact-Check Required

**Created:** 2026-09-03 (SEO Phase 0)
**Branch:** `seo/phase-0-foundation`
**Status of every item below:** `UNVERIFIED`

> ## 2026-09-03 update — pre-existing website content is client-approved
>
> The business owner has confirmed that **all content that existed on the
> previously approved website is verified and approved by the customer**:
> business history (including "since 2017"), service areas, services, hours,
> testimonials, experience and statistics claims (including "23+ Years",
> "10K+ Happy Customers", "100% Satisfaction Guarantee", "5.0 Rating"),
> emergency-service wording, and licensing information (including
> "FL License #CFC1429751" and "Licensed & Insured").
>
> This content is **preserved as approved** and is not to be removed,
> neutralized, or re-investigated. The items below remain on record as the
> original fact-check ledger for reference and for any *future* claims that
> go beyond the approved content (e.g. address publication, social profile
> URLs, privacy-policy text, new location pages), which still require written
> owner answers before publication.

## How to use this document

Phase 0 corrected the site's *technical* signals only. It deliberately did **not**
invent, choose between, or quietly rewrite any business fact.

Every item below is a question only the business owner can answer. Until an item has
a written owner answer, the corresponding fact must **not** appear in metadata,
JSON-LD structured data, `llms.txt`, a Google Business Profile, or any new page.

Please write the answer directly under each item, add the date and who confirmed it,
and change `Status` from `UNVERIFIED` to `VERIFIED`.

> **Note on the machine-readable layer.** Where the repository contained a claim that
> could not be substantiated, Phase 0 removed it from the *machine-readable* layer
> (meta description, JSON-LD) because publishing a knowingly contradictory assertion
> to search engines is a defect. Phase 0 did **not** delete these claims from the
> *visible* page. They are all still on the live site and are inventoried below.

---

## 1. Exact public-facing Google Business Profile name

- **Current value found:** `Swisher Plumbing` (visible site, footer copyright)
- **Conflicting value:** `Swisher Plumbing, LLC` (used in Phase 0 metadata/JSON-LD as the legal entity name)
- **Source:** [src/components/Footer.tsx:141](src/components/Footer.tsx:141); [index.html](index.html) JSON-LD `name`
- **Owner answer needed:** The exact business name as it appears on the Google Business Profile, character for character, with no added keywords.
- **Status:** `UNVERIFIED`

## 2. Customer-facing address vs. service-area business

- **Current value found:** No street address is published anywhere on the site. Only `Pace, FL 32571`.
- **Conflicting value:** Public listings referenced in the audit associate `3679 US-90, 32571` with the business.
- **Source:** [src/sections/ContactSection.tsx:63](src/sections/ContactSection.tsx:63); [src/components/Footer.tsx:132](src/components/Footer.tsx:132)
- **Owner answer needed:** Do customers come to a physical location, or is this a service-area business that travels to customers? This decision determines whether an address may be published at all.
- **Status:** `UNVERIFIED`

## 3. Correct public address, if any

- **Current value found:** none published
- **Conflicting value:** `3679 US-90, 32571` (public listings, per audit)
- **Source:** audit document; not present in this repository
- **Owner answer needed:** The exact street address to display publicly, or explicit confirmation that no address should be displayed.
- **Status:** `UNVERIFIED`

## 4. Is the address officially Pace or Milton?

- **Current value found:** `Pace, FL 32571` on the site — but the page title and several alt attributes say `Pace & Milton`
- **Conflicting value:** public listings associate the same ZIP with either Pace **or** Milton
- **Source:** [src/sections/ContactSection.tsx:63](src/sections/ContactSection.tsx:63); [src/components/Footer.tsx:132](src/components/Footer.tsx:132); `<title>` in [index.html](index.html)
- **Owner answer needed:** The city designation used by the Google Business Profile and by USPS for the mailing address.
- **Status:** `UNVERIFIED`

## 5. Exact regular business hours

- **Current value found:** `Mon-Fri: 7am-7pm` / `Sat: 8am-12pm | Sun: Closed`
- **Conflicting values:**
  - removed JSON-LD: Mon–Fri 07:00–18:00, Sat 08:00–16:00
  - removed meta description: "24/7"
  - public directory listings (per audit): Mon–Fri 7am–5pm, Sat 7am–12pm
- **Source:** the `BUSINESS_HOURS` constant in [src/sections/ContactSection.tsx:41](src/sections/ContactSection.tsx:41) — now the single source of truth, carrying an in-code warning
- **Owner answer needed:** The exact regular hours for each day of the week.
- **Status:** `UNVERIFIED`

## 6. Exact emergency-call hours

- **Current value found:** none stated. The site shows an "Emergency Service" banner and the words "Call us anytime!" with no hours attached.
- **Conflicting value:** the removed meta description implied 24/7
- **Source:** [src/sections/ContactSection.tsx:58](src/sections/ContactSection.tsx:58); [src/sections/ContactSection.tsx:234](src/sections/ContactSection.tsx:234)
- **Owner answer needed:** During which hours can a customer actually reach someone for an emergency, and what is the realistic response commitment?
- **Status:** `UNVERIFIED`

## 7. Is service genuinely available 24/7?

- **Current value found:** "Call us anytime!" on the phone card — still visible on the site
- **Conflicting value:** the published hours in item 5 are **not** 24/7
- **Source:** [src/sections/ContactSection.tsx:58](src/sections/ContactSection.tsx:58)
- **Owner answer needed:** Yes or no. If no, the "Call us anytime!" wording should be replaced with the true availability.
- **Phase 0 action already taken:** the 24/7 claim was removed from the meta description, the Open Graph description, and the Twitter description. It was **not** removed from the visible page.
- **Status:** `UNVERIFIED`

## 8. Verified cities and counties served

- **Current value found:** `Milton, Pensacola, Gulf Breeze, Navarre, Pace, Cantonment`
- **Conflicting value:** the hero says "Milton, FL and the Florida Panhandle"; the footer says "Pace and the Florida Panhandle"; the testimonials cite Milton, Pensacola, and Gulf Breeze
- **Source:** [src/sections/ContactSection.tsx:76](src/sections/ContactSection.tsx:76)
- **Owner answer needed:** The exact list of cities and counties genuinely served, plus any travel limit or trip-charge boundary.
- **Status:** `UNVERIFIED`

## 9. Verified current services

- **Current value found:** Leak Detection & Repair; Drain Cleaning; Water Heater Services; Fixture Upgrades; Sewer Line Service; Emergency Calls. Sub-features listed: slab leak detection, pipe repair, faucet fixes, hydro jetting, snake cleaning, preventive maintenance, tankless installs, repairs, maintenance, faucets, toilets, showerheads, video inspection, line repair, grinder pumps.
- **Source:** [src/sections/ServicesSection.tsx:22](src/sections/ServicesSection.tsx:22)
- **Owner answer needed:** Confirm every one of the above is currently offered. Flag any that are not.
- **Status:** `UNVERIFIED`

## 10. Is commercial plumbing offered?

- **Current value found:** yes — "Residential & commercial repairs", "For Homes & Businesses", "a full commercial installation"
- **Source:** [src/sections/HeroSection.tsx:69](src/sections/HeroSection.tsx:69); [src/sections/ServicesSection.tsx:135](src/sections/ServicesSection.tsx:135); [src/sections/AboutSection.tsx:120](src/sections/AboutSection.tsx:120)
- **Owner answer needed:** Confirm commercial work is offered, and describe its scope.
- **Status:** `UNVERIFIED`

## 11. Is gas/propane plumbing offered and properly licensed?

- **Current value found:** not mentioned anywhere on the site
- **Conflicting value:** the audit reports the business is publicly associated with gas/propane work
- **Source:** not present in this repository
- **Owner answer needed:** Is gas/propane work offered? Under which licence or certification? It must not be advertised without one.
- **Status:** `UNVERIFIED`

## 12. Are free estimates offered, and under what conditions?

- **Current value found:** "We'll reply fast with next steps and a free estimate"; "Free estimate, no obligation"; "Get a Free Quote"
- **Source:** [src/sections/ContactSection.tsx:162](src/sections/ContactSection.tsx:162); [src/sections/ContactSection.tsx:267](src/sections/ContactSection.tsx:267); [src/sections/ServicesSection.tsx:224](src/sections/ServicesSection.tsx:224)
- **Owner answer needed:** Are estimates always free? Are there exceptions such as diagnostic fees, trip charges, or after-hours calls? State the exact terms.
- **Status:** `UNVERIFIED`

## 13. Is same-day service promised, or only sometimes available?

- **Current value found:** "Same-Day Service Available" (hero badge); "Most repairs scheduled the day you call."
- **Source:** [src/sections/HeroSection.tsx:55](src/sections/HeroSection.tsx:55); [src/sections/AboutSection.tsx:30](src/sections/AboutSection.tsx:30)
- **Owner answer needed:** Is "most repairs same day" a measured fact or marketing copy? What is the honest wording?
- **Status:** `UNVERIFIED`

## 14. Are technicians background checked?

- **Current value found:** "Florida-licensed plumbers, fully background-checked and insured for your peace of mind."
- **Source:** [src/sections/AboutSection.tsx:25](src/sections/AboutSection.tsx:25)
- **Owner answer needed:** Is a background check performed on every technician? By whom, and how is it documented?
- **Status:** `UNVERIFIED`

## 15. Exact warranty or satisfaction-guarantee terms

- **Current value found:** a `100%` / `Satisfaction Guarantee` stat tile
- **Source:** [src/sections/AboutSection.tsx:18](src/sections/AboutSection.tsx:18)
- **Owner answer needed:** What exactly is guaranteed, for how long, with what remedy and what exclusions? If there is no written guarantee, this tile must be changed or removed.
- **Status:** `UNVERIFIED`

## 16. Evidence for `23+ Years Experience`

- **Current value found:** `23+`, displayed in two places
- **Conflicting value:** the About copy says the company has served "with pride **since 2017**", which is about nine years as of 2026, not 23
- **Source:** [src/sections/AboutSection.tsx:15](src/sections/AboutSection.tsx:15); [src/sections/ServicesSection.tsx:250](src/sections/ServicesSection.tsx:250). Conflicting text at [src/sections/AboutSection.tsx:118](src/sections/AboutSection.tsx:118) and [src/components/Footer.tsx:69](src/components/Footer.tsx:69)
- **Owner answer needed:** Whose experience does "23+ years" count — the company's, or an individual's trade experience? These are different claims and must be worded differently. **This is an on-page contradiction visible to any reader.**
- **Status:** `UNVERIFIED`

## 17. Evidence for `10K+ Happy Customers`

- **Current value found:** `10K+`
- **Source:** [src/sections/AboutSection.tsx:16](src/sections/AboutSection.tsx:16)
- **Owner answer needed:** Can 10,000+ customers be substantiated from job records, and over what period? If not, remove it or replace it with a defensible figure.
- **Status:** `UNVERIFIED`

## 18. Provenance and publication permission for every testimonial

- **Current value found:** three testimonials — `Morgan T.` (Milton, FL), `Darnell K.` (Pensacola, FL), `Sandy V.` (Gulf Breeze, FL), each shown with a five-star rating
- **Source:** [src/sections/AboutSection.tsx:39](src/sections/AboutSection.tsx:39)
- **Owner answer needed:** For each one: is it a real customer? Where was it originally published (URL and date)? Is there permission to display it? Testimonials without provenance must be removed.
- **Phase 0 action already taken:** these were **not** placed into structured data. They remain visible on the page.
- **Status:** `UNVERIFIED`

## 19. Current rating and review count, and the approved source

- **Current value found:** `5.0 Rating` with five filled stars
- **Conflicting value:** the audit reports that public rating data does not match 5.0
- **Source:** [src/sections/AboutSection.tsx:138](src/sections/AboutSection.tsx:138)
- **Owner answer needed:** The current real rating and review count, and the source that may be cited. A third-party rating must never be published as the site's own aggregate rating.
- **Phase 0 action already taken:** no `aggregateRating` was placed in JSON-LD.
- **Status:** `UNVERIFIED`

## 20. Current status of Florida licence `CFC1429751`

- **Current value found:** `FL License #CFC1429751`, plus "Licensed & Insured" in three separate places
- **Conflicting value:** the audit reports a public BBB record listing an expiration of **31 August 2026**, which has now passed
- **Source:** [src/components/Footer.tsx:144](src/components/Footer.tsx:144); [src/components/Footer.tsx:141](src/components/Footer.tsx:141); [src/sections/HeroSection.tsx:91](src/sections/HeroSection.tsx:91); [src/sections/AboutSection.tsx:24](src/sections/AboutSection.tsx:24)
- **Owner answer needed:** Confirm directly with Florida DBPR that the licence is current, and supply the renewal date. **This is time-critical: a publicly displayed licence number that has expired is a regulatory problem, not just an SEO one.**
- **Phase 0 action already taken:** licensing status was deliberately left out of `llms.txt` and the JSON-LD.
- **Status:** `UNVERIFIED`

## 21. Verified Facebook, Instagram, Google review, booking, directions, and email links

- **Current value found:** none. The Facebook and Instagram buttons were `href="#"` (dead links) and were removed in Phase 0.
- **Conflicting value:** the old JSON-LD contained `https://www.facebook.com/swisherplumbing`. This is **not trustworthy**: it sits in the same block that also carried the wrong domain, an empty `@id`, an empty street address, and unverified coordinates, and its handle matches the naming of the unrelated Pennsylvania business.
- **Source:** removed from [index.html](index.html); social controls removed at [src/components/Footer.tsx:70](src/components/Footer.tsx:70)
- **Owner answer needed:** The real URLs for Facebook, Instagram, the Google review link, any online booking system, a directions link, and the public contact email address.
- **Status:** `UNVERIFIED`

## 22. Ownership and access for domain, hosting, and marketing accounts

- **Current value found:** the production origin is `https://swisherplumbingllc.com`; hosting appears to be Plesk; the git remote is `https://github.com/BillyGator/swisherplumbing.git`
- **Owner answer needed:** Who owns and can administer each of: the `swisherplumbingllc.com` domain registration, the Plesk hosting account, the Google Business Profile, Google Search Console, GA4, and the major directory listings (BBB, Chamber, Angi, Bing Places, Apple Business Connect)?
- **Why it matters:** the Search Console verification and sitemap submission in `PLESK_SEO_DEPLOYMENT_CHECKLIST.md` cannot be completed without this access.
- **Status:** `UNVERIFIED`

## 23. Approved privacy-policy content or legal source

- **Current value found:** the contact form previously stated "By submitting, you agree to our privacy policy" while **no privacy policy page or link existed anywhere on the site**.
- **Source:** [src/sections/ContactSection.tsx:378](src/sections/ContactSection.tsx:378)
- **Phase 0 action already taken:** that sentence was replaced with a plain, non-deceptive statement — *"We use the details you send only to respond to your request. We never share your information."* No policy text was written, and nothing was represented as owner-approved.
- **Owner answer needed:** An owner-reviewed (ideally lawyer-reviewed) privacy policy. **This is still required.** Note that the form posts submissions to the third-party service `formsubmit.co`, which the policy will need to disclose.
- **Status:** `UNVERIFIED`

## 24. Real photos and completed projects for later service and location pages

- **Current value found:** all imagery is brand illustration and pelican-mascot artwork. There are no photographs of real jobs, staff, trucks, or premises.
- **Source:** `public/images/`
- **Owner answer needed:** Real, owned photographs of completed work, the team, and vehicles, with permission to publish and a note of where each was taken.
- **Why it matters:** the Phase 1 service and location pages need genuine local proof; illustration alone will not establish local prominence.
- **Status:** `UNVERIFIED`

---

## Additional item found during Phase 0 (not in the original list)

## 25. "Since 2017" contradicts "23+ Years Experience"

- **Current value found:** both statements appear on the same page.
- **Source:** [src/sections/AboutSection.tsx:118](src/sections/AboutSection.tsx:118) and [src/components/Footer.tsx:69](src/components/Footer.tsx:69) say "since 2017"; [src/sections/AboutSection.tsx:15](src/sections/AboutSection.tsx:15) and [src/sections/ServicesSection.tsx:250](src/sections/ServicesSection.tsx:250) say "23+ Years Experience".
- **Owner answer needed:** These cannot both describe the company. Resolve alongside item 16.
- **Status:** `UNVERIFIED`
