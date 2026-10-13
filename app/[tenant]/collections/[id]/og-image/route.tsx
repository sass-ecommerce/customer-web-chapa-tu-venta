import { ImageResponse } from "next/og";
import { getTenantBranding } from "@/lib/api/tenants";
import { getTenantCollection } from "@/lib/api/collections";
import { loadGoogleFont, toImageDataUri } from "@/lib/og/assets";
import {
  HangingTag,
  OG_CACHE_HEADERS,
  OG_SIZE,
  OgCanvas,
  OgPhoto,
  StoreBrand,
  tagColors,
  tagLeft,
  truncate,
} from "@/lib/og/hanging-tag";

// Preview Open Graph de una colección: portada a todo el ancho, etiqueta
// colgante en el margen izquierdo y la marca del tenant en una píldora debajo.

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

  const branding = await getTenantBranding(tenant);
  const storeName = branding.name;

  const name = truncate(collection.name, 48);
  const count = collection.productCount;
  const countLabel = count
    ? `${count} ${count === 1 ? "producto" : "productos"}`
    : null;

  const [cover, logo, playfair, dmSansMedium, dmSansBold] = await Promise.all([
    toImageDataUri(collection.coverImageUrl),
    toImageDataUri(branding.logoUrl),
    loadGoogleFont("Playfair Display", 700, name),
    loadGoogleFont("DM Sans", 500, `COLECCIÓN${countLabel ?? ""}`),
    loadGoogleFont("DM Sans", 700, storeName ?? ""),
  ]);
  const fonts = [playfair, dmSansMedium, dmSansBold].filter((f) => f !== null);

  return new ImageResponse(
    <OgCanvas>
      {cover && <OgPhoto src={cover} />}
      {storeName && (
        <StoreBrand
          name={storeName}
          logoSrc={logo}
          logoEmoji={branding.logoEmoji}
        />
      )}
      <HangingTag
        left={tagLeft(Boolean(cover))}
        colors={tagColors(branding.primaryColor)}
        label="COLECCIÓN"
        title={name}
        titleSize={nameFontSize(name)}
        detail={countLabel}
        overPhoto={Boolean(cover)}
      />
    </OgCanvas>,
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
      emoji: "twemoji",
      headers: OG_CACHE_HEADERS,
    },
  );
}
