import { Children, type ReactNode } from 'react';
import { Marke } from '../components/ui/Marke';
import './rechtsseite.css';

interface RechtsseiteProps {
  readonly titel: string;
  /** Das Freigabedatum. `null`, solange die Seite nicht anwaltlich geprüft ist. */
  readonly stand: string | null;
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
        <div className="schale recht__kopfzeile">
          <Marke />
          <a className="link-quiet" href={`${import.meta.env.BASE_URL}`}>
            Zurück zur Startseite
          </a>
        </div>
      </header>

      <main className="schale recht" id="inhalt">
        <h1 className="recht__titel">{titel}</h1>
        <p className="t-meta recht__stand">
          Stand:{' '}
          {stand ?? (
            <span className="offen">
              noch nicht freigegeben — diese Seite gehört vor dem Livegang anwaltlich geprüft
            </span>
          )}
        </p>
        {children}
      </main>

      <footer className="recht__fuss">
        <div className="schale">
          <ul>
            <li>
              <a href={`${import.meta.env.BASE_URL}impressum.html`}>Impressum</a>
            </li>
            <li>
              <a href={`${import.meta.env.BASE_URL}datenschutz.html`}>Datenschutz</a>
            </li>
            <li>
              <a href={`${import.meta.env.BASE_URL}`}>Startseite</a>
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
/**
 * Ist an dieser Stelle wirklich nichts eingetragen?
 *
 * `Children.toArray` wirft `null`, `undefined` und Booleans weg. Aus
 * `<Offen>{titel} {nachname}</Offen>` mit zwei leeren Werten wird damit `[' ']`
 * — und das ist leer. Ohne diese Prüfung stünde dort ein Markierungsfeld mit
 * einem Leerzeichen darin: unsichtbar, und damit eine fehlende Pflichtangabe,
 * die niemand bemerkt.
 */
const istLeer = (k: ReactNode): boolean =>
  Children.toArray(k).every((x) => (typeof x === 'string' ? x.trim() === '' : false));

/**
 * Eine offene Pflichtangabe — sichtbar, nicht leer.
 *
 * ═══ Der Fehler, der hier steckte ═══
 *
 * Die Komponente hatte `<span className="sr-only">Noch einzutragen: </span>`.
 * Diese Klasse gibt es in dieser Fassung nicht mehr (sie heisst
 * `nur-vorlesen`), also war der Hinweis nicht mehr nur für Screenreader da,
 * sondern für alle: die Seite zeigte fünfzehnmal „Noch einzutragen:" und
 * dahinter nichts. Eine tote CSS-Klasse fällt nirgends auf ausser im Bild.
 */
export function Offen({ children, was }: { readonly children?: ReactNode; readonly was?: string }) {
  return (
    <mark className="offen">
      <span className="nur-vorlesen">Noch einzutragen: </span>
      {istLeer(children) ? (was ?? 'noch einzutragen') : children}
    </mark>
  );
}
