/**
 * Die Freigabesperre — laeuft, bevor diese Seite ausgerollt wird.
 *
 * ═══ Wogegen sie schuetzt ═══
 *
 * Gegen genau einen Fehler: dass ein erfundener Wert live geht. Auf einer
 * Arztseite ist das kein Schoenheitsfehler. Eine erfundene Oeffnungszeit ist
 * eine Patientin vor verschlossener Tuer, eine erfundene Aerztekammer ein
 * Abmahngrund auf einer Pflichtseite, und ein erfundener Nachname steht dann
 * unter dem Impressum einer echten Person.
 *
 * Das Skript prueft NICHT, ob die Seite schoen ist. Es prueft nur, ob etwas
 * behauptet wird, das niemand bestaetigt hat.
 *
 * ═══ Warum es zwei Quellen prueft ═══
 *
 *   src/praxis.config.ts   trägt den Schalter DEMO. Er macht alle erfundenen
 *                          Werte in einem Handgriff wieder zu Luecken.
 *   inhalt/DEMO            markiert die Redaktionsdateien. Die pflegt spaeter
 *                          die Aerztin selbst, sie koennen deshalb nicht ueber
 *                          einen Schalter im Code haengen.
 *
 * Beide muessen weg, bevor ausgerollt wird. Ist DEMO schon aus, listet das
 * Skript stattdessen auf, welche Angaben dann noch fehlen — diese Liste ist die
 * Frageliste an die Aerztin und muss nirgends von Hand gepflegt werden.
 */

import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const KONFIG = join(WURZEL, 'src/praxis.config.ts');

const da = (pfad) =>
  access(pfad).then(
    () => true,
    () => false,
  );

const quelle = await readFile(KONFIG, 'utf8');
const demoAn = /^export const DEMO = true;/m.test(quelle);
const inhaltDemo = await da(join(WURZEL, 'inhalt/DEMO'));

const befunde = [];

if (demoAn) {
  /* Jeder `demo(...)`-Aufruf ist ein erfundener Wert. Gezaehlt wird die
     Deklaration, nicht der Hilfsfunktions-Rumpf — daher der Doppelpunkt davor. */
  const anzahl = (quelle.match(/:\s*demo\(/g) ?? []).length;
  befunde.push(
    `src/praxis.config.ts — DEMO ist an: ${anzahl} erfundene Angaben.\n` +
      `    Zum Loesen: DEMO = false setzen. Alle ${anzahl} werden dann wieder zu sichtbaren Luecken.`,
  );
}

if (inhaltDemo) {
  befunde.push(
    'inhalt/DEMO — Team, Aktuelles und Sprechzeiten sind erfunden.\n' +
      '    Zum Loesen: inhalt/*.json durch die echten Angaben ersetzen, dann inhalt/DEMO loeschen.',
  );
}

if (befunde.length > 0) {
  console.error('\n  KEINE FREIGABE — die Seite zeigt erfundene Angaben.\n');
  for (const b of befunde) console.error(`  ✗ ${b}\n`);
  process.exit(1);
}

/* DEMO ist aus. Jetzt ist die interessante Frage nicht mehr, was erfunden ist,
   sondern was fehlt — und das steht als `null as Offen<...>` in der Konfig. */
const luecken = [...quelle.matchAll(/^\s*(\w+):\s*null as Offen</gm)].map((m) => m[1]);

if (luecken.length > 0) {
  console.error('\n  KEINE FREIGABE — Pflichtangaben fehlen noch:\n');
  for (const l of luecken) console.error(`  ✗ ${l}`);
  console.error('\n  Diese Liste geht an die Aerztin. Ohne diese Angaben darf die Seite nicht live.\n');
  process.exit(1);
}

console.log('\n  ✓ Freigabe: keine erfundenen Angaben, keine offenen Pflichtfelder.\n');
