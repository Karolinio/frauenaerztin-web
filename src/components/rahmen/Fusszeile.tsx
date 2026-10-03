import { MENUE, RECHT } from '../../seiten';
import { praxis } from '../../praxis.config';
import { zeiten, hatZeiten, zeitenStehenAus } from '../../inhalt';
import { Angabe, steht } from '../ui/Angabe';
import { useEffect, useRef } from 'react';
import { weg } from '../../lib/weg';
import './fusszeile.css';

/**
 * Die Fusszeile: Anschrift, Zeiten, Wege, Recht.
 *
 * ═══ Warum sie hell ist ═══
 *
 * Weil die Direktion keine Fläche dunkler als `--tinte-mtl` als Hintergrund
 * erlaubt. Eine dunkle Fusszeile ist die bequemste Art, eine helle Seite unten
 * abzuschliessen — und sie hätte hier ausgesehen wie ein Fremdkörper aus einem
 * anderen Entwurf. Abgeschlossen wird durch Flächenwechsel auf Leinen und eine
 * Haarlinie, nicht durch Dunkelheit.
 *
 * ═══ Warum die Zeiten hier stehen ═══
 *
 * Weil sie hier gesucht werden. Sie kommen aus `inhalt/zeiten.json` — derselben
 * Datei wie auf /termin/. Eine zweite Liste in der Fusszeile wäre die Sorte
 * Drift, die man erst bemerkt, wenn eine Patientin vor der Tür steht.
 */
