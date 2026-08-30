import { Hero } from '../components/start/Hero';
import { Hinweiszeile } from '../components/start/Hinweiszeile';
import { WerIchBin } from '../components/start/WerIchBin';
import { Aussage } from '../components/start/Aussage';
import { LeistungenAuszug } from '../components/start/LeistungenAuszug';
import { ZiehGalerie } from '../components/praxis/ZiehGalerie';
import { ErsterBesuch } from '../components/start/ErsterBesuch';
import { TerminBlock } from '../components/start/TerminBlock';
import { weg } from '../lib/weg';
import '../components/start/start.css';

/**
 * Die Startseite. Ihre Reihenfolge, wörtlich aus ihrer Aufzählung:
 *
 *   Logo/Name · „Medizin für Frauen" · „Die neue gynäkologische Praxis in
 *   Erkelenz" · Foto + kurzer Einleitungstext
 *   → Wer ich bin → Leistungen im Auszug → Der erste Besuch → Termin → Fuss
 *
 * ═══ Der Umbau vom 30.08.2026: die Seite für ihre Fotos ═══
 *
 * Yvonne liefert Fotos von sich, von der Praxis und vom Team. Diese Seite war
 * bis dahin darauf gebaut, dass sie FEHLEN — und zwar so, dass ihr Eintreffen
 * ein Umbau geworden wäre und kein Tausch:
 *
 *   · Der Hero hielt einen 3:4-Slot bereit, also das Format eines
 *     Studioporträts. Was bei einer Praxiseröffnung entsteht, ist ein Querbild
 *     aus den neuen Räumen — das hätte man links und rechts halbieren müssen.
 *
 *   · Hier stand eine Sektion „Material und Licht" mit dem Satz „Die Praxis
 *     wird gerade saniert und ist noch nicht fotografiert". Diese Sektion hatte
 *     nur einen Grund: dass es keine Fotos gibt. Am Tag der Lieferung wäre sie
 *     nicht falsch geworden, sondern GEGENSTANDSLOS — und damit hätte die Seite
 *     ihren einzigen Bilderblock unterhalb des Heros verloren.
 *
 *   · Für Team-Fotos gab es auf der Startseite überhaupt keinen Platz.
 *
 * Jetzt trägt jede der drei Bildarten eine feste Stelle, und alle drei stehen
 * schon jetzt da — mit den Massen, die ihre Fotos haben werden:
 *
 *   sie        die Bühne unter dem Hero, quer über die volle Breite
 *   die Praxis die Zieh-Reihe hier unten, vier Plätze
 *   das Team   die Gesichterreihe in „Wer ich bin"
 *
 * Welche Datei an welchem Platz steht, entscheidet `lib/bildplaetze.ts` — auch
 * den Leitsatz darüber. Es gibt keinen Satz mehr, der das Fehlen der Fotos
 * erklärt und den jemand nach der Lieferung von Hand entfernen müsste.
 *
 * Höchstens 6,5 Bildschirmhöhen am Rechner, 8 am Handy.
 */
export default function Start() {
  return (
    <>
      <Hero />
      <Hinweiszeile />
      <WerIchBin />
      <Aussage />
      <LeistungenAuszug />
      {/*
        Dieselbe Reihe wie auf `/praxis/`, nur leiser: kleinere Kacheln, keine
        Adresskarte am Ende. Die Adresse steht hier schon im Terminblock, und
        zwei „nächste Schritte" auf einer Seite sind keiner.

        Der Leitsatz wird bewusst NICHT übergeben. Das Register schreibt ihn aus
        dem Zustand der Plätze — er sagt „noch nicht fotografiert", solange das
        stimmt, und hört von selbst damit auf.
      */}
      <ZiehGalerie
        kennung="praxis-titel"
        titel="Die Praxis"
        mitKarte={false}
        weiter={{ href: weg('/praxis/'), text: 'Alle Bilder der Praxis' }}
        klein
        erstesBildSofort={false}
      />
      <ErsterBesuch />
      <TerminBlock />
    </>
  );
}
