import { useEffect, useState } from 'react';

/**
 * Prüft einmalig, ob WebGL überhaupt zur Verfügung steht. Ohne WebGL geht das
 * Showpiece denselben Weg wie bei abgewählter Bewegung: statische Liste.
 */
export function useWebGL(): boolean {
  const [verfuegbar, setVerfuegbar] = useState(false);

  useEffect(() => {
    try {
      const probe = document.createElement('canvas');
      setVerfuegbar(Boolean(probe.getContext('webgl2') ?? probe.getContext('webgl')));
    } catch {
      setVerfuegbar(false);
    }
  }, []);

  return verfuegbar;
}
