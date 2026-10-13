import { mockProducts } from "@/lib/mocks/mock-products";
import type { ApiProduct, ApiProductImage } from "@/lib/api/products";

export type DisplayProductAttribute = {
  key: string;
  label: string;
  value: string;
};

export type DisplayProduct = {
  id: string;
  name: string;
  description?: string;
  attributes: DisplayProductAttribute[];
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

// CloudFront URLs of a product's images: primary first, then by sortOrder.
// The first entry is the product's main image.
export function productImageUrls(images: ApiProductImage[] = []): string[] {
  return [...images]
    .sort(
      (a, b) =>
        Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder,
    )
    .map((img) => img.url)
    .filter(Boolean);
}

// Pricing fields the API doesn't provide (originalPrice, discount, badge) stay
// undefined: inventing a struck-through price or "OFERTA" tag would mislead the
// shopper. Only rating/reviewCount are still filled from the mock catalog,
// cycled by index, until the API adds them.
export function toDisplayProducts(products: ApiProduct[]): DisplayProduct[] {
  return products.map((product, index) => {
    const mock = mockProducts[index % mockProducts.length];
    return {
      id: product.productId,
      name: product.name,
      // Blank descriptions are treated as missing so the detail page hides the tab.
      description: product.description?.trim() || undefined,
      attributes: (product.attributes ?? [])
        .filter((attr) => attr.value?.trim())
        .map((attr) => ({
          key: attr.attributeKey,
          label: attr.attributeLabel,
          value: attr.value.trim(),
        })),
      price: product.basePrice,
      category: product.category?.[0]?.name ?? mock.category,
      rating: mock.rating,
      reviewCount: mock.reviewCount,
      createdAt: product.createdAt ?? mock.createdAt,
      imageUrl: productImageUrls(product.images)[0],
    };
  });
}
