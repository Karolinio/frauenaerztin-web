/**
 * Die Pflichtseiten pruefen — Impressum und Datenschutzerklaerung.
 *
 * ═══ Warum es diese Pruefung gibt ═══
 *
 * Beide Seiten hatten am 27.08.2026 Fehler, die niemand sah, weil sie jeweils
 * nur in EINEM Zustand sichtbar waren:
 *
 *   1. `Offen` markierte JEDEN Wert als ausstehend, auch vorhandene. Solange
 *      alles leer war, stimmte die Markierung. Falsch geworden waere sie erst
 *      am Tag, an dem die echten Angaben eingetragen sind — auf einer
 *      Pflichtseite der schlechteste denkbare Zeitpunkt.
 *
 *   2. Davor benutzte dieselbe Komponente eine tote CSS-Klasse fuer den
 *      Vorlesehinweis. Der Hinweis stand dadurch sichtbar auf der Seite:
 *      fuenfzehnmal „Noch einzutragen:" und dahinter nichts.
 *
 *   3. Die Datenschutzerklaerung beschrieb eine OpenStreetMap-Karte samt
 *      Rechtsgrundlage. Es gibt keine Karte. `/kontakt/` sagte der Leserin
 *      sogar ausdruecklich das Gegenteil.
 *
 * Der dritte Fall ist die eigentliche Gefahr: eine Datenschutzerklaerung, die
 * einen Datenfluss beschreibt, den es nicht gibt, ist der Beleg dafuer, dass sie
 * nie gegen die Seite geprueft wurde.
 *
 *   npm run qa:recht                 (startet den Vorschau-Server selbst)
 *   node scripts/qa-recht.mjs <url>  (gegen einen laufenden Server)
 *
 * ═══ Warum das Skript seinen Server selbst startet ═══
 *
 * Weil es das am 30.08.2026 nicht tat und deshalb gegen nichts lief: es hatte
 * `localhost:4319` fest eingetragen, und dort läuft dieses Projekt nur, wenn
 * jemand vorher zufällig einen Vorschau-Server auf genau diesem Port gestartet
 * hat. Am Tag des Baus war das so; am Tag danach nicht mehr.
 *
 * Das war an einem Tag der dritte Fund derselben Art — `qa.mjs` zeigte auf
 * 5178, `qa-bau.mjs` gab es noch gar nicht. Eine Prüfung, die von einem von
 * Hand gestarteten Server abhängt, prüft irgendwann nichts mehr und sagt es
 * nicht.
 */
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';

/**
 * Der Vorschau-Server direkt aus `node_modules`, nicht über `npx`.
 *
 * `npx` löst den Namen bei jedem Aufruf neu auf und braucht dafür je nach
 * Zustand des Zwischenspeichers mehrere Sekunden. Genau daran ist der erste
 * Lauf dieser Prüfung am 30.08.2026 gescheitert: der Server war noch nicht
 * oben, als das Wartefenster ablief, und die Prüfung meldete einen Fehler, den
 * es nicht gab. Eine Prüfung, die gelegentlich grundlos scheitert, wird
 * abgeschaltet — und dann prüft wieder niemand.
 */
const VITE = fileURLToPath(new URL('../node_modules/.bin/vite', import.meta.url));
import { readFileSync } from 'node:fs';

const PORT = 4319;
const EIGENER_SERVER = process.argv[2] === undefined && process.env.QA_BASIS === undefined;
const BASIS = process.argv[2] ?? process.env.QA_BASIS ?? `http://localhost:${PORT}`;

/** Der selbst gestartete Vorschau-Server, falls es einen gibt. */
let server = null;

