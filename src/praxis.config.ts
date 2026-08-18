/**
 * Sämtliche Kundendaten dieser Seite. Einzige Stelle.
 *
 * Kein Name, keine Anschrift, keine Uhrzeit und keine Leistungsangabe steht
 * irgendwo sonst im Code.
 *
 * ═══ Die Regel, die diese Datei zusammenhält ═══
 *
 * `null` heisst: steht noch nicht fest. Es wird als **sichtbare Lücke** gezeigt,
 * nie als Demo-Wert und nie als Erfindung.
 *
 * Das ist keine Pedanterie. Eine erfundene Öffnungszeit ist eine Patientin vor
 * einer verschlossenen Tür. Eine erfundene Ärztekammer ist ein Abmahngrund auf
 * einer Pflichtseite. Und ein Demo-Wert, der plausibel aussieht, wird beim
 * Ausrollen übersehen — genau dafür sind Demo-Werte gebaut.
 *
 * Solange hier ein `null` steht, geht die Seite nicht live. Das ist der Zweck.
 *
 * ═══ Was NICHT hier steht ═══
 *
 * Team, Aktuelles und Öffnungszeiten pflegt die Ärztin selbst — die liegen in
 * `inhalt/*.json` und werden von dort gelesen. Siehe `inhalt/schema.json`.
 */

/** Ein Wert, der noch aussteht. `null` wird zur Lücke, nie zum Platzhaltertext. */
export type Offen<T> = T | null;

/* ══ Der Demo-Schalter ════════════════════════════════════════════════════
 *
 * Solange er `true` ist, zeigt die Seite ERFUNDENE Werte — Name, Anschrift,
 * Telefonnummer, Sprechzeiten. Sie stehen hier, damit die Gestaltung an einer
 * gefüllten Seite beurteilt werden kann und nicht an einem Lückenraster.
 *
 * ═══ Warum ein Schalter und nicht einfach eingetragene Werte ═══
 *
 * Weil ein Demo-Wert genau dafür gebaut ist, plausibel auszusehen — und deshalb
 * beim letzten Durchsehen übersehen wird. Ein einzelner Wert, der live geht,
 * ist auf einer Arztseite kein Schönheitsfehler: eine erfundene Öffnungszeit
 * ist eine Patientin vor verschlossener Tür, eine erfundene Ärztekammer ein
 * Abmahngrund auf einer Pflichtseite.
 *
 * Mit dem Schalter gibt es diesen Handgriff nicht mehr. `DEMO = false` setzen,
 * und JEDER erfundene Wert dieser Datei ist im selben Moment wieder `null` —
 * also wieder eine sichtbare Lücke. Es kann keiner einzeln vergessen werden,
 * weil keiner einzeln eingetragen ist.
 *
 * Drei weitere Sperren hängen daran:
 *   1. `index.html` bekommt `noindex`, solange DEMO gilt — eine versehentlich
 *      ausgerollte Demo-Fassung landet nicht bei Google.
 *   2. `node scripts/pruefe-freigabe.mjs` bricht ab, solange DEMO gilt.
 *   3. `npm run build` schreibt eine laute Warnung in die Ausgabe.
 *
 * ═══ Was beim Umlegen zu tun ist ═══
 *
 * `DEMO = false`, dann `node scripts/pruefe-freigabe.mjs`. Das Skript listet
 * jede Angabe auf, die dann noch fehlt. Diese Liste ist die Frageliste an die
 * Ärztin — sie muss nicht von Hand gepflegt werden.
 */
export const DEMO = true;

/**
 * Ein erfundener Wert. Gilt nur, solange `DEMO` an ist — sonst ist er `null`.
 *
 * Jeder Aufruf ist zugleich die Markierung: `grep -c "demo(" praxis.config.ts`
 * zählt, wie viele Angaben in Wahrheit noch fehlen.
 */
const demo = <T>(wert: T): Offen<T> => (DEMO ? wert : null);

