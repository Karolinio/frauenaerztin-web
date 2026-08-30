/**
 * Das Bildregister — jeder Bildplatz der Seite an genau einer Stelle.
 *
 * ═══ Warum es diese Datei gibt ═══
 *
 * Yvonne liefert Fotos von sich, von der Praxis und vom Team. Bis zum
 * 30.08.2026 war die Seite an drei verschiedenen Stellen darauf eingerichtet,
 * dass diese Fotos FEHLEN:
 *
 *   Hero.tsx            fragte `praxis.portraet === null` und baute daraus
 *                       einen Marker plus ein `srcset` auf Materialstudien.
 *   ZiehGalerie.tsx     trug zwei Kachelsätze — echte Slots und Materialstudien
 *                       — und die Startseite wählte den zweiten.
 *   TeamSeite.tsx       prüfte `steht(p.bild)` und zeichnete sonst einen Rahmen.
 *
 * Drei Stellen, drei Mechaniken, drei Formate. Am Tag der Lieferung wären das
 * drei Handgriffe an drei Dateien gewesen — und der vierte, den niemand mehr
 * findet: die Leitsätze, die das Fehlen erklären („noch nicht fotografiert",
 * „Die Fotos entstehen im Oktober"). Die stehen dann noch da, unter echten
 * Fotos.
 *
 * ═══ Was ein Bildplatz ist ═══
 *
 * Ein Platz kennt seine MASSE, bevor er sein Bild kennt. Das ist der ganze
 * Trick: das Seitenverhältnis gehört zum Platz, nicht zur Datei. Solange kein
 * Foto da ist, füllt ein Ersatz denselben Rahmen — gleiche Fläche, gleiche
 * Position, gleicher Umbruch drumherum. Am Liefertag ändert sich ein Wert und
 * sonst nichts. Kein Sprung im Layout, kein zweiter Handgriff.
 *
 * ═══ Wie geliefert wird ═══
 *
 * Ein Platz wird gefüllt, indem `datei` und `alt` gesetzt werden. Mehr nicht.
 * Ist `datei` gesetzt, verschwinden Marker und Ersatzhinweis von selbst —
 * `zeigt()` entscheidet das, nicht der Aufrufer. Ein Aufrufer, der selbst
 * entscheiden dürfte, wäre die vierte Stelle, an der man es vergessen kann.
 */
import { praxis } from '../praxis.config';

/** Ein Wert, der noch aussteht. Dieselbe Bedeutung wie in `praxis.config.ts`. */
type Offen<T> = T | null;

