/**
 * Static-generation entry. Loaded by scripts/prerender.mjs through Vite's
 * SSR module runner after `vite build`, so JSX/TS and the `@` alias all work.
 * Renders every canonical route to its full HTML string plus its head tags.
 */

import { renderToString } from 'react-dom/server';
import App from './App';
import { ROUTES } from './site';
import { graphForRoute } from './pages/jsonld';
import { buildHeadTags } from './lib/head';

export interface RenderedPage {
  /** Canonical path with trailing slash. */
  path: string;
  /** Full HTML rendered inside <div id="root">. */
  html: string;
  /** Everything that belongs in <head> (title, meta, canonical, JSON-LD). */
  headTags: string;
}

export function renderAll(): RenderedPage[] {
  return ROUTES.map((route) => {
    const html = renderToString(<App path={route.path} />);
    return {
      path: route.path,
      html,
      headTags: buildHeadTags(route, graphForRoute(route)),
    };
  });
}
