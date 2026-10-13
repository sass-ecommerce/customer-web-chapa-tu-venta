import { ImageResponse } from "next/og";
import { getTenantConfig } from "@/lib/config/tenants";
import { getTenantCollection } from "@/lib/api/collections";
import { loadGoogleFont, toImageDataUri } from "@/lib/og/assets";
import {
  HangingTag,
  OG_CACHE_HEADERS,
  OG_SIZE,
  OgCanvas,
  OgPhoto,
  StoreBrand,
  TAG_HANG_OFFSET,
  TAG_WIDTH,
  tagColors,
  truncate,
} from "@/lib/og/hanging-tag";

// Preview Open Graph de una colección: "vitrina + etiqueta". La etiqueta
// colgante cae sobre el borde de la portada y queda dentro del centro de
// 630px, que es lo que sobrevive al recorte cuadrado de WhatsApp.

const COVER_WIDTH = 760;

function nameFontSize(name: string): number {
  if (name.length <= 16) return 64;
  if (name.length <= 28) return 52;
  return 42;
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
    ? OG_SIZE.width - COVER_WIDTH - TAG_WIDTH / 2 + TAG_HANG_OFFSET
    : (OG_SIZE.width - TAG_WIDTH) / 2;

  return new ImageResponse(
    (
      <OgCanvas>
        {cover && <OgPhoto src={cover} width={COVER_WIDTH} />}
        {storeName && <StoreBrand name={storeName} logo={config?.logo} />}
        <HangingTag
          left={tagLeft}
          colors={tagColors(config)}
          label="COLECCIÓN"
          title={name}
          titleSize={nameFontSize(name)}
          detail={countLabel}
          overPhoto={Boolean(cover)}
        />
      </OgCanvas>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
      emoji: "twemoji",
      headers: OG_CACHE_HEADERS,
    },
  );
}
