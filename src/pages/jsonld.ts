/**
 * Per-route JSON-LD graphs. Pure data — no components — so it can be imported
 * by both the client app and the static generator.
 *
 * Every node must match visible page content. See src/lib/schema.ts for the
 * list of properties that are deliberately omitted pending owner verification.
 */

import { getService } from '../content/services';
import {
  breadcrumbListNode,
  buildGraph,
  plumberNode,
  serviceNode,
  webPageNode,
  websiteNode,
} from '../lib/schema';
import type { RouteMeta } from '../site';

const HUB_CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Plumbing Services', path: '/plumbing-services/' },
];

export function graphForRoute(route: RouteMeta): object {
  const base = [plumberNode(), websiteNode(), webPageNode(route)];

  if (route.path === '/plumbing-services/') {
    return buildGraph(...base, breadcrumbListNode(HUB_CRUMBS, route.canonical));
  }

  if (route.path.startsWith('/plumbing-services/')) {
    const slug = route.path.split('/')[2];
    const service = getService(slug);
    if (service) {
      return buildGraph(
        ...base,
        serviceNode({
          url: route.canonical,
          name: service.name,
          description: service.summary,
        }),
        breadcrumbListNode(
          [...HUB_CRUMBS, { name: service.name, path: route.path }],
          route.canonical,
        ),
      );
    }
  }

  if (route.path === '/contact/') {
    return buildGraph(
      ...base,
      breadcrumbListNode(
        [
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact/' },
        ],
        route.canonical,
      ),
    );
  }

  return buildGraph(...base);
}
