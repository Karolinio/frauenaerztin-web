import { team } from '../../inhalt';
import { Enthuellen } from '../ui/Enthuellen';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';

/**
 * „Wer ich bin" — der erste Eintrag aus `inhalt/team.json`.
 *
 * ═══ Warum aus der Redaktionsdatei und nicht aus der Konfiguration ═══
 *
 * Weil sie diesen Text ändern wird, und zwar als erstes: sobald Name und Foto
 * feststehen. Stünde er in der Konfiguration, wäre die erste Änderung nach der
 * Eröffnung ein Anruf bei uns — für einen Satz.
 *
 * Es ist derselbe Eintrag wie oben auf /team/. Zwei Texte über dieselbe Person
 * an zwei Stellen driften auseinander, und zwar immer in dieselbe Richtung: der
 * auf der Startseite bleibt stehen.
 */
export function WerIchBin() {
  const person = team[0];
  if (!person) return null;

  return (
    <section className="sektion werbin" aria-labelledby="werbin-titel">
      <div className="schale werbin__raster">
        <Enthuellen className="werbin__text">
          <p className="t-label">Wer ich bin</p>
          <h2 id="werbin-titel" className="t-section werbin__name">
            {steht(person.name) ? person.name : <span className="luecke">Name der Ärztin</span>}
          </h2>
          <p className="t-meta werbin__rolle">{person.rolle}</p>
          <p className="t-lead werbin__satz">{person.text}</p>
          <a className="link werbin__mehr" href={weg('/team/')}>
            Mehr über die Praxis und das Team
          </a>
        </Enthuellen>
      </div>
    </section>
  );
}
