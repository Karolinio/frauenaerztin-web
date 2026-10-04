import { zugang, praxisText } from '../praxis.config';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { ZiehGalerie } from '../components/praxis/ZiehGalerie';
import { steht } from '../components/ui/Angabe';
import './praxis.css';

/**
 * Die Praxis: die Räume als Zieh-Galerie, danach die Barrierefreiheit.
 *
 * Die Anfahrt ist von hier auf `/kontakt/` ausgezogen — sie gehört zu Telefon
 * und Anschrift und nicht zu den Bildern. Wer den Weg sucht, sucht ihn unter
 * „Kontakt".
 */
export default function PraxisSeite() {
  return (
    <>
      <Seitenkopf
        etikett="Praxis"
        titel={praxisText.titel}
        einleitung={<p>{praxisText.satz}</p>}
      />

      <ZiehGalerie />

      <section className="sektion flaeche-leinen" aria-labelledby="zugang-titel">
        <div className="schale">
          <Enthuellen>
            <p className="t-label">Barrierefreiheit</p>
            <h2 id="zugang-titel" className="t-section zugang__titel">
              Wie Sie hineinkommen
            </h2>
            <p className="t-body zugang__lead">
              Für eine Hochschwangere im achten Monat ist „Aufzug ja oder nein" keine Nebeninformation.
              Deshalb steht hier nichts, was nicht vor Ort nachgesehen wurde — und solange steht die Lücke.
            </p>
          </Enthuellen>

          <dl className="zugang">
            {zugang.map((z, i) => (
              <Enthuellen als="div" key={z.punkt} className="zugang__zeile" verzoegerung={i * 50}>
                <dt className="zugang__punkt">{z.punkt}</dt>
                <dd className="zugang__detail t-meta">
                  {steht(z.detail) ? (
                    z.detail
                  ) : (
                    <span className="luecke">vor Ort nachsehen und eintragen</span>
                  )}
                </dd>
              </Enthuellen>
            ))}
          </dl>

          {/* Hier stand „Etwas, das hier nicht steht? Rufen Sie an …“ —
              auf ihren Wunsch raus (04.10.2026). */}
        </div>
      </section>
    </>
  );
}
