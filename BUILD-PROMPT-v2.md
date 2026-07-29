# BUILD-PROMPT v2 — Frauenärztliche Einzelpraxis

**Modell:** Opus 5, effort **high**. Kein Sonnet.
**Session:** frisch und schlank.
**Vorgänger:** `BUILD-PROMPT.md` (v1) hat eine korrekte, aber zahme Seite erzeugt —
Skalenkontrast 6:1, keine Überlappung, keine Freisteller. Stand liegt als Tag
`build-v1`. Dieser Prompt ersetzt ihn.

---

Bau eine vollständig animierte Marketing-Website für **[PRAXIS]** — eine neu
eröffnete frauenärztliche Einzelpraxis in einem Altbau, geführt von einer Ärztin
allein, ohne Team, ohne zweite Sprechstunde.

Generiere die fehlenden visuellen Assets mit dem Higgsfield MCP **ZUERST**, dann bau
die Seite **um sie herum**. Nirgendwo Platzhalterbilder. Assets generieren, Media-IDs
bestätigen, dann verdrahten.

Ton: **ruhig, groß, unbeirrbar.** Denk an einen Schweizer Pharma-Geschäftsbericht und
eine Architektur-Monografie — nicht an eine Praxisbroschüre, nicht an ein
Wellness-Spa, nicht an eine Klinik. Übergroße Serifen-Display-Typo gegen sehr kleine,
weit gesperrte Grotesk. Harte Kanten, 2 px Radius, keine weichen Karten. Warmes
Papier und tiefes Tintengrün im **harten** Wechsel, ein einziger Ton-Akzent, der
immer nur den nächsten Schritt markiert. Nichts Zartes, nichts Pastelliges, keine
Rundungen, kein Aquarell.

Ausdrücklich vermeiden: Rosa · Flieder · Pastell · Aquarell-Blüten · Lotus · Mandala ·
stilisierte Frauensilhouette · lächelnde Ärztin im Kittel mit verschränkten Armen ·
Schwangere im Gegenlicht auf einer Wiese · Babyfüße in Erwachsenenhänden ·
Stethoskop als Herz gebogen · medizinisches Kreuz · DNA-Helix · Ultraschallbild als
Deko · Gradient-Blobs · schwebende Hexagone · gleichmäßiges Drei-Spalten-Card-Grid ·
Pill-Buttons.

---

## Gestaltungsvorgaben — nicht verhandelbar

Das sind Zugaben, keine Verbote. Sie entscheiden über die Wertigkeit und werden
gemessen, nicht interpretiert.

1. **Skalenkontrast mindestens 10:1.** Hero-Display bei 1440 px **nicht unter
   200 px** Schriftgrad, Fließtext 18 px. Sektionsüberschriften nicht unter 96 px.
   Zeilenhöhe im Display 0.92, Laufweite negativ.
2. **Überlappung ist Pflicht.** In mindestens **vier** Sektionen überschreitet ein
   Element seine Sektionsgrenze: ein Bild ragt in die nächste Hintergrundfarbe, Typo
   läuft über ein Bild, eine Karte bricht links aus dem Satzspiegel heraus. Eine
   Sektion, die nur gestapelte Rechtecke enthält, ist nicht fertig.
3. **Freisteller streuen.** Die Cutouts aus Asset-Schritt 4 liegen in
   Parallaxe-Tiefe hinter und vor der Typo, jeder auf eigenem Vektor und eigener
   Geschwindigkeit. Mindestens drei Sektionen tragen gestreute Freisteller.
4. **Farbwechsel sind harte Schnitte.** Kein Verlauf, kein Fade zwischen zwei
   Sektionsfarben. Die Kante ist die Gestaltung.
5. **Genau eine gefüllte Clay-Fläche pro Bildschirm.** Clay markiert immer „der
   nächste Schritt" — Termin-CTA, aktiver Cut im Showpiece, Fokus-Ring. Nie Deko.
