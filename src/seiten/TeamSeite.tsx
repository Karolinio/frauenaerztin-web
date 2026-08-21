import { team } from '../inhalt';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { steht } from '../components/ui/Angabe';
import { weg } from '../lib/weg';
import './team.css';

/**
 * Das Team. Inhalt aus `inhalt/team.json` — sie pflegt ihn selbst.
 *
 *   „Ich denke, wenn sie einmal steht, muss nicht viel geändert werden, ausser
 *    mal ein Foto bei Personalwechsel."
 *
 * ═══ Der leere Bildrahmen ═══
 *
 * Fehlt das Foto, steht hier ein Rahmen mit Hinweis — kein Stockfoto, kein
 * graues Quadrat, keine Initialen in einem Kreis. Der Rahmen sagt, welche Datei
 * wohin gehört, und ist damit die Antwort auf ihre Frage: „Könntest du mir dann
 * zeigen, wie man z. B. ein Foto ändert?"
 *
 * Und er hat die Masse des künftigen Fotos. Wer den Platz erst beim Einsetzen
 * schafft, verschiebt beim ersten echten Bild das ganze Layout.
 */
export default function TeamSeite() {
  return (
    <>
      <Seitenkopf
        etikett="Team"
        titel="Wer Sie empfängt"
        einleitung={
          <p>Die Praxis startet klein. Sobald weitere Mitarbeiterinnen dazukommen, stehen sie hier.</p>
        }
      />

      <div className="schale team">
        {team.map((p, i) => (
          <Enthuellen als="article" key={p.rolle + i} className="team__person">
            <div className="team__bild">
              {steht(p.bild) ? (
                <img
                  src={weg(p.bild)}
                  width={800}
                  height={1000}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  alt={p.bildAlt}
                />
              ) : (
                /*
                 * ═══ Warum hier keine Aufnahmehinweise mehr stehen ═══
                 *
                 * Bis zum 20.08.2026 stand an dieser Stelle „Hochformat,
                 * mindestens 800 px breit, Licht von links. Ablegen unter
                 * /bilder/team/ und in der Redaktion auswählen." Das ist eine
                 * Anweisung an die Person, die das Foto einsetzt — und sie stand
                 * auf einer ÖFFENTLICHEN Seite. Eine Patientin, die wissen will,
                 * wer sie empfängt, las einen Dateipfad.
                 *
                 * Zweiter Grund, unabhängig vom ersten: dieselbe Anweisung steht
                 * bereits in `inhalt/schema.json` beim Feld `bild` — also genau
                 * dort, wo Yvonne sie beim Bearbeiten sieht. Zwei Fassungen
                 * derselben Anweisung driften auseinander, sobald jemand eine
                 * davon anfasst, und dann widersprechen sich Editor und Seite.
                 *
                 * Was bleibt, ist ein Satz für die Leserin: dass hier ein Foto
                 * hingehört und wann es kommt. Das ist wahr und geht niemanden
                 * etwas an, der es nicht einsetzen muss.
                 */
                <p className="team__rahmen">
                  <span className="luecke">Foto folgt</span>
                  <span className="t-meta team__rahmen-hinweis">
                    Die Praxis wird gerade eingerichtet. Die Fotos entstehen im Oktober.
                  </span>
                </p>
              )}
            </div>

            <div className="team__text">
              <h2 className="t-unter">{steht(p.name) ? p.name : <span className="luecke">Name</span>}</h2>
              <p className="t-meta team__rolle">{p.rolle}</p>
              <p className="t-body team__satz">{p.text}</p>
            </div>
          </Enthuellen>
        ))}
      </div>
    </>
  );
}
