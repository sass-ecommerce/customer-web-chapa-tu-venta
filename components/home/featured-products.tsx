"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  soldCount: string;
};

const allProducts: Product[] = [
  { id: 1, name: "Sneakers Urban Pro", price: 89.99, originalPrice: 120, image: "👟", rating: 4.5, soldCount: "2.3k+" },
  { id: 2, name: "Laptop Ultrabook X1", price: 899, image: "💻", rating: 4.8, soldCount: "1.1k+" },
  { id: 3, name: "Mochila Explorer 30L", price: 45.99, image: "🎒", rating: 4.3, soldCount: "900+" },
  { id: 4, name: "Auriculares Pro Max", price: 149, originalPrice: 199, image: "🎧", rating: 4.7, soldCount: "3.4k+" },
  { id: 5, name: "Silla Ergonómica Pro", price: 299, image: "🪑", rating: 4.6, soldCount: "650+" },
  { id: 6, name: "Camiseta Deportiva", price: 29.99, image: "👕", rating: 4.2, soldCount: "1.8k+" },
  { id: 7, name: "Smartwatch Series 5", price: 199, originalPrice: 249, image: "⌚", rating: 4.5, soldCount: "2.1k+" },
  { id: 8, name: "Botella Termo 750ml", price: 24.99, image: "🍶", rating: 4.4, soldCount: "5.2k+" },
  { id: 9, name: "Zapatillas Running V2", price: 79.99, image: "👟", rating: 4.6, soldCount: "3.0k+" },
  { id: 10, name: "Set Yoga Premium", price: 59.99, image: "🧘", rating: 4.3, soldCount: "1.4k+" },
  { id: 11, name: 'Monitor 4K 27"', price: 449, originalPrice: 499, image: "🖥️", rating: 4.7, soldCount: "800+" },
  { id: 12, name: "Cámara DSLR Entry", price: 599, image: "📷", rating: 4.8, soldCount: "620+" },
];

const tabs = [
  { id: "best", label: "Mejor Vendido", products: allProducts.slice(0, 8) },
  { id: "style", label: "Más Elegante", products: allProducts.slice(4, 12) },
  { id: "discount", label: "Descuento", products: allProducts.filter((p) => p.originalPrice) },
  { id: "official", label: "Oficial", products: allProducts.slice(0, 4) },
  { id: "featured", label: "Destacado", products: allProducts.slice(8, 12) },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-yellow-400 text-xs">
      {"★".repeat(full)}
      {half ? "½" : ""}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <span className="text-5xl select-none group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        <button
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          onClick={() => setWished(!wished)}
          aria-label="Agregar a favoritos"
        >
          <Heart
            className="size-3.5"
            fill={wished ? "#EF4444" : "none"}
            stroke={wished ? "#EF4444" : "currentColor"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <p className="text-xs text-gray-800 font-medium line-clamp-2 leading-snug">
          {product.name}
        </p>
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">{product.soldCount} Vendido</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("best");
  const activeProducts = tabs.find((t) => t.id === activeTab)?.products ?? [];

  return (
    <section id="products" className="py-8 bg-[#F5F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Para Ti Hoy!</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-full transition-all",
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button className="px-8 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors bg-white">
            Ver todos los productos
          </button>
        </div>
      </div>
    </section>
  );
}
