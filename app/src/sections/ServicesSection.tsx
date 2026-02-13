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
    image: '/images/pelican-under-sink.png',
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
  const [activeService, setActiveService] = useState(0);
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
        className="absolute top-[10%] left-[5%] w-64 h-64 bg-aqua/5 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translateY(${(scrollY - 1000) * 0.1}px)` }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translateY(${(scrollY - 1000) * -0.05}px)` }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Header */}
        <RevealOnScroll effect="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block text-aqua font-semibold text-sm uppercase tracking-wider mb-4 animate-pulse">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Full-Service Plumbing
              <span className="block text-gradient-aqua">For Homes & Businesses</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From routine maintenance to emergency repairs, our licensed plumbers handle it all with expertise and a smile.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Services List */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <RevealOnScroll key={service.title} effect="fade-right" delay={index * 100}>
                <div
                  onClick={() => setActiveService(index)}
                  className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-300 transform hover:-translate-x-1 ${activeService === index
                    ? 'bg-navy-light border-aqua/50 shadow-lg shadow-aqua/10'
                    : 'bg-navy-light/50 border-white/5 hover:border-white/20 hover:bg-navy-light'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-colors duration-300 ${activeService === index ? 'bg-aqua text-navy' : 'bg-white/5 text-aqua group-hover:bg-white/10'
                      }`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-coda font-bold text-white mb-1 group-hover:text-aqua transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-2 group-hover:text-white/80 transition-colors">{service.description}</p>

                      {activeService === index && (
                        <div className="flex flex-wrap gap-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1 text-xs bg-aqua/20 text-aqua px-3 py-1 rounded-full"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeService === index
                      ? 'text-aqua translate-x-1'
                      : 'text-white/30 group-hover:text-white/60'
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

          {/* Pelican Poses Image */}
          <div className="sticky top-32">
            <RevealOnScroll effect="fade-left" delay={200}>
              <div className="relative w-[80%] mx-auto">
                <div className="relative transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={services[activeService].image || "/images/pelican-poses.jpg"}
                      alt="Swisher Plumbing Pelican"
                      className="w-full h-auto object-cover transition-all duration-700 transform hover:scale-105"
                      key={activeService} // Force re-render for animation
                    />

                    {/* Caption */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="glass-card p-4 bg-navy/60 backdrop-blur-md border border-white/10">
                        <p className="text-white font-coda font-bold text-lg">
                          "No job too big, no leak too small!"
                        </p>
                        <p className="text-white/60 text-sm">
                          Our friendly pelican mascot represents our commitment to quality service with a smile.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stats with different parallax strength for depth */}
                <div className="absolute -top-6 -right-6 z-20 pointer-events-none">
                  <div className="bg-aqua text-navy p-5 rounded-2xl shadow-xl animate-float">
                    <p className="text-3xl font-coda font-bold">23+</p>
                    <p className="text-sm font-medium font-inter">Years Experience</p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 z-20 pointer-events-none">
                  <div className="bg-white text-navy p-5 rounded-2xl shadow-xl animate-float-delayed">
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
