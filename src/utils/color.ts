/**
 * Generates an array of hex colour strings that form a gradient of blue shades.
 * Lightness varies from 40% to 80% across the HSL colour wheel.
 */
export function generateBlueShades(count: number): string[] {
  const shades: string[] = [];
  for (let i = 0; i < count; i++) {
    const lightness = 40 + (40 * i) / Math.max(count - 1, 1);
    shades.push(hslToHex(210, 80, lightness));
  }
  return shades;
}

/**
 * Converts an HSL colour value to a hex string.
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1))),
    );
  return `#${f(0).toString(16).padStart(2, "0")}${f(8).toString(16).padStart(2, "0")}${f(4).toString(16).padStart(2, "0")}`;
}