export interface Bildplatz {
  /** Kurzname für Meldungen und Prüfskripte. */
  readonly kennung: string;
  /**
   * Was auf dieses Bild gehört, im Klartext — die Aufnahmeanweisung.
   * Steht in `npm run bilder` und in `inhalt/schema.json`, nicht auf der Seite.
   */
  readonly zweck: string;
  /** Das Seitenverhältnis des PLATZES. Gilt vor und nach der Lieferung. */
  readonly verhaeltnis: readonly [number, number];
  /**
   * Das Seitenverhältnis am schmalen Bildschirm, falls es abweicht.
   *
   * ═══ Warum ein Platz zwei Verhältnisse braucht ═══
   *
   * Gemessen am 30.08.2026: das Hero-Band steht bei 16:7. Am Rechner sind das
   * bei 1440px Breite 630px Höhe — ein grosses Bild. Am Handy sind es bei 393px
   * Breite ganze 172px. Dasselbe Verhältnis, und trotzdem einmal ein Foto und
   * einmal ein Schlitz, durch den man ein Gesicht nicht erkennt.
   *
   * Ein Seitenverhältnis ist eben keine Grösse. Beim Hochskalieren einer Breite
   * skaliert die Höhe mit, aber die MINDESTHÖHE, bei der ein Gesicht lesbar
   * ist, skaliert nicht mit — die ist in Pixeln absolut.
   */
  readonly verhaeltnisSchmal?: readonly [number, number];
  /** Ihr Foto. `null`, solange es aussteht. */
  readonly datei: Offen<string>;
  /** Die Bildbeschreibung ihres Fotos. Gehört zur Datei, nicht zum Platz. */
  readonly alt: Offen<string>;
  /** Bildausschnitt als `object-position`. Damit ein Hochformat in ein Querformat passt. */
  readonly fokus: string;
  /**
   * Die Bildunterschrift ihres Fotos. Zwei bis vier Wörter.
   *
   * Sie gehört zur DATEI und nicht zum Platz: „Der Empfang" unter einer
   * Putzfläche wäre eine Aussage über einen Raum, den es noch nicht gibt — und
   * genau diese Art Satz ist es, die nach der Lieferung stehen bleibt.
   */
  readonly unterschrift: Offen<string>;
  /**
   * Was steht, solange `datei` fehlt.
   *
   * Materialstudien, keine Symbolbilder. Der Unterschied ist nicht Geschmack:
   * ein Symbolbild einer fremden Ärztin behauptet eine Person, die es hier nicht
   * gibt — und die Patientin glaubt, sie hätte die Ärztin gesehen. Eine
   * Putzfläche behauptet nichts.
   */
  readonly ersatz: {
    readonly datei: string;
    readonly alt: string;
    readonly fokus: string;
    /** Was unter dem Ersatz steht. Beschreibt die Studie, nicht den Raum. */
    readonly unterschrift: string;
    /** Zwei Wörter, die auf dem Ersatz stehen. Nur beim grossen Platz gesetzt. */
    readonly wort?: string;
    /** Ein Satz dazu. Nur beim grossen Platz gesetzt. */
    readonly satz?: string;
  };
}

/**
 * Der grosse Platz im Hero.
 *
 * ═══ Warum quer und nicht mehr hoch ═══
 *
 * Bis zum 30.08.2026 war dieser Platz 3:4 hoch — das Format eines
 * Studioporträts. Das war eine Wette auf ein Foto, das es so nur gibt, wenn
 * jemand ein Studioporträt machen lässt.
 *
 * Bei einer Praxiseröffnung entsteht etwas anderes: die Ärztin in ihren neuen
 * Räumen, quer aufgenommen, weil der Raum mit aufs Bild soll. Dieses Bild passt
 * in einen 3:4-Slot nur, indem man links und rechts die Hälfte wegschneidet.
 *
 * 16:7 nimmt beides. Ein Querbild sitzt richtig; ein Hochformat wird über
 * `fokus` auf das Gesicht gezogen und behält seinen Kopf. Der umgekehrte Fall —
 * Querbild in Hochslot — hat diese Rettung nicht.
 */
export const HERO_PLATZ: Bildplatz = {
  kennung: 'hero',
  zweck:
    'Yvonne in der Praxis, quer aufgenommen, der Raum darf mit aufs Bild. Tageslicht von links. Mindestens 2000 px breit.',
  verhaeltnis: [16, 7],
  /* 4:3 am Handy — 295px statt 172px bei 393px Breite. Dasselbe Foto, nur
     enger beschnitten; welcher Ausschnitt bleibt, entscheidet `fokus`. */
  verhaeltnisSchmal: [4, 3],
  datei: praxis.portraet?.src ?? null,
  alt: praxis.portraet?.alt ?? null,
  fokus: '50% 42%',
  unterschrift: null,
  ersatz: {
    unterschrift: 'Kalkputz und Salbei',
    datei: '/bilder/hero-1800.webp',
    alt: 'Frisch gestrichene Wand aus warmweissem Kalkputz, daneben eine salbeigrün gestrichene Fläche, Tageslicht von links.',
    fokus: '64% 50%',
    wort: 'Foto folgt',
    satz: 'Hier steht das Foto der Ärztin in ihrer Praxis. Bis es da ist, hält eine Materialstudie den Platz — sie hat exakt dessen Masse.',
  },
};

