"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { tenantHref } from "@/lib/utils/tenant-href";
import type { DisplayProduct } from "@/lib/adapters/product-adapter";
import { ProductImage } from "@/components/home/product-image";

// Fixed at module load time — stable across renders
const OFFER_END_DATE = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

const TOTAL_STOCK = 10;

// Stable pseudo-random number derived from the product's UUID, used only
// for the "sold" progress bar until real stock data is available.
function hashToStock(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % TOTAL_STOCK;
  }
  return hash + 1;
}

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

function FlashCard({
  product,
  tenant,
}: {
  product: DisplayProduct;
  tenant: string;
}) {
  const [wished, setWished] = useState(false);
  const sold = hashToStock(product.id);

  return (
    <Link
      href={tenantHref(tenant, `/products/${product.id}`)}
      className="group block w-44 shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <ProductImage
          imageKey={product.imageKey}
          alt={product.name}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount && (
          <span className="bg-brand-accent absolute top-2 left-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
        <button
          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-transform hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
            setWished(!wished);
          }}
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
      <div className="space-y-2 p-3">
        <p className="line-clamp-2 text-xs leading-snug font-medium text-gray-800">
          {product.name}
        </p>
        <div>
          <span className="text-sm font-bold text-gray-900">
            S/ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-brand-accent ml-1.5 text-xs line-through">
              S/ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-brand-dark h-full rounded-full"
              style={{ width: `${(sold / TOTAL_STOCK) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400">
            {sold}/{TOTAL_STOCK} Vendido
          </p>
        </div>
      </div>
    </Link>
  );
}

const SCROLL_AMOUNT = 200;

export function OffersSection({
  tenant,
  products,
}: {
  tenant: string;
  products: DisplayProduct[];
}) {
  const timeLeft = useCountdown(OFFER_END_DATE);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fmt = (v: number | null) =>
    v === null ? "--" : String(v).padStart(2, "0");

  const offerProducts = products.filter((p) => p.badge === "OFERTA");

  if (offerProducts.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <section id="offers" className="border-b border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold text-gray-900">
              ⚡ Flash Sale
            </span>
            {/* HH:MM:SS timer badges */}
            <div className="flex items-center gap-1 text-sm font-bold tabular-nums">
              <span className="bg-brand-accent rounded px-2 py-0.5 text-white">
                {fmt(timeLeft?.hours ?? null)}
              </span>
              <span className="text-xs font-normal text-gray-400">:</span>
              <span className="bg-brand-accent rounded px-2 py-0.5 text-white">
                {fmt(timeLeft?.minutes ?? null)}
              </span>
              <span className="text-xs font-normal text-gray-400">:</span>
              <span className="bg-brand-accent rounded px-2 py-0.5 text-white">
                {fmt(timeLeft?.seconds ?? null)}
              </span>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Horizontal cards */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
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
