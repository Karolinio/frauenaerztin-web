# Direction — Frauenärztliche Einzelpraxis

> **Status: Entwurf.** Die Referenzen sind mein Vorschlag; sobald deine dazukommen,
> wird dieses Dokument geändert und die Tokens folgen. Kein Komponentencode, bevor
> das hier steht — beim ersten Anlauf gab es dieses Dokument nicht, und genau
> deshalb ist die Seite auf dem Median gelandet.

## These

Ein Beipackzettel, den jemand ernst genommen hat: die Seite ist gedruckte
Ablaufinformation auf Papier — Zahl, Haarlinie, Diagramm, eine Signalfarbe —
und darin liegen ruhige, dokumentarische Fotografien eines Altbauzimmers.
Nicht die Praxisbroschüre, sondern der Plan, der an der Wand hängt.

Falsifizierbar: Wenn auf dem Schirm eine Milchglasfläche, ein weicher
Doppelschatten oder eine Fläche in Wellness-Türkis steht, ist es nicht diese
Seite. Wenn eine Zahl kleiner gesetzt ist als der Satz daneben, auch nicht.

Warum das trägt: Der Einzeiler ist eine **Verfahrensaussage** — „Sie wissen
vorher, was passiert". Eine Seite, die aussieht wie eine gute Anleitung, löst
dieses Versprechen in der Form ein und nicht nur im Text.

## Referenzen

1. **Otl Aicher, Leitsystem Olympia München 1972** — zu klauen: die Haltung,
   dass ein Weg erklärt wird, ohne dass jemand von oben herab spricht. Piktogramm,
   Zahl, Richtung, eine Signalfarbe. Kein Schmuck, keine Beruhigungsgesten.
2. **Erco Lichtkataloge (Aicher/Erco, 80er bis heute)** — zu klauen: die
   Schnittzeichnung als Hauptbild einer Doppelseite, mit winzigen Beschriftungen
   an dünnen Fahnenlinien. Das Diagramm ist die Ware, nicht die Illustration.
3. **Schweizer Arzneimittel-Packungsbeilagen und Isotype (Gerd Arntz/Neurath)** —
   zu klauen: Information als Höflichkeit. Nummerierte Abfolge, strikte
   Spaltenordnung, Tabellenziffern, nirgends ein weicher Übergang.
4. **Architekturmonografie (Birkhäuser/Lars Müller, kleines Format)** — zu
   klauen: die Erlaubnis, eine ruhige Fotografie randlos über eine ganze Fläche
   laufen zu lassen, daneben nichts als eine Bildunterschrift in 13 px.
5. **Deutscher Mutterpass und Impfpass** — zu klauen: das Raster aus Feldern,
   Datumsspalten und Kürzeln, das jede Frau in der Zielgruppe schon in der Hand
   hatte. Vertrautheit als Gestaltungsmittel, nicht als Zitat.
6. **Fahrplanaushang der Deutschen Bahn (Aushangfahrplan, gelb)** — zu klauen:
   dass eine Uhrzeit groß und eine Erklärung klein ist, nie umgekehrt.

> **Offene Stelle:** Zwei bis drei deiner eigenen Referenzen ersetzen hier
> gerne welche von mir. Bei jedem Tausch ändern sich abgeleitete Werte.

## Palette (OKLCH)

Drei Neutrale und **ein** Signal. Kein Türkis mehr — das war der Wellness-Rest
im alten Entwurf und hat die Fotos flach gemacht.

```css
--paper:      oklch(97.5% 0.008 85);   /* warmes Off-White, Grundfläche */
--paper-deep: oklch(93.5% 0.012 85);   /* zweite Fläche, Tabellen, Formular */
--ink:        oklch(18% 0.008 250);    /* Text und Linien. Nahezu schwarz, kalter Stich */
--ink-soft:   oklch(46% 0.010 250);    /* Sekundärtext, Bildunterschriften */
--tief:       oklch(15% 0.010 250);    /* dunkle Sektionen: Druckerschwärze, kein Teal */
--linie:      oklch(84% 0.010 85);     /* Haarlinien, 1px */
--signal:     oklch(62% 0.20 40);      /* DER Akzent */
--signal-ink: oklch(36% 0.14 40);      /* Signal als Text auf Papier, AA */
```

**Rolle des Signals — unverändert gegenüber dem alten Build, aber jetzt heißer
angesetzt:** markiert immer „der nächste Schritt". Zulässig an genau fünf
Stellen: Termin-CTA · aktive Station im Ablauf · aktiver Navigationspunkt ·
Fokus-Ring · der heutige Tag in der Sprechzeitentabelle. Nirgends als Fläche,
Trennlinie oder Icon-Füllung.

Warum heißer (`0.12` → `0.20` Chroma): Bei 0.12 lag Clay im selben Tonbereich
wie die Eiche auf den Fotos und las sich als Materialfarbe. Ein Marker muss aus
dem Bild herausfallen, sonst markiert er nichts.

## Typografie

Dieselben zwei Familien wie bisher — die Paarung war nicht das Problem, die
**Einstellung** war es.

