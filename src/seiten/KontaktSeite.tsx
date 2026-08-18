import { praxis, notruf } from '../praxis.config';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { Rueckruf } from '../components/kontakt/Rueckruf';
import { steht } from '../components/ui/Angabe';
import { weg } from '../lib/weg';
import './kontakt.css';

/**
 * Kontakt und Anfahrt. Neu angelegt — vorher steckte das in /praxis/, wo den
 * Weg niemand sucht.
 *
 * ═══ Warum die Notrufnummern GANZ OBEN stehen ═══
 *
 * Weil jemand, der sie braucht, nicht scrollt. Er sucht die grösste Zahl auf
 * dem Bildschirm.
 *
 * In der alten Fassung dieses Repos standen sie ganz unten und waren mit 40px
 * die KLEINSTEN Tippziele der ganzen Seite. Das war nicht bloss ein
 * Barrierefreiheitsverstoss — das war die Umkehrung der Dringlichkeit.
 */
export default function KontaktSeite() {
  const anschriftSteht = steht(praxis.adresse.strasse) && steht(praxis.adresse.plz);
  const telefon = praxis.telefon.href;
  const telefonSteht = steht(telefon) && steht(praxis.telefon.anzeige);

  return (
    <>
      <Seitenkopf etikett="Kontakt und Anfahrt" titel={`So erreichen Sie mich in ${praxis.ort}`} />

      <section className="notfall" aria-labelledby="notfall-titel">
        <div className="schale">
          <h2 id="notfall-titel" className="t-label notfall__titel">
            Wenn es nicht warten kann
          </h2>
          <ul className="notfall__liste">
            {[notruf.rettung, notruf.bereitschaft, notruf.hilfetelefon].map((n) => (
              <li key={n.anzeige}>
                <a className="notfall__ruf" href={n.href}>
                  <span className="notfall__nummer">{n.anzeige}</span>
                  <span className="notfall__was">{n.titel}</span>
                  <span className="t-meta notfall__wann">{n.wann}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sektion" aria-labelledby="erreichen-titel">
        <div className="schale kontakt__raster">
          <Enthuellen>
            <h2 id="erreichen-titel" className="t-section">
              Praxis
            </h2>
            <address className="kontakt__adresse">
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

            <dl className="kontakt__daten">
              <dt className="t-label">Telefon</dt>
              <dd>
                {telefonSteht ? (
                  <a className="kontakt__gross" href={telefon}>
                    {praxis.telefon.anzeige}
                  </a>
                ) : (
                  <span className="luecke">Telefonnummer</span>
                )}
              </dd>

              <dt className="t-label">Telefonzeiten</dt>
              <dd className="t-body">
                {praxis.telefonzeiten ?? <span className="luecke">stehen noch nicht fest</span>}
              </dd>

              <dt className="t-label">E-Mail</dt>
              <dd className="t-body">
                {steht(praxis.email) ? (
                  <a className="link" href={`mailto:${praxis.email}`}>
                    {praxis.email}
                  </a>
                ) : (
                  <span className="luecke">E-Mail-Adresse</span>
                )}
                <span className="t-meta kontakt__nachsatz">
                  Bitte keine Beschwerden, Befunde oder Diagnosen per E-Mail — eine normale E-Mail ist nicht
                  verschlüsselt. Sowas gehört ans Telefon.
                </span>
              </dd>
            </dl>
          </Enthuellen>

          <Enthuellen verzoegerung={80}>
            <h2 className="t-section">Anfahrt</h2>
            <dl className="kontakt__daten">
              <dt className="t-label">Mit dem Auto</dt>
              <dd className="t-body">
                <span className="luecke">Zufahrt und Parkmöglichkeiten eintragen</span>
              </dd>

              <dt className="t-label">Mit Bus und Bahn</dt>
              <dd className="t-body">
                <span className="luecke">Linie, Haltestelle und Fussweg eintragen</span>
              </dd>

              <dt className="t-label">Barrierefreiheit</dt>
              <dd className="t-body">
                Was nachgemessen ist, steht unter{' '}
                <a className="link" href={weg('/praxis/')}>
                  Praxis
                </a>
                .
              </dd>
            </dl>

            {/* Keine eingebettete Karte, solange kein Einwilligungsdialog dafür
                steht: Google Maps lädt beim Öffnen der Seite die IP-Adresse der
                Besucherin in die USA. Auf einer Arztseite ist das die
                unnötigste Datenübertragung überhaupt — die Anschrift tut es. */}
            <p className="t-meta kontakt__karte">
              Eine eingebettete Karte gibt es hier bewusst nicht: sie würde Ihre IP-Adresse an einen fremden
              Anbieter senden, bevor Sie irgendetwas angeklickt haben.
            </p>
          </Enthuellen>
        </div>
      </section>

      <Rueckruf />
    </>
  );
}
