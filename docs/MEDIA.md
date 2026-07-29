# Media-Manifest

Alle Assets liegen in `public/media/`. **Keine Platzhalter, nichts fehlt.**
Erzeugt am 2026-07-29 mit Higgsfield (`nano_banana_pro`, `veo3_1_lite`),
28 Credits. Rohdateien in `media-raw/` (gitignored).

## Bilder

Jedes Bild existiert als **AVIF** (ausliefern) und **JPEG** (Fallback), exakt gleiche
Maße. Immer mit `<picture>` ausliefern und `width`/`height` setzen — sonst CLS.

| Datei (ohne Endung) | Maße | AVIF | JPEG | Verwendung |
|---|---|---|---|---|
| `hero-sprechecke` | 2400×1610 | 60 KB | 237 KB | Hero-Standbild / Video-Fallback |
| `station-01-ankommen` | 1600×1074 | 21 KB | 94 KB | Showpiece Station 01 — Flur, offene Tür |
| `station-02-anmeldung` | 1600×1074 | 17 KB | 85 KB | Showpiece Station 02 — Tresen, Milchglas |
| `station-03-warten` | 1600×1074 | 21 KB | 98 KB | Showpiece Station 03 — drei Stühle am Fenster |
| `station-04-sprechen` | 1600×1074 | 34 KB | 122 KB | Showpiece Station 04 — die Sprechecke (= Master) |
| `station-05-untersuchen` | 1600×1074 | 21 KB | 99 KB | Showpiece Station 05 — Liege, Paravent, Ultraschall angeschnitten |
| `detail-tisch` | 1100×1366 | 28 KB | 94 KB | „Über mich" — Wasserglas und Notizbuch |
| `detail-paravent` | 1100×1366 | 82 KB | 199 KB | Sektionsübergang / Diskretion — Leinen im Gegenlicht |

```html
<picture>
  <source srcset="/media/station-04-sprechen.avif" type="image/avif">
  <img src="/media/station-04-sprechen.jpg" width="1600" height="1074"
       alt="…" loading="lazy" decoding="async">
</picture>
```

Hero abweichend: `loading="eager"` + `fetchpriority="high"`, alles andere `lazy`.

**Kein WebP.** AVIF deckt Chrome, Firefox und Safari ab 16 ab, JPEG den Rest.
WebP hätte nur Safari 14–15 zusätzlich bedient — den Aufwand nicht wert.

## Video

| Datei | Größe | Maße | Länge |
|---|---|---|---|
| `hero-loop.webm` (VP9) | 621 KB | 1072×720 | 16 s |
| `hero-loop.mp4` (H.264, faststart) | 1,0 MB | 1072×720 | 16 s |
| `hero-poster.jpg` | 53 KB | 1072×720 | — |

**Nachtrag 2026-07-29 (Build):** Veo hat das 3:2-Bild in einen 16:9-Container
gelegt und links und rechts je 104 px Schwarz einkodiert. Mit `object-fit: cover`
sah das nach Letterbox aus. Die Balken sind mit
`ffmpeg -vf crop=1072:720:104:0` weggeschnitten, Video und Poster neu kodiert.
Beim nächsten Veo-Clip vor der Optimierung `cropdetect` laufen lassen.

```html
<video autoplay muted loop playsinline preload="metadata"
       poster="/media/hero-poster.jpg" width="1072" height="720">
  <source src="/media/hero-loop.webm" type="video/webm">
  <source src="/media/hero-loop.mp4" type="video/mp4">
</video>
```

**Nie mit Scroll scrubben.** `currentTime` lesen ist erlaubt, schreiben nie.
Bei `prefers-reduced-motion: reduce` das Video gar nicht laden und stattdessen
`hero-sprechecke` zeigen.

### Warum der Clip 16 s lang ist, obwohl 8 s generiert wurden

Veo 3.1 Lite hat trotz ausdrücklicher Anweisung („absolutely locked-off camera,
no push-in, no zoom, first and last frame nearly identical") einen langsamen
**Push-in** eingebaut. Messung erstes gegen letztes Frame: **SSIM 0.70,
PSNR 16,8 dB** — der Loop hätte sichtbar gesprungen.

Statt neu zu generieren (8 Credits, kein garantiert besseres Ergebnis) ist der
Clip als **Ping-Pong** geschnitten: vorwärts, dann rückwärts. Die Naht ist damit
per Konstruktion unsichtbar, und der Push-in liest sich als ruhiges Ein- und
Ausatmen. Nachmessung: **SSIM 0.968, PSNR 39,3 dB** — der Rest ist reines
h264-Rauschen.

Beim nächsten Veo-Clip also gleich einplanen: entweder Ping-Pong schneiden oder
eine Bewegung wählen, die ohnehin zum Ausgangspunkt zurückkehrt.

## Bild-Direktion (gilt für jedes Nachgenerieren)

> Vormittag, 35 mm, einzige Lichtquelle ist ein hohes Sprossenfenster rechts,
> weiches kühles Nordlicht, Deckenlicht aus, dokumentarisch beobachtet,
> **kein Mensch im Bild**, matte Oberfläche mit feinem Filmkorn.
> Material: Salbeigrüner Kalkputz · heller Eichenboden · Leinen in Haferton ·
> helle Eiche für alle Möbel.

**Abbruchkriterium — neu generieren, wenn:** warmes Abendlicht · gelbes Kunstlicht ·
sichtbare Deckenspots · glänzendes Klinik-Weiß · Pastellrosa · Deko-Pflanzenwand ·
ein Mensch im Bild · Hochglanz-Werbeästhetik.

Ableitungen **immer** per image-to-image aus dem Master
(Job-ID `9b35395a-841e-43e9-8536-0642ceec0cab`, `medias[].role: "image"`),
nie frisch aus Text — sonst bricht die Konsistenz.

## ⚠️ Vor Go-live

Diese Räume sind **Visualisierungen**, nicht die reale Praxis. Vor dem Livegang
entweder durch echte Fotos ersetzen oder im Footer/Impressum kennzeichnen.
