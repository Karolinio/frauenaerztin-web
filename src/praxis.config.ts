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
 * Solange er `true` ist, zeigt die Seite ERFUNDENE Werte — Anschrift,
 * Telefonnummer, Sprechzeiten, Kammer. Sie stehen hier, damit die Gestaltung an
 * einer gefüllten Seite beurteilt werden kann und nicht an einem Lückenraster.
 *
 * ═══ Was NICHT mehr erfunden ist (Stand 20.08.2026) ═══
 *
 * Praxisname, Logo, Titel und Name der Ärztin sowie der Eröffnungstag stehen
 * ohne `demo()` da — sie sind bestätigt: das Logo kam von ihr und trägt den
 * Namen, den Eröffnungstag hat sie genannt (1. November). Diese Werte
 * überstehen `DEMO = false` und müssen es auch.
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
export const DEMO = false;

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
  name: 'Frauenarztpraxis Dr. med. Yvonne Erkens',

  /**
   * Ihr Logo, sobald es fertig ist: „ist hoffentlich bald fertig, würde ich dir
   * zukommen lassen, sobald es final steht."
   *
   * Wird es hier gesetzt, rendert `Marke.tsx` ein `<img>` statt der Wortmarke.
   * Kopfzeile, Hero, Fusszeile und Rechtsseiten folgen von selbst — das ist der
   * ganze Grund, warum die Marke eine eigene Komponente ist.
   */
  /*
   * Seit 13.09.2026 die Figur allein, im Blob ihres Schilds — bilder/marke.svg.
   * Ihr Wunsch vom 11.09.: „nur das Bild oben einfuegen ohne den Rest". Das
   * alte logo.webp trug noch „FRAUENARZTPRAXIS" als Zeile, ihr Schild sagt
   * inzwischen „Fachaerztin fuer Frauenheilkunde & Geburtshilfe" — der
   * Schriftzug im Bild waere damit falsch gewesen. Der Name steht ohnehin im
   * Hero, im Team und im Impressum; die Marke traegt ihn als Bildbeschreibung.
   */
  logo: {
    src: '/bilder/marke.svg',
    /* Die Bildbeschreibung beschreibt, was zu SEHEN ist — nicht, dass es ein
       Logo ist. Wer die Seite vorgelesen bekommt, braucht den Namen der Praxis
       an dieser Stelle, nicht das Wort „Logo". */
    alt: 'Frauenarztpraxis Dr. med. Yvonne Erkens',
    breite: 620,
    hoehe: 560,
  } as Offen<{
    readonly src: string;
    readonly alt: string;
    readonly breite: number;
    readonly hoehe: number;
  }>,

  aerztin: {
    /** „Dr. med." oder nichts. Ein Doktortitel, den jemand nicht hat, ist strafbar. */
    titel: 'Dr. med.',
    vorname: 'Yvonne',
    nachname: 'Erkens',
    /** Die geschützte Berufsbezeichnung. Muss mit der Kammerurkunde übereinstimmen. */
    /*
     * Woertlich, wie sie es am 05.09.2026 unter „Impressum:" geschrieben hat.
     *
     * ⚠ Ihr eigener Flyer sagt „FACHAERZTIN FUER GYNAEKOLOGIE UND
     * GEBURTSHILFE" — eine andere Formulierung. Auf einer Pflichtseite muss
     * die Bezeichnung mit der Kammerurkunde uebereinstimmen; die gefuehrte
     * Weiterbildungsbezeichnung in NRW lautet „Frauenheilkunde und
     * Geburtshilfe". Ihre Impressum-Angabe gilt hier, weil sie sie dafuer
     * geschickt hat — sie sollte sie aber einmal gegen die Urkunde pruefen.
     */
    /*
     * Berichtigt am 13.09.2026 nach ihrem Praxisschild (Schild Eingangsbereich
     * 40x30 FINAL.pdf): „Fachärztin für Frauenheilkunde & Geburtshilfe". Das
     * ist die gefuehrte Weiterbildungsbezeichnung in Nordrhein. Ihr Ueber-mich
     * sagt „Gynaekologie" — Umgangssprache, im Fliesstext in Ordnung; ihre
     * Impressum-Nachricht liess „Geburtshilfe" weg. Das Schild ist das
     * offiziellste Dokument, das sie selbst hat drucken lassen. Trotzdem: einmal
     * gegen die Urkunde bestaetigen lassen.
     */
    fachbezeichnung: 'Fachärztin für Frauenheilkunde und Geburtshilfe',
  },

  /**
   * Ihr Foto im Hero — das einzige Bild dieser Seite, das echt sein MUSS.
   *
   * Es wird nicht erzeugt, auch nicht als Symbolbild einer Ärztin. Solange es
   * fehlt, hält eine Materialstudie exakt dessen Platz, und darauf steht
   * sichtbar „Foto folgt". Beides verschwindet, sobald hier ein Wert steht — es
   * gibt keinen zweiten Handgriff, den jemand vergessen könnte.
   *
   * ═══ Welches Foto hier hingehört ═══
   *
   * Seit dem 30.08.2026 ist der Platz QUER (16:7 am Rechner, 4:3 am Handy) und
   * nicht mehr hochkant. Gebraucht wird also Yvonne IN ihrer Praxis, quer
   * aufgenommen, der Raum darf mit aufs Bild — nicht ein Studioporträt vor
   * neutralem Grund. Ein Hochformat funktioniert trotzdem: der Ausschnitt lässt
   * sich über `fokus` in `lib/bildplaetze.ts` auf das Gesicht ziehen.
   *
   * Der Platz und seine Masse stehen in `lib/bildplaetze.ts` (`HERO_PLATZ`).
   * Diese Zeile hier ist nur die Datei — sie steht in der Konfiguration, weil
   * `vite.config.ts` sie fürs Vorladen braucht.
   */
  portraet: null as Offen<{ readonly src: string; readonly alt: string }>,

  /** Der Ort steht fest — er ist der Grund, warum es die Seite gibt. */
  ort: 'Erkelenz',

  /** Der Eröffnungstag. Bis er feststeht, wird er nirgends behauptet. */
  eroeffnung: '1. November 2026',

  adresse: {
    /* Von ihr am 05.09.2026 fuer das Impressum geschickt: „Theodor-Heuss-Str.
       15, 41812 Erkelenz". Hier ausgeschrieben — auf einer Pflichtseite steht
       die Strasse nicht abgekuerzt. */
    strasse: 'Theodor-Heuss-Straße 15',
    plz: '41812',
    ort: 'Erkelenz',
  },

  telefon: {
    /** Wie die Nummer dasteht, z. B. „02431 · 12 34 56". */
    anzeige: '02431 · 70668',
    /** Dieselbe Nummer wählbar, z. B. „tel:+492431123456". */
    href: 'tel:+49243170668',
  },

  /** Telefonzeiten stehen bewusst getrennt von den Sprechzeiten — sie sind es. */
  /*
   * ACHTUNG, das ist eine UEBERGANGSREGEL und kein Dauerzustand.
   *
   * Ihre Worte vom 05.09.2026: „Wegen Umbauarbeiten ist die Terminvergabe
   * telefonisch mittwochs von 09:30-11:00 Uhr unter 02431 70668 moeglich."
   *
   * Sie gilt BIS zur Eroeffnung. Bleibt diese Zeile nach dem 01.11.2026 stehen,
   * steht auf der Seite eine Erreichbarkeit von 90 Minuten pro Woche fuer eine
   * laufende Praxis — das ist schlimmer als keine Angabe. Beim Umstellen auf
   * den Regelbetrieb gehoert das hier als Erstes geaendert.
   */
  telefonzeiten: 'bis zur Praxiseröffnung mittwochs von 09:30 bis 11:00 Uhr',

  email: demo('praxis@frauenheilkunde-erkelenz.de'),

  /* Sie hat „Fax" in ihre Fussliste geschrieben (11.09.2026), die Nummer aber
     nicht genannt. Solange null: Luecke im Fuss, nicht weglassen — sie will
     sie dort. */
  fax: null as Offen<string>,

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

