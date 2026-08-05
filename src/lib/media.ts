/**
 * Bildmaße aus docs/MEDIA.md. Jedes Bild wird mit expliziter Breite und Höhe
 * ausgeliefert, sonst springt das Layout beim Nachladen (CLS).
 *
 * Jede Datei existiert als AVIF (ausliefern) und JPEG (Rückfall) unter
 * gleichem Namen in /media.
 */

export interface Bildmass {
  readonly width: number;
  readonly height: number;
}

const MASSE: Record<string, Bildmass> = {
  'hero-sprechecke': { width: 2400, height: 1610 },
  'station-01-ankommen': { width: 1600, height: 1074 },
  'station-02-anmeldung': { width: 1600, height: 1074 },
  'station-03-warten': { width: 1600, height: 1074 },
  'station-04-sprechen': { width: 1600, height: 1074 },
  'station-05-untersuchen': { width: 1600, height: 1074 },
  'detail-tisch': { width: 1100, height: 1366 },
  'detail-paravent': { width: 1100, height: 1366 },
};

export function bildmass(name: string): Bildmass {
  const mass = MASSE[name];
  if (!mass) {
    throw new Error(
      `Unbekanntes Bild "${name}". Maße in src/lib/media.ts ergänzen, sonst entsteht Layout-Verschiebung.`,
    );
  }
  return mass;
}

/*
 * `BASE_URL` davor, nicht `/media/…` ab der Wurzel.
 *
 * Liegt die Seite nicht unter `/`, sondern unter `/<repo>/` — wie bei GitHub Pages —,
 * zeigt ein Pfad ab der Wurzel ins Leere. Gemessen an der ausgerollten Seite: sieben
 * 404, darunter das Hero-Poster und vier von fuenf Stationsbildern. Die Seite stand,
 * die Schriften kamen, die Bilder fehlten.
 *
 * Vite rechnet `BASE_URL` beim Bauen ein und endet immer auf `/`.
 */
export const avif = (name: string) => `${import.meta.env.BASE_URL}media/${name}.avif`;
export const jpeg = (name: string) => `${import.meta.env.BASE_URL}media/${name}.jpg`;
