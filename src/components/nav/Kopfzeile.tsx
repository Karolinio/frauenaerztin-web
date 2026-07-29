import { useEffect, useId, useState } from 'react';
import { praxis } from '../../praxis.config';
import { useAktiverAbschnitt } from '../../hooks/useAktiverAbschnitt';
import { Marke } from '../ui/Marke';
import { Pfeil } from '../ui/Pfeil';
import './kopfzeile.css';

const ABSCHNITTE = [
  { id: 'besuch', label: 'Der Besuch' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'praxis', label: 'Praxis & Anfahrt' },
  { id: 'termin', label: 'Termin' },
] as const;

const IDS = ABSCHNITTE.map((a) => a.id);

export function Kopfzeile() {
  const [gescrollt, setGescrollt] = useState(false);
  const [menueOffen, setMenueOffen] = useState(false);
  const aktiv = useAktiverAbschnitt(IDS);
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

  // Genau ein gefüllter Button ist gleichzeitig sichtbar: der in der Kopfzeile
  // erscheint erst, wenn der aus dem Hero weggescrollt ist, und verschwindet
  // wieder, sobald der Terminabschnitt selbst im Bild steht.
  const ctaSichtbar = gescrollt && aktiv !== 'termin';

  return (
    <header className="kopf" data-gescrollt={gescrollt || undefined}>
      <div className="shell kopf__zeile">
        <Marke ziel="#inhalt" />

        <nav className="kopf__nav" aria-label="Hauptnavigation">
          <ul>
            {ABSCHNITTE.map((abschnitt) => (
              <li key={abschnitt.id}>
                <a
                  href={`#${abschnitt.id}`}
                  className="kopf__link"
                  data-aktiv={aktiv === abschnitt.id || undefined}
                  aria-current={aktiv === abschnitt.id ? 'true' : undefined}
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
          <a className="cta kopf__cta" href="#termin" data-sichtbar={ctaSichtbar || undefined}>
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
          {ABSCHNITTE.map((abschnitt) => (
            <li key={abschnitt.id}>
              <a href={`#${abschnitt.id}`} onClick={() => setMenueOffen(false)}>
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
            <a className="cta" href="#termin" onClick={() => setMenueOffen(false)}>
              Termin vereinbaren
              <Pfeil className="cta__arrow" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
