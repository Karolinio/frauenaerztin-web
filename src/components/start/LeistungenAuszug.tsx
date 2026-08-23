import { leistungen, weitereLeistungen } from '../../praxis.config';
import { Enthuellen } from '../ui/Enthuellen';
import { SYMBOLE } from './Symbole';
import { weg } from '../../lib/weg';

/**
 * Die Leistungen im Auszug — ihre Worte, ihre Reihenfolge.
 *
 * „Mädelssprechstunde" steht exakt so da. Es ist ihr Wort — nicht aber, wie hier
 * bis zum 18.08.2026 stand, der einzige Begriff, den keine andere Praxis in
 * Erkelenz benutzt: Antje Hagen führt drei Kilometer entfernt eine
 * „Mädchen-Sprechstunde". Der Eintrag bleibt, seine Sonderrolle nicht.
 *
 * ═══ Doch Kacheln — und warum das kein Rückschritt ist ═══
 *
 * Hier stand: „Fünf gleich grosse Kacheln mit Symbol und Randlinie sind der
 * Vorlagen-Look, gegen den diese Seite gebaut ist." Das galt für FÜNF
 * Leistungen und für eine Anordnung, die niemand bestellt hatte.
 *
 * Am 23.08.2026 hat die Ärztin eine eigene Übersicht geschickt, gezeichnet, mit
 * neun Leistungen, je einem Symbol und je einem Satz. Ihre Worte dazu: „So
 * könnte man die Leistungen auf der Hauptseite präsentieren mit so kleinen
 * Icons und dann nur einem Satz und dann einzeln genauer beschreiben."
 *
 * Neun Zeilen in einer Liste sind ausserdem etwas anderes als fünf: die Liste
 * war kurz genug, um am Stück gelesen zu werden. Neun sind eine Wand.
 *
 * Übernommen wird ihr AUFBAU, nicht die Optik der Skizze. Die zeigt weiche
 * Karten mit runden Ecken, Schatten und zentriertem Text — genau die drei
 * Dinge, die `flat-with-light` ausschliesst. Die Kacheln hier sind Flächen:
 * kein Radius, kein Schatten, linksbündig, getrennt durch Flächenwechsel. Der
 * Unterschied ist im Screenshot klein und auf dem Schirm gross.
 *
 * ═══ Was die erste Fassung falsch machte ═══
 *
 * Titel links, ein kleiner grauer Satz daneben, rechts 40 % leere Fläche — und
 * nichts sagte, dass die Zeile ein Verweis ist. Drei Dinge sind dazugekommen:
 *
 *   Die Ziffer.   Sie baut links eine Kante, an der das Auge herunterläuft, und
 *                 sie zählt, was sonst nur eine Aufzählung wäre. Das Raster
 *                 stammt aus dem Mutterpass, der Referenz der Direktion.
 *   Der Pfeil.    Er sitzt am rechten Rand und füllt genau die Fläche, die vorher
 *                 leer war. Er ist die einzige Stelle, an der die Zeile sagt,
 *                 dass sie irgendwohin führt.
 *   Der Satz.     In Fliesstextgrösse statt in Kleingedrucktem. 28px Serife
 *                 neben 15px Grau ist kein Kontrast, das ist eine Fussnote.
 *
 * ═══ Der Salbeizweig ═══
 *
 * Er kommt auf der ganzen Seite genau EINMAL vor, und zwar hier. Ein Motiv, das
 * dreimal auftaucht, ist Dekor; eines, das einmal auftaucht, ist eine
 * Entscheidung. Er bricht bewusst über die Spaltenkante hinaus — die einzige
 * Stelle, an der das Raster verlassen wird.
 */

/** Der Pfeil am Zeilenende. Gezeichnet, nicht gesetzt — ein „→" aus der Schrift
 *  sitzt je nach Schnitt anders auf der Grundlinie und lässt sich nicht bewegen,
 *  ohne dass die Zeilenhöhe wackelt. */
function Pfeil() {
  return (
    <svg className="auszug__pfeil" width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden="true">
      <path d="M0 5h24M20 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

export function LeistungenAuszug() {
  return (
    <section className="sektion" aria-labelledby="leistungen-titel">
      <div className="schale auszug">
        <Enthuellen className="auszug__kopf">
          <p className="t-label">Leistungen</p>
          <h2 id="leistungen-titel" className="t-section auszug__titel">
            Für jede Lebensphase
          </h2>
          <p className="t-body auszug__lead">
            Von der Vorsorge über Kinderwunsch und Schwangerschaft bis zu den Wechseljahren und darüber
            hinaus. Was jeweils dahintersteckt, steht ausführlich auf der Leistungsseite — hier in je einem
            Satz.
          </p>
        </Enthuellen>

        <img
          className="auszug__salbei"
          src={weg('/bilder/salbei.webp')}
          width={720}
          height={696}
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
        />

        <ul className="auszug__raster">
          {leistungen.map((l, i) => (
            <Enthuellen als="li" key={l.id} verzoegerung={(i % 3) * 55}>
              <a className="kachel" href={`${weg('/leistungen/')}#${l.id}`}>
                {SYMBOLE[l.id] ?? null}
                <h3 className="kachel__titel">{l.titel}</h3>
                <p className="kachel__satz">{l.kurz}</p>
                <span className="kachel__weiter">
                  Mehr erfahren
                  <Pfeil />
                </span>
              </a>
            </Enthuellen>
          ))}
        </ul>

        <Enthuellen className="auszug__weitere">
          <p className="t-meta">
            Ausserdem:{' '}
            {weitereLeistungen.map((l, i) => (
              <span key={l.id}>
                {i > 0 ? ' und ' : ''}
                <a className="link" href={`${weg('/leistungen/')}#${l.id}`}>
                  {l.titel.toLowerCase()}
                </a>
              </span>
            ))}
            .
          </p>
        </Enthuellen>
      </div>
    </section>
  );
}
