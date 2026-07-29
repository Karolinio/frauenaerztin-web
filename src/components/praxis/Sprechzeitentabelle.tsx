import { sprechzeiten } from '../../praxis.config';

const GESCHLOSSEN = '—';

/**
 * Sprechzeiten als echte Tabelle mit Kopfzellen und Beschriftung — nicht als
 * Reihe von Divs. Vorlesesoftware liest damit „Mittwoch, Vormittag, 08:00 bis
 * 13:00" statt einer Zahlenkette.
 */
export function Sprechzeitentabelle() {
  return (
    <table className="zeiten">
      <caption className="zeiten__caption">
        Sprechzeiten. Alle Termine nach Vereinbarung — ohne Termin ist die Praxis nicht besetzt.
      </caption>
      <thead>
        <tr>
          <th scope="col">Tag</th>
          <th scope="col">Vormittag</th>
          <th scope="col">Nachmittag</th>
        </tr>
      </thead>
      <tbody>
        {sprechzeiten.map((zeile) => (
          <tr key={zeile.tag}>
            <th scope="row">
              {zeile.tag}
              {zeile.hinweis ? <span className="zeiten__hinweis">{zeile.hinweis}</span> : null}
            </th>
            <td data-leer={zeile.vormittag ? undefined : true}>{zeile.vormittag ?? GESCHLOSSEN}</td>
            <td data-leer={zeile.nachmittag ? undefined : true}>{zeile.nachmittag ?? GESCHLOSSEN}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
