import type { ReactNode } from 'react';
import { Kopfzeile } from './components/rahmen/Kopfzeile';
import { Fusszeile } from './components/rahmen/Fusszeile';

/**
 * Der Rahmen jeder Seite: Sprunglink, Kopfzeile, Inhalt, Fusszeile.
 *
 * ═══ Warum das eine eigene Datei ist ═══
 *
 * Sieben Seiten, siebenmal derselbe Rahmen. Ihn je Seite zu wiederholen heisst:
 * beim achten Mal fehlt der Sprunglink, und niemand merkt es, weil man ihn mit
 * der Maus nie sieht. Ein Rahmen an einer Stelle hat genau einen Sprunglink.
 *
 * ═══ Was hier NICHT mehr drin ist ═══
 *
 * Kein Lenis, kein GSAP, kein framer-motion, kein Three.js. Die Seite hat genau
 * zwei Bewegungen, beide hat die Kundin selbst benannt, und beide sind CSS-
 * Übergänge. Eine Animationsbibliothek für zwei Effekte ist Ballast, den eine
 * Patientin auf dem Handy im Mobilfunknetz bezahlt.
 *
 * Und kein Smooth-Scroll-Skript: eigenes Scrollverhalten ist auf einer Seite,
 * die jemand mit Wehen oder mit einem Kind auf dem Arm bedient, kein Gewinn.
 */
export function Seite({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Kopfzeile />
      <main id="inhalt">{children}</main>
      <Fusszeile />
    </>
  );
}