/**
 * Ihr vollständiger Name, wie er auf die Pflichtseiten gehört.
 *
 * ═══ Warum das eine eigene Stelle bekommt ═══
 *
 * Weil Impressum und Datenschutzerklärung ihn bis zum 27.08.2026 beide selbst
 * zusammengesetzt haben — und beide dabei den VORNAMEN weggelassen haben. Auf
 * beiden Seiten stand „Dr. med. Erkens".
 *
 * § 5 DDG verlangt den Namen des Anbieters, und bei einer natürlichen Person ist
 * das der volle Name, nicht der Nachname mit Titel. Auf der Datenschutzseite
 * benennt dieselbe Angabe die Verantwortliche im Sinne der DSGVO — dort ist eine
 * unvollständige Person noch schlechter.
 *
 * Zwei Stellen, die denselben Namen zusammensetzen, sind zwei Stellen, an denen
 * er falsch sein kann. Jetzt ist es eine.
 *
 * `null`, sobald ein Teil fehlt: ein halber Name auf einer Pflichtseite ist
 * keine Angabe, sondern eine Lücke — und wird auch so gezeigt.
 */
export const aerztinVollerName: Offen<string> = (() => {
  const teile = [praxis.aerztin.titel, praxis.aerztin.vorname, praxis.aerztin.nachname];
  if (teile.some((t) => t === null || t === undefined)) return null;
  return teile.join(' ');
})();

