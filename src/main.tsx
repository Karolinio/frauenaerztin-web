import { StrictMode, lazy, Suspense, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { Seite } from './Seite';
import './styles/app.css';

/**
 * Welche Seite gerendert wird, entscheidet die ADRESSE.
 *
 * ═══ Warum kein Router ═══
 *
 * Jede Seite hat ihr eigenes `index.html` (siehe `vite.config.ts`), also liefert
 * der Server sie direkt aus. Es gibt nichts umzuleiten. Ein Router wäre eine
 * Abhängigkeit mehr, ein Umleitungstrick auf GitHub Pages und ein zweiter Ort,
 * an dem die Liste der Seiten steht — die steht in `src/seiten.ts` und nur dort.
 *
 * Der Preis: ein Seitenwechsel lädt neu. Bei sieben Seiten einer Praxisseite ist
 * das kein Preis, sondern das erwartete Verhalten — der Zurück-Knopf stimmt und
 * die Adresse lässt sich verschicken.
 *
 * ═══ Warum `lazy` ═══
 *
 * Sonst lädt die Startseite den Code aller sieben Seiten mit. Die Zieh-Galerie
 * bringt ihre Zeigerlogik mit; die gehört nicht ins Bündel der Kontaktseite.
 */
const SEITEN_BAUSTEINE: Record<string, () => Promise<{ default: ComponentType }>> = {
  '/': () => import('./seiten/Start'),
  '/leistungen/': () => import('./seiten/LeistungenSeite'),
  '/team/': () => import('./seiten/TeamSeite'),
  '/praxis/': () => import('./seiten/PraxisSeite'),
  '/aktuelles/': () => import('./seiten/AktuellesSeite'),
  '/termin/': () => import('./seiten/TerminSeite'),
  '/kontakt/': () => import('./seiten/KontaktSeite'),
};

/**
 * Der Pfad OHNE Basispfad.
 *
 * Auf GitHub Pages liegt die Seite unter `/frauenaerztin-web/leistungen/`. Wer
 * hier `location.pathname` roh vergleicht, findet nie eine Seite und rendert
 * stumm die Startseite — auf jeder Unterseite. Genau die Sorte Fehler, die mit
 * 200 antwortet.
 */
function wegOhneBasis(): string {
  const basis = import.meta.env.BASE_URL.replace(/\/$/, '');
  const roh = window.location.pathname.replace(/index\.html$/, '');
  const ohne = basis && roh.startsWith(basis) ? roh.slice(basis.length) : roh;
  return ohne.endsWith('/') ? ohne : `${ohne}/`;
}

const weg = wegOhneBasis();
/* Eine unbekannte Adresse zeigt die Startseite. Auf einer Praxisseite ist das
   richtiger als eine 404-Meldung: wer sich vertippt hat, will die Praxis finden. */
const laden = SEITEN_BAUSTEINE[weg] ?? SEITEN_BAUSTEINE['/']!;
const Inhalt = lazy(laden);

const wurzel = document.getElementById('root');
if (!wurzel) throw new Error('Kein #root im Dokument — index.html prüfen.');

createRoot(wurzel).render(
  <StrictMode>
    <Seite>
      {/* Kein Ladebalken: das Bündel ist klein genug, dass ein Balken länger
          flackert als er anzeigt. Ein leerer Bereich ist ehrlicher. */}
      <Suspense fallback={null}>
        <Inhalt />
      </Suspense>
    </Seite>
  </StrictMode>,
);