/**
 * Die vier Plätze der Praxis-Reihe.
 *
 * Die Verhältnisse sind gemischt und bleiben gemischt: eine Reihe aus vier
 * gleich grossen Rechtecken ist eine Tabelle, keine Reihe. Welches Bild wohin
 * gehört, steht in `zweck` — sie fotografiert dann gegen diese Liste und nicht
 * gegen ein Gefühl.
 */
export const PRAXIS_PLAETZE: readonly Bildplatz[] = [
  {
    kennung: 'praxis-empfang',
    zweck: 'Der Empfang, quer. Der erste Raum, den eine Patientin sieht.',
    verhaeltnis: [3, 2],
    datei: null,
    alt: null,
    fokus: '50% 50%',
    unterschrift: null,
    ersatz: {
      unterschrift: 'Kalkputz und Fussleiste',
      datei: '/bilder/praxis-01.webp',
      alt: 'Leere helle Ecke mit frisch gestrichenem Kalkputz und flacher Fussleiste, Tageslicht von links oben.',
      fokus: '50% 50%',
    },
  },
  {
    kennung: 'praxis-wartebereich',
    zweck: 'Der Wartebereich, hoch. Sitzgelegenheit und Licht, keine Menschen darauf.',
    verhaeltnis: [2, 3],
    datei: null,
    alt: null,
    fokus: '50% 50%',
    unterschrift: null,
    ersatz: {
      unterschrift: 'Leinen im Streiflicht',
      datei: '/bilder/praxis-02.webp',
      alt: 'Naturbelassenes Leinengewebe im Streiflicht, die einzelnen Fäden sind zu erkennen.',
      fokus: '50% 50%',
    },
  },
  {
    kennung: 'praxis-sprechzimmer',
    zweck: 'Das Sprechzimmer, breit quer. Der Tisch, an dem gesprochen wird — nicht die Liege.',
    verhaeltnis: [16, 9],
    datei: null,
    alt: null,
    fokus: '50% 50%',
    unterschrift: null,
    ersatz: {
      unterschrift: 'Licht auf hellem Boden',
      datei: '/bilder/praxis-03.webp',
      alt: 'Heller Estrichboden, über den ein weiches Fensterlicht als Rechteck läuft.',
      fokus: '50% 50%',
    },
  },
  {
    kennung: 'praxis-detail',
    zweck: 'Ein Detail: Licht auf einer Fläche, eine Pflanze, eine Kante. Etwas Ruhiges zum Schluss.',
    verhaeltnis: [3, 2],
    datei: null,
    alt: null,
    fokus: '50% 50%',
    unterschrift: null,
    ersatz: {
      unterschrift: 'Tageslicht auf heller Fläche',
      datei: '/bilder/praxis-04.webp',
      alt: 'Glatte warmweisse Fläche mit einem weichen Lichtverlauf von links oben nach rechts unten.',
      fokus: '50% 50%',
    },
  },
];

/**
 * Die Breite, auf die `width`/`height` gerechnet werden. Beliebig — es zählt
 * allein das Verhältnis der beiden Zahlen zueinander.
 */
const BEZUGSBREITE = 1600;

/**
 * Was an einem Platz tatsächlich gezeigt wird.
 *
 * Der Rückgabewert trägt `echt` mit — daran hängen Marker, Leitsätze und
 * Bildunterschriften. Ein Aufrufer fragt nie selbst `datei !== null`; täte er
 * es, wäre er die nächste Stelle, an der jemand den Handgriff vergisst.
 */
