# Build-Prompt — Frauenärztliche Einzelpraxis (Name offen)

**Modell:** Opus 5, effort **high**. Kein Sonnet.
**Session:** frisch und schlank. Kein Brain, keine Roadmap, keine fremden Kundenordner.
**Repo:** dieses Repo (`~/dev/frauenaerztin-web`). **Nicht** in der Factory bauen.
**Kopf:** `~/dev/website-factory/engine/prompts/_method.md` gilt unverändert
und vollständig. Vor dem ersten Bauschritt lesen.
**Werkstatt-Akte:** `~/dev/website-factory/clients/frauenaerztin/`

---

## SLOT 1 — Brand + One-Liner

```
Marke:      Dr. med. [NACHNAME] — Frauenärztin
            ⚠️ PLATZHALTER. Praxisname und Logo sind beim Kunden noch offen.
            Sämtliche Namens-, Adress- und Zeitangaben liegen in EINER Datei:
            src/praxis.config.ts. Nirgends sonst hartkodiert. Tausch = eine Datei.

One-Liner:  Eine Frauenarztpraxis, in der Sie vorher wissen, was passiert.
```

Der One-Liner ist das Versprechen der ganzen Seite und die Begründung für das
Showpiece. Er ist bewusst kein Qualitätsanspruch (HWG), sondern eine
**Verfahrensaussage** — überprüfbar, nicht werblich.

---

## SLOT 2 — Ton / Palette / Typo + verbotene Klischees

