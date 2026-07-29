/**
 * Sämtliche Kundendaten dieser Seite. Einzige Stelle.
 *
 * Kein Name, keine Adresse, keine Uhrzeit und keine Leistungsangabe steht
 * irgendwo sonst im Code. Wenn der Praxisname feststeht, wird diese Datei
 * getauscht — sonst nichts.
 *
 * Jeder Wert, den die Ärztin noch bestätigen oder ersetzen muss, ist mit
 * `TODO Kunde` markiert. Die Demo-Werte sind echte deutsche Sätze mit
 * erfundenen Zahlen, keine Blindtexte — sie zeigen, wie die Seite mit
 * realen Angaben aussieht.
 */

export type Wochentag = 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag';

export interface Sprechzeit {
  readonly tag: Wochentag;
  /** Leer = an diesem Tag keine Sprechstunde. */
  readonly vormittag: string | null;
  readonly nachmittag: string | null;
  readonly hinweis?: string;
}

export interface Station {
  readonly nummer: string;
  readonly name: string;
  readonly dauer: string;
  readonly satz: string;
  /** Dateiname in /media, ohne Endung. AVIF und JPEG liegen unter gleichem Namen. */
  readonly bild: string;
  readonly alt: string;
}

export type Zeichen = 'intervall' | 'verlauf' | 'auswahl' | 'folge' | 'uebergang';

export interface Leistung {
  readonly titel: string;
  readonly kurz: string;
  readonly details: readonly string[];
  /** Steuert die Kachelgröße im asymmetrischen Raster. */
  readonly gewicht: 'gross' | 'mittel' | 'schmal';
  /** Handgezeichnetes Inline-SVG, siehe components/leistungen/Zeichen.tsx. */
  readonly zeichen: Zeichen;
}

export interface WerdegangEintrag {
  readonly zeit: string;
  readonly was: string;
  readonly wo: string;
}

export const praxis = {
  /* TODO Kunde — Praxisname und Nachname stehen noch nicht fest.
     Bis dahin ist die Wortmarke der Titel plus Platzhalter. Kein Logo. */
  nachname: '[Nachname]',
  titel: 'Dr. med.',
  fachbezeichnung: 'Fachärztin für Frauenheilkunde und Geburtshilfe',
  kurzbezeichnung: 'Frauenärztin',

  /** Das Versprechen der ganzen Seite. Verfahrensaussage, kein Qualitätsanspruch. */
  einzeiler: 'Eine Frauenarztpraxis, in der Sie vorher wissen, was passiert.',

  adresse: {
    /* TODO Kunde — Praxisanschrift */
    strasse: '[Straße und Hausnummer]',
    plz: '[PLZ]',
    ort: '[Ort]',
    /* TODO Kunde — für die Karte nach Consent. Bis dahin ohne Kartenausschnitt. */
    koordinaten: null as { readonly lat: number; readonly lon: number } | null,
  },

  telefon: {
    /* TODO Kunde — echte Rufnummer eintragen. Die Demo-Nummer ist bewusst
       nicht wählbar, damit im Vorschau-Betrieb niemand Fremdes klingelt. */
    anzeige: '0000 · 00 00 00',
    href: 'tel:+49000000000',
  },

  /* TODO Kunde — E-Mail-Adresse der Praxis (Impressum, § 5 DDG) */
  email: '[E-Mail-Adresse]',

  /* TODO Kunde — EU-gehosteter Endpunkt für das Rückrufformular.
     Solange null, nimmt das Formular nichts entgegen und verweist auf das Telefon. */
  formularEndpunkt: null as string | null,
} as const;

/** TODO Kunde — Sprechzeiten bestätigen. */
export const sprechzeiten: readonly Sprechzeit[] = [
  { tag: 'Montag', vormittag: '08:00 – 12:00', nachmittag: '15:00 – 18:00' },
  { tag: 'Dienstag', vormittag: '08:00 – 12:00', nachmittag: null },
  { tag: 'Mittwoch', vormittag: '08:00 – 13:00', nachmittag: null, hinweis: 'nur nach Vereinbarung' },
  { tag: 'Donnerstag', vormittag: '08:00 – 12:00', nachmittag: '15:00 – 18:00' },
  { tag: 'Freitag', vormittag: '08:00 – 13:00', nachmittag: null },
];

/** TODO Kunde — Telefonzeiten bestätigen. Stehen bewusst getrennt von den Sprechzeiten. */
export const telefonzeiten = {
  zeile: 'Montag bis Freitag, 08:00 – 11:30',
  rueckruf: 'Rückruf am selben Werktag, wenn Sie bis 11:30 anrufen.',
} as const;

