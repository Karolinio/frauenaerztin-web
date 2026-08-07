import { useEffect, useId, useState } from 'react';
import { praxis } from '../../praxis.config';
import { MENUE, aktiveSeite } from '../../seiten';
import { Marke } from '../ui/Marke';
import { Pfeil } from '../ui/Pfeil';
import './kopfzeile.css';

/**
 * Das Menue kommt aus `src/seiten.ts` — der einen Liste.
 *
 * Bis zum 07.08.2026 stand hier eine EIGENE Liste aus fuenf Ankern (`#besuch`,
 * `#leistungen`, …). Yvonne hat das nach einem Tag bemerkt:
 *
 *   „Es gibt zwar ein Menue aber in den Unterpunkten kommt man immer wieder zu den
 *    Texten/Bildern von der Hauptpage?"
 *
 * Ein Menue, dessen Punkte alle auf dieselbe Seite zeigen, ist kein Menue. Und zwei
 * Listen fuer dieselben Seiten waeren `zwei-listen-die-driften` — die Kopfzeile wuerde
 * irgendwann eine Seite anbieten, die es nicht gibt.
 */
const adresse = (weg: string) =>
  weg === '/' ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}${weg.replace(/^\//, '')}`;

export function Kopfzeile() {
  const [gescrollt, setGescrollt] = useState(false);
  const [menueOffen, setMenueOffen] = useState(false);
  /* Welche Seite offen ist, steht in der ADRESSE. Ein eigener Zustand dafuer waere
     eine zweite Wahrheit, die beim ersten Zurueck-Knopf falsch steht. */
  const hier = aktiveSeite(window.location.pathname);
  const menueId = useId();

  useEffect(() => {
    let angefordert = false;
    const pruefen = () => {
      angefordert = false;
      setGescrollt(window.scrollY > 32);
    };
    const beiScroll = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(pruefen);
    };
    pruefen();
    window.addEventListener('scroll', beiScroll, { passive: true });
    return () => window.removeEventListener('scroll', beiScroll);
  }, []);

  // Das Menü schließt sich beim Sprung in einen Abschnitt und mit Escape.
  useEffect(() => {
    if (!menueOffen) return;
    const beiTaste = (e: KeyboardEvent) => e.key === 'Escape' && setMenueOffen(false);
    window.addEventListener('keydown', beiTaste);
    return () => window.removeEventListener('keydown', beiTaste);
  }, [menueOffen]);

  /*
   * Genau ein gefuellter Knopf ist gleichzeitig sichtbar.
   *
   * Auf der Startseite erscheint der in der Kopfzeile erst, wenn der aus dem Hero
   * weggescrollt ist. AUF DER TERMINSEITE gar nicht — dort ist der Termin der Inhalt,
   * und ein Knopf, der auf die Seite zeigt, auf der man steht, ist kein Weg.
   */
  const ctaSichtbar = gescrollt && hier?.weg !== '/termin/';

  return (
    <header className="kopf" data-gescrollt={gescrollt || undefined}>
      <div className="shell kopf__zeile">
        <Marke ziel="#inhalt" />

        <nav className="kopf__nav" aria-label="Hauptnavigation">
          <ul>
            {MENUE.map((abschnitt) => (
              <li key={abschnitt.weg}>
                <a
                  href={adresse(abschnitt.weg)}
                  className="kopf__link"
                  data-aktiv={hier?.weg === abschnitt.weg || undefined}
                  aria-current={hier?.weg === abschnitt.weg ? 'page' : undefined}
                >
                  {abschnitt.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="kopf__aktionen">
          <a className="kopf__telefon" href={praxis.telefon.href}>
            {praxis.telefon.anzeige}
          </a>
          <a className="cta kopf__cta" href={adresse('/termin/')} data-sichtbar={ctaSichtbar || undefined}>
            Termin
            <Pfeil className="cta__arrow" />
          </a>
          <button
            type="button"
            className="kopf__schalter"
            aria-expanded={menueOffen}
            aria-controls={menueId}
            onClick={() => setMenueOffen((offen) => !offen)}
          >
            <span className="sr-only">{menueOffen ? 'Menü schließen' : 'Menü öffnen'}</span>
            <span className="kopf__balken" data-offen={menueOffen || undefined} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="kopf__menue" id={menueId} hidden={!menueOffen}>
        <ul className="shell">
          {MENUE.map((abschnitt) => (
            <li key={abschnitt.weg}>
              <a href={adresse(abschnitt.weg)} onClick={() => setMenueOffen(false)}>
                {abschnitt.label}
              </a>
            </li>
          ))}
          <li>
            <a href={praxis.telefon.href} onClick={() => setMenueOffen(false)}>
              {praxis.telefon.anzeige}
            </a>
          </li>
          <li>
            <a className="cta" href={adresse('/termin/')} onClick={() => setMenueOffen(false)}>
              Termin vereinbaren
              <Pfeil className="cta__arrow" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