```
Haltung
  Ruhig, erwachsen, sachlich-warm. Die Seite soll wirken wie ein aufgeräumter
  Altbauraum am Vormittag, nicht wie eine Klinikbroschüre und nicht wie ein
  Wellness-Spa. Erkennbar an: viel Weißraum, große ruhige Bilder, kurze Absätze,
  genau eine Farbe, die etwas bedeutet.

  RHYTHMUS — Pflicht: helle, ruhige Textsektionen (Papier) und dunkle, immersive
  Bildsektionen (Teal) wechseln sich ab. Nie zwei dunkle hintereinander.
  Das Auge braucht Pausen; die Seite ist textlastig.

Palette (OKLCH, als CSS Custom Properties in src/styles/tokens.css)
  --paper       oklch(97.5% 0.008 85)   warmes Off-White — Grundfläche heller Sektionen
  --paper-deep  oklch(93.5% 0.012 85)   zweite Fläche, Karten auf Papier
  --ink         oklch(24% 0.020 200)    Text. Nahezu schwarz mit kaltem Stich,
                                        damit es gegen das warme Papier steht.
  --ink-soft    oklch(48% 0.015 200)    Fließtext-Sekundär, Meta, Zeiten
  --teal-deep   oklch(32% 0.050 195)    Grund der dunklen Sektionen
  --teal        oklch(58% 0.070 190)    Glas-Tint, Glow hinter Glasflächen
  --clay        oklch(66% 0.120 45)     ⭐ DER Akzent
  --clay-ink    oklch(38% 0.090 45)     Clay auf hellem Grund (Kontrast AA)

  AKZENT-SEMANTIK — nicht verhandelbar:
  Clay markiert IMMER "der nächste Schritt". Erlaubt an genau vier Stellen:
    1. Termin-CTA (der einzige gefüllte Button der Seite)
    2. aktive Station im Showpiece
    3. aktiver Navigationspunkt
    4. Fokus-Ring (Tastaturbedienung)
  Clay als Dekoration — Hintergrundfläche, Trennlinie, Icon-Füllung, Hover-Spielerei —
  ist ein Grund, die Regel zu löschen. Wenn Clay überall ist, markiert es nichts.

Typo (beide SELBST GEHOSTET als woff2 in public/fonts/ — kein Google-CDN, DSGVO)
  Display:  Fraunces, variabel (opsz 9-144, wght 300-700, SOFT 0-100)
            Headings, Zahlen, Stationsnamen. opsz hoch bei großen Graden.
  Body:     Instrument Sans, 400/500/600
            Fließtext ab 18px/1.65, Meta 15px.
  Begründung der Paarung: Die Serif trägt "Mensch, kleine Praxis, jemand nimmt
  sich Zeit". Die Grotesk trägt Lesbarkeit für eine Zielgruppe von 16 bis 75.
  Umgekehrt herum wäre es eine Klinik.
  font-display: swap. Nur die zwei wirklich genutzten Schnitte preloaden.

Tiefe — Glassmorphism, aber mit Regel
  Glas ist NUR über dunklen Gründen und über Bildern erlaubt. Über flachem Papier
  ist eine Glasfläche eine Milchscheibe vor einer Wand und sieht nach 2021-Dribbble aus.

  Glas-Rezept:
    background: color-mix(in oklch, var(--paper) 12%, transparent);
    backdrop-filter: blur(24px) saturate(140%);
    border: 1px solid color-mix(in oklch, var(--paper) 28%, transparent);
    border-top-color: color-mix(in oklch, var(--paper) 55%, transparent);  /* Lichtkante oben */
    box-shadow: 0 1px 0 0 inset color-mix(in oklch, var(--paper) 30%, transparent),
                0 24px 60px -20px oklch(20% 0.03 200 / 0.45);
  Immer ein @supports-not-Fallback auf deckendes --teal-deep bei 92 % — sonst ist
  der Text auf Firefox-ohne-backdrop-filter unlesbar.
  Weitere Tiefe: Überlappung (Bild ragt in die nächste Sektion), weiche
  Doppelschatten, ein feines Grain-Overlay (SVG feTurbulence, 3 % Opazität,
  pointer-events:none) über den dunklen Sektionen.

VERBOTEN (visuell) — jedes einzelne davon ist in dieser Branche der Normalfall
  - Rosa, Flieder, Pastell, Magenta in JEDER Rolle
  - Aquarell-Blüten, Lotus, Mandala, Blätterranken, Schmetterlinge
  - Stilisierte Frauensilhouette / weiblicher Umriss als Logo oder Deko
  - Lächelnde Ärztin im Kittel mit verschränkten Armen vor weißer Wand
  - Schwangere im Gegenlicht auf einer Wiese, Hand am Bauch
  - Babyfüße in Erwachsenenhänden
  - Stethoskop, das zum Herz gebogen ist; medizinisches Kreuz; DNA-Helix
  - Ultraschallbild als Dekoration
  - Gradient-Blobs, schwebende Hexagone, Lens Flares, Partikel-Netze
  - Gleichmäßiges 3-Spalten-Card-Grid mit identischen Icons und identischer Höhe
  - Pill-Buttons überall; jeder Radius gleich; jeder Schatten gleich
  - Stock-Handshake, Team vor weißer Wand
```

---

## SLOT 3 ⭐ — Master-Asset

```
Master-Asset:
Die Sprechecke einer kleinen Frauenarztpraxis im Altbau an einem Vormittag —
zwei Leinensessel über heller Eiche, ein niedriger Tisch mit Wasserglas und
Notizblock, ein Wandregal mit medizinischen Fachbüchern, gedämpftes Salbeigrün
an der Wand, weiches Nordlicht aus einem hohen Sprossenfenster rechts außerhalb
des Bildes, Deckenlicht aus, keine Geräte, kein Mensch im Bild.
```

Das ist der Raum, in dem der One-Liner eingelöst wird: hier wird geredet, bevor
untersucht wird. Er ist bewusst **nicht** der Behandlungsraum — der ist das
angstbesetzte Motiv und kommt erst als Station 05 des Showpiece, abgeleitet.

**Kein Gesicht im Master.** Zwei Gründe: generierte Menschen auf einer Arztseite
sind ein Vertrauensbruch, und alles ohne Gesicht muss später nicht ausgetauscht
werden, wenn echte Fotos kommen.

