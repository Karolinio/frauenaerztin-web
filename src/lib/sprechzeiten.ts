import { sprechzeiten, type Sprechzeit, type Wochentag } from '../praxis.config';

/** JS zählt Sonntag als 0. Die Praxis kennt nur Montag bis Freitag. */
const REIHENFOLGE: readonly Wochentag[] = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

function tagAus(datum: Date): Wochentag | null {
  const index = datum.getDay() - 1;
  return REIHENFOLGE[index] ?? null;
}

function zeitenAls(text: Sprechzeit): string {
  const bloecke = [text.vormittag, text.nachmittag].filter((zeit): zeit is string => zeit !== null);
  return bloecke.join(' und ');
}

export interface HeutigeSprechzeit {
  readonly istHeute: boolean;
  readonly tag: Wochentag;
  readonly zeiten: string;
  readonly hinweis?: string;
}

/**
 * Was heute gilt. Ist heute keine Sprechstunde (Wochenende oder ein Tag ohne
 * Zeiten), wird der nächste Tag mit Sprechstunde genannt — eine Angabe, mit der
 * jemand sofort etwas anfangen kann, statt einer Tabelle zum Suchen.
 */
export function heutigeSprechzeit(jetzt: Date = new Date()): HeutigeSprechzeit {
  const heute = tagAus(jetzt);
  const heutiger = heute ? sprechzeiten.find((s) => s.tag === heute) : undefined;

  if (heutiger && (heutiger.vormittag || heutiger.nachmittag)) {
    return {
      istHeute: true,
      tag: heutiger.tag,
      zeiten: zeitenAls(heutiger),
      ...(heutiger.hinweis ? { hinweis: heutiger.hinweis } : {}),
    };
  }

  // Ab morgen weitersuchen, im Kreis über die Woche.
  const startIndex = heute ? REIHENFOLGE.indexOf(heute) + 1 : 0;
  for (let versatz = 0; versatz < REIHENFOLGE.length; versatz += 1) {
    const tag = REIHENFOLGE[(startIndex + versatz) % REIHENFOLGE.length];
    const eintrag = tag ? sprechzeiten.find((s) => s.tag === tag) : undefined;
    if (eintrag && (eintrag.vormittag || eintrag.nachmittag)) {
      return {
        istHeute: false,
        tag: eintrag.tag,
        zeiten: zeitenAls(eintrag),
        ...(eintrag.hinweis ? { hinweis: eintrag.hinweis } : {}),
      };
    }
  }

  // Kann nur eintreten, wenn in der Konfiguration kein einziger Tag Zeiten hat.
  throw new Error('In praxis.config.ts ist keine einzige Sprechzeit hinterlegt.');
}
