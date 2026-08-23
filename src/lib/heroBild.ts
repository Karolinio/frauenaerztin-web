/**
 * Die Groessen des Hero-Bildes — die eine Wahrheit.
 *
 * ═══ Warum das eine eigene Datei ist ═══
 *
 * Weil dieselbe Angabe an zwei Orten gebraucht wird, die nichts voneinander
 * wissen: `Hero.tsx` setzt das `srcset` des Bildes, und `vite.config.ts` setzt
 * den Vorlade-Verweis im HTML-Kopf. Stuenden die Breiten zweimal da, waere das
 * die Falle „zwei Listen, die driften" in ihrer teuersten Form: der Browser
 * laedt dann eine Groesse vor, die er anschliessend nicht benutzt, und holt die
 * richtige ein zweites Mal. Das Vorladen macht die Seite dann LANGSAMER.
 *
 * ═══ Warum es ueberhaupt vorgeladen wird ═══
 *
 * Das Bild ist das groesste Element im ersten Bild der Seite. Ohne Vorladen
 * findet der Browser es erst, nachdem er das JavaScript-Buendel geholt und
 * ausgefuehrt hat — es steht in einer React-Komponente, nicht im HTML.
 */

/** Die drei ausgelieferten Breiten. Dateien: `/bilder/hero-<breite>.webp`. */
export const HERO_BREITEN = [760, 1100, 1800] as const;

/**
 * Wie breit das Bild dargestellt wird.
 *
 * Am Handy fuellt es die Fensterbreite; ab 62rem sitzt es in der rechten
 * Herospalte und belegt gut zwei Fuenftel. Muss mit `hero.css` uebereinstimmen —
 * eine zu grosse Angabe holt unnoetig grosse Dateien, eine zu kleine liefert
 * ein unscharfes Bild.
 */
export const HERO_SIZES = '(min-width: 62rem) 42vw, 100vw';

/** Das `srcset`, gegen einen Basispfad aufgeloest. */
export const heroSrcSet = (basis: string): string =>
  HERO_BREITEN.map((b) => `${basis}bilder/hero-${b}.webp ${b}w`).join(', ');
