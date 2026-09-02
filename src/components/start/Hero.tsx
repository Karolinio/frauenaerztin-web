import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { praxis } from '../../praxis.config';
import { zeiten, hatZeiten, istHeute } from '../../inhalt';
import { Marke } from '../ui/Marke';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';
import { HERO_PLATZ, zeigt } from '../../lib/bildplaetze';
import { HERO_SIZES, heroSrcSet } from '../../lib/heroBild';
import { Hoerer, Uhr } from '../ui/Strichzeichen';
import './hero.css';

/**
 * Der Hero — ihre Vorgabe, in ihrer Reihenfolge.
 *
 *   „Startseite: Logo/Name, Medizin für Frauen, Die neue gynäkologische Praxis
 *    in Erkelenz, Foto von mir und kurzer Einleitungstext."
 *
 * ═══ Umbau vom 30.08.2026: die Mittelachse ═══
 *
 * Yvonne: „Logo gerne mehr in den Mittelpunkt stellen."
 *
 * Bis dahin stand der Hero zweispaltig: links Text, rechts ein hohes Bild. Das
 * Logo sass oben in der linken Spalte — gemessen bei 1440px 505px breit, und
 * direkt darunter eine Überschrift, deren Versalhöhe allein 86px betrug. Ein
 * Logo verliert diesen Vergleich immer, egal wie gross man es setzt: es steht
 * in einer Spalte, die Überschrift auch, und die Überschrift ist lauter.
 *
 * Deshalb ist die Spalte weg. Logo, Überschrift und Einleitung stehen jetzt auf
 * EINER Mittelachse, und das Logo steht darauf zuerst und allein — es hat oben
 * die ganze Breite für sich und muss sie mit nichts teilen.
 *
 * Ihr Lockup ist 2,6 : 1 quer. Genau so ein Format braucht eine Mittelachse:
 * in einer Spalte ist es entweder klein oder es sprengt sie.
 *
 * ═══ Warum die Überschrift trotzdem die Überschrift bleibt ═══
 *
 * Ein zentriertes Logo über einer zentrierten Zeile ist der häufigste Weg,
 * einen Hero belanglos zu machen — beide werden dann gleich laut und keiner
 * führt. Das Gegenmittel steht in den Grössen, nicht in der Anordnung: das Logo
 * ist breit und ruhig, die Zeile darunter ist hoch und laut. Sie unterscheiden
 * sich in der Achse, in der sie wachsen, und deshalb kommen sie sich nicht in
 * die Quere.
 *
 * ═══ Warum das Bild jetzt unten liegt und quer ═══
 *
 * Siehe `lib/bildplaetze.ts`. Kurz: 3:4 war ein Studioporträt-Slot, und was bei
 * einer Praxiseröffnung entsteht, ist ein Querbild aus den neuen Räumen. Unten
 * quer über die ganze Breite ist ausserdem die Stelle, an der ein einzelnes
 * Foto am meisten trägt — es trennt den Kopf der Seite vom Rest, statt neben
 * ihm um Aufmerksamkeit zu bitten.
 *
 * Beide Zeilen bilden EINE Überschrift. Zwei h1 wären zwei Themen, und die
 * zweite Zeile als Absatz wäre für Google eine Bildunterschrift.
 */
