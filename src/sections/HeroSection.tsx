import { useEffect, useRef } from 'react';
import { Phone, Calendar, Clock } from 'lucide-react';
import { observeScroll } from '../lib/motion';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mascotLayerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax is written straight to the DOM inside a requestAnimationFrame
    // guard instead of being stored in React state. Previously every raw scroll
    // event called setScrollY, re-rendering the whole hero. observeScroll also
    // skips the effect entirely (applying offset 0) for reduced-motion visitors.
    return observeScroll((scrollY) => {
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
      }
      if (mascotLayerRef.current) {
        mascotLayerRef.current.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - scrollY / 200));
      }
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Beach Background with Parallax */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 will-change-transform">
        <picture>
          <source srcSet="/images/beach-background-1920.webp" type="image/webp" />
          <img
            src="/images/beach-background.jpg"
            alt="Florida beach sunset"
            width={2400}
            height={2032}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/60" />
      </div>

      {/* Main Content Card */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-10 w-[95%] sm:w-[90%] max-w-[800px] animate-hero-card-in">
        <div className="glass-card p-6 sm:p-8 md:p-12 text-center transform transition-all hover:scale-[1.02] hover:shadow-2xl duration-500">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-aqua/20 text-aqua px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-pulse">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            Same-Day Service Available
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-4 leading-tight">
            <span className="block">Florida Plumbing</span>
            <span className="block text-gradient-aqua">Fixed Fast.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto">
            Residential & commercial repairs, installs, and emergency service in Milton, FL and the Florida Panhandle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="/contact/"
              className="btn-primary flex items-center gap-2 text-base w-full sm:w-auto justify-center group"
            >
              <Calendar className="w-5 h-5 group-hover:animate-bounce" />
              Request Service
            </a>
            <a
              href="tel:850-619-8613"
              className="btn-secondary flex items-center gap-2 text-base w-full sm:w-auto justify-center group"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              (850) 619-8613
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6 text-xs sm:text-sm text-white/60">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-aqua rounded-full animate-pulse" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-aqua rounded-full animate-pulse" />
              Emergency Service
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
        ref={mascotLayerRef}
        className="absolute left-0 right-0 w-full flex justify-center bottom-[5%] md:w-auto md:block md:right-[-5%] md:left-auto lg:right-[2%] md:bottom-[8%] z-20 will-change-transform pointer-events-none"
      >
        <div className="animate-hero-mascot-in origin-bottom-right pointer-events-auto">
          <img
            src="/images/logo-with-mascot.png"
            alt="Swisher Plumbing Pelican Mascot - Trusted Plumber in Pace & Milton, FL"
            width={600}
            height={339}
            decoding="async"
            className="h-[20vh] sm:h-[25vh] md:h-[35vh] lg:h-[40vh] w-auto object-contain animate-float drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll indicator - Fade out on scroll */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce transition-opacity duration-300"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-aqua rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
