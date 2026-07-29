import type { ReactNode } from 'react';
import { Marke } from '../components/ui/Marke';
import './rechtsseite.css';

interface RechtsseiteProps {
  readonly titel: string;
  readonly stand: string;
  readonly children: ReactNode;
}

/**
 * Gemeinsames Gerüst für Impressum und Datenschutz. Eigene Vite-Einstiege
 * ohne Router, ohne GSAP, ohne Three.js — diese Seiten sollen nichts von der
 * Startseite mitschleppen.
 */
export function Rechtsseite({ titel, stand, children }: RechtsseiteProps) {
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <header className="recht__kopf">
        <div className="shell recht__kopfzeile">
          <Marke ziel="/" />
          <a className="link-quiet" href="/">
            Zurück zur Startseite
          </a>
        </div>
      </header>

      <main className="shell recht" id="inhalt">
        <h1 className="recht__titel">{titel}</h1>
        <p className="t-meta recht__stand">Stand: {stand}</p>
        {children}
      </main>

      <footer className="recht__fuss">
        <div className="shell">
          <ul>
            <li>
              <a href="/impressum.html">Impressum</a>
            </li>
            <li>
              <a href="/datenschutz.html">Datenschutz</a>
            </li>
            <li>
              <a href="/">Startseite</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

/**
 * Sichtbare Markierung für alles, was die Praxis noch selbst eintragen muss.
 * Bewusst nicht dezent: eine Rechtsseite darf nicht versehentlich mit
 * Platzhaltern live gehen.
 */
export function Offen({ children }: { readonly children: ReactNode }) {
  return (
    <mark className="offen">
      <span className="sr-only">Noch einzutragen: </span>
      {children}
    </mark>
  );
}
