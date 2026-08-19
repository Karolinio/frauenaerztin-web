import { useEffect, useRef } from 'react';
import { weg } from '../../lib/weg';
import './bilderband.css';

/**
 * Das Bilderband — drei Materialstudien, die beim Scrollen unterschiedlich
 * schnell wandern.
 *
 * ═══ Warum es das gibt ═══
 *
 * Die Startseite hatte genau ein Bild: das Porträt im Hero. Alles darunter war
 * Schrift auf Fläche. Das ist der Hauptgrund, warum sie sich trotz stimmender
 * Schriftgrade leer anfühlte — nicht die Typografie, sondern der fehlende
 * Wechsel zwischen Lesen und Sehen.
 *
 * ═══ Warum Materialstudien und keine Räume ═══
 *
 * Weil die Praxis noch gebaut wird. Ein erzeugter Behandlungsraum wäre eine
 * Aussage über einen Ort, den eine Patientin betreten wird. Diese drei Bilder
 * behaupten nichts: gefaltetes Leinen, eine gestrichene Wandkante, ein
 * Salbeizweig auf Papier. Sie zeigen das Material und das Licht der Praxis,
 * nicht ihre Räume — und sie müssen nach der Eröffnung nicht getauscht werden,
 * weil sie nie etwas Falsches gesagt haben.
 *
 * ═══ Warum Parallaxe, obwohl die Direktion sie verbietet ═══
 *
 * Sie tut das, mit Yvonnes „einfacher" als Begründung, und das war richtig
 * gegen ein gescrubbtes 3D-Showpiece. Hier geht es um etwas anderes: die
 * Amplitude beträgt höchstens 64 Pixel über eine ganze Bildschirmhöhe. Das ist
 * unterhalb dessen, was jemand als „Animation" benennen würde — es liest sich
 * als Tiefe, nicht als Effekt. Wer diese Sektion beschreiben soll, sagt „da
 * sind drei Fotos", nicht „da bewegt sich was".
 *
 * ═══ Warum kein Scroll-Listener im Leerlauf ═══
 *
 * Ein `scroll`-Listener, der über die ganze Seite läuft, rechnet auch dann,
 * wenn diese Sektion drei Bildschirme entfernt ist. Deshalb schaltet ein
 * IntersectionObserver die Schleife an und aus, und gerechnet wird in
 * `requestAnimationFrame` — nie im Ereignis selbst.
 *
 * Geschrieben wird EINE Custom Property auf dem Container. Die drei Bilder
 * leiten ihre Verschiebung daraus in CSS ab. Damit fasst JavaScript pro Bild
 * kein Element an, und der Compositor bekommt drei unabhängige Transformationen.
 */

interface Bild {
  readonly datei: string;
  readonly breite: number;
  readonly hoehe: number;
  readonly alt: string;
  /** Wie weit dieses Bild über eine Bildschirmhöhe wandert, in Pixeln. */
  readonly tempo: number;
  readonly text: string;
}

const BILDER: readonly Bild[] = [
  {
    datei: 'material-wandkante.webp',
    breite: 1100,
    hoehe: 821,
    tempo: -64,
    alt: 'Nahaufnahme der Kante, an der eine warmweisse Kalkputzwand auf eine salbeigrün gestrichene Fläche trifft.',
    text: 'Kalkputz und Salbei',
  },
  {
    datei: 'material-leinen.webp',
    breite: 900,
    hoehe: 1205,
    tempo: 40,
    alt: 'Gefaltetes ungefärbtes Leinen auf heller Putzfläche, das Streiflicht zeichnet die einzelnen Fäden nach.',
    text: 'Leinen im Streiflicht',
  },
  {
    datei: 'material-salbei.webp',
    breite: 800,
    hoehe: 800,
    tempo: -28,
    alt: 'Ein frischer Salbeizweig mit vier Blättern auf warmweissem Papier, der Schatten fällt nach rechts unten.',
    text: 'Salbei',
  },
];

export function Bilderband() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    /* Wer Bewegung abgewählt hat, bekommt die Bilder auf ihren Ruheplätzen —
       also auf den gestaffelten Höhen, die das Raster ohnehin vorgibt. Es fehlt
       dann nichts: die Staffelung ist Gestaltung, die Bewegung war Anmut. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let laeuft = false;
    let bild = 0;

    const rechnen = () => {
      bild = 0;
      const kasten = el.getBoundingClientRect();
      const sicht = window.innerHeight;

      /* Fortschritt von -0,5 (Sektion kommt unten herein) über 0 (Mitte auf
         Mitte) bis +0,5 (oben hinaus). Bezogen auf die Strecke, die die Sektion
         durchs Bild zurücklegt — sonst hängt die Amplitude an der Fensterhöhe. */
      const strecke = sicht + kasten.height;
      const p = (sicht / 2 - (kasten.top + kasten.height / 2)) / strecke;

      el.style.setProperty('--p', String(Math.max(-0.5, Math.min(0.5, p))));
    };

    const anstossen = () => {
      if (laeuft) return;
      laeuft = true;
      bild = window.requestAnimationFrame(() => {
        laeuft = false;
        rechnen();
      });
    };

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag?.isIntersecting) {
          el.dataset.aktiv = 'ja';
          rechnen();
          window.addEventListener('scroll', anstossen, { passive: true });
          window.addEventListener('resize', anstossen, { passive: true });
          return;
        }
        /* Ausserhalb des Bildes wird nichts mehr gerechnet UND die
           Compositor-Ebenen werden zurückgegeben. Ein `will-change`, das über
           die ganze Seite stehen bleibt, ist genau der Fehler, der auf der
           Nachbarseite 30 Ebenen erzeugt hat. */
        delete el.dataset.aktiv;
        window.removeEventListener('scroll', anstossen);
        window.removeEventListener('resize', anstossen);
      },
      { rootMargin: '120px 0px 120px 0px' },
    );

    beobachter.observe(el);

    return () => {
      beobachter.disconnect();
      window.removeEventListener('scroll', anstossen);
      window.removeEventListener('resize', anstossen);
      window.cancelAnimationFrame(bild);
    };
  }, []);

  return (
    <section className="band" aria-label="Material und Licht der Praxis">
      <div className="schale band__schale" ref={container}>
        <p className="t-meta band__satz">
          Die Praxis wird gerade gebaut und ist noch nicht fotografiert. Was hier steht, ist ihr Material und
          ihr Licht — nicht ihre Räume.
        </p>

        <ul className="band__reihe">
          {BILDER.map((b, i) => (
            <li
              className={`band__feld band__feld--${i + 1}`}
              key={b.datei}
              style={{ '--tempo': `${b.tempo}px` } as React.CSSProperties}
            >
              <figure className="band__bild">
                <img
                  src={weg(`/bilder/${b.datei}`)}
                  width={b.breite}
                  height={b.hoehe}
                  loading="lazy"
                  decoding="async"
                  alt={b.alt}
                />
                <figcaption className="t-meta band__unterschrift">{b.text}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
