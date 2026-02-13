import { useEffect, useRef, useState } from 'react';

interface Props {
    children: React.ReactNode;
    className?: string; // Additional classes
    effect?: 'fade-up' | 'fade-right' | 'fade-left' | 'scale-up'; // Animation type
    delay?: number; // Delay in ms
    threshold?: number; // Visibility threshold (0-1)
}

const RevealOnScroll = ({
    children,
    className = "",
    effect = 'fade-up',
    delay = 0,
    threshold = 0.1
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update visibility based on intersection status
                setIsVisible(entry.isIntersecting);
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    // Define base animation classes
    const baseClasses = "transition-all duration-1000 ease-out will-change-transform";

    // Define visibility states based on effect
    const getEffectClasses = () => {
        if (isVisible) return "opacity-100 transform-none";

        switch (effect) {
            case 'fade-up':
                return "opacity-0 translate-y-12";
            case 'fade-right':
                return "opacity-0 -translate-x-12";
            case 'fade-left':
                return "opacity-0 translate-x-12";
            case 'scale-up':
                return "opacity-0 scale-90";
            default:
                return "opacity-0 translate-y-12";
        }
    };

    return (
        <div
            ref={ref}
            className={`${baseClasses} ${getEffectClasses()} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
