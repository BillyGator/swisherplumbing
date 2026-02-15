import { useEffect, useRef, useState } from 'react';
import { Phone, Calendar, Clock } from 'lucide-react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Entrance animations on load
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Beach Background with Parallax */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img
          src="/images/beach-background.jpg"
          alt="Florida beach sunset"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/60" />
      </div>

      {/* Main Content Card */}
      <div
        ref={contentRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] max-w-[800px] transition-all duration-700 ease-out"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -45%) scale(0.98)',
        }}
      >
        <div className="glass-card p-8 md:p-12 text-center transform transition-all hover:scale-[1.02] hover:shadow-2xl duration-500">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-aqua/20 text-aqua px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <Clock className="w-4 h-4" />
            Same-Day Service Available
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
            <span className="block">Florida Plumbing</span>
            <span className="block text-gradient-aqua">Fixed Fast.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Residential & commercial repairs, installs, and emergency service in Milton, FL and the Florida Panhandle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary flex items-center gap-2 text-base w-full sm:w-auto justify-center group hover:-translate-y-1 transition-transform"
            >
              <Calendar className="w-5 h-5 group-hover:animate-bounce" />
              Book Online
            </button>
            <a
              href="tel:850-619-8613"
              className="btn-secondary flex items-center gap-2 text-base w-full sm:w-auto justify-center group hover:-translate-y-1 transition-transform"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Call (850) 619-8613
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-aqua rounded-full animate-pulse" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-aqua rounded-full animate-pulse" />
              24/7 Emergency Service
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-aqua rounded-full animate-pulse" />
              Upfront Pricing
            </span>
          </div>
        </div>
      </div>

      {/* Pelican Mascot with Parallax and Animations */}
      <div
        className="absolute right-[-15%] md:right-[-5%] lg:right-[2%] bottom-[5%] md:bottom-[8%] z-20 will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
      >
        <div
          ref={mascotRef}
          className="transition-all duration-1000 ease-out origin-bottom-right"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded
              ? 'translate3d(0, 0, 0) rotate(0deg)'
              : 'translate3d(10vw, 50px, 0) rotate(-6deg)',
          }}
        >
          <img
            src="/images/logo-with-mascot.png"
            alt="Swisher Plumbing Pelican Mascot - Trusted Plumber in Pace & Milton, FL"
            className="h-[25vh] md:h-[35vh] lg:h-[40vh] w-auto object-contain animate-float hover:scale-110 hover:rotate-3 transition-transform duration-500 cursor-pointer drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll indicator - Fade out on scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-aqua rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
