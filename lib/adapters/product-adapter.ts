import { mockProducts } from "@/lib/mocks/mock-products";
import type { ApiProduct, ApiProductImage } from "@/lib/api/products";

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
  imageKey?: string;
};

function getPrimaryImageKey(images: ApiProductImage[]): string | undefined {
  if (images.length === 0) return undefined;
  const primary = images.find((img) => img.isPrimary);
  if (primary) return primary.s3Key;
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder)[0].s3Key;
}

// Fields the API doesn't return yet (rating, badge, discount, originalPrice)
// are filled from the mock catalog, cycled by index, to keep the existing
// designs (stars, badges, flash-sale progress) working until the API adds them.
export function toDisplayProducts(products: ApiProduct[]): DisplayProduct[] {
  return products.map((product, index) => {
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
      imageKey: getPrimaryImageKey(product.images),
    };
  });
}
