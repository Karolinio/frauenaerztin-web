/**
 * Aktuelles — Struktur wie sie das CMS liefern wird (Eimer `news`).
 *
 * ═══ Warum diese Seite überhaupt existiert ═══
 *
 * Yvonne hat sie in ihrer ERSTEN Nachricht genannt: „Team/Leistungen/Aktuelles/
 * Impressum". Im ersten Entwurf fehlte sie ganz.
 *
 * Und ihre Referenz zeigt, wofür sie sie braucht: gynpraxisbonn.de öffnet mit einem
 * Kasten „WIR MACHEN URLAUB — vom 10. bis 21. August bleibt unsere Praxis
 * geschlossen", samt Vertretungspraxen und Telefonnummern. Das ist keine Nachricht,
 * das ist Praxisorganisation — und sie muss ohne uns änderbar sein, sonst ruft sie
 * dreimal im Jahr an und wartet.
 *
 * ═══ Warum `art` und nicht nur ein Text ═══
 *
 * Eine Urlaubsvertretung ist dringend und gehört auf jede Seite. Eine Neuigkeit
 * („neues Ultraschallgerät") gehört nur hierher. Ohne die Unterscheidung steht
 * entweder alles überall oder nichts irgendwo.
 */

export type Meldung = {
  /** `hinweis` erscheint zusätzlich als Band oben auf JEDER Seite. `neuigkeit` nur hier. */
  art: 'hinweis' | 'neuigkeit'
  titel: string
  /** JJJJ-MM-TT. Sortiert die Liste und steht klein über dem Titel. */
  datum: string
  /** Bis wann der Hinweis gilt. Danach verschwindet er von selbst — siehe `gilt()`. */
  bis: string | null
  text: string
}

/**
 * Leer im Entwurf.
 *
 * Eine erfundene Urlaubsmeldung auf einer Praxisseite ist kein Platzhalter, sondern
 * eine Falschauskunft — jemand fährt hin und steht vor der Tür. Was hier steht, hat
 * Yvonne eingetragen oder niemand.
 */
export const MELDUNGEN: Meldung[] = []

/**
 * Gilt diese Meldung heute noch?
 *
 * Der teuerste stille Fehler einer Aktuelles-Seite ist die Urlaubsmeldung vom letzten
 * Sommer, die im Januar noch oben steht. Sie kostet nicht Vertrauen, sie kostet
 * Termine: wer liest „geschlossen", ruft nicht an.
 *
 * Deshalb verfällt ein Hinweis von selbst, sobald `bis` vorbei ist — ohne dass jemand
 * daran denken muss. Ohne `bis` gilt er weiter; das ist die bewusste Entscheidung
 * dessen, der ihn eingetragen hat.
 */
export function gilt(m: Meldung, heute = new Date()): boolean {
  if (!m.bis) return true
  /* Bis EINSCHLIESSLICH: „bis 21.08." heisst, am 21. ist noch zu. Ein Vergleich auf
     „kleiner" würde die Praxis einen Tag zu früh öffnen lassen. */
  return new Date(`${m.bis}T23:59:59`) >= heute
}

/** Der Hinweis, der oben auf jeder Seite steht — höchstens einer, der jüngste gültige. */
export function obenAufJederSeite(meldungen = MELDUNGEN, heute = new Date()): Meldung | null {
  return meldungen
    .filter((m) => m.art === 'hinweis' && gilt(m, heute))
    .sort((a, b) => b.datum.localeCompare(a.datum))[0] ?? null
}
