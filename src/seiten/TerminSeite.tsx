import { Termin } from '../components/termin/Termin';

/**
 * Der Termin, in voller Länge.
 *
 * Auf der Startseite steht die Kurzform. Hier stehen die Fragen, die zwischen
 * „ich müsste mal" und „ich rufe an" liegen: wie lange dauert es, was bringe ich mit,
 * was passiert beim ersten Mal.
 *
 * Der Terminweg selbst ist noch offen — Telefon, Rückruf oder Doctolib. Yvonnes
 * Referenz nutzt Doctolib; das ist eine Frage an sie und keine Entscheidung von uns.
 * Bis sie beantwortet ist, steht hier der telefonische Weg aus `praxis.config.ts`.
 */
export default function TerminSeite() {
  return <Termin ausfuehrlich />;
}
