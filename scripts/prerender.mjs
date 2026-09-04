/**
 * Phase 1 static generator.
 *
 * Runs AFTER `vite build`. Renders every canonical route to real HTML using
 * React server rendering (react-dom/server — already a dependency, no new
 * packages), injects each route's unique head (title, meta, canonical, OG,
 * Twitter, JSON-LD), and writes one real file per route:
 *
 *   dist/index.html                                  (/)
 *   dist/plumbing-services/index.html                (/plumbing-services/)
 *   dist/plumbing-services/<slug>/index.html         (each service)
 *   dist/contact/index.html                          (/contact/)
 *
 * There is deliberately NO SPA catch-all: unknown URLs stay 404s.
 */

import { createServer } from 'vite';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// --- Pull the client bundle references out of the Vite-built shell ----------
const builtShell = readFileSync(path.join(dist, 'index.html'), 'utf8');

const grab = (re) =>
  [...builtShell.matchAll(re)].map((m) => m[0]);

const scriptTags = grab(/<script[^>]*type="module"[^>]*>\s*<\/script>/g);
const cssTags = grab(/<link[^>]*rel="stylesheet"[^>]*>/g);
const preloadTags = grab(/<link[^>]*rel="modulepreload"[^>]*>/g);

if (scriptTags.length === 0 || cssTags.length === 0) {
  throw new Error(
    'Could not find the client <script> or <stylesheet> tags in dist/index.html — ' +
    'did `vite build` run first?',
  );
}

// --- Render every route through Vite's SSR module runner --------------------
// PRERENDER=1 tells vite.config.ts to keep the dev-only inspect-react plugin
// out of this pipeline, so no code-path="..." debugging attributes can leak
// into the generated HTML.
process.env.PRERENDER = '1';

const vite = await createServer({
  root,
  logLevel: 'warn',
  server: { middlewareMode: true },
  appType: 'custom',
});

let pages;
try {
  const entry = await vite.ssrLoadModule('/src/prerender-entry.tsx');
  pages = entry.renderAll();
} finally {
  await vite.close();
}

const documentFor = (page) => {
  // Blank template lines must stay truly empty (no indented placeholders when
  // a tag group is absent) so `git diff --check` stays clean.
  const headExtras = [...preloadTags, ...cssTags];
  const bodyExtras = [...scriptTags];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script>document.documentElement.classList.add('js');</script>
  <link rel="icon" type="image/svg+xml" href="/images/Swisher_Favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${page.headTags}
${headExtras.map((t) => '  ' + t).join('\n')}
</head>
<body>
  <div id="root">${page.html}</div>
${bodyExtras.map((t) => '  ' + t).join('\n')}
</body>
</html>
`;
};

for (const page of pages) {
  const rel = page.path === '/' ? '' : page.path.replace(/\/$/, '');
  const outDir = path.join(dist, rel);
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  writeFileSync(outFile, documentFor(page), 'utf8');
  console.log(`prerendered ${page.path} -> ${path.relative(root, outFile)}`);
}

console.log(`\nStatic generation complete: ${pages.length} routes.`);
