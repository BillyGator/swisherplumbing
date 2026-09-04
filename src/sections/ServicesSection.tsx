import { useRef, useState, useEffect } from 'react';
import {
  Droplets,
  Wrench,
  Flame,
  Bath,
  Minus,
  AlertCircle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import { observeScroll, scrollToSelector } from '../lib/motion';
import { serviceUrl } from '../content/services';

interface Service {
  /** Slug of the matching detail page under /plumbing-services/. */
  slug: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  /** Where the card's title link points. Emergency calls has no page of its
   * own (availability is unverified), so it links to the contact page. */
  pageHref: string;
  webp?: string;
  fallback?: string;
  /** Intrinsic pixel size of the fallback image, used to reserve layout space. */
  width?: number;
  height?: number;
}

const services: Service[] = [
  {
    slug: 'leak-detection-repair',
    icon: <Droplets className="w-8 h-8" />,
    title: 'Leak Detection & Repair',
    description: 'Fast, accurate leak detection and lasting repairs for pipes, faucets, and fixtures.',
    features: ['Slab leak detection', 'Pipe repair', 'Faucet fixes'],
    pageHref: serviceUrl('leak-detection-repair'),
    webp: '/images/Working_under_sink-640.webp',
    fallback: '/images/Working_under_sink-640.png',
    width: 640,
    height: 636,
  },
  {
    slug: 'drain-cleaning',
    icon: <Minus className="w-8 h-8" />,
    title: 'Drain Cleaning',
    description: 'Clear clogged drains and keep your plumbing flowing smoothly.',
    features: ['Hydro jetting', 'Snake cleaning', 'Preventive maintenance'],
    pageHref: serviceUrl('drain-cleaning'),
    webp: '/images/pelican-drain.webp',
    fallback: '/images/pelican-drain.png',
    width: 309,
    height: 224,
  },
  {
    slug: 'water-heater-services',
    icon: <Flame className="w-8 h-8" />,
    title: 'Water Heater Services',
    description: 'Installation, repair, and maintenance for all water heater types.',
    features: ['Tankless installs', 'Repairs', 'Maintenance'],
    pageHref: serviceUrl('water-heater-services'),
    webp: '/images/Water_heater_repair-640.webp',
    fallback: '/images/Water_heater_repair-640.png',
    width: 640,
    height: 679,
  },
  {
    slug: 'fixture-upgrades',
    icon: <Bath className="w-8 h-8" />,
    title: 'Fixture Upgrades',
    description: 'Modern fixtures that save water and enhance your space.',
    features: ['Faucets', 'Toilets', 'Showerheads'],
    pageHref: serviceUrl('fixture-upgrades'),
    webp: '/images/Pelican_fixture_upgrade-640.webp',
    fallback: '/images/Pelican_fixture_upgrade-640.png',
    width: 640,
    height: 632,
  },
  {
    slug: 'sewer-line-service',
    icon: <Wrench className="w-8 h-8" />,
    title: 'Sewer Line Service',
    description: 'Complete sewer line inspection, repair, and replacement.',
    features: ['Video inspection', 'Line repair', 'Grinder Pumps'],
    pageHref: serviceUrl('sewer-line-service'),
    webp: '/images/pelican-sewer-640.webp',
    fallback: '/images/pelican-sewer-640.png',
    width: 640,
    height: 646,
  },
  {
    slug: 'grinder-pumps',
    icon: <AlertCircle className="w-8 h-8" />,
    title: 'Emergency Calls',
    description: 'Emergency plumbing service when you need it most.',
    features: ['Fast response', 'Expert solutions', 'Reliable repairs'],
    pageHref: '/contact/',
    webp: '/images/pelican-emergency-final-640.webp',
    fallback: '/images/pelican-emergency-final-640.png',
    width: 640,
    height: 633,
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const blobLeftRef = useRef<HTMLDivElement>(null);
  const blobRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Decorative parallax blobs. Written straight to the DOM in a rAF callback
    // rather than through React state, so scrolling no longer re-renders this
    // section. Disabled for reduced-motion visitors (see src/lib/motion.ts).
    return observeScroll((scrollY) => {
      if (blobLeftRef.current) {
        blobLeftRef.current.style.transform = `translate3d(0, ${(scrollY - 1000) * 0.1}px, 0)`;
      }
      if (blobRightRef.current) {
        blobRightRef.current.style.transform = `translate3d(0, ${(scrollY - 1000) * -0.05}px, 0)`;
      }
    });
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-navy overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-light/30 to-transparent" />

      {/* Parallax Blobs */}
      <div
        ref={blobLeftRef}
        className="absolute top-[10%] left-[5%] w-64 h-64 bg-coral/10 rounded-full blur-3xl will-change-transform"
      />
      <div
        ref={blobRightRef}
        className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-sand/5 rounded-full blur-3xl will-change-transform"
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Header */}
        <RevealOnScroll effect="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-4 animate-pulse">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Full-Service Plumbing
              <span className="block text-gradient-aqua">For Homes & Businesses</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              From routine maintenance to emergency repairs, our licensed plumbers handle it all with expertise and a smile.
            </p>

            {/* Mascot Showcase */}
            <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-navy-light/50 border border-aqua/20 rounded-3xl p-8 max-w-4xl mx-auto backdrop-blur-sm hover:border-aqua/40 transition-colors duration-300">
              <div className="relative w-48 h-48 flex-shrink-0">
                <div className="absolute inset-0 bg-aqua/20 rounded-full blur-xl animate-pulse-slow"></div>
                <picture>
                  <source
                    srcSet="/images/PelicanMascot-288.webp 288w, /images/PelicanMascot-576.webp 576w"
                    type="image/webp"
                  />
                  <img
                    src="/images/PelicanMascot-576.png"
                    alt="Swisher Plumbing Pelican Mascot - Friendly Service in Pensacola, FL"
                    width={576}
                    height={854}
                    loading="lazy"
                    decoding="async"
                    className="relative w-full h-full object-contain animate-float"
                  />
                </picture>
              </div>
              <div className="text-left">
                <p className="text-2xl font-coda text-white mb-2">
                  <span className="text-coral">"</span>
                  No job too big, no leak too small!
                  <span className="text-coral">"</span>
                </p>
                <p className="text-white/60 text-sm md:text-base">
                  Our friendly pelican mascot represents our commitment to quality service with a smile. We bring that same positive energy to every service call.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Services List */}
          <div className="space-y-4" onMouseLeave={() => setActiveService(null)}>
            {services.map((service, index) => (
              <RevealOnScroll key={service.title} effect="fade-right" delay={index * 100}>
                <div
                  onMouseEnter={() => setActiveService(index)}
                  className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-300 transform hover:-translate-x-1 ${activeService === index
                    ? 'bg-navy-light border-aqua/50 shadow-lg shadow-gray-900/20'
                    : 'bg-navy-light/50 border-white/5 hover:border-white/20 hover:bg-navy-light'
                    }`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center group-hover:items-start gap-4 transition-all duration-300">
                    <div className={`p-3 rounded-xl transition-colors duration-300 flex-shrink-0 ${activeService === index ? 'bg-aqua text-navy' : 'bg-white/5 text-aqua group-hover:bg-white/10'
                      }`}>
                      {service.icon}
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl group-hover:text-xl font-coda font-bold text-white mb-1 group-hover:text-aqua transition-all duration-300 truncate group-hover:whitespace-normal">
                        <a
                          href={service.pageHref}
                          className="hover:text-aqua transition-colors"
                        >
                          {service.title}
                        </a>
                      </h3>

                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                        <div className="overflow-hidden">
                          <p className="text-white/60 text-sm mb-2 group-hover:text-white/80 transition-colors pt-1">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {service.features.map((feature) => (
                              <span
                                key={feature}
                                className="inline-flex items-center gap-1 text-xs bg-sand/10 text-sand px-2 py-1 rounded-full border border-sand/20 whitespace-nowrap"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`hidden sm:block w-5 h-5 transition-all duration-300 ${activeService === index
                      ? 'text-aqua translate-x-1 opacity-100'
                      : 'text-white/30 group-hover:text-white/60 opacity-0 group-hover:opacity-100'
                      }`} />
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            <RevealOnScroll delay={600}>
              <button
                onClick={() => scrollToSelector('#contact')}
                className="w-full mt-6 btn-primary flex items-center justify-center gap-2 group"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </RevealOnScroll>
          </div>

          {/* Service Image */}
          <div className="sticky top-32">
            <RevealOnScroll effect="fade-left" delay={200}>
              <div className="relative w-[80%] mx-auto">
                <div className="relative transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                    <picture key={activeService ?? 'default'}>
                      <source
                        srcSet={activeService !== null ? services[activeService].webp : "/images/Pelican-Services-Pic-1200-640.webp"}
                        type="image/webp"
                      />
                      <img
                        src={activeService !== null ? services[activeService].fallback : "/images/Pelican-Services-Pic-1200-640.jpg"}
                        alt={activeService !== null ? `${services[activeService].title} Service in Milton & Pace, FL` : "Swisher Plumbing Services Collage - Plumbing Solutions in Florida Panhandle"}
                        width={activeService !== null ? services[activeService].width : 640}
                        height={activeService !== null ? services[activeService].height : 429}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-all duration-700 transform hover:scale-105"
                      />
                    </picture>


                  </div>
                </div>

                {/* Floating stats with different parallax strength for depth */}
                <div className="absolute -top-6 -right-6 z-20 pointer-events-none">
                  <div className="bg-gradient-to-br from-sunset to-coral text-white p-5 rounded-2xl shadow-2xl shadow-gray-900/50 animate-float">
                    <p className="text-3xl font-coda font-bold">23+</p>
                    <p className="text-sm font-medium font-inter">Years Experience</p>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 z-20 pointer-events-none">
                  <div className="bg-gradient-to-br from-sand to-sand-dark text-navy p-5 rounded-2xl shadow-2xl shadow-gray-900/50 animate-float-delayed">
                    <p className="text-3xl font-coda font-bold">Fast</p>
                    <p className="text-sm font-medium font-inter">Emergency Service</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section >
  );
};

export default ServicesSection;