**Falsifizierbare These + Abbruchkriterium** (gilt für JEDES Asset dieser Seite):

> Vormittag, 35 mm, einzige Lichtquelle ist ein hohes Sprossenfenster rechts
> außerhalb des Bildes, weiches Nordlicht, Deckenlicht aus, dokumentarisch
> beobachtet, kein Mensch im Bild.

Neu generieren, wenn: warmes Abendlicht · gelbes Kunstlicht · sichtbare
Deckenspots · glänzendes Klinik-Weiß · Pastellrosa irgendwo · Deko-Pflanzenwand ·
ein Mensch im Bild · Hochglanz-Werbeästhetik.

**Bildaufbau mit Textabsicht:** 3:2, Motiv in einer Bildhälfte, die andere Hälfte
ruhig — dort liegt später das Glaspanel. Komposition und Layout werden zusammen
entschieden, nicht nacheinander.

---

## SLOT 4 — Asset-Set + Modell + Budget

```
Bildmodell:   nano_banana_2, resolution 2k
Videomodell:  veo3_1_lite  (Veo 3.1 Lite — ausdrückliche Kundenvorgabe: kein Seedance)
              duration 4, generate_audio false, start_image = Master-Still
Budget:       ≤ 80 Credits HART. Zielkorridor 45-60.
              Jede Generierung vorher mit get_cost:true preflighten.
3D:           0 Credits — der Grundriss wird prozedural in Three.js gebaut,
              nicht generiert. Kein generate_3d, kein GLB-Download.

MASTER (text-to-image)
  M   Sprechecke, 3:2                                     ← Slot 3, bis zu 2 Retries

ABGELEITET aus M per image-to-image (medias role "image", value = job_id von M)
  A1  Anmeldung: Tresen aus heller Eiche, Milchglas-Sichtschutz, ein Ordner,
      kein Mensch. 3:2                                    Showpiece-Station 02
  A2  Wartebereich: drei Stühle an der Fensterwand, Zeitschriften-Ablage,
      Blick nach draußen überbelichtet. 3:2               Showpiece-Station 03
  A3  Behandlungsraum ruhig: Untersuchungsliege mit frischem Tuch von der Seite,
      Ultraschallgerät im Anschnitt am Bildrand, Paravent halb zugezogen.
      KEIN gynäkologischer Stuhl frontal. 3:2             Showpiece-Station 05
  A4  Flur mit Fenster und offener Tür zum Sprechzimmer. 3:2
                                                          Showpiece-Station 01
  A5  Detail: Wasserglas und Notizblock auf dem niedrigen Tisch, Nahaufnahme
      aber nicht Makro. 4:5                               "Über mich"
  A6  Detail: Paravent im Gegenlicht, Stoff, Falten, Licht durch den Spalt. 4:5
                                                          Diskretion / Sektionsübergang

VIDEO — genau EIN Clip, nur für den Hero
  V1  4 s, veo3_1_lite, start_image = M.
      Bewegung: nur das Licht. Ein Vorhang atmet minimal, ein Staubkorn im
      Lichtstrahl, sonst nichts. Keine Kamerafahrt, kein Zoom, kein Schnitt.
      Muss nahtlos loopen (Anfang ≈ Ende).
      Poster = M. Autoplay, muted, loop, playsinline.
      NIE mit Scroll scrubben. currentTime lesen ok, schreiben nie.

NICHT generieren
  - Keine Icons. Leistungs-Icons werden als handgezeichnete Inline-SVG gebaut
    (1.25px Strich, kein Fill, kein Icon-Set von der Stange).
  - Kein Logo. Bis der echte Name da ist: reine Wortmarke in Fraunces.
  - Keine Porträts, keine Menschen, in keinem Asset.
```

Tatsächlichen Verbrauch nach dem Generieren in `assets.md` gegenrechnen
(geplant vs. real, pro Asset).

