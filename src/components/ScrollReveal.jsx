import { useRef, useState, useEffect } from 'react';

function useInViewWithFallback(ref, options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: options.margin || '0px' }
    );

    observer.observe(ref.current);

    const fallback = setTimeout(() => setInView(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [ref, inView]);

  return inView;
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInViewWithFallback(ref, { margin: '-60px' });

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${variant} ${inView ? 'scroll-reveal--visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}

export { useInViewWithFallback };