/* ══ Leistungen ═══════════════════════════════════════════════════════════
 *
 * Ihre Worte, ihre Reihenfolge, keine dazuerfunden:
 * Schwangerschaft · Krebsvorsorge · Verhütung · Kinderwunschberatung ·
 * Mädelssprechstunde. Impfungen und Botox stehen darunter als „weitere".
 *
 * „Mädelssprechstunde" bleibt exakt so stehen. Es ist ihr Wort.
 *
 * ═══ Korrektur vom 18.08.2026 ═══
 *
 * Hier stand, es sei „der einzige Begriff, den keine andere Praxis in Erkelenz
 * benutzt". Das ist widerlegt: frauenarztpraxis-erkelenz.de (Antje Hagen, rund
 * drei Kilometer entfernt) führt eine „Mädchen-Sprechstunde" in ihrer
 * Leistungsliste.
 *
 * Der Begriff bleibt trotzdem — er ist ihr Wort, er ist wärmer, und er ist
 * richtig. Was NICHT bleibt, ist die Rolle, die ihm die Direktion zugedacht
 * hatte: er trägt die Unterscheidung dieser Seite nicht allein. Wer eine Seite
 * auf ein Alleinstellungsmerkmal stellt, das der Nachbar auch hat, hat keine
 * Unterscheidung, sondern eine Behauptung.
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
  /**
   * Ihr ganzer Text, Absatz fuer Absatz — hinter einem Aufklapper.
   *
   * Ihre Vorgabe vom 11.09.2026: „wenn man auf die einzelne Leistung klickt der
   * ausfuehrlichere Text." Die Liste bleibt kurz (`absatz` ist ihr erster
   * Absatz), der Rest kommt beim Klick. Ein Eintrag, der mit `# ` beginnt, ist
   * eine Zwischenueberschrift — die Krebsvorsorge hat drei davon.
   *
   * Woertlich ihre Worte. Nichts umformuliert, nichts gekuerzt.
   */
  readonly lang: readonly string[];
}

/*
 * ═══ Ihre Texte, 11.09.2026 ═══
 *
 * Neun Leistungen, in IHRER Reihenfolge („chronologisch die Texte"), mit IHREN
 * Titeln und IHREN Worten. Die Absaetze, die hier vorher standen, hatte der
 * Bau geschrieben — als Platzhalter, bis sie liefert. Sie hat geliefert.
 *
 * `kurz` ist ihr erster Satz, `absatz` ihr erster Absatz, `lang` alles.
 * „Aesthetische Medizin" ist auf ihren Wunsch raus („erstmal rausnehmen"),
 * Impfungen sind auf ihren Wunsch von „weitere" in die Hauptliste gerueckt.
 */
