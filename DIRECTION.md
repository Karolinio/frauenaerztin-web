# Direction — Praxis für Frauenheilkunde, Erkelenz

> **Status: entschieden.** Ersetzt die Fassung vom 07.08.2026 („Beipackzettel, Aicher,
> Signalorange") vollständig. Grund: die war eine Vermutung, weil Yvonne noch nichts
> gesagt hatte. Jetzt hat sie — schriftlich und als Sprachnachricht — und sie will
> etwas anderes.
>
> **Was von der alten Fassung gilt: nichts.** Wer beim Umbau eine Farbe, eine Schrift
> oder eine Geste von dort übernimmt, baut halb Aicher und halb Salbei, und das sieht
> man.

## Was sie gesagt hat — wörtlich, weil daraus alles folgt

> „Farben gerne viel weiß, etwas salbeigrün und warmes beige."
> „Es muss gar nicht so krass vielkompliziert sein."
> „Eher so ein bisschen einfacher."
> „Zu 3D-Animation müsste ich gar nicht viel haben. Vllt das Foto auf der Hauptseite,
> dass es eingeblendet wird und nicht fest ist. Oder dass man bei den Fotos der Praxis
> die Fotos nicht alle untereinander hat, sondern so verschieben kann."
> „Ich denke, wenn sie einmal steht, muss nicht viel geändert werden, außer mal ein
> Foto bei Personalwechsel, Aktuelles oder ggf. Änderungen der Öffnungszeiten."

**Sie eröffnet am 11.** und koordiniert gerade Handwerker. Jede Entscheidung, die wir
ihr abnehmen können, ist die richtige.

## These

**Ein Raum, der gerade fertig geworden ist.** Frisch gestrichene Wand, Tageslicht von
der Seite, Leinen, heller Boden, nichts steht herum. Die Praxis ist neu — das ist keine
Behauptung, sondern der Grund, warum es sie gibt: *„Die neue gynäkologische Praxis in
Erkelenz."*

Die Seite ist hell, ruhig und aufgeräumt wie dieser Raum. **Kein dunkler Grund, kein
Glas, keine Tiefe aus Schatten.** Tiefe entsteht hier nur durch Licht auf Material und
durch grosszügigen Weissraum — dieselbe Art Tiefe, die ein leerer, gut geschnittener
Raum hat.

**Falsifizierbar.** Es ist nicht diese Seite, wenn:
- irgendwo Pink oder Magenta vorkommt
- eine Fläche dunkler als `--tinte-mtl` als Hintergrund dient
- ein Kasten einen sichtbaren Rahmen mit Schatten hat
- ein Element beim Laden über den Inhalt springt (Popup, Overlay, Banner mit Schliessen-X)
- helles Salbei als Schrift gesetzt ist

## Referenzen

1. **[gynpraxisbonn.de](https://gynpraxisbonn.de/)** — ihre eigene Referenz. Zu klauen:
   den **geteilten Hero** (links die grosse Zeile, rechts randlos das Porträt der
   Ärztin) und die **Kürze**: 6,3 Bildschirmhöhen, gemessen am 14.08.2026.
   **Nicht** zu klauen: das Knallpink `rgb(252,60,156)`, die Systemschrift
   (`-apple-system`, es wurde nie eine gewählt), und das Popup, das beim Laden die
   Ärztin und die Überschrift verdeckt.
2. **Eine gute Hebammenpraxis-Broschüre, kein Klinikprospekt** — zu klauen: dass
   medizinische Information freundlich gesetzt sein darf, ohne kindlich zu werden.
3. **Leinen und Kalkputz im Streiflicht** — zu klauen: die einzige Textur, die diese
   Seite braucht. Kein Korn, kein Rauschen, kein Verlauf.
4. **Der deutsche Mutterpass** — zu klauen: das Raster aus Feldern und Datumsspalten,
   das jede Frau in der Zielgruppe schon in der Hand hatte. Für die Sprechzeiten und
   den Terminbereich. Vertrautheit als Mittel, nicht als Zitat.

## Palette (OKLCH)

Genau ihre drei Farben. Nichts dazuerfunden.

```css
--papier:      oklch(98.5% 0.004  95);  /* Grund. Fast weiss, minimal warm */
--leinen:      oklch(94%   0.012  85);  /* warmes Beige. Zweite Fläche */
--leinen-tief: oklch(90%   0.016  82);  /* dritte Fläche, Tabellenzeilen */
--tinte:       oklch(26%   0.012 150);  /* Text. Sehr dunkel, mit grünem Stich */
--tinte-mtl:   oklch(48%   0.014 150);  /* Sekundärtext */
--linie:       oklch(88%   0.010  90);  /* Haarlinien, 1px */
--salbei:      oklch(72%   0.045 150);  /* Salbei HELL — nur Fläche */
--salbei-tief: oklch(42%   0.055 152);  /* Salbei DUNKEL — Text, Knöpfe, Signal */
```

**`--tinte` ist nicht neutralschwarz, sondern trägt einen grünen Stich.** Ein neutrales
Grau neben Salbei sieht schmutzig aus; ein Text, der dieselbe Farbfamilie hat wie der
Akzent, wirkt gewählt statt geerbt.

### Gemessen, nicht geschätzt

`packages/shared/src/kontrast.ts`, am 14.08.2026:

| Paarung | Kontrast | |
|---|---|---|
| Fließtext auf Weiß | **14,79** | AAA |
| Fließtext auf Beige | **12,97** | AAA |
| Sekundärtext auf Weiß | **6,22** | AA |
| **Salbei-tief als Text auf Weiß** | **7,88** | AAA |
| Salbei-tief als Text auf Beige | **6,92** | AA |
| Weiß auf Salbei-tief (Knopf) | **7,88** | AAA |
| **helles Salbei als Text** | **2,33** | **DURCHGEFALLEN** |

**Die Regel, die daraus folgt — und sie ist die wichtigste dieser Datei:**
`--salbei` ist eine **Fläche**. Niemals Schrift, niemals ein Symbol, niemals eine
Linie, die etwas trennen soll. Wer damit Text setzt, baut eine Seite, die eine
Schwangere im Wartezimmer bei Sonnenlicht nicht lesen kann.

`--salbei-tief` ist das **Signal**, und es markiert genau eine Sache: **den nächsten
Schritt.** Erlaubt an: Termin-Knopf · aktiver Menüpunkt · Fokusring · der heutige Tag
in der Sprechzeitentabelle · die aktive Leistung. Nirgends als Fläche.

## Typografie

**Hier gewinnen wir die Referenz.** Sie benutzt `-apple-system` — es wurde dort nie eine
Schrift gewählt. Eine echte Paarung ist der billigste und grösste Vorsprung.

**Display: Fraunces**, variabel. `SOFT 30`, `wght 400`, `opsz 72` bei grossen Graden.
Weich, warm, mit optischer Grössenachse — sie trägt „hier nimmt sich jemand Zeit", ohne
in Richtung Wellness zu kippen. Liegt in der Flotte bereits selbst gehostet vor.

**Text: Instrument Sans**, variabel. Ruhig, breit genug für 16 bis 75 Jahre, und sie
verschwindet hinter dem Inhalt — genau das, was ein medizinischer Text braucht.

```css
--text-hero:    clamp(2.5rem, 1rem + 5.6vw, 5.5rem);
--text-section: clamp(1.75rem, 1.1rem + 2.2vw, 3rem);
--text-lead:    clamp(1.125rem, 1.02rem + 0.42vw, 1.375rem);
--text-base:    1.0625rem;
--text-meta:    0.9375rem;

--tracking-hero: -0.022em;
--tracking-head: -0.012em;
--tracking-label: 0.14em;

--measure: 64ch;
```

**Der Hero trägt zwei Zeilen, und nur die zweite ist ihre.** „Medizin für Frauen" steht
wörtlich so auf ihrer Referenz — sie hat es übernommen, und sie darf es behalten. Aber
darunter steht **„Die neue gynäkologische Praxis in Erkelenz"**, und das ist der Satz,
den es nur einmal gibt. Er wird nicht kleiner gesetzt als eine Bildunterschrift.

## Tiefenstrategie

**`flat-with-light`** — eine einzige, und sie ist das Gegenteil der beiden anderen
Kundenseiten dieser Werkstatt:

> Kein Glas. Keine Schlagschatten. Keine Kästen mit Rand. Trennung entsteht durch
> **Flächenwechsel** (Papier → Leinen), durch **Haarlinien** und durch **Weissraum**.
> Eine Karte, die sich abhebt, hebt sich hier durch ihre Fläche ab, nicht durch einen
> Schatten darunter.

Warum: TAFELWERK und Aram sind dunkel und arbeiten mit Glas. Diese Praxis ist hell und
leer. Glas auf Weiss ist unsichtbar, und ein Schatten auf einer Arztseite sieht aus wie
ein Software-Dialog. **Der Raum ist die Tiefe.**

## Bewegungsvokabular

```css
--ease-ruhig: cubic-bezier(0.32, 0.72, 0, 1);
--dauer-ruhig: 620ms;
--dauer-mikro: 180ms;
```

**Genau zwei Bewegungen — sie hat beide selbst benannt, mehr gibt es nicht.**

1. **Das Porträt blendet ein.** *„Vllt das Foto auf der Hauptseite, dass es eingeblendet
   wird und nicht fest ist."* Beim Laden: Deckkraft 0 → 1 über 900 ms, dazu ein sehr
   langsamer Zoom von 1,04 auf 1,00. Kein Fliegen, kein Springen. Das Bild kommt zur
   Ruhe, es tritt nicht auf.
2. **Die Praxisfotos schiebt man.** *„Dass man bei den Fotos der Praxis die Fotos nicht
   alle untereinander hat, sondern so verschieben kann."* Eine waagerechte Reihe zum
   Ziehen und Wischen, mit Tastaturbedienung und sichtbarem Fortschritt. Kein
   Karussell mit Automatik — sie hat „verschieben" gesagt, nicht „durchlaufen".

Alles andere: Inhalt taucht beim Eintreten auf, 16 px von unten, Deckkraft 0 → 1.
**Kein Pinnen, kein Scrub, kein Parallax.** Sie hat „einfacher" gesagt, zweimal.

## Textur und Atmosphäre

- **Eine** Textur: feines Leinen, 4 % Deckkraft, nur auf `--leinen`-Flächen.
- **Kein Korn, kein Rauschen, kein Verlauf.** Ein Verlauf auf Weiss ist entweder
  unsichtbar oder schmutzig.
- Licht kommt von **links oben**, wie in ihrem Referenz-Hero. Wenn ein Bild einen
  Schattenwurf hat, zeigt er nach rechts unten. Auf der ganzen Seite gleich.

## Anti-Ziele

1. **Nicht wie gynpraxisbonn.de.** Sie ist die Referenz, nicht das Ziel. Kein Pink,
   keine Systemschrift, kein Popup beim Laden.
2. **Nicht wie ein Wellness-Studio.** Kein Bambus, keine Steine, keine Kerzen, kein
   Verlauf von Türkis nach Grün. Salbei ist eine Wandfarbe, kein Spa-Signal.
3. **Nicht wie eine Klinik.** Kein Blau, keine Kreuze, keine Stethoskope, keine
   Stockfotos von Händen auf Schultern.

## Was echt sein muss — und was nicht

**Die Praxis existiert noch nicht.** Sie wird gerade gebaut und öffnet am 11. Es gibt
keine Innenaufnahmen, und es wird sie vor dem Start nicht geben.

| | |
|---|---|
| **Muss echt sein** | Ihr Porträt. Später: die Praxisräume, das Team, die Ladenfront. |
| **Darf erzeugt werden** | Material- und Lichtstudien ohne erkennbaren Ort: Kalkputz im Streiflicht, Leinengewebe, eine salbeigrün gestrichene Wandkante, Tageslicht auf hellem Boden. |
| **Darf NIEMALS erzeugt werden** | Ein Behandlungsraum, ein Wartezimmer, eine Praxisfront, ein Mensch. Ein erfundener Raum ist eine Aussage über einen Ort, den eine Patientin betreten wird. |

**Der Tausch ist eingeplant, nicht nachgereicht:** die Materialstudien sitzen in
denselben Slots, in die nach der Eröffnung die echten Fotos kommen. Gleiche Masse,
gleiche Position — ein Dateitausch, kein Umbau.

## Die Seiten

Ihre sechs Menüpunkte, gegen den Bestand des Repos geprüft:

| Ihr Wunsch | Adresse | Stand |
|---|---|---|
| **Startseite** | `/` | steht |
| Team | `/team/` | steht |
| Leistungen | `/leistungen/` | steht |
| Praxis | `/praxis/` | steht — Anfahrt zieht aus |
| Aktuelles | `/aktuelles/` | steht |
| Öffnungszeiten/Termine | `/termin/` | steht — Öffnungszeiten kommen dazu |
| **Kontakt/Anfahrt** | `/kontakt/` | **neu** — zieht aus `/praxis/` aus |

Ihre Leistungen, wörtlich: **Schwangerschaft · Krebsvorsorge · Verhütung ·
Kinderwunschberatung · Mädelssprechstunde**, dazu **Impfungen und kleine ästhetische
Botoxbehandlungen** als „weitere Leistungen".

„Mädelssprechstunde" ist ihr Wort und bleibt so stehen. Es ist der einzige Begriff auf
der ganzen Seite, den keine andere Praxis in Erkelenz benutzt.

## Was sie selbst pflegt

Drei Bereiche — sie hat sie selbst aufgezählt, und es sind genau die drei:

| Bereich | ihre Worte |
|---|---|
| **`team`** | „mal ein Foto bei Personalwechsel" |
| **`aktuelles`** | „Aktuelles" |
| **`zeiten`** | „ggf. Änderungen der Öffnungszeiten" |

Sie hat ausdrücklich gefragt: *„Könntest du mir dann zeigen, wie man z. B. ein Foto
ändert?"* Die Antwort ist ja, und deshalb muss jedes Bildfeld ein **Pflichtfeld für die
Bildbeschreibung** daneben haben — sonst baut sie beim ersten Tausch eine Barriere ein,
ohne es zu merken.

**Kein Doctolib.** Sie startet ohne und nimmt es „ggf. später" dazu. Der Terminbereich
wird so gebaut, dass ein Doctolib-Knopf später eine Zeile ist und kein Umbau.

---

## Wenn geändert wird

Amendieren ist erlaubt. Amendieren **ohne dieses Dokument zu ändern** heisst, dass
spätere Sektionen von früheren abdriften — und genau diese Drift lässt eine Seite
billig aussehen.

---

## Amendements aus dem Bau vom 15.08.2026

Acht Entscheidungen, die beim Bauen fielen und die diese Datei sonst überholt
hätten. Amendieren ohne das Dokument zu ändern ist die Drift, die eine Seite
billig aussehen lässt — deshalb stehen sie hier.

**1 · Rollennamen für Salbei.** Die Tokens heissen weiterhin `--salbei` und
`--salbei-tief`, aber im Code wird ausschliesslich mit `--flaeche-salbei` und
`--signal` gearbeitet. Grund: `color: var(--flaeche-salbei)` liest sich im Moment
des Tippens falsch. Der Name trägt die Regel, nicht ein Kommentar.

**2 · Der Porträt-Slot ist 3:4 und trägt eine Markierung.** Solange
`praxis.portraet` leer ist, hält die Materialstudie exakt dessen Platz, und im
Bild steht sichtbar „Porträt folgt". Beides verschwindet mit dem Eintragen des
echten Bildes — es gibt keinen zweiten Handgriff.

**3 · Kein `max-height` auf dem Hero-Bild.** Zusammen mit `aspect-ratio` löst der
Browser das über die BREITE auf; bei 1440px blieben 111px Papier neben dem Bild
stehen und „randlos bis an die Kante" war weg. Gefüllt wird stattdessen die
linke Spalte.

**4 · Der Einleitungstext steht IM Hero**, in der linken Spalte unter den beiden
Zeilen — nicht in einer eigenen Sektion darunter. In ihrer Aufzählung gehört er
zum Foto („Foto von ihr + kurzer Einleitungstext"), und er füllt genau den Platz,
den das hohe Porträtformat rechts aufmacht.

**5 · Die Wortmarke lautet „Praxis für Frauenheilkunde"**, bis Name oder Logo
feststehen. Kein erfundener Eigenname (der stünde auf jeder Seite und würde beim
Ausrollen übersehen) und kein leerer Kasten mit „LOGO". `Marke.tsx` rendert ein
`<img>`, sobald `praxis.logo` gesetzt ist.

**6 · `/leistungen/` trägt je EINEN Absatz**, nicht drei. Mit drei waren es 9,2
Bildschirmhöhen am Handy. Nach dem Verdichten sind es **8,2** — 0,2 über der
Grenze von 8, und das bleibt so: weiter zu kürzen hiesse, ihre Leistungstexte zu
kürzen. Die Startseite liegt bei 7,4 (Handy) und 5,4 (Rechner).

**7 · Die Zieh-Galerie beginnt bündig mit der Überschrift**, nicht am
Bildschirmrand, und ist nur rechts angeschnitten. Mit Anschnitt auf beiden Seiten
begann die erste Kachel bei 1440px 96px weiter links als Titel und
Fortschrittsbalken — drei Kanten, drei Positionen.

**8 · `main { min-height: 100svh }`.** Ohne das steht die Fusszeile für einen
Moment 145px unter der Kopfzeile, weil der Seiteninhalt als eigenes Bündel
nachlädt. Gemessen mit `engine/pruefen.mjs` bei 1,6 Mbit: **CLS 0,801**. Mit der
reservierten Höhe: **0,000** auf allen sieben Seiten.

**Was NICHT gebaut wurde und warum:** kein Video (die Direktion trägt ohne, und
auf einer Arztseite ist es Aufwand ohne Wirkung), kein Bild aus `media-raw/` als
Raum, kein erzeugter Mensch. Higgsfield-Verbrauch: **13 von 60 Credits**,
ausschliesslich `nano_banana_pro`.
