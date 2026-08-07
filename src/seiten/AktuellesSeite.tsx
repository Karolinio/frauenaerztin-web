import { MELDUNGEN, gilt, type Meldung } from '../daten/aktuelles';
import './aktuelles.css';

const DATUM = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });

/**
 * Aktuelles — Urlaub, Vertretung, geänderte Sprechzeiten.
 *
 * ═══ Die Seite, die Yvonne zuerst genannt hat ═══
 *
 * „Team/Leistungen/Aktuelles/Impressum" — erste Nachricht, 04.08. Im ersten Entwurf
 * fehlte sie. Ihre Referenz zeigt, wofür: gynpraxisbonn.de öffnet mit einem Kasten
 * „WIR MACHEN URLAUB", samt Vertretungspraxen und Telefonnummern.
 *
 * Das ist Praxisorganisation, keine Nachricht. Sie muss ohne uns änderbar sein —
 * sonst ruft sie dreimal im Jahr an und wartet auf einen Rückruf, um zwei Zeilen zu
 * ändern. Genau dafür ist der Eimer `news` im CMS da.
 *
 * ═══ Warum abgelaufene Meldungen verschwinden ═══
 *
 * Die Urlaubsmeldung vom letzten Sommer, die im Januar noch oben steht, kostet nicht
 * Vertrauen — sie kostet Termine. Wer „geschlossen" liest, ruft nicht an. Deshalb
 * verfällt ein Hinweis von selbst, sobald sein `bis` vorbei ist. Niemand muss daran
 * denken, und das ist der Punkt: niemand denkt daran.
 */
export default function AktuellesSeite() {
  const jetzt = new Date();
  const gueltig = MELDUNGEN.filter((m) => gilt(m, jetzt)).sort((a, b) => b.datum.localeCompare(a.datum));

  return (
    <section className="section aktuelles" id="aktuelles" aria-labelledby="aktuelles-titel">
      <div className="shell">
        <p className="t-label">Aktuelles</p>
        <h2 className="t-section" id="aktuelles-titel">
          Was gerade in der Praxis gilt.
        </h2>

        {!gueltig.length && (
          <p className="t-lead aktuelles__leer">
            Zurzeit gibt es nichts Besonderes zu melden — die Praxis ist zu den üblichen
            Zeiten geöffnet. Urlaub, Vertretungen und geänderte Sprechzeiten stehen hier,
            sobald sie feststehen.
          </p>
        )}

        {gueltig.length > 0 && (
          <ol className="aktuelles__liste">
            {gueltig.map((m: Meldung) => (
              <li className="meldung" key={`${m.datum}-${m.titel}`} data-art={m.art}>
                {/* Das Datum maschinenlesbar: Suchmaschinen und Vorlesegeräte lesen
                    `datetime`, Menschen den ausgeschriebenen Monat. */}
                <time className="meldung__datum" dateTime={m.datum}>
                  {DATUM.format(new Date(`${m.datum}T12:00:00`))}
                </time>
                <h3 className="meldung__titel">{m.titel}</h3>
                <p className="meldung__text">{m.text}</p>
                {m.bis && (
                  <p className="meldung__bis">
                    Gilt bis einschließlich {DATUM.format(new Date(`${m.bis}T12:00:00`))}.
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
