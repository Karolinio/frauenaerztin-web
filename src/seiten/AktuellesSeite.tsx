import { aktuelles } from '../inhalt';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import './aktuelles.css';

/**
 * Aktuelles. Inhalt aus `inhalt/aktuelles.json` — sie pflegt ihn selbst.
 *
 * Sortiert nach Datum, nicht nach Position in der Datei (siehe `src/inhalt.ts`).
 * Ein nachgetragener älterer Beitrag rutscht damit von selbst nach unten, statt
 * oben zu stehen, weil er zuletzt getippt wurde.
 */
const FORMAT = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function AktuellesSeite() {
  return (
    <>
      <Seitenkopf
        etikett="Aktuelles"
        titel="Was gerade gilt"
        einleitung={
          <p>
            Urlaub, Vertretung, kurzfristig geänderte Sprechzeiten. Wenn hier nichts steht, gelten die
            normalen Zeiten.
          </p>
        }
      />

      <div className="schale aktuelles">
        {aktuelles.map((m) => (
          <Enthuellen als="article" key={m.datum + m.titel} className="meldung">
            <div className="meldung__kopf">
              {/* `dateTime` macht das Datum maschinenlesbar — für Screenreader,
                  die „15.8." sonst als Zahlenfolge vorlesen, und für Google. */}
              <time className="t-meta meldung__datum" dateTime={m.datum}>
                {FORMAT.format(new Date(m.datum))}
              </time>
              <span className="t-label meldung__rubrik">{m.art}</span>
            </div>
            <div className="meldung__text">
              <h2 className="t-unter">{m.titel}</h2>
              <p className="t-body meldung__satz">{m.text}</p>
            </div>
          </Enthuellen>
        ))}
      </div>
    </>
  );
}