---

## SLOT 5 — Sections + das EINE Showpiece

```
Sektionsreihenfolge
  1. Hero              — Wortmarke, One-Liner, ein Satz, Termin-CTA. Glaspanel
                         über V1. Öffnungszeiten-Zeile sofort sichtbar.
  2. DER BESUCH        — ⭐ SHOWPIECE, siehe unten
  3. Leistungen        — Vorsorge · Schwangerschaft · Verhütung & Beratung ·
                         Impfungen · Wechseljahre. Asymmetrisch, editorial,
                         KEIN gleichförmiges Grid: eine große Kachel, zwei
                         mittlere, zwei schmale, versetzte Höhen. Jede Kachel
                         zeigt erst Titel + einen Satz; Details klappen auf.
  4. Über mich         — Werdegang als knappe Zeitleiste, ein Absatz "warum
                         eigene Praxis", A5 als Bild. Erste Person Singular.
  5. Praxis & Anfahrt  — Adresse, Sprechzeiten als echte <table>, Telefonzeiten,
                         Barrierefreiheit (Aufzug/Kinderwagen/Parken) als
                         eigener Block — echtes Auswahlkriterium, nicht Fußnote.
                         Karte NUR nach Consent-Klick, davor statisches Bild.
  6. Termin            — Telefon groß und klickbar (tel:), Rückrufformular:
                         Name, Telefon, Wunschzeitraum, Einwilligungs-Checkbox.
                         ⚠️ KEIN Freitextfeld "Ihr Anliegen" — das wäre ein
                         Gesundheitsdatum (Art. 9 DSGVO). EU-Endpunkt.
  7. Footer            — Impressum, Datenschutz, Notfallnummern (116117 / 112).
```

### ⭐ SHOWPIECE — „Der Besuch"

Gepinnte Sektion, direkt nach dem Hero. Sie beantwortet die Frage, wegen der die
meisten Besucherinnen überhaupt auf der Seite sind: *Was passiert da eigentlich?*

**Mechanik:**

