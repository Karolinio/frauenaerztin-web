import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { praxis, DEMO } from './src/praxis.config';
import { SEITEN } from './src/seiten';
import { existsSync } from 'node:fs';
import { HERO_SIZES, heroSrcSet } from './src/lib/heroBild';

/**
 * Die beiden Demo-Marken muessen zusammenpassen — sonst bricht der Bau ab.
 *
 * ═══ Der Widerspruch, den das verhindert ═══
 *
 * Diese Seite hat ZWEI Quellen erfundener Daten und zwei Marken dafuer:
 *
 *   DEMO in praxis.config.ts   Anschrift, Telefon, Kammer — alles, was im Code steht
 *   die Datei inhalt/DEMO      Team, Aktuelles, Sprechzeiten — was die Aerztin pflegt
 *
 * Gefunden am 25.08.2026 beim Durchspielen des Live-Zustands: mit DEMO = false
 * verschwanden Anschrift und Telefonnummer zu sichtbaren Luecken — aber im Hero
 * stand weiter „HEUTE 08:00 – 12:30 Uhr", auf /team/ zwei erfundene
 * Mitarbeiterinnen, und in der Hinweiszeile eine erfundene Meldung.
 *
 * Wer den Schalter umlegt und die Seite ansieht, haelt sie fuer sauber. Sie ist
 * es zur Haelfte — und die Haelfte, die bleibt, sind Namen von Menschen, die es
 * nicht gibt, und Oeffnungszeiten, vor denen jemand steht.
 *
 * `pruefe-freigabe.mjs` faengt das ab. Aber eine Pruefung, die man vergessen
 * kann, ist schwaecher als ein Bau, der nicht durchlaeuft. Deshalb hier.
 *
 * Die umgekehrte Richtung ist erlaubt: DEMO an und inhalt/DEMO weg heisst, dass
 * ihre echten Inhalte schon da sind, waehrend der Rest noch aussteht. Das ist
 * genau der Weg, den dieses Projekt nehmen wird.
 */
function demoMarkenPruefen(): void {
  const inhaltIstDemo = existsSync(resolve(__dirname, 'inhalt/DEMO'));
  if (DEMO || !inhaltIstDemo) return;
  throw new Error(
    [
      '',
      '  WIDERSPRUCH ZWISCHEN DEN DEMO-MARKEN — Bau abgebrochen.',
      '',
      '  src/praxis.config.ts sagt DEMO = false (die Seite soll live gehen),',
      '  aber inhalt/DEMO ist noch da: Team, Aktuelles und Sprechzeiten sind',
      '  weiterhin erfunden.',
      '',
      '  Die Seite saehe damit sauber aus und truege trotzdem Namen von Menschen,',
      '  die es nicht gibt, und Oeffnungszeiten, vor denen jemand steht.',
      '',
      '  Zum Loesen: inhalt/*.json durch die echten Angaben ersetzen, dann',
      '  inhalt/DEMO loeschen.',
      '',
    ].join('\n'),
  );
}

/**
 * Titel, Beschreibung und Ort stehen auch im HTML-Kopf aus praxis.config.ts —
 * sonst müsste der Name beim Kundenwechsel an vier Stellen getauscht werden.
 */
function praxisdatenInsHtml(): Plugin {
  /*
   * Ein Titel kann keine sichtbare Luecke sein — im Browsertab und in der
   * Google-Zeile gibt es keine gestrichelte Unterlegung. Solange der Praxisname
   * fehlt, steht dort deshalb eine Angabe, die WAHR ist, ohne etwas zu erfinden:
   * es ist eine gynaekologische Praxis, und sie ist in Erkelenz.
   *
   * „Musterpraxis" oder „Dr. med. [Nachname]" waere beides falsch — das eine
   * erfunden, das andere im Tab unlesbar.
   */
  /*
   * Der Basispfad, so wie ihn `weg()` zur Laufzeit auch benutzt.
   *
   * ═══ Warum das hier stehen MUSS ═══
   *
   * Gemessen am 23.08.2026: im HTML-Kopf stand ein
   * `<link rel="preload" href="/bilder/hero.webp">` mit ABSOLUTEM Pfad. Unter
   * GitHub Pages liegt die Seite in einem Unterordner — der Verweis zeigte
   * damit an die Wurzel der Domain, wo nichts liegt. Neun erzeugte HTML-Dateien
   * trugen ihn, neunmal 404, und die Seite lieferte trotzdem Statuscode 200.
   * Genau diese Falle beschreibt `engine/ausrollen.mjs` im Kopf.
   *
   * Dazu zeigte er auf `hero.webp`, das es seit der Umstellung auf `srcset`
   * gar nicht mehr gibt.
   */
  const basis = process.env.VITE_BASIS ?? '/';

  /*
   * Das Vorladen des Hero-Bildes.
   *
   * `imagesrcset` und `imagesizes` MUESSEN mit dem `<img>` uebereinstimmen,
   * sonst laedt der Browser eine Groesse vor, die er dann nicht nimmt, und holt
   * die richtige ein zweites Mal — Vorladen macht die Seite dann langsamer.
   * Beide Angaben kommen deshalb aus `src/lib/heroBild.ts`, derselben Datei,
   * aus der auch die Komponente liest.
   *
   * Nur wenn kein echtes Portraet gesetzt ist: sobald ihr Foto da ist, steht
   * dort eine einzelne Datei, und die Groessen dafuer gibt es nicht.
   */
  const vorladen = praxis.portraet
    ? `<link rel="preload" as="image" href="${basis}${praxis.portraet.src.replace(/^\//, '')}" fetchpriority="high" />`
    : `<link rel="preload" as="image" imagesrcset="${heroSrcSet(basis)}" imagesizes="${HERO_SIZES}" fetchpriority="high" />`;

  const ersetzungen: Record<string, string> = {
    '%PRAXIS_NAME%': praxis.name ?? `Gynäkologische Praxis ${praxis.ort}`,
    '%PRAXIS_ORT%': praxis.ort,
    '<!-- %HERO_PRELOAD% -->': vorladen,
  };

  return {
    name: 'praxisdaten-ins-html',
    transformIndexHtml(html) {
      const gefuellt = Object.entries(ersetzungen).reduce(
        (acc, [platzhalter, wert]) => acc.replaceAll(platzhalter, wert),
        html,
      );

      /* Solange DEMO gilt, zeigt die Seite erfundene Namen, Zeiten und eine
         erfundene Anschrift. Eine solche Fassung darf unter keinen Umstaenden
         in einen Suchindex geraten — jemand sucht „Frauenarzt Erkelenz", findet
         die Demo und ruft eine Nummer an, die es nicht gibt.
         Das Verbot wird hier beim Bauen gesetzt und nicht zur Laufzeit: ein
         Crawler, der kein JavaScript ausfuehrt, saehe eine Laufzeit-Marke nie. */
      if (!DEMO) return gefuellt;
      return gefuellt.replace('</head>', '  <meta name="robots" content="noindex, nofollow" />\n  </head>');
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
demoMarkenPruefen();

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
