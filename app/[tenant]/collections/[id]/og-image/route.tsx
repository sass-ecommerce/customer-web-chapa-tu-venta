import { ImageResponse } from "next/og";
import { getTenantConfig } from "@/lib/config/tenants";
import { getTenantCollection } from "@/lib/api/collections";
import { loadGoogleFont, readableTextOn, toImageDataUri } from "@/lib/og/assets";

// Preview Open Graph de una colección: "vitrina + etiqueta". La etiqueta
// colgante cae sobre el borde de la portada y queda dentro del centro de
// 630px, que es lo que sobrevive al recorte cuadrado de WhatsApp.

const SIZE = { width: 1200, height: 630 };
const COVER_WIDTH = 760;
const TAG_WIDTH = 380;

const VITRINA = "#f5f6f7"; // --brand-bg
const INK = "#1a1a1a"; // --brand-dark
const INK_MUTED = "rgba(26, 26, 26, 0.55)";
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

function nameFontSize(name: string): number {
  if (name.length <= 16) return 64;
  if (name.length <= 28) return 52;
  return 42;
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ tenant: string; id: string }> },
) {
  const { tenant, id } = await params;
  const collection = await getTenantCollection(tenant, id);
  if (!collection) return new Response("Not found", { status: 404 });

  const config = getTenantConfig(tenant);
  const storeName = config?.name;
  const logo = config?.logo;
  const tagColor =
    config?.primaryColor && HEX_COLOR.test(config.primaryColor)
      ? config.primaryColor
      : INK;
  const tagText = readableTextOn(tagColor);

  const name = truncate(collection.name, 48);
  const count = collection.productCount;
  const countLabel = count
    ? `${count} ${count === 1 ? "producto" : "productos"}`
    : null;

  const [cover, playfair, dmSansMedium, dmSansBold] = await Promise.all([
    toImageDataUri(collection.coverImageUrl),
    loadGoogleFont("Playfair Display", 700, name),
    loadGoogleFont("DM Sans", 500, `COLECCIÓN${countLabel ?? ""}`),
    loadGoogleFont("DM Sans", 700, storeName ?? ""),
  ]);
  const fonts = [playfair, dmSansMedium, dmSansBold].filter((f) => f !== null);

  // Sin portada la etiqueta se centra; con portada cuelga sobre su borde.
  const tagLeft = cover
    ? SIZE.width - COVER_WIDTH - TAG_WIDTH / 2
    : (SIZE.width - TAG_WIDTH) / 2;

  return new ImageResponse(
    (
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
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            width={COVER_WIDTH}
            height={SIZE.height}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: COVER_WIDTH,
              height: SIZE.height,
              objectFit: "cover",
            }}
          />
        )}

        {storeName && (
          <div
            style={{
              position: "absolute",
              top: 48,
              left: 56,
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            {logo && !logo.startsWith("http") && (
              <span style={{ fontSize: 34 }}>{logo}</span>
            )}
            <span>{storeName}</span>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: tagLeft,
            width: TAG_WIDTH,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "rotate(-4deg)",
            transformOrigin: "top center",
          }}
        >
          {/* Cordel del que cuelga la etiqueta */}
          <div
            style={{
              width: 2,
              height: 104,
              backgroundColor: "rgba(26, 26, 26, 0.35)",
            }}
          />
          <div
            style={{
              width: TAG_WIDTH,
              display: "flex",
              flexDirection: "column",
              padding: "28px 40px 40px",
              borderRadius: 22,
              backgroundColor: tagColor,
              color: tagText,
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
              COLECCIÓN
            </span>
            <span
              style={{
                marginTop: 12,
                fontFamily: "Playfair Display",
                fontSize: nameFontSize(name),
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              {name}
            </span>
            {countLabel && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 28,
                  paddingTop: 20,
                  borderTop: `2px dashed ${tagText === INK ? INK_MUTED : "rgba(255, 255, 255, 0.35)"}`,
                  fontSize: 26,
                  fontWeight: 500,
                }}
              >
                {countLabel}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: fonts.length ? fonts : undefined,
      emoji: "twemoji",
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
