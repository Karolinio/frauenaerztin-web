import type { CSSProperties, ReactNode } from 'react';
import { steht } from './Angabe';
import { weg } from '../../lib/weg';
import './formbild.css';

/**
 * Ein Porträt im Umriss ihrer Marke — auf der Startseite UND auf `/team/`.
 *
 * ═══ Warum ein eigener Baustein ═══
 *
 * Bis zum 03.10.2026 sassen die Gesichter auf der Startseite schon im Blob,
 * auf `/team/` aber noch in gestrichelten Rechtecken. Karol: „nicht konsistent".
 * Zwei Fassungen derselben Form driften — also gibt es sie genau einmal.
 *
 * ═══ Die Lage gehört zur Person, nicht zur Seite ═══
 *
 * `index` ist die Position in `inhalt/team.json`, nicht in der jeweiligen
 * Liste. Sonst stünde Sabine Matz auf der Startseite um −8° gedreht und auf
 * `/team/` um +4° — dieselbe Person, zwei Haltungen.
 */

/**
 * Drehung in Grad und Spiegelung (1 oder −1) je Person. Von Hand gesetzt statt
 * gewürfelt — gewürfelt stehen zwei Nachbarn manchmal fast gleich, und dann
 * sieht die Reihe gestempelt aus. Platz 0 ist die Ärztin.
 */
const LAGEN = [
  { dreh: 4, spiegel: 1 },
  { dreh: -8, spiegel: 1 },
  { dreh: 11, spiegel: -1 },
  { dreh: -3, spiegel: -1 },
  { dreh: 6, spiegel: 1 },
  { dreh: -12, spiegel: -1 },
  { dreh: 3, spiegel: 1 },
] as const;

export function Formbild({
  bild,
  alt,
  index,
  sofort = false,
  children,
}: {
  bild: string;
  /** Leer lassen, wenn der Name direkt daneben im selben Link steht. */
  alt: string;
  /** Position der Person in `inhalt/team.json`. */
  index: number;
  /** Nur für ein Bild, das beim Öffnen der Seite schon im Bild ist. */
  sofort?: boolean;
  /** Was im leeren Rahmen steht. Ohne Angabe: „Foto folgt". */
  children?: ReactNode;
}) {
  const lage = LAGEN[index % LAGEN.length]!;
  const da = steht(bild);
  const stil = {
    '--form': `url(${weg('/bilder/form.svg')})`,
    '--dreh': `${lage.dreh}deg`,
    '--spiegel': lage.spiegel,
  } as CSSProperties;

  return (
    <span className="formbild" style={stil} aria-hidden={!da && !children ? true : undefined}>
      {da ? (
        /* Die Datei bleibt 4:5 — dasselbe Verhältnis wie in `inhalt/schema.json`.
           Die Form schneidet daraus den oberen Teil mit dem Gesicht. */
        <img
          src={weg(bild)}
          width={400}
          height={500}
          loading={sofort ? 'eager' : 'lazy'}
          decoding="async"
          alt={alt}
        />
      ) : (
        <span className="formbild__leer">{children ?? <span className="luecke">Foto folgt</span>}</span>
      )}
    </span>
  );
}
