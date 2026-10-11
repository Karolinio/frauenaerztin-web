/**
 * Neun Strichzeichen, eins je Leistung.
 *
 * ═══ Warum gezeichnet und nicht aus einer Bibliothek ═══
 *
 * Weil jede Icon-Bibliothek eine Handschrift hat, und es ist nicht ihre. Ihr
 * Logo ist eine Linienzeichnung mit sehr dünnem, gleichmässigem Strich und
 * offenen Enden — ein Satz Symbole mit gefüllten Flächen, runden Ecken und
 * doppelter Strichstärke stünde daneben wie eine fremde Schrift.
 *
 * Alle neun folgen deshalb denselben drei Regeln, die aus ihrem Logo abgelesen
 * sind: ein Strich von 1,25 (bei 32px Kantenlänge), runde Enden, keine Fläche.
 *
 * ═══ Warum sie in der Skizze sind, die sie geschickt hat ═══
 *
 * Ihre Übersicht vom 23.08.2026 zeigt zu jeder Leistung ein kleines Symbol.
 * Das ist ihre Idee und ihr Aufbau — hier steht ihre Motivwahl, so gut sie sich
 * aus der Skizze lesen liess: Lupe mit Herz, Trieb, Ring, Herz, Schwangere,
 * Sonne, Tropfen, Schleife, Profil.
 *
 * ═══ Warum ein Verzeichnis und keine Eigenschaft an der Leistung ═══
 *
 * Weil `praxis.config.ts` die Kundendaten trägt und sonst nichts. Ein SVG-Pfad
 * in einer Datei, in der die Ärztin ihre Anschrift nachliest, ist am falschen
 * Ort. Die Zuordnung läuft über die `id` der Leistung — fehlt eine, bleibt die
 * Kachel ohne Zeichen, statt dass die Seite bricht.
 */
import type { ReactNode } from 'react';

