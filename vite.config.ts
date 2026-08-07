import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { praxis } from './src/praxis.config';
import { SEITEN } from './src/seiten';

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

/**
 * Fuer jede Seite aus `src/seiten.ts` einen HTML-Einstieg ANLEGEN.
 *
 * Erzeugt, nicht gepflegt: sechs fast gleiche HTML-Dateien von Hand zu fuehren ist
 * die Falle `zwei-listen-die-driften` in ihrer langweiligsten Form. Wer eine Seite
 * dazulegt, legt sie in `seiten.ts` dazu — und bekommt den Einstieg umsonst.
 *
 * Unterschiede je Seite sind genau drei: Titel, Beschreibung, kanonische Adresse.
 * Alles andere — Schriften, Vorladen, das `#root` — ist identisch, weil es identisch
 * SEIN soll. Zwei Seiten, die verschiedene Schriften vorladen, blitzen verschieden.
 */
function einstiegeAnlegen() {
  const vorlage = readFileSync(resolve(__dirname, 'index.html'), 'utf8');
  const eingaben: Record<string, string> = {
    main: resolve(__dirname, 'index.html'),
    impressum: resolve(__dirname, 'impressum.html'),
    datenschutz: resolve(__dirname, 'datenschutz.html'),
  };

  for (const seite of SEITEN) {
    if (seite.weg === '/') continue;
    const name = seite.weg.replace(/^\/|\/$/g, '');
    const ziel = resolve(__dirname, name, 'index.html');
    mkdirSync(dirname(ziel), { recursive: true });

    /* Der Vorladepfad muss aus der Unterseite heraus stimmen. Vite loest `/fonts/…`
       gegen `base` auf, nicht gegen das Verzeichnis — deshalb bleibt er, wie er ist. */
    const html = vorlage
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${seite.titel}</title>`)
      .replace(/(<meta\s+name="description"[\s\S]*?content=")[\s\S]*?(")/, `$1${seite.beschreibung}$2`)
      /*
       * Das `canonical` FLIEGT RAUS, solange keine Domain feststeht.
       *
       * Es muss eine vollstaendige Adresse sein (`https://praxis.de/leistungen/`) —
       * ein Pfad allein sagt nichts. Und Vite versucht, `href="/leistungen/"` als
       * Datei einzulesen: EISDIR, der Bau bricht ab. Ein halbes canonical ist also
       * nicht nur nutzlos, es geht gar nicht.
       *
       * Sobald die Domain steht, kommt es zurueck — dann mit vollem Praefix.
       */
      .replace(/\n\s*<link rel="canonical"[^>]*>/, '');
    writeFileSync(ziel, html, 'utf8');
    eingaben[name] = ziel;
  }
  return eingaben;
}
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
      /* Impressum und Datenschutz sind eigene Dokumente ohne React, ohne GSAP, ohne
         Three.js — sie sollen nichts von der Startseite mitschleppen. */
      input: einstiegeAnlegen(),
    },
  },
});
