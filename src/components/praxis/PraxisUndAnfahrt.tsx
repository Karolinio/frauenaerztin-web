import { kassen, praxis, telefonzeiten, zugang } from '../../praxis.config';
import { Telefonhoerer } from '../ui/Pfeil';
import { Enthuellen } from '../ui/Enthuellen';
import { Sprechzeitentabelle } from './Sprechzeitentabelle';
import { Karte } from './Karte';
import './praxis.css';

export function PraxisUndAnfahrt() {
  return (
    <section className="section praxis" id="praxis" aria-labelledby="praxis-titel">
      <div className="shell">
        <div className="praxis__kopf">
          <p className="t-label">Praxis & Anfahrt</p>
          <h2 className="t-section praxis__titel" id="praxis-titel">
            Wann geöffnet ist, wie Sie hinkommen und wie Sie hineinkommen.
          </h2>
        </div>

        <div className="praxis__gitter">
          <Enthuellen className="praxis__zeiten">
            <Sprechzeitentabelle />
          </Enthuellen>

          <Enthuellen className="praxis__kontakt" verzoegerung={0.06}>
            <div className="praxis__telefon">
              <p className="t-label">Telefon</p>
              <a className="praxis__nummer" href={praxis.telefon.href}>
                <Telefonhoerer />
                {praxis.telefon.anzeige}
              </a>
              <p className="t-meta">{telefonzeiten.zeile}</p>
              <p className="t-meta">{telefonzeiten.rueckruf}</p>
            </div>
            <div className="praxis__kassen">
              <p className="t-label">Abrechnung</p>
              <p className="t-meta">{kassen.zeile}</p>
            </div>
          </Enthuellen>

          {/* Barrierefreiheit ist für viele das Kriterium, an dem die
              Entscheidung hängt — deshalb ein eigener Block und keine Fußnote. */}
          <Enthuellen als="section" className="praxis__zugang" aria-labelledby="zugang-titel">
            <h3 className="t-sub praxis__zugang-titel" id="zugang-titel">
              Hereinkommen
            </h3>
            <dl>
              {zugang.map((punkt) => (
                <div key={punkt.punkt}>
                  <dt>{punkt.punkt}</dt>
                  <dd>{punkt.detail}</dd>
                </div>
              ))}
            </dl>
          </Enthuellen>

          <Enthuellen className="praxis__karte" verzoegerung={0.06}>
            <Karte />
          </Enthuellen>
        </div>
      </div>
    </section>
  );
}
