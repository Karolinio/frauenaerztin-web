/**
 * Der Anker einer Person auf `/team/` — aus dem Namen, nicht aus der Position.
 *
 * Mit der Position als Anker landete ein Link von der Startseite nach einem
 * Umsortieren in der Redaktion bei der falschen Person. Der Name bleibt, wenn
 * sie die Reihenfolge ändert. Fehlt er noch, trägt die Position aus.
 */
export function personAnker(name: string, index: number): string {
  const aus = name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return aus ? `person-${aus}` : `person-${index + 1}`;
}
