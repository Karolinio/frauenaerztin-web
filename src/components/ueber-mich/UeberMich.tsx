import { praxis, werdegang } from '../../praxis.config';
import { Bild } from '../ui/Bild';
import { Enthuellen } from '../ui/Enthuellen';
import './ueber-mich.css';

export function UeberMich() {
  return (
    <section className="section ueber" id="ueber-mich" aria-labelledby="ueber-titel">
      <div className="shell ueber__gitter">
        <figure className="ueber__bild">
          <Bild
            name="detail-tisch"
            alt="Ein Wasserglas und ein aufgeschlagener Notizblock auf dem niedrigen Tisch der Sprechecke."
            sizes="(min-width: 900px) 34vw, 100vw"
          />
          <figcaption className="t-meta ueber__bildunterschrift">
            Der Tisch in der Sprechecke. Hier wird geredet, bevor untersucht wird.
          </figcaption>
        </figure>

        <div className="ueber__text">
          <Enthuellen>
            <p className="t-label">Über mich</p>
            <h2 className="t-section ueber__titel" id="ueber-titel">
              Warum ich die Praxis allein führe.
            </h2>
          </Enthuellen>

          <Enthuellen className="ueber__absatz" verzoegerung={0.08}>
            <p className="t-body">
              Ich habe zehn Jahre in der Klinik gearbeitet. Dort habe ich gesehen, wie viel von einem Gespräch
              übrig bleibt, wenn zwölf Minuten dafür eingeplant sind: das Nötigste. In der eigenen Praxis
              teile ich die Zeit selbst ein.
            </p>
            <p className="t-body">
              Deshalb sind es hier 20 Minuten pro Termin, deshalb erkläre ich jeden Schritt vorher, und
              deshalb rufe ich am selben Werktag zurück. Das ist keine Haltung, das ist ein Zeitplan — und er
              ist der einzige Grund, warum ich keine zweite Ärztin und keine dritte Sprechstunde
              danebenstelle.
            </p>
          </Enthuellen>

          <Enthuellen als="section" className="ueber__werdegang" verzoegerung={0.14}>
            <h3 className="t-label ueber__werdegang-titel">Werdegang</h3>
            <ol>
              {werdegang.map((eintrag) => (
                <li key={`${eintrag.zeit}-${eintrag.was}`}>
                  <span className="t-num ueber__zeit">{eintrag.zeit}</span>
                  <span className="ueber__was">{eintrag.was}</span>
                  <span className="ueber__wo t-meta">{eintrag.wo}</span>
                </li>
              ))}
            </ol>
            <p className="t-meta ueber__fach">
              {praxis.fachbezeichnung}. Zuständige Ärztekammer und Kassenärztliche Vereinigung stehen im{' '}
              <a href="/impressum.html">Impressum</a>.
            </p>
          </Enthuellen>
        </div>
      </div>
    </section>
  );
}
