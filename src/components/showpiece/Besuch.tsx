import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { besuch } from '../../praxis.config';
import { useHatBreiteAnsicht, useReducedMotion } from '../../hooks/useMediaQuery';
import { useWebGL } from '../../hooks/useWebGL';
import { Bild } from '../ui/Bild';
import { BesuchListe } from './BesuchListe';
import type { GrundrissSteuerung } from './grundriss';
import './besuch.css';

const GESAMT = besuch.length.toString().padStart(2, '0');

export function Besuch() {
  const ohneBewegung = useReducedMotion();
  const breiteAnsicht = useHatBreiteAnsicht();
  const webgl = useWebGL();
  const alsBuehne = breiteAnsicht && !ohneBewegung && webgl;

  return (
    <section className="besuch on-dark grain" id="besuch" aria-labelledby="besuch-titel">
      <div className="shell besuch__kopf">
        <p className="t-label">Der Besuch</p>
        <h2 className="t-section besuch__titel" id="besuch-titel">
          Fünf Stationen, in der Reihenfolge, in der Sie sie durchlaufen.
        </h2>
        <p className="t-lead besuch__lead">
          Die Zeiten sind geplant, nicht geschätzt. Zusammen sind es etwa 25 Minuten — von der Klingel bis zur
          Tür.
        </p>
        {alsBuehne ? (
          <a className="link-quiet besuch__ueberspringen" href="#leistungen">
            Ablauf überspringen
          </a>
        ) : null}
      </div>

      {/* Für Vorlesesoftware und Tastatur steht der Ablauf immer als Liste da —
          unabhängig davon, ob visuell der Grundriss läuft. */}
      {alsBuehne ? (
        <ol className="sr-only">
          {besuch.map((station) => (
            <li key={station.nummer}>
              Station {station.nummer} von {GESAMT}: {station.name}, {station.dauer}. {station.satz}
            </li>
          ))}
        </ol>
      ) : null}

      {alsBuehne ? <BesuchBuehne /> : <BesuchListe />}
    </section>
  );
}

/**
 * Die gepinnte Fassung. Ein einziger gescrubbter ScrollTrigger schiebt die
 * Kamera durch den Grundriss; fünf getrennte, diskrete Trigger schalten
 * Station, Glaspanel und Bild um. Three.js wird erst hier dynamisch geladen.
 */
function BesuchBuehne() {
  const buehne = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const halter = useRef<HTMLDivElement>(null);
  const [station, setStation] = useState(0);
  const [szeneBereit, setSzeneBereit] = useState(false);

  useLayoutEffect(() => {
    const buehneElement = buehne.current;
    const pinElement = pin.current;
    const halterElement = halter.current;
    if (!buehneElement || !pinElement || !halterElement) return;

    let abgebrochen = false;
    let steuerung: GrundrissSteuerung | null = null;
    const kontext = gsap.context(() => {}, buehneElement);

    void import('./grundriss')
      .then(({ ANZAHL_STATIONEN, baueGrundriss }) => {
        if (abgebrochen) return;
        steuerung = baueGrundriss(halterElement);
        steuerung.setzeStation(0);
        setSzeneBereit(true);

        kontext.add(() => {
          // Vier Bildschirmhöhen Scrollweg für fünf Stationen. Als Zahl würde
          // ScrollTrigger das als absolute Scrollposition lesen, nicht als
          // Strecke — deshalb ausdrücklich relativ zum Pin-Anfang.
          const weg = () => window.innerHeight * 4;
          const ende = () => `+=${weg()}`;
          const anteil = { wert: 0 };

          gsap.to(anteil, {
            wert: 1,
            ease: 'none',
            onUpdate: () => steuerung?.setzeFortschritt(anteil.wert),
            scrollTrigger: {
              trigger: pinElement,
              start: 'top top',
              end: ende,
              pin: pinElement,
              anticipatePin: 1,
              scrub: 1,
              invalidateOnRefresh: true,
              onToggle: (self) => steuerung?.setzeAktiv(self.isActive),
            },
          });

          // Die Umschaltung kommt bewusst nicht aus dem Scrub, sondern aus
          // eigenen Triggern — sonst wäre der Wechsel weich statt hart.
          // Sie hängen an der Bühne, nicht am gepinnten Element: dessen Oberkante
          // steht während des Pins fest, die Startpunkte wären dann alle gleich.
          for (let i = 0; i < ANZAHL_STATIONEN; i += 1) {
            ScrollTrigger.create({
              trigger: buehneElement,
              start: () => `top top-=${(weg() * i) / ANZAHL_STATIONEN}`,
              end: () => `top top-=${(weg() * (i + 1)) / ANZAHL_STATIONEN}`,
              invalidateOnRefresh: true,
              onToggle: (self) => {
                if (!self.isActive) return;
                setStation(i);
                steuerung?.setzeStation(i);
              },
            });
          }
        });

        ScrollTrigger.refresh();
      })
      .catch(() => {
        // Der Grundriss ist eine Zugabe. Kommt er nicht, bleibt die Sektion
        // mit Bild und Panel vollständig bedienbar.
        if (!abgebrochen) setSzeneBereit(false);
      });

    return () => {
      abgebrochen = true;
      kontext.revert();
      steuerung?.zerstoeren();
    };
  }, []);

  const aktiv = besuch[station] ?? besuch[0]!;

  return (
    <div className="besuch__buehne" ref={buehne}>
      <div className="besuch__pin" ref={pin}>
        <div className="shell besuch__gitter">
          <div className="besuch__szene">
            <div
              className="besuch__canvas"
              ref={halter}
              data-bereit={szeneBereit || undefined}
              aria-hidden="true"
            />
            <div className="glass besuch__panel" aria-hidden="true">
              <p className="besuch__zaehler t-num">
                {aktiv.nummer}
                <span className="besuch__zaehler-gesamt"> / {GESAMT}</span>
              </p>
              <h3 className="besuch__name">{aktiv.name}</h3>
              <p className="besuch__dauer t-label">{aktiv.dauer}</p>
              <p className="besuch__satz">{aktiv.satz}</p>
            </div>
          </div>

          {/* Der Rahmen bewegt sich nie. Nur sein Inhalt blendet über. */}
          <div className="besuch__rahmen" aria-hidden="true">
            {besuch.map((eintrag, i) => (
              <div className="besuch__bild" key={eintrag.nummer} data-sichtbar={i === station || undefined}>
                <Bild name={eintrag.bild} alt="" sizes="(min-width: 1200px) 46vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
