# frauenaerztin-web

Website einer frauenärztlichen Einzelpraxis (Neugründung, über Simon vermittelt).
finesite-Kunde, bespoke-Weg.

> ⚠️ **Praxisname, Logo, Ort, Sprechzeiten, Kammer/KV und Terminweg sind noch offen.**
> Das Repo heißt vorläufig `frauenaerztin-web` und wird umbenannt, sobald der echte
> Name feststeht. Alle Kundendaten liegen gebündelt in `src/praxis.config.ts`,
> jeder Platzhalter mit `TODO Kunde`.

## Loslegen

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
```

Die Schriften liegen fertig in `public/fonts/` und gehören ins Repo.
`npm run fonts` erzeugt sie neu aus `node_modules` (Subsetting, siehe unten) —
nur nötig, wenn sich Zeichensatz oder Achsen ändern.

## Wo was liegt

| | |
|---|---|
| `BUILD-PROMPT.md` | **Der Build-Prompt.** Ging als ein Stück in eine frische Opus-5-Session. |
| `src/praxis.config.ts` | Sämtliche Kundendaten. Einzige Stelle. |
| `src/styles/tokens.css` | Farbe, Grad, Abstand, Zeit. Einzige Stelle. |
| `src/components/` | Eine Mappe je Sektion, CSS daneben. |
| `src/components/showpiece/` | „Der Besuch": Grundriss in Three.js, Liste als Rückfall. |
| `src/legal/` | Impressum und Datenschutz als eigene Vite-Einstiege. |
| `public/media/` | Higgsfield-Assets, siehe `docs/MEDIA.md`. |
| `scripts/` | Schrift-Subsetting und die drei QA-Läufe. |

## Sichtprüfung

Bei laufendem `npm run dev`:

```bash
npm run qa -- http://localhost:5173 qa          # 1440/1024/768/375 + reduced motion
npm run qa:a11y -- http://localhost:5173        # Tastaturweg, Fokus, Kontraste
npm run qa:showpiece -- http://localhost:5173 qa-showpiece
```

`qa.mjs` meldet waagerechtes Scrollen, Bilder ohne Maße, mehr als eine `h1` und
Konsolenfehler und legt Screenshots ab. `qa-a11y.mjs` misst Kontraste an den
gerenderten Farben — auch das Glaspanel über dem Hero-Video, wo sich der
Hintergrund nicht aus CSS ableiten lässt. Braucht Google Chrome und
`playwright-core` (beides bereits als devDependency bzw. lokal vorhanden).

## Stack

React + Vite + TypeScript · GSAP + ScrollTrigger · Lenis · Framer Motion via
LazyMotion · Three.js **nur** für das Showpiece, dynamisch importiert, erst ab
900 px. Keine React-Component-Libraries. Desktop-first, 1440 px.

**Gemessen nach `npm run build`** (gzip):

| | Ist | Budget |
|---|---|---|
| JS Startseite ohne Three.js | ~135 kB | < 150 kB |
| Three.js-Chunk (nachgeladen) | ~129 kB | separat |
| CSS Startseite | ~8 kB | < 30 kB |
| Schriften | 90 kB + 14 kB vorgeladen | — |

## Abweichungen vom Build-Prompt

Drei Stellen weichen bewusst ab. Jede lässt sich zurückdrehen.

1. **Kein Tailwind.** Das Layout ist durchgehend eigenes Grid auf Tokens; am
   Ende kam keine einzige Utility-Klasse zum Einsatz. Mitgeliefertes Preflight
   ohne Nutzung wären rund 10 kB CSS für nichts gewesen. Der Reset steht
   stattdessen in `src/styles/global.css`.
2. **Wandhöhe im Grundriss: 20 cm statt 6 cm.** Bei der Kameradistanz, aus der
   man den Grundriss überhaupt als Grundriss liest, sind 6 cm rund 4 px hoch —
   die Türöffnungen verschwinden, und genau die sind die Information. Begründung
   steht an der Konstante in `src/components/showpiece/grundriss.ts`.
3. **`--clay-glas` als zusätzlicher Token.** Transmission dunkelt jede Farbe ab;
   `--clay` kippt im Milchglas ins Braune. Der Token ist dieselbe Farbe, für
   diesen einen Zweck aufgehellt, und wird nirgends sonst benutzt.

Dazu zwei Korrekturen an den Assets:

- Der Hero-Clip hatte links und rechts je 104 px Schwarz einkodiert
  (3:2-Bild in 16:9-Container). Weggeschnitten, siehe `docs/MEDIA.md`.
- Fraunces liegt als variable Datei mit vier Achsen vor. WONK ist festgenagelt
  und der Zeichensatz auf deutschen Fließtext reduziert: 118 kB → 90 kB, ohne
  dass opsz, wght oder SOFT verloren gehen (`scripts/copy-fonts.mjs`).

## Vor dem Livegang

- [ ] `src/praxis.config.ts` vollständig ausfüllen — jede Stelle mit `TODO Kunde`.
- [ ] Impressum und Datenschutz sind **Gerüste**. Die offenen Stellen sind auf
      den Seiten gelb markiert. Anwaltlich prüfen lassen, nicht selbst ergänzen.
- [ ] Formular-Endpunkt (EU-Hosting, Auftragsverarbeitungsvertrag) eintragen.
      Solange `formularEndpunkt` null ist, nimmt das Formular nichts entgegen
      und verweist sichtbar auf das Telefon.
- [ ] Koordinaten eintragen, sonst erscheint statt der Karte nur die Anschrift.
- [ ] Räume: entweder durch echte Fotos ersetzen oder den Hinweis in der
      Fußzeile stehen lassen.
- [ ] Die Demo-Rufnummer `0000 · 00 00 00` ist absichtlich nicht wählbar.

## Recht (Heilberuf — vorgelagert, nicht nachgereicht)

- **Kein Gesundheitsdaten-Formular.** Rückrufformular ohne Freitextfeld „Ihr
  Anliegen" — das wäre bereits ein Art.-9-Datum. Erhoben werden Name,
  Telefonnummer, Wunschzeitraum, mehr nicht.
- HWG + Berufsordnung: keine Heilversprechen, keine Superlative, keine
  vergleichende Werbung.
- Fonts selbst gehostet, kein Google-CDN. Karte nur nach Consent-Klick, davor
  kein einziger Request an einen fremden Server.
- Impressum nach § 5 DDG **plus** Berufsbezeichnung, Staat der Verleihung,
  zuständige Ärztekammer, zuständige KV, Link zur Berufsordnung,
  Berufshaftpflicht nach § 2 DL-InfoV.
- Die generierten Räume zeigen **nicht** die reale Praxis. Vor Go-live durch echte
  Fotos ersetzen oder als Visualisierung kennzeichnen (Hinweis steht in der
  Fußzeile und im Impressum).

## Werkstatt-Akte

Die Intake-, Asset- und Deploy-Unterlagen liegen **nicht** hier, sondern in der
Factory: `~/dev/website-factory/clients/frauenaerztin/`

| Datei | Inhalt |
|---|---|
| `intake.md` | Modus A, die 6 Slots mit Begründung, Bild-These, Rechts-Auflagen |
| `assets.md` | Generierungsplan, Modellwahl, Credit-Budget, Ist-Verbrauch |
| `deploy.md` | Deploy-Modus, Preview-Stop, Go-live-Checkliste |
