import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Termin } from '../components/termin/Termin';

/**
 * Der Termin, in voller Länge.
 *
 * Auf der Startseite steht die Kurzform. Hier stehen die Fragen, die zwischen
 * „ich müsste mal" und „ich rufe an" liegen.
 *
 * Der Terminweg selbst ist noch offen — Telefon, Rückruf oder Doctolib. Yvonnes
 * Referenz (gynpraxisbonn.de) nutzt Doctolib; das ist eine Frage an sie und keine
 * Entscheidung von uns. Bis sie beantwortet ist, steht hier der telefonische Weg aus
 * `praxis.config.ts`.
 */
export default function TerminSeite() {
  return (
    <>
      <Seitenkopf
        augenbraue="Termin"
        titel="Wie Sie einen Termin bekommen."
        vorspann="Wie lange ein Termin dauert, was Sie zum ersten Mal mitbringen und wann Sie am ehesten jemanden erreichen."
      />
      <Termin ausfuehrlich />
    </>
  );
}
