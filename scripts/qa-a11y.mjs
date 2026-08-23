/**
 * Was man auf einem Bild nicht sieht: Tastaturweg, Fokus-Sichtbarkeit,
 * Kontraste — letztere aus den tatsächlich gerenderten Farben, nicht aus den
 * Tokens, damit Glas über Bild mitgemessen wird.
 *
 * Lauf:  node scripts/qa-a11y.mjs [basisUrl]
 */
import { chromium } from 'playwright-core';

const BASIS = process.argv[2] ?? 'http://localhost:5178';

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await seite.goto(BASIS, { waitUntil: 'networkidle' });
await seite.waitForTimeout(800);

// ── Tastaturweg ────────────────────────────────────────────────────────────
const weg = [];
for (let i = 0; i < 45; i += 1) {
  await seite.keyboard.press('Tab');
  const eintrag = await seite.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const stil = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 46),
      fokusRing: stil.outlineStyle !== 'none' && parseFloat(stil.outlineWidth) > 0,
      outline: `${stil.outlineWidth} ${stil.outlineColor}`,
      sichtbar: rect.width > 0 && rect.height > 0,
    };
  });
  if (eintrag) weg.push(eintrag);
}

console.log('\nTASTATURWEG');
weg.forEach((e, i) => {
  const flaggen = [e.fokusRing ? '' : 'KEIN FOKUSRING', e.sichtbar ? '' : 'UNSICHTBAR'].filter(Boolean);
  console.log(`${String(i + 1).padStart(2)}. ${e.tag.padEnd(7)} ${e.text.padEnd(48)} ${flaggen.join(' ')}`);
});

// ── Kontrast ───────────────────────────────────────────────────────────────
// Textfarbe aus getComputedStyle, Hintergrund aus dem gerenderten Bild —
// so wird Glas über Foto mit dem gemessen, was wirklich dahinterliegt.
const messung = await seite.evaluate(() => {
  const kanal = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const leuchtdichte = ([r, g, b]) => 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
  // Chrome gibt oklch() unverändert zurück. Die Umrechnung nach sRGB
  // übernimmt der Canvas — der kennt jeden Farbraum, den der Browser kennt.
  const flaeche = document.createElement('canvas');
  flaeche.width = 1;
  flaeche.height = 1;
  const stift = flaeche.getContext('2d', { willReadFrequently: true });
  const zahlen = (farbe) => {
    stift.clearRect(0, 0, 1, 1);
    stift.fillStyle = '#000';
    stift.fillStyle = farbe;
    stift.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = stift.getImageData(0, 0, 1, 1).data;
    return { rgb: [r, g, b], alpha: a / 255 };
  };

  /*
   * Die Paarungen der Direktion vom 14.08.2026, jede an einem Element, das es
   * auf dieser Seite WIRKLICH gibt.
   *
   * Diese Liste stand nach dem Umbau vom 15.08.2026 noch auf den Klassennamen
   * der alten Fassung (`.hero__satz`, `.cta`, `.formular__einwilligung`). Das
   * Werkzeug meldete zehnmal „Element nicht gefunden" und darunter „keine
   * Verstöße" — ein Prüfer, der nichts findet, sieht aus wie ein Prüfer, der
   * nichts zu beanstanden hat. Wer hier eine Klasse umbenennt, benennt sie hier
   * mit um.
   */
  /*
   * Der dritte Eintrag jeder Zeile sagt, ob die Probe auf DIESER Seite stehen
   * MUSS. Fehlt eine Pflichtprobe, ist das ein Fehler und kein Hinweis — siehe
   * die Auswertung unten.
   *
   * `.luecke` ist die einzige bedingte: solange DEMO an ist, sind die Werte der
   * Startseite gefuellt und es gibt dort keine Luecke. Mit DEMO = false kommt
   * sie zurueck.
   */
  const proben = [
    ['Fließtext auf Papier', '.hero__einleitung p', true],
    ['Sekundärtext auf Papier', '.termin__wann', true],
    ['Satz in einer Leistungskachel', '.kachel__satz', true],
    ['Verweis in einer Leistungskachel', '.kachel__weiter', true],
    ['Signal als Text (Verweis)', '.werbin__mehr', true],
    ['Etikett über einer Sektion', '.t-label', true],
    ['Fließtext auf Leinen', '.besuch__warum', true],
    ['Sichtbare Lücke auf Leinen', '.luecke', false],
    ['Meta in der Fußzeile', '.fuss__ort', true],
    ['Navigation inaktiv', '.kopf__punkt', true],
    ['Weiß auf Signal (Knopf)', '.knopf', true],
  ];

  return proben
    .map(([name, wahl, pflicht]) => {
      const el = document.querySelector(wahl);
      if (!el) return { name, pflicht, fehlt: true };
      const vorn = zahlen(getComputedStyle(el).color).rgb;
      // Hintergrund vom nächsten Vorfahren mit weitgehend deckender Fläche.
      let knoten = el;
      let hinten = null;
      while (knoten) {
        const flaeche = zahlen(getComputedStyle(knoten).backgroundColor);
        if (flaeche.alpha > 0.85) {
          hinten = flaeche.rgb;
          break;
        }
        knoten = knoten.parentElement;
      }
      if (!hinten) return { name, pflicht, fehlt: true };
      const a = leuchtdichte(vorn);
      const b = leuchtdichte(hinten);
      const verhaeltnis = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const groesse = parseFloat(getComputedStyle(el).fontSize);
      const gewicht = Number(getComputedStyle(el).fontWeight) || 400;
      const gross = groesse >= 24 || (groesse >= 18.66 && gewicht >= 700);
      return {
        name,
        verhaeltnis: +verhaeltnis.toFixed(2),
        schwelle: gross ? 3 : 4.5,
        bestanden: verhaeltnis >= (gross ? 3 : 4.5),
      };
    })
    .filter(Boolean);
});

