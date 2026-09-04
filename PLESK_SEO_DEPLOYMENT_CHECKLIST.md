# Plesk / SEO Deployment Checklist

**Created:** 2026-09-03 (SEO Phase 0)
**Branch:** `seo/phase-0-foundation`
**Production origin:** `https://swisherplumbingllc.com`

> **Nothing in this document has been executed.** Phase 0 made repository changes only.
> No commit, no push, and no deployment or Plesk operation was performed. Every step
> below is for a human operator to carry out *after* the branch has been reviewed and merged.

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

- [ ] In Plesk → **Hosting Settings**, confirm **"Permanent SEO-safe 301 redirect from
      HTTP to HTTPS"** is enabled.
- [ ] Confirm a valid SSL/TLS certificate covers **both** `swisherplumbingllc.com` and
      `www.swisherplumbingllc.com`. The `www` → non-`www` redirect in `.htaccess` cannot
      run if the TLS handshake for `www` fails first.

Only if that Plesk setting is unavailable should an Apache-level rule be considered, and
then it must be keyed on `%{HTTP:X-Forwarded-Proto}` rather than `%{HTTPS}`.

## 3. Deploy

- [ ] Merge the reviewed `seo/phase-0-foundation` branch.
- [ ] Run `npm run build` and confirm `dist/` contains `.htaccess`, `404.html`, and `llms.txt`.
- [ ] Publish `dist/` to the document root.
- [ ] **Confirm the upload actually transferred `.htaccess`.** Many FTP/SFTP clients and
      sync tools skip dotfiles by default. Verify it exists on the server.

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

### Expected results

| Request | Expected status | Expected headers |
| --- | --- | --- |
| `https://swisherplumbingllc.com/` | `200` | `Content-Type: text/html` |
| `https://www.swisherplumbingllc.com/` | `301` | `Location: https://swisherplumbingllc.com/` — exactly **one** hop |
| `http://swisherplumbingllc.com/` | `301` | `Location: https://swisherplumbingllc.com/` — exactly **one** hop |
| `/robots.txt` | `200` | `Content-Type: text/plain` |
| `/sitemap.xml` | `200` | an XML content type (`application/xml` or `text/xml`) |
| `/llms.txt` | `200` | `Content-Type: text/plain` |
| `/404.html` | `200` | directly fetchable for testing |
| `/nonexistent-seo-test` | **`404`** | must **not** be `200`, and must **not** be `500` |

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

- [ ] `robots.txt`, `sitemap.xml`, `llms.txt`, and HTML must **not** carry a long
      `immutable` cache. They are mutable at a stable URL.
- [ ] Fingerprinted build output under `/assets/` **may** carry
      `Cache-Control: public, max-age=31536000, immutable`.
- [ ] If nginx sets its own `Cache-Control`/`Expires`, it will override Apache's. Check
      *Additional nginx directives* and reconcile.

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

- Do not re-add an SPA catch-all rewrite. The site has exactly one real route.
- Do not add an `immutable` cache to HTML, `robots.txt`, `sitemap.xml`, or `llms.txt`.
- Do not add `#services`-style fragments to the sitemap. They are not separate URLs.
- Do not add `address`, `geo`, `openingHoursSpecification`, `aggregateRating`, or
  `sameAs` back into the JSON-LD until `OWNER_FACT_CHECK.md` items 2–8, 19, and 21 are answered.
- Do not treat a passing local build as proof that live 404 handling works. Only the
  `curl` checks in step 4, run against the live server, prove that.
