/**
 * Die Seiten dieser Website — EINE Liste, aus der alles kommt.
 *
 * ═══ Warum es echte Unterseiten sind und keine Anker ═══
 *
 * Der erste Entwurf war ein Ein-Seiter mit fünf Ankern im Menü. Yvonne hat das nach
 * einem Tag bemerkt und genau richtig beschrieben:
 *
 *   „Die Seite die du geschickt hast ist aber quasi eine Landingpage, oder? Es gibt
 *    zwar ein Menü aber in den Unterpunkten kommt man immer wieder zu den
 *    Texten/Bildern von der Hauptpage?"
 *
 * Ja. Und sie hatte von Anfang an etwas anderes bestellt: „eine Homepage mit paar
 * Unterpunkten (Team/Leistungen/Aktuelles/Impressum)". Ihre Referenz
 * (gynpraxisbonn.de) hat sechs echte Unterseiten.
 *
 * Ein Menü, dessen Punkte alle auf dieselbe Seite zeigen, ist kein Menü. Es sieht
 * aus wie eine Zusage und ist keine.
 *
 * ═══ Warum diese Liste und nicht ein Router ═══
 *
 * Jede Seite ist ein eigener HTML-Einstieg (Vite kann das von Haus aus). Das heisst:
 * echte Adressen, kein Umleitungstrick auf GitHub Pages, jede Seite mit eigenem
 * Titel und eigener Beschreibung — und wer nur „Leistungen" braucht, lädt auch nur
 * die. Ein Router wäre eine Abhängigkeit mehr und eine Fallunterscheidung beim
 * Ausrollen.
 *
 * ═══ Die eine Regel ═══
 *
 * Diese Liste ist die Quelle für die Kopfzeile, die Fusszeile, die Einstiege in
 * `vite.config.ts` und die Sitemap. Wer eine Seite dazulegt, legt sie HIER dazu —
 * eine zweite Liste im Menü wäre `zwei-listen-die-driften`, und die kostet in diesem
 * Repo nachweislich am meisten.
 */

export type Seite = {
  /** Die Adresse, mit Schrägstrich am Ende. Die Startseite ist `/`. */
  weg: string
  /** Was im Menü steht. Kurz — das Menü hat sieben Punkte und muss aufs Handy. */
  label: string
  /** Der Titel im Browsertab und in der Google-Zeile. */
  titel: string
  /** Die Beschreibung für Google. Ein Satz, der auch allein steht. */
  beschreibung: string
  /**
   * Ob der Punkt ins Hauptmenü gehört.
   *
   * Impressum und Datenschutz stehen NUR in der Fusszeile — dorthin sucht man sie,
   * und im Hauptmenü nähmen sie den Platz weg, den „Termin" braucht.
   */
  imMenue: boolean
}

/**
 * Die Reihenfolge ist die des Kundenwegs, nicht die des Alphabets: erst wer bin ich
 * (Start), dann was gibt es (Leistungen), dann wer macht es (Team), dann wo (Praxis),
 * dann was ist gerade (Aktuelles), zuletzt der Schritt (Termin).
 *
 * „Termin" steht bewusst am Ende und ist trotzdem der einzige gefüllte Knopf. Wer
 * ihn zuerst setzt, drängt — und diese Zielgruppe entscheidet sich nicht auf Zuruf.
 */
export const SEITEN: Seite[] = [
  {
    weg: '/',
    label: 'Start',
    titel: '%PRAXIS_NAME% — %PRAXIS_FACH% in %PRAXIS_ORT%',
    beschreibung: '%PRAXIS_EINZEILER% 20 Minuten pro Termin, Ultraschall im Haus, Rückruf am selben Werktag.',
    imMenue: false,
  },
  {
    weg: '/leistungen/',
    label: 'Leistungen',
    titel: 'Leistungen — %PRAXIS_NAME%',
    beschreibung: 'Vorsorge, Schwangerschaft, Verhütung und Beratung, Impfungen, Wechseljahre. Was jeweils dahintersteckt und wie lange es dauert.',
    imMenue: true,
  },
  {
    weg: '/team/',
    label: 'Team',
    titel: 'Team — %PRAXIS_NAME%',
    beschreibung: 'Wer Sie in der Praxis empfängt und behandelt. Werdegang, Schwerpunkte und warum die Praxis so arbeitet, wie sie arbeitet.',
    imMenue: true,
  },
  {
    weg: '/praxis/',
    label: 'Praxis',
    titel: 'Praxis und Anfahrt — %PRAXIS_NAME%',
    beschreibung: 'Öffnungszeiten, Anfahrt mit Bus, Bahn und Auto, Barrierefreiheit — und wie die Räume geschnitten sind.',
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
    titel: 'Termin vereinbaren — %PRAXIS_NAME%',
    beschreibung: 'Wie Sie einen Termin bekommen, wie lange es dauert und was Sie zum ersten Termin mitbringen.',
    imMenue: true,
  },
]

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
]

export const MENUE = SEITEN.filter((s) => s.imMenue)

/**
 * Welche Seite gerade offen ist — an der Adresse abgelesen, nicht gespeichert.
 *
 * Die Adresse ist die Wahrheit; ein zusätzlicher Zustand („aktive Seite") wäre eine
 * zweite, die beim ersten Zurück-Knopf falsch steht.
 */
export function aktiveSeite(pfad: string): Seite | undefined {
  const sauber = pfad.replace(/index\.html$/, '')
  return [...SEITEN, ...RECHT].find((s) => {
    if (s.weg === '/') return sauber === '/' || sauber === ''
    return sauber.endsWith(s.weg) || sauber.endsWith(s.weg.replace(/\/$/, ''))
  })
}
