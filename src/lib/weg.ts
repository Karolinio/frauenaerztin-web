/**
 * Eine Adresse innerhalb dieser Seite, korrekt für jeden Ausrollort.
 *
 * ═══ Warum das eine Funktion ist und kein Zeichenkettenliteral ═══
 *
 * GitHub Pages liefert unter `/<repo>/` aus, eine eigene Domain unter `/`. Wer
 * `href="/termin/"` schreibt, hat auf Pages sieben tote Verweise — und sie
 * antworten mit 404, nicht mit einem Fehler beim Bauen. Genau diese Sorte Fehler
 * stand in diesem Repo schon zweimal in der Git-Historie (`fix(verweise)`,
 * `fix(pages)`).
 *
 * `BASE_URL` endet immer auf einen Schrägstrich, deshalb wird der führende des
 * Pfades entfernt. Sonst entsteht `//termin/`, und das ist für den Browser eine
 * andere Domain.
 */
export const weg = (pfad: string): string => `${import.meta.env.BASE_URL}${pfad.replace(/^\//, '')}`;
