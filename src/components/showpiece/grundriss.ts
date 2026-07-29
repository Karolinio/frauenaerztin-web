/**
 * Der Grundriss der Praxis — prozedural gebaut, nicht generiert.
 *
 * Er ist die Information, nicht die Dekoration: er beantwortet „wie viele
 * Räume, wie weit auseinander, in welcher Reihenfolge". Das kann ein Foto
 * nicht und eine Aufzählung macht es nicht anschaulich.
 *
 * Maßstab 1:1 in Metern. Die Wände stehen als niedriges Relief auf der Fläche
 * — es ist ein Plan, kein Puppenhaus. Die Raumvolumen sind flache
 * Milchglasplatten; die aktive Station hebt sich heraus und tintet nach Clay.
 *
 * Dieses Modul wird ausschließlich dynamisch importiert (siehe Besuch.tsx)
 * und zieht Three.js in einen eigenen Chunk.
 */
import {
  CatmullRomCurve3,
  Color,
  DataTexture,
  DirectionalLight,
  DoubleSide,
  EquirectangularReflectionMapping,
  ExtrudeGeometry,
  HemisphereLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  Shape,
  SRGBColorSpace,
  UnsignedByteType,
  Vector3,
  WebGLRenderer,
  type Texture,
} from 'three';
import gsap from 'gsap';
import { tokenAlsLinearRGB } from '../../lib/color';

// ── Der handgeschriebene Plan ───────────────────────────────────────────
// Ursprung links oben, x nach rechts, z nach unten. 9 m × 7 m.
//
//   z=0   ┌─────────┬──────────┬────────┐
//         │ Warten  │ Sprechen │ Unters.│
//   z=3.1 ├────╌────┴────╌─────┴───╌────┤
//         │            Flur             │
//   z=4.7 ├────╌────┬──────╌────────────┤
//         │Anmeldung│  Ankommen (Diele) │
//   z=7   └─────────┴───────────╌───────┘   ╌ = Tür

const PLAN = { breite: 9, tiefe: 7 } as const;
const WANDSTAERKE = 0.12;
/**
 * Wandhöhe. Der Plan ist ein Relief, kein Puppenhaus — die Wände sind
 * bewusst niedrig. 6 cm wären maßstäblich sauber, verschwinden aber bei der
 * Kameradistanz, aus der man den Grundriss überhaupt als Grundriss liest
 * (rund 4 px). 20 cm ergeben etwa 15 px: sichtbar genug, dass Türöffnungen
 * ablesbar bleiben, flach genug, dass es ein Plan bleibt.
 */
const WANDHOEHE = 0.2;
const PLATTENHOEHE = 0.02;
/** Hub der aktiven Station — bei der gewählten Distanz rund 8 px auf dem Schirm. */
const HUB = 0.14;

interface Rechteck {
  readonly x0: number;
  readonly z0: number;
  readonly x1: number;
  readonly z1: number;
}

/** In der Reihenfolge des Besuchs — Index 0 ist Station 01. */
const RAEUME: readonly Rechteck[] = [
  { x0: 3.1, z0: 4.7, x1: 9.0, z1: 7.0 }, // 01 Ankommen
  { x0: 0.0, z0: 4.7, x1: 3.1, z1: 7.0 }, // 02 Anmeldung
  { x0: 0.0, z0: 0.0, x1: 3.1, z1: 3.1 }, // 03 Warten
  { x0: 3.1, z0: 0.0, x1: 6.3, z1: 3.1 }, // 04 Sprechen
  { x0: 6.3, z0: 0.0, x1: 9.0, z1: 3.1 }, // 05 Untersuchen
];

/** Wandstücke als Strecken. Wo keine Strecke liegt, ist eine Tür. */
const WAENDE: readonly Rechteck[] = [
  // Außenwände, mit Lücke für die Eingangstür
  { x0: 0, z0: 0, x1: 9, z1: 0 },
  { x0: 0, z0: 0, x1: 0, z1: 7 },
  { x0: 9, z0: 0, x1: 9, z1: 7 },
  { x0: 0, z0: 7, x1: 6.5, z1: 7 },
  { x0: 7.7, z0: 7, x1: 9, z1: 7 },
  // Flur gegen die drei oberen Räume, drei Türen
  { x0: 0, z0: 3.1, x1: 1.1, z1: 3.1 },
  { x0: 1.9, z0: 3.1, x1: 4.3, z1: 3.1 },
  { x0: 5.1, z0: 3.1, x1: 7.3, z1: 3.1 },
  { x0: 8.1, z0: 3.1, x1: 9, z1: 3.1 },
  // Zwischen den oberen Räumen
  { x0: 3.1, z0: 0, x1: 3.1, z1: 3.1 },
  { x0: 6.3, z0: 0, x1: 6.3, z1: 3.1 },
  // Flur gegen Anmeldung und Diele, Lücke = Tresenöffnung
  { x0: 0, z0: 4.7, x1: 0.9, z1: 4.7 },
  { x0: 2.3, z0: 4.7, x1: 5.0, z1: 4.7 },
  { x0: 6.0, z0: 4.7, x1: 9, z1: 4.7 },
  { x0: 3.1, z0: 4.7, x1: 3.1, z1: 7 },
];

