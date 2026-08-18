import { praxis } from '../../praxis.config';
import { Enthuellen } from '../ui/Enthuellen';
import { steht } from '../ui/Angabe';

/**
 * Das Rückrufformular.
 *
 * ═══ Warum es KEIN Nachrichtenfeld hat ═══
 *
 * Weil in ein Nachrichtenfeld auf einer Frauenarztseite geschrieben wird:
 * „Ich habe seit drei Wochen Blutungen" oder „Bin ich schwanger?". Das sind
 * Gesundheitsdaten nach Art. 9 DSGVO — die besonders geschützte Kategorie. Wer
 * sie über ein Webformular entgegennimmt, braucht Ende-zu-Ende-Verschlüsselung,
 * einen Auftragsverarbeitungsvertrag und ein Löschkonzept, und bekommt sie
 * stattdessen unverschlüsselt in ein Postfach.
 *
 * Das Formular fragt deshalb nur: Wer sind Sie, unter welcher Nummer, und wann.
 * Alles Weitere gehört ans Telefon. Das ist keine Bequemlichkeit — es ist die
 * einzige Bauweise, die diese Daten gar nicht erst entstehen lässt.
 *
 * ═══ Warum es heute nichts entgegennimmt ═══
 *
 * Weil `praxis.formularEndpunkt` noch `null` ist. Ein Formular, das ins Nichts
 * sendet, ist schlimmer als keins: die Patientin wartet auf einen Rückruf, den
 * niemand bekommen hat. Solange der Endpunkt fehlt — und er MUSS in der EU
 * liegen —, steht hier der Hinweis aufs Telefon.
 */
export function Rueckruf() {
  const endpunkt = praxis.formularEndpunkt;
  const telefon = praxis.telefon.href;
  const telefonSteht = steht(telefon) && steht(praxis.telefon.anzeige);

  return (
    <section className="sektion flaeche-leinen" aria-labelledby="rueckruf-titel">
      <div className="schale rueckruf">
        <Enthuellen>
          <p className="t-label">Rückruf</p>
          <h2 id="rueckruf-titel" className="t-section">
            Ich rufe zurück
          </h2>
          <p className="t-body rueckruf__lead">
            Nur Ihr Name, Ihre Nummer und wann Sie erreichbar sind. Bitte schreiben Sie hier{' '}
            <strong>keine Beschwerden und keine Befunde</strong> — dafür ist dieses Formular nicht gebaut, und
            Sie sollen solche Angaben nicht unverschlüsselt verschicken müssen.
          </p>
        </Enthuellen>

        {steht(endpunkt) ? (
          <Enthuellen>
            <form className="rueckruf__form" action={endpunkt} method="post">
              <div className="feld">
                <label htmlFor="rr-name">Ihr Name</label>
                <input id="rr-name" name="name" type="text" autoComplete="name" required />
              </div>

              <div className="feld">
                <label htmlFor="rr-tel">Ihre Telefonnummer</label>
                <input id="rr-tel" name="telefon" type="tel" autoComplete="tel" required />
              </div>

              <div className="feld">
                <label htmlFor="rr-wann">Wann erreiche ich Sie am besten?</label>
                <select id="rr-wann" name="wann" defaultValue="vormittags">
                  <option value="vormittags">vormittags</option>
                  <option value="nachmittags">nachmittags</option>
                  <option value="egal">egal</option>
                </select>
              </div>

              <div className="feld feld--zustimmung">
                <input id="rr-ok" name="einwilligung" type="checkbox" required />
                <label htmlFor="rr-ok">
                  Ich bin damit einverstanden, dass Name und Nummer zum Zweck des Rückrufs gespeichert und
                  danach gelöscht werden.
                </label>
              </div>

              <button className="knopf" type="submit">
                Rückruf anfragen
              </button>
            </form>
          </Enthuellen>
        ) : (
          <Enthuellen className="rueckruf__aus">
            <p className="t-body">
              Das Formular ist noch nicht angeschlossen — es fehlt der Endpunkt, der die Anfragen
              entgegennimmt, und der muss in der EU stehen. Bis dahin geht es nur über das Telefon, und das
              ist ohnehin schneller.
            </p>
            {telefonSteht ? (
              <a className="knopf" href={telefon}>
                {praxis.telefon.anzeige} anrufen
              </a>
            ) : (
              <p className="rueckruf__luecke">
                <span className="luecke">Telefonnummer der Praxis</span>
              </p>
            )}
          </Enthuellen>
        )}
      </div>
    </section>
  );
}
