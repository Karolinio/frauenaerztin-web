import { praxis, rechtliches } from '../praxis.config';
import { Offen, Rechtsseite } from './Rechtsseite';

/**
 * Gerüst nach § 5 DDG plus den Angaben, die für Heilberufe dazukommen
 * (Berufsbezeichnung, verleihender Staat, Kammer, KV, Berufsordnung) sowie
 * der Versicherungsangabe nach § 2 DL-InfoV.
 *
 * Nichts hiervon ist erfunden oder aus einem Generator kopiert. Alles, was
 * die Praxis beisteuern muss, steht sichtbar markiert in praxis.config.ts.
 * Vor dem Livegang gehört diese Seite anwaltlich geprüft.
 */
export function Impressum() {
  return (
    <Rechtsseite titel="Impressum" stand={null}>
      <section aria-labelledby="anbieter">
        <h2 id="anbieter">Angaben nach § 5 DDG</h2>
        <p>
          <Offen was="Name der Ärztin">
            {praxis.aerztin.titel} {praxis.aerztin.nachname}
          </Offen>
          <br />
          <Offen was="Berufsbezeichnung laut Kammerurkunde">{praxis.aerztin.fachbezeichnung}</Offen>
          <br />
          <Offen was="Strasse und Hausnummer">{praxis.adresse.strasse}</Offen>
          <br />
          <Offen was="Postleitzahl">{praxis.adresse.plz}</Offen> {praxis.adresse.ort}
        </p>
      </section>

      <section aria-labelledby="kontakt">
        <h2 id="kontakt">Kontakt</h2>
        <dl>
          <dt>Telefon</dt>
          <dd>
            <Offen was="Telefonnummer">{praxis.telefon.anzeige}</Offen>
          </dd>
          <dt>E-Mail</dt>
          <dd>
            <Offen was="E-Mail-Adresse">{praxis.email}</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="beruf">
        <h2 id="beruf">Berufsrechtliche Angaben</h2>
        <dl>
          <dt>Berufsbezeichnung</dt>
          <dd>
            <Offen was="z. B. Fachärztin für Frauenheilkunde und Geburtshilfe">
              {rechtliches.berufsbezeichnung}
            </Offen>
          </dd>
          <dt>Verliehen in</dt>
          <dd>{rechtliches.verleihenderStaat}</dd>
          <dt>Zuständige Ärztekammer</dt>
          <dd>
            <Offen>{rechtliches.aerztekammer}</Offen> — <Offen>{rechtliches.aerztekammerUrl}</Offen>
          </dd>
          <dt>Zuständige Kassenärztliche Vereinigung</dt>
          <dd>
            <Offen>{rechtliches.kassenaerztlicheVereinigung}</Offen> —{' '}
            <Offen>{rechtliches.kassenaerztlicheVereinigungUrl}</Offen>
          </dd>
          <dt>Berufsrechtliche Regelungen</dt>
          <dd>
            Berufsordnung der zuständigen Ärztekammer, Heilberufsgesetz des Landes, Heilmittelwerbegesetz
            (HWG). Volltext der Berufsordnung: <Offen>{rechtliches.berufsordnungUrl}</Offen>
          </dd>
          <dt>Aufsichtsbehörde</dt>
          <dd>
            <Offen>{rechtliches.aufsichtsbehoerde}</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="versicherung">
        <h2 id="versicherung">Berufshaftpflichtversicherung</h2>
        <dl>
          <dt>Versicherer</dt>
          <dd>
            <Offen>{rechtliches.berufshaftpflicht}</Offen>
          </dd>
          <dt>Räumlicher Geltungsbereich</dt>
          <dd>
            <Offen>{rechtliches.berufshaftpflichtGeltung}</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="steuer">
        <h2 id="steuer">Umsatzsteuer</h2>
        <p>
          <Offen>{rechtliches.umsatzsteuerId}</Offen>
        </p>
        <p className="recht__notiz">
          Heilbehandlungen sind nach § 4 Nr. 14 UStG regelmäßig umsatzsteuerfrei. Ob eine
          Umsatzsteuer-Identifikationsnummer besteht, muss die Praxis prüfen.
        </p>
      </section>

      <section aria-labelledby="verantwortlich">
        <h2 id="verantwortlich">Verantwortlich für den Inhalt</h2>
        <p>
          <Offen was="Name der Ärztin">
            {praxis.aerztin.titel} {praxis.aerztin.nachname}
          </Offen>
          , Anschrift wie oben.
        </p>
      </section>

      <section aria-labelledby="streit">
        <h2 id="streit">Streitbeilegung</h2>
        <p>
          Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle bin ich
          nicht verpflichtet und nicht bereit.
        </p>
        <p className="recht__notiz">
          <Offen was="Teilnahme an der Verbraucherschlichtung bestätigen" /> Falls die Praxis teilnimmt, muss
          hier die zuständige Stelle mit Anschrift und Website stehen. Für Behandlungsfehlervorwürfe sind
          zusätzlich die Gutachterkommissionen und Schlichtungsstellen der Ärztekammern zuständig.
        </p>
      </section>

      <section aria-labelledby="bilder">
        <h2 id="bilder">Bildnachweis</h2>
        {/*
          Dieser Absatz stand vorher anders da: „Die auf dieser Website gezeigten
          Räume sind Visualisierungen." Das war für die erste Fassung richtig und
          ist für diese falsch — es werden keine Räume gezeigt. Ein Bildnachweis,
          der etwas anderes behauptet als die Seite zeigt, ist auf einer
          Pflichtseite kein Schönheitsfehler.
        */}
        <p>
          Diese Website zeigt <strong>keine Fotografien der Praxisräume</strong>. Die Praxis wird derzeit
          gebaut und ist noch nicht fotografiert. Die abgebildeten Flächen — Kalkputz, Leinen, Licht auf
          hellem Boden — sind computergenerierte Material- und Lichtstudien ohne erkennbaren Ort. Sie zeigen
          die Materialien und die Lichtstimmung, nicht die Räume.
        </p>
        <p>
          Sobald die Praxis fotografiert ist, treten die Fotografien an dieselben Stellen. Ein Bild einer
          Person ist auf dieser Website nicht computergeneriert und wird es nicht sein.
        </p>
      </section>

      <p className="recht__warnung">
        Dieses Impressum ist ein Gerüst und noch nicht vollständig. Alle markierten Stellen müssen eingetragen
        und die Seite vor der Veröffentlichung anwaltlich geprüft werden. Bei Heilberufen gehören dazu
        zwingend die zuständige Ärztekammer, die Berufsbezeichnung mit dem Staat ihrer Verleihung und der
        Fundort der Berufsordnung.
      </p>
    </Rechtsseite>
  );
}