export const praxis = {
  /* ── Identität ───────────────────────────────────────────────────────────
     Eine Einzelpraxis brandet sich über die Person, nicht über einen
     Fantasienamen. Solange der Name fehlt, trägt die Wortmarke die Lücke —
     und nicht „Musterpraxis". */

  /**
   * Der Praxisname, wie er über der Tür steht.
   *
   * Solange er fehlt, setzt `Marke.tsx` die beschreibende Wortmarke „Praxis für
   * Frauenheilkunde". Das ist keine Erfindung, sondern eine wahre Beschreibung —
   * anders als ein ausgedachter Eigenname, der auf jeder Seite stünde und beim
   * Ausliefern übersehen würde.
   */
  name: demo('Praxis für Frauenheilkunde Dr. Berger'),

  /**
   * Ihr Logo, sobald es fertig ist: „ist hoffentlich bald fertig, würde ich dir
   * zukommen lassen, sobald es final steht."
   *
   * Wird es hier gesetzt, rendert `Marke.tsx` ein `<img>` statt der Wortmarke.
   * Kopfzeile, Hero, Fusszeile und Rechtsseiten folgen von selbst — das ist der
   * ganze Grund, warum die Marke eine eigene Komponente ist.
   */
  logo: null as Offen<{
    readonly src: string;
    readonly alt: string;
    readonly breite: number;
    readonly hoehe: number;
  }>,

  aerztin: {
    /** „Dr. med." oder nichts. Ein Doktortitel, den jemand nicht hat, ist strafbar. */
    titel: demo('Dr. med.'),
    vorname: demo('Yvonne'),
    /** ERFUNDEN. Ihr echter Nachname ist nicht bekannt und wird nicht geraten. */
    nachname: demo('Berger'),
    /** Die geschützte Berufsbezeichnung. Muss mit der Kammerurkunde übereinstimmen. */
    fachbezeichnung: demo('Fachärztin für Frauenheilkunde und Geburtshilfe'),
  },

  /**
   * Ihr Porträt — das einzige Bild dieser Seite, das echt sein MUSS.
   *
   * Es wird nicht erzeugt, auch nicht als Symbolbild einer Ärztin. Solange es
   * fehlt, hält im Hero eine Materialstudie exakt dessen Platz, und darüber
   * steht sichtbar „Porträt folgt". Beides verschwindet, sobald hier ein Wert
   * steht — es gibt keinen zweiten Handgriff, den jemand vergessen könnte.
   *
   * Aufnahmehinweis siehe `public/bilder/PLATZHALTER.md`.
   */
  portraet: null as Offen<{ readonly src: string; readonly alt: string }>,

  /** Der Ort steht fest — er ist der Grund, warum es die Seite gibt. */
  ort: 'Erkelenz',

  /** Der Eröffnungstag. Bis er feststeht, wird er nirgends behauptet. */
  eroeffnung: demo('1. Oktober 2026'),

  adresse: {
    strasse: demo('Kölner Straße 24'),
    plz: demo('41812'),
    ort: 'Erkelenz',
  },

  telefon: {
    /** Wie die Nummer dasteht, z. B. „02431 · 12 34 56". */
    anzeige: demo('02431 · 97 84 20'),
    /** Dieselbe Nummer wählbar, z. B. „tel:+492431123456". */
    href: demo('tel:+4924319784 20'.replace(/\s/g, '')),
  },

  /** Telefonzeiten stehen bewusst getrennt von den Sprechzeiten — sie sind es. */
  telefonzeiten: demo('Montag bis Freitag, 8:00 – 12:00 Uhr'),

  email: demo('praxis@frauenheilkunde-erkelenz.de'),

  /**
   * Der Endpunkt des Rückrufformulars. MUSS in der EU liegen.
   *
   * Solange `null`, nimmt das Formular nichts entgegen und verweist ans Telefon.
   * Ein Formular, das ins Nichts sendet, ist schlimmer als keins: die Patientin
   * wartet auf einen Rückruf, den niemand bekommen hat.
   */
  formularEndpunkt: demo('https://api.frauenheilkunde-erkelenz.de/rueckruf'),

  /** Kassenzulassung. Steht noch nicht fest, also steht sie nirgends. */
  kassen: demo('Alle gesetzlichen Kassen und privat'),

  /** Kein Doctolib. Sie startet ohne und nimmt es „ggf. später" dazu. */
  onlineTermin: null as Offen<{ readonly anbieter: string; readonly url: string }>,
} as const;

