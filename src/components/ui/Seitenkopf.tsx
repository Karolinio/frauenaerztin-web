import './seitenkopf.css';

/**
 * Der Anfang einer Unterseite.
 *
 * ═══ Warum es den braucht ═══
 *
 * Gemessen am 07.08.2026: `/aktuelles/` war 1,0 Bildschirmhöhen, `/termin/` 1,4. Die
 * Seiten öffneten mit einer kleinen Beschriftung und einer Überschrift — also mit
 * einem ABSCHNITT, der aus der Startseite herausgeschnitten wurde.
 *
 * Das liest sich als Baustelle, auch wenn der Inhalt fertig ist. Eine Unterseite
 * braucht einen Anfang: wo bin ich, worum geht es hier, und warum ist das eine eigene
 * Seite. Das kostet eine halbe Bildschirmhöhe und entscheidet den ersten Eindruck.
 *
 * ═══ Warum kein Bild ═══
 *
 * Ein grosses Kopfbild je Unterseite wären fünf weitere Bilder, die es nicht gibt und
 * die generiert werden müssten. Stattdessen trägt die Typografie: die Serif gross, ein
 * Vorspann in Lesebreite, eine Linie. Das ist billiger, schneller und altert besser
 * als fünf Stimmungsbilder.
 */
export function Seitenkopf({
  augenbraue,
  titel,
  vorspann,
}: {
  augenbraue: string;
  titel: string;
  vorspann?: string;
}) {
  return (
    <header className="seitenkopf">
      <div className="shell">
        <p className="t-label seitenkopf__augenbraue">{augenbraue}</p>
        {/* h1, nicht h2: auf einer Unterseite ist DAS die Überschrift des Dokuments.
            Zwei h1 auf einer Seite oder gar keine ist beides ein Fehler — Vorlesegeräte
            springen danach, und Google liest sie als Titel. */}
        <h1 className="seitenkopf__titel">{titel}</h1>
        {vorspann && <p className="t-lead seitenkopf__vorspann">{vorspann}</p>}
      </div>
    </header>
  );
}
