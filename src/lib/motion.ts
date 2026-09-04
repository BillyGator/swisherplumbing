/**
 * Motion preferences.
 *
 * Every scroll-driven parallax effect and every smooth-scroll call in this app
 * routes through here so that a visitor who has asked their operating system to
 * reduce motion does not get moving backgrounds or animated scrolling.
 *
 * CSS animations/transitions are handled separately by the
 * `@media (prefers-reduced-motion: reduce)` block in src/index.css.
 */

/** True when the visitor has asked for reduced motion. Safe to call before hydration. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll an in-page anchor target into view, honouring the reduced-motion
 * preference. Returns true when a target was found.
 */
export function scrollToSelector(selector: string): boolean {
  const element = document.querySelector(selector);
  if (!element) return false;
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
  return true;
}

/**
 * Subscribe to scroll position with a requestAnimationFrame guard.
 *
 * `onFrame` receives window.scrollY at most once per animation frame and should
 * write directly to DOM nodes (via refs). This deliberately avoids React state
 * so that scrolling does not re-render the component tree on every scroll event.
 *
 * When the visitor prefers reduced motion, `onFrame` is invoked exactly once
 * with a scroll offset of 0 and no listener is attached, which leaves the
 * affected elements in their static, unparallaxed position.
 */
export function observeScroll(onFrame: (scrollY: number) => void): () => void {
  if (prefersReducedMotion()) {
    onFrame(0);
    return () => {};
  }

  let frame = 0;
  const run = () => {
    frame = 0;
    onFrame(window.scrollY);
  };
  const handleScroll = () => {
    if (frame === 0) frame = requestAnimationFrame(run);
  };

  run();
  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (frame !== 0) cancelAnimationFrame(frame);
  };
}
