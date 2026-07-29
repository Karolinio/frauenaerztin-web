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
    <Rechtsseite titel="Impressum" stand="TODO Kunde — Datum der Freigabe">
      <section aria-labelledby="anbieter">
        <h2 id="anbieter">Angaben nach § 5 DDG</h2>
        <p>
          <Offen>
            {praxis.titel} {praxis.nachname}
          </Offen>
          <br />
          {praxis.fachbezeichnung}
          <br />
          <Offen>{praxis.adresse.strasse}</Offen>
          <br />
          <Offen>
            {praxis.adresse.plz} {praxis.adresse.ort}
          </Offen>
        </p>
      </section>

      <section aria-labelledby="kontakt">
        <h2 id="kontakt">Kontakt</h2>
        <dl>
          <dt>Telefon</dt>
          <dd>
            <Offen>{praxis.telefon.anzeige}</Offen>
          </dd>
          <dt>E-Mail</dt>
          <dd>
            <Offen>{praxis.email}</Offen>
          </dd>
        </dl>
      </section>

      <section aria-labelledby="beruf">
        <h2 id="beruf">Berufsrechtliche Angaben</h2>
        <dl>
          <dt>Berufsbezeichnung</dt>
          <dd>{rechtliches.berufsbezeichnung}</dd>
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
          <Offen>
            {praxis.titel} {praxis.nachname}
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
          TODO Kunde — bitte bestätigen. Falls die Praxis teilnimmt, muss hier die zuständige Stelle mit
          Anschrift und Website stehen. Für Behandlungsfehlervorwürfe sind zusätzlich die
          Gutachterkommissionen und Schlichtungsstellen der Ärztekammern zuständig.
        </p>
      </section>

      <section aria-labelledby="bilder">
        <h2 id="bilder">Bildnachweis</h2>
        <p>
          Die auf dieser Website gezeigten Räume sind Visualisierungen. Sie geben die Gestaltung der Praxis
          wieder, bilden sie aber nicht fotografisch ab. Vor dem Livegang werden sie entweder durch
          Fotografien ersetzt oder an jeder Stelle als Visualisierung gekennzeichnet.
        </p>
      </section>

      <p className="recht__warnung">
        Dieses Impressum ist ein Gerüst und noch nicht vollständig. Alle gelb markierten Stellen müssen
        eingetragen und die Seite vor der Veröffentlichung anwaltlich geprüft werden.
      </p>
    </Rechtsseite>
  );
}
