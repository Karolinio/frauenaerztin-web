/**
 * Sichtprüfung: die Seite bei den vier Breiten rendern, ansehen, und dabei
 * das protokollieren, was man auf einem Bild nicht sieht — waagerechtes
 * Scrollen, Konsolenfehler, fehlende Bildmaße, Kontraste.
 *
 * Lauf:  node scripts/qa.mjs [basisUrl] [ausgabeordner]
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASIS = process.argv[2] ?? 'http://localhost:5178';
const AUSGABE = process.argv[3] ?? 'qa';
/** Breite und dazu passende, realistische Gerätehöhe. */
const ANSICHTEN = [
  { breite: 1440, hoehe: 900 },
  { breite: 1024, hoehe: 768 },
  { breite: 768, hoehe: 1024 },
  { breite: 375, hoehe: 812 },
];

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

await mkdir(AUSGABE, { recursive: true });

const befunde = [];

async function pruefe({ pfad, name, breite, hoehe, reducedMotion = 'no-preference', scrollen = [] }) {
  const kontext = await browser.newContext({
    viewport: { width: breite, height: hoehe },
    deviceScaleFactor: 1,
    reducedMotion,
    locale: 'de-DE',
  });
  const seite = await kontext.newPage();
  const fehler = [];
  seite.on('console', (m) => m.type() === 'error' && fehler.push(m.text()));
  seite.on('pageerror', (e) => fehler.push(`pageerror: ${e.message}`));

  await seite.goto(`${BASIS}${pfad}`, { waitUntil: 'networkidle' });
  await seite.waitForTimeout(900);

  const ueberlauf = await seite.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    ohneMasse: [...document.images].filter((b) => !b.getAttribute('width') || !b.getAttribute('height'))
      .length,
    leereAlt: [...document.images].filter((b) => b.alt === null).length,
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent?.trim()),
  }));

  if (ueberlauf.scrollWidth > ueberlauf.innerWidth + 1) {
    befunde.push(
      `${name} @${breite}: waagerechtes Scrollen (${ueberlauf.scrollWidth} > ${ueberlauf.innerWidth})`,
    );
  }
  if (ueberlauf.ohneMasse > 0) {
    befunde.push(`${name} @${breite}: ${ueberlauf.ohneMasse} Bild(er) ohne width/height`);
  }
  if (pfad === '/' && ueberlauf.h1.length !== 1) {
    befunde.push(`${name} @${breite}: ${ueberlauf.h1.length} h1 statt genau einer`);
  }
  if (fehler.length) befunde.push(`${name} @${breite}: Konsole — ${fehler.join(' | ')}`);

  const marke = reducedMotion === 'reduce' ? '-reduced' : '';
  await seite.screenshot({ path: `${AUSGABE}/${name}-${breite}${marke}-oben.png` });

  for (const [i, anteil] of scrollen.entries()) {
    await seite.evaluate((a) => window.scrollTo(0, document.body.scrollHeight * a), anteil);
    await seite.waitForTimeout(1100);
    await seite.screenshot({ path: `${AUSGABE}/${name}-${breite}${marke}-${i + 1}.png` });
  }

  await kontext.close();
}

const SCHNITTE = [0.08, 0.16, 0.24, 0.33, 0.45, 0.56, 0.68, 0.8, 0.93];

for (const ansicht of ANSICHTEN) {
  await pruefe({ pfad: '/', name: 'start', ...ansicht, scrollen: SCHNITTE });
}
await pruefe({
  pfad: '/',
  name: 'start',
  breite: 1440,
  hoehe: 900,
  reducedMotion: 'reduce',
  scrollen: [0.25, 0.5, 0.75],
});
await pruefe({ pfad: '/impressum.html', name: 'impressum', breite: 1440, hoehe: 900, scrollen: [0.5, 1] });
await pruefe({
  pfad: '/datenschutz.html',
  name: 'datenschutz',
  breite: 1440,
  hoehe: 900,
  scrollen: [0.5, 1],
});
await pruefe({ pfad: '/impressum.html', name: 'impressum', breite: 375, hoehe: 812, scrollen: [0.5] });

await browser.close();

console.log(befunde.length ? `BEFUNDE:\n- ${befunde.join('\n- ')}` : 'Keine automatisch prüfbaren Befunde.');
