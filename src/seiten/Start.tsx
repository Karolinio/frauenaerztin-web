import { Hero } from '../components/hero/Hero';
import { Besuch } from '../components/showpiece/Besuch';
import { Leistungen } from '../components/leistungen/Leistungen';
import { Termin } from '../components/termin/Termin';

/**
 * Die Startseite — kürzer als der erste Entwurf, und zwar aus einem Grund.
 *
 * Gemessen am 07.08.2026: der Ein-Seiter hatte 12,9 Bildschirmhöhen, Yvonnes eigene
 * Referenz (gynpraxisbonn.de) hat 6,3. Sie hat dreimal „unkompliziert" und „nichts
 * super aufwendiges" geschrieben. Eine Startseite, die alles zeigt, macht die
 * Unterseiten überflüssig — und dann hat sie wieder eine Landingpage mit Menü.
 *
 * Also: die Startseite beantwortet vier Fragen und verweist für den Rest.
 *
 *   Wer ist das?        → Hero
 *   Was passiert da?    → Der Besuch (das Showpiece)
 *   Was gibt es?        → Leistungen im Auszug, mit Weg zur vollen Seite
 *   Wie komme ich hin?  → Termin
 *
 * `Diskretion`, `Über mich` und `Praxis & Anfahrt` stehen jetzt auf ihren eigenen
 * Seiten. Sie waren gut — sie waren nur zu viel für die erste Minute.
 */
export default function Start() {
  return (
    <>
      <Hero />
      <Besuch />
      <Leistungen auszug />
      <Termin />
    </>
  );
}
