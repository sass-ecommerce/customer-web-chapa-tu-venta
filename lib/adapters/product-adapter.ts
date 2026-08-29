import { mockProducts } from "@/lib/mocks/mock-products";
import type { ApiProduct, ApiProductImage } from "@/lib/api/products";
import {
  fetchPresignedViewUrl,
  type PresignedViewResponse,
} from "@/lib/api/storage";

export type DisplayProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: "NUEVO" | "OFERTA" | "TOP";
  discount?: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  imageUrl?: string;
};

function getPrimaryImageKey(images: ApiProductImage[]): string | undefined {
  if (images.length === 0) return undefined;
  const primary = images.find((img) => img.isPrimary);
  if (primary) return primary.s3Key;
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder)[0].s3Key;
}

// Resolved server-side (this module only runs in Server Components) so the
// client never needs to fetch a presigned URL itself. Presigned URLs expire
// after 1h server-side, which is fine for a single page render.
async function resolveImageUrl(key: string | undefined): Promise<string | undefined> {
  if (!key) return undefined;
  try {
    const res = await fetchPresignedViewUrl(key);
    if (!res.ok) return undefined;
    const json: PresignedViewResponse = await res.json();
    return json.data.viewUrl;
  } catch {
    return undefined;
  }
}

// Fields the API doesn't return yet (rating, badge, discount, originalPrice)
// are filled from the mock catalog, cycled by index, to keep the existing
// designs (stars, badges, flash-sale progress) working until the API adds them.
export async function toDisplayProducts(
  products: ApiProduct[],
): Promise<DisplayProduct[]> {
  return Promise.all(
    products.map(async (product, index) => {
      const mock = mockProducts[index % mockProducts.length];
      return {
        id: product.productId,
        name: product.name,
        price: product.basePrice,
        originalPrice: mock.originalPrice,
        category: product.category?.[0]?.name ?? mock.category,
        badge: mock.badge,
        discount: mock.discount,
        rating: mock.rating,
        reviewCount: mock.reviewCount,
        createdAt: product.createdAt ?? mock.createdAt,
        imageUrl: await resolveImageUrl(getPrimaryImageKey(product.images)),
      };
    }),
  );
}
