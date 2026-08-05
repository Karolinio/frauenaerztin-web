import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { praxis } from './src/praxis.config';

/**
 * Titel, Beschreibung und Ort stehen auch im HTML-Kopf aus praxis.config.ts —
 * sonst müsste der Name beim Kundenwechsel an vier Stellen getauscht werden.
 */
function praxisdatenInsHtml(): Plugin {
  const ersetzungen: Record<string, string> = {
    '%PRAXIS_NAME%': `${praxis.titel} ${praxis.nachname}`,
    '%PRAXIS_ORT%': praxis.adresse.ort,
    '%PRAXIS_FACH%': praxis.kurzbezeichnung,
    '%PRAXIS_EINZEILER%': praxis.einzeiler,
  };

  return {
    name: 'praxisdaten-ins-html',
    transformIndexHtml(html) {
      return Object.entries(ersetzungen).reduce(
        (acc, [platzhalter, wert]) => acc.replaceAll(platzhalter, wert),
        html,
      );
    },
  };
}

// Drei Einstiege: die Seite selbst plus die beiden Rechtstexte.
// Impressum und Datenschutz sind eigene Dokumente ohne Router, ohne GSAP,
// ohne Three.js — sie sollen nichts von der Startseite mitschleppen.
export default defineConfig({
  /*
   * `base` aus der Umgebung, nicht fest verdrahtet.
   *
   * GitHub Pages liefert unter `/<repo>/` aus, ein eigener Namensbereich unter `/`.
   * Ohne diese Zeile zeigen alle Verweise auf `/assets/…` ab der Wurzel — auf Pages
   * ist das ein 404 und die Seite bleibt weiss. Gemessen am gebauten index.html:
   * `src="/assets/main-….js"`.
   *
   * Sobald eine eigene Domain draufliegt, faellt VITE_BASIS weg und es steht wieder
   * `/`. Deshalb eine Variable und kein fester Pfad.
   */
  base: process.env.VITE_BASIS ?? '/',
  plugins: [react(), praxisdatenInsHtml()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
      },
    },
  },
});
