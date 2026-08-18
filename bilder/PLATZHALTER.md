# Die Bilder dieser Seite — was echt ist und was getauscht wird

> **Die Dateien liegen in `public/bilder/`.** Diese Beschreibung liegt bewusst
> daneben und nicht dazwischen: alles unter `public/` wird beim Bauen unverändert
> ausgeliefert, und eine interne Notiz gehört nicht auf den Webserver.

**Stand: 15.08.2026**

Die Praxis existiert baulich noch nicht und ist nicht fotografiert. Es gibt deshalb
**kein einziges echtes Bild** dieser Praxis auf der Seite.

Was hier liegt, sind **Material- und Lichtstudien ohne erkennbaren Ort**: Kalkputz,
Leinen, Licht auf hellem Boden, eine salbeigrün gestrichene Wandkante. Sie sind mit
`nano_banana_pro` erzeugt (13 Credits, 15.08.2026) und alle vier Varianten stammen per
image-to-image aus **derselben Vorlage** — deshalb stimmen Lichtrichtung,
Farbtemperatur und Materialkörnung über alle Bilder hinweg überein.

## Was niemals erzeugt wurde und niemals erzeugt werden darf

Ein Behandlungsraum · ein Wartezimmer · eine Praxisfront · **ein Mensch.**

Ein erfundener Raum ist eine Aussage über einen Ort, den eine Patientin betreten wird.
Wer nach der Eröffnung ein „passenderes" Wartezimmer generieren lässt, weil das echte
Foto noch fehlt, hat der Patientin etwas versprochen, das es nicht gibt.

## Die Slots

Jede Studie sitzt in genau dem Slot, in den nach der Eröffnung das echte Foto kommt.
**Gleiche Masse, gleiche Position — ein Dateitausch, kein Umbau.** Namen nicht ändern.

| Datei | Format | steht wo | wird ersetzt durch | Aufnahmehinweis |
|---|---|---|---|---|
| `hero.webp` | 3:2 (im Hero auf 3:4 beschnitten) | Startseite, rechte Hälfte des Heros | **Das Porträt der Ärztin.** Das einzige Bild, das echt sein *muss*. | siehe unten |
| `praxis-01.webp` | 4:3 | /praxis/, Zieh-Galerie, 1. Kachel | Empfang oder Flur | Querformat, Tageslicht von links, nichts herumstehen lassen |
| `praxis-02.webp` | 2:3 | /praxis/, Zieh-Galerie, 2. Kachel | ein Detail (Material, Möbelkante, Licht) | Hochformat — die schmale Kachel gibt der Reihe ihren Rhythmus |
| `praxis-03.webp` | 16:9 | /praxis/, Zieh-Galerie, 3. Kachel | Sprechzimmer oder Behandlungsraum | Breitformat, von der Tür aus |
| `praxis-04.webp` | 3:2 | /praxis/, Zieh-Galerie, 4. Kachel | Wartebereich | Querformat |
| `salbei.webp` | freigestellt, transparent | Startseite, neben der Leistungsliste | **wird nicht ersetzt** — es ist kein Praxisfoto | — |

`salbei.webp` kommt auf der ganzen Seite **genau einmal** vor. Nicht wiederholen: ein
Motiv, das dreimal auftaucht, wird Dekor.

## Das Porträt — Aufnahmehinweis

Es ist das einzige Bild dieser Seite, das echt sein **muss**, und das einzige, das die
Startseite blockiert. Solange es fehlt, steht im Hero eine Materialstudie mit der
sichtbaren Markierung **„Porträt folgt"**.

**So aufnehmen:**

- **Hochformat 3 : 4**, mindestens 1200 px breit
- **Tageslicht von links** — dieselbe Richtung wie auf jedem anderen Bild der Seite.
  Ein Porträt mit Licht von rechts fällt sofort auf, auch wenn niemand sagen kann warum
