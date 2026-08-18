import { MENUE, RECHT } from '../../seiten';
import { praxis } from '../../praxis.config';
import { zeiten, hatZeiten, zeitenStehenAus } from '../../inhalt';
import { Angabe, steht } from '../ui/Angabe';
import { Marke } from '../ui/Marke';
import { weg } from '../../lib/weg';
import './fusszeile.css';

/**
 * Die Fusszeile: Anschrift, Zeiten, Wege, Recht.
 *
 * ═══ Warum sie hell ist ═══
 *
 * Weil die Direktion keine Fläche dunkler als `--tinte-mtl` als Hintergrund
 * erlaubt. Eine dunkle Fusszeile ist die bequemste Art, eine helle Seite unten
 * abzuschliessen — und sie hätte hier ausgesehen wie ein Fremdkörper aus einem
 * anderen Entwurf. Abgeschlossen wird durch Flächenwechsel auf Leinen und eine
 * Haarlinie, nicht durch Dunkelheit.
 *
 * ═══ Warum die Zeiten hier stehen ═══
 *
 * Weil sie hier gesucht werden. Sie kommen aus `inhalt/zeiten.json` — derselben
 * Datei wie auf /termin/. Eine zweite Liste in der Fusszeile wäre die Sorte
 * Drift, die man erst bemerkt, wenn eine Patientin vor der Tür steht.
 */
export function Fusszeile() {
  const anschriftSteht = steht(praxis.adresse.strasse) && steht(praxis.adresse.plz);

  return (
    <footer className="fuss">
      <div className="schale fuss__raster">
        <div className="fuss__spalte fuss__spalte--marke">
          <Marke />
          <p className="t-meta fuss__ort">Gynäkologische Praxis in {praxis.ort}</p>
        </div>

        <div className="fuss__spalte">
          <h2 className="t-label">Anschrift</h2>
          <address className="fuss__adresse">
            {anschriftSteht ? (
              <>
                {praxis.adresse.strasse}
                <br />
                {praxis.adresse.plz} {praxis.adresse.ort}
              </>
            ) : (
              <>
                <span className="luecke">Strasse und Hausnummer</span>
                <br />
                <span className="luecke">PLZ</span> {praxis.adresse.ort}
              </>
            )}
          </address>

          {steht(praxis.telefon.href) && steht(praxis.telefon.anzeige) ? (
            <a className="fuss__telefon" href={praxis.telefon.href}>
              {praxis.telefon.anzeige}
            </a>
          ) : (
            <p className="fuss__telefon">
              <Angabe wert={null} was="Telefonnummer" />
            </p>
          )}
        </div>

        <div className="fuss__spalte">
          <h2 className="t-label">Sprechzeiten</h2>
          {zeitenStehenAus ? (
            <p className="t-meta fuss__ausstehend">
              <span className="luecke">Sprechzeiten stehen noch nicht fest</span>
            </p>
          ) : (
            <ul className="fuss__zeiten">
              {zeiten.filter(hatZeiten).map((z) => (
                <li key={z.tag}>
                  <span className="fuss__tag">{z.tag}</span>
                  <span className="fuss__spanne">
                    {[z.vormittag, z.nachmittag].filter(Boolean).join(' · ')}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <a className="link fuss__mehr" href={weg('/termin/')}>
            Alle Zeiten und Termine
          </a>
        </div>

        <div className="fuss__spalte">
          <h2 className="t-label">Seiten</h2>
          <ul className="fuss__wege">
            {MENUE.map((s) => (
              <li key={s.weg}>
                <a href={weg(s.weg)}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="schale fuss__abschluss">
        <p className="t-meta">
          Im Notfall: <a href="tel:112">112</a> · Ausserhalb der Sprechzeiten:{' '}
          <a href="tel:116117">116 117</a>
        </p>
        <ul className="fuss__recht">
          {RECHT.map((s) => (
            <li key={s.weg}>
              <a href={weg(s.weg)}>{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
