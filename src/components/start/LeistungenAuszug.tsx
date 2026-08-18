import { leistungen, weitereLeistungen } from '../../praxis.config';
import { Enthuellen } from '../ui/Enthuellen';
import { weg } from '../../lib/weg';

/**
 * Die Leistungen im Auszug — ihre Worte, ihre Reihenfolge.
 *
 * „Mädelssprechstunde" steht exakt so da. Es ist ihr Wort — nicht aber, wie hier
 * bis zum 18.08.2026 stand, der einzige Begriff, den keine andere Praxis in
 * Erkelenz benutzt: Antje Hagen führt drei Kilometer entfernt eine
 * „Mädchen-Sprechstunde". Der Eintrag bleibt, seine Sonderrolle nicht.
 *
 * ═══ Warum eine Liste und keine Kacheln ═══
 *
 * Fünf gleich grosse Kacheln mit Symbol und Randlinie sind der Vorlagen-Look,
 * gegen den diese Seite gebaut ist — und sie behaupten, alle fünf Leistungen
 * seien gleich wichtig. Eine Liste mit Haarlinien hat eine Leserichtung, kostet
 * ein Drittel der Höhe und trägt die Reihenfolge, die die Ärztin selbst gewählt
 * hat.
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
        {/* Der Kopf IST das Raster — nicht ein Kasten, in dem eins steckt.
            Schöbe sich hier ein Wrapper dazwischen, wäre er das einzige
            Rasterkind, und Titel wie Vorspann stünden beide in Spalte eins. */}
        <Enthuellen className="auszug__kopf">
          <p className="t-label">Leistungen</p>
          <h2 id="leistungen-titel" className="t-section auszug__titel">
            Was ich anbiete
          </h2>
          <p className="t-body auszug__lead">
            Fünf Bereiche, dazu Impfungen. Was jeweils dahintersteckt, steht ausführlich auf der
            Leistungsseite — hier in je einem Satz.
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

        <ol className="auszug__liste">
          {leistungen.map((l, i) => (
            <Enthuellen als="li" key={l.id} verzoegerung={i * 55}>
              <a className="auszug__punkt" href={`${weg('/leistungen/')}#${l.id}`}>
                <span className="auszug__nr" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="t-unter auszug__name">{l.titel}</span>
                <span className="auszug__satz">{l.kurz}</span>
                <Pfeil />
              </a>
            </Enthuellen>
          ))}
        </ol>

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
