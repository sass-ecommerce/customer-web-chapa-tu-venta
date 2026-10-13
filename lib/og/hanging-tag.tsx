// Piezas compartidas del estilo "vitrina + etiqueta" para imágenes Open Graph
// (ver .interface-design/system.md). Solo JSX compatible con Satori.

import type { ReactNode } from "react";
import { readableTextOn } from "@/lib/og/assets";

export const OG_SIZE = { width: 1200, height: 630 };
export const TAG_WIDTH = 380;
// Margen izquierdo compartido por la etiqueta y la marca. Con foto, la
// etiqueta cuelga aquí para dejar libre el resto de la imagen.
export const EDGE = 56;

// Con foto la etiqueta cuelga del margen; sin foto se centra en la vitrina.
export function tagLeft(hasPhoto: boolean): number {
  return hasPhoto ? EDGE : (OG_SIZE.width - TAG_WIDTH) / 2;
}

export const VITRINA = "#f5f6f7"; // --brand-bg
export const INK = "#1a1a1a"; // --brand-dark
const INK_MUTED = "rgba(26, 26, 26, 0.55)";
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export const OG_CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
};

export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export function tagColors(primaryColor?: string) {
  const background =
    primaryColor && HEX_COLOR.test(primaryColor) ? primaryColor : INK;
  return { background, text: readableTextOn(background) };
}

export function OgCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: VITRINA,
        fontFamily: "DM Sans",
        color: INK,
      }}
    >
      {children}
    </div>
  );
}

// La foto siempre ocupa todo el lienzo: es lo que el comprador quiere ver.
export function OgPhoto({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={OG_SIZE.width}
      height={OG_SIZE.height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        objectFit: "cover",
      }}
    />
  );
}

// Píldora blanca con la marca del tenant, abajo a la izquierda bajo la
// etiqueta: se lee sobre cualquier foto. Logo como imagen (subido desde la
// app) o, como respaldo, el emoji del TenantConfig.
export function StoreBrand({
  name,
  logoSrc,
  logoEmoji,
}: {
  name: string;
  logoSrc?: string | null;
  logoEmoji?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: EDGE,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: logoSrc || logoEmoji ? "8px 22px 8px 8px" : "14px 22px",
        borderRadius: 999,
        backgroundColor: "#ffffff",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.16)",
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: -0.3,
      }}
    >
      {logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoSrc}
          alt=""
          width={44}
          height={44}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            objectFit: "cover",
            border: "1px solid rgba(26, 26, 26, 0.08)",
          }}
        />
      ) : (
        logoEmoji && (
          <span style={{ fontSize: 30, paddingLeft: 6 }}>{logoEmoji}</span>
        )
      )}
      <span>{name}</span>
    </div>
  );
}

// Etiqueta colgante: cordel + ojal, label en mayúsculas, título en Playfair y
// un dato secundario tras un divisor punteado.
export function HangingTag({
  left,
  colors,
  label,
  title,
  titleSize,
  detail,
  detailStyle,
  overPhoto = false,
}: {
  left: number;
  // Sobre la foto el cordel va claro con contorno oscuro: se ve en cualquier imagen.
  overPhoto?: boolean;
  colors: { background: string; text: string };
  label: string;
  title: string;
  titleSize: number;
  detail?: string | null;
  detailStyle?: { fontSize: number; fontWeight: 500 | 700 };
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left,
        width: TAG_WIDTH,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Cordel del que cuelga la etiqueta */}
      <div
        style={{
          display: "flex",
          flexShrink: 0,
          width: 2,
          height: 104,
          backgroundColor: overPhoto
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(26, 26, 26, 0.35)",
          boxShadow: overPhoto ? "0 0 0 1px rgba(0, 0, 0, 0.35)" : undefined,
        }}
      />
      <div
        style={{
          width: TAG_WIDTH,
          display: "flex",
          flexDirection: "column",
          padding: "28px 40px 40px",
          borderRadius: 22,
          backgroundColor: colors.background,
          color: colors.text,
          transform: "rotate(-4deg)",
          transformOrigin: "50% 0",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.18)",
        }}
      >
        {/* Ojal */}
        <div
          style={{
            alignSelf: "center",
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: VITRINA,
            border: "3px solid rgba(255, 255, 255, 0.45)",
            marginBottom: 28,
          }}
        />
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 4,
            opacity: 0.7,
          }}
        >
          {label}
        </span>
        <span
          style={{
            marginTop: 12,
            fontFamily: "Playfair Display",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {title}
        </span>
        {detail && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              paddingTop: 20,
              borderTop: `2px dashed ${colors.text === INK ? INK_MUTED : "rgba(255, 255, 255, 0.35)"}`,
              fontSize: detailStyle?.fontSize ?? 26,
              fontWeight: detailStyle?.fontWeight ?? 500,
            }}
          >
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}
