// Helpers para imágenes Open Graph generadas con next/og (Satori).

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700;
  style: "normal";
};

// Satori solo acepta ttf/otf/woff. Google Fonts devuelve truetype cuando se
// pide sin user-agent de navegador; `text` limita el subset a lo que se dibuja.
export async function loadGoogleFont(
  family: string,
  weight: OgFont["weight"],
  text: string,
): Promise<OgFont | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`,
      { cache: "force-cache" },
    ).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;

    const res = await fetch(src[1], { cache: "force-cache" });
    if (!res.ok) return null;
    return {
      name: family,
      data: await res.arrayBuffer(),
      weight,
      style: "normal",
    };
  } catch {
    return null;
  }
}

const SATORI_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Descarga la imagen y la incrusta como data URI, validando antes el formato:
// webp/avif no los soporta Satori → null (layout sin imagen).
export async function toImageDataUri(
  url: string | undefined,
): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    const type = res.headers.get("content-type")?.split(";")[0] ?? "";
    if (!res.ok || !SATORI_IMAGE_TYPES.includes(type)) return null;
    const base64 = Buffer.from(await res.arrayBuffer()).toString("base64");
    return `data:${type};base64,${base64}`;
  } catch {
    return null;
  }
}

// Texto blanco o tinta según la luminancia del color de marca del tenant.
export function readableTextOn(hex: string): string {
  const match = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!match) return "#ffffff";
  const n = parseInt(match[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1a1a1a" : "#ffffff";
}

export function formatPrice(amount: number): string {
  const value = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `S/ ${value}`;
}