export function Hero() {
  const auf = useSchriftBereit();
  const marke = useAndocken();

  return (
    <section className={`hero ${auf ? 'hero--auf' : ''}`} aria-labelledby="hero-titel">
      <div className="hero__kopf">
        <div className="hero__marke" ref={marke}>
          <Marke alsUeberschrift />
        </div>

        {/* Die grosse Zeile kommt unter einer Kante hervor, statt einzublenden.
            Die Maske ist ein zweites Element, weil `overflow: hidden` auf dem
            bewegten Element selbst nichts abschneiden kann — es muss der Rahmen
            sein, der steht, und der Inhalt, der sich darin bewegt. */}
        <h1 id="hero-titel" className="hero__titel">
          <span className="t-hero hero__zeile1">
            <span className="hero__maske">
              <span className="hero__hub">Medizin für Frauen</span>
            </span>
          </span>
          <span className="hero__zeile2">Die neue gynäkologische Praxis in {praxis.ort}</span>
        </h1>
      </div>

      <Buehne />

      {/*
        ═══ Warum Einleitung und Sprechzeit UNTER dem Bild stehen ═══

        Sie standen zuerst darüber, mit allem anderen auf der Mittelachse.
        Gemessen bei 1440 × 1000: die Oberkante des Bildes lag dann bei 1185px —
        also unter der Falz, zusammen mit Sprechzeit und Telefonnummer. Beides
        war in der zweispaltigen Fassung sofort sichtbar gewesen.

        Das ist kein Schönheitsfehler. Der Wettbewerbsbefund vom 18.08.2026 —
        drei der vier Erkelenzer Praxen zeigen Zeiten oder Nummer ganz oben —
        war der Grund, warum dieser Block überhaupt im Hero sitzt. Ihn unter die
        Falz zu schieben, hebt genau diese Entscheidung wieder auf.

        Unter dem Bild lösen sich zwei Dinge auf einmal: die Oberkante des
        Bildes rückt auf rund 815px und ist damit im ersten Bild, und der Text
        steht wieder linksbündig. Vier zentrierte Absätze hintereinander sind
        eine Wand — beim zentrierten Satz sucht das Auge nach jeder Zeile den
        Anfang neu, und das trägt eine Überschrift, aber keinen Fliesstext.

        Ihre Vorgabe „Foto von mir und kurzer Einleitungstext" bleibt gewahrt:
        der Text steht beim Foto. Nur darunter statt darüber.
      */}
      <div className="hero__fuss">
        <div className="hero__einleitung t-lead">
          <p>
            In {praxis.ort} entsteht eine neue gynäkologische Praxis. Vorsorge, Schwangerschaft, Verhütung und
            Kinderwunsch — und eine eigene Sprechstunde für Mädchen und junge Frauen.
          </p>
          {/* Der zweite Satz dieses Absatzes — „Sie sollen wissen, was gleich
              passiert, bevor es passiert" — steht jetzt als eigene Sektion in
              der grössten Schrift der Seite. Er ist die These der Praxis und
              ging hier als Halbsatz unter. Siehe Aussage.tsx. */}
          <p>Ich nehme mir für jede Untersuchung die Zeit, sie vorher zu erklären.</p>
        </div>

        <Praxisdaten />
      </div>
    </section>
  );
}

/**
 * Das Andocken: solange das grosse Logo im Bild ist, bleibt die Kopfzeile leer.
 *
 * ═══ Warum ein Attribut am `<html>` und kein gemeinsamer Zustand ═══
 *
 * Weil Hero und Kopfzeile keine gemeinsame Wurzel haben, die den Zustand halten
 * könnte — die Kopfzeile steht im Rahmen, der Hero in der Seite. Die
 * Alternativen wären ein Kontext quer durch die ganze Anwendung oder ein Ereignis
 * zwischen zwei Komponenten. Beides ist mehr Maschinerie als die Sache wert ist:
 * es geht um ein Ja/Nein, das nur die Gestaltung interessiert, und dafür ist ein
 * Attribut am Wurzelelement das ehrlichste Mittel — CSS liest es direkt.
 *
 * ═══ Warum `useLayoutEffect` und nicht `useEffect` ═══
 *
 * Weil der Beobachter seinen ersten Befund erst nach dem ersten Bild liefert.
 * Bis dahin stünde die Marke in der Kopfzeile sichtbar da und verschwände dann —
 * ein Aufblitzen genau im ersten Moment, den jemand von der Seite sieht.
 * `useLayoutEffect` setzt das Attribut VOR dem ersten Bild.
 *
 * ═══ Warum beim Verlassen aufgeräumt wird ═══
 *
 * Weil das Attribut am `<html>` hängt und die Startseite verlassen werden kann.
 * Bliebe es stehen, wäre die Kopfzeile auf der nächsten Seite dauerhaft leer —
 * und niemand käme auf die Idee, den Grund im Hero zu suchen.
 */
