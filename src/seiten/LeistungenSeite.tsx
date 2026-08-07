import { Leistungen } from '../components/leistungen/Leistungen';
import { Diskretion } from '../components/diskretion/Diskretion';

/**
 * Leistungen in voller Länge — plus Diskretion.
 *
 * Warum die beiden zusammen: „Was wird gemacht" und „wie fühlt es sich an, während es
 * gemacht wird" sind dieselbe Frage, von zwei Seiten. Wer die Leistungsliste liest,
 * liest sie nicht als Katalog, sondern als „was kommt auf mich zu".
 *
 * Diskretion ist die dunkle Fläche dieser Seite. Leistungen ist Papier — der Rhythmus
 * stimmt, und die dunkle Fläche liegt vor der dunklen Fusszeile. Das ist der eine
 * Fall, in dem zwei dunkle aufeinandertreffen dürfen: die Fusszeile ist kein Abschnitt.
 */
export default function LeistungenSeite() {
  return (
    <>
      <Leistungen />
      <Diskretion />
    </>
  );
}
