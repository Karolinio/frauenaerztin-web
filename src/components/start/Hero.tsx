import { useEffect, useRef, useState } from 'react';
import { praxis } from '../../praxis.config';
import { zeiten, hatZeiten, istHeute } from '../../inhalt';
import { Marke } from '../ui/Marke';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';
import './hero.css';

/**
 * Der geteilte Hero — ihre Vorgabe, in ihrer Reihenfolge.
 *
 *   „Startseite: Logo/Name, Medizin für Frauen, Die neue gynäkologische Praxis
 *    in Erkelenz, Foto von mir und kurzer Einleitungstext."
 *
 * ═══ Die zweite Zeile ist die wichtige ═══
 *
 * „Medizin für Frauen" steht wörtlich so auf ihrer Referenz (gynpraxisbonn.de).
 * Sie hat es übernommen und darf es behalten. Aber „Die neue gynäkologische
 * Praxis in Erkelenz" ist der Satz, den es nur einmal gibt — er ist der Grund,
 * warum diese Seite existiert, und er wird deshalb nicht kleiner gesetzt als
 * eine Bildunterschrift.
 *
 * Beide Zeilen bilden EINE Überschrift. Zwei h1 wären zwei Themen, und die
 * zweite Zeile als Absatz wäre für Google eine Bildunterschrift.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titel">
      <div className="hero__text">
        <div className="hero__marke">
          <Marke alsUeberschrift />
        </div>

        <h1 id="hero-titel" className="hero__titel">
          <span className="t-hero hero__zeile1">Medizin für Frauen</span>
          <span className="hero__zeile2">Die neue gynäkologische Praxis in {praxis.ort}</span>
        </h1>

        {/* Der kurze Einleitungstext steht in ihrer Aufzählung direkt beim Foto
            („Foto von ihr + kurzer Einleitungstext") und sitzt deshalb hier und
            nicht in einer eigenen Sektion darunter. Er füllt ausserdem die
            linke Spalte: ein 3:4-Bild, das bis an die Kante geht, ist bei
            1440px rund 780px hoch, und daneben nur zwei Zeilen stehen zu haben
            sieht nicht nach Ruhe aus, sondern nach fehlendem Inhalt. */}
        <div className="hero__einleitung t-lead">
          <p>
            In {praxis.ort} entsteht eine neue gynäkologische Praxis. Vorsorge, Schwangerschaft, Verhütung und
            Kinderwunsch — und eine eigene Sprechstunde für Mädchen und junge Frauen.
          </p>
          <p>
            Ich nehme mir für jede Untersuchung die Zeit, sie vorher zu erklären. Sie sollen wissen, was
            gleich passiert, bevor es passiert — und Sie dürfen jederzeit sagen, dass Sie es nicht möchten.
          </p>
        </div>

        <Praxisdaten />
      </div>

      <Portraet />
    </section>
  );
}

/**
 * Sprechzeit von heute, Telefonnummer, Terminweg — direkt im Hero.
 *
 * ═══ Warum das hier oben steht und nicht auf /termin/ ═══
 *
 * Weil es der Wettbewerb in Erkelenz so macht und weil er damit recht hat.
 * Gemessen am 18.08.2026 an den vier Frauenarztpraxen am Ort: gyn-tuerker.de
 * zeigt die Öffnungszeiten ganz oben, frauenarztpraxis-erkelenz.de setzt eine
 * Zeitenänderung als erste Meldung der Startseite, praxis-adhami.de stellt die
 * Telefonnummer neben den Titel.
 *
 * Der Grund ist nicht Mode. „Wann hat die auf" und „wie erreiche ich die" sind
 * die beiden Fragen, wegen denen eine Praxisseite überhaupt aufgerufen wird.
 * Sie lagen hier bisher auf einer Unterseite, zwei Klicks entfernt.
 *
 * ═══ Warum ausgerechnet HEUTE ═══
 *
 * Eine Tabelle mit sechs Zeilen beantwortet die Frage nicht, sie stellt sie neu:
 * die Leserin muss erst den Wochentag suchen. Ein Satz, der „heute" sagt,
 * beantwortet sie. Die vollständige Tabelle steht weiterhin auf /termin/ — dort
 * sucht jemand, der einen anderen Tag plant.
 *
 * ═══ Was hier NICHT passiert ═══
 *
 * Es wird nichts erfunden. Fehlt die Nummer, steht der Knopf trotzdem — er führt
 * dann zu den Zeiten statt ins Telefon, und die Lücke bleibt sichtbar. Fehlen
 * die Zeiten, sagt die Zeile das, statt „geschlossen" zu behaupten: eine falsche
 * Zeitangabe ist eine Patientin vor verschlossener Tür.
 */