/**
 * Kamerastand je Station, relativ zum Blickpunkt. Iso-Aufsicht bei etwa 48°
 * und rund 9 m Abstand: damit stehen ungefähr zwei Drittel des Plans im Bild —
 * genug Zusammenhang, um die Reihenfolge zu lesen, und wenig genug, dass der
 * Ortswechsel zwischen den Stationen spürbar bleibt.
 * Der Blick kommt von der Eingangsseite, also aus derselben Richtung wie der Besuch.
 */
const KAMERAVERSATZ: readonly Vector3[] = [
  new Vector3(2.8, 11.4, 10.2),
  new Vector3(-3.1, 11.2, 10.6),
  new Vector3(-4.1, 11.8, 9.8),
  new Vector3(0.7, 11.0, 10.4),
  new Vector3(3.8, 11.4, 9.9),
];

/**
 * Blickpunkte werden zur Planmitte gezogen. Ohne das schwenkt die Kamera bei
 * den Randstationen so weit heraus, dass der Grundriss am Rand des Rahmens
 * abgeschnitten wird — auf schmaleren Schirmen zuerst.
 */
const ZUR_MITTE = 0.65;
/**
 * Der Blickpunkt liegt etwas unter der Planebene. Dadurch rutscht der
 * Grundriss im Bild nach oben und liegt nicht hinter dem Glaspanel unten links.
 */
const BLICK_TIEFER = 1.0;

export const ANZAHL_STATIONEN = RAEUME.length;

export interface GrundrissSteuerung {
  /** 0 … 1 entlang der Kamerakurve. Kommt vom gescrubbten ScrollTrigger. */
  setzeFortschritt(anteil: number): void;
  /** Harter Wechsel — kein Crossfade, damit man den Ortswechsel spürt. */
  setzeStation(index: number): void;
  /** Renderschleife anhalten, solange die Sektion nicht im Bild ist. */
  setzeAktiv(aktiv: boolean): void;
  zerstoeren(): void;
}

/**
 * Planpunkt → Weltpunkt. Die Geometrie wird um -90° um X gedreht, dabei
 * wird aus der Plan-z-Achse die negative Welt-z-Achse; danach wird der Plan
 * auf den Ursprung geschoben. Diese Funktion bildet genau das ab, damit
 * Kamerapunkte und Geometrie nicht auseinanderlaufen.
 */
function nachWelt(x: number, z: number, y = 0): Vector3 {
  return new Vector3(x - PLAN.breite / 2, y, PLAN.tiefe / 2 - z);
}

function mitte(raum: Rechteck): Vector3 {
  return nachWelt((raum.x0 + raum.x1) / 2, (raum.z0 + raum.z1) / 2);
}

function rechteckAlsShape(x0: number, z0: number, x1: number, z1: number): Shape {
  const shape = new Shape();
  shape.moveTo(x0, z0);
  shape.lineTo(x1, z0);
  shape.lineTo(x1, z1);
  shape.lineTo(x0, z1);
  shape.closePath();
  return shape;
}

/** Aus einer Wandstrecke wird ein Rechteck mit Wandstärke. */
function wandAlsShape(wand: Rechteck): Shape {
  const halb = WANDSTAERKE / 2;
  return rechteckAlsShape(wand.x0 - halb, wand.z0 - halb, wand.x1 + halb, wand.z1 + halb);
}

/** Legt eine extrudierte Planfläche flach und schiebt sie auf den Ursprung. */
function aufrichten(geometrie: ExtrudeGeometry): ExtrudeGeometry {
  geometrie.rotateX(-Math.PI / 2);
  geometrie.translate(-PLAN.breite / 2, 0, PLAN.tiefe / 2);
  return geometrie;
}

/**
 * Umgebung ohne HDR-Datei: ein kleiner Farbverlauf — oben kühles Nordlicht,
 * rechts das Fenster, unten das warme Papier des Bodens. Für Milchglas bei
 * roughness 0.32 reicht das vollkommen und kostet keinen Request.
 */
