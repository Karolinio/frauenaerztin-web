import { praxis, telefonzeiten } from '../../praxis.config';
import { heutigeSprechzeit } from '../../lib/sprechzeiten';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { Bild } from '../ui/Bild';
import { Pfeil, Telefonhoerer } from '../ui/Pfeil';
import './hero.css';

export function Hero() {
  const heute = heutigeSprechzeit();

  return (
    <section className="hero" aria-labelledby="hero-titel">
      <div className="shell hero__kopf">
        <p className="t-label hero__marke">
          <span>{praxis.fachbezeichnung}</span>
          {/* Trennpunkt und Ort bleiben zusammen, sonst steht der Punkt allein
              am Anfang einer neuen Zeile. */}
          <span className="hero__ort">
            <span className="hero__punkt" aria-hidden="true">
              ·
            </span>
            {praxis.adresse.ort}
          </span>
        </p>

        <h1 className="hero__titel" id="hero-titel">
          {praxis.einzeiler}
        </h1>

        <div className="hero__seite">
          <p className="t-lead hero__satz">
            Ich führe die Praxis allein, plane 20 Minuten pro Termin und sage jeden Schritt an, bevor ich ihn
            mache.
          </p>
          <div className="hero__aktionen">
            <a className="cta" href="#termin">
              Termin vereinbaren
              <Pfeil className="cta__arrow" />
            </a>
            <a className="link-quiet hero__telefon" href={praxis.telefon.href}>
              <Telefonhoerer />
              {praxis.telefon.anzeige}
            </a>
          </div>
        </div>
      </div>

      <figure className="hero__band">
        <HeroBewegtbild />
        <figcaption className="glass glass--foto hero__zeiten">
          <p className="hero__zeiten-kopf t-label">
            {heute.istHeute ? 'Heute' : `Nächste Sprechstunde · ${heute.tag}`}
          </p>
          <p className="hero__zeiten-zeit">{heute.zeiten}</p>
          {heute.hinweis ? <p className="hero__zeiten-hinweis">{heute.hinweis}</p> : null}
          <p className="hero__zeiten-telefon">
            Telefon {telefonzeiten.zeile}. {telefonzeiten.rueckruf}
          </p>
        </figcaption>
      </figure>
    </section>
  );
}

/**
 * Der Clip bewegt nur das Licht. Wer Bewegung abgewählt hat, bekommt das
 * Standbild — nicht das Video mit kürzerer Dauer, sondern gar kein Video.
 * Gescrubbt wird nie: currentTime wird hier nirgends geschrieben.
 */
function HeroBewegtbild() {
  const ohneBewegung = useReducedMotion();

  if (ohneBewegung) {
    return (
      <Bild
        name="hero-sprechecke"
        alt="Die Sprechecke der Praxis: zwei Leinensessel an einem niedrigen Tisch, dahinter ein Regal mit Fachbüchern, Licht von einem hohen Sprossenfenster."
        className="hero__medium"
        prioritaet
        sizes="100vw"
      />
    );
  }

  return (
    <video
      className="hero__medium"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/hero-poster.jpg"
      width={1072}
      height={720}
      aria-label="Die Sprechecke der Praxis am Vormittag. Im Bild bewegt sich nur das einfallende Licht."
    >
      <source src="/media/hero-loop.webm" type="video/webm" />
      <source src="/media/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
