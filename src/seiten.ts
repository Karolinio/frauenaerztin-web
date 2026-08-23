/**
 * Die Seiten dieser Website — EINE Liste, aus der alles kommt.
 *
 * ═══ Warum es echte Unterseiten sind und keine Anker ═══
 *
 * Der erste Entwurf war ein Ein-Seiter mit fünf Ankern im Menü. Yvonne hat das
 * nach einem Tag bemerkt und genau richtig beschrieben:
 *
 *   „Die Seite die du geschickt hast ist aber quasi eine Landingpage, oder? Es
 *    gibt zwar ein Menü aber in den Unterpunkten kommt man immer wieder zu den
 *    Texten/Bildern von der Hauptpage?"
 *
 * Ein Menü, dessen Punkte alle auf dieselbe Seite zeigen, ist kein Menü. Es
 * sieht aus wie eine Zusage und ist keine.
 *
 * ═══ Die eine Regel ═══
 *
 * Diese Liste ist die Quelle für die Kopfzeile, die Fusszeile, die Einstiege in
 * `vite.config.ts` und die Titel. Wer eine Seite dazulegt, legt sie HIER dazu.
 * Eine zweite Liste im Menü ist die Falle `zwei-listen-die-driften`, und die
 * kostet in diesem Repo nachweislich am meisten.
 */

export type Seite = {
  /** Die Adresse, mit Schrägstrich am Ende. Die Startseite ist `/`. */
  weg: string;
  /** Was im Menü steht. Kurz — sechs Punkte müssen aufs Handy. */
  label: string;
  /** Der Titel im Browsertab und in der Google-Zeile. */
  titel: string;
  /** Die Beschreibung für Google. Ein Satz, der auch allein steht. */
  beschreibung: string;
  /** Ob der Punkt ins Hauptmenü gehört. Impressum und Datenschutz: nein. */
  imMenue: boolean;
};

/**
 * Die Reihenfolge ist ihre eigene, aus der Sprachnachricht:
 * Team · Leistungen · Praxis · Aktuelles · Öffnungszeiten/Termine · Kontakt/Anfahrt.
 *
 * Abweichend davon steht „Leistungen" vor „Team": wer neu auf einer Praxisseite
 * landet, sucht zuerst, ob es das gibt, was sie braucht — und erst dann, wer es
 * macht. Das ist die einzige Abweichung von ihrer Liste, und sie ist eine
 * Reihenfolge, kein Weglassen.
 */
export const SEITEN: Seite[] = [
  {
    weg: '/',
    label: 'Start',
    titel: '%PRAXIS_NAME% — Medizin für Frauen in Erkelenz',
    beschreibung:
      'Die neue gynäkologische Praxis in Erkelenz. Vorsorge, Kinderwunsch, Schwangerschaft, Wechseljahre — und eine eigene Mädelssprechstunde.',
    imMenue: false,
  },
  {
    weg: '/leistungen/',
    label: 'Leistungen',
    titel: 'Leistungen — %PRAXIS_NAME%',
    beschreibung:
      'Vorsorge und Früherkennung, Mädelssprechstunde, Verhütung, Kinderwunsch, Schwangerschaft, Wechseljahre, Blase und Beckenboden, onkologische Nachsorge, ästhetische Medizin.',
    imMenue: true,
  },
  {
    weg: '/team/',
    label: 'Team',
    titel: 'Team — %PRAXIS_NAME%',
    beschreibung: 'Wer Sie in der Praxis empfängt und behandelt.',
    imMenue: true,
  },
  {
    weg: '/praxis/',
    label: 'Praxis',
    titel: 'Die Praxis — %PRAXIS_NAME%',
    beschreibung: 'Die Räume der neuen Praxis in Erkelenz und wie Sie hineinkommen.',
    imMenue: true,
  },
  {
    weg: '/aktuelles/',
    label: 'Aktuelles',
    titel: 'Aktuelles — %PRAXIS_NAME%',
    beschreibung: 'Urlaub, Vertretung, geänderte Sprechzeiten und Neues aus der Praxis.',
    imMenue: true,
  },
  {
    weg: '/termin/',
    label: 'Termin',
    titel: 'Öffnungszeiten und Termine — %PRAXIS_NAME%',
    beschreibung: 'Wann die Praxis geöffnet hat und wie Sie einen Termin bekommen.',
    imMenue: true,
  },
  {
    weg: '/kontakt/',
    label: 'Kontakt',
    titel: 'Kontakt und Anfahrt — %PRAXIS_NAME%',
    beschreibung: 'Anschrift, Telefon, Anfahrt mit Auto, Bus und Bahn — und welche Nummer im Notfall gilt.',
    imMenue: true,
  },
];

/** Was in der Fusszeile steht und nicht im Menü. Rechtlich Pflicht, aber kein Weg. */
export const RECHT: Seite[] = [
  {
    weg: '/impressum.html',
    label: 'Impressum',
    titel: 'Impressum — %PRAXIS_NAME%',
    beschreibung: 'Anbieterkennzeichnung nach § 5 DDG.',
    imMenue: false,
  },
  {
    weg: '/datenschutz.html',
    label: 'Datenschutz',
    titel: 'Datenschutzhinweis — %PRAXIS_NAME%',
    beschreibung: 'Wie diese Website mit Ihren Daten umgeht.',
    imMenue: false,
  },
];

export const MENUE = SEITEN.filter((s) => s.imMenue);

/**
 * Welche Seite gerade offen ist — an der Adresse abgelesen, nicht gespeichert.
 *
 * Die Adresse ist die Wahrheit; ein zusätzlicher Zustand („aktive Seite") wäre
 * eine zweite, die beim ersten Zurück-Knopf falsch steht.
 */
export function aktiveSeite(pfad: string): Seite | undefined {
  const sauber = pfad.replace(/index\.html$/, '');
  return [...SEITEN, ...RECHT].find((s) => {
    if (s.weg === '/') return sauber === '/' || sauber === '';
    return sauber.endsWith(s.weg) || sauber.endsWith(s.weg.replace(/\/$/, ''));
  });
}
