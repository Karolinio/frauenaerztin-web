import { useCallback, useEffect, useRef, useState } from 'react';
import { praxis } from '../../praxis.config';
import { steht } from '../ui/Angabe';
import { weg } from '../../lib/weg';
import { PRAXIS_PLAETZE, praxisLead, zeigt, type Bildplatz } from '../../lib/bildplaetze';
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

/**
 * ═══ Die beiden Kachelsätze sind weg (30.08.2026) ═══
 *
 * Hier standen `PRAXIS_KACHELN` und `MATERIAL_KACHELN`: zwei Listen aus Dateien
 * mit fest eingetragenen Pixelmassen, zwischen denen der Aufrufer wählte. Die
 * Startseite nahm die Materialstudien, `/praxis/` die Praxis-Slots.
 *
 * Das war die Stelle, an der am Liefertag etwas hängengeblieben wäre. Die beiden
 * Sätze hatten verschiedene Seitenverhältnisse — die Reihe hätte beim Einsetzen
 * der echten Fotos ihre Höhen geändert — und ihre Bildunterschriften und
 * Leitsätze („noch nicht fotografiert") standen im Aufrufer, nicht bei den
 * Bildern.
 *
 * Beides liegt jetzt in `lib/bildplaetze.ts`: das Seitenverhältnis am PLATZ, die
 * Datei darin austauschbar. Diese Komponente stellt nur noch dar.
 */

/** Wie stark der Schwung nachläuft. Aus dem Gefühl gedreht, nicht aus einer Formel. */
const NACHLAUF_MS = 240;
/** Ab hier gilt eine Zeigerbewegung als Ziehen und nicht mehr als Klick. */
const ZIEH_SCHWELLE = 6;

/**
 * ═══ Warum die Galerie jetzt zweimal vorkommt ═══
 *
 * Weil Yvonne es am 20.08.2026 ausdrücklich so wollte: die Bilder sollen sich
 * von links nach rechts schieben lassen, und die Parallaxe auf der Startseite
 * soll weg. Dort stand bis dahin ein gestaffeltes Bilderband, das beim Scrollen
 * wanderte — technisch sauber, aber eben nicht das, was sie bestellt hat.
 *
 * Die Direktion sagte „genau EIN Element mit voller Tiefe". Das galt gegen drei
 * konkurrierende Showpieces und bleibt richtig — deshalb wird hier nicht eine
 * zweite Mechanik gebaut, sondern DIESE wiederverwendet. Zwei Sektionen, die
 * sich gleich anfassen, sind eine Handschrift; zwei Sektionen, die sich
 * verschieden anfassen, sind ein Demo-Reel.
 *
 * Die Startseiten-Fassung ist die leisere: kleinere Kacheln, keine Adresskarte
 * am Ende. Die Adresse steht dort schon im Terminblock, und ein zweiter
 * „nächster Schritt" auf derselben Seite ist keiner.
 */
export function ZiehGalerie({
  plaetze = PRAXIS_PLAETZE,
  titel = 'Die Räume',
  lead,
  kennung = 'galerie-titel',
  mitKarte = true,
  weiter,
  klein = false,
  erstesBildSofort = true,
}: {
  plaetze?: readonly Bildplatz[];
  titel?: string;
  /**
   * Der Leitsatz. Wird er weggelassen, schreibt ihn das Register — und zwar
   * passend dazu, ob echte Fotos da sind. Das ist der Normalfall und soll es
   * bleiben: ein von Hand gesetzter Leitsatz ist der Satz, der nach der
   * Lieferung unter echten Fotos „noch nicht fotografiert" behauptet.
   */
  lead?: string;
  kennung?: string;
  mitKarte?: boolean;
  /**
   * Der Weg aus der Reihe heraus.
   *
   * Am Ende der grossen Fassung steht eine Karte mit Anschrift und Terminknopf.
   * Die kleine Fassung auf der Startseite hat sie nicht — dort stünde ein
   * zweiter „nächster Schritt" neben dem Terminblock. Ohne Ersatz war die Reihe
   * dort aber eine Sackgasse: vier Bilder der Praxis, und kein Weg zu der Seite,
   * auf der es mehr davon gibt.
   */
  weiter?: { readonly href: string; readonly text: string };
  klein?: boolean;
  /**
   * Ob die erste Kachel sofort geholt wird.
   *
   * Auf `/praxis/` steht die Galerie weit oben und ist beim Oeffnen im Bild —
   * dort ist `eager` richtig. Auf der Startseite steht sie in der unteren
   * Haelfte, und dort war es schlicht falsch: gemessen am 20.08.2026 lud eine
   * Patientin am Handy 72,8 kB fuer ein Bild, das sie erst nach vier
   * Bildschirmhoehen sieht — bei 545 kB Gesamtgewicht der groesste einzelne
   * vermeidbare Posten.
   */
  erstesBildSofort?: boolean;
} = {}) {
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
    <section className={`galerie ${klein ? 'galerie--klein' : ''}`} aria-labelledby={kennung}>
      <div className="schale">
        <h2 id={kennung} className="t-section galerie__titel">
          {titel}
        </h2>
        <p className="t-body galerie__lead">{lead ?? praxisLead(plaetze)}</p>
        <p className="t-meta galerie__anleitung">
          Zum Verschieben ziehen oder wischen. Mit der Tabulatortaste hineinspringen, dann mit den Pfeiltasten
          weiter.
        </p>
        {weiter ? (
          <a className="link galerie__weiter" href={weiter.href}>
            {weiter.text}
          </a>
        ) : null}
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
        {plaetze.map((platz, i) => {
          const bild = zeigt(platz);
          return (
            <figure
              key={platz.kennung}
              className="galerie__kachel"
              /* Das Seitenverhältnis kommt vom PLATZ, nicht von der Datei. Damit
                 ändert sich die Reihe nicht, wenn ihre Fotos die Studien
                 ablösen — gleiche Höhen, gleiche Kanten, gleicher Rastpunkt. */
              style={{ aspectRatio: bild.verhaeltnis }}
              tabIndex={0}
              onKeyDown={taste}
            >
              <img
                src={weg(bild.src)}
                width={bild.breite}
                height={bild.hoehe}
                style={{ objectPosition: bild.fokus }}
                /* Die erste Kachel ist beim Öffnen im Bild und wird sofort geholt.
                   Die übrigen erst beim Heranziehen — sonst lädt eine Patientin im
                   Mobilfunknetz vier Bilder für eines, das sie sieht. */
                loading={i === 0 && erstesBildSofort ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                alt={bild.alt}
              />
              <figcaption className="t-meta galerie__unterschrift">{bild.unterschrift}</figcaption>
            </figure>
          );
        })}

        {/* Am Ende der Reihe steht kein weiteres Bild, sondern der nächste
            Schritt. Die Galerie endet dort, wo etwas zu tun ist.
            Auf der Startseite entfällt die Karte: die Adresse steht dort schon
            im Terminblock, und zwei „nächste Schritte" sind keiner. */}
        {mitKarte ? (
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
        ) : null}
      </div>

      <div className="schale">
        <div className="galerie__linie" aria-hidden="true">
          <div className="galerie__balken" style={{ width: `${balken.breite}%`, left: `${balken.links}%` }} />
        </div>
      </div>
    </section>
  );
}
