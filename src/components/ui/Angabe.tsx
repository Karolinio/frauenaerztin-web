/**
 * Ein Wert, der noch nicht feststeht — als sichtbare Lücke statt als Erfindung.
 *
 * ═══ Warum das eine eigene Komponente ist ═══
 *
 * Weil die Alternative `praxis.telefon.anzeige ?? '0000 · 00 00 00'` heisst, und
 * dieser Fallback sieht auf dem Bildschirm aus wie eine Telefonnummer. Er wird
 * beim letzten Durchsehen übersehen, weil er genau dafür gebaut ist: plausibel
 * auszusehen. Dann steht am Eröffnungstag eine falsche Nummer auf der Seite.
 *
 * Die Lücke sieht dagegen aus wie eine Lücke. Sie ist der Grund, warum diese
 * Seite nicht live gehen kann, solange sie da ist — und genau das soll sie sein.
 *
 * `was` beschreibt, WAS fehlt, nicht dass etwas fehlt. „Telefonnummer" ist eine
 * Aufgabe; „noch offen" ist eine Ausrede.
 */
export function Angabe({ wert, was }: { wert: string | null; was: string }) {
  if (wert !== null && wert.trim() !== '') return <>{wert}</>;
  return <span className="luecke">{was}</span>;
}

/** Dasselbe für Fälle, in denen ein ganzer Block nur bei vorhandenem Wert steht. */
export const steht = (wert: string | null | undefined): wert is string =>
  typeof wert === 'string' && wert.trim() !== '';