- **Display: Fraunces** (variabel, opsz/wght/SOFT liegt bereits selbst gehostet
  vor). Neu: `SOFT` fährt auf **0–12** statt 30–45 und `wght` auf **300** bei
  großen Graden. Damit wird aus der freundlichen Sonntagsserife eine
  hochkontrastige Displayschrift mit scharfen Serifen — Monografie statt Café.
  `opsz` läuft mit dem Grad bis 144.
- **Brot: Instrument Sans** 400/500/600, unverändert. Trägt Fließtext, Labels
  und die **technische Ebene**: alle Ziffern `tabular-nums`, alle Beschriftungen
  gesperrt in Versalien.
- Zwei Familien, mehr nicht. Kontrast kommt aus Grad, Gewicht und Laufweite.

**Skala.** Verhältnis 1.25 für Fließtext und UI ab 18 px. Displaygrade brechen
das Verhältnis absichtlich und werden an der Viewportkante bemessen, nicht an
der Skala. Der alte Build hat den Hero bei 66 px gedeckelt — genau da kam das
Brave her.

```css
--text-hero:  clamp(3rem, 0.5rem + 8vw, 9.5rem);   /* vorher max 4.125rem */
--text-zahl:  clamp(3.5rem, 1rem + 9vw, 12rem);    /* Uhrzeiten, Dauern, Jahre */
--text-h2:    clamp(2rem, 1rem + 3.4vw, 4.25rem);
--text-body:  1.125rem;
--text-label: 0.8125rem;
--tracking-display: -0.035em;
--tracking-label:    0.16em;
```

**Die Zahl ist größer als der Satz.** 25 Minuten, 20 Minuten pro Termin, 08:00,
alle drei Jahre, 116 117 — jede überprüfbare Zahl wird gesetzt wie eine
Fahrplanzeit und nicht wie Fließtext. Das ist die Brücke zwischen der
Konkretheitsregel aus Slot 6 und dem Erscheinungsbild.

## Tiefenstrategie

**Editorial-Overlap.** Genau eine, konsequent.

- Bilder und Textblöcke **überlappen das Raster**, statt in gepolsterten Karten
  zu sitzen: ein Foto läuft über die Spalte in den Bund, eine Bildunterschrift
  sitzt halb auf der Bildkante, ein Zahlenblock ragt in die nächste Sektion.
- **Schatten: höchstens 1 px versetzt, ohne Weichzeichnung**, und nur dort, wo
  ein Element wirklich abhebt (CTA im Ruhezustand: gar keiner). Die drei weichen
  Doppelschatten aus dem alten Build sind gestrichen.
- **Glas ist gestrichen.** `backdrop-filter` kommt auf dieser Seite nicht mehr
  vor. Wo bisher eine Milchscheibe über dem Foto lag, steht künftig eine
  deckende Papier- oder Tieffläche mit einer Haarlinie — oder der Text steht
  direkt im Bild, wenn das Bild dunkel genug ist.
- Kanten: **ein Radius, 0 px.** Bilder, Flächen, Buttons und Felder laufen
  rechtwinklig. Der einzige Radius der Seite ist der Fokusring.

## Bewegungsvokabular

