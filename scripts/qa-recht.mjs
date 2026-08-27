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
 *   node scripts/qa-recht.mjs        (Vorschau-Server auf 4319 muss laufen)
 */
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const BASIS = process.env.QA_BASIS ?? 'http://localhost:4319';
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

if (befunde.length) {
  console.error('\n  BEFUNDE AUF DEN PFLICHTSEITEN\n');
  befunde.forEach((b) => console.error(`  ✗ ${b}`));
  console.error('');
  process.exit(1);
}
console.log('\n  ✓ Pflichtseiten ohne Befund.\n');