6. **Kein Element hat denselben Radius und denselben Schatten wie das Nachbarelement.**
   Zwei Radien, drei Schattenstufen, bewusst verteilt.

---

## Asset-Reihenfolge (das zuerst)

> **Bereits vorhanden**, generiert am 2026-07-29, 28 Credits — siehe `docs/MEDIA.md`
> für Maße, Job-IDs und die Bild-Direktion: das Master und die fünf Räume
> (Schritt 1 + 2) sowie zwei der drei Detailaufnahmen. **Neu zu generieren sind
> Schritt 3c, Schritt 4 und sonst nichts.** Alles Neue per image-to-image aus dem
> Master (Job-ID `9b35395a-841e-43e9-8536-0642ceec0cab`, `medias[].role: "image"`),
> Modell `nano_banana_pro` @2k, danach Hintergrundentfernung über
> `remove_background`. Budget: **≤ 20 Credits**, jede Generierung vorher mit
> `get_cost: true` preflighten.

1. **Das Master** — die Sprechecke im Vormittagslicht: zwei zeitgenössische
   Leinensessel über heller Eiche, runder Eichentisch mit Wasserglas und Notizbuch,
   breites Eichenregal mit medizinischen Fachbüchern, salbeigrüner Kalkputz, einzige
   Lichtquelle ein hohes Sprossenfenster rechts, Deckenlicht aus, kein Mensch im
   Bild. 35 mm, dokumentarisch beobachtet, matt, feines Filmkorn. **Alles andere
   leitet sich hieraus ab.** ✅ vorhanden

2. **Vier Räume**, image-to-image aus dem Master, damit Material, Lichtwinkel und
   Grading exakt sitzen: Eingangsflur mit offener Tür · Anmeldung mit
   Milchglas-Sichtschutz · Wartebereich mit drei Stühlen am Fenster ·
   Behandlungsraum mit Liege, halb zugezogenem Paravent und angeschnittenem
   Ultraschallgerät. Kein gynäkologischer Stuhl, nie frontal, kein Mensch. ✅ vorhanden

3. **Drei Detailaufnahmen**, nah aber nicht Makro:
   a. Wasserglas und Notizbuch auf dem Eichentisch ✅ vorhanden
   b. Paravent-Leinen im Gegenlicht, Lichtklinge auf dem Boden ✅ vorhanden
   c. **NEU** — Kalkputz im Streiflicht, reine Materialplatte, kein Objekt, 3:2.
      Das ist die Textur, die später hinter Glasflächen liegt und ihnen etwas zum
      Brechen gibt.

4. **Fünf Freisteller** auf sauberem Grund, mit Hintergrundentfernung. **NEU.**
   Das sind die Elemente, mit denen das Layout überlappen, streuen und aus dem
   Raster brechen kann — ohne sie bleibt die Seite ein Stapel Rechtecke:
   a. der Leinensessel, dreiviertel von vorn
   b. der runde Eichentisch mit Wasserglas und Notizbuch
   c. der aufgefaltete Paravent
   d. ein Stapel von fünf medizinischen Fachbüchern
   e. **ein axonometrischer Schnitt durch die Praxis** — saubere Linienzeichnung
      der fünf Räume von schräg oben, dünne Striche auf Weiß, keine Beschriftung,
      keine Bemaßung, keine Farbe. Freigestellt. Das ist das Grundriss-Element für
      die Sektion „Grundriss & Anfahrt" und der einzige illustrative Ton der Seite.

5. **Video** — genau ein Clip, nur für den Hero: die Sprechecke, 8 s, es bewegt sich
   ausschließlich das Licht. Liegt als Ping-Pong-Loop vor (16 s, nahtlos). ✅ vorhanden

---

## Stack

React + Vite + TypeScript, GSAP + ScrollTrigger für Scroll-Animation, Lenis für
Smooth Scroll, Framer Motion via LazyMotion für Mikro-Interaktionen, **Three.js für
das Showpiece** — dynamisch importiert, erst ab 900 px. Kein Tailwind, keine
React-Component-Libraries. Eigene Tokens, eigene Komponenten. Desktop-first, 1440 px.

