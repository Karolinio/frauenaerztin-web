import { Bild } from '../ui/Bild';
import { Enthuellen } from '../ui/Enthuellen';
import './diskretion.css';

/**
 * Übergang zwischen Leistungen und „Über mich". Eine dunkle Bildstrecke,
 * die eine einzige Sache sagt — und sie an Räumen festmacht, nicht an einem
 * Versprechen.
 */
export function Diskretion() {
  return (
    <section className="diskretion on-dark grain" aria-labelledby="diskretion-titel">
      <div className="shell diskretion__gitter">
        <figure className="diskretion__bild">
          <Bild
            name="detail-paravent"
            alt="Ein Paravent aus Leinen im Gegenlicht, die Falten des Stoffs zeichnen sich ab, durch den Spalt fällt helles Licht."
            sizes="(min-width: 900px) 38vw, 100vw"
          />
        </figure>

        <Enthuellen className="diskretion__text">
          <p className="t-label">Diskretion</p>
          <h2 className="t-section diskretion__titel" id="diskretion-titel">
            Diskretion ist eine Frage der Räume, nicht der Zusage.
          </h2>
          <p className="t-body diskretion__satz">
            Im Wartebereich stehen drei Stühle, nicht zwölf. An der Anmeldung wird kein Befund besprochen —
            dafür ist die Tür da. Und beim Umziehen steht der Paravent zwischen uns, ohne dass Sie danach
            fragen müssen.
          </p>
        </Enthuellen>
      </div>
    </section>
  );
}