export const leistungen: readonly Leistung[] = [
  {
    id: 'vorsorge',
    titel: 'Krebsvorsorge',
    kurz: 'Regelmäßige Vorsorgeuntersuchungen sind ein wichtiger Bestandteil der Frauengesundheit.',
    absatz: 'Regelmäßige Vorsorgeuntersuchungen sind ein wichtiger Bestandteil der Frauengesundheit. Sie dienen dazu, Veränderungen frühzeitig zu erkennen und bei Auffälligkeiten weitere Untersuchungen einzuleiten.',
    lang: [
      'Regelmäßige Vorsorgeuntersuchungen sind ein wichtiger Bestandteil der Frauengesundheit. Sie dienen dazu, Veränderungen frühzeitig zu erkennen und bei Auffälligkeiten weitere Untersuchungen einzuleiten.',
      'Ab 20 Jahren haben Frauen einmal jährlich Anspruch auf eine gynäkologische Krebsfrüherkennungsuntersuchung. Dazu gehören ein Gespräch über mögliche Beschwerden und Veränderungen sowie die Untersuchung der äußeren und inneren Geschlechtsorgane. Zwischen dem 20. und 34. Lebensjahr wird zusätzlich jährlich ein Abstrich vom Gebärmutterhals zur Untersuchung auf Zellveränderungen (Pap-Abstrich) durchgeführt.',
      'Ab 30 Jahren gehört zusätzlich die jährliche Untersuchung der Brust und der Achselhöhlen zur gesetzlichen Krebsfrüherkennung. Dabei werden Brustdrüsen und Lymphknoten abgetastet.',
      'Ab 35 Jahren erfolgt zur Früherkennung von Gebärmutterhalskrebs alle drei Jahre eine Kombination aus Pap-Abstrich und HPV-Test. Die klinische gynäkologische Vorsorgeuntersuchung kann weiterhin jährlich wahrgenommen werden.',
      '# Ergänzende Vorsorgeleistungen',
      'Über die gesetzlich vorgesehenen Untersuchungen hinaus können auf Wunsch ergänzende Untersuchungen durchgeführt werden.',
      '# Vaginalultraschall',
      'Mittels Ultraschall können Gebärmutter, Gebärmutterschleimhaut und Eierstöcke dargestellt und beurteilt werden.',
      '# Brustultraschall',
      'Die Ultraschalluntersuchung ermöglicht eine ergänzende Beurteilung des Brustdrüsengewebes und kann insbesondere bei dichtem Brustgewebe zusätzliche Informationen liefern.',
      'Diese Untersuchungen gehören ohne medizinische Indikation nicht zur gesetzlichen Krebsfrüherkennung und werden als individuelle Gesundheitsleistungen (IGeL) angeboten. Ob eine ergänzende Untersuchung für Sie infrage kommt, besprechen wir gerne individuell.',
      'Bestehen Beschwerden oder ergibt sich ein konkreter medizinischer Verdacht, werden notwendige weiterführende Untersuchungen selbstverständlich unabhängig davon durchgeführt.',
    ],
  },
  {
    id: 'maedelssprechstunde',
    titel: 'Mädchensprechstunde',
    kurz: 'Der erste Besuch bei der Frauenärztin ist für viele Mädchen und junge Frauen mit Fragen und manchmal auch mit Unsicherheit verbunden.',
    absatz: 'Der erste Besuch bei der Frauenärztin ist für viele Mädchen und junge Frauen mit Fragen und manchmal auch mit Unsicherheit verbunden. In der Mädchensprechstunde ist deshalb zunächst vor allem eines wichtig: in Ruhe ankommen, kennenlernen und Fragen stellen.',
    lang: [
      'Der erste Besuch bei der Frauenärztin ist für viele Mädchen und junge Frauen mit Fragen und manchmal auch mit Unsicherheit verbunden. In der Mädchensprechstunde ist deshalb zunächst vor allem eines wichtig: in Ruhe ankommen, kennenlernen und Fragen stellen.',
      'Dabei können wir über alle Themen sprechen, die gerade wichtig sind – zum Beispiel die erste Periode, Menstruationsbeschwerden, Verhütung, Sexualität, HPV-Impfung oder andere Fragen rund um den eigenen Körper.',
      'Eine gynäkologische Untersuchung ist beim ersten Besuch nicht automatisch notwendig. Ob und welche Untersuchung sinnvoll ist, richtet sich nach dem jeweiligen Anliegen und wird vorher gemeinsam besprochen.',
      'Natürlich darf zum ersten Termin gerne eine Vertrauensperson mitgebracht werden.',
    ],
  },
  {
    id: 'verhuetung',
    titel: 'Verhütung & Familienplanung',
    kurz: 'Die passende Verhütung ist eine sehr persönliche Entscheidung und kann sich im Laufe des Lebens verändern.',
    absatz: 'Die passende Verhütung ist eine sehr persönliche Entscheidung und kann sich im Laufe des Lebens verändern. Gemeinsam besprechen wir, welche Methode zu Ihrer aktuellen Lebenssituation, Ihren Wünschen und möglichen gesundheitlichen Voraussetzungen passt.',
    lang: [
      'Die passende Verhütung ist eine sehr persönliche Entscheidung und kann sich im Laufe des Lebens verändern. Gemeinsam besprechen wir, welche Methode zu Ihrer aktuellen Lebenssituation, Ihren Wünschen und möglichen gesundheitlichen Voraussetzungen passt.',
      'Ich berate Sie zu hormonellen und hormonfreien Verhütungsmethoden – von Pille, Vaginalring und Verhütungspflaster über Spirale und Hormonspirale bis hin zu weiteren Möglichkeiten der Empfängnisverhütung.',
      'Auch wenn sich Ihre Familienplanung verändert, Sie eine Verhütungsmethode wechseln oder absetzen möchten oder Fragen zu möglichen Nebenwirkungen haben, berate ich Sie gerne individuell.',
    ],
  },
  {
    id: 'kinderwunsch',
    titel: 'Kinderwunsch',
    kurz: 'Ein Kinderwunsch kann mit vielen Fragen verbunden sein.',
    absatz: 'Ein Kinderwunsch ist häufig mit vielen Fragen verbunden. Gerne begleite ich Sie bereits bei der Planung einer Schwangerschaft und berate Sie zu wichtigen Themen wie Zyklus, Folsäure, Impfstatus und einer gesunden Vorbereitung auf die Schwangerschaft.',
    lang: [
      'Ein Kinderwunsch ist häufig mit vielen Fragen verbunden. Gerne begleite ich Sie bereits bei der Planung einer Schwangerschaft und berate Sie zu wichtigen Themen wie Zyklus, Folsäure, Impfstatus und einer gesunden Vorbereitung auf die Schwangerschaft.',
      'Wenn eine Schwangerschaft auf sich warten lässt, können erste Untersuchungen zur Abklärung möglicher Ursachen in meiner Praxis erfolgen. Dazu gehören je nach individueller Situation beispielsweise eine Ultraschalluntersuchung, Zyklusdiagnostik und Hormonbestimmungen.',
      'Sollte eine weiterführende Diagnostik oder Behandlung erforderlich sein, besprechen wir gemeinsam die nächsten Schritte und gegebenenfalls die Vorstellung in einem spezialisierten Kinderwunschzentrum.',
    ],
  },
  {
    id: 'schwangerschaft',
    titel: 'Schwangerschaft',
    kurz: 'Eine Schwangerschaft ist eine besondere Zeit – mit vielen schönen Momenten, aber auch neuen Fragen.',
    absatz: 'Eine Schwangerschaft bringt viele besondere Momente, aber auch neue Fragen und manchmal Unsicherheiten mit sich. Mir ist es wichtig, Sie in dieser Zeit verlässlich zu begleiten und Ihnen bei medizinischen Fragen und Entscheidungen zur Seite zu stehen.',
    lang: [
      'Eine Schwangerschaft bringt viele besondere Momente, aber auch neue Fragen und manchmal Unsicherheiten mit sich. Mir ist es wichtig, Sie in dieser Zeit verlässlich zu begleiten und Ihnen bei medizinischen Fragen und Entscheidungen zur Seite zu stehen.',
      'In meiner Praxis biete ich Ihnen die Schwangerschaftsvorsorge nach den Mutterschafts-Richtlinien mit den vorgesehenen Untersuchungen, Ultraschallkontrollen und Laboruntersuchungen an.',
      'Darüber hinaus berate ich Sie zu allen Fragen rund um die Schwangerschaft – beispielsweise zu Ernährung, Bewegung, Impfungen, Beschwerden oder Medikamenteneinnahme.',
      'Ergänzend können auf Wunsch zusätzliche Ultraschalluntersuchungen sowie weitere individuelle Leistungen angeboten werden.',
    ],
  },
  {
    id: 'wechseljahre',
    titel: 'Wechseljahre',
    kurz: 'Die Wechseljahre sind eine natürliche Lebensphase und werden von jeder Frau unterschiedlich erlebt.',
    absatz: 'Die Wechseljahre sind eine natürliche Lebensphase und werden von jeder Frau unterschiedlich erlebt. Während manche Frauen kaum Veränderungen bemerken, können Beschwerden wie Hitzewallungen, Schlafstörungen, Stimmungsschwankungen, Scheidentrockenheit oder Veränderungen der Sexualität die Lebensqualität beeinträchtigen.',
    lang: [
      'Die Wechseljahre sind eine natürliche Lebensphase und werden von jeder Frau unterschiedlich erlebt. Während manche Frauen kaum Veränderungen bemerken, können Beschwerden wie Hitzewallungen, Schlafstörungen, Stimmungsschwankungen, Scheidentrockenheit oder Veränderungen der Sexualität die Lebensqualität beeinträchtigen.',
      'Gemeinsam besprechen wir Ihre Beschwerden und Wünsche und entscheiden, ob und welche Behandlung für Sie sinnvoll ist. Dabei berate ich Sie zu hormonellen und nicht hormonellen Behandlungsmöglichkeiten und berücksichtige Ihre persönlichen Voraussetzungen und möglichen Risikofaktoren.',
      'Wenn eine Hormontherapie infrage kommt, wählen wir gemeinsam eine individuell passende Therapieform und begleiten diese im weiteren Verlauf.',
    ],
  },
  {
    id: 'nachsorge',
    titel: 'Onkologische Nachsorge',
    kurz: 'Auch nach Abschluss einer Krebsbehandlung begleite ich Sie mit regelmäßigen Nachsorgen weiter.',
    absatz: 'Nach der Behandlung einer gynäkologischen Krebserkrankung sind regelmäßige Nachsorgeuntersuchungen ein wichtiger Bestandteil der weiteren Betreuung.',
    lang: [
      'Nach der Behandlung einer gynäkologischen Krebserkrankung sind regelmäßige Nachsorgeuntersuchungen ein wichtiger Bestandteil der weiteren Betreuung.',
      'In meiner Praxis begleite ich Sie im Rahmen der onkologischen Nachsorge nach einer Brustkrebserkrankung sowie nach Krebserkrankungen der weiblichen Geschlechtsorgane. Die Untersuchungen richten sich nach Ihrer vorausgegangenen Erkrankung, der durchgeführten Therapie und den entsprechenden Nachsorgeempfehlungen.',
      'Neben der körperlichen und gynäkologischen Untersuchung besprechen wir aktuelle Beschwerden, mögliche Folgen der Therapie und Ihre weitere Behandlung. Bei Bedarf koordiniere ich zusätzliche Untersuchungen und die Zusammenarbeit mit den weiterbehandelnden Fachdisziplinen.',
    ],
  },
  {
    id: 'beckenboden',
    titel: 'Blasenschwäche & Senkungsbeschwerden',
    kurz: 'Blasenschwäche und Senkungsbeschwerden sind häufig und können die Lebensqualität deutlich beeinträchtigen.',
    absatz: 'Blasenschwäche und Senkungsbeschwerden sind häufig – dennoch fällt es vielen Frauen schwer, darüber zu sprechen. Beschwerden können in unterschiedlichen Lebensphasen auftreten, beispielsweise nach Schwangerschaft und Geburt oder mit zunehmendem Alter.',
    lang: [
      'Blasenschwäche und Senkungsbeschwerden sind häufig – dennoch fällt es vielen Frauen schwer, darüber zu sprechen. Beschwerden können in unterschiedlichen Lebensphasen auftreten, beispielsweise nach Schwangerschaft und Geburt oder mit zunehmendem Alter.',
      'In meiner Praxis können wir mögliche Ursachen abklären und gemeinsam besprechen, welche Behandlungsmöglichkeiten für Sie infrage kommen. Je nach Befund reichen diese von Beckenbodentraining und weiteren konservativen Maßnahmen bis hin zu medikamentösen oder operativen Behandlungsmöglichkeiten.',
      'Sollte eine weiterführende Diagnostik oder Behandlung notwendig sein, erfolgt die Überweisung an eine entsprechend spezialisierte Praxis oder Klinik.',
    ],
  },
  {
    id: 'impfungen',
    titel: 'Impfungen',
    kurz: 'Ein vollständiger Impfschutz ist in jeder Lebensphase ein wichtiger Bestandteil der Gesundheitsvorsorge.',
    absatz: 'Ein vollständiger Impfschutz ist in jeder Lebensphase ein wichtiger Bestandteil der Gesundheitsvorsorge. In meiner Praxis überprüfe ich gerne Ihren Impfstatus und berate Sie zu empfohlenen Impfungen und notwendigen Auffrischungen.',
    lang: [
      'Ein vollständiger Impfschutz ist in jeder Lebensphase ein wichtiger Bestandteil der Gesundheitsvorsorge. In meiner Praxis überprüfe ich gerne Ihren Impfstatus und berate Sie zu empfohlenen Impfungen und notwendigen Auffrischungen.',
      'Ein besonderer Schwerpunkt liegt auf der HPV-Impfung zur Vorbeugung HPV-bedingter Erkrankungen sowie auf Impfungen bei Kinderwunsch und in der Schwangerschaft.',
      'Bringen Sie zu Ihrem Termin gerne Ihren Impfausweis mit. Gemeinsam können wir prüfen, ob Ihr Impfschutz vollständig ist und welche Impfungen für Sie aktuell empfohlen werden.',
    ],
  }
];