Alle Kundendaten in `src/praxis.config.ts`, jeder Platzhalter `/* TODO Kunde */`.
Nirgends sonst ein Name, eine Adresse, eine Uhrzeit.

---

## Sektionen in dieser Reihenfolge

Hero → Zahlen → Der Besuch (gepinntes Bild, laufender Text) → **DER ANRUF
(Showpiece, Mitte)** → Räume → Grundriss & Anfahrt → Termin/Footer

**Hero.** Wortmarke klein und weit gesperrt oben. Darunter der Satz *„Eine
Frauenarztpraxis, in der Sie vorher wissen, was passiert."* in 200 px+, über drei
Zeilen gebrochen, negative Laufweite. Das Hero-Video liegt **hinter** der Typo,
vollflächig, nicht darunter — die Schrift steht auf dem Bild, nicht daneben. Zwei
Freisteller (Sessel, Bücherstapel) treiben an den Rändern in Parallaxe. Unten links
ein Glaspanel mit den heutigen Sprechzeiten, das über die Sektionskante in die
nächste Farbe hineinragt.

**Zahlen.** Vier Kennzahlen, die beim Eintritt hochzählen, in 160 px Display, mit
je einer kleinen Zeile darunter: **20** Minuten pro Termin · **3** Stühle im
Wartebereich · **1** Ärztin, keine Vertretung · **0** Fragen zum Anliegen am
Telefon. Asymmetrisch gesetzt, nicht als Vierer-Raster — zwei groß, zwei versetzt
kleiner.

**Der Besuch.** Ein gepinntes Bild rechts, das durch die fünf Raumfotos hart
schneidet, während links fünf kurze Texte durchlaufen: Ankommen · Anmeldung ·
Warten · Sprechen · Untersuchen. Jeder Text eine Zeitangabe und **ein** Satz. Kein
3D, kein Crossfade — nur harte Bildwechsel, ausgelöst von diskreten Triggern.

**Räume.** Galerie der fünf Raumfotos in einem gebrochenen Raster mit unterschiedlichen
Höhen und Breiten, zwei Bilder ragen über den Satzspiegel hinaus. Karten neigen sich
bei Hover zum Cursor (rotateX/rotateY, max 6°) und heben sich auf einer Feder.

**Grundriss & Anfahrt.** Der axonometrische Schnitt groß und freigestellt auf Papier,
Sprechzeiten als echte `<table>`, Barrierefreiheit als eigener Block (Aufzug,
Kinderwagen, Parken) — das ist ein echtes Auswahlkriterium, keine Fußnote. Karte erst
nach Consent-Klick, davor statisches Bild und Adresse.

**Termin/Footer.** Telefonnummer in Display-Größe und klickbar. Rückrufformular:
Name, Telefon, Wunschzeitraum, Einwilligung. **Kein Freitextfeld „Ihr Anliegen"** —
das wäre ein Gesundheitsdatum nach Art. 9 DSGVO. EU-Endpunkt. Darunter Impressum,
Datenschutz, 116117 und 112.

---

## Copy

Schreib wie eine Ärztin, die ihre eigene Praxis führt und die Zeit selbst einteilt —
nicht wie eine Praxisbroschüre. Siezen. Erste Person Singular: **„ich"**, nie „wir",
es ist eine Person. Kurze Hauptsätze, ein Gedanke pro Satz. Fachbegriff nennen und
im selben Satz in einem Halbsatz erklären: *„Kolposkopie — eine Lupenuntersuchung,
dauert etwa fünf Minuten."*

Jede Aussage trägt eine Zahl oder eine überprüfbare Tatsache, die niemand raten
könnte: wie lange ein Termin geplant ist, wie viele Stühle im Wartebereich stehen,
bis wann man anrufen muss, um am selben Tag zurückgerufen zu werden.

