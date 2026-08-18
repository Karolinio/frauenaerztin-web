import { praxis, notruf } from '../../praxis.config';
import { zeiten, hatZeiten, zeitenStehenAus } from '../../inhalt';
import { Enthuellen } from '../ui/Enthuellen';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';

/**
 * Der Terminblock. Der einzige gefüllte Knopf der Startseite.
 *
 * ═══ Warum er unten steht ═══
 *
 * Weil diese Zielgruppe sich nicht auf Zuruf entscheidet. Wer oben zum Termin
 * drängt, bevor die Leistungen gelesen sind, drängt. Der Knopf steht deshalb
 * dort, wo jemand ankommt, der überzeugt ist.
 *
 * ═══ Warum hier IMMER ein echter Knopf steht ═══
 *
 * In der ersten Fassung war der Hauptknopf die Lücke „Telefonnummer der Praxis",
 * weil die Nummer noch fehlt. Fachlich richtig — gestalterisch der Tod des
 * Abschnitts: der wichtigste Punkt der Seite war ein graues Kästchen, und die
 * einzige echte Schaltfläche war die zweitrangige daneben.
 *
 * Jetzt gilt: Nummer da → sie ist der Knopf. Nummer fehlt → der Knopf führt zu
 * den Zeiten, und die fehlende Nummer steht als Lücke darunter im Feldraster.
 * Der Abschnitt hat damit immer einen Brennpunkt, und die Lücke bleibt trotzdem
 * unübersehbar.
 *
 * ═══ Warum hier kein Doctolib ist ═══
 *
 * Weil sie ohne startet und es „ggf. später" dazunimmt. Ein Doctolib-Knopf ist
 * später EINE Zeile: `praxis.onlineTermin` setzen, fertig.
 */
export function TerminBlock() {
  const telefon = praxis.telefon.href;
  const telefonSteht = steht(telefon) && steht(praxis.telefon.anzeige);
  const naechsteZeiten = zeiten.filter(hatZeiten).slice(0, 3);

  return (
    <section className="sektion termin" aria-labelledby="termin-titel">
      <div className="schale termin__raster">
        <Enthuellen className="termin__text">
          <p className="t-label">Termin</p>
          <h2 id="termin-titel" className="t-section termin__titel">
            Einen Termin bekommen
          </h2>
          <p className="t-lead termin__lead">
            Termine gibt es am Telefon. Sagen Sie kurz, worum es geht — davon hängt ab, wie viel Zeit
            eingeplant wird.
          </p>

          <div className="termin__wege">
            {telefonSteht ? (
              <a className="knopf" href={telefon}>
                {praxis.telefon.anzeige} anrufen
              </a>
            ) : (
              <a className="knopf" href={weg('/termin/')}>
                Zeiten und Termin
              </a>
            )}

            {praxis.onlineTermin ? (
              <a className="knopf knopf--leise" href={praxis.onlineTermin.url}>
                Online buchen über {praxis.onlineTermin.anbieter}
              </a>
            ) : null}

            <a className="knopf knopf--leise" href={weg('/kontakt/')}>
              Anfahrt und Kontakt
            </a>
          </div>

          {/* Feldraster statt Fliesstextzeile. Wer nach Öffnungszeiten sucht,
              überfliegt — und eine Zeile mit drei Doppelpunkten überfliegt
              niemand. */}
          <dl className="termin__daten">
            <div className="termin__zeile">
              <dt>Telefon</dt>
              <dd>
                {telefonSteht ? (
                  <a className="link" href={telefon}>
                    {praxis.telefon.anzeige}
                  </a>
                ) : (
                  <span className="luecke">Telefonnummer</span>
                )}
              </dd>
            </div>
            <div className="termin__zeile">
              <dt>Telefonzeiten</dt>
              <dd>{praxis.telefonzeiten ?? <span className="luecke">stehen noch nicht fest</span>}</dd>
            </div>
            <div className="termin__zeile">
              <dt>Sprechzeiten</dt>
              <dd>
                {zeitenStehenAus ? (
                  <span className="luecke">stehen noch nicht fest</span>
                ) : (
                  <ul className="termin__zeitliste">
                    {naechsteZeiten.map((z) => (
                      <li key={z.tag}>
                        <span>{z.tag}</span>
                        <span className="termin__spanne">
                          {[z.vormittag, z.nachmittag].filter(Boolean).join(' · ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
          </dl>
        </Enthuellen>

        {/* Der Notfallhinweis steht bewusst NEBEN dem Termin und nicht am
            Seitenende: wer akut etwas hat, scrollt nicht weiter. */}
        <Enthuellen className="termin__notfall" verzoegerung={80}>
          <h3 className="t-label">Wenn es nicht warten kann</h3>
          <ul className="termin__notrufe">
            <li>
              <a href={notruf.bereitschaft.href}>
                <span className="termin__nummer">{notruf.bereitschaft.anzeige}</span>
                <span className="termin__wer">{notruf.bereitschaft.titel}</span>
              </a>
            </li>
            <li>
              <a href={notruf.rettung.href}>
                <span className="termin__nummer">{notruf.rettung.anzeige}</span>
                <span className="termin__wer">{notruf.rettung.titel}</span>
              </a>
            </li>
          </ul>
          <p className="t-meta termin__notfall-satz">
            Der Bereitschaftsdienst gilt, wenn die Praxis geschlossen hat und es nicht bis zum nächsten
            Werktag warten kann.
          </p>
        </Enthuellen>
      </div>
    </section>
  );
}