/**
 * „Weitere Leistungen" — was in ihrer Übersicht vom 23.08.2026 NICHT auftaucht.
 *
 * Impfungen standen in ihrer ersten Aufzählung („dazu als weitere: Impfungen und
 * kleine ästhetische Botoxbehandlungen"), in der neuen Übersicht mit neun
 * Kacheln aber nicht mehr. Das kann Absicht sein oder ein Vergessen — beides ist
 * möglich, und keins davon darf hier geraten werden.
 *
 * Deshalb bleibt der Eintrag stehen, bis sie es sagt. Etwas wegzunehmen, das sie
 * einmal genannt hat, ist der teurere Fehler: eine Leistung, die sie anbietet
 * und die auf ihrer Seite fehlt, merkt niemand — ausser der Patientin, die
 * deswegen woanders anruft.
 */
/* Seit dem 11.09.2026 leer: Impfungen stehen auf ihren Wunsch in der Hauptliste
   („Aesthetische Medizin ... durch Impfungen ersetzen"). Der Export bleibt, weil
   zwei Seiten ihn lesen und eine leere Liste dort nichts rendert. */
export const weitereLeistungen: readonly Leistung[] = [];

/* ══ Der erste Besuch ═════════════════════════════════════════════════════
 * Allgemeine Angaben, keine Zusage über diese Praxis. */

export interface Mitbringen {
  readonly was: string;
  readonly warum: string;
}

export const mitbringen: readonly Mitbringen[] = [
  /* Ihre vier Punkte, 14.09.2026 — wortgleich. */
  {
    was: 'Ihre Versichertenkarte',
    warum: 'Bitte bringen Sie Ihre aktuelle elektronische Versichertenkarte mit.',
  },
  {
    was: 'Ihren Mutterpass',
    warum: 'Wenn Sie schwanger sind, bringen Sie bitte zu jedem Termin Ihren Mutterpass mit.',
  },
  {
    was: 'Ihren Impfpass',
    warum: 'Gerne überprüfen wir bei Ihrem Besuch auch Ihren aktuellen Impfstatus.',
  },
  {
    was: 'Ihre Vorbefunde und Arztbriefe',
    warum:
      'Falls vorhanden, bringen Sie gerne relevante Arztbriefe oder Befunde mit. So können wir Ihre bisherige Behandlung bestmöglich berücksichtigen.',
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
