import { Phone, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import PageHero from '../components/PageHero';
import RevealOnScroll from '../components/RevealOnScroll';
import { SERVICES, serviceUrl } from '../content/services';
import { PHONE_DISPLAY, PHONE_TEL } from '../site';

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Plumbing Services' },
];

/**
 * Services hub page: the crawlable index of every service Swisher Plumbing
 * publicly lists. Each card links to a genuine, content-rich service page.
 */
const ServicesHubPage = () => {
  return (
    <article>
      <PageHero
        kicker="What We Do"
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        title={
          <>
            Plumbing Services for
            <span className="block text-gradient-aqua">Northwest Florida Homes</span>
          </>
        }
        intro={
          <p>
            Swisher Plumbing, LLC provides leak detection and repair, drain cleaning,
            water heater services, fixture upgrades, sewer line service, and grinder pump
            service. Below, each service links to a page explaining the warning signs,
            why professional diagnosis matters, and what the work can involve.
          </p>
        }
      />

      <div className="relative w-full py-16 md:py-24 bg-navy overflow-hidden">
        <div className="absolute top-0 left-[5%] w-64 h-64 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service, index) => (
              <RevealOnScroll key={service.slug} delay={index * 75}>
                <a
                  href={serviceUrl(service.slug)}
                  className="glass-card p-7 block h-full group hover:border-aqua/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h2 className="text-xl md:text-2xl font-coda font-bold text-white mb-3 group-hover:text-aqua transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {service.summary}
                  </p>
                  <span className="inline-flex items-center gap-2 text-aqua text-sm font-semibold">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={300}>
            <div className="mt-12 glass-card border border-white/10 p-8 text-center">
              <h2 className="text-2xl font-coda font-bold text-white mb-3">
                Not sure which service you need?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-6">
                Describe the symptom — a sound, a smell, a stain, a drip — and the right
                starting point usually becomes clear. Emergency calls are listed among
                Swisher Plumbing&apos;s services; availability is not published, so call to
                confirm.
              </p>
              <a
                href={PHONE_TEL}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  );
};

export default ServicesHubPage;
