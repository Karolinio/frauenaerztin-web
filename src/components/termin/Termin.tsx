import { praxis, telefonzeiten } from '../../praxis.config';
import { Telefonhoerer } from '../ui/Pfeil';
import { Rueckrufformular } from './Rueckrufformular';
import './termin.css';

/**
 * `ausfuehrlich` ergaenzt die Fragen, die zwischen „ich muesste mal" und „ich rufe an"
 * liegen: wie lange dauert es, was bringe ich mit, was passiert beim ersten Mal.
 *
 * NOCH NICHT GEFUELLT — und das mit Absicht. Diese Texte haengen an Antworten, die
 * Yvonne noch nicht gegeben hat: Terminweg (Telefon, Rueckruf oder Doctolib?),
 * Sprechzeiten, Kassen. Sie zu erfinden hiesse, eine Patientin mit einer falschen
 * Auskunft in eine Praxis zu schicken. Der Schalter steht, damit die Antwort spaeter
 * an EINER Stelle landet und nicht zwei Fassungen des Terminabschnitts entstehen.
 */
export function Termin({ ausfuehrlich: _ausfuehrlich = false }: { ausfuehrlich?: boolean } = {}) {
  return (
    <section className="section termin" id="termin" aria-labelledby="termin-titel">
      <div className="shell termin__gitter">
        <div className="termin__ruf">
          <p className="t-label">Termin</p>
          <h2 className="t-section termin__titel" id="termin-titel">
            Am schnellsten geht es telefonisch.
          </h2>

          <a className="termin__nummer" href={praxis.telefon.href}>
            <Telefonhoerer className="termin__hoerer" />
            <span>{praxis.telefon.anzeige}</span>
          </a>

          <p className="t-body termin__zeiten">
            {telefonzeiten.zeile}. {telefonzeiten.rueckruf}
          </p>
        </div>

        <div className="termin__formular">
          <h3 className="t-sub termin__formular-titel">Oder Sie hinterlassen Ihre Nummer.</h3>
          <p className="t-meta termin__formular-lead">
            Drei Angaben, mehr brauche ich nicht, um zurückzurufen.
          </p>
          <Rueckrufformular />
        </div>
      </div>
    </section>
  );
}
