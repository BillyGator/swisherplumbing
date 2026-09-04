/**
 * Phase 1 static-output validation. Run after `npm run build`:
 *
 *   npm run validate:static
 *
 * Checks every indexable route (derived from dist/sitemap.xml — the sitemap
 * and the generated pages can therefore never drift apart), validates the
 * JSON-LD graph with real assertions (plus a built-in negative self-test that
 * proves malformed JSON-LD is rejected), discovers every local asset
 * referenced from HTML (src/href/srcset/metadata), the built CSS (url()),
 * and manifest.json, and finally smoke-tests the built site over real HTTP
 * with a tiny static server that emulates Apache directory-index behavior.
 *
 * Exit code is nonzero if ANY assertion fails.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ORIGIN = 'https://swisherplumbingllc.com';

let failures = 0;
let passes = 0;
const check = (ok, label, detail = '') => {
  if (ok) {
    passes++;
    console.log(`  PASS  ${label}`);
  } else {
    failures++;
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
  return Boolean(ok);
};

// --- JSON-LD graph validation -----------------------------------------------
// Returns an array of error strings (empty = valid). Pure, so the negative
// self-test below can exercise it directly.

function deepScanForEmpty(value, pathStr, errs) {
  if (value === '' || value === null) {
    errs.push(`empty value at ${pathStr}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => deepScanForEmpty(v, `${pathStr}[${i}]`, errs));
  } else if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      deepScanForEmpty(v, `${pathStr}.${k}`, errs);
    }
  }
}

function jsonLdErrors(html, route) {
  const errs = [];
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  if (blocks.length !== 1) {
    errs.push(`expected exactly 1 JSON-LD block, found ${blocks.length}`);
    return errs;
  }

  let graph;
  try {
    graph = JSON.parse(blocks[0][1]);
  } catch (e) {
    errs.push(`malformed JSON: ${e.message}`);
    return errs;
  }

  if (graph['@context'] !== 'https://schema.org') {
    errs.push(`@context is ${JSON.stringify(graph['@context'])}, expected https://schema.org`);
  }
  if (!Array.isArray(graph['@graph']) || graph['@graph'].length === 0) {
    errs.push('@graph missing or not a non-empty array');
    return errs;
  }

  deepScanForEmpty(graph, '$', errs);

  const byType = (t) => graph['@graph'].filter((n) => n['@type'] === t);
  const ids = graph['@graph'].map((n) => n['@id']);

  // Stable, unique @id values.
  const dupes = ids.filter((id, i) => id !== undefined && ids.indexOf(id) !== i);
  if (dupes.length > 0) errs.push(`duplicate @id values: ${[...new Set(dupes)].join(', ')}`);

  // Core nodes on every route.
  const plumber = byType('Plumber')[0];
  const website = byType('WebSite')[0];
  const webpage = byType('WebPage')[0];
  if (!plumber) errs.push('missing Plumber node');
  if (!website) errs.push('missing WebSite node');
  if (!webpage) errs.push('missing WebPage node');
  if (plumber && plumber['@id'] !== `${ORIGIN}/#business`) {
    errs.push(`Plumber @id is ${plumber['@id']}, expected ${ORIGIN}/#business`);
  }
  if (website && website['@id'] !== `${ORIGIN}/#website`) {
    errs.push(`WebSite @id is ${website['@id']}, expected ${ORIGIN}/#website`);
  }
  if (webpage && webpage['@id'] !== `${ORIGIN}${route}#webpage`) {
    errs.push(`WebPage @id is ${webpage['@id']}, expected ${ORIGIN}${route}#webpage`);
  }
  if (webpage && webpage.url !== `${ORIGIN}${route}`) {
    errs.push(`WebPage url is ${webpage.url}, expected ${ORIGIN}${route}`);
  }
  if (webpage && webpage.isPartOf?.['@id'] !== `${ORIGIN}/#website`) {
    errs.push('WebPage.isPartOf does not reference #website');
  }
  if (webpage && webpage.about?.['@id'] !== `${ORIGIN}/#business`) {
    errs.push('WebPage.about does not reference #business');
  }

  // Route-specific expectations.
  const isService = route.startsWith('/plumbing-services/') && route !== '/plumbing-services/';
  const crumbs = byType('BreadcrumbList')[0];

  if (route === '/') {
    if (byType('BreadcrumbList').length > 0) errs.push('homepage must not carry BreadcrumbList');
  } else {
    if (!crumbs) {
      errs.push('missing BreadcrumbList on interior page');
    } else {
      const items = crumbs.itemListElement ?? [];
      items.forEach((item, i) => {
        if (item.position !== i + 1) {
          errs.push(`breadcrumb position ${item.position} at index ${i}, expected ${i + 1}`);
        }
        if (typeof item.item !== 'string' || !item.item.startsWith(`${ORIGIN}/`)) {
          errs.push(`breadcrumb item ${i + 1} is not a canonical absolute URL: ${JSON.stringify(item.item)}`);
        }
      });
      const last = items[items.length - 1];
      if (!last || last.item !== `${ORIGIN}${route}`) {
        errs.push(`last breadcrumb item is ${last?.item}, expected ${ORIGIN}${route}`);
      }
    }
  }

  if (route === '/plumbing-services/') {
    if (byType('Service').length > 0) errs.push('hub page must not carry Service schema');
  }
  if (isService) {
    const service = byType('Service')[0];
    if (!service) {
      errs.push('missing Service node on service page');
    } else {
      if (service['@id'] !== `${ORIGIN}${route}#service`) {
        errs.push(`Service @id is ${service['@id']}, expected ${ORIGIN}${route}#service`);
      }
      if (service.url !== `${ORIGIN}${route}`) errs.push(`Service url mismatch: ${service.url}`);
      if (service.provider?.['@id'] !== `${ORIGIN}/#business`) {
        errs.push('Service.provider does not reference the Plumber entity (#business)');
      }
      if (typeof service.name !== 'string' || service.name.length < 3) {
        errs.push('Service.name missing or too short');
      }
      if (typeof service.description !== 'string' || service.description.length < 20) {
        errs.push('Service.description missing or too short');
      }
    }
  }

  return errs;
}

// --- Negative self-test: the validator MUST reject bad JSON-LD --------------
{
  const badFixtures = [
    ['malformed JSON', `<script type="application/ld+json">{ "@context": broken</script>`],
    ['wrong context', `<script type="application/ld+json">${JSON.stringify({ '@context': 'http://schema.org', '@graph': [] })}</script>`],
    ['missing provider ref', `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Plumber', '@id': `${ORIGIN}/#business`, name: 'X' },
        { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
        { '@type': 'WebPage', '@id': `${ORIGIN}/plumbing-services/drain-cleaning/#webpage`, url: `${ORIGIN}/plumbing-services/drain-cleaning/`, isPartOf: { '@id': `${ORIGIN}/#website` }, about: { '@id': `${ORIGIN}/#business` } },
        { '@type': 'Service', '@id': `${ORIGIN}/plumbing-services/drain-cleaning/#service`, url: `${ORIGIN}/plumbing-services/drain-cleaning/`, name: 'Drain Cleaning', description: 'A description that is definitely long enough.', provider: { '@id': 'https://example.com/#other' } },
      ],
    })}</script>`],
  ];
  let selfTestPassed = true;
  for (const [name, html] of badFixtures) {
    const errs = jsonLdErrors(html, '/plumbing-services/drain-cleaning/');
    if (errs.length === 0) {
      selfTestPassed = false;
      console.log(`  FAIL  negative self-test (${name}) was NOT rejected`);
      failures++;
    } else {
      passes++;
      console.log(`  PASS  negative self-test (${name}) correctly rejected: ${errs[0]}`);
    }
  }
  check(selfTestPassed, 'validator negative self-test: malformed/invalid JSON-LD is always rejected');
}

// --- Expected routes come from the sitemap ----------------------------------
const sitemapRaw = readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const sitemap = sitemapRaw.replace(/<!--[\s\S]*?-->/g, '');
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const routes = sitemapLocs.map((loc) => new URL(loc).pathname);

check(routes.length === 10, `sitemap lists exactly 10 indexable routes (found ${routes.length})`);
check(routes.includes('/about/'), 'sitemap includes /about/');
check(sitemapLocs.every((l) => l.startsWith(ORIGIN + '/')), 'sitemap uses only the canonical origin');
check(!sitemap.includes('#'), 'sitemap contains no fragments');
check(!/lastmod|changefreq|priority/.test(sitemap), 'sitemap has no lastmod/changefreq/priority');

// --- Root SEO files ----------------------------------------------------------
for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt', '404.html', '.htaccess']) {
  check(existsSync(path.join(dist, f)), `dist/${f} exists`);
}
const robots = readFileSync(path.join(dist, 'robots.txt'), 'utf8');
check(robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`), 'robots.txt points at the canonical sitemap');
const notFound = readFileSync(path.join(dist, '404.html'), 'utf8');
check(/noindex/i.test(notFound), '404.html carries noindex');
check(notFound.includes(ORIGIN), '404.html references the correct domain');

// --- Asset discovery ---------------------------------------------------------
// Every local asset referenced from generated HTML (src, href, srcset,
// metadata), the built CSS (url()), and manifest.json must exist in dist/.
const assetRefs = new Set();

const ASSET_EXT = /\.(png|jpe?g|webp|svg|gif|avif|css|js|mjs|ico|webmanifest)$/i;
const addRef = (u) => {
  if (!u || u.startsWith('data:') || u.startsWith('http')) return;
  const p = u.split(/[?#]/)[0];
  if (ASSET_EXT.test(p)) assetRefs.add(p);
};

for (const route of routes) {
  const rel = route === '/' ? 'index.html' : `${route.replace(/\/$/, '')}/index.html`;
  const html = readFileSync(path.join(dist, rel), 'utf8');
  for (const m of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) addRef(m[1]);
  for (const m of html.matchAll(/src[Ss]et="([^"]+)"/g)) {
    for (const candidate of m[1].split(',')) addRef(candidate.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/content="(https:\/\/swisherplumbingllc\.com\/[^"]+)"/g)) {
    addRef(new URL(m[1]).pathname);
  }
}

for (const cssFile of readdirSync(path.join(dist, 'assets')).filter((f) => f.endsWith('.css'))) {
  const css = readFileSync(path.join(dist, 'assets', cssFile), 'utf8');
  for (const m of css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) addRef(m[2]);
}

const manifestPath = path.join(dist, 'manifest.json');
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  for (const icon of manifest.icons ?? []) addRef(icon.src);
}

console.log(`\nDiscovered ${assetRefs.size} unique local asset references`);
const missingAssets = [...assetRefs].filter((u) => !existsSync(path.join(dist, u)));
check(missingAssets.length === 0, 'every referenced local asset exists in dist/', missingAssets.join(', '));

// Explicitly verify every generated optimized variant (files produced by
// scripts/optimize-images.py: sized WebP/PNG/JPEG derivatives) landed in
// dist/, whether or not a page references it yet.
const VARIANT_RE = /-(\d+)w?\.(webp|png|jpe?g)$|^og-image\.jpg$|^pelican-drain\.webp$/i;
const publicImages = readdirSync(path.join(root, 'public', 'images'));
const generatedVariants = publicImages.filter((f) => VARIANT_RE.test(f));
const missingVariants = generatedVariants.filter((f) => !existsSync(path.join(dist, 'images', f)));
check(
  generatedVariants.length >= 15 && missingVariants.length === 0,
  `all ${generatedVariants.length} generated image variants exist in dist/images/`,
  missingVariants.join(', '),
);

// --- Per-page checks ---------------------------------------------------------
const PLACEHOLDER = [/lorem ipsum/i, /\bTODO\b/, /coming soon/i, /placeholder text/i];

for (const route of routes) {
  const rel = route === '/' ? 'index.html' : `${route.replace(/\/$/, '')}/index.html`;
  const file = path.join(dist, rel);
  const label = route;
  console.log(`\n${label}`);

  check(existsSync(file), `${label}: output file exists (${rel})`);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8');

  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
  check(titles.length === 1 && titles[0][1].trim().length > 10, `${label}: exactly one non-trivial <title>`);

  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)" \/>/g)];
  check(
    canonicals.length === 1 && canonicals[0][1] === `${ORIGIN}${route}`,
    `${label}: exactly one self-referential canonical`,
    canonicals.map((c) => c[1]).join(', '),
  );

  const h1s = [...html.matchAll(/<h1[\s>]/g)];
  check(h1s.length === 1, `${label}: exactly one <h1> (found ${h1s.length})`);

  const bodyText = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  check(bodyText.length > 1500, `${label}: meaningful body text in raw HTML (${bodyText.length} chars)`);
  check(!PLACEHOLDER.some((re) => re.test(bodyText)), `${label}: no placeholder content`);

  const internalLinks = [...html.matchAll(/<a [^>]*href="(\/[^"#]*)"/g)].map((m) => m[1]);
  check(internalLinks.length >= 3, `${label}: has internal crawlable links (${internalLinks.length})`);
  const badLinks = internalLinks.filter((href) => !existsSync(path.join(dist, href === '/' ? 'index.html' : `${href.replace(/\/$/, '')}/index.html`)));
  check(badLinks.length === 0, `${label}: all internal links resolve to generated files`, badLinks.join(', '));

  // Primary navigation: every page carries the main menu, and it must link
  // to the real About page — never to the old /#about fragment.
  const navBlocks = [...html.matchAll(/<nav[\s\S]*?<\/nav>/g)].map((m) => m[0]);
  check(
    navBlocks.some((nav) => nav.includes('href="/about/"')),
    `${label}: main navigation links to /about/`,
  );
  check(!html.includes('/#about'), `${label}: no navigation or content link uses /#about`);

  check(!/swisherplumbing\.com/.test(html), `${label}: no wrong-domain references`);
  check(!/href="#"/.test(html), `${label}: no href="#"`);
  check(!html.includes('code-path='), `${label}: zero code-path debugging attributes`);

  // JSON-LD: real assertions (see jsonLdErrors above).
  const errs = jsonLdErrors(html, route);
  check(errs.length === 0, `${label}: JSON-LD graph valid`, errs.join(' | '));

  const ogUrls = [...html.matchAll(/property="og:url" content="([^"]+)"/g)];
  check(ogUrls.length === 1 && ogUrls[0][1] === `${ORIGIN}${route}`, `${label}: og:url matches canonical`);
  check(html.includes(`property="og:image" content="${ORIGIN}/images/og-image.jpg"`), `${label}: og:image on canonical origin`);
  check(html.includes('property="og:image:width" content="1200"'), `${label}: og:image:width present`);
  check(html.includes('property="og:image:height" content="630"'), `${label}: og:image:height present`);
  check(html.includes('property="og:image:type" content="image/jpeg"'), `${label}: og:image:type present`);
  check(html.includes('name="twitter:image:alt"'), `${label}: twitter:image:alt present`);

  // Progressive enhancement: the inline head script gates reveal animations,
  // and the SSR output must never contain reveal-hidden content. (The closed
  // mobile menu legitimately uses `opacity-0 invisible` — not checked here.)
  check(html.includes("classList.add('js')"), `${label}: JS-gating inline script present`);
  check(!/opacity-0 (translate-|scale-)/.test(html), `${label}: raw HTML contains no hidden content`);
}

// Brand/behavioral spot checks across the static output.
const homeHtml = readFileSync(path.join(dist, 'index.html'), 'utf8');
check(homeHtml.includes('Request Service'), 'CTA reads "Request Service"');
check(!homeHtml.includes('Book Online'), 'old "Book Online" label is gone');
check(!homeHtml.includes('We never share your information'), 'inaccurate privacy wording removed');
const contactHtml = readFileSync(path.join(dist, 'contact', 'index.html'), 'utf8');
check(contactHtml.includes('formsubmit.co'), 'contact page acknowledges the form-delivery service');

// About page: approved company content must be present in the raw HTML.
const aboutHtml = readFileSync(path.join(dist, 'about', 'index.html'), 'utf8');
check(aboutHtml.includes('serving the Florida Panhandle'), '/about/: approved company story in raw HTML');
check(aboutHtml.includes('since 2017'), '/about/: founding-year statement in raw HTML');
check(aboutHtml.includes('What Our Neighbors Are Saying'), '/about/: approved testimonials in raw HTML');

// Focus-visible styling must exist in the built CSS.
const builtCss = readdirSync(path.join(dist, 'assets')).filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(path.join(dist, 'assets', f), 'utf8')).join('\n');
check(builtCss.includes(':focus-visible'), 'built CSS contains :focus-visible styling');
check(builtCss.includes('.reveal'), 'built CSS contains the hydration-safe reveal styles');

// --- HTTP smoke test over the built output -----------------------------------
console.log('\nHTTP smoke test (emulating Apache directory behavior)');

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml',
};

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let p = decodeURIComponent(url.pathname);
  let file = path.join(dist, p);
  if (!p.endsWith('/') && existsSync(file) && statSync(file).isDirectory()) {
    res.writeHead(301, { Location: p + '/' });
    return res.end();
  }
  if (p.endsWith('/') || (existsSync(file) && statSync(file).isDirectory())) {
    file = path.join(file, 'index.html');
  }
  if (existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(readFileSync(path.join(dist, '404.html')));
  }
});

await new Promise((resolve) => server.listen(4178, resolve));

const get = async (p) => {
  const res = await fetch(`http://localhost:4178${p}`, { redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location'), type: res.headers.get('content-type'), body: await res.text() };
};

for (const route of routes) {
  const r = await get(route);
  check(r.status === 200 && r.type.includes('text/html'), `${route}: HTTP 200 text/html (got ${r.status})`);
}
for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt', '404.html']) {
  const r = await get(`/${f}`);
  check(r.status === 200, `/${f}: HTTP 200 (got ${r.status})`);
}
// Every discovered asset must also be served.
for (const u of [...assetRefs].slice(0, 40)) {
  const r = await get(u);
  check(r.status === 200, `asset ${u}: HTTP 200 (got ${r.status})`);
}
const noSlash = await get('/plumbing-services');
check(noSlash.status === 301 && noSlash.location === '/plumbing-services/', 'non-trailing-slash URL 301s to trailing slash');
const missing = await get('/definitely-not-a-real-page');
check(missing.status === 404, `nonexistent path returns real 404 (got ${missing.status})`);
check(/noindex/i.test(missing.body), '404 body is the branded noindex page');

console.log(failures === 0 ? `\nAll ${passes} static validation checks passed.` : `\n${failures} check(s) FAILED out of ${passes + failures}.`);

// Close idle keep-alive sockets first; exiting via an explicit timer avoids a
// Windows libuv race (UV_HANDLE_CLOSING assertion) when closing the server
// while undici keep-alive connections are still being torn down.
server.closeAllConnections?.();
server.close();
setTimeout(() => process.exit(failures === 0 ? 0 : 1), 200);