/*
 * ═══ Warum ein fehlendes Element ein FEHLER ist ═══
 *
 * Im Kopf dieser Datei steht die Warnung seit dem 15.08.2026: „Ein Pruefer, der
 * nichts findet, sieht aus wie ein Pruefer, der nichts zu beanstanden hat." Sie
 * war richtig und hat trotzdem nicht gereicht — am 23.08.2026 meldete das
 * Werkzeug drei fehlende Elemente und lief mit Erfolg durch, weil beim Umbau
 * auf die Leistungskacheln `.auszug__satz` und `.termin__zeile` verschwanden.
 *
 * Ein Hinweis, den man uebersehen kann, ist keine Pruefung. Eine fehlende
 * Pflichtprobe beendet den Lauf deshalb jetzt mit einem Fehler.
 */
console.log('\nKONTRAST (WCAG AA)');
let verstoesse = 0;
for (const m of messung) {
  if (m.fehlt) {
    if (m.pflicht) {
      verstoesse++;
      console.log(`  NEIN ${m.name} — Element nicht gefunden. Klasse umbenannt? Dann hier mit umbenennen.`);
    } else {
      console.log(`  –    ${m.name} — kommt auf dieser Seite derzeit nicht vor (erlaubt)`);
    }
    continue;
  }
  if (!m.bestanden) verstoesse++;
  console.log(`  ${m.bestanden ? 'ok ' : 'NEIN'} ${m.name}: ${m.verhaeltnis}:1 (nötig ${m.schwelle}:1)`);
}

// ── Glas über Bewegtbild ───────────────────────────────────────────────────
// Der einzige Ort, an dem Text auf Glas über einem Foto steht. Der Hintergrund
// lässt sich nicht aus CSS ableiten — also wird das Videobild abgetastet und
// die Glasschicht darübergerechnet.
const ueberBild = await seite.evaluate(() => {
  const video = document.querySelector('.hero__medium');
  const panel = document.querySelector('.hero__zeiten');
  const text = document.querySelector('.hero__zeiten-zeit');
  if (!video || !panel || !text) return null;

  const flaeche = document.createElement('canvas');
  const stift = flaeche.getContext('2d', { willReadFrequently: true });
  const alsRGB = (farbe) => {
    flaeche.width = 1;
    flaeche.height = 1;
    stift.fillStyle = farbe;
    stift.fillRect(0, 0, 1, 1);
    return [...stift.getImageData(0, 0, 1, 1).data].slice(0, 3);
  };

  const vorn = alsRGB(getComputedStyle(text).color);
  const glas = alsRGB(getComputedStyle(panel).backgroundColor);
  const glasAnteil = Number(
    getComputedStyle(panel)
      .backgroundColor.match(/[\d.]+\)$/)?.[0]
      ?.slice(0, -1) ?? 1,
  );

  // Videobild in Panelgröße abtasten.
  const vRect = video.getBoundingClientRect();
  const pRect = panel.getBoundingClientRect();
  flaeche.width = 32;
  flaeche.height = 16;
  const skalaX = (video.videoWidth || 1) / vRect.width;
  const skalaY = (video.videoHeight || 1) / vRect.height;
  stift.drawImage(
    video,
    (pRect.left - vRect.left) * skalaX,
    (pRect.top - vRect.top) * skalaY,
    pRect.width * skalaX,
    pRect.height * skalaY,
    0,
    0,
    32,
    16,
  );
  const punkte = stift.getImageData(0, 0, 32, 16).data;
  const mittel = [0, 1, 2].map((k) => {
    let summe = 0;
    for (let i = k; i < punkte.length; i += 4) summe += punkte[i];
    return summe / (punkte.length / 4);
  });

  const hinten = mittel.map((c, i) => glas[i] * glasAnteil + c * (1 - glasAnteil));
  const kanal = (c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  const L = ([r, g, b]) => 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
  const a = L(vorn);
  const b = L(hinten);
  return {
    verhaeltnis: +((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2),
    hintergrund: hinten.map(Math.round),
  };
});

if (ueberBild) {
  const ok = ueberBild.verhaeltnis >= 4.5;
  console.log(
    `  ${ok ? 'ok ' : 'NEIN'} Glaspanel über dem Hero-Video: ${ueberBild.verhaeltnis}:1 ` +
      `(Grund rgb(${ueberBild.hintergrund.join(', ')}))`,
  );
}

await browser.close();

if (verstoesse > 0) {
  console.error(`\n  ${verstoesse} Befund(e) im Kontrast. Kein Durchlauf.\n`);
  process.exit(1);
}
