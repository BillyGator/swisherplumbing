import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';

/**
 * Homepage: the existing one-page composition, unchanged. Its H1, sections,
 * and conversion paths are preserved exactly as Phase 0 left them.
 */
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
