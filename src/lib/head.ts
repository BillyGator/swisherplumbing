/**
 * Serializes a route's <head> tags. Used only by the static generator
 * (scripts/prerender.mjs via src/prerender-entry.tsx); the dev-server shell in
 * index.html is not the production head.
 */

import type { RouteMeta } from '../site';

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Builds every production head tag for a route: title, description, canonical,
 * Open Graph, Twitter, and the JSON-LD graph. All URLs are already absolute
 * and canonical on https://swisherplumbingllc.com (see src/site.ts).
 */
export function buildHeadTags(route: RouteMeta, graph: object): string {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonical = escapeHtml(route.canonical);
  const image = escapeHtml(route.image);

  const lines = [
    `<title>${title}</title>`,
    `<meta name="title" content="${title}" />`,
    `<meta name="description" content="${description}" />`,
    `<meta name="author" content="Swisher Plumbing, LLC" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${canonical}" />`,
    ``,
    `<!-- Open Graph -->`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Swisher Plumbing, LLC" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:alt" content="Swisher Plumbing pelican mascot" />`,
    ``,
    `<!-- Twitter -->`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="Swisher Plumbing pelican mascot" />`,
    ``,
    `<!-- Structured Data (JSON-LD). Mirrors the visible page content; omitted properties are documented in src/lib/schema.ts -->`,
    `<script type="application/ld+json">`,
    JSON.stringify(graph, null, 2),
    `</script>`,
  ];

  // Indent continuation lines; blank lines stay truly empty so
  // `git diff --check` reports no trailing whitespace in generated HTML.
  // (Line 1 is indented by the template's own `  ${page.headTags}`.)
  return lines.map((line, i) => (i === 0 || line === '' ? line : '  ' + line)).join('\n');
}