- **Primäre Kurve:** `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Dauern:** 180 ms Mikro-Interaktion, 420 ms Signature Move, 700 ms
  Sektionswechsel. Nichts läuft über 700 ms.
- **Signature Move — „der Strich":** eine 1.5 px starke Linie in `--signal`
  zeichnet sich von 0 auf volle Länge (`scaleX` bzw. `stroke-dashoffset`,
  420 ms, transform-origin an der Seite, aus der sie kommt) und **markiert
  Ankunft**. Wiederholt an: aktivem Navigationspunkt · dem Weg durch den
  Grundriss · unter jeder Sektionsbeschriftung beim Eintreten · entlang der
  Zeitleiste im Werdegang · unter dem fokussierten Formularfeld · unter der
  heutigen Zeile der Sprechzeitentabelle.
- **Gestrichen: das Einblenden von unten.** `opacity` + `translateY(18px)` auf
  fünf Sektionen war die generischste Bewegung des Webs und der Hauptgrund,
  warum die Seite nach Vorlage aussah. Ersatzlos, außer wo der Strich passt.
- Kein Video wird gescrubbt. `currentTime` lesen ja, schreiben nie.
- Für `prefers-reduced-motion: reduce` gilt weiter: kein Pin, kein Scrub,
  Endzustand sofort — der Strich steht dann einfach gezogen da.

## Textur / Atmosphäre

**Keine.** Kein Filmkorn, kein Rauschen, kein Bloom, keine Vignette. Das
feTurbulence-SVG bei 3 % aus dem alten Build ist gestrichen.

Was die Fläche stattdessen trägt: die Fotografie selbst (Kalkputz, Leinen,
Eiche liefern die Oberfläche), großzügiger Weißraum, Haarlinien in `--linie`
und die Spannung zwischen kaltem Diagramm und warmem Raum. Wenn eine Sektion
sich ohne Textur leer anfühlt, ist die Antwort mehr Weißraum oder ein größeres
Bild — nicht ein Filter.

## Anti-Ziele

1. **Keine Wohlfühl-/Spa-Seite.** Kein Rosa, kein Flieder, kein Aquarell, keine
   Blüte, keine geschwungene Frauensilhouette, kein weiches Verlaufsfeld. Der
   Normalfall der Branche und deshalb der erste Ausschluss.
2. **Keine Klinik-Corporate-Seite.** Kein Blau-Weiß-Verlauf, kein Stethoskop,
   kein DNA-Motiv, kein gleichförmiges Drei-Spalten-Kartenraster mit identischen
   Icons.
3. **Nicht der erste Anlauf dieser Seite.** Keine Milchglaspanels, keine weichen
   Doppelschatten, kein Türkis als Sektionsfläche, keine Fade-ups, kein
   CSS-Rauschen, keine auf 66 px gedeckelte Überschrift. Das ist namentlich
   ausgeschlossen, damit es nicht zurückkriecht.

## Sektionsmechanik

Die Lehre aus `nacho-macho`: dort hat **jede** Sektion einen erfundenen
Mechanismus, nicht nur das Showpiece. Der alte Build hatte einen und fünf
gewöhnliche Sektionen.

| Sektion | Mechanismus |
|---|---|
| **Hero** | Die Seite weiß, wie spät es ist. Aus `sprechzeiten` wird live gerechnet und als Fahrplanzeile gesetzt: „Heute geöffnet bis 12:00" / „Öffnet morgen um 08:00" / „Noch 40 Minuten". Die Uhrzeit steht in `--text-zahl`, der Einzeiler daneben kleiner. Kein Panel, kein Glas — die Zeile sitzt direkt auf dem Papier über dem randlosen Bewegtbild. |
| **Der Besuch** | Gepinnt. Ein **gezeichneter Grundriss** in orthografischer Aufsicht: Papierfläche, Wände als Ink-Linien, keine Perspektive. Ein Strich in `--signal` zeichnet den tatsächlichen Weg — Tür → Anmeldung → Warten → Sprechzimmer → Liege — über `stroke-dashoffset`, gescrubbt. An jeder Station rastet der Strich ein, die Raumbeschriftung setzt sich, die Dauer steht in `--text-zahl`, das Foto schneidet hart um (kein Crossfade). **Offene Entscheidung: 2D-SVG statt Three.js** — siehe unten. |
| **Leistungen** | Numerierte Spezifikation statt Kacheln. Jede Leistung: laufende Nummer, Titel, und eine Datenzeile in Tabellenziffern („alle 3 Jahre · 6–8 Min · Kasse"). Aufklappen als harte `clip-path`-Wische von oben, 420 ms, mit dem Strich an der Front. |
| **Diskretion** | Randloses Bild über die volle Breite, ein Satz darüber in `--text-hero`, über die Bildkante hinausgesetzt. Der Textblock überlappt das Bild, nicht umgekehrt. |
| **Über mich** | Der Werdegang ist eine echte Zeitleiste: Jahreszahlen in `--text-zahl` links, eine Ink-Linie, die beim Scrollen mitzeichnet, Stationen rechts. Das Detailfoto überlappt die Leiste. |
| **Praxis & Anfahrt** | Die Sprechzeitentabelle bleibt eine `<table>` — bekommt aber den heutigen Tag mit dem Strich markiert und einen Live-Zustand in der Kopfzeile. Der Zugangsblock wird zur Faktenspalte mit Maßen (Kabine 110 × 140 cm) in Tabellenziffern. |
| **Termin** | Die Rufnummer in `--text-zahl`, größer als alles andere auf der Seite außer dem Hero. Formular unverändert in Funktion und Recht, aber rechtwinklig, ohne Karte, ohne Schatten. |
| **Fußzeile** | Notrufnummern in `--text-zahl` auf `--tief`. Die einzige Stelle, an der drei Zahlen gleichzeitig groß stehen dürfen. |

## Konsequenzen für die vorhandenen Assets

Die acht Bilder und der Clip bleiben — sie sind bezahlt, konsistent abgeleitet
und passen zur These (dokumentarisch, Nordlicht, kein Mensch im Bild). Was sich
ändert, ist die **Behandlung**:

- randlos oder hart bis an die Spaltenkante beschnitten, nie in eine gerundete
  Karte gelegt, nie mit Schatten unterlegt;
- jede Fotografie bekommt eine technische Bildunterschrift in 13 px an einer
  Haarlinie, wie in einer Monografie;
- kein Bild trägt Text auf sich, außer die Fläche darunter ist deckend.

Falls nachgeneriert wird, gilt unverändert die Bild-Direktion aus
`docs/MEDIA.md` (Vormittag, 35 mm, Nordlicht von rechts, kein Mensch im Bild) —
diese These ändert die Fotografie nicht, nur ihre Rahmung.

## Was bleibt

Struktur, `src/praxis.config.ts` als einzige Datenquelle, die Rechtstexte, das
Formular ohne Freitextfeld, die Consent-Karte, die Barrierefreiheitsprüfung,
die Budgets und die drei QA-Läufe in `scripts/`. Daran lag es nicht.
