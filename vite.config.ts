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
