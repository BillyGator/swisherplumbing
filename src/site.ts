/**
 * Site-wide constants and the canonical route manifest.
 *
 * PHASE 1 PUBLISHING POLICY: every business-specific fact referenced here or in
 * the route metadata must be either (a) marked VERIFIED in OWNER_FACT_CHECK.md
 * or (b) one of the Phase 0 safe identity facts — business name, canonical
 * origin, telephone. General plumbing educational copy on service pages must
 * never be worded as a specific Swisher promise. See PHASE_1_CONTENT_BLOCKERS.md
 * for the list of facts that prevented pages or claims from being published.
 */

export const ORIGIN = 'https://swisherplumbingllc.com';
export const SITE_NAME = 'Swisher Plumbing, LLC';
export const PHONE_DISPLAY = '(850) 619-8613';
export const PHONE_TEL = 'tel:850-619-8613';

/** Absolute canonical URL for a route path (paths carry a trailing slash). */
export function canonicalFor(path: string): string {
  return path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}

export interface RouteMeta {
  /** URL path with trailing slash. '/' is the homepage. */
  path: string;
  /** Unique document title. */
  title: string;
  /** Unique meta description. Conservative wording only — see policy above. */
  description: string;
  /** Self-referential canonical URL. */
  canonical: string;
  /** Open Graph / Twitter image (absolute URL on the canonical origin). */
  image: string;
  /** Human-readable name used in breadcrumbs and JSON-LD. */
  name: string;
}

export const OG_IMAGE = `${ORIGIN}/images/og-image.jpg`;

const HOME_DESCRIPTION =
  'Swisher Plumbing provides licensed residential and commercial plumbing in Pace, Milton, and the Florida Panhandle: leak detection and repair, drain cleaning, water heaters, fixture upgrades, sewer lines, grinder pumps, and emergency calls.';

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Swisher Plumbing - Expert Plumbers in Pace & Milton, FL',
    description: HOME_DESCRIPTION,
    canonical: canonicalFor('/'),
    image: OG_IMAGE,
    name: 'Home',
  },
  {
    path: '/plumbing-services/',
    title: 'Plumbing Services in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'Leak detection and repair, drain cleaning, water heater services, fixture upgrades, sewer line service, and grinder pumps from Swisher Plumbing, LLC. Call (850) 619-8613 to discuss your plumbing project.',
    canonical: canonicalFor('/plumbing-services/'),
    image: OG_IMAGE,
    name: 'Plumbing Services',
  },
  {
    path: '/plumbing-services/leak-detection-repair/',
    title: 'Leak Detection & Repair in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'Learn the warning signs of a plumbing leak, why hidden leaks need professional diagnosis, and what leak repair can involve. Call Swisher Plumbing, LLC at (850) 619-8613.',
    canonical: canonicalFor('/plumbing-services/leak-detection-repair/'),
    image: OG_IMAGE,
    name: 'Leak Detection & Repair',
  },
  {
    path: '/plumbing-services/drain-cleaning/',
    title: 'Drain Cleaning in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'What causes slow or clogged drains, the warning signs of a bigger blockage, and why professional drain cleaning beats repeated store-bought chemicals. Call (850) 619-8613.',
    canonical: canonicalFor('/plumbing-services/drain-cleaning/'),
    image: OG_IMAGE,
    name: 'Drain Cleaning',
  },
  {
    path: '/plumbing-services/water-heater-services/',
    title: 'Water Heater Services in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'No hot water, rust-colored water, or strange noises from your water heater? Learn what the symptoms can mean and what repair or replacement options exist. Call (850) 619-8613.',
    canonical: canonicalFor('/plumbing-services/water-heater-services/'),
    image: OG_IMAGE,
    name: 'Water Heater Services',
  },
  {
    path: '/plumbing-services/fixture-upgrades/',
    title: 'Fixture Upgrades in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'Upgrading faucets, toilets, or showerheads? Learn what a professional fixture installation involves and when replacement makes more sense than repair. Call (850) 619-8613.',
    canonical: canonicalFor('/plumbing-services/fixture-upgrades/'),
    image: OG_IMAGE,
    name: 'Fixture Upgrades',
  },
  {
    path: '/plumbing-services/sewer-line-service/',
    title: 'Sewer Line Service in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'Learn the warning signs of sewer line trouble, how video inspection works, and what sewer repair or grinder pump service can involve. Call Swisher Plumbing, LLC at (850) 619-8613.',
    canonical: canonicalFor('/plumbing-services/sewer-line-service/'),
    image: OG_IMAGE,
    name: 'Sewer Line Service',
  },
  {
    path: '/plumbing-services/grinder-pumps/',
    title: 'Grinder Pump Services in Northwest Florida | Swisher Plumbing, LLC',
    description:
      'What a grinder pump does, the warning signs of grinder pump trouble, and why proper service matters for homes with low-pressure sewer systems. Call (850) 619-8613.',
    canonical: canonicalFor('/plumbing-services/grinder-pumps/'),
    image: OG_IMAGE,
    name: 'Grinder Pumps',
  },
  {
    path: '/contact/',
    title: 'Contact Swisher Plumbing, LLC | Call (850) 619-8613',
    description:
      'Reach Swisher Plumbing, LLC by phone at (850) 619-8613 or send a message through the contact form to discuss your plumbing needs.',
    canonical: canonicalFor('/contact/'),
    image: OG_IMAGE,
    name: 'Contact',
  },
];

export function getRoute(path: string): RouteMeta | undefined {
  const normalized = path.length > 1 ? path.replace(/\/+$/, '/') : '/';
  return ROUTES.find((r) => r.path === normalized);
}
