/**
 * Structured-data builders (Schema.org JSON-LD).
 *
 * Only schema types supported by visible page content are emitted:
 * Plumber, WebSite, WebPage, Service, and BreadcrumbList.
 *
 * PHASE 1 POLICY — deliberately NOT emitted (no verified owner answer exists;
 * see OWNER_FACT_CHECK.md): address, geo, openingHoursSpecification, areaServed,
 * aggregateRating, review, priceRange, sameAs, and any licence or guarantee
 * property. Do not add them by guessing.
 */

import { ORIGIN, SITE_NAME, canonicalFor, type RouteMeta } from '../site';

/** Stable shared nodes, referenced by @id everywhere they appear. */
export function plumberNode() {
  return {
    '@type': 'Plumber',
    '@id': `${ORIGIN}/#business`,
    name: SITE_NAME,
    url: `${ORIGIN}/`,
    telephone: '+1-850-619-8613',
    image: `${ORIGIN}/images/logo-with-mascot.png`,
    logo: `${ORIGIN}/images/logo-with-mascot.png`,
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${ORIGIN}/#website`,
    url: `${ORIGIN}/`,
    name: SITE_NAME,
    inLanguage: 'en-US',
    publisher: { '@id': `${ORIGIN}/#business` },
  };
}

export function webPageNode(route: RouteMeta) {
  return {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    url: route.canonical,
    name: route.title,
    description: route.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${ORIGIN}/#website` },
    about: { '@id': `${ORIGIN}/#business` },
  };
}

export interface ServiceSchemaInput {
  /** Canonical URL of the service page. */
  url: string;
  /** Service name, e.g. "Leak Detection & Repair". */
  name: string;
  /** One-sentence description supported by the visible page copy. */
  description: string;
}

/**
 * Service node for a genuine service page. The provider is the shared
 * #business node; no areaServed, offer catalog, or price is asserted.
 */
export function serviceNode(input: ServiceSchemaInput) {
  return {
    '@type': 'Service',
    '@id': `${input.url}#service`,
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@id': `${ORIGIN}/#business` },
  };
}

export interface Crumb {
  name: string;
  /** Path with trailing slash, or '/' for home. */
  path: string;
}

export function breadcrumbListNode(crumbs: Crumb[], pageUrl: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: canonicalFor(crumb.path),
    })),
  };
}

/** Assemble a whole-page @graph. */
export function buildGraph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
