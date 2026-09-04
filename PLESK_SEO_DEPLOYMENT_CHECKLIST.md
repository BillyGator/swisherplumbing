# Plesk / SEO Deployment Checklist

**Created:** 2026-09-03 (SEO Phase 0)
**Branch:** `seo/phase-0-foundation`
**Production origin:** `https://swisherplumbingllc.com`

> **Status, 2026-09-03 evening: sections 1–5 are DONE and verified against the live
> server.** Phase 0 was merged to `main` (PR #1) and auto-deployed by Plesk. Sections 6
> and 7 (Search Console, structured-data validation) still need a human with account access.
>
> **How deployment works on this host, now confirmed:** any push to `main` on GitHub,
> including a PR merge, is a live deploy. Plesk pulls automatically and serves `dist/`.
> Changes are live in about 60 seconds. There is no staging environment.

---

## 0. What Phase 0 changed that affects the server

| File | Purpose |
| --- | --- |
| `dist/.htaccess` | **New.** 404 handling, `www` → non-`www` canonicalization, compression, cache policy. Built from `public/.htaccess`. |
| `dist/404.html` | **New.** Static, JavaScript-free 404 page, `noindex, follow`. |
| `dist/llms.txt` | **New.** Conservative AI-readability file. |
| `dist/robots.txt` | Sitemap URL corrected to `https://swisherplumbingllc.com/sitemap.xml`. |
| `dist/sitemap.xml` | Now lists only `https://swisherplumbingllc.com/`. |
| `dist/index.html` | Canonical, Open Graph, Twitter, and JSON-LD all corrected to the right domain. |

`dist/` is the directory served in production — see `.agent/workflows/DEPLOYMENT.md`.

---

## 1. Confirm the web-server layer *before* trusting `.htaccess`

> **DONE — established empirically on 2026-09-03.** `.htaccess` is honoured on this host.
> `ErrorDocument`, `Rewrite*`, `Header`, `Expires*`, `AddType`, and
> `AddOutputFilterByType` all take effect, and static files (images, `.txt`, `.xml`) pass
> through Apache rather than being served directly by nginx. No nginx directives needed.
>
> **Warning learned the hard way:** `<Location>` / `<LocationMatch>` are **not allowed**
> in `.htaccess`. The first deploy contained one and every URL on the site returned 500
> until hotfix `607d83f7` replaced it with `<FilesMatch>`. Test any future `.htaccess`
> change before merging to `main`, because merging *is* deploying.

**This is the single most important item in this document.**

Plesk normally runs **nginx in front of Apache**. If nginx is configured to serve static
files directly, Apache never sees those requests and **every directive in `.htaccess`
is silently ignored** — including `ErrorDocument 404`.

In Plesk, for the `swisherplumbingllc.com` subscription, open
**Websites & Domains → Apache & nginx Settings** and record the current state of:

- [ ] **"Proxy mode"** — is it enabled (nginx proxies to Apache) or disabled (nginx serves alone)?
- [ ] **"Serve static files directly by nginx"** — is it ticked, and what extensions does it cover?
- [ ] Any **"Additional nginx directives"** already present.
- [ ] Any **"Additional Apache directives"** already present.

**Decision rule:**

- If nginx serves static files directly, `.htaccess` will not control 404s for those
  paths. Add the nginx equivalent in *Additional nginx directives*:

  ```nginx
  error_page 404 /404.html;
  location = /404.html { internal; }
  ```

- If proxy mode is on and static files are **not** served directly by nginx, the
  `.htaccess` shipped in `dist/` should take effect on its own.

- [ ] **Also confirm `AllowOverride` permits `.htaccess`.** If the vhost is configured with
      `AllowOverride None`, the file is inert and its rules must be moved into
      *Additional Apache directives* instead.

## 2. Confirm the HTTP → HTTPS redirect (Plesk owns this, not `.htaccess`)

`public/.htaccess` deliberately contains **no** HTTP→HTTPS rule. Behind a reverse proxy,
an Apache-level rule keyed on `%{HTTPS}` commonly causes a redirect loop, because Apache
sees the already-terminated request as plain HTTP.

- [x] ~~In Plesk → **Hosting Settings**, confirm the HTTP→HTTPS redirect is enabled.~~
      **Verified live:** `http://swisherplumbingllc.com/` and `http://www.swisherplumbingllc.com/`
      both 301 straight to `https://swisherplumbingllc.com/` in a single hop.
- [x] ~~Confirm a valid SSL/TLS certificate covers both hosts.~~ **Verified live:**
      `https://www.swisherplumbingllc.com/` negotiates TLS and 301s to the apex.

Only if that Plesk setting is unavailable should an Apache-level rule be considered, and
then it must be keyed on `%{HTTP:X-Forwarded-Proto}` rather than `%{HTTPS}`.

## 3. Deploy

- [x] Merge the reviewed `seo/phase-0-foundation` branch. **Done:** PR #1 → `4539755f`.
- [x] Run `npm run build` and confirm `dist/` contains `.htaccess`, `404.html`, and `llms.txt`. **Done.**
- [x] Publish `dist/` to the document root. **Done automatically** by Plesk's Git pull on merge.
- [x] Confirm `.htaccess` transferred. **Confirmed** — its rules are visibly in effect (§4).

## 4. Verify with `curl` after deployment

Run each command and compare against the expected result. `-I` sends a HEAD request; add
`-sSL -o /dev/null -w '%{http_code} %{url_effective}\n'` if you want to follow the full
redirect chain.

```bash
curl -I https://swisherplumbingllc.com/
```

```bash
curl -I https://www.swisherplumbingllc.com/
```

```bash
curl -I http://swisherplumbingllc.com/
```

```bash
curl -I https://swisherplumbingllc.com/robots.txt
```

```bash
curl -I https://swisherplumbingllc.com/sitemap.xml
```

```bash
curl -I https://swisherplumbingllc.com/llms.txt
```

```bash
curl -I https://swisherplumbingllc.com/404.html
```

```bash
curl -I https://swisherplumbingllc.com/nonexistent-seo-test
```

### Expected results — and actual results on 2026-09-03 after hotfix `607d83f7`

| Request | Expected status | Expected headers | **Actual** |
| --- | --- | --- | --- |
| `https://swisherplumbingllc.com/` | `200` | `Content-Type: text/html` | ✅ `200`, `text/html` |
| `https://www.swisherplumbingllc.com/` | `301` | `Location: https://swisherplumbingllc.com/` — exactly **one** hop | ✅ `301`, one hop |
| `http://swisherplumbingllc.com/` | `301` | `Location: https://swisherplumbingllc.com/` — exactly **one** hop | ✅ `301`, one hop |
| `/robots.txt` | `200` | `Content-Type: text/plain` | ✅ `200`, `text/plain` |
| `/sitemap.xml` | `200` | an XML content type (`application/xml` or `text/xml`) | ✅ `200`, `application/xml` |
| `/llms.txt` | `200` | `Content-Type: text/plain` | ✅ `200`, `text/plain` |
| `/404.html` | `200` | directly fetchable for testing | ✅ `200` |
| `/nonexistent-seo-test` | **`404`** | must **not** be `200`, and must **not** be `500` | ✅ **`404`**, branded page, `noindex` |

All eight pass. Re-run this table after any future change to `.htaccess` or the hosting settings.

### Failure triage

- **`/nonexistent-seo-test` returns `500`** — the original defect. `.htaccess` is not being
  applied. Go back to step 1: nginx is probably serving directly, or `AllowOverride` is `None`.
- **`/nonexistent-seo-test` returns `200`** — a catch-all rewrite is turning every missing
  URL into the homepage (a soft 404). Find and remove it. Note the *stale* file
  `swisher-plumbing-website/.htaccess` in this repository contains exactly such a
  `RewriteRule ^ index.html [L]` catch-all; make sure no copy of it is live.
- **More than one redirect hop on `http://www....`** — the HTTP→HTTPS redirect and the
  `www` redirect are chaining. Configure Plesk to go straight to
  `https://swisherplumbingllc.com/` in a single hop.
- **A redirect loop** — almost certainly an Apache HTTPS rule fighting the proxy. Remove it
  and use the Plesk setting instead (step 2).

- [ ] Also confirm in a browser that `/nonexistent-seo-test` renders the branded 404 page,
      not the bare server default.

## 5. Cache-header spot check

```bash
curl -I https://swisherplumbingllc.com/robots.txt
```

- [x] `robots.txt`, `sitemap.xml`, `llms.txt`, and HTML must **not** carry a long
      `immutable` cache. **Verified live:** all four return `public, max-age=0, must-revalidate`.
- [x] Fingerprinted build output under `/assets/` **may** carry
      `Cache-Control: public, max-age=31536000, immutable`. **Verified live** on `index-CrvmSoJk.js`.
- [x] If nginx sets its own `Cache-Control`/`Expires`, it will override Apache's.
      **Verified:** the Apache headers reach the client unmodified, so nginx is not overriding them.

## 6. Search Console (requires the access in `OWNER_FACT_CHECK.md` item 22)

- [ ] Verify a **domain property** for `swisherplumbingllc.com` (DNS verification covers
      both `www` and non-`www`, and both schemes).
- [ ] **Before** submitting anything, export a baseline: last 16 months of queries, pages,
      countries, devices, clicks, impressions, CTR, and average position. Without this
      baseline there is no way to prove later improvement.
- [ ] Record the current **Indexing → Pages** reasons and the **Google-selected canonical**
      for the homepage. It is likely still showing the wrong domain; that is the defect
      being fixed.
- [ ] Submit `https://swisherplumbingllc.com/sitemap.xml`.
- [ ] Use **URL Inspection** on `https://swisherplumbingllc.com/` and request indexing.
- [ ] Re-check the Google-selected canonical after a few weeks. It should become
      `https://swisherplumbingllc.com/`.

## 7. Structured-data validation (after deployment, on the live URL)

- [ ] Run the live homepage through the **Rich Results Test** and the **Schema.org validator**.
- [ ] Confirm the `Plumber`, `WebSite`, and `WebPage` nodes parse with no errors.
- [ ] Expect *warnings* about missing recommended properties such as `address`,
      `openingHours`, and `priceRange`. **These are intentional.** Those properties were
      removed because the underlying facts are contradictory or unverified. Do not
      "fix" the warnings by guessing values — resolve `OWNER_FACT_CHECK.md` first.

## 8. Do not do these

- Do not re-add an SPA catch-all rewrite. Every route is a real file in `dist/`.
- Do not add an `immutable` cache to HTML, `robots.txt`, `sitemap.xml`, or `llms.txt`.
- Do not add `#services`-style fragments to the sitemap. They are not separate URLs.
- Do not add `address`, `geo`, `openingHoursSpecification`, `aggregateRating`, or
  `sameAs` back into the JSON-LD until `OWNER_FACT_CHECK.md` items 2–8, 19, and 21 are answered.
- Do not treat a passing local build as proof that live 404 handling works. Only the
  `curl` checks in step 4, run against the live server, prove that.

---

# Phase 1 addendum — real multi-route architecture

**Branch:** `seo/phase-1-crawlable-architecture` (NOT yet merged or deployed as of 2026-09-03)
**What changes for the server:** the site is no longer a single page. There are ten
real routes, each a real `index.html` under `dist/`. **No `.htaccess` rewrite rules were
added** — Apache's default directory index serves each route, and unknown URLs still fall
through to `ErrorDocument 404`. The only `.htaccess` change is a comment update.

## P1.0 What Phase 1 changes that affects the server

| File | Purpose |
| --- | --- |
| `dist/<route>/index.html` (9 new route files) | Prerendered pages: title, H1, copy, nav, JSON-LD all present without JavaScript. |
| `dist/index.html` | Homepage now prerendered too — its content is in the raw HTML, not injected by JS. |
| `dist/sitemap.xml` | Now lists all ten canonical routes. |
| `dist/llms.txt` | Lists the hub and service pages. |
| `dist/.htaccess` | Comment update only; rules unchanged. |
| `dist/images/*-640.webp`, `*-2560.*`, `og-image.jpg`, etc. | Optimized image variants alongside untouched originals. |

## P1.1 Deploy

- [ ] Review and merge the Phase 1 branch (remember: merging to `main` **is** deploying).
- [ ] Run `npm run build` and `npm run validate:static` locally first — all checks must pass.
- [ ] Confirm Plesk's Git pull completes and the new directories exist on the server
      (`plumbing-services/`, `contact/`).

## P1.2 Verify every route live (new curl checks in addition to the step-4 table)

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/leak-detection-repair/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/drain-cleaning/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/water-heater-services/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/fixture-upgrades/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/sewer-line-service/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services/grinder-pumps/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/contact/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/about/
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/plumbing-services
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/images/PelicanMascot-576.webp
curl -s -o /dev/null -w '%{http_code}\n' https://swisherplumbingllc.com/images/og-image.jpg
curl -I https://swisherplumbingllc.com/nonexistent-seo-test
```

Expected: every route returns `200 text/html` (ten routes — the About
correction added `/about/`); `/plumbing-services` (no trailing slash)
returns a single `301` to `/plumbing-services/`; the two image URLs return `200`;
`/nonexistent-seo-test` still returns a real `404`.

## P1.3 Content spot checks on the live pages

- [ ] View source (not DevTools) on one service page and confirm the body copy, H1,
      breadcrumb links, and JSON-LD are present in the raw HTML.
- [ ] Confirm the page renders and behaves normally **with** JavaScript (mobile menu,
      contact form, service-card hover on the homepage).
- [ ] Rich Results Test: a service page should now show `Service` + `BreadcrumbList`
      nodes; warnings about missing address/hours/price remain intentional.
- [ ] Search Console (after §6): submit the expanded sitemap, then use URL Inspection on
      the hub page and one service page and request indexing.
- [ ] In Search Console **Page Indexing**, watch that the ten sitemap URLs are discovered
      and that no soft-404s or "Page with redirect" errors appear.

## P1.4 Do not do these (Phase 1 additions)

- Do not add rewrite rules to "route" URLs — the files exist; Apache serves them directly.
- Do not delete the original images referenced by nothing yet (~6.4 MB) without owner
  sign-off; removal is a separate decision recorded in `SEO_PHASE_0_REPORT.md` §8.
- Do not publish `/about/`, location pages, an emergency page, or a privacy policy until
  the blockers in `PHASE_1_CONTENT_BLOCKERS.md` are resolved with owner answers.

## P1.5 Corrections pass (2026-09-04) — verify after merge

What changed technically (no server-configuration change; `.htaccess` untouched):

- Pages are now **hydrated** (server HTML + `hydrateRoot`) instead of client-rendered
  over an empty root. A React version mismatch or hydration error would show in the
  browser console.
- Debugging attributes (`code-path="..."`) must be absent from all served HTML.
- CTA label is "Request Service" and links directly to `/contact/`; form wording now
  names the form-delivery service (formsubmit.co).
- Visible keyboard focus outline (aqua) on links, buttons, breadcrumbs, mobile menu,
  and scroll-to-top; footer headings are H2; social meta carries og:image dimensions.

Quick live checks in addition to P1.2:

```bash
# zero code-path attributes anywhere in served HTML
curl -s https://swisherplumbingllc.com/ | grep -c 'code-path='
curl -s https://swisherplumbingllc.com/plumbing-services/drain-cleaning/ | grep -c 'code-path='
```

Expected: `0` for both.

- [ ] Open the homepage and one service page in a browser with DevTools console open:
      no hydration warnings, no failed asset requests (Network tab), mobile menu
      toggles, contact form renders, phone links present.
- [ ] Tab through the homepage with the keyboard: every focused control shows the
      aqua focus outline; the "Request Service" hero button is a real link
      (status bar shows `/contact/`) and works with JavaScript disabled.
- [ ] View source on `/contact/` and confirm the form-delivery wording; confirm no
      "privacy policy" promise is present.
