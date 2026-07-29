/**
 * Die Zustände, die auf einem statischen Screenshot nicht vorkommen:
 * offenes Menü, aufgeklappte Leistung, Formular mit Fehlern, Karte vor
 * und nach dem Consent-Klick.
 *
 * Lauf:  node scripts/qa-interaktion.mjs [basisUrl] [ausgabeordner]
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASIS = process.argv[2] ?? 'http://localhost:5178';
const AUSGABE = process.argv[3] ?? 'qa-interaktion';
await mkdir(AUSGABE, { recursive: true });

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

const befunde = [];

// ── Menü auf schmalem Schirm ───────────────────────────────────────────────
{
  const seite = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await seite.goto(BASIS, { waitUntil: 'networkidle' });
  await seite.getByRole('button', { name: /Menü öffnen/ }).click();
  await seite.waitForTimeout(300);
  await seite.screenshot({ path: `${AUSGABE}/menue-offen.png` });

  const erweitert = await seite.getByRole('button', { name: /Menü/ }).getAttribute('aria-expanded');
  if (erweitert !== 'true') befunde.push('Menüschalter meldet aria-expanded nicht als true');

  await seite.keyboard.press('Escape');
  await seite.waitForTimeout(250);
  const zu = await seite.getByRole('button', { name: /Menü/ }).getAttribute('aria-expanded');
  if (zu !== 'false') befunde.push('Escape schließt das Menü nicht');
  await seite.close();
}

// ── Leistung aufklappen, Formular prüfen, Karte ────────────────────────────
{
  const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seite.goto(BASIS, { waitUntil: 'networkidle' });

  const kachel = seite.locator('.leistung__block').first();
  await kachel.locator('summary').click();
  await seite.waitForTimeout(400);
  if (!(await kachel.evaluate((el) => el.hasAttribute('open')))) {
    befunde.push('Leistungskachel klappt nicht auf');
  }
  await kachel.scrollIntoViewIfNeeded();
  await seite.waitForTimeout(300);
  await seite.screenshot({ path: `${AUSGABE}/leistung-offen.png` });

  // Formular leer absenden: drei Fehlermeldungen, kein Absprung.
  await seite.locator('#termin').scrollIntoViewIfNeeded();
  await seite.waitForTimeout(500);
  await seite.getByRole('button', { name: /Rückruf anfordern/ }).click();
  await seite.waitForTimeout(300);
  const fehler = await seite.locator('.formular__fehler').count();
  if (fehler !== 3) befunde.push(`Leeres Formular meldet ${fehler} Fehler statt 3`);
  await seite.screenshot({ path: `${AUSGABE}/formular-fehler.png` });

  // Ausgefüllt: ohne Endpunkt muss der Hinweis aufs Telefon kommen.
  await seite.locator('input[name="name"]').fill('Testeingabe');
  await seite.locator('input[name="telefon"]').fill('030 1234567');
  await seite.locator('input[name="einwilligung"]').check();
  await seite.getByRole('button', { name: /Rückruf anfordern/ }).click();
  await seite.waitForTimeout(500);
  const meldung = await seite.locator('.formular__meldung').textContent();
  if (!meldung?.includes('nicht angeschlossen')) {
    befunde.push(`Formular ohne Endpunkt meldet: ${meldung ?? '(nichts)'}`);
  }
  await seite.screenshot({ path: `${AUSGABE}/formular-ohne-endpunkt.png` });

  // Karte: ohne Koordinaten darf kein iframe entstehen.
  const rahmen = await seite.locator('.karte iframe').count();
  if (rahmen !== 0) befunde.push('Karte lädt ohne Consent bzw. ohne Koordinaten einen iframe');

  await seite.close();
}

// ── Reduzierte Bewegung: kein Canvas, kein Pin, kein Video ─────────────────
{
  const seite = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await seite.goto(BASIS, { waitUntil: 'networkidle' });
  await seite.waitForTimeout(600);
  const zustand = await seite.evaluate(() => ({
    canvas: document.querySelectorAll('.besuch__canvas canvas').length,
    pin: document.querySelectorAll('.besuch__pin').length,
    video: document.querySelectorAll('video').length,
    liste: document.querySelectorAll('.besuch__liste li').length,
  }));
  if (zustand.canvas > 0) befunde.push('Bei reduzierter Bewegung wird trotzdem ein Canvas gebaut');
  if (zustand.pin > 0) befunde.push('Bei reduzierter Bewegung wird trotzdem gepinnt');
  if (zustand.video > 0) befunde.push('Bei reduzierter Bewegung wird trotzdem ein Video geladen');
  if (zustand.liste !== 5) befunde.push(`Liste hat ${zustand.liste} Stationen statt 5`);
  await seite.close();
}

await browser.close();
console.log(befunde.length ? `BEFUNDE:\n- ${befunde.join('\n- ')}` : 'Alle Zustände wie erwartet.');
