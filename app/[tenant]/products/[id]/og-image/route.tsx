import { ImageResponse } from "next/og";
import { getTenantBranding } from "@/lib/api/tenants";
import { getTenantRawProduct } from "@/lib/api/products";
import { getPrimaryImageKey } from "@/lib/adapters/product-adapter";
import { resolveImageUrl } from "@/lib/api/storage";
import { formatPrice, loadGoogleFont, toImageDataUri } from "@/lib/og/assets";
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

// Preview Open Graph de un producto: misma composición que colecciones (foto a
// todo el ancho, etiqueta en el margen, marca en píldora), con el precio como
// dato principal tras el divisor.

function nameFontSize(name: string): number {
  if (name.length <= 18) return 56;
  if (name.length <= 32) return 46;
  return 40;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ tenant: string; id: string }> },
) {
  const { tenant, id } = await params;
  const product = await getTenantRawProduct(tenant, id);
  if (!product) return new Response("Not found", { status: 404 });

  const branding = await getTenantBranding(tenant);
  const storeName = branding.name;

  const name = truncate(product.name, 56);
  const category = product.category?.[0]?.name?.toUpperCase() ?? "PRODUCTO";
  const price = formatPrice(product.basePrice);

  const [photo, logo, playfair, dmSansMedium, dmSansBold] = await Promise.all([
    resolveImageUrl(getPrimaryImageKey(product.images)).then(toImageDataUri),
    toImageDataUri(branding.logoUrl),
    loadGoogleFont("Playfair Display", 700, name),
    loadGoogleFont("DM Sans", 500, category),
    loadGoogleFont("DM Sans", 700, `${price}${storeName ?? ""}`),
  ]);
  const fonts = [playfair, dmSansMedium, dmSansBold].filter((f) => f !== null);

  return new ImageResponse(
    <OgCanvas>
      {photo && <OgPhoto src={photo} />}
      {storeName && (
        <StoreBrand
          name={storeName}
          logoSrc={logo}
          logoEmoji={branding.logoEmoji}
        />
      )}
      <HangingTag
        left={tagLeft(Boolean(photo))}
        colors={tagColors(branding.primaryColor)}
        label={category}
        title={name}
        titleSize={nameFontSize(name)}
        detail={price}
        detailStyle={{ fontSize: 44, fontWeight: 700 }}
        overPhoto={Boolean(photo)}
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
