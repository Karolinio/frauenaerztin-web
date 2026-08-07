import { UeberMich } from '../components/ueber-mich/UeberMich';
import { TEAM, TEAM_LEER } from '../daten/team';
import './team.css';

/**
 * Team — die Ärztin ausführlich, das Team darunter.
 *
 * ═══ Warum diese Reihenfolge ═══
 *
 * Eine Einzelpraxis brandet sich über die Person. Wer „Team" anklickt, sucht zuerst:
 * wer behandelt mich? Erst danach: wer sitzt am Empfang.
 *
 * Und praktisch: die Praxis eröffnet im November, das Team steht noch nicht. Ein
 * Raster, das mit null Karten oben stünde, wäre eine leere Seite. So steht immer
 * jemand da — und das Raster wächst hinein.
 *
 * ═══ Die Form des Rasters ═══
 *
 * Name, Rolle in Versalien, dann ein echter Absatz. Ein Raster aus Bild + Name allein
 * liest sich als Personalliste; drei Sätze machen daraus einen Menschen. Und es trägt
 * bei EINER Karte genauso wie bei sechs — ein Vierer-Raster mit einer Karte sieht aus
 * wie ein Ladefehler.
 */
export default function TeamSeite() {
  return (
    <>
      <UeberMich />

      <section className="section team" id="team" aria-labelledby="team-titel">
        <div className="shell">
          <p className="t-label">Team</p>
          <h2 className="t-section" id="team-titel">
            {TEAM.length ? 'Wer Sie sonst noch empfängt.' : TEAM_LEER.titel}
          </h2>

          {!TEAM.length && <p className="t-lead team__leer">{TEAM_LEER.text}</p>}

          {TEAM.length > 0 && (
            <ul className="team__raster">
              {TEAM.map((person) => (
                <li className="team__karte" key={person.name}>
                  {/* Kein Platzhaltergesicht, wenn kein Foto da ist. Ein Symbolbild auf
                      einer Arztseite ist eine Behauptung über einen Menschen. */}
                  {person.bild && (
                    <img
                      className="team__bild"
                      src={`${import.meta.env.BASE_URL}${person.bild.replace(/^\//, '')}`}
                      alt={person.bildText}
                      width={480}
                      height={600}
                      loading="lazy"
                    />
                  )}
                  <h3 className="team__name">{person.name}</h3>
                  <p className="team__rolle">{person.rolle}</p>
                  <p className="team__text">{person.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
