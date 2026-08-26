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
 * Am 21.08.2026 aus `media-raw/logo/logo-original.jpeg` gewonnen. Gemessen
 * liegen ihre Linien bei Helligkeit 110–140, die Blase bei 230, der Grund bei
 * 250 — eine Schwelle bei 185 trennt das sauber. Danach vierfach hochskaliert
 * (damit potrace ruhige Kurven statt Treppen liefert) und vektorisiert. Von den
 * zehn Pfaden gehoeren vier zur Figur und sechs zu „FR" und „Dr."; welche
 * welche sind, wurde im Browser ueber `getBBox()` gemessen, nicht geraten.
 *
 * ═══ Einfarbig, seit dem 26.08.2026 ═══
 *
 * Bis dahin stand sie hier zweimal im Markup: zwei deckungsgleiche Kopien, jede
 * an ihrer Haelfte beschnitten, damit die Farbe an der Sektionskante kippte —
 * oben dunkel auf Grau, unten weiss auf Salbei.
 *
 * Yvonne wollte sie einfarbig. Das ist nicht nur ihr Geschmack, es ist auch das
 * Richtigere: IHR Logo zeichnet die Frau in einer Farbe. Die Zweifarbigkeit war
 * unsere Erfindung, nicht ihre Marke.
 *
 * Gemessen wurde vorher, ob das ueberhaupt geht — die Figur liegt ja auf zwei
 * verschiedenen Gruenden:
 *
 *     Tinte  #202621   auf Grau 12,32   auf Salbei 5,08   ← gewaehlt
 *     Signal #3D4638   auf Grau  7,86   auf Salbei 3,24
 *     Marke  #565A4F   auf Grau  5,64   auf Salbei 2,33
 *     Papier #FBFAF7   auf Grau  1,20   auf Salbei 2,91
 *
 * Nur Tinte traegt auf beiden. Die helleren Toene verschwinden auf dem Salbei,
 * Weiss verschwindet auf dem Grau — eine einfarbige Figur MUSS hier dunkel sein.
 *
 * Damit faellt die halbe Komponente weg: eine Zeichnung, kein Beschnitt, keine
 * zwei Wahrheiten ueber dieselbe Geometrie.
 *
 * ═══ Was sie NICHT ist ═══
 *
 * Kein Dekor, das man auch weglassen koennte. Sie ist die eine Bewegung, die
 * ueber Yvonnes zwei Wuensche hinausgeht — und sie ersetzt keine davon.
 *
 * Vorgelesen wird sie nicht: sie sagt nichts, was der Satz daneben nicht sagt.
 */
export function Figur() {
  return (
    <div className="figur" aria-hidden="true">
      <Zeichnung className="figur__svg" />
    </div>
  );
}
