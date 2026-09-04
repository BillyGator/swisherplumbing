import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface Props {
    children: React.ReactNode;
    className?: string; // Additional classes
    effect?: 'fade-up' | 'fade-right' | 'fade-left' | 'scale-up'; // Animation type
    delay?: number; // Delay in ms
    threshold?: number; // Visibility threshold (0-1)
}

/**
 * Hydration-safe scroll reveal.
 *
 * The rendered markup is IDENTICAL on the server and on the first client
 * render: always the plain `reveal` class with no hidden state. Hiding and
 * revealing are applied after hydration by writing classes straight to the
 * DOM inside an IntersectionObserver callback — no React state, no
 * render-phase browser API reads, so:
 *
 *   - hydrateRoot() sees matching markup (zero hydration warnings);
 *   - content is never removed or flashed away (worst case a below-the-fold
 *     block starts its entrance a moment late);
 *   - without JavaScript (or with prefers-reduced-motion) the classes that
 *     hide content are never added — everything stays visible. The hiding
 *     rules in index.css are additionally gated behind `html.js`.
 */
const RevealOnScroll = ({
    children,
    className = "",
    effect = 'fade-up',
    delay = 0,
    threshold = 0.1
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;

        const from: Record<string, string> = {
            'fade-up': 'translateY(3rem)',
            'fade-right': 'translateX(-3rem)',
            'fade-left': 'translateX(3rem)',
            'scale-up': 'scale(0.9)',
        };
        el.style.setProperty('--reveal-from', from[effect] ?? from['fade-up']);

        // Already in view (or very close): just mark it shown, never hide it.
        const nearViewport =
            el.getBoundingClientRect().top < window.innerHeight * 0.95;
        if (nearViewport) {
            el.classList.add('reveal-shown');
            return;
        }

        el.classList.add('reveal-init');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal-shown');
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [effect, threshold]);

    return (
        <div
            ref={ref}
            className={`reveal ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
