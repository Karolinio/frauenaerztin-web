import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASIS = 'http://localhost:4319';
const AUS = '/private/tmp/claude-501/-Users-karolgenczyk/f7089004-7e8d-4deb-bdb6-767f8a40fa75/scratchpad/qa';
mkdirSync(AUS, { recursive: true });

const BREITEN = [
  { name: '1440', width: 1440, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '393', width: 393, height: 852 },
];
/* Alle sieben Adressen aus src/seiten.ts, nicht sechs.
   `aktuelles/` fehlte hier seit dem ersten Bau und wurde deshalb nie gemessen —
   ausgerechnet die Seite, die die Aerztin selbst pflegt und die sich damit als
   einzige ohne unser Zutun aendert. Eine ungemessene Seite ist eine Seite, von
   der niemand merkt, wann sie kaputtgeht. */
const SEITEN = process.argv[2]
  ? process.argv[2].split(',')
  : ['', 'leistungen/', 'team/', 'praxis/', 'aktuelles/', 'termin/', 'kontakt/'];

const browser = await chromium.launch({ channel: 'chrome' });
const befund = [];

for (const b of BREITEN) {
  const ctx = await browser.newContext({
    viewport: { width: b.width, height: b.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  for (const s of SEITEN) {
    const name = s === '' ? 'start' : s.replace(/\//g, '');
    await page.goto(`${BASIS}/${s}`, { waitUntil: 'networkidle' });

    /* Erst warten, bis React ueberhaupt gerendert hat.
       Ohne das lief die Schleife unten gegen ein leeres #root: die Seite war
       noch kurz, das Durchscrollen bewegte nichts, und danach erschien der
       Inhalt unterhalb des Bildes — mit Beobachtern, die nie ausgeloest hatten.
       Der Screenshot zeigte dann leere Baender und sah aus wie ein Fehler auf
       der Seite. Gemessen am 18.08.2026: genau so passiert, nachdem die Seite
       durch echte Inhalte laenger geworden war. */
    await page.waitForSelector('.auf', { state: 'attached', timeout: 15000 });
    await page.waitForTimeout(300);

    /* Erst einmal durchscrollen, sonst haben die IntersectionObserver nie
       ausgeloest und der Vollbild-Screenshot zeigt lauter unsichtbaren Inhalt.
       Genau so haette man einen leeren Abschnitt fuer Absicht halten koennen. */
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += window.innerHeight * 0.7) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    /* Und jetzt warten, bis WIRKLICH jeder Reveal durch ist. Eine feste
       Wartezeit ist hier eine Wette auf die Rechnergeschwindigkeit; die Klasse
       `auf--da` ist die Tatsache. */
    /* Zweiter Durchgang: jedes Element, das noch zu ist, wird EINZELN angefahren.
       Der Sweep oben springt in 0,7-Bildschirmschritten; ein Beobachter, der
       zwischen zwei Sprüngen liegt, sieht sein Element nie im Bild. Ein Mensch
       scrollt langsamer und hat das Problem nicht — das Prüfskript schon. */
    await page.evaluate(async () => {
      for (const el of document.querySelectorAll('.auf:not(.auf--da)')) {
        el.scrollIntoView({ block: 'center' });
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    });

    await page
      .waitForFunction(
        () =>
          /* Nur sichtbare Elemente zaehlen. Ein Element, das an dieser Breite
             per `display:none` ausgeblendet ist, hat keine Box — ein
             IntersectionObserver kann es nie melden, und es MUSS auch nie
             auftauchen. Ohne diese Einschraenkung meldete das Skript genau
             solche Faelle als Fehler und beschuldigte damit die Seite. */
          [...document.querySelectorAll('.auf:not(.auf--da)')].every((el) => {
            const r = el.getBoundingClientRect();
            return r.width === 0 && r.height === 0;
          }),
        null,
        { timeout: 15000 },
      )
      .catch(() => {
        const offen = 'Reveals blieben zu — Screenshot zeigt evtl. leere Baender';
        befund.push({ breite: b.name, seite: name, warnung: offen });
      });
    await page.waitForTimeout(700);

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const ueberlauf = de.scrollWidth - window.innerWidth;
      const budget = +(de.scrollHeight / window.innerHeight).toFixed(2);
      // Tippziele unter 44px
      const klein = [...document.querySelectorAll('a[href], button, input, select')]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(
          ({ el, r }) =>
            r.width > 0 && r.height > 0 && r.height < 44 && getComputedStyle(el).display !== 'none',
        )
        .map(
          ({ el, r }) =>
            `${el.tagName}.${(el.className || '').toString().slice(0, 28)} "${(el.textContent || '').trim().slice(0, 26)}" ${Math.round(r.height)}px`,
        );
      // Notruf-Ziele
      const notruf = [...document.querySelectorAll('a[href^="tel:11"], a[href^="tel:112"]')].map(
        (a) => `${a.getAttribute('href')} ${Math.round(a.getBoundingClientRect().height)}px`,
      );
      const luecken = document.querySelectorAll('.luecke, .offen').length;
      return { ueberlauf, budget, klein, notruf, luecken };
    });
    befund.push({ breite: b.name, seite: name, ...m });

    await page.screenshot({ path: `${AUS}/${name}-${b.name}.png`, fullPage: true });
  }
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(befund, null, 1));
