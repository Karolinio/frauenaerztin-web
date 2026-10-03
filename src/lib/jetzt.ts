/**
 * Die Sprechzeit als Satz: „Jetzt geöffnet · bis 13:00 Uhr" statt „Heute 07:30 – 13:00".
 *
 * ═══ Warum ein Satz ═══
 *
 * „Heute 07:30 – 13:00 Uhr" beantwortet nicht, ob jetzt jemand da ist — um 14 Uhr
 * stand dort dieselbe Zeile wie um 9. Abgelesen an Monte (Mobbin): „Open today
 * til 1:30 pm", ruhig im Hero. Beschlossen am 03.10.2026.
 *
 * ═══ Warum der Eröffnungstag mitgedacht ist ═══
 *
 * Bis zum 1. November ist die Praxis nicht geöffnet, auch wenn die Tabelle für
 * Freitag 07:30 – 13:00 sagt. Ein „Jetzt geöffnet" im Oktober schickt eine
 * Patientin vor eine verschlossene Tür.
 *
 * ═══ Warum Berliner Zeit und nicht die Uhr des Geräts ═══
 *
 * Die Praxis öffnet nach Erkelenzer Uhr. Wer im Urlaub auf Mallorca nachsieht,
 * ob sie morgen um acht anrufen kann, braucht die Antwort für Erkelenz.
 *
 * Feiertage kennt diese Funktion nicht — dafür gibt es keine Daten. Eine
 * Schliessung steht als Meldung unter „Aktuelles".
 *
 * Diese Datei hat keine Importe, damit `scripts/test-jetzt.mjs` sie ohne
 * Bündler laden kann.
 */

export interface ZeitZeile {
  readonly tag: string;
  readonly vormittag: string;
  readonly nachmittag: string;
  readonly hinweis: string;
}

export interface Augenblick {
  /** 0 = Sonntag … 6 = Samstag, wie `Date.getDay()`. */
  readonly wochentag: number;
  /** Minuten seit Mitternacht. */
  readonly minuten: number;
  /** `YYYY-MM-DD`. */
  readonly datum: string;
}

export interface Lage {
  /** Klein und gesperrt davor, z. B. „Jetzt geöffnet". */
  readonly wort: string;
  /** Die Antwort, z. B. „bis 13:00 Uhr". Leer, wenn es keine gibt. */
  readonly satz: string;
  /** Nur dann steht der Salbeipunkt davor. */
  readonly offen: boolean;
}

const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'] as const;
const KURZ: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const SPANNE = /(\d{1,2}):(\d{2})\s*[–—-]\s*(\d{1,2}):(\d{2})/g;

/** Der Augenblick in Erkelenz, egal wo das Gerät steht. */
export function augenblickInBerlin(jetzt: Date = new Date()): Augenblick {
  const teile = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(jetzt);
  const wert = (typ: string) => teile.find((t) => t.type === typ)?.value ?? '';
  return {
    wochentag: KURZ[wert('weekday')] ?? jetzt.getDay(),
    minuten: Number(wert('hour')) * 60 + Number(wert('minute')),
    datum: `${wert('year')}-${wert('month')}-${wert('day')}`,
  };
}

/** Alle Zeitspannen eines Tages in Minuten, aufsteigend. */
function spannen(z: ZeitZeile): Array<readonly [number, number]> {
  const text = `${z.vormittag} ${z.nachmittag}`;
  return [...text.matchAll(SPANNE)]
    .map((m) => [Number(m[1]) * 60 + Number(m[2]), Number(m[3]) * 60 + Number(m[4])] as const)
    .sort((a, b) => a[0] - b[0]);
}

const uhr = (minuten: number): string =>
  `${String(Math.floor(minuten / 60)).padStart(2, '0')}:${String(minuten % 60).padStart(2, '0')}`;

const zeileFuer = (zeilen: readonly ZeitZeile[], wochentag: number): ZeitZeile | undefined =>
  zeilen.find((z) => z.tag.includes(TAGE[wochentag] ?? '—'));

/** Ein Tag ohne Uhrzeit ist nur dann geschlossen, wenn es dasteht. Sonst ist er unbekannt. */
const istGeschlossen = (z: ZeitZeile): boolean => /geschlossen/i.test(`${z.hinweis} ${z.vormittag}`);

/** Wann öffnet die Praxis als Nächstes, ab morgen gesucht? `null`, wenn ein unbekannter Tag dazwischenliegt. */
function naechsteOeffnung(zeilen: readonly ZeitZeile[], wochentag: number): string | null {
  for (let schritt = 1; schritt <= 7; schritt += 1) {
    const tag = (wochentag + schritt) % 7;
    const zeile = zeileFuer(zeilen, tag);
    if (!zeile) return null;
    const erste = spannen(zeile)[0];
    if (erste) return `öffnet ${schritt === 1 ? 'morgen' : TAGE[tag]} um ${uhr(erste[0])} Uhr`;
    if (!istGeschlossen(zeile)) return null;
  }
  return null;
}

/**
 * Die Lage in einem Satz.
 *
 * @param eroeffnungAm `YYYY-MM-DD` oder `null`, wenn die Praxis schon offen ist.
 * @param eroeffnungText wie der Tag auf der Seite heisst, z. B. „1. November".
 */
export function sprechzeitJetzt(
  zeilen: readonly ZeitZeile[],
  jetzt: Augenblick,
  eroeffnungAm: string | null,
  eroeffnungText: string,
): Lage {
  if (eroeffnungAm && jetzt.datum < eroeffnungAm) {
    return { wort: 'Eröffnung', satz: `am ${eroeffnungText}`, offen: false };
  }

  const heute = zeileFuer(zeilen, jetzt.wochentag);
  if (!heute) return { wort: 'Heute', satz: '', offen: false };

  const tag = spannen(heute);
  const laufend = tag.find(([von, bis]) => jetzt.minuten >= von && jetzt.minuten < bis);
  if (laufend) return { wort: 'Jetzt geöffnet', satz: `bis ${uhr(laufend[1])} Uhr`, offen: true };

  const spaeter = tag.find(([von]) => von > jetzt.minuten);
  if (spaeter) {
    const schonOffen = tag.some(([, bis]) => bis <= jetzt.minuten);
    return schonOffen
      ? { wort: 'Mittagspause', satz: `wieder ab ${uhr(spaeter[0])} Uhr`, offen: false }
      : { wort: 'Heute', satz: `ab ${uhr(spaeter[0])} Uhr geöffnet`, offen: false };
  }

  if (tag.length === 0 && !istGeschlossen(heute)) return { wort: 'Heute', satz: '', offen: false };

  return {
    wort: tag.length === 0 ? 'Heute geschlossen' : 'Geschlossen',
    satz: naechsteOeffnung(zeilen, jetzt.wochentag) ?? '',
    offen: false,
  };
}
