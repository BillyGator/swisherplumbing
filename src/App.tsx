import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesHubPage from './pages/ServicesHubPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import { getService } from './content/services';
import { getRoute } from './site';

/** Normalize a URL path to its canonical trailing-slash form:
 *  '/' -> '/', '/plumbing-services' -> '/plumbing-services/',
 *  '///plumbing-services//' -> '/plumbing-services/'.
 *  The production 301 for slashless URLs is Apache's job; this only makes
 *  the client robust (dev server, preview, hydration edge cases). */
function normalizePath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? '/' : `/${trimmed}/`;
}

/** Resolve a normalized path to its page element, or null when unknown. */
function pageFor(path: string) {
  const route = getRoute(path);
  if (!route) return null;

  if (route.path === '/') return <HomePage />;
  if (route.path === '/plumbing-services/') return <ServicesHubPage />;
  if (route.path === '/contact/') return <ContactPage />;
  if (route.path === '/about/') return <AboutPage />;

  const slug = route.path.split('/')[2];
  const service = getService(slug);
  if (service) return <ServicePage service={service} />;

  return null;
}

/**
 * Client bootstrap for the static pages. Every indexable route already exists
 * as real HTML in dist/ (generated at build time); this app re-renders the
 * matching page for the current path and restores the interactive behavior
 * (mobile menu, contact form, parallax). Unknown paths only occur in dev or
 * preview — production serves the static 404.html, which loads no bundle.
 */
function App({ path }: { path?: string }) {
  const currentPath =
    path ?? normalizePath(window.location.pathname);
  const page = pageFor(currentPath);

  return (
    <div className="relative min-h-screen bg-navy">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation currentPath={currentPath} />

      {/* Main Content */}
      <main className="relative">
        {page ?? (
          <div className="pt-40 pb-24 text-center px-4">
            <h1 className="text-3xl font-coda font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-white/60 mb-8">
              The page you are looking for does not exist.
            </p>
            <a href="/" className="btn-primary inline-flex items-center gap-2">
              Back to Homepage
            </a>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
