import { useEffect, useState } from 'react';

/**
 * Beobachtet eine Media Query. Der Startwert wird schon beim ersten Render
 * gelesen, damit nichts erst falsch rendert und dann umspringt.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Bewegung ist abgewählt: keine Animation, kein Pin, kein Video. */
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Ab hier wird das Showpiece als 3D geladen, darunter als Liste. */
export const useHatBreiteAnsicht = () => useMediaQuery('(min-width: 900px)');
