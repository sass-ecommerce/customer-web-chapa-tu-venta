"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { tenantHref } from "@/lib/tenant-href";

// Fixed at module load time — stable across renders
const OFFER_END_DATE = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

const offerProducts = [
  { id: 1, name: 'TV OLED 55"', discount: 40, price: 599, originalPrice: 999, image: "📺", sold: 7 },
  { id: 2, name: 'Tablet Pro 12"', discount: 35, price: 349, originalPrice: 539, image: "📱", sold: 4 },
  { id: 3, name: "Keyboard Mecánico", discount: 30, price: 69, originalPrice: 99, image: "⌨️", sold: 6 },
  { id: 4, name: "Mouse Inalámbrico", discount: 20, price: 39, originalPrice: 49, image: "🖱️", sold: 5 },
  { id: 5, name: "Altavoz Bluetooth", discount: 45, price: 54, originalPrice: 99, image: "🔊", sold: 8 },
  { id: 6, name: "Webcam HD 4K", discount: 25, price: 74, originalPrice: 99, image: "📹", sold: 3 },
];

type TimeLeft = { hours: number; minutes: number; seconds: number };

function useCountdown(targetDate: Date): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calc = (): TimeLeft => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    const tick = () => setTimeLeft(calc());
    const initId = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(initId);
      clearInterval(id);
    };
  }, [targetDate]);

  return timeLeft;
}

const TOTAL_STOCK = 10;

function FlashCard({ product, tenant }: { product: (typeof offerProducts)[0]; tenant: string }) {
  const [wished, setWished] = useState(false);

  return (
    <Link
      href={tenantHref(tenant, `/products/${product.id}`)}
      className="shrink-0 snap-start w-44 bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group block"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
        <span className="text-5xl select-none group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        <span className="absolute top-2 left-2 bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          -{product.discount}%
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
      <div className="p-3 space-y-2">
        <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">
          {product.name}
        </p>
        <div>
          <span className="text-sm font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-brand-accent line-through ml-1.5">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-dark rounded-full"
              style={{ width: `${(product.sold / TOTAL_STOCK) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400">
            {product.sold}/{TOTAL_STOCK} Vendido
          </p>
        </div>
      </div>
    </Link>
  );
}

export function OffersSection({ tenant }: { tenant: string }) {
  const timeLeft = useCountdown(OFFER_END_DATE);
  const fmt = (v: number | null) =>
    v === null ? "--" : String(v).padStart(2, "0");

  return (
    <section id="offers" className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-lg font-bold text-gray-900">⚡ Flash Sale</span>
            {/* HH:MM:SS timer badges */}
            <div className="flex items-center gap-1 text-sm font-bold tabular-nums">
              <span className="bg-brand-accent text-white px-2 py-0.5 rounded">
                {fmt(timeLeft?.hours ?? null)}
              </span>
              <span className="text-gray-400 font-normal text-xs">:</span>
              <span className="bg-brand-accent text-white px-2 py-0.5 rounded">
                {fmt(timeLeft?.minutes ?? null)}
              </span>
              <span className="text-gray-400 font-normal text-xs">:</span>
              <span className="bg-brand-accent text-white px-2 py-0.5 rounded">
                {fmt(timeLeft?.seconds ?? null)}
              </span>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft className="size-4" />
            </button>
            <button className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Horizontal cards */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {offerProducts.map((product) => (
            <FlashCard key={product.id} product={product} tenant={tenant} />
          ))}
        </div>
      </div>
    </section>
  );
}
