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
 * Eine Pflichtangabe — als Wert, wenn sie da ist, sonst als sichtbare Lücke.
 *
 * ═══ Der Fehler, der hier steckte (gefunden am 27.08.2026) ═══
 *
 * Die Komponente hat MARKIERT, unabhängig davon, ob ein Wert vorlag. Jeder
 * eingetragene Wert bekam die gestrichelte Unterlegung, die gedämpfte Farbe und
 * für Screenreader die Ansage „Noch einzutragen:".
 *
 * Solange alles leer war, fiel das nicht auf — die Markierung stimmte ja. Sie
 * wäre erst in dem Moment falsch geworden, in dem sie richtig hätte sein sollen:
 * am Tag, an dem Yvonnes echte Angaben eingetragen sind. Dann hätte auf ihrem
 * Impressum „Ärztekammer Nordrhein" grau und gestrichelt gestanden, und eine
 * blinde Nutzerin hätte gehört: „Noch einzutragen: Ärztekammer Nordrhein."
 *
 * Auf einer Pflichtseite ist das keine Kosmetik. Eine Angabe, die als
 * ausstehend gekennzeichnet ist, sieht aus wie keine Angabe.
 *
 * ═══ Der ältere Fehler, der hier schon einmal steckte ═══
 *
 * Die Komponente benutzte `sr-only` für den Vorlesehinweis. Diese Klasse gibt
 * es in dieser Fassung nicht (sie heisst `nur-vorlesen`), also stand der Hinweis
 * sichtbar auf der Seite — fünfzehnmal „Noch einzutragen:" und dahinter nichts.
 * Eine tote CSS-Klasse fällt nirgends auf ausser im Bild.
 *
 * Zweimal derselbe Bau, zweimal ein Fehler, der nur in EINEM der beiden
 * Zustände sichtbar ist. Deshalb steht der andere Zustand jetzt im Test:
 * `scripts/qa-recht.mjs` baut beide und vergleicht.
 */
export function Offen({ children, was }: { readonly children?: ReactNode; readonly was?: string }) {
  /* Ein vorhandener Wert wird schlicht gesetzt — keine Markierung, keine
     Ansage. Er IST die Angabe. */
  if (!istLeer(children)) return <>{children}</>;

  return (
    <mark className="offen">
      <span className="nur-vorlesen">Noch einzutragen: </span>
      {was ?? 'noch einzutragen'}
    </mark>
  );
}
