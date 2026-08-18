import { mitbringen } from '../../praxis.config';
import { Enthuellen } from '../ui/Enthuellen';

/**
 * „Der erste Besuch" — was mitzubringen ist und warum.
 *
 * ═══ Warum ausgerechnet diese Liste ═══
 *
 * Weil jede Zeile ein konkretes Detail trägt, das niemand erraten könnte, und
 * weil sie einer Patientin vor dem ersten Termin tatsächlich hilft. Das Raster
 * ist das des Mutterpasses: Feld links, Erklärung rechts, Haarlinie dazwischen.
 * Jede Frau in der Zielgruppe hatte dieses Raster schon in der Hand.
 *
 * ═══ Was hier NICHT steht ═══
 *
 * Keine Zusage über diese Praxis — kein „20 Minuten pro Termin", kein „Rückruf
 * am selben Werktag". Solche Sätze standen in der alten Fassung und waren
 * erfunden. Alles hier Genannte gilt für jede Praxis in Deutschland und wird
 * durch die Eröffnung nicht falsch.
 */
export function ErsterBesuch() {
  return (
    <section className="sektion flaeche-leinen" aria-labelledby="besuch-titel">
      <div className="schale besuch">
        <div className="besuch__kopf">
          <Enthuellen>
            <p className="t-label">Der erste Besuch</p>
            <h2 id="besuch-titel" className="t-section">
              Was Sie mitbringen
            </h2>
            <p className="t-body besuch__lead">
              Nichts davon ist Pflicht. Aber jedes Stück auf dieser Liste spart im Termin Zeit, die dann fürs
              Reden übrig ist.
            </p>
          </Enthuellen>
        </div>

        {/*
          Ein Feldraster, keine zweite Liste.

          Die Leistungen darüber sind Zeilen über die volle Breite mit einem
          Pfeil am Ende. Käme hier dasselbe Gerät noch einmal, hätte die
          Startseite dreimal hintereinander dieselbe Form — und genau daran
          erkennt man eine Seite, die aus einem Baukasten stammt.

          Zwei Spalten, Haarlinie über jedem Feld: das Raster des Mutterpasses,
          das jede Frau in der Zielgruppe schon in der Hand hatte.
        */}
        <dl className="besuch__raster">
          {mitbringen.map((m, i) => (
            <Enthuellen als="div" key={m.was} className="besuch__feld" verzoegerung={i * 50}>
              <span className="besuch__nr" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <dt className="besuch__was">{m.was}</dt>
              <dd className="besuch__warum">{m.warum}</dd>
            </Enthuellen>
          ))}
        </dl>
      </div>
    </section>
  );
}
