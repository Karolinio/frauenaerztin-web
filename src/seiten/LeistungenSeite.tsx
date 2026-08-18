import { leistungen, weitereLeistungen } from '../praxis.config';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { weg } from '../lib/weg';
import './leistungen.css';

/**
 * Alle Leistungen ausführlich — ihre fünf, dann die zwei weiteren.
 *
 * ═══ Warum eine lange Seite und keine fünf Unterseiten ═══
 *
 * Weil eine Patientin selten genau eine Leistung sucht. Wer wegen der Vorsorge
 * kommt, liest die Zeile über die Verhütung mit; fünf Unterseiten machen daraus
 * fünf Entscheidungen, welche man anklickt.
 *
 * Die Sprungmarken (`#schwangerschaft`) sorgen dafür, dass der Verweis von der
 * Startseite trotzdem punktgenau landet.
 */
export default function LeistungenSeite() {
  return (
    <div className="leistungen-seite">
      <Seitenkopf
        etikett="Leistungen"
        titel="Was ich anbiete"
        einleitung={
          <p>
            Fachbegriffe erkläre ich beim ersten Mal in einem Halbsatz. Wenn im Termin trotzdem etwas unklar
            bleibt, fragen Sie — das ist keine Störung, das ist der Termin.
          </p>
        }
      />

      <div className="schale leistungen">
        {leistungen.map((l) => (
          <Enthuellen als="article" key={l.id} className="leistung">
            {/* Die Sprungmarke sitzt auf der Überschrift, nicht auf dem Artikel:
                sonst landet der Sprung über dem Titel und die Leserin sieht als
                erstes den letzten Absatz der Leistung darüber. */}
            <h2 className="t-unter leistung__titel" id={l.id}>
              {l.titel}
            </h2>
            <div className="leistung__text">
              <p className="t-lead leistung__kurz">{l.kurz}</p>
              <p className="t-body">{l.absatz}</p>
            </div>
          </Enthuellen>
        ))}
      </div>

      <section className="sektion flaeche-leinen">
        <div className="schale leistungen">
          <Enthuellen>
            <p className="t-label">Weitere Leistungen</p>
          </Enthuellen>
          {weitereLeistungen.map((l) => (
            <Enthuellen als="article" key={l.id} className="leistung">
              <h2 className="t-unter leistung__titel" id={l.id}>
                {l.titel}
              </h2>
              <div className="leistung__text">
                <p className="t-lead leistung__kurz">{l.kurz}</p>
                <p className="t-body">{l.absatz}</p>
              </div>
            </Enthuellen>
          ))}
        </div>
      </section>

      <section className="sektion">
        <div className="schale">
          <Enthuellen>
            <p className="t-lead leistungen__schluss">
              Sie finden nicht, was Sie suchen? Rufen Sie an — manches lässt sich in zwei Sätzen klären, und
              dafür braucht es keinen Termin.
            </p>
            <a className="knopf" href={weg('/termin/')}>
              Zeiten und Termin
            </a>
          </Enthuellen>
        </div>
      </section>
    </div>
  );
}
