/**
 * Nur das Showpiece: den Grundriss an allen fünf Stationen ansehen und
 * dabei protokollieren, wo die Kamera steht. Schneller als der ganze Durchlauf.
 *
 * Lauf:  node scripts/qa-showpiece.mjs [basisUrl] [ausgabeordner]
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASIS = process.argv[2] ?? 'http://localhost:5178';
const AUSGABE = process.argv[3] ?? 'qa-showpiece';

await mkdir(AUSGABE, { recursive: true });

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await seite.goto(BASIS, { waitUntil: 'networkidle' });

// Bis zum Anfang der gepinnten Sektion scrollen.
const start = await seite.evaluate(() => {
  const pin = document.querySelector('.besuch__pin');
  return pin ? pin.getBoundingClientRect().top + window.scrollY : 0;
});

/**
 * Mit dem Mausrad scrollen, nicht per window.scrollTo: Lenis fährt das
 * Scrollen selbst und würde einen gesetzten Wert im nächsten Frame
 * zurückziehen. Über das Rad läuft die Kette so, wie sie auch echte
 * Besucherinnen auslösen.
 */
async function radBis(ziel) {
  for (let versuch = 0; versuch < 400; versuch += 1) {
    const jetzt = await seite.evaluate(() => window.scrollY);
    const rest = ziel - jetzt;
    if (Math.abs(rest) < 12) break;
    await seite.mouse.wheel(0, Math.max(-600, Math.min(600, rest)));
    await seite.waitForTimeout(40);
  }
  await seite.waitForTimeout(900);
}

for (let i = 0; i < 5; i += 1) {
  const anteil = (i + 0.5) / 5;
  await radBis(start + 900 * 4 * anteil);
  const stand = await seite.evaluate(() => {
    const g = window.__grundriss;
    if (!g) return null;
    const p = g.kamera.position;
    return {
      kamera: [+p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2)],
      abstandZumUrsprung: +p.length().toFixed(2),
      station: document.querySelector('.besuch__name')?.textContent,
    };
  });
  console.log(`Station ${i + 1}`, JSON.stringify(stand));
  await seite.screenshot({ path: `${AUSGABE}/station-${i + 1}.png` });
}

await browser.close();
console.log('fertig');
