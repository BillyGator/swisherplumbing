import { Phone, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import PageHero from '../components/PageHero';
import RevealOnScroll from '../components/RevealOnScroll';
import { getService, serviceUrl, type ServiceContent } from '../content/services';
import { PHONE_DISPLAY, PHONE_TEL } from '../site';

interface Props {
  service: ServiceContent;
}

/**
 * A service detail page. All copy comes from src/content/services.ts and is
 * general plumbing education — nothing here is a Swisher-specific promise.
 */
const ServicePage = ({ service }: Props) => {
  const related = service.related
    .map((slug) => getService(slug))
    .filter((s): s is ServiceContent => Boolean(s));

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Plumbing Services', path: '/plumbing-services/' },
    { name: service.name },
  ];

  return (
    <article>
      <PageHero
        kicker="Plumbing Services"
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        title={service.name}
        intro={service.intro.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      />

      <div className="relative w-full py-16 md:py-24 bg-navy overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <RevealOnScroll>
                <section aria-labelledby="warning-signs">
                  <h2 id="warning-signs" className="text-2xl md:text-3xl font-coda font-bold text-white mb-5">
                    Common warning signs
                  </h2>
                  <ul className="space-y-3">
                    {service.warningSigns.map((sign) => (
                      <li key={sign} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </RevealOnScroll>

              <RevealOnScroll>
                <section aria-labelledby="why-professional">
                  <h2 id="why-professional" className="text-2xl md:text-3xl font-coda font-bold text-white mb-5">
                    Why professional diagnosis matters
                  </h2>
                  <div className="space-y-4 text-white/70 leading-relaxed">
                    {service.diagnosis.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </RevealOnScroll>

              <RevealOnScroll>
                <section aria-labelledby="work-involves">
                  <h2 id="work-involves" className="text-2xl md:text-3xl font-coda font-bold text-white mb-5">
                    What the work can involve
                  </h2>
                  <p className="text-white/50 text-sm mb-4">
                    Every home is different. The list below describes the kinds of work this
                    service can include — a professional assessment determines what applies to yours.
                  </p>
                  <ul className="space-y-3">
                    {service.workInvolves.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-sand flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </RevealOnScroll>

              <RevealOnScroll>
                <section aria-labelledby="factors">
                  <h2 id="factors" className="text-2xl md:text-3xl font-coda font-bold text-white mb-5">
                    What affects the right solution
                  </h2>
                  <ul className="space-y-3">
                    {service.factors.map((factor) => (
                      <li key={factor} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </RevealOnScroll>

              <RevealOnScroll>
                <section aria-labelledby="safety">
                  <h2 id="safety" className="text-2xl md:text-3xl font-coda font-bold text-white mb-5">
                    Safety first
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">{service.safetyIntro}</p>
                  <ul className="space-y-3 mb-6">
                    {service.safetyTips.map((tip) => (
                      <li key={tip} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="glass-card border border-coral/30 p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-coral flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-coda font-bold mb-2">When to stop using it</h3>
                        <ul className="space-y-2">
                          {service.stopUsing.map((line) => (
                            <li key={line} className="text-white/70 text-sm leading-relaxed">
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </RevealOnScroll>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {service.image && (
                <RevealOnScroll effect="fade-left">
                  <div className="glass-card p-6">
                    <picture>
                      <source srcSet={service.image.webp} type="image/webp" />
                      <img
                        src={service.image.fallback}
                        alt={service.image.alt}
                        width={service.image.width}
                        height={service.image.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-contain"
                      />
                    </picture>
                  </div>
                </RevealOnScroll>
              )}

              <RevealOnScroll effect="fade-left" delay={100}>
                <div className="glass-card p-6">
                  <h2 className="text-xl font-coda font-bold text-white mb-3">
                    Talk it through
                  </h2>
                  <p className="text-white/60 text-sm mb-5">
                    Describe what you are seeing and get a clear picture of your options.
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
                  >
                    <Phone className="w-5 h-5" />
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href="/contact/"
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    Send a Message
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </RevealOnScroll>

              <RevealOnScroll effect="fade-left" delay={200}>
                <nav aria-label="Related services" className="glass-card p-6">
                  <h2 className="text-xl font-coda font-bold text-white mb-4">Related services</h2>
                  <ul className="space-y-3">
                    {related.map((rel) => (
                      <li key={rel.slug}>
                        <a
                          href={serviceUrl(rel.slug)}
                          className="flex items-center justify-between gap-2 text-white/60 hover:text-aqua transition-colors text-sm"
                        >
                          {rel.name}
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="/plumbing-services/"
                        className="flex items-center justify-between gap-2 text-white/60 hover:text-aqua transition-colors text-sm font-semibold"
                      >
                        All plumbing services
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </RevealOnScroll>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServicePage;
