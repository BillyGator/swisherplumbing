import Breadcrumbs from '../components/Breadcrumbs';
import PageHero from '../components/PageHero';
import ContactSection from '../sections/ContactSection';

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Contact' },
];

/**
 * Standalone contact page. The section component below also renders on the
 * homepage; it is reused here unchanged so the form, its labels, and its
 * delivery behavior are identical on both routes.
 */
const ContactPage = () => {
  return (
    <article>
      <PageHero
        kicker="Get In Touch"
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        title="Contact Swisher Plumbing"
        intro={
          <p>
            Call (850) 619-8613 or send a message with the form below. Describe what is
            going on — the fixture, the sound, the location — and include the best way to
            reach you.
          </p>
        }
      />
      <ContactSection />
    </article>
  );
};

export default ContactPage;
