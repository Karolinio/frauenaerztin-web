import { aktuellerHinweis } from '../../inhalt';
import { weg } from '../../lib/weg';

/**
 * Der jüngste Eintrag aus „Aktuelles", eine Zeile hoch.
 *
 * ═══ Warum kein Banner und kein Popup ═══
 *
 * Ihre eigene Referenz (gynpraxisbonn.de) legt beim Laden ein Popup über die
 * Ärztin und die Überschrift. Das ist die verbreitetste Art, eine Praxisseite
 * kaputtzumachen: die Information, die verdeckt wird, ist immer wichtiger als
 * die, die verdeckt.
 *
 * Diese Zeile steht IM Textfluss. Sie schiebt nichts weg, sie überdeckt nichts,
 * und sie ist beim Laden schon da — es gibt nichts, was springen könnte.
 *
 * Ist nichts Aktuelles eingetragen oder ist der letzte Eintrag abgelaufen, steht
 * hier gar nichts. Eine leere „Aktuelles"-Zeile ist schlimmer als keine.
 */
export function Hinweiszeile() {
  const meldung = aktuellerHinweis();
  if (!meldung) return null;

  return (
    <aside className="hinweis" aria-label="Aktueller Hinweis">
      <div className="schale hinweis__zeile">
        <span className="t-label hinweis__rubrik">{meldung.art}</span>
        <p className="hinweis__text">
          <strong>{meldung.titel}.</strong> {meldung.text}
        </p>
        <a className="link hinweis__mehr" href={weg('/aktuelles/')}>
          Alles Aktuelle
        </a>
      </div>
    </aside>
  );
}