/* ══ Leistungen ═══════════════════════════════════════════════════════════
 *
 * Ihre Worte, ihre Reihenfolge, keine dazuerfunden:
 * Schwangerschaft · Krebsvorsorge · Verhütung · Kinderwunschberatung ·
 * Mädelssprechstunde. Impfungen und Botox stehen darunter als „weitere".
 *
 * „Mädelssprechstunde" bleibt exakt so stehen. Es ist ihr Wort und der einzige
 * Begriff auf dieser Seite, den keine andere Praxis in Erkelenz benutzt.
 *
 * ═══ Woher die Zahlen kommen ═══
 *
 * Jede Zahl in diesen Texten ist eine allgemeine Angabe zum Verfahren — aus den
 * Mutterschaftsrichtlinien, dem Krebsfrüherkennungsprogramm des Gemeinsamen
 * Bundesausschusses oder den STIKO-Empfehlungen. KEINE davon ist eine Zusage
 * über diese Praxis („20 Minuten pro Termin", „Rückruf am selben Tag"). Solche
 * Zusagen kann nur die Ärztin machen, und sie hat sie noch nicht gemacht.
 */

export interface Leistung {
  /** Die Sprungmarke auf /leistungen/. */
  readonly id: string;
  readonly titel: string;
  /** Ein Satz für die Startseite. Behauptend, mit Punkt. */
  readonly kurz: string;
  /**
   * EIN Absatz für /leistungen/ — so steht es im Bauauftrag.
   *
   * Der erste Entwurf hatte drei je Leistung. Gemessen mit `engine/pruefen.mjs`
   * bei 393×727: 9,2 Bildschirmhöhen, über der Grenze von 8. Sieben Leistungen
   * mal drei Absätze sind kein ausführlicher Text, sondern eine Wand — und eine
   * Patientin, die auf dem Handy nach der Mädelssprechstunde sucht, scrollt
   * daran vorbei statt hindurch.
   *
   * Gekürzt wurde die Prosa, nicht die Sache: jede Zahl, jede Woche und jede
   * Altersgrenze aus der langen Fassung steht noch hier.
   */
  readonly absatz: string;
}

