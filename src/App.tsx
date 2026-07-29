import { useEffect } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';
import { Kopfzeile } from './components/nav/Kopfzeile';
import { Hero } from './components/hero/Hero';
import { Besuch } from './components/showpiece/Besuch';
import { Leistungen } from './components/leistungen/Leistungen';
import { Diskretion } from './components/diskretion/Diskretion';
import { UeberMich } from './components/ueber-mich/UeberMich';
import { PraxisUndAnfahrt } from './components/praxis/PraxisUndAnfahrt';
import { Termin } from './components/termin/Termin';
import { Fusszeile } from './components/footer/Fusszeile';
import { initSmoothScroll } from './motion/smooth-scroll';

/**
 * Der Rhythmus der Seite: helle Textflächen und dunkle Bildflächen wechseln
 * sich ab, nie zwei dunkle hintereinander. Die Seite ist textlastig — das
 * Auge braucht die Pausen.
 *
 *   Hero (Papier) → Besuch (dunkel) → Leistungen (Papier) →
 *   Diskretion (dunkel) → Über mich (Papier) → Praxis (Papier, zweite Fläche) →
 *   Termin (Papier) → Fußzeile (dunkel)
 */
export function App() {
  useEffect(() => initSmoothScroll() ?? undefined, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Kopfzeile />
      <main id="inhalt">
        <Hero />
        <Besuch />
        <Leistungen />
        <Diskretion />
        <UeberMich />
        <PraxisUndAnfahrt />
        <Termin />
      </main>
      <Fusszeile />
    </LazyMotion>
  );
}