function baueUmgebung(renderer: WebGLRenderer): Texture {
  const breite = 32;
  const hoehe = 16;
  const daten = new Uint8Array(breite * hoehe * 4);

  const oben = tokenAlsLinearRGB('--teal');
  const unten = tokenAlsLinearRGB('--paper-deep');
  const kanal = (wert: number) => Math.max(0, Math.min(255, Math.round(Math.sqrt(Math.max(wert, 0)) * 255)));

  for (let y = 0; y < hoehe; y += 1) {
    const anteilOben = 1 - y / (hoehe - 1);
    for (let x = 0; x < breite; x += 1) {
      const u = x / breite;
      // Das Fenster sitzt seitlich und leuchtet weich aus.
      const naeheFenster =
        Math.max(0, 1 - Math.abs(u - 0.25) * 5) * Math.max(0, 1 - Math.abs(anteilOben - 0.62) * 3);
      const i = (y * breite + x) * 4;
      daten[i] = kanal(unten.r + (oben.r - unten.r) * anteilOben + 1.7 * naeheFenster);
      daten[i + 1] = kanal(unten.g + (oben.g - unten.g) * anteilOben + 1.75 * naeheFenster);
      daten[i + 2] = kanal(unten.b + (oben.b - unten.b) * anteilOben + 1.8 * naeheFenster);
      daten[i + 3] = 255;
    }
  }

  const textur = new DataTexture(daten, breite, hoehe, undefined, UnsignedByteType);
  textur.colorSpace = SRGBColorSpace;
  textur.mapping = EquirectangularReflectionMapping;
  textur.needsUpdate = true;

  const pmrem = new PMREMGenerator(renderer);
  const ziel = pmrem.fromEquirectangular(textur);
  pmrem.dispose();
  textur.dispose();
  return ziel.texture;
}

function farbe(token: string): Color {
  const { r, g, b } = tokenAlsLinearRGB(token);
  return new Color().setRGB(r, g, b, LinearSRGBColorSpace);
}