Kein Humor, keine Ausrufezeichen, keine rhetorischen Fragen als Überschrift.

Vermeiden: „Ihr Partner für" · „Wir freuen uns auf Sie" · „liegt uns am Herzen" ·
„Wohlfühlatmosphäre" · „auf Augenhöhe" · „ganzheitlich" · „modernste Technik" ·
„Kompetenz und Empathie" · Superlative jeder Art (HWG) · Heilversprechen
(„heilt", „beseitigt" — „hilft bei" ist die Grenze) · Lorem ipsum.

---

## Animation

Scroll-getriggerte Reveals durchgehend, gepinnte Sektionen, Smooth Scroll.
Eigener Cursor: ein dünner Ring, der über interaktiven Elementen aufskaliert und
über dem Telefon im Showpiece zu einem Punkt zusammenfällt. Hero-Typo und
Hero-Video reagieren minimal auf den Zeiger — Parallaxe-Versatz plus Verschiebung
der Lichtrichtung. Raumkarten neigen sich in 3D bei Hover. Zahlen zählen beim
Eintritt hoch.

Alles knapp und entschieden — kurze Dauern, leichtes Überschwingen. Nichts schwebt,
nichts driftet. Nur `transform`, `opacity`, `clip-path` animieren.
`prefers-reduced-motion` respektieren, für **jede** Bewegung ein statischer Rückfall.
Video nie mit Scroll scrubben — `currentTime` lesen ist erlaubt, schreiben nie.

---

## DER ANRUF — das Showpiece

Eigene gepinnte Sektion, etwa in der Seitenmitte. Hier geht die meiste Aufmerksamkeit
hin. Es ist zugleich der Konversionspunkt der Seite: Der erste Anruf bei einer
Frauenärztin ist für viele die eigentliche Hürde — diese Sektion nimmt sie, indem sie
das Gespräch vorher zeigt, und endet mit einem Telefon, das man wirklich anrufen kann.

Die Sektion wird über **~600vh** gepinnt. Hintergrund tiefes Tintengrün, harter
Schnitt von der vorherigen Papier-Sektion.

**Das Objekt.** Ein Telefon als echte Three.js-Geometrie: abgerundeter Quader,
mattes keramisches `MeshPhysicalMaterial` (roughness 0.55, clearcoat 0.3), keine
Marke, kein Logo, kein Kameramodul. Ein Richtungslicht **aus derselben Richtung wie
das Fensterlicht der Fotografie** — von rechts oben — plus ein sehr schwaches
Fülllicht, dazu ein weicher Kontaktschatten auf einer unsichtbaren Bodenebene.
`dpr` auf 2 gekappt, Renderschleife pausiert über `ScrollTrigger.onToggle`, wenn die
Sektion nicht im Viewport ist.

**Der Auftritt.** Beim Eintritt liegt das Telefon klein, schräg und angeschnitten am
rechten Bildrand. Es **schnappt** in die Mitte und dreht sich dem Betrachter zu —
schnelle Skalierung und Rotation mit leichtem Überschwingen, **kein langsames
Gleiten**. Das ist ein Schnitt, kein Übergang.

**Der Bildschirm ist DOM, nicht Textur.** Der Screen ist eine eigene Ebene aus echtem
HTML, die pro Frame über die projizierten Eckpunkte des Bildschirm-Quads positioniert
wird (`Vector3.project` auf die vier Ecken, daraus eine `matrix3d`-Transformation).
Grund: gestochene Schrift statt weicher CanvasTexture — und der Anruf-Button am Ende
ist damit ein echtes, fokussierbares, antippbares Element und kein gemaltes Bild.

**Vier harte Schnitte.** Ein einziger gescrubbter ScrollTrigger fährt die Rotation
des Telefons weiter, während **diskrete** Callbacks — nicht der Scrub — den
Bildschirminhalt und eine Datenkarte links unten umschneiden. Jeder Wechsel ist ein
harter Schnitt, kein Crossfade:

| Cut | Auf dem Bildschirm | Kennzahl | Zeile |
|---|---|---|---|
| 01 | Tastenfeld, die Nummer eingetippt | 08:00 – 11:30 | Ich gehe selbst ran. Es gibt keine Warteschleife und kein Menü. |
| 02 | Verbindungsaufbau, Dauer läuft | 2 FRAGEN | Ihren Namen und ob es dringend ist. Mehr frage ich am Telefon nicht. |
| 03 | Terminvorschlag, zwei Zeiten zur Wahl | 20 MIN | So lang ist der Termin geplant, nicht geschätzt. |
| 04 | Bestätigung mit Datum | HEUTE | Wenn Sie bis 11:30 anrufen, rufe ich am selben Werktag zurück. |

Aufbau der Datenkarte: kleiner Clay-Zähler `01 / 04`, darunter das Label in weit
gesperrten Versalien, darunter die Kennzahl in übergroßer Display-Typo, darunter die
eine Zeile. Die Karte liegt auf Glas über der Materialplatte aus Asset-Schritt 3c —
dort hat das Glas endlich Struktur zum Brechen.

**Das Ende.** Bei Cut 04 kippt das Telefon leicht nach vorn und der echte
`tel:`-Button erscheint auf dem Bildschirm — ab hier ist er live: antippbar,
per Tastatur erreichbar, mit sichtbarem Clay-Fokusring. Der Pin löst sich erst
danach. Wer die Sektion durchgescrollt hat, hat vier Sätze über das Telefonat
gelesen und hält einen funktionierenden Anruf-Button in der Hand.

**Die Überschrift** wird sauber über und unter den Telefonbereich geteilt, damit
Typo nie auf das Objekt läuft. Während das Telefon in die Mitte schnappt, schieben
die beiden Hälften an die Viewport-Ränder auseinander. Eine dünne Clay-Linie
verfolgt die Bewegung.

**Rückfälle — Pflicht, nicht Kür.**
`prefers-reduced-motion: reduce`, Viewport < 900 px oder kein WebGL: Three.js wird
gar nicht erst geladen. Stattdessen steht das Telefon als statisches CSS-Objekt
mittig, die vier Cuts werden zu vier untereinander liegenden Glaskarten, und der
`tel:`-Button ist von Anfang an sichtbar und funktionsfähig. **Der Anruf darf unter
keiner Bedingung von JavaScript oder WebGL abhängen** — er ist der Zweck der Seite.

---

## Deliverable

Produktionsreifer Code in diesem Repo, alle Higgsfield-Assets eingebunden, keine
Platzhalterbilder, kein Lorem. Semantisches HTML, genau eine `h1`, Sprechzeiten als
echte Tabelle, jedes Bild mit expliziter `width`/`height`, Hero eager +
`fetchpriority="high"`, alles andere lazy. Schriften selbst gehostet, kein
Google-CDN, kein externer Request außer der Karte nach Consent.

**Visuelle Wirkung hat Vorrang** — aber nicht vor Erreichbarkeit: Tastaturweg,
Fokus-Sichtbarkeit, Kontraste AA, und der Anruf-Button funktioniert immer.

Wenn du fertig bist: Seite bei 1440, 1024, 768 und 375 selbst öffnen und ansehen.
Zusätzlich einmal mit `prefers-reduced-motion: reduce`. Berichte, was du siehst —
Überlappungen die nicht gewollt sind, abgeschnittene Texte, waagerechtes Scrollen,
Sprünge beim Laden. Erst berichten, dann ändern.

**Und prüfe die sechs Gestaltungsvorgaben oben gegen das gerenderte Ergebnis, nicht
gegen den Code.** Miss den tatsächlichen Schriftgrad der Hero-Typo im Browser. Zähl
die Sektionen mit echter Überlappung. Wenn eine Vorgabe nicht erfüllt ist, sag es,
statt sie stillschweigend zu unterschreiten.
