# frauenaerztin-web

Website einer frauenärztlichen Einzelpraxis (Neugründung, über Simon vermittelt).
finesite-Kunde, bespoke-Weg.

> ⚠️ **Praxisname, Logo, Ort, Sprechzeiten, Kammer/KV und Terminweg sind noch offen.**
> Das Repo heißt vorläufig `frauenaerztin-web` und wird umbenannt, sobald der echte
> Name feststeht. Alle Kundendaten liegen gebündelt in `src/praxis.config.ts`,
> jeder Platzhalter mit `/* TODO Kunde */`.

## Wo was liegt

| | |
|---|---|
| `BUILD-PROMPT.md` | **Der Build-Prompt.** Geht als ein Stück in eine frische Opus-5-Session. |
| `public/media/` | Higgsfield-Assets (noch leer — siehe Blocker unten) |
| `src/praxis.config.ts` | Sämtliche Kundendaten. Einzige Stelle. |
| `docs/` | Bild-Direktion, Entscheidungen |

## Werkstatt-Akte

Die Intake-, Asset- und Deploy-Unterlagen liegen **nicht** hier, sondern in der
Factory: `~/dev/website-factory/clients/frauenaerztin/`

| Datei | Inhalt |
|---|---|
| `intake.md` | Modus A, die 6 Slots mit Begründung, Bild-These, Rechts-Auflagen |
| `assets.md` | Generierungsplan, Modellwahl, Credit-Budget, Ist-Verbrauch |
| `deploy.md` | Deploy-Modus, Preview-Stop, Go-live-Checkliste |

## Stand 2026-07-29

**Blockiert.** Der Higgsfield-Connector (`karol@sippin.eu`) ist abgelaufen:
`balance` und `generate_image` liefern 401, auch mit `get_cost: true`.
Ohne Assets kein Build — die Seite wird um echte Bilder herum gebaut, nicht um
Platzhalter.

Nach dem Reauth: Phase 4 (Assets) → Phase 5 (Build) laut `BUILD-PROMPT.md`.

## Stack (geplant)

React + Vite + TypeScript · Tailwind (Layout) · GSAP + ScrollTrigger · Lenis ·
Framer Motion via LazyMotion · Three.js **nur** für das Showpiece, dynamisch
importiert, erst ab 900 px.

Keine React-Component-Libraries. Desktop-first, 1440 px.
Budget: < 150 kb JS gzipped ohne den Three.js-Chunk, < 30 kb CSS.

## Recht (Heilberuf — vorgelagert, nicht nachgereicht)

- **Kein Gesundheitsdaten-Formular.** Rückrufformular ohne Freitextfeld „Ihr
  Anliegen" — das wäre bereits ein Art.-9-Datum.
- HWG + Berufsordnung: keine Heilversprechen, keine Superlative, keine
  vergleichende Werbung.
- Fonts selbst gehostet, kein Google-CDN. Karte nur nach Consent.
- Impressum nach § 5 DDG **plus** Berufsbezeichnung, Staat der Verleihung,
  zuständige Ärztekammer, zuständige KV, Link zur Berufsordnung.
- Die generierten Räume zeigen **nicht** die reale Praxis. Vor Go-live durch echte
  Fotos ersetzen oder als Visualisierung kennzeichnen.
