import { praxis, rechtliches } from '../praxis.config';
import { Offen, Rechtsseite } from './Rechtsseite';

/**
 * Gerüst für die Datenschutzerklärung dieser Website.
 *
 * Bewusst nur die Verarbeitungen, die diese Website tatsächlich auslöst —
 * keine Textbausteine für Dienste, die hier nicht laufen. Es gibt kein
 * Tracking, keine Cookies, keine externen Schriften und keine Karte ohne
 * Klick; genau das steht auch drin.
 *
 * Die Verarbeitung von Patientendaten in der Praxis selbst ist etwas anderes
 * und gehört nicht in diese Erklärung.
 */
export function Datenschutz() {
  return (
    <Rechtsseite titel="Datenschutzerklärung" stand={null}>
      <section aria-labelledby="verantwortlich">
        <h2 id="verantwortlich">Verantwortliche Stelle</h2>
        <p>
          <Offen>
            {praxis.aerztin.titel} {praxis.aerztin.nachname}
          </Offen>
          , <Offen was="Strasse und Hausnummer">{praxis.adresse.strasse}</Offen>,{' '}
          <Offen>
            {praxis.adresse.plz} {praxis.adresse.ort}
          </Offen>
          , Telefon <Offen was="Telefonnummer">{praxis.telefon.anzeige}</Offen>, E-Mail{' '}
          <Offen was="E-Mail-Adresse">{praxis.email}</Offen>.
        </p>
        <dl>
          <dt>Datenschutzbeauftragte Person</dt>
          <dd>
            <Offen>{rechtliches.datenschutzbeauftragter}</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="hosting">
        <h2 id="hosting">Aufruf der Website und Server-Logfiles</h2>
        <p>
          Beim Aufruf dieser Website überträgt Ihr Browser technisch notwendige Daten an den Server:
          IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, übertragene Datenmenge, Browsertyp und
          Betriebssystem. Diese Daten sind für die Auslieferung der Seite erforderlich.
        </p>
        <dl>
          <dt>Rechtsgrundlage</dt>
          <dd>Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am sicheren Betrieb der Website.</dd>
          <dt>Speicherdauer</dt>
          <dd>
            <Offen>[Speicherdauer der Logfiles beim Hoster]</Offen>
          </dd>
          <dt>Auftragsverarbeiter</dt>
          <dd>
            <Offen>{rechtliches.hostingAnbieter}</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="formular">
        <h2 id="formular">Rückrufformular</h2>
        <p>
          Wenn Sie das Rückrufformular nutzen, werden genau drei Angaben übertragen: Ihr Name, Ihre
          Telefonnummer und der von Ihnen gewählte Zeitraum. Ein Freitextfeld gibt es bewusst nicht — Angaben
          zu Beschwerden oder Befunden wären Gesundheitsdaten nach Art. 9 DSGVO und gehören nicht in ein
          Webformular.
        </p>
        <dl>
          <dt>Zweck</dt>
          <dd>Rückruf zur Terminvereinbarung. Keine andere Verwendung, keine Weitergabe.</dd>
          <dt>Rechtsgrundlage</dt>
          <dd>Art. 6 Abs. 1 lit. a DSGVO — Ihre Einwilligung, die Sie im Formular ausdrücklich erteilen.</dd>
          <dt>Speicherdauer</dt>
          <dd>
            <Offen>{rechtliches.speicherdauerRueckruf}</Offen>
          </dd>
          <dt>Widerruf</dt>
          <dd>
            Sie können die Einwilligung jederzeit formlos widerrufen, telefonisch oder per E-Mail. Die
            Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt.
          </dd>
          <dt>Empfänger</dt>
          <dd>
            <Offen>[Anbieter des Formular-Endpunkts, Sitz in der EU, Auftragsverarbeitungsvertrag]</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="karte">
        <h2 id="karte">Karte</h2>
        <p>
          Auf der Seite „Praxis &amp; Anfahrt" ist eine Karte von OpenStreetMap eingebunden. Sie wird erst
          geladen, wenn Sie ausdrücklich darauf klicken. Vorher geht kein Request an openstreetmap.org, auch
          keine Vorschaukachel. Mit dem Klick wird Ihre IP-Adresse an die OpenStreetMap Foundation übertragen.
        </p>
        <dl>
          <dt>Rechtsgrundlage</dt>
          <dd>Art. 6 Abs. 1 lit. a DSGVO — Ihre Einwilligung durch den Klick.</dd>
        </dl>
      </section>

      <section aria-labelledby="keine">
        <h2 id="keine">Was diese Website nicht tut</h2>
        <ul>
          <li>Keine Cookies. Es wird nichts auf Ihrem Gerät gespeichert.</li>
          <li>Keine Analyse-, Tracking- oder Werbedienste.</li>
          <li>
            Keine Schriften von fremden Servern. Alle Schriften liegen auf demselben Server wie die Seite.
          </li>
          <li>Keine sozialen Netzwerke, keine eingebetteten Videos von Drittanbietern.</li>
        </ul>
      </section>

      <section aria-labelledby="rechte">
        <h2 id="rechte">Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21
          DSGVO). Wenden Sie sich dafür an die oben genannte verantwortliche Stelle.
        </p>
        <p>
          Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig ist:{' '}
          <Offen>{rechtliches.datenschutzAufsicht}</Offen>
        </p>
      </section>

      <p className="recht__warnung">
        Diese Erklärung ist ein Gerüst und noch nicht vollständig. Alle markierten Stellen müssen eingetragen
        und die Seite vor der Veröffentlichung datenschutzrechtlich geprüft werden — insbesondere dann, wenn
        der Formular-Endpunkt feststeht.
      </p>
    </Rechtsseite>
  );
}
