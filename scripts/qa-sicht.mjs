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
const SEITEN = process.argv[2] ? process.argv[2].split(',') : ['', 'praxis/', 'kontakt/', 'termin/', 'leistungen/', 'team/'];

const browser = await chromium.launch({ channel: 'chrome' });
const befund = [];

for (const b of BREITEN) {
  const ctx = await browser.newContext({ viewport: { width: b.width, height: b.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const s of SEITEN) {
    const name = s === '' ? 'start' : s.replace(/\//g, '');
    await page.goto(`${BASIS}/${s}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

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
    await page.waitForTimeout(700);

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const ueberlauf = de.scrollWidth - window.innerWidth;
      const budget = +(de.scrollHeight / window.innerHeight).toFixed(2);
      // Tippziele unter 44px
      const klein = [...document.querySelectorAll('a[href], button, input, select')]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ el, r }) => r.width > 0 && r.height > 0 && r.height < 44 && getComputedStyle(el).display !== 'none')
        .map(({ el, r }) => `${el.tagName}.${(el.className || '').toString().slice(0, 28)} "${(el.textContent || '').trim().slice(0, 26)}" ${Math.round(r.height)}px`);
      // Notruf-Ziele
      const notruf = [...document.querySelectorAll('a[href^="tel:11"], a[href^="tel:112"]')]
        .map((a) => `${a.getAttribute('href')} ${Math.round(a.getBoundingClientRect().height)}px`);
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
