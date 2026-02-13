import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';

function App() {
  return (
    <div className="relative min-h-screen bg-navy">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
