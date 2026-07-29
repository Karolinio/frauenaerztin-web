import { leistungen, type Leistung } from '../../praxis.config';
import { Zeichen } from './Zeichen';
import './leistungen.css';

export function Leistungen() {
  return (
    <section className="section leistungen" id="leistungen" aria-labelledby="leistungen-titel">
      <div className="shell">
        <div className="leistungen__kopf">
          <p className="t-label">Leistungen</p>
          <h2 className="t-section leistungen__titel" id="leistungen-titel">
            Was ich anbiete — und was jeweils dahintersteckt.
          </h2>
          <p className="t-lead leistungen__lead">
            Jeder Punkt lässt sich aufklappen. Dort steht, was die Untersuchung leistet, wie lange sie dauert
            und wer sie bezahlt.
          </p>
        </div>

        <ul className="leistungen__raster">
          {leistungen.map((leistung) => (
            <li className="leistung" key={leistung.titel} data-gewicht={leistung.gewicht}>
              <Kachel leistung={leistung} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface KachelProps {
  readonly leistung: Leistung;
}

/**
 * Erst Titel und ein Satz, Details auf Klick. Bewusst als <details>: das
 * funktioniert ohne JavaScript, ist mit der Tastatur bedienbar und meldet
 * seinen Zustand von selbst. Animiert wird nur der Inhalt über opacity und
 * transform — die Höhe springt, statt Layout-Eigenschaften zu animieren.
 */
function Kachel({ leistung }: KachelProps) {
  return (
    <details className="leistung__block">
      <summary className="leistung__kopf">
        <Zeichen name={leistung.zeichen} className="leistung__zeichen" />
        <h3 className="leistung__titel">{leistung.titel}</h3>
        <p className="leistung__kurz">{leistung.kurz}</p>
        <span className="leistung__schalter">
          <span className="leistung__schalter-text">Details</span>
          <span className="leistung__kreuz" aria-hidden="true" />
        </span>
      </summary>
      <div className="leistung__details">
        <ul>
          {leistung.details.map((zeile) => (
            <li key={zeile}>{zeile}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
