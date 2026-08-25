/**
 * Bereitet die selbst gehosteten Schriften vor: aus node_modules nach public/fonts/.
 *
 * Fraunces kommt als variable Schrift mit vier Achsen (opsz, wght, SOFT, WONK).
 * Gebraucht werden drei davon; WONK wird auf 0 fixiert und die Zeichenmenge auf
 * das reduziert, was deutscher Fließtext plus die Zeichen dieser Seite brauchen.
 * Das halbiert die Datei, ohne dass eine Achse verloren geht.
 *
 * Instrument Sans wird unverändert kopiert — drei statische Schnitte, je ~17 kB.
 *
 * Lauf: npm run fonts   (einmalig; die Ergebnisse liegen im Repo)
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import subsetFont from 'subset-font';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'fonts');

/** Alles, was auf dieser Seite vorkommen kann: ASCII, Umlaute, deutsche Interpunktion. */
const CHARSET = [
  ' !"#$%&\'()*+,-./0123456789:;<=>?@',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`',
  'abcdefghijklmnopqrstuvwxyz{|}~',
  'ÄÖÜäöüß',
  'ÀÁÂÃÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕØÙÚÛÝàáâãåæçèéêëìíîïñòóôõøùúûýÿ',
  '€§°±×÷–—‑…‚„“”‘’«»‹›•·†‡‰′″',
  '←→↑↓✓',
].join('');

const JOBS = [
  {
    /*
     * Montserrat, variabel (Gewicht 100–900) — die EINE Schrift dieser Seite.
     *
     * ═══ Was sie ersetzt ═══
     *
     * Fraunces (Display) und Instrument Sans in drei statischen Schnitten.
     * Karol am 25.08.2026: „schriftart montserrat light. auch bei ueberschriften."
     *
     * Eine variable Datei statt vier statischen: die Seite braucht 300 fuer
     * Ueberschriften, 400 fuer Fliesstext und 500/600 fuer Etiketten — das sind
     * mit Fraunces und drei Schnitten Instrument Sans vier Dateien und rund
     * 133 kB gewesen. Hier ist es eine.
     */
    from: '@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2',
    to: 'montserrat-var-latin.woff2',
    variationAxes: { wght: { min: 300, max: 600 } },
  },
];

await mkdir(OUT, { recursive: true });

for (const job of JOBS) {
  const source = await readFile(join(ROOT, 'node_modules', job.from));
  const result = await subsetFont(source, CHARSET, {
    targetFormat: 'woff2',
    ...(job.variationAxes ? { variationAxes: job.variationAxes } : {}),
  });
  await writeFile(join(OUT, job.to), result);
  const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
  console.log(`${job.to.padEnd(28)} ${kb(source.length)} → ${kb(result.length)}`);
}
