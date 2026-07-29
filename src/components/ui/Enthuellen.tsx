import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface EnthuellenProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Semantisches Element, in dem der Inhalt landet. */
  readonly als?: ElementType;
  /** Staffelung in Sekunden, wenn mehrere Blöcke nacheinander erscheinen. */
  readonly verzoegerung?: number;
}

/**
 * Ein Block, der beim Eintreten in den Blick einmalig erscheint.
 *
 * IntersectionObserver statt Scroll-Handler, und die Bewegung selbst liegt
 * in CSS auf opacity und transform. Bei abgewählter Bewegung greift die
 * Regel in global.css: der Endzustand steht sofort.
 */
export function Enthuellen({ children, className, als, verzoegerung = 0 }: EnthuellenProps) {
  const Element = als ?? 'div';
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag?.isIntersecting) return;
        element.dataset.sichtbar = 'true';
        beobachter.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    beobachter.observe(element);
    return () => beobachter.disconnect();
  }, []);

  return (
    <Element
      ref={ref}
      className={className ? `enthuellen ${className}` : 'enthuellen'}
      style={verzoegerung ? { transitionDelay: `${verzoegerung}s` } : undefined}
    >
      {children}
    </Element>
  );
}
