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
 * ═══ Wo die Farbe geblieben ist ═══
 *
 * Yvonne hat „viel weiß, etwas salbeigrün und warmes beige" gesagt. Gemessen
 * am 19.08.2026 kam Salbei auf der Startseite in genau drei Formen vor: als
 * 4px-Band am Hero, als Zweig neben den Leistungen und als Knopffläche. Das ist
 * eine Spur, kein „etwas salbeigrün" — die Seite war faktisch beige auf weiss,
 * und daher kam ihre Gleichförmigkeit.
 *
 * Diese Sektion war daraufhin die eine, die Farbe trug: Salbei als Fläche.
 *
 * Seit dem 31.08.2026 trägt sie die Farbe anders. Yvonne hat aus dem
 * Vergleichsdokument die Fassung B gewählt — helles Grau als Fläche, die
 * Zeichnung darauf in ihrem tiefen Salbei. Die Farbe ist damit nicht weg; sie
 * ist von der Fläche in die Figur gewandert. Was der Vergleich dazu ausgewiesen
 * hat: die Zeichnung springt von 2,91 : 1 auf 7,86 : 1, die Seite verliert
 * dafür ihre einzige Farbfläche. Beides stimmt, und sie hat es so gewollt.
 *
 * Die zweite Fassung (`aussage--hell`) ist damit weggefallen. Zwei Fassungen im
 * Code sind zwei Wahrheiten, und entschieden ist entschieden.
 */
export function Aussage() {
  return (
    <section className="aussage" aria-labelledby="aussage-titel">
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