export function baueGrundriss(behaelter: HTMLElement): GrundrissSteuerung {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  behaelter.appendChild(renderer.domElement);

  const szene = new Scene();
  szene.environment = baueUmgebung(renderer);
  szene.environmentIntensity = 0.75;

  const kamera = new PerspectiveCamera(35, 1, 0.1, 100);

  const boden = new Mesh(
    new PlaneGeometry(PLAN.breite + 1.6, PLAN.tiefe + 1.6),
    new MeshStandardMaterial({ color: farbe('--paper-deep'), roughness: 0.94, metalness: 0 }),
  );
  boden.rotation.x = -Math.PI / 2;
  boden.receiveShadow = true;
  szene.add(boden);

  // Ein Rezept für alles Glas dieser Szene.
  const glasRezept = {
    transmission: 0.92,
    roughness: 0.32,
    thickness: 0.4,
    ior: 1.45,
    metalness: 0,
    side: DoubleSide,
  } as const;

  // Alle Wandstücke in einer Geometrie: ein Draw-Call, ein Material.
  const waende = new Mesh(
    aufrichten(new ExtrudeGeometry(WAENDE.map(wandAlsShape), { depth: WANDHOEHE, bevelEnabled: false })),
    new MeshPhysicalMaterial({
      ...glasRezept,
      color: farbe('--paper'),
      attenuationColor: farbe('--teal'),
      attenuationDistance: 1.4,
    }),
  );
  waende.castShadow = true;
  szene.add(waende);

  const ruheFarbe = farbe('--teal');
  const aktivFarbe = farbe('--clay-glas');
  // Je kürzer die Strecke, desto satter die Tönung (Beer-Lambert). Unter 0.5
  // kippt der Akzent ins Dunkelbraune; 0.8 trifft den Ton der Palette.
  const RUHE_TIEFE = 1.1;
  const AKTIV_TIEFE = 0.8;

  const platten = RAEUME.map((raum) => {
    const rand = WANDSTAERKE / 2;
    const geometrie = aufrichten(
      new ExtrudeGeometry(rechteckAlsShape(raum.x0 + rand, raum.z0 + rand, raum.x1 - rand, raum.z1 - rand), {
        depth: PLATTENHOEHE,
        bevelEnabled: false,
      }),
    );
    const material = new MeshPhysicalMaterial({
      ...glasRezept,
      color: farbe('--paper'),
      attenuationColor: ruheFarbe.clone(),
      attenuationDistance: RUHE_TIEFE,
    });
    const mesh = new Mesh(geometrie, material);
    mesh.castShadow = true;
    szene.add(mesh);
    return { mesh, material };
  });

  // Eine gerichtete Quelle von der Fensterseite — dasselbe Nordlicht wie in
  // den Fotos, nur eine Quelle, kein Deckenlicht. Der Schatten gibt den
  // Platten Bodenkontakt; ohne ihn kleben sie auf der Fläche.
  const fenster = new DirectionalLight(0xffffff, 1.7);
  fenster.position.set(7, 6, 3);
  fenster.castShadow = true;
  fenster.shadow.mapSize.set(1024, 1024);
  fenster.shadow.camera.left = -8;
  fenster.shadow.camera.right = 8;
  fenster.shadow.camera.top = 8;
  fenster.shadow.camera.bottom = -8;
  fenster.shadow.camera.near = 0.5;
  fenster.shadow.camera.far = 26;
  fenster.shadow.bias = -0.0006;
  fenster.shadow.normalBias = 0.02;
  szene.add(fenster);
  szene.add(new HemisphereLight(0xdfe7ea, 0xbfae97, 0.55));

  // ── Kamerafahrt ───────────────────────────────────────────────────────
  const ziele = RAEUME.map((raum) => {
    const ziel = mitte(raum).multiplyScalar(ZUR_MITTE);
    ziel.y = -BLICK_TIEFER;
    return ziel;
  });
  const staende = ziele.map((ziel, i) => ziel.clone().add(KAMERAVERSATZ[i] ?? KAMERAVERSATZ[0]!));
  const standKurve = new CatmullRomCurve3(staende, false, 'centripetal', 0.5);
  const zielKurve = new CatmullRomCurve3(ziele, false, 'centripetal', 0.5);

  const standPuffer = new Vector3();
  const zielPuffer = new Vector3();
  let fortschritt = 0;
  let laeuft = false;
  let mussZeichnen = true;
  let angefordert = 0;

  const groesseAnpassen = () => {
    const { clientWidth: b, clientHeight: h } = behaelter;
    if (b === 0 || h === 0) return;
    renderer.setSize(b, h, false);
    kamera.aspect = b / h;
    kamera.updateProjectionMatrix();
    mussZeichnen = true;
  };

  const beobachter = new ResizeObserver(groesseAnpassen);
  beobachter.observe(behaelter);
  groesseAnpassen();

  if (import.meta.env.DEV) {
    // Nur für die Sichtprüfung: scripts/qa-showpiece.mjs liest hier Kamerastand
    // und Blickrichtung aus. Im Produktionsbündel fällt der Block weg.
    (window as unknown as Record<string, unknown>).__grundriss = { kamera, szene, standKurve, zielKurve };
  }

  const zeichnen = () => {
    const t = Math.max(0, Math.min(1, fortschritt));
    kamera.position.copy(standKurve.getPoint(t, standPuffer));
    kamera.lookAt(zielKurve.getPoint(t, zielPuffer));
    renderer.render(szene, kamera);
  };

  const schleife = () => {
    angefordert = requestAnimationFrame(schleife);
    if (!mussZeichnen) return;
    mussZeichnen = false;
    zeichnen();
  };

  zeichnen();

  const anstossen = () => {
    mussZeichnen = true;
  };

  return {
    setzeFortschritt(anteil) {
      fortschritt = anteil;
      mussZeichnen = true;
    },

    setzeStation(index) {
      platten.forEach((platte, i) => {
        const aktiv = i === index;
        gsap.to(platte.mesh.position, {
          y: aktiv ? HUB : 0,
          duration: 0.34,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: anstossen,
        });
        gsap.to(platte.material.attenuationColor, {
          r: aktiv ? aktivFarbe.r : ruheFarbe.r,
          g: aktiv ? aktivFarbe.g : ruheFarbe.g,
          b: aktiv ? aktivFarbe.b : ruheFarbe.b,
          duration: 0.24,
          ease: 'none',
          overwrite: true,
          onUpdate: anstossen,
        });
        platte.material.attenuationDistance = aktiv ? AKTIV_TIEFE : RUHE_TIEFE;
      });
      mussZeichnen = true;
    },

    setzeAktiv(aktiv) {
      if (aktiv === laeuft) return;
      laeuft = aktiv;
      if (aktiv) {
        mussZeichnen = true;
        angefordert = requestAnimationFrame(schleife);
      } else {
        cancelAnimationFrame(angefordert);
      }
    },

    zerstoeren() {
      cancelAnimationFrame(angefordert);
      beobachter.disconnect();
      platten.forEach((platte) =>
        gsap.killTweensOf([platte.mesh.position, platte.material.attenuationColor]),
      );
      szene.traverse((objekt) => {
        if (!(objekt instanceof Mesh)) return;
        objekt.geometry.dispose();
        const material = objekt.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material.dispose();
      });
      szene.environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
