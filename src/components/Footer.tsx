import { Phone, MapPin, Facebook, Instagram, ArrowUp } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  'Leak Detection',
  'Drain Cleaning',
  'Water Heaters',
  'Fixture Installation',
  'Sewer Service',
  'Emergency Repairs',
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-navy-dark pt-16 pb-8 overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-16"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#0B1F3F"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#0B1F3F"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="#0B1F3F"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src="/images/logo-with-mascot.png"
              alt="Swisher Plumbing Logo - Pace & Milton, FL"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-white/60 mb-6">
              Florida plumbing, fixed fast. Serving Pace and the Florida Panhandle with pride since 2017.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-aqua hover:text-navy transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-aqua hover:text-navy transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-coda font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-aqua transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-coda font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-coda font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:850-619-8613"
                  className="flex items-center gap-3 text-white/60 hover:text-aqua transition-colors"
                >
                  <Phone className="w-5 h-5 text-aqua" />
                  (850) 619-8613
                </a>
              </li>

              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" />
                <span>Pace, FL 32571<br />Serving the Florida Panhandle</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Swisher Plumbing. All rights reserved. Licensed & Insured.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm">FL License #CFC1429751</span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-aqua/20 rounded-full flex items-center justify-center text-aqua hover:bg-aqua hover:text-navy transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative pelican */}
      <img
        src="/images/logo-with-mascot.png"
        alt=""
        className="absolute bottom-0 right-4 w-32 h-auto opacity-10 pointer-events-none"
      />
    </footer>
  );
};

export default Footer;
