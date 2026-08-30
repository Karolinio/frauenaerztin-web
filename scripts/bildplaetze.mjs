/**
 * Die Aufnahmeliste — was fotografiert werden muss, und in welchem Format.
 *
 * Lauf:  npm run bilder
 *
 * ═══ Warum es dieses Skript gibt ═══
 *
 * Weil Yvonne im Oktober fotografieren lässt und dabei wissen muss, welche
 * Bilder die Seite braucht. Diese Liste steht in `src/lib/bildplaetze.ts` — in
 * einer TypeScript-Datei, die sie nicht öffnet und nicht öffnen soll.
 *
 * Hier wird sie ausgelesen und als Text ausgegeben, den man in eine Mail
 * kopieren kann. Der Punkt ist nicht die Bequemlichkeit, sondern dass es keine
 * ZWEITE Liste gibt: eine abgetippte Aufnahmeliste in einem Dokument driftet
 * von den Plätzen im Code weg, und dann fotografiert sie gegen Masse, die die
 * Seite nicht mehr hat.
 *
 * ═══ Warum die Datei hier geparst und nicht importiert wird ═══
 *
 * Weil `bildplaetze.ts` `praxis.config.ts` importiert und das eine TypeScript-
 * Datei ist, die Node nicht ohne Übersetzer lädt. Ein Bauschritt für eine
 * Textausgabe wäre mehr Maschinerie als die Sache wert ist.
 *
 * Der Preis ist, dass dieses Skript die Form der Datei kennt. Es ist deshalb so
 * gebaut, dass es bei einer Formänderung LAUT scheitert: findet es keine Plätze,
 * bricht es mit Fehler ab, statt eine leere Liste auszugeben. Eine leere
 * Aufnahmeliste sähe aus wie „nichts zu tun".
 */
import { readFileSync } from 'node:fs';

const QUELLE = new URL('../src/lib/bildplaetze.ts', import.meta.url);
const text = readFileSync(QUELLE, 'utf8');

/** Ein Feld aus einem Platz-Literal lesen. */
const feld = (block, name) => {
  const treffer = block.match(new RegExp(`\\n\\s*${name}:\\s*(?:\\n\\s*)?'((?:[^'\\\\]|\\\\.)*)'`));
  return treffer ? treffer[1].replace(/\\'/g, "'") : null;
};

const verhaeltnis = (block, name) => {
  const treffer = block.match(new RegExp(`${name}:\\s*\\[(\\d+),\\s*(\\d+)\\]`));
  return treffer ? `${treffer[1]}:${treffer[2]}` : null;
};

/**
 * Ob an einem Platz eine echte Datei steht.
 *
 * ═══ Warum nicht einfach auf `null` geprüft wird ═══
 *
 * Die erste Fassung tat genau das — `!/datei:\s*null/` — und meldete den
 * Hero-Platz als GEFÜLLT. Dort steht nämlich nicht `null`, sondern
 * `praxis.portraet?.src ?? null`: ein Ausdruck, der zur Laufzeit `null` ergibt,
 * aber das Wort nicht an der Stelle stehen hat, an der die Regel es suchte.
 *
 * Die Liste hätte Yvonne also gesagt, ihr eigenes Foto sei schon da.
 *
 * Umgekehrt geprüft ist es richtig: gefüllt ist ein Platz nur, wenn dort ein
 * Pfad in Anführungszeichen steht. Alles andere — `null`, ein Ausdruck, ein
 * Ausdruck mit Rückfall — gilt als offen. Der Fehler geht damit in die
 * ungefährliche Richtung: schlimmstenfalls steht ein Bild auf der Liste, das es
 * schon gibt.
 */
const istGefuellt = (block) => /\n\s*datei:\s*'\/[^']+'/.test(vorErsatz(block));

