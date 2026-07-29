import { useState } from 'react';
import { praxis } from '../../praxis.config';
import { Standort } from '../ui/Pfeil';

/**
 * Die Karte lädt erst nach einem ausdrücklichen Klick. Vorher geht kein
 * einziger Request an einen fremden Server — auch keine Vorschaukachel, denn
 * die wäre bereits eine Übertragung der IP-Adresse.
 *
 * Statt einer erfundenen Vorschau steht davor das, was man ohnehin braucht:
 * die Anschrift, groß genug zum Abtippen.
 */
export function Karte() {
  const [geladen, setGeladen] = useState(false);
  const koordinaten = praxis.adresse.koordinaten;

  const quelle = koordinaten
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${koordinaten.lon - 0.004}%2C${
        koordinaten.lat - 0.002
      }%2C${koordinaten.lon + 0.004}%2C${koordinaten.lat + 0.002}&layer=mapnik&marker=${koordinaten.lat}%2C${
        koordinaten.lon
      }`
    : null;

  if (geladen && quelle) {
    return (
      <div className="karte karte--geladen">
        <iframe
          className="karte__rahmen"
          title={`Karte: ${praxis.adresse.strasse}, ${praxis.adresse.plz} ${praxis.adresse.ort}`}
          src={quelle}
          width={640}
          height={420}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <p className="t-micro karte__quelle">
          Kartendaten © OpenStreetMap-Mitwirkende. Mit dem Laden wurde Ihre IP-Adresse an openstreetmap.org
          übertragen.
        </p>
      </div>
    );
  }

  return (
    <div className="karte">
      <p className="t-label">Anfahrt</p>
      <p className="karte__adresse">
        {praxis.adresse.strasse}
        <br />
        {praxis.adresse.plz} {praxis.adresse.ort}
      </p>

      {quelle ? (
        <>
          <button type="button" className="link-quiet karte__knopf" onClick={() => setGeladen(true)}>
            <Standort />
            Karte von OpenStreetMap laden
          </button>
          <p className="t-meta karte__hinweis">
            Beim Laden wird Ihre IP-Adresse an openstreetmap.org übertragen. Ohne Klick passiert das nicht.
          </p>
        </>
      ) : (
        <p className="t-meta karte__hinweis">
          {/* TODO Kunde — sobald die Anschrift feststeht, Koordinaten in
              praxis.config.ts eintragen; dann erscheint hier der Ladeknopf. */}
          Die Karte wird eingebunden, sobald die Anschrift feststeht. Sie lädt auch dann erst nach einem
          Klick.
        </p>
      )}
    </div>
  );
}
