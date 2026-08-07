import { Seitenkopf } from '../components/ui/Seitenkopf';
import { PraxisUndAnfahrt } from '../components/praxis/PraxisUndAnfahrt';

/**
 * Praxis und Anfahrt.
 *
 * Die praktischste Seite der ganzen Website und die, die am häufigsten von unterwegs
 * geöffnet wird — jemand steht an der Haltestelle und sucht die Hausnummer. Deshalb
 * steht hier nichts Erzählendes: Adresse, Zeiten, Anfahrt, Barrierefreiheit.
 */
export default function PraxisSeite() {
  return (
    <>
      <Seitenkopf
        augenbraue="Praxis"
        titel="Wo Sie hinkommen und wann geöffnet ist."
        vorspann="Adresse, Anfahrt mit Bus, Bahn und Auto, Barrierefreiheit — und wie die Räume geschnitten sind."
      />
      <PraxisUndAnfahrt />
    </>
  );
}
