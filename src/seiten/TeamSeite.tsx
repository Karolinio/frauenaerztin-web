import { team } from '../inhalt';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { steht } from '../components/ui/Angabe';
import { personAnker } from '../lib/anker';
import { Formbild } from '../components/ui/Formbild';
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
  const [erste, ...weitere] = team;

  return (
    <>
      <Seitenkopf
        etikett="Team"
        titel="Wer für Sie da ist"
        einleitung={
          <p>
            Gute Medizin lebt auch von den Menschen, die sie begleiten. In meiner Praxis erwartet Sie ein
            engagiertes Team, das Ihnen mit Freundlichkeit, Offenheit und einem persönlichen Blick begegnet.
          </p>
        }
      />

      {/*
        ═══ Die erste Person steht groesser — endlich ═══

        `inhalt/schema.json` verspricht der Aerztin das woertlich: „Erscheint auf
        /team/ in der Reihenfolge dieser Liste. Die erste Person steht oben und
        groesser." Umgesetzt war es nie — alle drei Eintraege waren gleich gross.

        Das ist mehr als ein Schoenheitsfehler. Ein Schema, das etwas zusagt, was
        die Seite nicht tut, ist eine Falschangabe gegenueber der Person, die
        danach ihre Inhalte sortiert: sie stellt jemanden nach vorn und erwartet
        eine Wirkung, die ausbleibt.

        Und es loest zugleich das gestalterische Problem dieser Seite. Drei
        gleich grosse Eintraege untereinander sind 2,76 Bildschirmhoehen
        Aufzaehlung ohne Leserichtung. Mit Hierarchie wird daraus eine Aerztin
        und ihr Team — was der Wahrheit einer Einzelpraxis entspricht.

        Abgelesen an Analogue Agency (Mobbin, 27.08.2026): eine Aussage gross,
        die uebrigen als kompakte Zeilen daneben.
      */}
      {/*
        ═══ Seit dem 03.10.2026: dieselbe Form wie auf der Startseite ═══

        Die Gesichter sitzen im Umriss ihrer Marke (`Formbild`), hier wie auf
        der Startseite — vorher standen hier noch gestrichelte Rechtecke.

        Und die Mitarbeiterinnen stehen nicht mehr als vier Zeilen mit je einer
        halben Bildschirmhöhe Leere rechts daneben, sondern als Reihe: Gesicht,
        Name, Funktion — und ihr Satz, sobald es einen gibt („Ggf. würde ich zu
        denen noch einen Satz hinzufügen", 11.09.2026). Eine Person gross, die
        übrigen kompakt — wie bei Analogue Agency (Mobbin).
      */}
      <div className="schale team">
        {erste ? (
          <Enthuellen als="article" id={personAnker(erste.name, 0)} className="team__person team__person--erste">
            <div className="team__bild">
              <Formbild bild={erste.bild} alt={erste.bildAlt} index={0} sofort>
                {/* Der Satz für die Leserin, nicht für die Person, die das Foto
                    einsetzt — die Anleitung steht in inhalt/schema.json. */}
                <span className="luecke">Foto folgt</span>
                <span className="t-meta team__rahmen-hinweis">
                  Die Praxis wird gerade eingerichtet. Die Fotos entstehen im Oktober.
                </span>
              </Formbild>
            </div>
            <div className="team__text">
              <h2 className="t-unter">{steht(erste.name) ? erste.name : <span className="luecke">Name</span>}</h2>
              <p className="t-meta team__rolle">{erste.rolle}</p>
              {/* Ihr Über-mich hat sechs Absätze (11.09.2026). Ein einziges <p>
                  machte daraus eine Wand; die Leerzeile im Text ist die Absatzgrenze. */}
              {erste.text
                .split('\n\n')
                .filter(Boolean)
                .map((a, i) => (
                  <p key={i} className="t-body team__satz">
                    {a}
                  </p>
                ))}
            </div>
          </Enthuellen>
        ) : null}

        {weitere.length > 0 ? (
          <section className="team__reihe-sektion" aria-labelledby="team-reihe-titel">
            <h2 id="team-reihe-titel" className="t-label team__reihe-titel">
              Mein Team
            </h2>
            <ul className="team__reihe">
              {weitere.map((p, i) => (
                <Enthuellen
                  als="li"
                  key={p.rolle + i}
                  id={personAnker(p.name, i + 1)}
                  className="team__kollegin"
                  verzoegerung={i * 90}
                >
                  <Formbild bild={p.bild} alt={p.bildAlt} index={i + 1} />
                  <h3 className="team__kollegin-name">
                    {steht(p.name) ? p.name : <span className="luecke">Name</span>}
                  </h3>
                  <p className="t-meta team__rolle">{p.rolle}</p>
                  {p.text
                    .split('\n\n')
                    .filter(Boolean)
                    .map((a, j) => (
                      <p key={j} className="t-meta team__kollegin-satz">
                        {a}
                      </p>
                    ))}
                </Enthuellen>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
