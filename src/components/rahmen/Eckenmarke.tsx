import { praxis } from '../../praxis.config';
import { weg } from '../../lib/weg';
import './eckenmarke.css';

/**
 * Das Wasserzeichen unten rechts.
 *
 * ═══ Woher das kommt ═══
 *
 * Aus `physio-mack-web/components/CornerLogo.tsx`, wo dasselbe seit dem
 * 01.07.2026 steht. Übernommen wurde die Idee, nicht der Code: dort läuft es
 * über GSAP und einen gescrubbten ScrollTrigger, und beides ist hier verboten —
 * eine Animationsbibliothek für ein Einblenden ist Ballast, den eine Patientin
 * im Mobilfunknetz bezahlt.
 *
 * ═══ Warum das VOLLE Logo und nicht die Bildmarke ═══
 *
 * Weil es bei Simon auch das volle ist, und zwar mit Ansage. Im dortigen Code
 * steht der Grund: *„Vollständige Langer-Wortmarke statt Symbol-only: Die
 * Symbol-Datei hat designbedingt flach gekappte db-Stämme und wirkt allein
 * ‚halb'."* Dort EXISTIERTE die Symbol-Datei und wurde trotzdem verworfen.
 *
 * Für Yvonnes Logo stellt sich die Frage gar nicht: ihre Bildmarke lässt sich
 * aus der gelieferten JPEG-Datei nicht herauslösen, weil „Dr." gestalterisch
 * auf der Blase liegt. Gebraucht wird sie hier aber auch nicht.
 *
 * ═══ Warum es hier heikler ist als bei Simon ═══
 *
 * Simons Logo ist Petrol (#00ACA9) auf einer dunklen, glasigen Seite — ein
 * Wasserzeichen bei 42 % Deckkraft liest sich dort. Yvonnes Blase ist #E8E8E8
 * auf einem Grund von #FBFAF6. Bei 42 % wäre es schlicht unsichtbar.
 *
 * Deshalb steht es hier bei 62 % und ist damit ehrlich gesagt an der Grenze
 * dessen, was diese Direktion trägt: eine helle Seite verträgt kein Zeichen,
 * das über dem Inhalt schwebt, so gut wie eine dunkle. Wenn es stört, ist die
 * ganze Komponente eine Zeile in `Seite.tsx`.
 *
 * ═══ Was es NICHT tut ═══
 *
 * Es fängt keine Klicks (`pointer-events: none`) und es wird nicht vorgelesen
 * (`aria-hidden`). Ein dekoratives Zeichen, das den Termin-Knopf darunter
 * blockiert, wäre der teuerste Zierrat der Seite.
 */
export function Eckenmarke() {
  const logo = praxis.logo;
  if (!logo) return null;

  return (
    <div className="eckenmarke" aria-hidden="true">
      <img
        src={weg(logo.src)}
        width={logo.breite}
        height={logo.hoehe}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
