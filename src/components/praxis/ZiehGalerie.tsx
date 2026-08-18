import { useCallback, useEffect, useRef, useState } from 'react';
import { praxis } from '../../praxis.config';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';
import './ziehgalerie.css';

/**
 * Die Zieh-Galerie — das Showpiece dieser Seite, und das einzige Element mit
 * voller Tiefe.
 *
 * ═══ Warum ausgerechnet dieses ═══
 *
 * Weil die Kundin es selbst bestellt hat, wörtlich:
 *
 *   „Oder dass man bei den Fotos der Praxis die Fotos nicht alle untereinander
 *    hat, sondern so verschieben kann."
 *
 * Sie hat „verschieben" gesagt und nicht „durchlaufen". Es gibt deshalb keine
 * Automatik, keine Punkte darunter und keine Pfeilknöpfe links und rechts: das
 * hier ist etwas, das sie BEDIENT, nicht etwas, das ihr vorgeführt wird.
 *
 * Und es bleibt das einzige. Drei gleich aufwendige Sektionen konkurrieren, und
 * eine Arztseite liest sich dann als Demo-Reel.
 *
 * ═══ Die Arbeitsteilung zwischen Browser und Code ═══
 *
 * Am Handy macht der Browser alles besser als jedes Skript: Wischen, Schwung,
 * Gummiband am Ende. Dort läuft natives Scrollen mit `scroll-snap-type:
 * proximity` — „proximity" statt „mandatory", weil mandatory schnappt und die
 * Direktion ausdrücklich sagt: es rastet, aber es schnappt nicht.
 *
 * Am Rechner gibt es kein Wischen. Nur dort übernimmt der Code das Ziehen mit
 * gedrückter Maustaste und das Auslaufen danach. Beide Wege sind über eine
 * Medienabfrage getrennt und kommen sich nie in die Quere.
 */

interface Kachel {
  readonly datei: string;
  readonly breite: number;
  readonly hoehe: number;
  readonly alt: string;
  readonly bildunterschrift: string;
}

/**
 * Die vier Slots. Nach der Eröffnung wird hier die Datei getauscht — gleiche
 * Masse, gleiche Position, kein Umbau. Siehe `public/bilder/PLATZHALTER.md`.
 *
 * Die Bildunterschriften sagen, was WIRKLICH zu sehen ist. Eine Materialstudie
 * als „unser Wartezimmer" auszugeben wäre eine Aussage über einen Ort, den eine
 * Patientin betreten wird — und den es noch nicht gibt.
 */
const KACHELN: readonly Kachel[] = [
  {
    datei: 'praxis-01.webp',
    breite: 1400,
    hoehe: 1045,
    alt: 'Leere helle Ecke mit frisch gestrichenem Kalkputz und flacher Fussleiste, Tageslicht von links oben.',
    bildunterschrift: 'Kalkputz und Fussleiste',
  },
  {
    datei: 'praxis-02.webp',
    breite: 1000,
    hoehe: 1491,
    alt: 'Naturbelassenes Leinengewebe im Streiflicht, die einzelnen Fäden sind zu erkennen.',
    bildunterschrift: 'Leinen im Streiflicht',
  },
  {
    datei: 'praxis-03.webp',
    breite: 1800,
    hoehe: 1005,
    alt: 'Heller Estrichboden, über den ein weiches Fensterlicht als Rechteck läuft.',
    bildunterschrift: 'Licht auf hellem Boden',
  },
  {
    datei: 'praxis-04.webp',
    breite: 1400,
    hoehe: 939,
    alt: 'Glatte warmweisse Fläche mit einem weichen Lichtverlauf von links oben nach rechts unten.',
    bildunterschrift: 'Tageslicht auf heller Fläche',
  },
];

/** Wie stark der Schwung nachläuft. Aus dem Gefühl gedreht, nicht aus einer Formel. */
const NACHLAUF_MS = 240;
/** Ab hier gilt eine Zeigerbewegung als Ziehen und nicht mehr als Klick. */
const ZIEH_SCHWELLE = 6;

