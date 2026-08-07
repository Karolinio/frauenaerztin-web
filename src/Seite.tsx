import { useEffect, type ReactNode } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';
import { Kopfzeile } from './components/nav/Kopfzeile';
import { Fusszeile } from './components/footer/Fusszeile';
import { initSmoothScroll } from './motion/smooth-scroll';

/**
 * Der Rahmen jeder Seite: Kopfzeile, Inhalt, Fusszeile.
 *
 * ═══ Warum das eine eigene Datei ist ═══
 *
 * Sechs Seiten, sechsmal derselbe Rahmen. Ihn je Seite zu wiederholen heisst: beim
 * siebten Mal fehlt der Sprunglink, und niemand merkt es, weil man ihn mit der Maus
 * nie sieht. Ein Rahmen an einer Stelle hat genau einen Sprunglink.
 *
 * ═══ Der Rhythmus, den jede Seite einhalten muss ═══
 *
 * Helle Textflächen (Papier) und dunkle Bildflächen (Teal) wechseln sich ab, nie zwei
 * dunkle hintereinander. Die Seite ist textlastig — das Auge braucht die Pausen.
 * Die Fusszeile ist dunkel; die letzte Sektion vor ihr gehört deshalb aufs Papier.
 */
export function Seite({ children }: { children: ReactNode }) {
  useEffect(() => initSmoothScroll() ?? undefined, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Kopfzeile />
      <main id="inhalt">{children}</main>
      <Fusszeile />
    </LazyMotion>
  );
}
