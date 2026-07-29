/**
 * Handgezeichnete Inline-SVGs, kein Icon-Set von der Stange.
 * Einheitlich 1.25 px Strich, keine Füllung, offene Enden.
 */

interface StrichProps {
  readonly className?: string;
}

const gemeinsam = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function Pfeil({ className }: StrichProps) {
  return (
    <svg className={className} width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" {...gemeinsam}>
      <path d="M0.75 6h16" />
      <path d="M11.9 1.2 17 6l-5.1 4.8" />
    </svg>
  );
}

export function Telefonhoerer({ className }: StrichProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" {...gemeinsam}>
      <path d="M4.1 1.6 6.3 2.2c.5.2.8.7.7 1.2l-.5 2.3c-.1.4-.4.7-.8.8l-1.3.3c.6 2.4 2.4 4.2 4.8 4.8l.3-1.3c.1-.4.4-.7.8-.8l2.3-.5c.5-.1 1 .2 1.2.7l.6 2.2c.2.6-.2 1.3-.8 1.5-1 .3-2 .3-3 .1C7 12.7 4 9.7 2.6 5.4c-.3-1-.3-2-.1-3 .2-.6.9-1 1.6-.8Z" />
    </svg>
  );
}

export function Standort({ className }: StrichProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" {...gemeinsam}>
      <path d="M9 16.2c3.1-3.4 5-6.1 5-8.6a5 5 0 0 0-10 0c0 2.5 1.9 5.2 5 8.6Z" />
      <circle cx="9" cy="7.4" r="1.9" />
    </svg>
  );
}