/**
 * Nur der Teil eines Platzes VOR seinem `ersatz`-Block.
 *
 * Zweiter Anlauf, zweiter Fehler derselben Art: die Regel oben traf danach ALLE
 * fünf Plätze, weil in jedem `ersatz` eine Datei in Anführungszeichen steht —
 * die Materialstudie. „Gefüllt" hätte dann geheissen: es gibt einen Platzhalter.
 *
 * Beide Fehlversionen gaben eine Liste aus, die plausibel aussah. Genau deshalb
 * steht am Ende dieser Datei eine Selbstprüfung: eine Aufnahmeliste, die
 * behauptet, es sei nichts mehr zu fotografieren, ist schlimmer als keine.
 */
const vorErsatz = (block) => {
  const schnitt = block.search(/\n\s*ersatz:/);
  return schnitt === -1 ? block : block.slice(0, schnitt);
};

/* Jeder Platz beginnt mit `kennung:` und endet vor dem nächsten oder am Dateiende. */
const bloecke = text.split(/\n\s*kennung:/).slice(1);
if (bloecke.length === 0) {
  console.error('FEHLER: keine Bildplätze in src/lib/bildplaetze.ts gefunden.');
  console.error('Vermutlich hat sich die Form der Datei geändert. Dieses Skript muss nachziehen —');
  console.error('eine leere Aufnahmeliste wäre schlimmer als gar keine.');
  process.exit(1);
}

const plaetze = bloecke.map((roh) => {
  const block = `\n  kennung:${roh}`;
  return {
    kennung: feld(block, 'kennung'),
    zweck: feld(block, 'zweck'),
    breit: verhaeltnis(block, 'verhaeltnis'),
    schmal: verhaeltnis(block, 'verhaeltnisSchmal'),
    gefuellt: istGefuellt(block),
  };
});

const offen = plaetze.filter((p) => !p.gefuellt);

console.log('');
console.log('AUFNAHMELISTE — Fotos für die Website');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

for (const p of plaetze) {
  const zeichen = p.gefuellt ? '✓' : '·';
  const format = p.schmal ? `${p.breit} quer (am Handy ${p.schmal})` : p.breit;
  console.log(`${zeichen} ${p.kennung}`);
  console.log(`  ${p.zweck}`);
  console.log(`  Format: ${format}`);
  console.log('');
}

console.log('────────────────────────────────────────────────────────────────');
console.log(`${plaetze.length - offen.length} von ${plaetze.length} Plätzen gefüllt.`);
console.log('');
console.log('Fotos vom Team stehen NICHT in dieser Liste — die pflegt sie selbst');
console.log('in der Redaktion (inhalt/team.json, Hochformat 4:5).');
console.log('');
console.log('Ein Format ist keine Vorschrift, sondern der Ausschnitt, den die Seite');
console.log('zeigt. Wer weiter aufnimmt, als gebraucht wird, kann nachher wählen —');
console.log('wer enger aufnimmt, kann es nicht.');
console.log('');

/**
 * Selbstprüfung.
 *
 * Solange `praxis.portraet` und die vier Praxis-Dateien auf `null` stehen, MUSS
 * diese Liste fünf offene Plätze zeigen. Tut sie das nicht, hat sich entweder
 * die Form der Datei geändert oder die Erkennung ist kaputt — und in beiden
 * Fällen liest jemand eine Liste, die ihm sagt, er sei fertig.
 *
 * Die Prüfung greift nur, wenn tatsächlich noch nichts geliefert ist. Sobald
 * echte Dateien eingetragen sind, ist ein gefüllter Platz die Wahrheit.
 */
if (offen.length === 0 && !/datei: '\/bilder\/(?!hero-1800|praxis-0)/.test(text)) {
  console.error('FEHLER: kein einziger Platz gilt als offen, obwohl keine Datei eingetragen ist.');
  console.error('Die Erkennung in `istGefuellt` passt nicht mehr zur Form von bildplaetze.ts.');
  process.exit(1);
}
