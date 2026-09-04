import Breadcrumbs from '../components/Breadcrumbs';
import PageHero from '../components/PageHero';
import AboutSection from '../sections/AboutSection';

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'About' },
];

/**
 * Standalone About page. The content below the hero is the exact
 * client-approved AboutSection from the homepage — the company story, values,
 * statistics, and testimonials are reused unchanged, so the raw HTML of this
 * route carries the full approved About content before JavaScript runs. The
 * homepage keeps the same section as its preview.
 */
const AboutPage = () => {
  return (
    <article>
      <PageHero
        kicker="About Swisher Plumbing"
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        title="About Swisher Plumbing"
        intro={
          <p>
            Founded in Pace, Florida, Swisher Plumbing has been serving the Florida
            Panhandle with pride since 2017. What started as a one-truck operation has
            grown into a full-service plumbing company, but we&apos;ve never lost our
            small-town values.
          </p>
        }
      />
      <AboutSection />
    </article>
  );
};

export default AboutPage;
