import { zeiten, hatZeiten, istHeute, zeitenStehenAus } from '../../inhalt';
import './sprechzeiten.css';

/**
 * Die Sprechzeitentabelle. Das Raster stammt aus dem Mutterpass: Zeile je Tag,
 * zwei Zeitspalten, Haarlinien dazwischen, Ziffern mit fester Breite.
 *
 * Vertrautheit als Mittel, nicht als Zitat — jede Frau in der Zielgruppe hatte
 * dieses Raster schon in der Hand.
 *
 * ═══ Der heutige Tag trägt das Signal ═══
 *
 * Er ist die einzige Zeile, die eine Besucherin JETZT braucht. Genau dafür ist
 * das Signal da: es markiert den nächsten Schritt.
 *
 * Es ist aber nie das einzige Merkmal — die Zeile bekommt zusätzlich eine
 * Fläche und das Wort „heute". Für eine Farbenblinde ist eine grüne Zeile
 * zwischen fünf grauen keine Angabe.
 *
 * ═══ Warum die Tabelle auch ohne Zeiten steht ═══
 *
 * Weil sie sonst nach dem Eintragen anders aussähe als vorher, und weil die
 * Ärztin sehen soll, wohin sie schreibt. Statt geratener Uhrzeiten steht in
 * jeder Zeile eine sichtbare Lücke.
 */
export function Sprechzeiten() {
  return (
    <div className="zeiten">
      {zeitenStehenAus ? (
        <p className="t-body zeiten__ausstehend">
          Die Sprechzeiten stehen noch nicht fest. Sobald sie es tun, stehen sie hier — und in der Fusszeile
          jeder Seite.
        </p>
      ) : null}

      <table className="zeiten__tabelle">
        <caption className="nur-vorlesen">Sprechzeiten der Praxis, nach Wochentagen</caption>
        <thead>
          <tr>
            <th scope="col">Tag</th>
            <th scope="col">Vormittag</th>
            <th scope="col">Nachmittag</th>
          </tr>
        </thead>
        <tbody>
          {zeiten.map((z) => {
            const heute = istHeute(z);
            return (
              <tr key={z.tag} className={heute ? 'zeiten__heute' : undefined}>
                <th scope="row">
                  {z.tag}
                  {heute ? <span className="zeiten__marke">heute</span> : null}
                  {z.hinweis ? <span className="zeiten__zusatz">{z.hinweis}</span> : null}
                </th>
                {hatZeiten(z) ? (
                  <>
                    <td>{z.vormittag || <span className="zeiten__leer">—</span>}</td>
                    <td>{z.nachmittag || <span className="zeiten__leer">—</span>}</td>
                  </>
                ) : (
                  <td colSpan={2}>
                    <span className="luecke">Zeiten stehen noch nicht fest</span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
