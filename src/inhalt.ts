/**
 * Was die Ärztin selbst pflegt — hier kommt es in die Seite.
 *
 * ═══ Warum die Dateien importiert und nicht geladen werden ═══
 *
 * `import daten from '../inhalt/team.json'` schreibt den Inhalt beim Bauen ins
 * Bündel. Das hat drei Folgen, und alle drei sind gewollt:
 *
 *   1. Kein zusätzlicher Netzabruf beim Öffnen der Seite.
 *   2. Ein Tippfehler in der JSON-Datei bricht den BAU, nicht die Seite. Die
 *      Ärztin sieht den Fehler in der Redaktion, nicht die Patientin im Browser.
 *   3. `engine/inhalt-pruefen.mjs` kann die Verdrahtung MESSEN: es sucht einen
 *      Satz aus ihrem Inhalt im gebauten Bündel. Läge der Inhalt nur als Datei
 *      daneben, wäre „verdrahtet" eine Behauptung.
 *
 * ═══ Die Regel für Lücken ═══
 *
 * Ein leeres Feld ist kein Fehler, sondern eine Angabe, die noch fehlt. Es wird
 * als sichtbare Lücke gezeigt und nie mit einem Demo-Wert gefüllt.
 */

import teamRoh from '../inhalt/team.json';
import aktuellesRoh from '../inhalt/aktuelles.json';
import zeitenRoh from '../inhalt/zeiten.json';

export interface Person {
  readonly name: string;
  readonly rolle: string;
  readonly text: string;
  readonly bild: string;
  readonly bildAlt: string;
}

export interface Meldung {
  readonly titel: string;
  readonly art: string;
  readonly datum: string;
  readonly text: string;
  readonly bisWann?: string;
}

export interface Zeile {
  readonly tag: string;
  readonly vormittag: string;
  readonly nachmittag: string;
  readonly hinweis: string;
}

export const team: readonly Person[] = teamRoh;

/**
 * Nach Datum, neueste zuerst — die Reihenfolge in der Datei ist ausdrücklich
 * NICHT massgeblich. Sonst rutscht ein nachgetragener älterer Beitrag nach oben,
 * und auf der Startseite steht dann ein Urlaub aus dem letzten Jahr.
 */
export const aktuelles: readonly Meldung[] = [...(aktuellesRoh as Meldung[])].sort((a, b) =>
  b.datum.localeCompare(a.datum),
);

export const zeiten: readonly Zeile[] = zeitenRoh;

/**
 * Der jüngste Eintrag, sofern er noch gilt — für die Hinweiszeile der Startseite.
 *
 * `bisWann` ist der Grund, warum diese Funktion existiert. Ohne sie steht im
 * November der Urlaubshinweis vom Oktober oben auf der Startseite, und niemand
 * merkt es, weil ihn nach dem Eintragen niemand mehr liest. Eine abgelaufene
 * Meldung ist schlimmer als keine: sie sieht aus wie eine gepflegte Seite.
 */
export function aktuellerHinweis(heute: Date = new Date()): Meldung | null {
  const tag = heute.toISOString().slice(0, 10);
  return aktuelles.find((m) => !m.bisWann || m.bisWann >= tag) ?? null;
}

/** Hat dieser Tag überhaupt eine Zeit? Sonst zeigt die Tabelle dort eine Lücke. */
export const hatZeiten = (z: Zeile): boolean => Boolean(z.vormittag || z.nachmittag);

/** Steht in der ganzen Tabelle keine einzige Uhrzeit, sagt die Seite das offen. */
export const zeitenStehenAus = zeiten.every((z) => !hatZeiten(z));

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'] as const;

/**
 * Ist diese Zeile der heutige Tag?
 *
 * Geprüft wird auf ENTHALTEN, nicht auf Gleichheit: damit trifft es sowohl
 * „Montag" als auch „Samstag und Sonntag". Eine Zeile „Mo – Fr" trifft es nicht,
 * und genau das steht als Hinweis im Schema — eine Abkürzung, die niemand
 * zuverlässig auflösen kann, wird lieber gar nicht hervorgehoben als falsch.
 */
export function istHeute(z: Zeile, heute: Date = new Date()): boolean {
  const name = WOCHENTAGE[heute.getDay()];
  return name !== undefined && z.tag.includes(name);
}
