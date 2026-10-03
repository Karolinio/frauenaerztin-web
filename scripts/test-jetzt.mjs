/**
 * Tests für den Sprechzeit-Satz im Hero (src/lib/jetzt.ts), gegen ihre echte
 * Tabelle in inhalt/zeiten.json.
 *
 * Lauf:  node scripts/test-jetzt.mjs   (Node ≥ 23 lädt .ts ohne Bündler)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sprechzeitJetzt, augenblickInBerlin } from '../src/lib/jetzt.ts';

const zeiten = JSON.parse(readFileSync(new URL('../inhalt/zeiten.json', import.meta.url), 'utf8'));
const NACH = '2026-11-10';
const um = (wochentag, hhmm, datum = NACH) => {
  const [h, m] = hhmm.split(':').map(Number);
  return { wochentag, minuten: h * 60 + m, datum };
};
const lage = (a, eroeffnung = '2026-11-01') => sprechzeitJetzt(zeiten, a, eroeffnung, '1. November');

test('vor der Eröffnung steht die Eröffnung, nicht „geöffnet"', () => {
  assert.deepEqual(lage(um(5, '09:00', '2026-10-02')), { wort: 'Eröffnung', satz: 'am 1. November', offen: false });
});

test('am Eröffnungstag selbst gilt schon die Tabelle', () => {
  assert.equal(lage(um(0, '10:00', '2026-11-01')).wort, 'Heute geschlossen');
});

test('Dienstag 9:00 — geöffnet bis 13:00', () => {
  assert.deepEqual(lage(um(2, '09:00')), { wort: 'Jetzt geöffnet', satz: 'bis 13:00 Uhr', offen: true });
});

test('Dienstag 13:30 — Mittagspause bis 14:00', () => {
  assert.deepEqual(lage(um(2, '13:30')), { wort: 'Mittagspause', satz: 'wieder ab 14:00 Uhr', offen: false });
});

test('Dienstag 7:00 — heute ab 08:00', () => {
  assert.deepEqual(lage(um(2, '07:00')), { wort: 'Heute', satz: 'ab 08:00 Uhr geöffnet', offen: false });
});

test('Dienstag 18:00 genau — geschlossen, öffnet morgen 07:30', () => {
  assert.deepEqual(lage(um(2, '18:00')), { wort: 'Geschlossen', satz: 'öffnet morgen um 07:30 Uhr', offen: false });
});

test('Freitag nachmittags — Montag ist unbekannt, also keine Behauptung', () => {
  assert.deepEqual(lage(um(5, '15:00')), { wort: 'Geschlossen', satz: '', offen: false });
});

test('Samstag — heute geschlossen, ohne erfundenen nächsten Tag', () => {
  assert.deepEqual(lage(um(6, '10:00')), { wort: 'Heute geschlossen', satz: '', offen: false });
});

test('Montag ohne Zeiten — keine Aussage statt „geschlossen"', () => {
  assert.deepEqual(lage(um(1, '10:00')), { wort: 'Heute', satz: '', offen: false });
});

test('ohne Eröffnungstag gilt sofort die Tabelle', () => {
  assert.equal(lage(um(2, '09:00', '2026-10-02'), null).wort, 'Jetzt geöffnet');
});

test('Berliner Zeit: 07:30 UTC im Sommer ist 09:30 in Erkelenz', () => {
  const a = augenblickInBerlin(new Date('2026-07-07T07:30:00Z'));
  assert.deepEqual(a, { wochentag: 2, minuten: 9 * 60 + 30, datum: '2026-07-07' });
});

test('Berliner Zeit: 23:30 UTC am 31.10. ist schon der 1.11. in Erkelenz', () => {
  assert.equal(augenblickInBerlin(new Date('2026-10-31T23:30:00Z')).datum, '2026-11-01');
});
