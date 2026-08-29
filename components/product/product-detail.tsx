"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  ChevronRight,
  PackageSearch,
} from "lucide-react";
import { useProductImage } from "@/lib/queries/use-product-image";
import type { DisplayProduct } from "@/lib/adapters/product-adapter";
import { useCartStore } from "@/lib/stores/cart-store";
import { ProductImage } from "@/components/home/product-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/utils";
import { tenantHref } from "@/lib/utils/tenant-href";

const BADGE_STYLES: Record<string, string> = {
  OFERTA: "bg-brand-accent text-white border-transparent",
  NUEVO: "bg-emerald-500 text-white border-transparent",
  TOP: "bg-amber-400 text-white border-transparent",
};

const TABS = ["Descripción", "Especificaciones", "Reseñas"] as const;
type Tab = (typeof TABS)[number];

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Ana G.",
    avatar: "👩",
    rating: 5,
    text: "Excelente producto, muy buena calidad y llegó rápido.",
  },
  {
    id: 2,
    name: "Carlos M.",
    avatar: "👨",
    rating: 4,
    text: "Muy satisfecho con la compra. El material es resistente.",
  },
  {
    id: 3,
    name: "Sofía R.",
    avatar: "👩‍🦱",
    rating: 5,
    text: "Lo recomiendo totalmente. Cumple con todas las expectativas.",
  },
];

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span
      className={cn("text-yellow-400", size === "md" ? "text-base" : "text-xs")}
    >
      {"★".repeat(full)}
      {half ? "½" : ""}
      <span className="text-gray-300">{"★".repeat(empty)}</span>
    </span>
  );
}

function RelatedCard({
  product,
  tenant,
}: {
  product: DisplayProduct;
  tenant: string;
}) {
  return (
    <Link
      href={tenantHref(tenant, `/products/${product.id}`)}
      className="group block overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <ProductImage
          imageKey={product.imageKey}
          alt={product.name}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="space-y-1 p-3">
        <p className="line-clamp-2 text-xs leading-snug font-medium text-gray-800">
          {product.name}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-gray-900">
            S/ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              S/ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function NotFoundState({ tenant }: { tenant: string }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <PackageSearch className="mb-4 size-12 text-gray-300" />
      <h1 className="text-brand-dark mb-1 text-lg font-semibold">
        Producto no encontrado
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Este producto ya no está disponible o el enlace es incorrecto.
      </p>
      <Link
        href={tenantHref(tenant, "/catalog")}
        className="text-brand-accent text-sm font-medium hover:underline"
      >
        Ver catálogo
      </Link>
    </div>
  );
}

export function ProductDetail({
  tenant,
  productId,
  products,
}: {
  tenant: string;
  productId: string;
  products: DisplayProduct[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Descripción");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openSheet = useCartStore((s) => s.openSheet);

  const product = products.find((p) => p.id === productId);
  const { data: imageUrl } = useProductImage(product?.imageKey);

  if (!product) {
    return <NotFoundState tenant={tenant} />;
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        image: imageUrl ?? "",
        price: product.price,
        category: product.category,
      },
      quantity,
    );
    setQuantity(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : product.discount;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="font-body mb-6 flex items-center gap-1.5 text-xs text-gray-500">
        <Link
          href={tenantHref(tenant, "/")}
          className="hover:text-brand-accent transition-colors"
        >
          Inicio
        </Link>
        <ChevronRight className="size-3 text-gray-300" />
        <Link
          href={tenantHref(tenant, "/catalog")}
          className="hover:text-brand-accent transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="size-3 text-gray-300" />
        <span className="max-w-[200px] truncate font-medium text-gray-800">
          {product.name}
        </span>
      </nav>

      {/* Hero */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <ProductImage imageKey={product.imageKey} alt={product.name} />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          {product.badge && (
            <Badge
              className={cn(
                "w-fit text-[11px] tracking-wide uppercase",
                BADGE_STYLES[product.badge],
              )}
            >
              {product.badge}
            </Badge>
          )}

          <h1 className="font-display text-brand-dark text-2xl leading-tight font-bold sm:text-3xl">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} size="md" />
            <span className="text-sm text-gray-500">
              {product.rating} · {product.reviewCount} reseñas
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-brand-dark text-3xl font-bold">
              S/ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  S/ {product.originalPrice.toFixed(2)}
                </span>
                <span className="text-brand-accent text-sm font-semibold">
                  -{discountPct}%
                </span>
              </>
            )}
          </div>

          <p className="font-body text-xs text-gray-500">
            Categoría:{" "}
            <span className="font-medium text-gray-700">
              {product.category}
            </span>
          </p>

          <Separator />

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Cantidad:</span>
            <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-gray-50"
                aria-label="Reducir cantidad"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-gray-50"
                aria-label="Aumentar cantidad"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 gap-2 font-semibold text-white transition-colors duration-300",
                added
                  ? "bg-green-500 hover:bg-green-500"
                  : "bg-brand-accent hover:bg-brand-accent/90",
              )}
            >
              {added ? (
                <>
                  <Check className="size-4" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="size-4" />
                  Agregar al carrito
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setWishlisted((w) => !w)}
              className={cn(
                "flex items-center gap-2 transition-colors",
                wishlisted && "border-brand-accent text-brand-accent",
              )}
            >
              <Heart
                className="size-4"
                fill={wishlisted ? "#EF4444" : "none"}
                stroke={wishlisted ? "#EF4444" : "currentColor"}
              />
              {wishlisted ? "Guardado" : "Guardar"}
            </Button>
          </div>

          {added && (
            <button
              onClick={openSheet}
              className="text-brand-accent mt-1 text-xs font-medium hover:underline"
            >
              Ver carrito →
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-brand-accent text-brand-accent -mb-px border-b-2"
                  : "text-gray-500 hover:text-gray-800",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="font-body py-6 text-sm leading-relaxed text-gray-600">
          {activeTab === "Descripción" && (
            <p>
              {product.name} es un producto de alta calidad en la categoría{" "}
              {product.category}. Diseñado para ofrecer el mejor rendimiento y
              durabilidad, este producto ha sido seleccionado cuidadosamente
              para satisfacer las necesidades de nuestros clientes. Con
              materiales premium y acabados de primera, es una excelente opción
              para quienes buscan calidad y estilo.
            </p>
          )}
          {activeTab === "Especificaciones" && (
            <table className="w-full border-collapse text-sm">
              <tbody>
                {[
                  ["Categoría", product.category],
                  ["Precio", `S/ ${product.price.toFixed(2)}`],
                  ...(product.originalPrice
                    ? [
                        [
                          "Precio original",
                          `S/ ${product.originalPrice.toFixed(2)}`,
                        ],
                      ]
                    : []),
                  ["Valoración", `${product.rating} / 5`],
                  ["Reseñas", product.reviewCount.toString()],
                  ["Disponibilidad", "En stock"],
                  ["Envío", "Envío estándar gratuito"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="w-40 py-2.5 pr-4 font-medium text-gray-700">
                      {label}
                    </td>
                    <td className="py-2.5 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "Reseñas" && (
            <div className="space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="flex gap-3 rounded-xl bg-gray-50 p-4"
                >
                  <span className="text-2xl">{review.avatar}</span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-800">
                        {review.name}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-brand-dark mb-4 text-lg font-bold">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} tenant={tenant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
