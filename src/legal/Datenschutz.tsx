import { aerztinVollerName, praxis, rechtliches } from '../praxis.config';
import { Offen, Rechtsseite } from './Rechtsseite';

/**
 * Gerüst für die Datenschutzerklärung dieser Website.
 *
 * Bewusst nur die Verarbeitungen, die diese Website tatsächlich auslöst —
 * keine Textbausteine für Dienste, die hier nicht laufen. Es gibt kein
 * Tracking, keine Cookies, keine externen Schriften und keine Karte ohne
 * Klick; genau das steht auch drin.
 *
 * Am 13.10.2026 nach dem Prüfbericht ihres IT-Dienstleisters (Stand 06.10.)
 * ergänzt: Cloudflare als US-Anbieter, Fehlerberichte (NEL), Anfragen per
 * Telefon/Mail, Maps-Link, Widerspruchsrecht. Bleibt ein Entwurf, bis er
 * rechtlich geprüft ist.
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
          <Offen was="Vollständiger Name der Ärztin">{aerztinVollerName}</Offen>,{' '}
          <Offen was="Strasse und Hausnummer">{praxis.adresse.strasse}</Offen>,{' '}
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
          Diese Website wird über den Dienst Cloudflare Pages ausgeliefert. Beim Aufruf überträgt Ihr Browser
          technisch notwendige Daten an Cloudflare: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse,
          übertragene Datenmenge, Browsertyp und Betriebssystem. Diese Daten sind für die Auslieferung der
          Seite und für ihren sicheren Betrieb erforderlich.
        </p>
        <p>
          Cloudflare verarbeitet diese Daten in unserem Auftrag auf Grundlage eines Vertrags zur
          Auftragsverarbeitung (Art. 28 DSGVO). Die Verarbeitung kann auch außerhalb der Europäischen Union
          stattfinden, insbesondere in den USA. Cloudflare, Inc. ist nach dem EU-US Data Privacy Framework
          zertifiziert; für die USA besteht damit ein Angemessenheitsbeschluss der EU-Kommission (Art. 45
          DSGVO). Ergänzend sind die EU-Standardvertragsklauseln vereinbart (Art. 46 Abs. 2 lit. c DSGVO).
        </p>
        <dl>
          <dt>Rechtsgrundlage</dt>
          <dd>Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am sicheren Betrieb der Website.</dd>
          <dt>Speicherdauer</dt>
          <dd>
            <Offen was="Speicherdauer der Logfiles bei Cloudflare">{rechtliches.logSpeicherdauer}</Offen>
          </dd>
          <dt>Auftragsverarbeiter</dt>
          <dd>
            <Offen>{rechtliches.hostingAnbieter}</Offen>
          </dd>
        </dl>
      </section>

      {/* Prüfbericht 06.10.2026, Punkt 03: Cloudflare schickt einen NEL-Header mit
          (gemessen 13.10. auf vorschau und gyn-erkens.de, success_fraction 0.0 —
          also nur bei Fehlern). Solange er aktiv ist, steht er hier. Wird er im
          Cloudflare-Konto abgeschaltet, gehört dieser Abschnitt raus. */}
      <section aria-labelledby="fehlerberichte">
        <h2 id="fehlerberichte">Technische Fehlerberichte</h2>
        <p>
          Cloudflare nutzt die Browserfunktion „Network Error Logging". Kann Ihr Browser diese Website nicht
          oder nur fehlerhaft laden, sendet er einen technischen Fehlerbericht an Cloudflare. Der Bericht
          enthält die Art des Fehlers, die aufgerufene Adresse und den Zeitpunkt; dabei erhält Cloudflare
          auch Ihre IP-Adresse. Bei einem fehlerfreien Aufruf wird kein Bericht gesendet. Zweck ist, Störungen
          bei der Erreichbarkeit der Website zu erkennen und zu beheben.
        </p>
        <dl>
          <dt>Rechtsgrundlage</dt>
          <dd>Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an einer zuverlässig erreichbaren Website.</dd>
        </dl>
      </section>

      {/* Der Abschnitt zum Rückrufformular ist mit dem Formular gegangen
          (17.09.2026). Die Seite erhebt keine Formulardaten mehr. */}

      {/* Prüfbericht 06.10.2026, Punkte 04 und 05: Anfragen per Telefon und Mail
          fehlten ganz. Entwurf — mit ihren Patienteninformationen abstimmen. */}
      <section aria-labelledby="anfragen">
        <h2 id="anfragen">Kontakt per Telefon, Fax oder E-Mail</h2>
        <p>
          Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben, etwa Name, Kontaktdaten und Ihr
          Anliegen, um Ihre Anfrage zu beantworten und gegebenenfalls einen Termin zu vereinbaren. Die
          Angaben werden gelöscht, sobald sie dafür nicht mehr erforderlich sind. Werden sie Teil Ihrer
          Behandlungsdokumentation, gelten die gesetzlichen Aufbewahrungsfristen.
        </p>
        <dl>
          <dt>Rechtsgrundlage</dt>
          <dd>
            Art. 6 Abs. 1 lit. b DSGVO (Anbahnung und Durchführung des Behandlungsvertrags); soweit Sie uns
            Angaben zu Ihrer Gesundheit mitteilen, zusätzlich Art. 9 Abs. 2 lit. h DSGVO.
          </dd>
        </dl>
        <p>
          Bitte beachten Sie: Eine gewöhnliche E-Mail wird nicht durchgehend verschlüsselt übertragen. Schicken
          Sie uns Befunde oder andere Gesundheitsdaten deshalb bitte nicht per E-Mail, sondern sprechen Sie uns
          an.
        </p>
        <p>
          Wie wir in der Praxis mit Ihren Behandlungsdaten umgehen, erfahren Sie aus unseren
          Patienteninformationen zum Datenschutz, die in der Praxis ausliegen.
        </p>
      </section>

      {/*
        ═══ Diese Seite beschrieb eine Karte, die es nicht gibt ═══
        Seit 13.10.2026 (Prüfbericht, Punkt 04) beschreibt sie den Link, den es gibt.
      */}
      <section aria-labelledby="karte">
        <h2 id="karte">Link zu Google Maps</h2>
        <p>
          Diese Website bindet <strong>keine Karte</strong> ein. Auf der Seite „Kontakt und Anfahrt" und in der
          Fußzeile führt ein Link zur Routenplanung bei Google Maps. Solange Sie ihn nicht anklicken, wird
          keine Verbindung zu Google aufgebaut und keine Information an Google übertragen.
        </p>
        <p>
          Erst wenn Sie den Link anklicken, öffnen Sie eine Seite von Google. Für die Verarbeitung dort ist
          Google verantwortlich (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland); es
          gilt die Datenschutzerklärung von Google.
        </p>
        <p className="recht__notiz">
          Sollte später eine eingebettete Karte dazukommen, wird sie erst nach ausdrücklicher Einwilligung
          geladen, und dieser Abschnitt wird vorher entsprechend ergänzt.
        </p>
      </section>

      <section aria-labelledby="keine">
        <h2 id="keine">Was diese Website nicht tut</h2>
        <ul>
          <li>
            Keine Cookies und kein lokaler Speicher: Die Website setzt keine Cookies und legt keine Daten im
            Speicher Ihres Browsers ab. Wie bei jeder Website kann Ihr Browser die Dateien der Seite
            zwischenspeichern (Cache), damit sie beim nächsten Aufruf schneller lädt.
          </li>
          <li>Keine Analyse-, Tracking- oder Werbedienste.</li>
          <li>
            Keine Schriften von fremden Servern. Alle Schriften liegen auf demselben Server wie die Seite.
          </li>
          <li>Keine Formulare, keine sozialen Netzwerke, keine eingebetteten Videos von Drittanbietern.</li>
        </ul>
      </section>

      <section aria-labelledby="rechte">
        <h2 id="rechte">Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20 DSGVO). Wenden Sie sich
          dafür an die oben genannte verantwortliche Stelle.
        </p>
        <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
        <p>
          Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten (Server-Logfiles und
          technische Fehlerberichte), können Sie dieser Verarbeitung jederzeit aus Gründen widersprechen, die
          sich aus Ihrer besonderen Situation ergeben. Wir verarbeiten die Daten dann nicht mehr, es sei denn,
          es liegen zwingende schutzwürdige Gründe für die Verarbeitung vor, die Ihre Interessen überwiegen,
          oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
          Ein formloser Hinweis an die oben genannte Kontaktadresse genügt.
        </p>
        <p>
          Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO).
          Zuständig ist: <Offen>{rechtliches.datenschutzAufsicht}</Offen>
        </p>
      </section>

      <p className="recht__warnung">
        Diese Erklärung ist ein Gerüst und noch nicht vollständig. Alle markierten Stellen müssen eingetragen
        und die Seite vor der Veröffentlichung datenschutzrechtlich geprüft werden.
      </p>
    </Rechtsseite>
  );
}
