import { team } from '../../inhalt';
import { Enthuellen } from '../ui/Enthuellen';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';

/**
 * „Wer ich bin" — der erste Eintrag aus `inhalt/team.json`, und darunter die
 * Gesichter der übrigen.
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
 *
 * ═══ Die Gesichterreihe, seit dem 30.08.2026 ═══
 *
 * Yvonne schickt Fotos von sich, von der Praxis und vom Team. Für die ersten
 * beiden gab es auf der Startseite eine Stelle — für das Team nicht. Team-Fotos
 * lagen ausschliesslich auf `/team/`, also hinter einem Klick.
 *
 * Das ist bei einer Einzelpraxis die falsche Reihenfolge. Wer anruft, spricht
 * nicht mit der Ärztin, sondern mit der Person, die den Termin vergibt — und
 * genau die stand nirgends, wo man sie sieht, ohne danach zu suchen.
 *
 * ═══ Warum hier nur Gesicht, Name und Funktion stehen ═══
 *
 * Weil die Texte auf `/team/` stehen und dort bleiben. Stünden sie hier auch,
 * wäre `/team/` eine Seite ohne eigenen Grund — und zwei Fassungen desselben
 * Textes driften. Die Reihe hier beantwortet eine andere Frage als `/team/`:
 * nicht „wer sind die", sondern „wie viele sind es und wie sehen sie aus".
 *
 * Sie erscheint nur, wenn es überhaupt weitere Einträge gibt. Eine Praxis, die
 * allein startet, bekommt hier keine leere Überschrift.
 */
export function WerIchBin() {
  const person = team[0];
  if (!person) return null;

  const weitere = team.slice(1);

  return (
    <section className="sektion werbin" aria-labelledby="werbin-titel">
      <div className="schale">
        <Enthuellen className="werbin__text">
          <p className="t-label">Wer ich bin</p>
          <h2 id="werbin-titel" className="t-section werbin__name">
            {steht(person.name) ? person.name : <span className="luecke">Name der Ärztin</span>}
          </h2>
          <p className="t-meta werbin__rolle">{person.rolle}</p>
          {/*
            Nur ihr ERSTER Absatz. Ihr Ueber-mich hat seit dem 11.09.2026 sechs;
            alle sechs stehen auf /team/, wohin ihr Mehr-Knopf im Hero fuehrt.
            Hier ganz zu zeigen hiesse: eine Wand auf der Startseite und
            derselbe Text zweimal. Der erste Absatz ist der Anriss, /team/ der Rest.
          */}
          <p className="t-lead werbin__satz">{person.text.split('\n\n')[0]}</p>
          <a className="link" href={weg('/team/')}>Mehr über mich</a>
        </Enthuellen>

        {weitere.length > 0 ? (
          <Enthuellen className="werbin__team">
            <p className="t-label werbin__team-label">Und wer noch da ist</p>
            <ul className="werbin__reihe">
              {weitere.map((p, i) => (
                <li className="werbin__person" key={p.rolle + i}>
                  {/*
                   * Der Rahmen hat die Masse des künftigen Fotos — 4:5, dasselbe
                   * Verhältnis wie auf `/team/` und in `inhalt/schema.json`. Wer
                   * den Platz erst beim Einsetzen schafft, verschiebt beim
                   * ersten echten Bild die ganze Reihe.
                   */}
                  <div className="werbin__bild">
                    {steht(p.bild) ? (
                      <img
                        src={weg(p.bild)}
                        width={400}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        alt={p.bildAlt}
                      />
                    ) : (
                      /* Zwei Wörter, mehr nicht. Der erklärende Satz steht auf
                         `/team/` am grossen Rahmen — hier bräche er in einem
                         176px breiten Kasten auf acht Zeilen um. */
                      <span className="luecke werbin__luecke">Foto folgt</span>
                    )}
                  </div>
                  <p className="werbin__person-name">
                    {steht(p.name) ? p.name : <span className="luecke">Name</span>}
                  </p>
                  <p className="t-meta werbin__person-rolle">{p.rolle}</p>
                </li>
              ))}
            </ul>
          </Enthuellen>
        ) : null}

        <a className="link werbin__mehr" href={weg('/team/')}>
          Mehr über die Praxis und das Team
        </a>
      </div>
    </section>
  );
}
