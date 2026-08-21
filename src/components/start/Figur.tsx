import { Zeichnung } from './Zeichnung';
import './figur.css';

/**
 * Die Figur aus ihrem Logo, gross, auf der Naht zwischen zwei Sektionen.
 *
 * ═══ Was das ist ═══
 *
 * Die Linienzeichnung aus Yvonnes Logo — dieselbe, die in der kleinen Blase
 * steckt, nur befreit und gross gezogen. Sie ist damit das einzige
 * gestalterische Element der Seite, das aus ihrer eigenen Marke stammt und
 * nicht aus unserer Direktion.
 *
 * ═══ Woher sie kommt ═══
 *
 * Am 21.08.2026 aus `media-raw/logo/logo-original.jpeg` gewonnen. Der frühere
 * Befund „die Bildmarke lässt sich nicht herauslösen" galt der BLASE samt
 * Schriftzug — „Dr." liegt gestalterisch darauf, das stimmt weiterhin. Die
 * FIGUR ist ein anderer Fall: gemessen liegen ihre Linien bei Helligkeit
 * 110–140, die Blase bei 230, der Grund bei 250. Eine Schwelle bei 185 trennt
 * das sauber.
 *
 * Der Weg: Blasenbereich beschneiden → vierfach hochskalieren (damit potrace
 * ruhige Kurven statt Treppen bekommt) → Schwelle → `potrace` → die vier Pfade
 * der Figur behalten und die sechs Pfade von „FR" und „Dr." verwerfen. Welche
 * welche sind, wurde nicht geraten: im Browser über `getBBox()` gemessen — die
 * Figur endet bei x 12.325, der Schriftzug beginnt bei x 17.701.
 *
 * ═══ Warum sie zweimal im Markup steht ═══
 *
 * Weil sie über die Naht läuft und die Farbe dort kippt: oberhalb salbeigrün
 * auf Beige, unterhalb papierweiss auf Salbei. Eine einzelne Zeichnung kann das
 * nicht — eine Farbe pro Element. Also zwei deckungsgleiche Kopien, jede an
 * ihrer Hälfte beschnitten. Der Schnitt liegt exakt auf der Sektionskante, und
 * weil beide dieselbe Geometrie haben, liest man EINE Figur, die hindurchgeht.
 *
 * ═══ Was sie NICHT ist ═══
 *
 * Kein Dekor, das man auch weglassen könnte, und keine zweite Bewegung. Sie ist
 * die EINE Bewegung, die über Yvonnes zwei Wünsche hinausgeht — und sie ersetzt
 * keine davon: die Zieh-Galerie ist Bedienung, das Einblenden des Porträts hat
 * sie selbst bestellt.
 *
 * Vorgelesen wird sie nicht: sie sagt nichts, was der Satz daneben nicht sagt.
 */
export function Figur() {
  return (
    <div className="figur" aria-hidden="true">
      <div className="figur__haelfte figur__haelfte--oben">
        <Zeichnung className="figur__svg" />
      </div>
      <div className="figur__haelfte figur__haelfte--unten">
        <Zeichnung className="figur__svg" />
      </div>
    </div>
  );
}
