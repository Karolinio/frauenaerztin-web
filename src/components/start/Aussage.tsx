import { Enthuellen } from '../ui/Enthuellen';
import { Figur } from './Figur';
import './aussage.css';

/**
 * Die Aussage — ein Satz, gross gesetzt, auf einer Salbeifläche.
 *
 * ═══ Warum es diese Sektion gibt ═══
 *
 * Weil die ganze Seite erklärt. Sie erklärt, wie lange ein Abstrich dauert, ab
 * wann die Kasse den HPV-Test zahlt, was in den Mutterpass eingetragen wird.
 * Das ist richtig und der Ton, den diese Praxis haben soll — aber eine Seite,
 * die nur erklärt, liest sich durchgehend wie ein Beipackzettel.
 *
 * Hier steht einmal etwas ohne Erklärung daneben. Der Satz stand vorher als
 * Halbsatz im Hero-Einleitungstext, wo er unterging. Er ist die These der
 * ganzen Praxis, und er gehört in die grösste Schrift der Seite.
 *
 * ═══ Warum ausgerechnet hier Farbe ═══
 *
 * Yvonne hat „viel weiß, etwas salbeigrün und warmes beige" gesagt. Gemessen
 * am 19.08.2026 kam Salbei auf der Startseite in genau drei Formen vor: als
 * 4px-Band am Hero, als Zweig neben den Leistungen und als Knopffläche. Das ist
 * eine Spur, kein „etwas salbeigrün" — die Seite war faktisch beige auf weiss,
 * und daher kam ihre Gleichförmigkeit.
 *
 * Genau EINE Sektion trägt deshalb Farbe. Zwei wären ein Muster, und ein Muster
 * ist wieder Gleichförmigkeit.
 *
 * ═══ Die zwei Fassungen ═══
 *
 * `aussage--dunkel`  Salbei tief als Fläche, Papierweiss darauf. 7,88 : 1, AAA.
 *                    Der stärkere Bruch — und ein Widerspruch zur Direktion,
 *                    die „kein dunkler Grund" sagt.
 * `aussage--hell`    Salbei hell als Fläche, Tinte darauf. 9,4 : 1. Bleibt hell
 *                    und damit näher an ihrem „viel weiß", wirkt aber leiser.
 *
 * Beide sind gebaut, weil sich das am Bild entscheiden lässt und an einer
 * Beschreibung nicht. Die unterlegene Fassung fliegt raus, sobald entschieden
 * ist — zwei Fassungen im Code sind sonst zwei Wahrheiten.
 */
export function Aussage({ fassung = 'dunkel' }: { fassung?: 'dunkel' | 'hell' }) {
  return (
    <section className={`aussage aussage--${fassung}`} aria-labelledby="aussage-titel">
      <div className="schale aussage__schale">
        <Enthuellen className="aussage__block">
          <p className="t-label aussage__label">Wie ich arbeite</p>
          <h2 id="aussage-titel" className="t-aussage aussage__satz">
            Sie sollen wissen, was gleich passiert, bevor es passiert.
          </h2>
          <p className="aussage__zusatz">
            Und Sie dürfen jederzeit sagen, dass Sie es nicht möchten. Auch mittendrin.
          </p>
        </Enthuellen>
        <Figur />
      </div>
    </section>
  );
}
