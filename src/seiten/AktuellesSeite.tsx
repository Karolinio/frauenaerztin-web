import { aktuelles, giltNoch } from '../inhalt';
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

      {/*
        ═══ Zwei Dinge, die diese Seite vorher nicht tat ═══

        ERSTENS: Sie heisst „Was gerade gilt" und zeigte trotzdem abgelaufene
        Meldungen wie gueltige. Das Feld „Gilt bis" wurde nur auf der Startseite
        ausgewertet. Eine Patientin las im November eine Urlaubsvertretung vom
        Oktober und rief bei jemandem an, der nicht mehr zustaendig ist.
        Abgelaufene Meldungen verschwinden nicht — sie bleiben als Archiv
        stehen, aber sichtbar getrennt und gekennzeichnet.

        ZWEITENS: Alle Meldungen waren gleich gross. Die neueste ist die, wegen
        der jemand diese Seite aufruft — sie steht jetzt als Aufmacher. Dieselbe
        Hierarchie wie auf /team/, und hier ist sie noch zwingender: eine
        Nachrichtenliste ohne Aufmacher ist ein Stapel.
      */}
      <div className="schale aktuelles">
        {aktuelles.map((m, i) => (
          <Enthuellen
            als="article"
            key={m.datum + m.titel}
            className={`meldung ${i === 0 && giltNoch(m) ? 'meldung--aufmacher' : ''} ${
              giltNoch(m) ? '' : 'meldung--vorbei'
            }`}
          >
            <div className="meldung__kopf">
              {/* `dateTime` macht das Datum maschinenlesbar — für Screenreader,
                  die „15.8." sonst als Zahlenfolge vorlesen, und für Google. */}
              <time className="t-meta meldung__datum" dateTime={m.datum}>
                {FORMAT.format(new Date(m.datum))}
              </time>
              <span className="t-label meldung__rubrik">{m.art}</span>
              {giltNoch(m) ? null : <span className="t-label meldung__vorbei">Nicht mehr aktuell</span>}
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