function Praxisdaten() {
  const telefonSteht = steht(praxis.telefon.href) && steht(praxis.telefon.anzeige);

  const heute = zeiten.find((z) => istHeute(z));
  const spanne =
    heute && hatZeiten(heute) ? [heute.vormittag, heute.nachmittag].filter(Boolean).join(' · ') : null;

  return (
    <div className="hero__daten">
      <p className="hero__heute">
        <span className="hero__heute-wort">Heute</span>
        {heute === undefined ? (
          <span className="luecke">Sprechzeiten</span>
        ) : spanne === null ? (
          <span className="hero__heute-zu">geschlossen</span>
        ) : (
          <span className="hero__heute-zeit">{spanne} Uhr</span>
        )}
      </p>

      <div className="hero__wege">
        {telefonSteht ? (
          <a className="knopf" href={praxis.telefon.href as string}>
            {praxis.telefon.anzeige} anrufen
          </a>
        ) : (
          <a className="knopf" href={weg('/termin/')}>
            Zeiten und Termin
          </a>
        )}
        <a className="knopf knopf--leise" href={weg('/termin/')}>
          Alle Sprechzeiten
        </a>
      </div>
    </div>
  );
}

/**
 * Das Bild blendet ein. Ihr einziger Bewegungswunsch, wörtlich:
 *
 *   „Vllt das Foto auf der Hauptseite, dass es eingeblendet wird und nicht fest
 *    ist."
 *
 * Deckkraft 0 → 1 über 900 ms, dazu ein Zoom von 1,04 auf 1,00. Kein Fliegen,
 * kein Springen. Das Bild kommt zur Ruhe, es tritt nicht auf.
 *
 * ═══ Warum auf `decode()` gewartet wird und nicht auf `load` ═══
 *
 * `load` feuert, sobald die Bytes da sind — dekodiert wird danach, und zwar im
 * Hauptstrang. Ein 1800px-WebP kostet dort auf einem Mittelklasse-Handy 40 bis
 * 80 ms, und die fallen genau in den Übergang: das Bild blendet ruckelnd ein.
 * `decode()` verspricht, dass das Bild fertig ist, bevor es angefasst wird.
 *
 * Fällt `decode()` aus (ältere Browser, abgebrochene Ladung), wird trotzdem
 * eingeblendet. Ein unsichtbares Bild ist der teurere Fehler.
 */
function Portraet() {
  const bild = useRef<HTMLImageElement>(null);
  const [da, setDa] = useState(false);

  useEffect(() => {
    const el = bild.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDa(true);
      return;
    }

    let abgebrochen = false;
    const zeigen = () => {
      if (!abgebrochen) setDa(true);
    };

    el.decode().then(zeigen, zeigen);
    return () => {
      abgebrochen = true;
    };
  }, []);

  /*
   * Die Markierung steht so lange, wie `praxis.portraet` fehlt — und sie
   * verschwindet in dem Moment, in dem das echte Bild eingetragen wird. Es gibt
   * keinen zweiten Handgriff, den jemand vergessen könnte.
   */
  const portraetFehlt = praxis.portraet === null;

  return (
    <figure className={`hero__bild ${da ? 'hero__bild--da' : ''}`}>
      {portraetFehlt ? (
        <p className="hero__marker">
          <span className="hero__marker-wort">Porträt folgt</span>
          <span className="hero__marker-satz">
            Hier steht das Foto der Ärztin. Bis es da ist, hält eine Materialstudie den Platz — sie hat exakt
            dessen Masse.
          </span>
        </p>
      ) : null}
      <img
        ref={bild}
        src={weg(praxis.portraet?.src ?? '/bilder/hero.webp')}
        width={1800}
        height={1208}
        /* Das erste Bild der Seite. `eager` und hohe Priorität, sonst steht es
           in der Warteschlange hinter dem Bündel — und die halbe Startseite ist
           dann eine leere Fläche. */
        loading="eager"
        fetchPriority="high"
        decoding="async"
        /* Die Bildbeschreibung beschreibt, was WIRKLICH zu sehen ist. „Porträt
           der Ärztin" wäre hier eine Falschangabe gegenüber genau den Nutzerinnen,
           die das Bild nicht sehen können. */
        alt={
          praxis.portraet?.alt ??
          'Frisch gestrichene Wand aus warmweissem Kalkputz, daneben eine salbeigrün gestrichene Fläche, Tageslicht von links.'
        }
      />
    </figure>
  );
}
