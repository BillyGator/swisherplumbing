import type { ReactNode } from 'react';

interface Props {
  /** Small uppercase kicker above the H1. */
  kicker: string;
  title: ReactNode;
  /** Intro paragraph(s) rendered under the H1. */
  intro?: ReactNode;
  /** Breadcrumb bar rendered above the kicker. */
  breadcrumbs?: ReactNode;
}

/**
 * Shared header block for interior pages. The generous top padding clears the
 * fixed navigation bar. The H1 here is the single page H1.
 */
const PageHero = ({ kicker, title, intro, breadcrumbs }: Props) => {
  return (
    <header className="relative w-full pt-36 md:pt-44 pb-10 md:pb-14 bg-gradient-to-b from-navy-dark to-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-aqua/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-coral/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        {breadcrumbs}
        <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mt-6 mb-4">
          {kicker}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6">
          {title}
        </h1>
        {intro && (
          <div className="text-lg text-white/70 max-w-3xl space-y-4">{intro}</div>
        )}
      </div>
    </header>
  );
};

export default PageHero;