if (EIGENER_SERVER) {
  const { spawn } = await import('node:child_process');
  await new Promise((fertig, scheitern) => {
    const bau = spawn('npm', ['run', 'build'], { stdio: 'ignore' });
    bau.on('exit', (c) => (c === 0 ? fertig() : scheitern(new Error(`build endete mit ${c}`))));
    bau.on('error', scheitern);
  });
  server = spawn(VITE, ['preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
  });

  let bereit = false;
  for (let i = 0; i < 120 && !bereit; i++) {
    try {
      bereit = (await fetch(`${BASIS}/impressum.html`)).ok;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  if (!bereit) {
    server.kill();
    console.error(`FEHLER: der Vorschau-Server auf ${PORT} kam nicht hoch.`);
    process.exit(1);
  }
}
const konfig = readFileSync(new URL('../src/praxis.config.ts', import.meta.url), 'utf8');

/* Alle in der Konfig gesetzten Werte — gegen sie wird geprueft, ob ein
   vorhandener Wert faelschlich als ausstehend markiert ist. */
const WERTE = [...konfig.matchAll(/(?:demo\(|:\s*)'([^']{6,})'/g)]
  .map((m) => m[1])
  .filter((w) => !w.startsWith('/') && !w.startsWith('http') && !w.includes('{'));

const browser = await chromium.launch({ channel: 'chrome' });
const seite = await browser.newPage();
const befunde = [];

for (const [datei, name] of [
  ['impressum.html', 'Impressum'],
  ['datenschutz.html', 'Datenschutzerklärung'],
]) {
  await seite.goto(`${BASIS}/${datei}`, { waitUntil: 'networkidle' });
  await seite.waitForTimeout(300);

  const r = await seite.evaluate(() => {
    /*
     * ═══ Warum hier die GEOMETRIE gemessen wird und nicht innerText ═══
     *
     * Die erste Fassung dieser Pruefung suchte „Noch einzutragen:" in
     * `document.body.innerText` — und meldete sofort einen Fehler, den es nicht
     * gab. `innerText` enthaelt auch Text, der nur optisch versteckt ist: die
     * Klasse `.nur-vorlesen` arbeitet mit 1x1 Pixel und `clip`, genau wie es
     * sein soll, und landet trotzdem in `innerText`.
     *
     * Eine Pruefung, die korrekt versteckten Vorlesetext als Fehler meldet,
     * treibt jemanden dazu, ihn zu entfernen — und macht die Seite damit
     * schlechter zugaenglich, statt besser. Gemessen wird deshalb, ob das
     * Element, das den Hinweis traegt, wirklich Flaeche einnimmt.
     */
    const sichtbarerHinweis = [...document.querySelectorAll('.offen span')].some((el) => {
      if (!el.textContent.includes('Noch einzutragen')) return false;
      const k = el.getBoundingClientRect();
      return k.width > 1 || k.height > 1;
    });
    const nurSichtbar = (el) => {
      const t = [];
      el.childNodes.forEach((n) => {
        if (n.nodeType === 3) t.push(n.textContent);
        else if (n.nodeType === 1) {
          const k = n.getBoundingClientRect();
          if (k.width > 1 || k.height > 1) t.push(nurSichtbar(n));
        }
      });
      return t.join('');
    };
    return {
      text: nurSichtbar(document.body),
      sichtbarerHinweis,
      offen: [...document.querySelectorAll('.offen')].map((e) => nurSichtbar(e).trim()),
      h1: document.querySelectorAll('h1').length,
    };
  });

  /* 1 — der Vorlesehinweis darf NIE Flaeche einnehmen */
  if (r.sichtbarerHinweis) {
    befunde.push(
      `${name}: „Noch einzutragen:" nimmt Fläche ein und ist damit sichtbar. Die Klasse für den Vorlesehinweis greift nicht.`,
    );
  }

  /* 2 — Entwicklernotation gehoert nicht auf eine Pflichtseite */
  const klammern = r.text.match(/\[[^\]]{4,}\]/g);
  if (klammern) befunde.push(`${name}: eckige Klammern als Platzhalter sichtbar — ${klammern.join(', ')}`);

  /* 3 — ein VORHANDENER Wert darf nicht als ausstehend markiert sein */
  for (const feld of r.offen) {
    const treffer = WERTE.find((w) => feld.includes(w));
    if (treffer) {
      befunde.push(`${name}: „${treffer}" ist eingetragen, wird aber als ausstehend markiert.`);
    }
  }

  /* 4 — die Erklaerung darf nichts beschreiben, was die Seite nicht tut */
  if (name.startsWith('Datenschutz')) {
    const behauptet = [
      [/Karte[^.]{0,80}(eingebunden|eingebettet)/i, 'eine eingebundene Karte'],
      [/Google Analytics|Matomo|Google Fonts/i, 'einen Drittanbieterdienst'],
      [/Cookie[^s]/i, 'Cookies'],
    ];
    for (const [muster, was] of behauptet) {
      if (!muster.test(r.text)) continue;
      befunde.push(`${name}: beschreibt ${was} — bitte gegen den Quelltext prüfen, ob es das gibt.`);
    }
  }

  if (r.h1 !== 1) befunde.push(`${name}: ${r.h1} h1-Überschriften statt genau einer.`);

  console.log(`  ${name}: ${r.offen.length} ausstehende Angabe(n)`);
  r.offen.forEach((x) => console.log(`     · ${x.slice(0, 74)}`));
}

await browser.close();
/* Den selbst gestarteten Server wieder abräumen — sonst bleibt er nach jedem
   Lauf auf 4319 stehen und der nächste scheitert an `--strictPort`. */
if (server) server.kill();

if (befunde.length) {
  console.error('\n  BEFUNDE AUF DEN PFLICHTSEITEN\n');
  befunde.forEach((b) => console.error(`  ✗ ${b}`));
  console.error('');
  process.exit(1);
}
console.log('\n  ✓ Pflichtseiten ohne Befund.\n');