/** TODO Kunde — Kassenzulassung bestätigen. */
export const kassen = {
  gesetzlich: true,
  privat: true,
  selbstzahler: true,
  zeile: 'Alle gesetzlichen Kassen, private Kassen, Selbstzahlerinnen.',
} as const;

/** TODO Kunde — Barrierefreiheit vor Ort prüfen. Jede Zeile muss stimmen. */
export const zugang: readonly { readonly punkt: string; readonly detail: string }[] = [
  { punkt: 'Aufzug', detail: 'Praxis im [1.] Obergeschoss, Aufzug ab Hauseingang, Kabine 110 × 140 cm.' },
  { punkt: 'Kinderwagen', detail: 'Stellplatz im Flur vor der Praxis. Kein Treppenabsatz vor der Tür.' },
  { punkt: 'Parken', detail: '[Anzahl] Parkplätze im Hof, Zufahrt über die [Straße].' },
  { punkt: 'Öffentlich', detail: '[Linie] bis [Haltestelle], von dort [Anzahl] Minuten zu Fuß.' },
];

/** TODO Kunde — Leistungsspektrum bestätigen und streichen, was nicht angeboten wird. */
export const leistungen: readonly Leistung[] = [
  {
    titel: 'Vorsorge',
    kurz: 'Die jährliche Untersuchung, plus Ultraschall im Haus, wenn er nötig ist.',
    details: [
      'Krebsfrüherkennung nach den Richtlinien des Gemeinsamen Bundesausschusses: Abstrich vom Gebärmutterhals, ab 35 zusätzlich der HPV-Test, alle drei Jahre.',
      'Ultraschall der Gebärmutter und der Eierstöcke über die Scheide — sechs bis acht Minuten, kein zusätzlicher Termin.',
      'Tastuntersuchung der Brust und Anleitung zur Selbstuntersuchung, wenn Sie sie möchten.',
    ],
    gewicht: 'gross',
    zeichen: 'intervall',
  },
  {
    titel: 'Schwangerschaft',
    kurz: 'Betreuung nach Mutterschaftsrichtlinien, von der ersten Woche bis nach der Geburt.',
    details: [
      'Alle Vorsorgeuntersuchungen und Ultraschalle nach Mutterschaftsrichtlinien, im Mutterpass dokumentiert.',
      'Ersttrimester-Screening und weiterführende Diagnostik: ich sage Ihnen, was die Untersuchung leisten kann und was nicht, bevor Sie entscheiden.',
      'Nachsorge sechs bis acht Wochen nach der Geburt, Termin mit Kind möglich.',
    ],
    gewicht: 'mittel',
    zeichen: 'verlauf',
  },
  {
    titel: 'Verhütung & Beratung',
    kurz: 'Was zu Ihnen passt, hängt von Ihrem Leben ab — nicht von einer Tabelle.',
    details: [
      'Pille, Spirale (Kupfer und Hormon), Implantat, Ring, natürliche Verfahren — Wirkung, Nebenwirkungen und Kosten im Vergleich.',
      'Spiraleneinlage in der Praxis, etwa 20 Minuten, auf Wunsch mit örtlicher Betäubung.',
      'Kinderwunsch: Zyklusdiagnostik und die Frage, ab wann eine weiterführende Abklärung sinnvoll ist.',
    ],
    gewicht: 'mittel',
    zeichen: 'auswahl',
  },
  {
    titel: 'Impfungen',
    kurz: 'Nach den Empfehlungen der Ständigen Impfkommission.',
    details: [
      'HPV-Impfung für Mädchen und Frauen, Kassenleistung bis zum 18. Geburtstag.',
      'Röteln, Windpocken und Keuchhusten vor einer geplanten Schwangerschaft.',
      'Impfstatus-Kontrolle anhand des Impfpasses, im laufenden Termin.',
    ],
    gewicht: 'schmal',
    zeichen: 'folge',
  },
  {
    titel: 'Wechseljahre',
    kurz: 'Beschwerden einordnen, Behandlung abwägen, Entscheidung bei Ihnen.',
    details: [
      'Hormonstatus und Einordnung der Beschwerden — was zur Umstellung gehört und was abgeklärt werden sollte.',
      'Hormontherapie: Nutzen und Risiken nach aktueller Leitlinie, auch die Gründe dagegen.',
      'Knochendichte und Herz-Kreislauf-Risiko als Teil derselben Beratung, nicht als Zusatztermin.',
    ],
    gewicht: 'schmal',
    zeichen: 'uebergang',
  },
];