/** Gemeinsame Hülle. Die Regeln stehen hier EINMAL, nicht neunmal. */
function Zeichen({ children }: { children: ReactNode }) {
  return (
    <svg
      className="kachel__zeichen"
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

export const SYMBOLE: Record<string, ReactNode> = {
  /* Lupe mit Herz — Früherkennung: hinsehen, bevor etwas da ist. */
  vorsorge: (
    <Zeichen>
      <circle cx="14" cy="14" r="8.5" />
      <path d="M20.2 20.2 L27 27" />
      <path d="M14 17.5c-2.4-1.8-3.8-3.1-3.8-4.8a2.2 2.2 0 0 1 3.8-1.5 2.2 2.2 0 0 1 3.8 1.5c0 1.7-1.4 3-3.8 4.8Z" />
    </Zeichen>
  ),

  /* Junger Trieb — die Sprechstunde für die Jüngsten unter ihren Patientinnen. */
  maedelssprechstunde: (
    <Zeichen>
      <path d="M16 27V13" />
      <path d="M16 17c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
      <path d="M16 21c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" />
    </Zeichen>
  ),

  /* Ring mit Faden — die Spirale, ohne sie abzubilden. */
  verhuetung: (
    <Zeichen>
      <circle cx="15" cy="16" r="8.5" />
      <circle cx="23.5" cy="9.5" r="2.2" />
    </Zeichen>
  ),

  /* Herz. Das einzige Zeichen, das nichts erklärt und nichts erklären muss. */
  kinderwunsch: (
    <Zeichen>
      <path d="M16 26c-6.4-4.4-10-7.6-10-11.8A5.4 5.4 0 0 1 16 10.6a5.4 5.4 0 0 1 10 3.6C26 18.4 22.4 21.6 16 26Z" />
    </Zeichen>
  ),

  /*
   * Schwangere im Profil — nach ihrer Vorlage vom 05.10.2026 (ChatGPT-Bild):
   * langes Haar über den Rücken, Kopf leicht gesenkt, die Hand unter dem
   * Bauch. Ihre Vorlage hat an- und abschwellende Pinselstriche; hier im
   * gleichen dünnen Strich wie die übrigen acht. Die kleine innere Haarsträhne
   * ist weggelassen — bei 32px lief sie mit dem Haar zu einem Fleck zusammen.
   * Die Stützpunkte sind aus ihrem Bild abgegriffen, nicht frei gezeichnet.
   */
  schwangerschaft: (
    <Zeichen>
      <path d="M20.7 3.8C20.31 3.56 19.22 2.6 18.39 2.37C17.55 2.15 16.53 2.11 15.69 2.45C14.86 2.78 13.93 3.54 13.38 4.37C12.84 5.21 12.71 6.49 12.42 7.45C12.13 8.42 12.13 9.35 11.65 10.15C11.17 10.95 10.09 11.62 9.53 12.27C8.97 12.91 8.43 13.39 8.3 14C8.17 14.61 8.56 15.44 8.76 15.92C8.97 16.4 9.4 16.73 9.53 16.89" />
      <path d="M20.7 4.95C20.18 5.27 18.64 6.23 17.62 6.88C16.59 7.52 15.34 8.06 14.54 8.8C13.73 9.54 13.25 10.31 12.8 11.3C12.36 12.3 12.03 13.55 11.84 14.77C11.65 15.99 11.55 17.27 11.65 18.62C11.75 19.97 11.94 21.57 12.42 22.85C12.9 24.14 13.67 25.29 14.54 26.32C15.4 27.34 16.59 28.47 17.62 29.01C18.64 29.56 20.02 29.56 20.7 29.59C21.37 29.62 21.5 29.27 21.66 29.21" />
      <path d="M21.08 5.53C21.03 5.98 21.06 7.45 20.77 8.22C20.49 8.99 19.84 9.69 19.35 10.15C18.86 10.61 18.26 10.96 17.81 11C17.36 11.03 16.85 10.45 16.65 10.34" />
      <path d="M16.46 10.34C16.38 10.63 15.94 11.46 16 12.07C16.06 12.68 16.39 13.45 16.85 14C17.31 14.54 18.23 14.9 18.77 15.35C19.32 15.79 19.88 16.21 20.12 16.69C20.36 17.17 20.38 17.82 20.24 18.23C20.09 18.65 19.4 19.04 19.23 19.2" />
      <path d="M19.23 19.2C19.64 19.39 20.95 19.74 21.66 20.35C22.37 20.96 23.13 21.92 23.47 22.85C23.81 23.78 24 24.91 23.7 25.93C23.4 26.96 22 28.5 21.66 29.01" />
      <path d="M15.23 15.54C15.11 16.05 14.7 17.66 14.54 18.62C14.37 19.58 14.1 20.35 14.23 21.31C14.36 22.28 14.74 23.46 15.31 24.39C15.87 25.32 16.91 26.37 17.62 26.9C18.32 27.42 19 27.29 19.54 27.55C20.09 27.81 20.62 28.19 20.89 28.44C21.16 28.68 21.11 28.92 21.16 29.01" />
    </Zeichen>
  ),

  /* Sonne — der Abschnitt danach, nicht das Ende. */
  wechseljahre: (
    <Zeichen>
      <circle cx="16" cy="16" r="5.5" />
      <path d="M16 4v2.5M16 25.5V28M4 16h2.5M25.5 16H28M7.5 7.5l1.8 1.8M22.7 22.7l1.8 1.8M24.5 7.5l-1.8 1.8M9.3 22.7l-1.8 1.8" />
    </Zeichen>
  ),

  /* Tropfen. Sachlich, ohne die Sache zu bebildern. */
  beckenboden: (
    <Zeichen>
      <path d="M16 5c4.4 5.2 6.6 8.8 6.6 12a6.6 6.6 0 0 1-13.2 0c0-3.2 2.2-6.8 6.6-12Z" />
      <path d="M12.6 17.6c0 2 1.4 3.6 3.4 3.6" />
    </Zeichen>
  ),

  /*
   * Spritze — „beim Impfen dann noch eine Spritze hinzufügen" (17.09.2026).
   * Schräg gestellt wie ein Stift, Kolben oben rechts, die Nadel zeigt nach
   * links unten. Drei Skalenstriche, kein Tropfen an der Spitze.
   */
  impfungen: (
    <Zeichen>
      <g transform="rotate(45 16 16)">
        <rect x="13" y="9" width="6" height="13" rx="1.2" />
        <path d="M13 13h2.5M13 16h2.5M13 19h2.5" />
        <path d="M16 9V5M12.6 5h6.8" />
        <path d="M14.8 22v2h2.4v-2" />
        <path d="M16 24v4.5" />
      </g>
    </Zeichen>
  ),

  /*
   * Schleife als Band — nach ihrer Vorlage vom 05.10.2026: symmetrische
   * Schlaufe, die Enden weit gespreizt und waagrecht abgeschnitten. Ihre
   * Vorlage ist eine gefüllte Fläche; hier nur die Kontur des Bandes, damit
   * sie neben den Strichzeichen nicht als Fleck steht. Das Band von links
   * unten liegt vorn, das hintere setzt an der Kreuzung aus.
   */
  nachsorge: (
    <Zeichen>
      <path d="M11.83 27.6L21.48 13.47L21.91 12.72L22.24 11.97L22.47 11.23L22.61 10.49L22.63 9.76L22.54 9.04L22.34 8.36L21.86 7.46L21.44 6.94L20.72 6.29L19.92 5.79L19.06 5.41L18.17 5.15L17.25 4.98L16.31 4.9L15.06 4.95L13.83 5.15L12.94 5.41L12.08 5.79L11.28 6.29L10.79 6.7L10.34 7.19L9.96 7.74L9.66 8.36L9.4 9.4L9.37 10.12L9.45 10.86L9.76 11.97L10.29 13.09L13.18 17.36" />
      <path d="M16.46 22.16L20.17 27.6" />
      <path d="M7.71 27.6L18.44 11.91L18.88 11.17L19.13 10.58L19.22 10.13L19.22 9.82L19.14 9.52L18.94 9.24L18.59 8.95L18.21 8.74L17.56 8.5L17 8.38L15.8 8.3L14.44 8.5L13.53 8.87L13.13 9.17L12.9 9.45L12.79 9.74L12.78 10.13L12.87 10.58L13.12 11.17L15.44 14.64" />
      <path d="M18.45 19.04L24.29 27.6" />
      <path d="M7.71 27.6H11.83M20.17 27.6H24.29" />
    </Zeichen>
  ),

  /*
   * Profil — nur die Gesichtslinie, offen, ohne Kopfumriss und ohne Augen.
   *
   * Die erste Fassung zeichnete den ganzen Kopf samt zwei Punkten als Augen.
   * Bei 120px sah man, was bei 32px nur als Klumpen ankam: es las sich nicht
   * als Gesicht, sondern als Wesen. Eine geschlossene Form mit Innenzeichnung
   * braucht Platz, den ein 32px-Zeichen nicht hat.
   *
   * Die offene Linie ist ausserdem naeher an ihrer Marke: ihr Logo zeichnet
   * eine Frau ebenfalls nur als Kontur, ohne Gesicht und ohne Umriss.
   */
  aesthetik: (
    <Zeichen>
      <path d="M11.5 4.5c5 0 8.6 3.4 8.6 8 0 1.6-.5 2.6.6 3.7l1.9 2c.5.6.3 1.4-.5 1.6l-1.9.5c0 0 .5 2.6-1.6 3.4-1.2.5-2.4.2-2.9 0 0 2-.5 3.4-1.6 4.8" />
    </Zeichen>
  ),
};