export const leistungen: readonly Leistung[] = [
  {
    id: 'schwangerschaft',
    titel: 'Schwangerschaft',
    kurz: 'Betreuung von der ersten Untersuchung bis nach der Geburt.',
    absatz:
      'Die Vorsorge richtet sich nach den Mutterschaftsrichtlinien: bis zur 32. Woche etwa alle vier Wochen ein Termin, danach alle zwei, dazu drei Ultraschalluntersuchungen in der 9. bis 12., der 19. bis 22. und der 29. bis 32. Schwangerschaftswoche. Alles wird im Mutterpass eingetragen, den Sie beim ersten Termin bekommen und ab dann immer dabeihaben sollten. Untersuchungen, die über diesen Rahmen hinausgehen, bespreche ich vorher mit Ihnen — was sie zeigen kann, was nicht, und was ein auffälliges Ergebnis für Sie bedeuten würde. Nach der Geburt sehen wir uns noch einmal, etwa sechs bis acht Wochen später; Ihr Kind dürfen Sie selbstverständlich mitbringen.',
  },
  {
    id: 'krebsvorsorge',
    titel: 'Krebsvorsorge',
    kurz: 'Die jährliche Untersuchung, und was sich ab 35 daran ändert.',
    absatz:
      'Ab 20 Jahren übernimmt die Kasse einmal im Jahr die Untersuchung auf Gebärmutterhalskrebs. Dazu gehört ein Abstrich vom Muttermund — der sogenannte Pap-Test, benannt nach dem Arzt, der ihn entwickelt hat. Er dauert weniger als eine Minute; das Ergebnis kommt aus dem Labor und braucht einige Tage. Ab 35 ändert sich das Verfahren: dann wird der Abstrich mit einem Test auf humane Papillomviren (HPV) kombiniert, dafür nur noch alle drei Jahre. Zur Untersuchung gehört ausserdem das Abtasten der Brust, ab 30 Jahren als Kassenleistung — auf Wunsch zeige ich Ihnen dabei, worauf Sie beim Selbstabtasten achten können.',
  },
  {
    id: 'verhuetung',
    titel: 'Verhütung',
    kurz: 'Was zu Ihnen passt, hängt von Ihrem Leben ab — nicht von einer Tabelle.',
    absatz:
      'Pille, Hormonspirale, Kupferspirale, Implantat, Ring, Pflaster, Kupferkette, natürliche Verfahren: jedes davon hat eine andere Sicherheit, andere Nebenwirkungen und andere Kosten. Eine Spirale bleibt je nach Modell drei bis zehn Jahre liegen und wird nach dem Einlegen zweimal per Ultraschall kontrolliert. Das Einlegen dauert wenige Minuten und liegt zeitlich am besten gegen Ende der Periode, weil der Muttermund dann etwas weicher ist; es kann ziehen wie ein starker Regelschmerz, und auf Wunsch geht es mit örtlicher Betäubung. Wir gehen im Termin durch, was für Sie in Frage kommt und was dagegen spricht — dafür muss ich wissen, ob Sie rauchen, welche Medikamente Sie nehmen und ob es in Ihrer Familie Thrombosen gab.',
  },
  {
    id: 'kinderwunsch',
    titel: 'Kinderwunschberatung',
    kurz: 'Wann es Sinn ergibt abzuwarten, und ab wann nicht mehr.',
    absatz:
      'Es gibt eine Faustregel, nach der sich auch die Kostenübernahme richtet: Wenn Sie jünger als 35 sind, gilt ein Jahr regelmässiger Versuche als normal, bevor abgeklärt wird; ab 35 sind es sechs Monate. Wer früher kommt, kommt nicht zu früh — aber diese Zahlen erklären, warum ich manchmal zum Abwarten rate. Der erste Schritt ist meistens keine grosse Diagnostik, sondern der Zyklus: wann der Eisprung stattfindet und ob die zweite Zyklushälfte lang genug ist, dazu Blutwerte und ein Ultraschall der Eierstöcke. Zur Abklärung gehören immer beide Partner — ein Spermiogramm ist einfacher, schneller und günstiger als alles, was ich bei Ihnen untersuchen kann, und steht deshalb meistens am Anfang.',
  },
  {
    id: 'maedelssprechstunde',
    titel: 'Mädelssprechstunde',
    kurz: 'Der erste Termin beim Frauenarzt, ohne dass etwas passieren muss.',
    absatz:
      'Zum ersten Termin gehört keine Untersuchung auf dem Stuhl, wenn Sie keine möchten. Wir reden — über den Zyklus, über Schmerzen, über Verhütung, über das, was Sie im Internet gelesen haben. Das ist ein vollwertiger Termin und keine Vorstufe zu einem richtigen. Sie dürfen jemanden mitbringen: die Mutter, eine Freundin, den Freund. Sie dürfen auch allein kommen und die Begleitung im Wartebereich lassen; beides ist in Ordnung, und Sie müssen sich vorher nicht entscheiden. Ich unterliege der Schweigepflicht, auch gegenüber Ihren Eltern, sobald Sie die Tragweite selbst überblicken können — in der Regel ab etwa 16 Jahren. Was Sie mir erzählen, bleibt in diesem Zimmer.',
  },
];

/**
 * „Weitere Leistungen" — ihre eigene Einordnung.
 *
 * ═══ Warum bei Botox drei Sätze fehlen ═══
 *
 * Das Heilmittelwerbegesetz verbietet bei ästhetischen Eingriffen die Werbung mit
 * Vorher-Nachher-Bildern (§ 11 Abs. 1 Satz 3 HWG) und untersagt Heilungs- oder
 * Wirkversprechen. Nennen darf man die Leistung, bewerben nicht. Kein Preis,
 * kein Ergebnisbild, kein „strahlend jung", keine Haltbarkeitsangabe.
 *
 * Das ist bei Heilberufen kein Formalkram: abgemahnt wird von Mitbewerbern, und
 * eine Praxis, die am Eröffnungstag eine Abmahnung im Briefkasten hat, hat ein
 * echtes Problem. Der kurze Text ist Absicht, nicht Faulheit.
 */
