"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ChevronRight } from "lucide-react";
import { mockProducts, type MockProduct } from "@/lib/mock-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<string, string> = {
  OFERTA: "bg-brand-accent text-white border-transparent",
  NUEVO: "bg-emerald-500 text-white border-transparent",
  TOP: "bg-amber-400 text-white border-transparent",
};

const TABS = ["Descripción", "Especificaciones", "Reseñas"] as const;
type Tab = (typeof TABS)[number];

const MOCK_REVIEWS = [
  { id: 1, name: "Ana G.", avatar: "👩", rating: 5, text: "Excelente producto, muy buena calidad y llegó rápido." },
  { id: 2, name: "Carlos M.", avatar: "👨", rating: 4, text: "Muy satisfecho con la compra. El material es resistente." },
  { id: 3, name: "Sofía R.", avatar: "👩‍🦱", rating: 5, text: "Lo recomiendo totalmente. Cumple con todas las expectativas." },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className={cn("text-yellow-400", size === "md" ? "text-base" : "text-xs")}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      <span className="text-gray-300">{"★".repeat(empty)}</span>
    </span>
  );
}

function RelatedCard({ product, tenant }: { product: MockProduct; tenant: string }) {
  return (
    <Link
      href={`/${tenant}/products/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 block"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <span className="text-4xl select-none group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-xs text-gray-800 font-medium line-clamp-2 leading-snug">{product.name}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductDetail({ product, tenant }: { product: MockProduct; tenant: string }) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Descripción");

  const related = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : product.discount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-body">
        <Link href={`/${tenant}`} className="hover:text-brand-accent transition-colors">
          Inicio
        </Link>
        <ChevronRight className="size-3 text-gray-300" />
        <Link href={`/${tenant}/catalog`} className="hover:text-brand-accent transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="size-3 text-gray-300" />
        <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center border border-gray-100">
          <span className="text-[120px] select-none">{product.image}</span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          {product.badge && (
            <Badge className={cn("w-fit text-[11px] uppercase tracking-wide", BADGE_STYLES[product.badge])}>
              {product.badge}
            </Badge>
          )}

          <h1 className="font-display text-2xl sm:text-3xl text-brand-dark font-bold leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} size="md" />
            <span className="text-sm text-gray-500">
              {product.rating} · {product.reviewCount} reseñas
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-dark">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-sm font-semibold text-brand-accent">-{discountPct}%</span>
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 font-body">
            Categoría: <span className="text-gray-700 font-medium">{product.category}</span>
          </p>

          <Separator />

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Cantidad:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Reducir cantidad"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-semibold tabular-nums">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button className="flex-1 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold">
              Agregar al carrito
            </Button>
            <Button
              variant="outline"
              onClick={() => setWishlisted((w) => !w)}
              className={cn(
                "flex items-center gap-2 transition-colors",
                wishlisted && "border-brand-accent text-brand-accent"
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
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex border-b border-gray-200 gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-b-2 border-brand-accent text-brand-accent -mb-px"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6 text-sm text-gray-600 font-body leading-relaxed">
          {activeTab === "Descripción" && (
            <p>
              {product.name} es un producto de alta calidad en la categoría {product.category}. Diseñado para ofrecer
              el mejor rendimiento y durabilidad, este producto ha sido seleccionado cuidadosamente para satisfacer
              las necesidades de nuestros clientes. Con materiales premium y acabados de primera, es una excelente
              opción para quienes buscan calidad y estilo.
            </p>
          )}
          {activeTab === "Especificaciones" && (
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  ["Categoría", product.category],
                  ["Precio", `$${product.price.toFixed(2)}`],
                  ...(product.originalPrice ? [["Precio original", `$${product.originalPrice.toFixed(2)}`]] : []),
                  ["Valoración", `${product.rating} / 5`],
                  ["Reseñas", product.reviewCount.toString()],
                  ["Disponibilidad", "En stock"],
                  ["Envío", "Envío estándar gratuito"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-medium text-gray-700 w-40">{label}</td>
                    <td className="py-2.5 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "Reseñas" && (
            <div className="space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{review.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-xs">{review.name}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{review.text}</p>
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
          <h2 className="text-lg font-bold text-brand-dark mb-4">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} tenant={tenant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
