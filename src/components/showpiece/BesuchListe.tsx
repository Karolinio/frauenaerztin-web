import { besuch } from '../../praxis.config';
import { Bild } from '../ui/Bild';

/**
 * Der Weg ohne 3D: unter 900 px, bei abgewählter Bewegung und ohne WebGL.
 * Kein Canvas, kein Pin — dieselben fünf Stationen als gestapelte Karten
 * über den Bildern. Das Glaspanel liegt über dem Foto und bleibt damit auf
 * einem erlaubten Grund.
 */
export function BesuchListe() {
  return (
    <ol className="shell besuch__liste">
      {besuch.map((station) => (
        <li key={station.nummer} className="besuch__eintrag">
          <figure className="besuch__eintrag-bild">
            <Bild name={station.bild} alt={station.alt} sizes="(min-width: 900px) 60vw, 100vw" />
          </figure>
          <div className="glass glass--foto besuch__eintrag-karte">
            <p className="besuch__zaehler t-num">
              {station.nummer}
              <span className="besuch__zaehler-gesamt"> / {besuch.length.toString().padStart(2, '0')}</span>
            </p>
            <h3 className="besuch__name">{station.name}</h3>
            <p className="besuch__dauer t-label">{station.dauer}</p>
            <p className="besuch__satz">{station.satz}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
