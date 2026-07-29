import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis und ScrollTrigger teilen sich einen Ticker. Zwei getrennte Schleifen
 * driften auseinander, und der Pin des Showpiece fängt an zu zittern.
 *
 * Bei abgewählter Bewegung wird gar kein Lenis erzeugt — natives Scrollen.
 */
export function initSmoothScroll(): (() => void) | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  const raf = (time: number) => lenis.raf(time * 1000);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}
