import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../site';

interface NavLink {
  name: string;
  /** Real crawlable URL. Every primary menu option opens its own page. */
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/plumbing-services/' },
  { name: 'About', href: '/about/' },
  { name: 'Contact', href: '/contact/' },
];

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Close the mobile menu; the links themselves are ordinary navigations. */
  const handleNavClick = () => {
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
              href="/"
              onClick={(e) => {
                if (currentPath === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0 });
                }
              }}
              className="flex items-center gap-3 group"
            >
              <img
                src="/images/logo-with-mascot.png"
                alt="Swisher Plumbing Logo"
                width={600}
                height={339}
                decoding="async"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={PHONE_TEL}
                className="flex items-center gap-2 text-white/80 hover:text-aqua transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">{PHONE_DISPLAY}</span>
              </a>
              <a href="/contact/" className="btn-primary text-sm">
                Request Service
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-aqua transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
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
              onClick={handleNavClick}
              className="text-2xl font-coda font-bold text-white hover:text-aqua transition-colors duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2 text-aqua font-semibold mt-4"
          >
            <Phone className="w-5 h-5" />
            {PHONE_DISPLAY}
          </a>
          <a href="/contact/" className="btn-primary mt-4">
            Request Service
          </a>
        </div>
      </div>

      {/*
        No-JavaScript fallback: the hamburger menu above cannot open without
        JS, so when JS is unavailable expose the same real links as a plain
        bar (browsers render <noscript> only when scripting is off).
      */}
      <noscript>
        <div className="lg:hidden bg-navy-dark/95 border-b border-white/10 px-4 py-3">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-white/80 hover:text-aqua">
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a href={PHONE_TEL} className="text-aqua font-semibold">
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      </noscript>
    </>
  );
};

export default Navigation;
