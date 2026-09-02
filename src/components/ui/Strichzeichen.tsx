/**
 * Strichzeichen für Bedienelemente — dieselbe Hand wie die neun Leistungssymbole.
 *
 * ═══ Warum es die gibt ═══
 *
 * Karol am 02.09.2026 über die Knöpfe: „diese viel eckigen, langweiligen
 * Kästen … irgendwie cooler."
 *
 * Das Naheliegende wäre eine Icon-Bibliothek gewesen. Genau das verbietet sich
 * hier aus demselben Grund, aus dem `Symbole.tsx` neun Zeichen selbst zeichnet:
 * jede Bibliothek hat eine Handschrift, und es ist nicht ihre. Ihr Logo ist
 * eine Linienzeichnung mit sehr dünnem, gleichmässigem Strich und offenen
 * Enden — ein Telefonhörer mit gefüllter Fläche und doppelter Strichstärke
 * stünde daneben wie eine fremde Schrift.
 *
 * ═══ Warum eine eigene Datei und nicht in Symbole.tsx ═══
 *
 * Weil die neun dort die LEISTUNGEN sind — Yvonnes eigene Motivwahl aus ihrer
 * Übersicht vom 23.08.2026. Diese hier sind Bedienzeichen und gehören keiner
 * Leistung. Zwei Listen mit verschiedener Herkunft in einer Datei driften
 * auseinander, sobald jemand die eine pflegt.
 *
 * Die drei Regeln sind dieselben, aus ihrem Logo abgelesen: ein Strich von 1,25
 * bei 32px Kantenlänge, runde Enden, keine Fläche.
 *
 * ═══ Wo sie stehen dürfen — und wo nicht ═══
 *
 * Nur an den beiden Handlungen, die auf dieser Seite immer wiederkehren:
 * **anrufen** (Hörer) und **Zeiten** (Uhr). Das sind genau die zwei Fragen,
 * wegen denen eine Praxisseite überhaupt aufgerufen wird — der Hero-Kommentar
 * führt den Wettbewerbsbefund dazu.
 *
 * „Anfahrt und Kontakt", „Online buchen", „Rückruf anfragen" bekommen bewusst
 * KEINS. Ein Zeichen an jedem Knopf ist kein Zeichen mehr, sondern Dekor: wenn
 * alles markiert ist, markiert nichts. Wer hier ein viertes hinzufügt, sollte
 * vorher sagen können, welche wiederkehrende Frage es beantwortet.
 */
import type { ReactNode } from 'react';

/** Gemeinsame Hülle. Die Regeln stehen hier EINMAL. */
function Zeichen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/**
 * Der Hörer — offen gezeichnet, nicht als Silhouette.
 *
 * Ein gefüllter Hörer ist das Zeichen, das jede App benutzt. Als Kontur mit
 * offenen Enden ist es dasselbe Motiv in ihrer Hand: dieselbe Strichstärke wie
 * die Frau im Logo, dieselben runden Enden.
 */
export function Hoerer({ className }: { className?: string }) {
  return (
    <Zeichen className={className}>
      <path d="M10.5 5.5c1 0 1.6.4 2 1.3l1.6 3.4c.4.9.2 1.6-.5 2.2l-1.3 1.1c-.4.4-.5.8-.3 1.3a13 13 0 0 0 5.7 5.7c.5.2.9.1 1.3-.3l1.1-1.3c.6-.7 1.3-.9 2.2-.5l3.4 1.6c.9.4 1.3 1 1.3 2v3c0 1.4-.9 2.5-2.4 2.5C15.4 27.5 4.5 16.6 4.5 8.4 4.5 6.9 5.6 6 7 6Z" />
    </Zeichen>
  );
}

/**
 * Die Uhr — für „Alle Sprechzeiten".
 *
 * Zeiger auf halb neun: eine Uhr auf 10 nach 10 ist die Schaufensterstellung
 * der Uhrmacher und hat hier nichts zu suchen. Halb neun liegt im
 * Sprechstundenfenster dieser Praxis.
 */
export function Uhr({ className }: { className?: string }) {
  return (
    <Zeichen className={className}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9v7l4.5 2.6" />
    </Zeichen>
  );
}

/**
 * Der Pfeil — für Verweise, die weiterführen.
 *
 * Offen, ohne geschlossene Spitze: eine ausgefüllte Dreiecksspitze wäre die
 * einzige Fläche in einem Satz Zeichen, der sonst nur aus Linien besteht.
 */
export function Pfeil({ className }: { className?: string }) {
  return (
    <Zeichen className={className}>
      <path d="M6 16h20" />
      <path d="M19 9l7 7-7 7" />
    </Zeichen>
  );
}
