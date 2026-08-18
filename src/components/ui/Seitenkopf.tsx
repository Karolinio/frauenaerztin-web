import type { ReactNode } from 'react';
import { Enthuellen } from './Enthuellen';
import './seitenkopf.css';

/**
 * Der Anfang jeder Unterseite: Etikett, Überschrift, ein Satz.
 *
 * Er existiert, weil die Unterseiten sonst mitten im Text beginnen — beim
 * vorigen Anlauf sah jede Unterseite aus wie ein Ausschnitt der Startseite, und
 * genau das hatte die Kundin an der ersten Fassung bemängelt.
 */
export function Seitenkopf({
  etikett,
  titel,
  einleitung,
}: {
  etikett: string;
  titel: string;
  einleitung?: ReactNode;
}) {
  return (
    <section className="seitenkopf">
      <div className="schale">
        <Enthuellen>
          <p className="t-label">{etikett}</p>
          <h1 className="t-section seitenkopf__titel">{titel}</h1>
          {einleitung ? <div className="t-lead seitenkopf__lead">{einleitung}</div> : null}
        </Enthuellen>
      </div>
    </section>
  );
}