export const weitereLeistungen: readonly Leistung[] = [
  {
    id: 'impfungen',
    titel: 'Impfungen',
    kurz: 'Nach den Empfehlungen der Ständigen Impfkommission.',
    absatz:
      'Die HPV-Impfung empfiehlt die Ständige Impfkommission für Mädchen und Jungen zwischen 9 und 14 Jahren; nachgeholt werden kann sie bis zum 18. Geburtstag, bis dahin zahlt die Kasse. Wer vor dem 15. Geburtstag anfängt, braucht zwei Dosen statt drei. Vor einer geplanten Schwangerschaft sehe ich mir den Impfpass an — Röteln, Windpocken und Keuchhusten sind die drei, auf die es dabei ankommt. Bringen Sie den Pass mit, wenn Sie ihn finden: ohne ihn müssen wir raten oder Blut abnehmen.',
  },
  {
    id: 'aesthetik',
    titel: 'Kleine ästhetische Botoxbehandlungen',
    kurz: 'Biete ich an. Besprochen wird das im Termin, nicht auf einer Website.',
    absatz:
      'Über ästhetische Behandlungen mit Botulinumtoxin darf ich auf einer Website nicht mehr schreiben als: es gibt sie hier. Das Heilmittelwerbegesetz erlaubt bei solchen Eingriffen keine Vorher-Nachher-Bilder und keine Wirkversprechen, und das halte ich für richtig. Was die Behandlung kostet, wie sie abläuft, was sie kann und was nicht, besprechen wir im Termin. Es ist eine Selbstzahlerleistung.',
  },
];

/* ══ Der erste Besuch ═════════════════════════════════════════════════════
 * Allgemeine Angaben, keine Zusage über diese Praxis. */

export interface Mitbringen {
  readonly was: string;
  readonly warum: string;
}

export const mitbringen: readonly Mitbringen[] = [
  {
    was: 'Ihre Versichertenkarte',
    warum:
      'Ohne sie geht es auch, dann bekommen Sie aber Post — die Karte muss innerhalb des Quartals nachgereicht werden.',
  },
  {
    was: 'Den Mutterpass, wenn Sie schwanger sind',
    warum: 'Er gehört Ihnen und wandert mit Ihnen. Alles, was untersucht wird, wird dort eingetragen.',
  },
  {
    was: 'Den Impfpass, wenn Sie ihn finden',
    warum: 'Damit sehe ich in zwei Minuten, was fehlt. Ohne ihn kostet dieselbe Frage eine Blutabnahme.',
  },
  {
    was: 'Die Namen Ihrer Medikamente',
    warum: 'Ein Foto der Packungen auf dem Handy genügt. Die Dosis steht drauf.',
  },
  {
    was: 'Den ersten Tag Ihrer letzten Periode',
    warum: 'Danach wird jedes Mal gefragt, und fast niemand hat die Antwort parat.',
  },
];

/* ══ Notrufe ══════════════════════════════════════════════════════════════
 *
 * Feste Nummern, keine Kundendaten. Sie stehen hier, damit sie nirgends doppelt
 * liegen und niemand sie beim Kundenwechsel vergisst.
 *
 * In der alten Fassung dieses Repos waren ausgerechnet diese Nummern die
 * KLEINSTEN Tippziele der ganzen Seite — 40px. Wer sie braucht, hat es eilig
 * und zittert womöglich. Sie sind jetzt die grössten. */

export const notruf = {
  bereitschaft: {
    anzeige: '116 117',
    href: 'tel:116117',
    titel: 'Ärztlicher Bereitschaftsdienst',
    wann: 'Wenn die Praxis geschlossen hat und es nicht bis zum nächsten Werktag warten kann.',
  },
  rettung: {
    anzeige: '112',
    href: 'tel:112',
    titel: 'Rettungsdienst',
    wann: 'Bei starken Blutungen, plötzlichen heftigen Unterbauchschmerzen, Bewusstlosigkeit.',
  },
  hilfetelefon: {
    anzeige: '116 016',
    href: 'tel:116016',
    titel: 'Hilfetelefon Gewalt gegen Frauen',
    wann: 'Rund um die Uhr, kostenlos, auf Wunsch anonym und in 18 Sprachen.',
  },
} as const;

