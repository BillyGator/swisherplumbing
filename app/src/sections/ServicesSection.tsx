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

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

const services: Service[] = [
  {
    icon: <Droplets className="w-8 h-8" />,
    title: 'Leak Detection & Repair',
    description: 'Fast, accurate leak detection and lasting repairs for pipes, faucets, and fixtures.',
    features: ['Slab leak detection', 'Pipe repair', 'Faucet fixes'],
    image: '/images/Working_under_sink.png',
  },
  {
    icon: <Minus className="w-8 h-8" />,
    title: 'Drain Cleaning',
    description: 'Clear clogged drains and keep your plumbing flowing smoothly.',
    features: ['Hydro jetting', 'Snake cleaning', 'Preventive maintenance'],
    image: '/images/pelican-drain.png',
  },
  {
    icon: <Flame className="w-8 h-8" />,
    title: 'Water Heater Services',
    description: 'Installation, repair, and maintenance for all water heater types.',
    features: ['Tankless installs', 'Repairs', 'Maintenance'],
    image: '/images/Water_heater_repair.png',
  },
  {
    icon: <Bath className="w-8 h-8" />,
    title: 'Fixture Upgrades',
    description: 'Modern fixtures that save water and enhance your space.',
    features: ['Faucets', 'Toilets', 'Showerheads'],
    image: '/images/Pelican_fixture_upgrade.png',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'Sewer Line Service',
    description: 'Complete sewer line inspection, repair, and replacement.',
    features: ['Video inspection', 'Line repair', 'Trenchless options'],
    image: '/images/pelican-sewer.png',
  },
  {
    icon: <AlertCircle className="w-8 h-8" />,
    title: 'Emergency Calls',
    description: '24/7 emergency plumbing service when you need it most.',
    features: ['24/7 availability', 'Fast response', 'Expert solutions'],
    image: '/images/pelican-emergency-final.png',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        className="absolute top-[10%] left-[5%] w-64 h-64 bg-coral/10 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translateY(${(scrollY - 1000) * 0.1}px)` }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-sand/5 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translateY(${(scrollY - 1000) * -0.05}px)` }}
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
                <img
                  src="/images/PelicanMascot.png"
                  alt="Swisher Pelican"
                  className="relative w-full h-full object-contain animate-float"
                />
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
                    }`}
                >
                  <div className="flex items-center group-hover:items-start gap-4 transition-all duration-300">
                    <div className={`p-3 rounded-xl transition-colors duration-300 ${activeService === index ? 'bg-aqua text-navy' : 'bg-white/5 text-aqua group-hover:bg-white/10'
                      }`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl group-hover:text-xl font-coda font-bold text-white mb-1 group-hover:text-aqua transition-all duration-300">
                        {service.title}
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
                                className="inline-flex items-center gap-1 text-xs bg-sand/10 text-sand px-3 py-1 rounded-full border border-sand/20"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeService === index
                      ? 'text-aqua translate-x-1 opacity-100'
                      : 'text-white/30 group-hover:text-white/60 opacity-0 group-hover:opacity-100'
                      }`} />
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            <RevealOnScroll delay={600}>
              <button
                onClick={() => {
                  const el = document.querySelector('#contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
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
                    <img
                      src={activeService !== null ? services[activeService].image : "/images/Pelican-Services-Pic-1200.jpg"}
                      alt={activeService !== null ? services[activeService].title : "Swisher Plumbing Services Collage"}
                      className="w-full h-full object-contain transition-all duration-700 transform hover:scale-105"
                      key={activeService ?? 'default'} // Force re-render for animation
                    />


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
                    <p className="text-3xl font-coda font-bold">24/7</p>
                    <p className="text-sm font-medium font-inter">Emergency Service</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