export function ZiehGalerie() {
  const spur = useRef<HTMLDivElement>(null);
  const [balken, setBalken] = useState({ breite: 0, links: 0 });
  const laeuft = useRef(0);

  /* ── Der Fortschrittsbalken ─────────────────────────────────────────────
     Er ist so breit, wie der sichtbare Teil zur Gesamtbreite steht, und er ist
     selbst KEIN Bedienelement — deshalb ein `div` und kein `input`. Wer ihn
     bedienbar macht, hat ein zweites Bedienelement für dieselbe Sache, und die
     beiden stimmen irgendwann nicht mehr überein. */
  const balkenMessen = useCallback(() => {
    const el = spur.current;
    if (!el || el.scrollWidth <= 0) return;
    setBalken({
      breite: (el.clientWidth / el.scrollWidth) * 100,
      links: (el.scrollLeft / el.scrollWidth) * 100,
    });
  }, []);

  useEffect(() => {
    const el = spur.current;
    if (!el) return;
    balkenMessen();
    el.addEventListener('scroll', balkenMessen, { passive: true });
    /* Nach dem Laden der Bilder ändert sich `scrollWidth` — ohne diesen
       Beobachter zeigt der Balken die Breite von vor dem Laden an. */
    const beobachter = new ResizeObserver(balkenMessen);
    beobachter.observe(el);
    return () => {
      el.removeEventListener('scroll', balkenMessen);
      beobachter.disconnect();
    };
  }, [balkenMessen]);

  /** Die Kanten aller Kacheln, relativ zum Anfang der Spur. */
  const kanten = useCallback((): number[] => {
    const el = spur.current;
    if (!el) return [];
    return [...el.children].map((k) => (k as HTMLElement).offsetLeft - el.offsetLeft);
  }, []);

  const naechsteKante = useCallback(
    (ziel: number): number => {
      const alle = kanten();
      if (alle.length === 0) return ziel;
      const grenze = (spur.current?.scrollWidth ?? 0) - (spur.current?.clientWidth ?? 0);
      const gewaehlt = alle.reduce((a, b) => (Math.abs(b - ziel) < Math.abs(a - ziel) ? b : a));
      /* Nie über das Ende hinaus einrasten: sonst federt der Browser zurück und
         die Bewegung endet mit einem Zucken statt in Ruhe. */
      return Math.max(0, Math.min(gewaehlt, grenze));
    },
    [kanten],
  );

  /**
   * Das Auslaufen: abnehmende Geschwindigkeit bis zur nächsten Bildkante.
   *
   * Bewusst KEIN `scrollTo({behavior:'smooth'})` — dessen Dauer bestimmt der
   * Browser, sie ist in Firefox und Chrome verschieden lang, und sie ignoriert,
   * wie schnell gezogen wurde. Ein Zug, der langsam war, muss kurz auslaufen.
   */
  const auslaufen = useCallback((von: number, nach: number) => {
    const el = spur.current;
    if (!el) return;
    const strecke = nach - von;
    if (Math.abs(strecke) < 1) return;

    const dauer = Math.min(900, Math.max(280, Math.abs(strecke) * 1.6));
    const start = performance.now();
    cancelAnimationFrame(laeuft.current);

    const schritt = (jetzt: number) => {
      const t = Math.min(1, (jetzt - start) / dauer);
      /* Ease-out mit dem Kurvenverlauf der Direktion: schnell heraus, lange
         hinein. Das ist der Unterschied zwischen „kommt zur Ruhe" und „hält an". */
      const p = 1 - Math.pow(1 - t, 3);
      el.scrollLeft = von + strecke * p;
      if (t < 1) laeuft.current = requestAnimationFrame(schritt);
    };
    laeuft.current = requestAnimationFrame(schritt);
  }, []);

  useEffect(() => () => cancelAnimationFrame(laeuft.current), []);

  /* ── Ziehen mit gedrückter Maustaste ─────────────────────────────────────
     Nur für feine Zeiger. Am Handy macht das der Browser selbst, und zwar
     besser: mit Schwung, Gummiband und ohne einen einzigen rAF-Durchlauf. */

  const zug = useRef<{
    aktiv: boolean;
    startX: number;
    startScroll: number;
    letztX: number;
    letztZeit: number;
    tempo: number;
    gezogen: boolean;
  } | null>(null);

  const runter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = spur.current;
    if (!el) return;
    cancelAnimationFrame(laeuft.current);
    zug.current = {
      aktiv: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      letztX: e.clientX,
      letztZeit: performance.now(),
      tempo: 0,
      gezogen: false,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add('galerie__spur--zieht');
  };

  const bewegen = (e: React.PointerEvent<HTMLDivElement>) => {
    const z = zug.current;
    const el = spur.current;
    if (!z?.aktiv || !el) return;

    const dx = e.clientX - z.startX;
    if (Math.abs(dx) > ZIEH_SCHWELLE) z.gezogen = true;

    /* Eins zu eins und ohne Verzögerung: der Inhalt klebt am Zeiger. Jede
       Glättung hier fühlt sich an wie eine Verzögerung, nicht wie Sanftheit. */
    el.scrollLeft = z.startScroll - dx;

    const jetzt = performance.now();
    const dt = jetzt - z.letztZeit;
    if (dt > 0) z.tempo = (e.clientX - z.letztX) / dt;
    z.letztX = e.clientX;
    z.letztZeit = jetzt;
  };

  const hoch = (e: React.PointerEvent<HTMLDivElement>) => {
    const z = zug.current;
    const el = spur.current;
    if (!z?.aktiv || !el) return;
    z.aktiv = false;
    el.classList.remove('galerie__spur--zieht');
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);

    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* Ohne Bewegung: hart auf die nächste Kante. Bedienbar bleibt alles — nur
       nichts gleitet. */
    if (ruhig) {
      el.scrollLeft = naechsteKante(el.scrollLeft);
      return;
    }

    const projiziert = el.scrollLeft - z.tempo * NACHLAUF_MS;
    auslaufen(el.scrollLeft, naechsteKante(projiziert));
  };

  /* Ein Zug, der über einem Verweis endet, darf ihn nicht auslösen. */
  const klickSperre = (e: React.MouseEvent) => {
    if (zug.current?.gezogen) {
      e.preventDefault();
      zug.current.gezogen = false;
    }
  };

  /**
   * Pfeiltasten links und rechts, sobald eine Kachel den Fokus hat.
   *
   * Der Fokus wandert MIT — sonst tastet man sich blind durch eine Reihe, die
   * sich unter dem Fokusring wegbewegt. Bei abgewählter Bewegung springt es
   * hart auf die nächste Kante statt zu gleiten.
   */
  const taste = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const el = spur.current;
    const von = e.currentTarget;
    if (!el) return;
    e.preventDefault();

    const richtung = e.key === 'ArrowRight' ? 1 : -1;
    const alle = [...el.children] as HTMLElement[];
    const jetzt = alle.indexOf(von);
    const ziel = alle[Math.max(0, Math.min(alle.length - 1, jetzt + richtung))];
    if (!ziel) return;

    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ziel.focus({ preventScroll: true });
    const kante = Math.max(0, Math.min(ziel.offsetLeft - el.offsetLeft, el.scrollWidth - el.clientWidth));
    if (ruhig) el.scrollLeft = kante;
    else auslaufen(el.scrollLeft, kante);
  };

  const anschriftSteht = steht(praxis.adresse.strasse) && steht(praxis.adresse.plz);

  return (
    <section className="galerie" aria-labelledby="galerie-titel">
      <div className="schale">
        <h2 id="galerie-titel" className="t-section galerie__titel">
          Die Räume
        </h2>
        <p className="t-body galerie__lead">
          Die Praxis wird gerade gebaut, fotografiert ist sie noch nicht. Solange stehen hier Material- und
          Lichtstudien — der Putz, das Leinen, das Licht, mit dem eingerichtet wird. Nach der Eröffnung stehen
          an denselben Stellen die echten Fotos.
        </p>
        <p className="t-meta galerie__anleitung">
          Zum Verschieben ziehen oder wischen. Mit der Tabulatortaste hineinspringen, dann mit den Pfeiltasten
          weiter.
        </p>
      </div>

      <div
        ref={spur}
        className="galerie__spur"
        onPointerDown={runter}
        onPointerMove={bewegen}
        onPointerUp={hoch}
        onPointerCancel={hoch}
        onClickCapture={klickSperre}
      >
        {KACHELN.map((k, i) => (
          <figure
            key={k.datei}
            className="galerie__kachel"
            style={{ aspectRatio: `${k.breite} / ${k.hoehe}` }}
            tabIndex={0}
            onKeyDown={taste}
          >
            <img
              src={weg(`/bilder/${k.datei}`)}
              width={k.breite}
              height={k.hoehe}
              /* Die erste Kachel ist beim Öffnen im Bild und wird sofort geholt.
                 Die übrigen erst beim Heranziehen — sonst lädt eine Patientin im
                 Mobilfunknetz vier Bilder für eines, das sie sieht. */
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              alt={k.alt}
            />
            <figcaption className="t-meta galerie__unterschrift">{k.bildunterschrift}</figcaption>
          </figure>
        ))}

        {/* Am Ende der Reihe steht kein weiteres Bild, sondern der nächste
            Schritt. Die Galerie endet dort, wo etwas zu tun ist. */}
        <div className="galerie__karte" tabIndex={0} onKeyDown={taste}>
          <p className="t-label">Hierher kommen Sie</p>
          <address className="galerie__adresse">
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
          <a className="knopf galerie__knopf" href={weg('/termin/')}>
            Termin und Zeiten
          </a>
          <a className="link galerie__weg" href={weg('/kontakt/')}>
            Anfahrt und Parken
          </a>
        </div>
      </div>

      <div className="schale">
        <div className="galerie__linie" aria-hidden="true">
          <div className="galerie__balken" style={{ width: `${balken.breite}%`, left: `${balken.links}%` }} />
        </div>
      </div>
    </section>
  );
}
