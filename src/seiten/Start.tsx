import { Hero } from '../components/start/Hero';
import { Hinweiszeile } from '../components/start/Hinweiszeile';
import { WerIchBin } from '../components/start/WerIchBin';
import { Aussage } from '../components/start/Aussage';
import { LeistungenAuszug } from '../components/start/LeistungenAuszug';
import { ZiehGalerie, MATERIAL_KACHELN } from '../components/praxis/ZiehGalerie';
import { ErsterBesuch } from '../components/start/ErsterBesuch';
import { TerminBlock } from '../components/start/TerminBlock';
import '../components/start/start.css';

/**
 * Die Startseite. Ihre Reihenfolge, wörtlich aus ihrer Aufzählung:
 *
 *   Logo/Name · „Medizin für Frauen" · „Die neue gynäkologische Praxis in
 *   Erkelenz" · Foto + kurzer Einleitungstext
 *   → Wer ich bin → Leistungen im Auszug → Der erste Besuch → Termin → Fuss
 *
 * Der Einleitungstext steht IM Hero, nicht in einer eigenen Sektion darunter —
 * bei ihr gehört er zum Foto („Foto von ihr + kurzer Einleitungstext"), und in
 * der linken Herospalte füllt er den Platz, den das hohe Porträtformat rechts
 * aufmacht.
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
      <ZiehGalerie
        kacheln={MATERIAL_KACHELN}
        kennung="material-titel"
        titel="Material und Licht"
        lead="Die Praxis wird gerade saniert und ist noch nicht fotografiert. Was hier steht, ist ihr Material und ihr Licht — nicht ihre Räume. Die Fotos der Praxis und des Teams entstehen Anfang Oktober und kommen dann an dieselben Stellen."
        mitKarte={false}
        klein
        erstesBildSofort={false}
      />
      <ErsterBesuch />
      <TerminBlock />
    </>
  );
}
