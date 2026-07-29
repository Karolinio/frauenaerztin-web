import { praxis } from '../../praxis.config';
import './marke.css';

interface MarkeProps {
  /** Wohin die Marke führt: auf der Startseite zum Inhalt, sonst zur Startseite. */
  readonly ziel: string;
}

/**
 * Die Wortmarke. Kein Logo, solange der Praxisname nicht feststeht — nur der
 * Name in Fraunces, eine Haarlinie und die Fachbezeichnung.
 *
 * Steht bewusst als eigene Komponente da: Startseite und Rechtstexte sind
 * getrennte Vite-Einstiege und teilen sonst kein CSS.
 */
export function Marke({ ziel }: MarkeProps) {
  return (
    <a className="marke" href={ziel}>
      <span className="marke__name">
        {praxis.titel} {praxis.nachname}
      </span>
      <span className="marke__trenner" aria-hidden="true" />
      <span className="marke__fach t-label">{praxis.kurzbezeichnung}</span>
    </a>
  );
}
