/**
 * Das Team — Struktur wie sie das CMS liefern wird.
 *
 * ═══ Warum die Form jetzt schon so ist ═══
 *
 * `engine/cms.mjs` erzeugt für den Eimer `team` genau diese Felder: `name`, `rolle`,
 * `bild`, `bildText`, `text`. Wer die Seite heute mit einer anderen Form baut, muss
 * sie beim Anschliessen des CMS umbauen — und Umbau ist der Grund, warum „CMS
 * nachrüsten" in fünf von sechs Kundenrepos Handarbeit war.
 *
 * Der Wechsel ist später eine Zeile: statt aus dieser Datei kommt die Liste aus
 * `inhalt/team.json`. Deshalb steht hier auch kein Text im Bauteil.
 *
 * ═══ Warum es mit EINER Person funktionieren muss ═══
 *
 * Yvonne am 04.08.: „Ne Bilder hab ich noch nicht, da ich noch kein komplettes Team
 * hab." Die Praxis eröffnet im November. Ein Team-Raster, das mit einer Karte aussieht
 * wie ein Fehler, ist im wichtigsten Moment kaputt — nämlich am Tag der Eröffnung.
 *
 * Deshalb die Reihenfolge: die Ärztin steht ausführlich oben (eigener Abschnitt), das
 * Raster darunter beginnt bei null Einträgen und wächst. Bei null zeigt es einen
 * ehrlichen Satz statt eines leeren Kastens.
 */

export type Person = {
  name: string
  rolle: string
  /** Pfad unter `public/`. `null`, solange es kein Foto gibt — kein Platzhaltergesicht. */
  bild: string | null
  /** Pflicht, sobald `bild` steht. Ohne sie ist das Bild für blinde Nutzerinnen nicht da. */
  bildText: string
  text: string
}

/**
 * Noch leer, und das ist richtig so.
 *
 * Ein erfundenes Team auf einer Arztseite ist kein Platzhalter, sondern eine falsche
 * Angabe über Menschen. Sobald Yvonne eingestellt hat, kommen die Einträge hier oder
 * über das CMS hinein.
 */
export const TEAM: Person[] = []

/** Was steht, wenn noch niemand eingetragen ist. Ehrlich, nicht entschuldigend. */
export const TEAM_LEER = {
  titel: 'Das Team wächst gerade',
  text: 'Die Praxis eröffnet im November. Wer dann am Empfang sitzt und wer assistiert, '
    + 'steht hier, sobald es feststeht — mit Namen und Gesicht, nicht als Symbolbild.',
}