export function Fusszeile() {
  const anschriftSteht = steht(praxis.adresse.strasse) && steht(praxis.adresse.plz);
  const signatur = useRef<HTMLDivElement>(null);

  /* Die Eckenmarke tritt zurück, solange die grosse Marke im Bild ist. */
  useEffect(() => {
    const el = signatur.current;
    if (!el) return;
    const wurzel = document.documentElement;
    const beobachter = new IntersectionObserver(([e]) => {
      wurzel.dataset.markeImFuss = e?.isIntersecting ? 'ja' : 'nein';
    });
    beobachter.observe(el);
    return () => {
      beobachter.disconnect();
      delete wurzel.dataset.markeImFuss;
    };
  }, []);

  return (
    <footer className="fuss">
      <div className="schale fuss__raster">

        <div className="fuss__spalte">
          <h2 className="t-label">Anschrift</h2>
          <address className="fuss__adresse">
            {anschriftSteht ? (
              <>
                {praxis.adresse.strasse}
                <br />
                {praxis.adresse.plz} {praxis.adresse.ort}
              </>
            ) : (
              <>
                <span className="luecke">Strasse und Hausnummer</span>
                <br />
                <span className="luecke">PLZ</span> {praxis.adresse.ort}
              </>
            )}
          </address>

          {steht(praxis.telefon.href) && steht(praxis.telefon.anzeige) ? (
            <a className="fuss__telefon" href={praxis.telefon.href}>
              {praxis.telefon.anzeige}
            </a>
          ) : (
            <p className="fuss__telefon">
              <Angabe wert={null} was="Telefonnummer" />
            </p>
          )}

          {/*
            Ihre Fussliste vom 11.09.2026: Telefon, Fax, E-Mail, Adresse (Google
            Maps). Fax und E-Mail sind Luecken, bis sie die Angaben schickt —
            weggelassen werden sie nicht, sie hat sie ausdruecklich aufgezaehlt.

            Google Maps als VERWEIS, nicht als eingebettete Karte: eine Karte im
            iframe laedt bei jedem Besuch Google, ohne dass jemand gefragt wurde.
            Ein Link laedt nichts, bis die Patientin ihn anklickt — und dann
            will sie ja dorthin.
          */}
          <p className="t-meta fuss__zeile">
            Fax{' '}
            {steht(praxis.fax) ? praxis.fax : <Angabe wert={null} was="Faxnummer" />}
          </p>
          <p className="t-meta fuss__zeile">
            {steht(praxis.email) ? (
              <a href={`mailto:${praxis.email}`}>{praxis.email}</a>
            ) : (
              <Angabe wert={null} was="E-Mail-Adresse" />
            )}
          </p>
          {anschriftSteht && (
            <p className="t-meta fuss__zeile">
              <a
                className="link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${praxis.adresse.strasse}, ${praxis.adresse.plz} ${praxis.adresse.ort}`)}`}
                rel="noopener"
              >
                Auf Google Maps öffnen
              </a>
            </p>
          )}
        </div>

        <div className="fuss__spalte">
          <h2 className="t-label">Sprechzeiten</h2>
          {zeitenStehenAus ? (
            <p className="t-meta fuss__ausstehend">
              <span className="luecke">Sprechzeiten stehen noch nicht fest</span>
            </p>
          ) : (
            <ul className="fuss__zeiten">
              {zeiten.filter(hatZeiten).map((z) => (
                <li key={z.tag}>
                  <span className="fuss__tag">{z.tag}</span>
                  {/* Vor- und Nachmittag untereinander, wie in der Tabelle auf
                      /termin/. Nebeneinander lief die Dienstagszeile bei 1280
                      und 1440 px 4–5 px in die Spalte „Seiten" (02.10.2026). */}
                  <span className="fuss__spanne">
                    {[z.vormittag, z.nachmittag].filter(Boolean).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <a className="link fuss__mehr" href={weg('/termin/')}>
            Alle Zeiten und Termine
          </a>
        </div>

        <div className="fuss__spalte">
          <h2 className="t-label">Seiten</h2>
          <ul className="fuss__wege">
            {MENUE.map((s) => (
              <li key={s.weg}>
                <a href={weg(s.weg)}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        ═══ Die Marke gross, als Schlusszeichen — seit dem 03.10.2026 ═══

        Gesetzt wie ihr Schild am Eingang: links der Blob mit der Figur, rechts
        der Name, weit gesperrt, darunter die Fachbezeichnung. Abgelesen an
        Zellerfeld (Mobbin): die Marke unten gross, nicht als 20-px-Stempel in
        der ersten Spalte. Solange sie im Bild ist, tritt die Eckenmarke zurück —
        zwei Marken übereinander wären eine zu viel.
      */}
      {praxis.logo ? (
        <div className="schale fuss__signatur" ref={signatur}>
          <img
            className="fuss__signatur-marke"
            /* Die helle Fassung: ihr Blob-Grau ist das Grau dieses Fusses. */
            src={weg('/bilder/marke-hell.svg')}
            width={praxis.logo.breite}
            height={praxis.logo.hoehe}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <p className="fuss__signatur-text">
            <span className="fuss__signatur-name">
              {praxis.aerztin.titel} {praxis.aerztin.vorname} {praxis.aerztin.nachname}
            </span>
            <span className="fuss__signatur-fach">{praxis.aerztin.fachbezeichnung}</span>
          </p>
        </div>
      ) : null}

      <div className="schale fuss__abschluss">
        <p className="t-meta">
          Im Notfall: <a href="tel:112">112</a> · Ausserhalb der Sprechzeiten:{' '}
          <a href="tel:116117">116 117</a>
        </p>
        <ul className="fuss__recht">
          {RECHT.map((s) => (
            <li key={s.weg}>
              <a href={weg(s.weg)}>{s.label}</a>
            </li>
          ))}
        </ul>
        {/*
          Ihre Zusage vom Montag: „Ja klar gar kein Problem." Klein, ganz unten,
          NICHT im Impressum — dort steht, wer die Seite betreibt, und das ist
          sie. `nofollow`, weil derselbe Fusslink auf vielen Kundenseiten für
          Google sonst nach Linktausch aussieht.

          04.10.2026: im finesites-Verlauf wie bei Aram (Karol). Ihre Direktion
          schliesst Pink und Magenta aus — Karol hat sich bewusst dafür
          entschieden, weil es das Zeichen von finesites ist, nicht ihre Gestaltung.
        */}
        <a className="fuss__urheber" href="https://finesites.de" target="_blank" rel="nofollow noopener">
          <span className="fuss__urheber-vor">Gestaltet &amp; gebaut von</span>
          <span className="fuss__urheber-marke" aria-hidden="true">
            <span className="fuss__urheber-wort"><span className="fuss__urheber-strich">/</span>finesites</span>
            <span className="fuss__urheber-pfeil">↗</span>
          </span>
          <span className="nur-vorlesen">finesites (öffnet in neuem Tab)</span>
        </a>
      </div>
    </footer>
  );
}