export function zeigt(platz: Bildplatz): {
  readonly src: string;
  readonly alt: string;
  readonly fokus: string;
  readonly unterschrift: string;
  readonly echt: boolean;
  readonly verhaeltnis: string;
  readonly verhaeltnisSchmal: string;
  /**
   * `width` und `height` fürs `<img>`.
   *
   * ═══ Warum abgeleitet und nicht die echten Pixelmasse der Datei ═══
   *
   * Weil der Browser sie nur benutzt, um das Seitenverhältnis zu kennen, bevor
   * das Bild da ist — und weil die echten Masse sich mit jeder gelieferten
   * Datei ändern würden. Eine Zahl, die bei jedem Bildtausch nachgepflegt
   * werden muss, ist eine Zahl, die irgendwann falsch ist.
   *
   * Sie NICHT zu setzen war keine Alternative: `scripts/qa.mjs` zählt Bilder
   * ohne `width`/`height`, und zwar zu Recht. Steht die Angabe nicht da, hat
   * die Seite zwischen Aufbau und Stylesheet keine Höhe für das Bild — und ein
   * Sprung, der nur auf langsamen Verbindungen auftritt, ist der Sprung, den
   * niemand beim Ansehen findet.
   */
  readonly breite: number;
  readonly hoehe: number;
} {
  const echt = platz.datei !== null && platz.alt !== null;
  return {
    src: echt ? (platz.datei as string) : platz.ersatz.datei,
    alt: echt ? (platz.alt as string) : platz.ersatz.alt,
    fokus: echt ? platz.fokus : platz.ersatz.fokus,
    unterschrift: echt ? (platz.unterschrift ?? '') : platz.ersatz.unterschrift,
    echt,
    verhaeltnis: `${platz.verhaeltnis[0]} / ${platz.verhaeltnis[1]}`,
    verhaeltnisSchmal: `${(platz.verhaeltnisSchmal ?? platz.verhaeltnis)[0]} / ${(platz.verhaeltnisSchmal ?? platz.verhaeltnis)[1]}`,
    breite: BEZUGSBREITE,
    hoehe: Math.round((BEZUGSBREITE * platz.verhaeltnis[1]) / platz.verhaeltnis[0]),
  };
}

/** Stehen an allen Plätzen einer Gruppe echte Fotos? Entscheidet die Leitsätze. */
export function alleEcht(plaetze: readonly Bildplatz[]): boolean {
  return plaetze.every((p) => zeigt(p).echt);
}

/** Steht an mindestens einem Platz ein echtes Foto? */
export function einesEcht(plaetze: readonly Bildplatz[]): boolean {
  return plaetze.some((p) => zeigt(p).echt);
}

/**
 * Der Leitsatz über der Praxis-Reihe — geschrieben aus dem Zustand der Plätze.
 *
 * ═══ Warum das eine Funktion ist und kein Text im Aufrufer ═══
 *
 * Weil dieser Satz die einzige Stelle der Seite ist, die das Fehlen der Fotos
 * ausspricht. Stünde er im Aufrufer, stünde er dort auch noch am Tag danach:
 * „fotografiert ist sie noch nicht", unter vier Fotos ihrer Praxis. Genau
 * dieser Satz ist der Grund, warum es das Register gibt.
 *
 * Der Zwischenzustand ist mitgedacht. Sie schickt vermutlich nicht alle vier
 * Bilder gleichzeitig, und ein Satz, der bei drei von vier Fotos noch behauptet,
 * es gebe keine, ist so falsch wie der umgekehrte Fall.
 */
export function praxisLead(plaetze: readonly Bildplatz[]): string {
  if (alleEcht(plaetze)) {
    return 'Die Räume der Praxis. Zum Verschieben ziehen oder wischen.';
  }

  if (einesEcht(plaetze)) {
    return 'Die ersten Aufnahmen der fertigen Räume stehen hier. Wo noch eine Material- oder Lichtstudie steht, ist der Raum noch nicht fotografiert — die Bilder kommen an dieselben Stellen.';
  }

  return 'Die Praxis wird gerade gebaut, fotografiert ist sie noch nicht. Solange stehen hier Material- und Lichtstudien — der Putz, das Leinen, das Licht, mit dem eingerichtet wird. Nach der Eröffnung stehen an denselben Stellen die echten Fotos.';
}
