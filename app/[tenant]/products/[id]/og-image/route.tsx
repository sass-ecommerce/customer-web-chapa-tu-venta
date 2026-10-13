import { ImageResponse } from "next/og";
import { getTenantConfig } from "@/lib/config/tenants";
import { getTenantRawProduct } from "@/lib/api/products";
import { getPrimaryImageKey } from "@/lib/adapters/product-adapter";
import { resolveImageUrl } from "@/lib/api/storage";
import {
  formatPrice,
  loadGoogleFont,
  toImageDataUri,
} from "@/lib/og/assets";
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

// Preview Open Graph de un producto: misma etiqueta colgante que colecciones,
// pero con la foto en un cuadrado de 630px (las fotos de producto suelen ser
// cuadradas) y el precio como dato principal tras el divisor.
// Sin marca del tenant la foto ocupa todo el ancho para no dejar un panel vacío.

const SQUARE_PHOTO = OG_SIZE.height;
// Mismo margen izquierdo que StoreBrand.
const PHOTO_TAG_LEFT = 56;

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

  const config = getTenantConfig(tenant);
  const storeName = config?.name;

  const name = truncate(product.name, 56);
  const category = product.category?.[0]?.name?.toUpperCase() ?? "PRODUCTO";
  const price = formatPrice(product.basePrice);

  const [photo, playfair, dmSansMedium, dmSansBold] = await Promise.all([
    resolveImageUrl(getPrimaryImageKey(product.images)).then(toImageDataUri),
    loadGoogleFont("Playfair Display", 700, name),
    loadGoogleFont("DM Sans", 500, category),
    loadGoogleFont("DM Sans", 700, `${price}${storeName ?? ""}`),
  ]);
  const fonts = [playfair, dmSansMedium, dmSansBold].filter((f) => f !== null);

  const photoWidth = storeName ? SQUARE_PHOTO : OG_SIZE.width;
  // Con foto la etiqueta cuelga sobre su borde; sin marca, cuelga pegada al
  // margen izquierdo para dejar libre el producto.
  const tagLeft = !photo
    ? (OG_SIZE.width - TAG_WIDTH) / 2
    : storeName
      ? OG_SIZE.width - SQUARE_PHOTO - TAG_WIDTH / 2 + TAG_HANG_OFFSET
      : PHOTO_TAG_LEFT;

  return new ImageResponse(
    (
      <OgCanvas>
        {photo && <OgPhoto src={photo} width={photoWidth} />}
        {storeName && <StoreBrand name={storeName} logo={config?.logo} />}
        <HangingTag
          left={tagLeft}
          colors={tagColors(config)}
          label={category}
          title={name}
          titleSize={nameFontSize(name)}
          detail={price}
          detailStyle={{ fontSize: 44, fontWeight: 700 }}
          overPhoto={Boolean(photo)}
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
