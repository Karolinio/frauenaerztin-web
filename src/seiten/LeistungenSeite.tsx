import { leistungen, weitereLeistungen } from '../praxis.config';
import { Seitenkopf } from '../components/ui/Seitenkopf';
import { Enthuellen } from '../components/ui/Enthuellen';
import { weg } from '../lib/weg';
import './leistungen.css';

/**
 * Alle Leistungen ausführlich — ihre fünf, dann die zwei weiteren.
 *
 * ═══ Warum eine lange Seite und keine fünf Unterseiten ═══
 *
 * Weil eine Patientin selten genau eine Leistung sucht. Wer wegen der Vorsorge
 * kommt, liest die Zeile über die Verhütung mit; fünf Unterseiten machen daraus
 * fünf Entscheidungen, welche man anklickt.
 *
 * Die Sprungmarken (`#schwangerschaft`) sorgen dafür, dass der Verweis von der
 * Startseite trotzdem punktgenau landet.
 */
export default function LeistungenSeite() {
  return (
    <div className="leistungen-seite">
      <Seitenkopf
        etikett="Leistungen"
        /* Ihr Text vom 17.09.2026 ersetzt „Was ich anbiete" samt Einleitung. */
        titel="Jede Lebensphase bringt andere Fragen mit sich."
        einleitung={<p>Ich möchte Sie dabei medizinisch kompetent, verständlich und individuell begleiten.</p>}
      />

      <div className="schale leistungen">
        {leistungen.map((l) => (
          <Enthuellen als="article" key={l.id} className="leistung">
            {/* Die Sprungmarke sitzt auf der Überschrift, nicht auf dem Artikel:
                sonst landet der Sprung über dem Titel und die Leserin sieht als
                erstes den letzten Absatz der Leistung darüber. */}
            <h2 className="t-unter leistung__titel" id={l.id}>
              {l.titel}
            </h2>
            <div className="leistung__text">
              <p className="t-lead leistung__kurz">{l.kurz}</p>
              {/* Der Absatz setzt den fetten Satz fort, er wiederholt ihn nicht —
                  „Da sind inhaltliche Dopplungen“ (Yvonne, 04.10.2026). Bei der
                  Nachsorge sagte er dasselbe und ist deshalb leer. */}
              {l.absatz ? <p className="t-body">{l.absatz}</p> : null}
              {/*
                Ihre Vorgabe vom 11.09.2026: „wenn man auf die einzelne Leistung
                klickt der ausfuehrlichere Text." Ein natives <details> — keine
                Skriptlogik, per Tastatur bedienbar, vom Vorleser als
                aufklappbar angesagt. Zu ist es ein Satz, offen ihr ganzer Text.
                Der erste Absatz steht schon oben, deshalb beginnt der
                Aufklapper beim zweiten.
              */}
              {l.lang.length > 1 && (
                <details className="leistung__mehr">
                  <summary className="link">Mehr zu {l.titel}</summary>
                  <div className="leistung__lang">
                    {l.lang.slice(1).map((a, i) =>
                      a.startsWith('# ') ? (
                        <h3 key={i} className="t-meta leistung__zwischen">{a.slice(2)}</h3>
                      ) : (
                        <p key={i} className="t-body">{a}</p>
                      ),
                    )}
                  </div>
                </details>
              )}
            </div>
          </Enthuellen>
        ))}
      </div>

      {weitereLeistungen.length > 0 && (
      <section className="sektion flaeche-leinen">
        <div className="schale leistungen">
          <Enthuellen>
            <p className="t-label">Weitere Leistungen</p>
          </Enthuellen>
          {weitereLeistungen.map((l) => (
            <Enthuellen als="article" key={l.id} className="leistung">
              <h2 className="t-unter leistung__titel" id={l.id}>
                {l.titel}
              </h2>
              <div className="leistung__text">
                <p className="t-lead leistung__kurz">{l.kurz}</p>
                {l.absatz ? <p className="t-body">{l.absatz}</p> : null}
              </div>
            </Enthuellen>
          ))}
        </div>
      </section>
      )}

      <section className="sektion">
        <div className="schale">
          <Enthuellen>
            <p className="t-lead leistungen__schluss">
              {/* Ihr Satz vom 04.10.2026. */}
              Sie finden nicht, was Sie suchen? Für Fragen stehen wir Ihnen gerne jederzeit telefonisch oder
              persönlich beratend zur Seite.
            </p>
            <a className="knopf" href={weg('/termin/')}>
              Zeiten und Termin
            </a>
          </Enthuellen>
        </div>
      </section>
    </div>
  );
}
