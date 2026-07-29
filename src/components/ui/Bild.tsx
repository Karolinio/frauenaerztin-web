import { avif, bildmass, jpeg } from '../../lib/media';

interface BildProps {
  /** Dateiname ohne Endung, z. B. "station-04-sprechen". */
  readonly name: string;
  readonly alt: string;
  readonly className?: string;
  /** Nur das Hero-Bild lädt sofort und mit hoher Priorität. */
  readonly prioritaet?: boolean;
  readonly sizes?: string;
}

/**
 * Ein Bild, immer als <picture> mit AVIF und JPEG, immer mit Maßen.
 * Alt-Text ist Pflicht: die Räume sind Information, keine Dekoration.
 */
export function Bild({ name, alt, className, prioritaet = false, sizes }: BildProps) {
  const { width, height } = bildmass(name);
  // React 18 kennt fetchPriority noch nicht als Prop und würde es verwerfen —
  // das Attribut wird deshalb kleingeschrieben durchgereicht.
  const vorrang: Record<string, string> = prioritaet ? { fetchpriority: 'high' } : {};

  return (
    <picture>
      <source srcSet={avif(name)} type="image/avif" sizes={sizes} />
      <img
        src={jpeg(name)}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        loading={prioritaet ? 'eager' : 'lazy'}
        decoding={prioritaet ? 'sync' : 'async'}
        {...vorrang}
      />
    </picture>
  );
}
