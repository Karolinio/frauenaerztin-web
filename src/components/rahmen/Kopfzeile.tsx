import { useEffect, useRef, useState } from 'react';
import { MENUE, aktiveSeite } from '../../seiten';
import { Marke } from '../ui/Marke';
import { weg } from '../../lib/weg';
import { praxis } from '../../praxis.config';
import { steht } from '../ui/Angabe';
import { Hoerer } from '../ui/Strichzeichen';
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
  const telefonSteht = steht(praxis.telefon.href) && steht(praxis.telefon.anzeige);

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

        {/*
          ═══ Das Telefon in der Kopfzeile, seit dem 03.10.2026 ═══

          Diese Praxis hat keine Online-Termine — das Telefon ist der einzige
          Weg zum Termin, und es stand erst im Hero. Jetzt steht es auf jeder
          Seite oben rechts: am Rechner als schmaler Knopf mit Nummer, am Handy
          als runder Hörer neben „Menü". Abgelesen an Frontify (Mobbin): eine
          eigene, abgesetzte Gruppe rechts, die nicht zum Menü gehört.

          Er steht im Code NACH dem Menü: am Rechner kommt die Tastatur erst an
          der Marke, dann am Menü, dann hier vorbei — wie das Auge. Am Handy
          steht er bei aufgeklapptem Menü optisch ÜBER der Liste, wird aber erst
          nach ihr angesprungen. Bewusst so: mit dem Knopf vor dem Menü im Code
          wäre die Reihenfolge am Rechner verdreht, und dort sind die sechs
          Punkte immer offen.
        */}
        {telefonSteht ? (
          <a className="kopf__telefon" href={praxis.telefon.href as string}>
            <Hoerer className="kopf__telefon-zeichen" />
            <span className="kopf__telefon-nummer">{praxis.telefon.anzeige}</span>
            <span className="nur-vorlesen"> anrufen</span>
          </a>
        ) : null}
      </div>
    </header>
  );
}
