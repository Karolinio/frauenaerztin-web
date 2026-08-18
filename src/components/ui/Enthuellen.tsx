import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

/**
 * Inhalt taucht beim Eintreten auf: 16px von unten, Deckkraft 0 → 1, 620 ms.
 *
 * Das ist die einzige Bewegung ausserhalb der beiden, die Yvonne selbst benannt
 * hat. Kein Pinnen, kein Scrub, kein Parallax, keine Zahlen, die hochzählen —
 * sie hat zweimal „einfacher" gesagt.
 *
 * ═══ Warum IntersectionObserver und keine Bibliothek ═══
 *
 * Für zwei Bewegungen eine Animationsbibliothek zu laden ist Ballast, den eine
 * Patientin auf dem Handy im Mobilfunknetz bezahlt. Das hier sind 40 Zeilen und
 * ein CSS-Übergang.
 *
 * ═══ Warum `will-change` nicht im Ausgangszustand steht ═══
 *
 * Gemessen an der Nachbarseite physio-mack: 30 Compositor-Ebenen beim Laden,
 * keine einzige davon im Bild. Die Reveals räumten korrekt auf — sie setzten die
 * Ebene nur zu früh, nämlich im from-Zustand. Hier wird sie beim Eintreten
 * gesetzt und nach dem Übergang wieder entfernt.
 */
export function Enthuellen({
  children,
  als: Als = 'div',
  verzoegerung = 0,
  className = '',
}: {
  children: ReactNode;
  als?: ElementType;
  /** Millisekunden. Für Listen, damit die Punkte nicht als Block erscheinen. */
  verzoegerung?: number;
  className?: string;
}) {
  const knoten = useRef<HTMLElement>(null);
  const [da, setDa] = useState(false);

  useEffect(() => {
    const el = knoten.current;
    if (!el) return;

    /* Wer Bewegung abgewählt hat, bekommt den Inhalt sofort und ohne Beobachter.
       Ein unsichtbares Element, das auf einen Beobachter wartet, ist der teuerste
       aller Bugs: Inhalt, den es gibt und den niemand sieht. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDa(true);
      return;
    }

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (!eintrag?.isIntersecting) return;
        el.style.willChange = 'opacity, transform';
        setDa(true);
        beobachter.disconnect();
        /* Die Ebene wieder freigeben, sobald der Übergang durch ist. 620 ms
           Übergang plus die Verzögerung plus etwas Luft. */
        window.setTimeout(() => {
          el.style.willChange = '';
        }, 700 + verzoegerung);
      },
      /* 12 % nach oben eingezogen: der Inhalt taucht auf, kurz BEVOR er ganz im
         Bild ist. Bei 0 sieht man ihn erscheinen, und das wirkt wie Nachladen. */
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [verzoegerung]);

  return (
    <Als
      ref={knoten}
      className={`auf ${da ? 'auf--da' : ''} ${className}`.trim()}
      style={verzoegerung ? { transitionDelay: `${verzoegerung}ms` } : undefined}
    >
      {children}
    </Als>
  );
}
