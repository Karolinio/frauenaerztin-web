/**
 * Der gebaute Stand, ausgeliefert unter dem ECHTEN Unterpfad, jede Seite
 * abgeklopft: fehlende Dateien, Fehler in der Konsole, waagerechtes Scrollen.
 *
 * Lauf:  npm run qa:bau        (baut selbst und startet den Server selbst)
 *
 * ═══ Warum es diese Prüfung gibt ═══
 *
 * Weil die Fehler, die sie findet, im Dev-Server GAR NICHT AUFTRETEN KÖNNEN.
 * Dort liegt die Seite an der Wurzel; unter GitHub Pages liegt sie in
 * `/frauenaerztin-web/`. Jeder absolute Pfad im HTML-Kopf zeigt dann an die
 * Wurzel der Domain, wo nichts liegt — und die Seite liefert trotzdem
 * Statuscode 200.
 *
 * Das ist hier zweimal passiert:
 *
 *   23.08.2026  `<link rel="preload" href="/bilder/hero.webp">` — neun HTML-
 *               Dateien, neunmal 404, dazu auf eine Datei, die es nicht mehr
 *               gab.
 *   30.08.2026  zwei `<link rel="preload">` auf `fraunces-var-latin` und
 *               `instrument-sans-400` — Schriften, die es seit der Umstellung
 *               auf Montserrat nicht mehr gibt. Neun Seiten, achtzehn 404, und
 *               die Schrift, die tatsächlich gebraucht wird, war gar nicht
 *               vorgeladen. Gefunden beim ersten Lauf dieser Prüfung.
 *
 * Beide Male stand die Falle vorher schon irgendwo beschrieben. Beschrieben,
 * nicht geprüft — und ein Hinweis, den man übersehen kann, ist keine Prüfung.
 *
 * ═══ Warum das Skript alles selbst startet ═══
 *
 * Weil eine Prüfung, die einen von Hand gestarteten Server braucht, irgendwann
 * gegen nichts läuft und „keine Befunde" meldet. Genau das ist `scripts/qa.mjs`
 * passiert: sein Vorgabewert zeigte auf einen Port, auf dem dieses Projekt nie
 * lief. Hier gibt es nichts vorzubereiten und damit nichts zu vergessen.
 */
import { spawn } from 'node:child_process';
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

/** Derselbe Unterpfad, unter dem die Seite bei GitHub Pages liegt. */
const BASIS_PFAD = '/frauenaerztin-web/';
const PORT = 4178;
const WURZEL = `http://localhost:${PORT}${BASIS_PFAD.replace(/\/$/, '')}`;

/** Jede erzeugte Adresse. Muss zu `src/seiten.ts` und den Rechtsseiten passen. */
const SEITEN = [
  '/',
  '/leistungen/',
  '/team/',
  '/praxis/',
  '/aktuelles/',
  '/termin/',
  '/kontakt/',
  '/impressum.html',
  '/datenschutz.html',
];

const lauf = (befehl, args, umgebung = {}) =>
  new Promise((fertig, scheitern) => {
    const kind = spawn(befehl, args, { env: { ...process.env, ...umgebung }, stdio: 'ignore' });
    kind.on('exit', (code) => (code === 0 ? fertig() : scheitern(new Error(`${befehl} endete mit ${code}`))));
    kind.on('error', scheitern);
  });

console.log('Baue mit dem echten Basispfad …');
await lauf('npm', ['run', 'build'], { VITE_BASIS: BASIS_PFAD });

console.log(`Starte den Vorschau-Server auf ${PORT} …`);
const server = spawn(VITE, ['preview', '--port', String(PORT), '--strictPort'], {
  env: { ...process.env, VITE_BASIS: BASIS_PFAD },
  stdio: 'ignore',
});

/* Warten, bis der Server antwortet — und aufgeben, statt ewig zu hängen. */
let bereit = false;
for (let versuch = 0; versuch < 120 && !bereit; versuch++) {
  try {
    const antwort = await fetch(`${WURZEL}/`);
    bereit = antwort.ok;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}
if (!bereit) {
  server.kill();
  console.error(`FEHLER: der Vorschau-Server auf ${PORT} kam nicht hoch.`);
  process.exit(1);
}

const befunde = [];
const browser = await chromium.launch({ channel: 'chrome' });

for (const pfad of SEITEN) {
  const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  seite.on('response', (r) => {
    if (r.status() >= 400) befunde.push(`${pfad}: ${r.status()} auf ${r.url()}`);
  });
  seite.on('console', (m) => {
    if (m.type() === 'error') befunde.push(`${pfad}: Konsole — ${m.text().slice(0, 160)}`);
  });
  seite.on('pageerror', (e) => befunde.push(`${pfad}: Skriptfehler — ${e.message.slice(0, 160)}`));

  await seite.goto(WURZEL + pfad, { waitUntil: 'networkidle' });

  /*
   * Menschlich scrollen, in kleinen Schritten und über echte Einzelbilder.
   *
   * Das ist keine Kosmetik. Bilder unterhalb der Falz laden erst beim
   * Herankommen, und Abschnitte, die beim Scrollen erscheinen, melden sich über
   * einen IntersectionObserver — der liefert an Frame-Grenzen. Wer springt,
   * schiebt beides durchs Bild, ohne dass je ein Einzelbild damit gerendert
   * wird, und prüft anschliessend eine Seite, die es so nie gab.
   */
  await seite.evaluate(async () => {
    const hoehe = document.body.scrollHeight;
    for (let y = 0; y < hoehe; y += 200) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
  });
  await seite.waitForTimeout(800);

  const breite = await seite.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    fenster: window.innerWidth,
  }));
  if (breite.doc > breite.fenster + 1) {
    befunde.push(`${pfad}: waagerechtes Scrollen (${breite.doc} > ${breite.fenster})`);
  }

  await seite.close();
}

await browser.close();
server.kill();

if (befunde.length === 0) {
  console.log(`\n${SEITEN.length} Seiten unter ${BASIS_PFAD} geprüft — keine fehlenden Dateien,`);
  console.log('keine Konsolenfehler, kein waagerechtes Scrollen.');
  process.exit(0);
}

console.error(`\nBEFUNDE (${befunde.length}):`);
for (const b of [...new Set(befunde)]) console.error(`- ${b}`);
/* Abbrechen, nicht bloss melden. Eine fehlende Datei unter dem echten Basispfad
   ist der Fehler, den man auf der ausgelieferten Seite nicht sieht — er darf
   deshalb nicht als Hinweis durchgehen, den jemand überliest. */
process.exit(1);
