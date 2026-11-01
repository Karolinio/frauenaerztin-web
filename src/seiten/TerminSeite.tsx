import { praxis } from '../praxis.config';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { Sprechzeiten } from '../components/praxis/Sprechzeiten';
import { steht } from '../components/ui/Angabe';
import './termin.css';
import { Hoerer } from '../components/ui/Strichzeichen';

/**
 * Öffnungszeiten und Terminvergabe.
 *
 * ═══ Die Doctolib-Zeile ═══
 *
 * Sie startet ohne Doctolib und nimmt es „ggf. später" dazu. Der Block unten ist
 * so gebaut, dass daraus wirklich EINE Zeile wird: `praxis.onlineTermin` in der
 * Konfiguration setzen, fertig. Kein Umbau, keine zweite Sektion, kein neues
 * Layout — und vor allem keine Umstellung der Reihenfolge, bei der das Telefon
 * plötzlich zweite Wahl wäre.
 */
export default function TerminSeite() {
  const telefon = praxis.telefon.href;
  const telefonSteht = steht(telefon) && steht(praxis.telefon.anzeige);

  return (
    <>
      <Seitenkopf
        etikett="Öffnungszeiten und Termine"
        titel="Wir sind für Sie da"
        einleitung={
          <p>
            Ob Vorsorgeuntersuchung, Beratung oder akute Beschwerden – jedes Anliegen ist unterschiedlich.
            Bitte teilen Sie uns bei der Terminvereinbarung kurz den Grund Ihres Besuchs mit, damit wir
            Ihren Termin entsprechend planen können.
          </p>
        }
      />

      <section className="sektion zeiten-block" aria-labelledby="zeiten-titel">
        <div className="schale">
          <Enthuellen>
            <h2 id="zeiten-titel" className="t-unter zeiten-block__titel">
              Sprechzeiten
            </h2>
          </Enthuellen>
          <Enthuellen>
            <Sprechzeiten />
          </Enthuellen>
        </div>
      </section>

      <section className="sektion flaeche-leinen" aria-labelledby="wege-titel">
        <div className="schale">
          <Enthuellen>
            <h2 id="wege-titel" className="t-section">
              So bekommen Sie einen Termin
            </h2>
          </Enthuellen>

          <div className="wege">
            <Enthuellen als="article" className="weg">
              {telefonSteht ? (
                <a className="knopf weg__knopf" href={telefon}>
                  <Hoerer className="knopf__zeichen" />
                  {praxis.telefon.anzeige} anrufen
                </a>
              ) : (
                <p className="weg__knopf">
                  <span className="luecke">Telefonnummer der Praxis</span>
                </p>
              )}
              {praxis.telefonzeiten ? <p className="t-meta weg__zeiten">{praxis.telefonzeiten}</p> : null}
            </Enthuellen>

            {/* Der Rückrufweg ist raus — „Kannst du die Passage mit dem Rückruf
                rausnehmen?" (17.09.2026). Termine gibt es telefonisch. */}

            {/* Die Doctolib-Zeile. Sie steht heute nicht da, weil es sie nicht
                gibt — und sie kommt, sobald ein Wert in der Konfiguration steht. */}
            {praxis.onlineTermin ? (
              <Enthuellen als="article" className="weg" verzoegerung={120}>
                <a className="knopf knopf--leise weg__knopf" href={praxis.onlineTermin.url}>
                  Über {praxis.onlineTermin.anbieter} buchen
                </a>
              </Enthuellen>
            ) : null}
          </div>

        </div>
      </section>
    </>
  );
}
