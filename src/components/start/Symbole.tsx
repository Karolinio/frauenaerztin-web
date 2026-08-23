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

  /* Schwangere im Profil, aus derselben Feder wie ihr Logo: eine Linie. */
  schwangerschaft: (
    <Zeichen>
      <circle cx="16.5" cy="6.5" r="2.8" />
      <path d="M15 10c-2 1.6-3 4-3 6.6 0 3.4 1 5.6 1 9.4" />
      <path d="M15 11.5c3.4 0 5.6 2 5.6 5s-2.4 4.6-5.4 4.6" />
      <path d="M18.6 21.6c.4 2.4.6 3.4.6 4.4" />
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

  /* Schleife — das Zeichen, das in der Onkologie jede Patientin kennt. */
  nachsorge: (
    <Zeichen>
      <path d="M13 27l4.6-9.2M19 27l-9-18" />
      <path d="M10 9a5 5 0 0 1 8.6-3.4C21 8 22 11 20.6 13.8L19 17" />
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
