import { praxis } from '../../praxis.config';
import { weg } from '../../lib/weg';
import './marke.css';

/**
 * Die Marke: heute eine Wortmarke aus Fraunces, später ihr Logo.
 *
 * ═══ Warum kein Kasten mit „LOGO" darin ═══
 *
 * Sie schrieb: „Logo: ist hoffentlich bald fertig, würde ich dir zukommen
 * lassen, sobald es final steht." Bis dahin steht hier eine echte Wortmarke —
 * gesetzt, nicht geparkt. Ein leerer Kasten mit „LOGO" sagt ihr beim ersten
 * Blick auf den Entwurf, dass nichts fertig ist, und das stimmt nicht: fertig
 * ist alles ausser dem Logo.
 *
 * Die Wortmarke ist absichtlich so gebaut, dass sie **auch bleiben könnte**:
 * Fraunces, `opsz 72` (die grosse optische Grösse, offenere Formen), `wght 400`,
 * und eine leicht geöffnete Laufweite, weil eine Wortmarke atmen muss, wo ein
 * Fliesstext eng laufen soll.
 *
 * ═══ Warum „Praxis für Frauenheilkunde" ═══
 *
 * Weil der Eigenname noch nicht feststeht und ein erfundener das Schlimmste
 * wäre, was man in eine Kopfzeile setzen kann — er stünde auf jeder Seite und
 * würde beim Ausliefern übersehen. „Praxis für Frauenheilkunde" ist dagegen
 * keine Erfindung, sondern eine Beschreibung, und sie ist wahr. Sobald
 * `praxis.name` gesetzt ist, tritt der Eigenname an ihre Stelle — eine Zeile.
 *
 * ═══ Der Tausch gegen das Logo ═══
 *
 * Sobald `praxis.logo` gesetzt ist, rendert diese Komponente ein `<img>` statt
 * des Textes. Aufrufer ändern sich nicht, Layout ändert sich nicht, CSS ändert
 * sich nicht. Deshalb gibt es diese Komponente überhaupt.
 */

/** Der beschreibende Name, solange der Eigenname aussteht. Keine Erfindung. */
const WORTMARKE = 'Praxis für Frauenheilkunde';

export function Marke({ alsUeberschrift = false }: { alsUeberschrift?: boolean }) {
  const logo = praxis.logo;

  const inhalt = logo ? (
    <img className="marke__logo" src={weg(logo.src)} width={logo.breite} height={logo.hoehe} alt={logo.alt} />
  ) : (
    <>
      <span className="marke__kante" aria-hidden="true" />
      <span className="marke__name">{praxis.name ?? WORTMARKE}</span>
    </>
  );

  /*
   * Auf der Startseite ist die Marke Teil der Überschrift und darf nicht auf
   * sich selbst verweisen — ein Verweis auf die Seite, auf der man steht, ist
   * für Screenreader-Nutzerinnen eine Sackgasse mit Ankündigung.
   *
   * Sie ist dort ausserdem deutlich grösser als die in der Kopfzeile. Zwei
   * gleich grosse Wiederholungen 40px übereinander liest man als doppelt
   * gerendertes Element; zwei verschieden grosse als Hierarchie.
   */
  if (alsUeberschrift) return <span className="marke marke--gross">{inhalt}</span>;

  return (
    <a className="marke" href={weg('/')}>
      {inhalt}
      <span className="nur-vorlesen"> — zur Startseite</span>
    </a>
  );
}
