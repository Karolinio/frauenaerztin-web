/**
 * OKLCH aus den Design-Tokens in lineares sRGB — damit die 3D-Szene dieselbe
 * Palette benutzt wie der Rest der Seite und keine Farbe doppelt gepflegt wird.
 *
 * THREE.Color kann kein oklch() lesen, deshalb hier die Umrechnung von Hand.
 * Die Matrizen stammen aus Björn Ottossons OKLab-Definition.
 */

export interface LinearRGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

const OKLCH = /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/i;

/** Liest ein Token wie `--paper-deep` und gibt lineares sRGB zurück. */
export function tokenAlsLinearRGB(token: string, wurzel: Element = document.documentElement): LinearRGB {
  const roh = getComputedStyle(wurzel).getPropertyValue(token).trim();
  const treffer = OKLCH.exec(roh);
  if (!treffer) {
    throw new Error(`Token ${token} ist kein oklch()-Wert, sondern "${roh}".`);
  }

  const [, lRoh = '0', prozent, cRoh = '0', hRoh = '0'] = treffer;
  const L = prozent === '%' ? Number(lRoh) / 100 : Number(lRoh);
  return oklchNachLinearRGB(L, Number(cRoh), Number(hRoh));
}

export function oklchNachLinearRGB(L: number, C: number, hGrad: number): LinearRGB {
  const h = (hGrad * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}
