import type { ReactElement } from 'react';
import type { Zeichen as ZeichenName } from '../../praxis.config';

/**
 * Handgezeichnete Marken für die Leistungen. Kein Icon-Set von der Stange,
 * 1.25 px Strich, keine Füllung, offene Enden.
 *
 * Jedes Zeichen sagt etwas über die Sache selbst — Intervall, Verlauf,
 * Auswahl, Folge, Übergang — und nicht über Medizin im Allgemeinen.
 * Kein Stethoskop, kein Kreuz, keine Ranke.
 */

const strich = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

interface ZeichenProps {
  readonly name: ZeichenName;
  readonly className?: string;
}

export function Zeichen({ name, className }: ZeichenProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      aria-hidden="true"
      focusable="false"
      {...strich}
    >
      {PFADE[name]}
    </svg>
  );
}

const PFADE: Record<ZeichenName, ReactElement> = {
  // Intervall — der Kreis eines Jahres, ein Abschnitt hervorgehoben.
  intervall: (
    <>
      <circle cx="24" cy="24" r="15" opacity="0.45" />
      <path d="M24 9a15 15 0 0 1 13 7.6" />
      <circle cx="24" cy="9" r="1.9" />
    </>
  ),
  // Verlauf — eine Linie, die über die Zeit steigt, mit drei Kontrollpunkten.
  verlauf: (
    <>
      <path d="M8 34c6-1 9-4 12-9s6-11 10-14" opacity="0.45" />
      <path d="M8 39h32" />
      <circle cx="12.5" cy="32.4" r="1.9" />
      <circle cx="23" cy="24.5" r="1.9" />
      <circle cx="33.4" cy="13.6" r="1.9" />
    </>
  ),
  // Auswahl — zwei Möglichkeiten, die sich überschneiden.
  auswahl: (
    <>
      <circle cx="19" cy="24" r="11" />
      <circle cx="29" cy="24" r="11" opacity="0.45" />
    </>
  ),
  // Folge — mehrere Termine nacheinander, wachsender Abstand.
  folge: (
    <>
      <path d="M11 32V19" />
      <path d="M21 32v-8" opacity="0.7" />
      <path d="M31 32v-13" opacity="0.55" />
      <path d="M8 38h32" opacity="0.45" />
    </>
  ),
  // Übergang — eine Welle, die sich beruhigt.
  uebergang: (
    <>
      <path d="M8 24c3-9 6-9 9 0s6 6 8 1 4-4 6-1 4 2 9 0" />
      <path d="M8 34h32" opacity="0.45" />
    </>
  ),
};