- **Ruhiger, heller Hintergrund.** Eine weisse oder beige Wand genügt
- **Blick zur Kamera.** Sie muss nicht lächeln
- **Kittel optional** — sie kann tragen, was sie in der Praxis trägt
- **Kein Gegenlicht**, kein Blitz, kein Studioweiss
- **Keine Praxisumgebung**: die gibt es noch nicht, und ein Porträt in einem fremden
  Behandlungsraum ist genau die Aussage, die diese Seite überall vermeidet

**So eintragen:** Datei nach `public/bilder/` legen und in `src/praxis.config.ts` unter
`praxis.portraet` `src` und `alt` setzen. Damit verschwindet die Markierung „Porträt
folgt" automatisch — es gibt keinen zweiten Handgriff, den man vergessen könnte.

## Das Logo

Sie schrieb: *„Logo: ist hoffentlich bald fertig, würde ich dir zukommen lassen, sobald
es final steht."* Bis dahin steht in der Kopfzeile, im Hero und in der Fusszeile eine
gesetzte **Wortmarke aus Fraunces** — kein leerer Kasten. Sobald das Logo da ist:
`praxis.logo` in `src/praxis.config.ts` setzen (`src`, `alt`, `breite`, `hoehe`), dann
rendert `Marke.tsx` überall ein `<img>` statt des Textes. Eine Zeile, kein Umbau.

## Der Altbestand in `media-raw/`

Dort liegen 37 Bilder aus dem ersten Bau, darunter **erzeugte Praxisräume**
(`A1-anmeldung`, `A2-warten`, `A3-untersuchung`, `A4-flur`, `A5-tisch`, `A6-paravent`).
Sie sind handwerklich gut und treffen den Farbwunsch fast wörtlich — und genau deshalb
gefährlich.

**Kein Bild daraus wird als Raum dieser Praxis gezeigt.** Nicht in der Galerie, nicht im
Hero, nicht als Hintergrund. Die Praxis wird noch gebaut; ein erzeugter Raum wäre eine
Aussage über einen Ort, den eine Patientin betreten wird.

Keines der Bilder aus `media-raw/` ist im aktuellen Stand im Einsatz — geprüft mit:

```bash
grep -rnE "A[1-6]-(anmeldung|warten|untersuchung|flur|tisch|paravent)" src/ public/
```

## Beim Tausch zu tun

1. Neues Bild als **WebP** speichern, Qualität 70–80, lange Kante höchstens 1800 px.
2. **Denselben Dateinamen** verwenden und die Datei hier ersetzen.
3. Weicht das Seitenverhältnis ab, die Werte `breite`/`hoehe` anpassen:
   - Galerie: `src/components/praxis/ZiehGalerie.tsx`, Liste `KACHELN`
   - Hero: `src/components/start/Hero.tsx`
   Ohne das reserviert der Browser die falsche Höhe und der Text springt beim Laden.
4. **Die Bildbeschreibung anpassen.** Sie steht im selben Eintrag (`alt`) und beschreibt
   heute eine Materialstudie — nach dem Tausch beschreibt sie einen Raum. Eine
   Beschreibung, die nicht mehr stimmt, ist schlimmer als keine.
5. **Die Bildunterschrift anpassen** (`bildunterschrift`). Sie sagt heute ehrlich, dass
   eine Materialstudie zu sehen ist.
6. Auf `/praxis/` steht über der Galerie ein Absatz, der erklärt, dass die Praxis noch
   gebaut wird. **Der muss weg**, sobald echte Fotos drin sind.

## Fotos, die die Ärztin selbst pflegt

Team-Fotos laufen NICHT über diesen Ordner, sondern über die Redaktion:
`/bilder/team/`, gepflegt in `inhalt/team.json`. Dort ist die Bildbeschreibung ein
Pflichtfeld — ein Foto ohne Beschreibung ist für blinde Nutzerinnen nicht vorhanden,
und seit dem BFSG ist das bei Heilberufen kein Stilfehler mehr.