function useAndocken() {
  const knoten = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = knoten.current;
    if (!el) return;

    const wurzel = document.documentElement;
    wurzel.dataset.markeImHero = 'ja';

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        wurzel.dataset.markeImHero = eintrag?.isIntersecting ? 'ja' : 'nein';
      },
      /* Erst wenn das Logo ganz oben hinaus ist. Der Einzug von oben sorgt dafür,
         dass die Marke nicht schon auftaucht, während das Logo noch halb unter
         der Kopfzeile hervorschaut — dann stünden beide gleichzeitig da. */
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 },
    );

    beobachter.observe(el);
    return () => {
      beobachter.disconnect();
      delete wurzel.dataset.markeImHero;
    };
  }, []);

  return knoten;
}

/**
 * Wann die grosse Zeile hervorkommen darf: erst wenn die Schrift steht.
 *
 * ═══ Warum nicht einfach beim Mounten ═══
 *
 * Weil Montserrat dann noch lädt. Die Zeile führe ihre Bewegung in der
 * Ersatzschrift aus, käme zur Ruhe, und WÄHREND sie steht, tauschte der Browser
 * die Schrift — bei 120px verschiebt sich dabei jede Zeile sichtbar. Die
 * Bewegung wäre sauber und der Moment danach kaputt.
 *
 * `document.fonts.ready` ist genau die Zusage, die hier fehlt. Der Rückfall auf
 * `setTimeout` ist keine Vorsicht, sondern Notwendigkeit: hängt das Versprechen
 * (abgebrochene Ladung, Netz weg), stünde die Überschrift sonst dauerhaft
 * unsichtbar hinter ihrer Maske. Eine unsichtbare Überschrift ist der teuerste
 * Fehler, den diese Datei machen kann.
 */
function useSchriftBereit(): boolean {
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBereit(true);
      return;
    }

    let abgebrochen = false;
    const zeigen = () => {
      if (!abgebrochen) setBereit(true);
    };

    document.fonts.ready.then(zeigen, zeigen);
    const notausgang = window.setTimeout(zeigen, 1200);

    return () => {
      abgebrochen = true;
      window.clearTimeout(notausgang);
    };
  }, []);

  return bereit;
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
            <Hoerer className="knopf__zeichen" />
            {praxis.telefon.anzeige} anrufen
          </a>
        ) : (
          <a className="knopf" href={weg('/termin/')}>
            <Uhr className="knopf__zeichen" />
            Zeiten und Termin
          </a>
        )}
        <a className="knopf knopf--leise" href={weg('/termin/')}>
          <Uhr className="knopf__zeichen" />
          Alle Sprechzeiten
        </a>
      </div>
    </div>
  );
}

/**
 * Die Bühne: das eine grosse Bild, quer über die volle Breite.
 *
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
 *
 * ═══ Was hier NICHT mehr steht ═══
 *
 * Die Frage, ob ihr Porträt schon da ist. Die beantwortet das Bildregister
 * (`lib/bildplaetze.ts`) für alle Bildplätze der Seite an einer Stelle. Diese
 * Komponente bekommt eine Quelle, eine Beschreibung und ein Ja/Nein und muss
 * nichts davon selbst herleiten.
 */