Die Sektion wird über ~500vh gepinnt. Links liegt ein Three.js-Canvas mit einem
**prozedural gebauten Grundriss der Praxis**: die Wände sind aus einem
handgeschriebenen 2D-Pfad per `ExtrudeGeometry` 6 cm hoch aufgezogen und tragen ein
`MeshPhysicalMaterial` mit `transmission: 0.92`, `roughness: 0.32`, `thickness: 0.4`,
`ior: 1.45` — Milchglas; der Boden ist eine matte warme Fläche in `--paper-deep`,
es gibt keine Texturen und kein HDR. **Ein einziger gescrubbter ScrollTrigger**
schiebt `camera.position` und den `lookAt`-Punkt entlang einer `CatmullRomCurve3`
durch fünf Wegpunkte, einen pro Station, in leichter Iso-Aufsicht. An jeder Station
feuern **diskrete** ScrollTrigger-Callbacks (nicht der Scrub): das Raumvolumen der
aktiven Station fährt per GSAP auf der Y-Achse 8 px hoch und sein Glas tintet über
`attenuationColor` nach `--clay`, das vorherige fällt zurück — harter Wechsel, kein
Crossfade, damit man den Ortswechsel spürt. Dieselben Callbacks schneiden ein
DOM-Glaspanel unten links um: `01 / 05`, Stationsname in Fraunces, eine Zeitangabe
(„etwa 5 Minuten") und **ein** Satz, was dort passiert. Rechts steht ein fester,
unbewegter Bildrahmen, in dem die fünf abgeleiteten Raumfotos ausschließlich über
`opacity` ineinander überblenden — der Rahmen selbst bewegt sich nie, nur sein Inhalt.

**Die fünf Stationen:**

| # | Station | Bild | Zeit | Satz (Demo) |
|---|---|---|---|---|
| 01 | Ankommen | A4 | ~2 Min. | Sie klingeln, ich mache selbst auf. Es gibt keinen Wartesaal voller Menschen. |
| 02 | Anmeldung | A1 | ~3 Min. | Karte, Geburtsdatum, ein kurzer Bogen. Mehr wird an der Anmeldung nicht besprochen. |
| 03 | Warten | A2 | ~5 Min. | Ich plane 20 Minuten pro Termin. Wenn es länger dauert, sage ich Ihnen warum. |
| 04 | Sprechen | M | ~10 Min. | Wir reden zuerst. Sie bleiben angezogen. Erst danach entscheiden wir, ob untersucht wird. |
| 05 | Untersuchen | A3 | ~5 Min. | Ich sage jeden Schritt an, bevor ich ihn mache. Sie können jederzeit stoppen. |

**Fallbacks — Pflicht, nicht Kür:**

- `prefers-reduced-motion: reduce` → kein Canvas, kein Pin. Die fünf Stationen
  werden zu einer statischen vertikalen Liste aus Bild + Glaspanel.
- Viewport < 900 px → Three.js wird gar nicht erst geladen (dynamischer Import).
  Stattdessen fünf gestapelte Glaskarten über den Bildern.
- WebGL nicht verfügbar → derselbe Weg wie Reduced Motion.
- Renderer: `dpr` auf max. 2 gekappt, `powerPreference: "high-performance"`,
  Render-Loop pausiert über `ScrollTrigger.onToggle`, wenn die Sektion nicht im
  Viewport ist. Three.js nur in diesem einen Chunk, dynamisch importiert.

**Warum das kein dekoratives 3D ist:** Der Grundriss ist die Information. Er
beantwortet „wie viele Räume, wie weit, in welcher Reihenfolge" — das kann ein
Bild nicht, und eine Textliste macht es nicht anschaulich.

---

## SLOT 6 — Copy-Stimme + verbotene Wörter

```
Stimme
  Siezen. Kurze Hauptsätze. Ein Gedanke pro Satz.
  Fachbegriff nennen, dann im selben Satz in einem Halbsatz erklären:
    "Kolposkopie — eine Lupenuntersuchung, dauert etwa fünf Minuten."
  Kein Humor. Keine Ausrufezeichen. Keine rhetorischen Fragen als Überschrift.

Perspektive
  Erste Person Singular. "Ich", nicht "wir". Es ist eine Einzelpraxis;
  "wir" klingt nach einem Apparat, den es nicht gibt.

Konkretheit
  Jede Aussage trägt eine Zahl oder eine überprüfbare Tatsache:
  20 Minuten pro Termin, Rückruf am selben Werktag, Ultraschall im Haus.
  Kein Satz, der auch auf der Nachbarpraxis stehen könnte.

VERBOTEN (Wörter und Wendungen)
  - "Ihr Partner für", "Wir freuen uns auf Sie", "liegt uns am Herzen"
  - "Wohlfühlatmosphäre", "Wohlfühlpraxis", "auf Augenhöhe"
  - "ganzheitlich", "Rundum-Versorgung", "individuell auf Sie abgestimmt"
  - "modernste Technik", "hochmodern", "innovativ", "State of the Art"
  - "Kompetenz und Empathie", "mit Herz und Verstand"
  - "Vertrauen ist die Basis", "Ihre Gesundheit ist unser Ziel"
  - Superlative jeder Art ("beste", "führend", "einzigartig") — HWG
  - Heilversprechen ("heilt", "beseitigt") — "hilft bei" ist die Grenze
  - Vorher-Nachher-Logik, vergleichende Werbung gegen andere Praxen
  - Lorem ipsum. Demo-Texte sind echte deutsche Sätze mit Platzhalter-Daten,
    keine Blindtexte.
```

---

## FUSS

```
STACK
  React + Vite + TypeScript, Tailwind fürs Layout,
  GSAP + ScrollTrigger für Scroll-Animation, Lenis für Smooth Scroll,
  Framer Motion via LazyMotion für Mikro-Interaktionen.
  Three.js NUR für das Showpiece, dynamisch importiert, nur ab 900 px.
  KEINE React-Component-Libraries (Relume, 21st.dev, shadcn-Default-Look).
  Eigene Komponenten, eigene Tokens.
  Desktop-first, 1440px.
  Budget: < 150 kb JS gzipped ohne den Three.js-Chunk, < 30 kb CSS.

DATEN
  ALLE Kundendaten in src/praxis.config.ts:
  Name, Titel, Adresse, Telefon, Sprechzeiten, Kassen, Kammer, KV, Terminweg.
  Jeder Platzhalter dort mit /* TODO Kunde */ markiert.
  Kein Name, keine Adresse, keine Zeit irgendwo sonst im Code.

DELIVERABLE
  Lauffähige Seite in ~/dev/frauenaerztin-web/, gebaut um die vorhandenen Assets
  aus public/media/. Eigenes Repo — nichts in der website-factory anfassen.
  Keine Platzhalterbilder, kein Lorem, keine Stock-Fotos.
  Semantisches HTML: header/nav/main/section/footer, genau eine h1.
  Sprechzeiten als echte <table> mit <caption>, nicht als Divs.
  Jedes Bild mit expliziter width/height (CLS).
  Hero: loading="eager" + fetchpriority="high". Alles andere loading="lazy".
  Schriften selbst gehostet, kein Google-CDN, kein externer Request außer der
  Karte nach Consent.
  Der Ordner muss jederzeit als eigenes Kunden-Repo herauslösbar sein.

BEWEGUNG
  Nur transform, opacity, clip-path animieren.
  Nicht width, height, top, left, margin, padding, font-size.
  prefers-reduced-motion respektieren — für JEDE Bewegung ein statischer Fallback.
  Video nie mit Scroll scrubben. currentTime lesen ok, schreiben nie.

RECHT (in den Build eingebaut, nicht nachgereicht)
  Rückrufformular ohne Freitextfeld. EU-Endpunkt.
  Impressum- und Datenschutz-Seiten als Gerüst mit /* TODO Kunde */-Feldern,
  nicht erfunden und nicht aus einem Generator kopiert.
  Karte nur nach Consent-Klick.
  Hinweis im Fußbereich: die gezeigten Räume sind Visualisierungen.

QA (selbst ausführen, bevor "fertig" gemeldet wird)
  Seite bei 1440, 1024, 768 und 375 rendern und ANSEHEN, nicht den Code lesen.
  Berichten: Überlappungen, abgeschnittene Texte, horizontales Scrollen,
  Sprünge beim Laden. Erst berichten, dann ändern.
  Tastaturbedienung durchspielen: Fokus sichtbar (Clay-Ring), Reihenfolge logisch,
  Skip-Link vorhanden, Showpiece per Tastatur überspringbar.
  Kontraste prüfen: Body-Text auf Papier und auf Glas über Bild, beides AA.
  Einmal mit prefers-reduced-motion: reduce durchscrollen — die Seite muss
  vollständig funktionieren, nicht kaputt aussehen.
```

---

## Word-Swap-Test

> **„Könnte dieser Prompt mit drei ersetzten Wörtern die Seite des letzten Kunden bauen?"**

Nein. Slot 3 ist ein Raum ohne Menschen und ohne Geräte, der nur für diese Praxis
Sinn ergibt — bei `physio-mack` war das Master-Asset echtes Drohnenmaterial, bei
`nacho-macho` eine freigestellte Chipstüte. Slot 5 ist ein begehbarer 3D-Grundriss,
dessen Zweck (Angst vor dem Termin nehmen) auf keine der drei anderen Seiten
übertragbar ist: eine Physiopraxis muss den Ablauf nicht erklären, eine Snackmarke
hat keinen Ablauf, und ein Haus ist kein Ablauf.
