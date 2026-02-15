import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[600px] md:max-w-4xl rounded-full bg-navy/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-aqua/5 py-3 px-6'
          : 'top-0 left-0 right-0 bg-transparent py-6 px-4 sm:px-6 lg:px-12'
          }`}
      >
        <div className={`w-full ${isScrolled ? '' : 'max-w-7xl mx-auto'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-3 group"
            >
              <img
                src="/images/logo-with-mascot.png"
                alt="Swisher Plumbing Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:850-619-8613"
                className="flex items-center gap-2 text-white/80 hover:text-aqua transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">(850) 619-8613</span>
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-sm"
              >
                Book Online
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-aqua transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className="absolute inset-0 bg-navy/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-2xl font-coda font-bold text-white hover:text-aqua transition-colors duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="tel:850-619-8613"
            className="flex items-center gap-2 text-aqua font-semibold mt-4"
          >
            <Phone className="w-5 h-5" />
            (850) 619-8613
          </a>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-primary mt-4"
          >
            Book Online
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
