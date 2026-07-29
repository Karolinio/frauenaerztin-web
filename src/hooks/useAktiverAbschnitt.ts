import { useEffect, useState } from 'react';

/**
 * Meldet, welcher Abschnitt gerade gelesen wird — für den aktiven
 * Navigationspunkt. Beobachtet ein schmales Band in der oberen Bildschirmhälfte,
 * damit der Wechsel dort passiert, wo der Blick liegt, und nicht am Rand.
 */
export function useAktiverAbschnitt(ids: readonly string[]): string | null {
  const [aktiv, setAktiv] = useState<string | null>(null);

  useEffect(() => {
    const sichtbar = new Set<string>();

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const eintrag of eintraege) {
          if (eintrag.isIntersecting) sichtbar.add(eintrag.target.id);
          else sichtbar.delete(eintrag.target.id);
        }
        // Reihenfolge der Seite gewinnt, nicht die Reihenfolge der Meldungen.
        setAktiv(ids.find((id) => sichtbar.has(id)) ?? null);
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) beobachter.observe(element);
    }

    return () => beobachter.disconnect();
  }, [ids]);

  return aktiv;
}