/** TODO Kunde — Werdegang, Jahreszahlen und Häuser bestätigen. */
export const werdegang: readonly WerdegangEintrag[] = [
  { zeit: '[2008–2014]', was: 'Studium der Humanmedizin', wo: '[Universität]' },
  { zeit: '[2015–2020]', was: 'Facharztweiterbildung Frauenheilkunde und Geburtshilfe', wo: '[Klinik]' },
  { zeit: '[2020]', was: 'Anerkennung als Fachärztin', wo: '[Ärztekammer]' },
  { zeit: '[2020–2025]', was: 'Oberärztin, Schwerpunkt Ultraschalldiagnostik', wo: '[Klinik]' },
  { zeit: '[2026]', was: 'Eröffnung der eigenen Praxis', wo: '[Ort]' },
];

/** Die fünf Stationen des Showpiece. Jede Zeitangabe ist eine überprüfbare Zusage. */
export const besuch: readonly Station[] = [
  {
    nummer: '01',
    name: 'Ankommen',
    dauer: 'etwa 2 Minuten',
    satz: 'Sie klingeln, ich mache selbst auf. Es gibt keinen Wartesaal voller Menschen.',
    bild: 'station-01-ankommen',
    alt: 'Flur der Praxis mit hohem Fenster und offener Tür zum Sprechzimmer, heller Eichenboden.',
  },
  {
    nummer: '02',
    name: 'Anmeldung',
    dauer: 'etwa 3 Minuten',
    satz: 'Karte, Geburtsdatum, ein kurzer Bogen. Mehr wird an der Anmeldung nicht besprochen.',
    bild: 'station-02-anmeldung',
    alt: 'Anmeldetresen aus heller Eiche mit Milchglas-Sichtschutz und einem einzelnen Ordner.',
  },
  {
    nummer: '03',
    name: 'Warten',
    dauer: 'etwa 5 Minuten',
    satz: 'Ich plane 20 Minuten pro Termin. Wenn es länger dauert, sage ich Ihnen warum.',
    bild: 'station-03-warten',
    alt: 'Drei Leinenstühle an einer Fensterwand, daneben eine Ablage mit Zeitschriften.',
  },
  {
    nummer: '04',
    name: 'Sprechen',
    dauer: 'etwa 10 Minuten',
    satz: 'Wir reden zuerst. Sie bleiben angezogen. Erst danach entscheiden wir, ob untersucht wird.',
    bild: 'station-04-sprechen',
    alt: 'Zwei Leinensessel an einem niedrigen Tisch mit Wasserglas und Notizblock vor einem Bücherregal.',
  },
  {
    nummer: '05',
    name: 'Untersuchen',
    dauer: 'etwa 5 Minuten',
    satz: 'Ich sage jeden Schritt an, bevor ich ihn mache. Sie können jederzeit stoppen.',
    bild: 'station-05-untersuchen',
    alt: 'Untersuchungsliege mit frischem Tuch, halb zugezogener Paravent, Ultraschallgerät am Bildrand.',
  },
];

/** TODO Kunde — Angaben für Impressum und Datenschutz. Nichts hiervon erfinden. */
export const rechtliches = {
  berufsbezeichnung: 'Ärztin / Fachärztin für Frauenheilkunde und Geburtshilfe',
  verleihenderStaat: 'Bundesrepublik Deutschland',
  aerztekammer: '[Zuständige Ärztekammer]',
  aerztekammerUrl: '[URL der Ärztekammer]',
  kassenaerztlicheVereinigung: '[Zuständige Kassenärztliche Vereinigung]',
  kassenaerztlicheVereinigungUrl: '[URL der KV]',
  berufsordnungUrl: '[URL der Berufsordnung]',
  aufsichtsbehoerde: '[Zuständige Aufsichtsbehörde]',
  umsatzsteuerId: '[Umsatzsteuer-Identifikationsnummer oder: nicht vorhanden]',
  datenschutzbeauftragter: '[Name und Kontakt, falls bestellt — sonst: nicht bestellt]',
  hostingAnbieter: '[Hosting-Anbieter, Sitz, Auftragsverarbeitungsvertrag]',
  berufshaftpflicht: '[Versicherer, Anschrift]',
  berufshaftpflichtGeltung: '[Räumlicher Geltungsbereich der Versicherung]',
  datenschutzAufsicht: '[Zuständige Datenschutzaufsichtsbehörde des Landes]',
  speicherdauerRueckruf: '[Zahl] Tage nach erledigtem Rückruf',
} as const;

/** Notrufe. Feste Nummern, keine Kundendaten — stehen hier, damit sie nirgends doppelt liegen. */
export const notfall = {
  aerztlicherBereitschaftsdienst: { anzeige: '116 117', href: 'tel:116117' },
  rettungsdienst: { anzeige: '112', href: 'tel:112' },
  hilfetelefon: { anzeige: '116 016', href: 'tel:116016', titel: 'Hilfetelefon Gewalt gegen Frauen' },
} as const;