function Buehne() {
  const bild = useRef<HTMLImageElement>(null);
  const [da, setDa] = useState(false);
  const zeigen_ = zeigt(HERO_PLATZ);

  useEffect(() => {
    const el = bild.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDa(true);
      return;
    }

    let abgebrochen = false;
    const fertig = () => {
      if (!abgebrochen) setDa(true);
    };

    el.decode().then(fertig, fertig);
    return () => {
      abgebrochen = true;
    };
  }, []);

  return (
    <figure
      className={`hero__buehne ${da ? 'hero__buehne--da' : ''}`}
      /* Zwei Verhältnisse als Variablen, die Medienabfrage wählt in `hero.css`.
         Beide kommen aus dem Register — hier steht keine Geometrie. */
      style={
        {
          '--verhaeltnis-breit': zeigen_.verhaeltnis,
          '--verhaeltnis-schmal': zeigen_.verhaeltnisSchmal,
        } as CSSProperties
      }
    >
      {/*
       * „Foto folgt".
       *
       * ═══ Warum eine Markierung und kein Symbolbild ═══
       *
       * Weil ein Symbolbild einer Ärztin genau das wäre, was diese Seite
       * nirgends tut: eine Behauptung über etwas, das es noch nicht gibt. Eine
       * Fremde in einem Kittel auf der Startseite einer Einzelpraxis ist die
       * schlimmste Variante davon — die Patientin glaubt, sie hätte die Ärztin
       * gesehen.
       *
       * ═══ Warum sie im Bild sitzt und nicht darunter ═══
       *
       * Weil sie sonst wie eine Bildunterschrift aussähe und damit wie Inhalt.
       * Sie liegt auf der Studie, in Papier auf Papier, und sagt in zwei Sätzen,
       * was hier hingehört. Kein Schlagschatten, kein Milchglas: eine Fläche,
       * wie überall.
       *
       * Sie verschwindet, sobald im Register eine Datei steht — es gibt keinen
       * zweiten Handgriff, den jemand vergessen könnte.
       */}
      {zeigen_.echt ? null : (
        <p className="hero__marker">
          <span className="hero__marker-wort">{HERO_PLATZ.ersatz.wort}</span>
          <span className="hero__marker-satz">{HERO_PLATZ.ersatz.satz}</span>
        </p>
      )}
      <img
        ref={bild}
        src={weg(zeigen_.src)}
        /*
         * Drei Grössen, solange die Materialstudie den Platz hält.
         *
         * ═══ Warum das hier besonders viel ausmacht ═══
         *
         * Das ist das erste Bild der Seite, es lädt `eager` und mit hoher
         * Priorität — es ist damit das, worauf eine Patientin am Handy im
         * Mobilfunknetz wartet. Gemessen am 20.08.2026 wurden dafür 1800px
         * ausgeliefert und auf 393px dargestellt: 64 kB für ein Bild, das in
         * 3,4 kB dieselbe Fläche füllt.
         *
         * Sobald ihr echtes Foto da ist, greift `srcset` nicht mehr — dann
         * steht dort eine Datei, und die Grössen dafür gibt es noch nicht. Das
         * ist Absicht: lieber ein einzelnes, korrekt eingesetztes Bild als ein
         * `srcset`, das auf drei Dateien zeigt, von denen zwei fehlen.
         */
        {...(zeigen_.echt ? {} : { srcSet: heroSrcSet(weg('/')), sizes: HERO_SIZES })}
        width={zeigen_.breite}
        height={zeigen_.hoehe}
        style={{ objectPosition: zeigen_.fokus }}
        /* Das erste Bild der Seite. `eager` und hohe Priorität, sonst steht es
           in der Warteschlange hinter dem Bündel — und die halbe Startseite ist
           dann eine leere Fläche. */
        loading="eager"
        /* Kleingeschrieben und über einen Spread.
           React 18 kennt `fetchPriority` in camelCase nicht: es setzt das
           Attribut zwar, warnt aber bei jedem Aufbau in der Konsole. Gemessen am
           30.08.2026 war das die einzige Konsolenmeldung der Startseite — und
           eine Konsole voller bekannter Warnungen ist der Ort, an dem ein echter
           Fehler unbemerkt liegt. */
        {...({ fetchpriority: 'high' } as Record<string, string>)}
        decoding="async"
        /* Die Bildbeschreibung beschreibt, was WIRKLICH zu sehen ist. „Porträt
           der Ärztin" wäre hier eine Falschangabe gegenüber genau den
           Nutzerinnen, die das Bild nicht sehen können. */
        alt={zeigen_.alt}
      />
    </figure>
  );
}