/* ══ Rechtliches ══════════════════════════════════════════════════════════
 *
 * Bei Heilberufen verlangt § 5 DDG mehr als bei anderen: die zuständige Kammer,
 * die gesetzliche Berufsbezeichnung, den Staat der Verleihung und wo die
 * Berufsordnung einzusehen ist.
 *
 * Nichts hiervon wird geraten. Für Erkelenz ist mit hoher Wahrscheinlichkeit die
 * Ärztekammer Nordrhein zuständig — „mit hoher Wahrscheinlichkeit" ist auf einer
 * Pflichtseite aber keine Angabe, sondern eine Vermutung. Sie muss bestätigt
 * werden, und bis dahin steht dort eine Lücke. */

export const rechtliches = {
  berufsbezeichnung: demo('Ärztin — verliehen in der Bundesrepublik Deutschland'),
  verleihenderStaat: 'Bundesrepublik Deutschland',
  /* Erkelenz liegt im Kreis Heinsberg und damit im Bezirk Nordrhein. Das ist
     nachprüfbar richtig — es steht trotzdem unter `demo()`, weil es die Ärztin
     auf ihrer Pflichtseite bestätigen muss und nicht wir. */
  aerztekammer: demo('Ärztekammer Nordrhein'),
  aerztekammerUrl: demo('https://www.aekno.de/'),
  kassenaerztlicheVereinigung: demo('Kassenärztliche Vereinigung Nordrhein'),
  kassenaerztlicheVereinigungUrl: demo('https://www.kvno.de/'),
  berufsordnungUrl: demo('https://www.aekno.de/aerzte/berufsordnung'),
  aufsichtsbehoerde: demo('Ärztekammer Nordrhein, Tersteegenstraße 9, 40474 Düsseldorf'),
  umsatzsteuerId: demo('Heilbehandlungen sind nach § 4 Nr. 14 UStG umsatzsteuerfrei'),
  datenschutzbeauftragter: demo('praxis@frauenheilkunde-erkelenz.de'),
  hostingAnbieter: demo('Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen'),
  berufshaftpflicht: demo('Deutsche Ärzteversicherung AG, Hansaring 40–50, 50670 Köln'),
  /** Räumlicher Geltungsbereich der Berufshaftpflicht, § 2 DL-InfoV. */
  berufshaftpflichtGeltung: demo('Bundesrepublik Deutschland'),
  datenschutzAufsicht: demo('Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen'),
  /** Wie lange eine Rückrufanfrage gespeichert wird. Pflichtangabe, Art. 13 DSGVO. */
  speicherdauerRueckruf: demo('Bis zum Rückruf, längstens 30 Tage'),
} as const;

/* ══ Anfahrt ══════════════════════════════════════════════════════════════ */

export interface Zugangspunkt {
  readonly punkt: string;
  readonly detail: Offen<string>;
}

/**
 * Barrierefreiheit. Jede Zeile ist ein echtes Auswahlkriterium — für eine
 * Hochschwangere im achten Monat ist „Aufzug ja/nein" keine Nebeninformation.
 *
 * Deshalb wird hier NICHTS geschätzt. Was nicht vor Ort nachgemessen ist, bleibt
 * leer. Eine falsche Zusage über einen Aufzug ist schlimmer als gar keine.
 */
export const zugang: readonly Zugangspunkt[] = [
  { punkt: 'Stufenloser Zugang', detail: demo('Ja, ebenerdig von der Kölner Straße aus.') },
  { punkt: 'Aufzug', detail: demo('Ja, die Praxis liegt im ersten Obergeschoss.') },
  { punkt: 'Platz für Kinderwagen', detail: demo('Im Eingangsbereich, überdacht und einsehbar.') },
  {
    punkt: 'Parken',
    detail: demo('Sechs Plätze hinter dem Haus, dazu Parkhaus Franziskanerplatz in 200 m.'),
  },
  {
    punkt: 'Bus und Bahn',
    detail: demo('Bahnhof Erkelenz in 600 m, Bushaltestelle Kölner Straße direkt vor der Tür.'),
  },
  { punkt: 'Behindertengerechte Toilette', detail: demo('Ja, im Wartebereich.') },
];
