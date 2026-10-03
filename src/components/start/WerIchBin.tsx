import { team } from '../../inhalt';
import { Enthuellen } from '../ui/Enthuellen';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';
import { personAnker } from '../../lib/anker';
import { Formbild } from '../ui/Formbild';



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
          <p className="t-label">Über mich</p>
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
          <div className="werbin__team">
            <p className="t-label werbin__team-label">Mein Team</p>
            {/*
              ═══ Die Gesichter in ihrer Form, seit dem 02.10.2026 ═══

              Vorher: vier gestrichelte Rechtecke, 3 + 1 umgebrochen. Jetzt sitzt
              jedes Gesicht im Umriss ihrer Marke (`bilder/form.svg`, aus
              `marke.svg` gezogen) — dieselbe Form wie über dem Hero und auf dem
              Schild am Eingang. Abgelesen an Passionfroot (Mobbin): organische
              Formen statt Kreisen, jede ein wenig anders.

              „Anders" heisst hier: dieselbe Form, je Person gedreht und
              gespiegelt. Eine zweite Form zu erfinden wäre eine zweite Marke.

              Bewegung, und nur diese: beim Eintreten dreht sich die Form die
              letzten Grad in ihre Lage, das Foto bleibt dabei aufrecht. Beim
              Darüberfahren dreht sie sich um vier Grad weiter. Kein Federn,
              kein Kippen in 3D — sie hat „ruhig" gesagt.
            */}
            <ul className="werbin__reihe">
              {weitere.map((p, i) => {
                return (
                  <Enthuellen
                    als="li"
                    className="werbin__person"
                    key={p.rolle + i}
                    verzoegerung={i * 90}
                  >
                    <a
                      className="werbin__verweis"
                      href={`${weg('/team/')}#${personAnker(p.name, i + 1)}`}
                    >
                      {/* Leeres alt: Name und Funktion stehen im selben Link —
                          mit Bildbeschreibung läse der Vorleser die Person zweimal. */}
                      <Formbild bild={p.bild} alt="" index={i + 1} />
                      <span className="werbin__person-name">
                        {steht(p.name) ? p.name : <span className="luecke">Name</span>}
                      </span>
                      <span className="t-meta werbin__person-rolle">{p.rolle}</span>
                    </a>
                  </Enthuellen>
                );
              })}
            </ul>
          </div>
        ) : null}

        <a className="link werbin__mehr" href={weg('/team/')}>
          Mehr über die Praxis und das Team
        </a>
      </div>
    </section>
  );
}
