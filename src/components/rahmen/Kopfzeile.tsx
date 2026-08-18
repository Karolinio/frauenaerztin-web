import { useEffect, useRef, useState } from 'react';
import { MENUE, aktiveSeite } from '../../seiten';
import { Marke } from '../ui/Marke';
import { weg } from '../../lib/weg';
import './kopfzeile.css';

/**
 * Die Kopfzeile. Marke links, sechs Menüpunkte rechts, eine Haarlinie darunter.
 *
 * ═══ Was hier absichtlich NICHT steht ═══
 *
 * Kein gefüllter Termin-Knopf. Das Signal markiert den nächsten Schritt, und
 * wenn es in der Kopfzeile jeder Seite steht, markiert es die Kopfzeile. Auf der
 * Startseite gäbe es dann zwei gefüllte Knöpfe im ersten Bild — und zwei nächste
 * Schritte sind keiner.
 *
 * Kein Schatten beim Scrollen, kein Verkleinern, kein Einfahren von oben. Sie
 * hat zweimal „einfacher" gesagt.
 */
export function Kopfzeile() {
  const [offen, setOffen] = useState(false);
  const knopf = useRef<HTMLButtonElement>(null);
  const aktiv = aktiveSeite(window.location.pathname);

  /* Escape schliesst das Menü und gibt den Fokus zurück auf den Knopf. Ohne das
     landet man nach dem Schliessen am Seitenanfang und muss sich neu durchhangeln. */
  useEffect(() => {
    if (!offen) return;
    const zu = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOffen(false);
      knopf.current?.focus();
    };
    document.addEventListener('keydown', zu);
    return () => document.removeEventListener('keydown', zu);
  }, [offen]);

  return (
    <header className="kopf">
      <div className="schale kopf__zeile">
        <Marke />

        <button
          ref={knopf}
          type="button"
          className="kopf__schalter"
          aria-expanded={offen}
          aria-controls="hauptmenue"
          onClick={() => setOffen((o) => !o)}
        >
          {offen ? 'Schliessen' : 'Menü'}
        </button>

        <nav
          id="hauptmenue"
          className={`kopf__menue ${offen ? 'kopf__menue--offen' : ''}`}
          aria-label="Hauptmenü"
        >
          <ul>
            {MENUE.map((s) => {
              const istAktiv = aktiv?.weg === s.weg;
              return (
                <li key={s.weg}>
                  <a
                    href={weg(s.weg)}
                    className={`kopf__punkt ${istAktiv ? 'kopf__punkt--aktiv' : ''}`}
                    /* Die aktive Seite wird angesagt, nicht nur eingefärbt. Farbe
                       allein ist für Screenreader und Farbenblinde keine Angabe. */
                    aria-current={istAktiv ? 'page' : undefined}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
