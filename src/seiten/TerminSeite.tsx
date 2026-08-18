import { praxis } from '../praxis.config';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { Sprechzeiten } from '../components/praxis/Sprechzeiten';
import { steht } from '../components/ui/Angabe';
import { weg } from '../lib/weg';
import './termin.css';

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
        titel="Wann und wie"
        einleitung={
          <p>
            Sagen Sie beim Anruf kurz, worum es geht. Davon hängt ab, wie viel Zeit eingeplant wird — eine
            Vorsorge braucht anderes als ein Beratungsgespräch.
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
              <p className="t-label">Am Telefon</p>
              <p className="t-body weg__text">
                Der übliche Weg, und der schnellste. Wenn niemand abnimmt, ist gerade jemand im Zimmer —
                versuchen Sie es später noch einmal.
              </p>
              {telefonSteht ? (
                <a className="knopf weg__knopf" href={telefon}>
                  {praxis.telefon.anzeige} anrufen
                </a>
              ) : (
                <p className="weg__knopf">
                  <span className="luecke">Telefonnummer der Praxis</span>
                </p>
              )}
              <p className="t-meta weg__zeiten">
                {praxis.telefonzeiten ?? (
                  <>
                    Telefonzeiten: <span className="luecke">stehen noch nicht fest</span>
                  </>
                )}
              </p>
            </Enthuellen>

            <Enthuellen als="article" className="weg" verzoegerung={60}>
              <p className="t-label">Rückruf</p>
              <p className="t-body weg__text">
                Sie hinterlassen Ihre Nummer, ich rufe zurück. Für alles, was sich nicht in einer Sprechzeit
                klären lässt.
              </p>
              <a className="knopf knopf--leise weg__knopf" href={weg('/kontakt/')}>
                Rückruf anfragen
              </a>
            </Enthuellen>

            {/* Die Doctolib-Zeile. Sie steht heute nicht da, weil es sie nicht
                gibt — und sie kommt, sobald ein Wert in der Konfiguration steht. */}
            {praxis.onlineTermin ? (
              <Enthuellen als="article" className="weg" verzoegerung={120}>
                <p className="t-label">Online</p>
                <p className="t-body weg__text">Rund um die Uhr, ohne anzurufen.</p>
                <a className="knopf knopf--leise weg__knopf" href={praxis.onlineTermin.url}>
                  Über {praxis.onlineTermin.anbieter} buchen
                </a>
              </Enthuellen>
            ) : null}
          </div>

          <Enthuellen>
            <p className="t-meta wege__nachsatz">
              {praxis.kassen ?? (
                <>
                  Welche Kassen abgerechnet werden: <span className="luecke">steht noch nicht fest</span>
                </>
              )}
            </p>
          </Enthuellen>
        </div>
      </section>
    </>
  );
}
