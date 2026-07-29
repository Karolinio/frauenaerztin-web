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
    from: '@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2',
    to: 'fraunces-var-latin.woff2',
    // WONK festnageln (nicht gebraucht), die drei genutzten Achsen im Bereich lassen.
    variationAxes: {
      WONK: 0,
      opsz: { min: 9, max: 144 },
      wght: { min: 300, max: 700 },
      SOFT: { min: 0, max: 100 },
    },
  },
  {
    from: '@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff2',
    to: 'instrument-sans-400.woff2',
  },
  {
    from: '@fontsource/instrument-sans/files/instrument-sans-latin-500-normal.woff2',
    to: 'instrument-sans-500.woff2',
  },
  {
    from: '@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff2',
    to: 'instrument-sans-600.woff2',
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
