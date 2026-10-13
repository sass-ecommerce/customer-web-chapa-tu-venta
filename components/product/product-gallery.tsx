"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/home/product-image";
import { cn } from "@/lib/utils/utils";

const FRAME =
  "aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50";

// Swipeable on touch (native scroll-snap), arrows + thumbnails on desktop,
// dots on mobile. Falls back to a single static frame for 0–1 images.
export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (images.length <= 1) {
    return (
      <div className={FRAME}>
        <ProductImage imageUrl={images[0]} alt={alt} />
      </div>
    );
  }

  const last = images.length - 1;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(Math.max(index, 0), last);
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div
      className="flex flex-col gap-3"
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Imágenes de ${alt}`}
    >
      <div className={cn(FRAME, "group relative")}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((url, index) => (
            <div
              key={url}
              className="h-full w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="imagen"
              aria-label={`${index + 1} de ${images.length}`}
            >
              <img
                src={url}
                alt={`${alt} — imagen ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <GalleryArrow
          side="left"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        />
        <GalleryArrow
          side="right"
          disabled={active === last}
          onClick={() => goTo(active + 1)}
        />

        <span
          className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white tabular-nums backdrop-blur-sm"
          aria-hidden
        >
          {active + 1}/{images.length}
        </span>
      </div>

      {/* Mobile: dots */}
      <div className="flex justify-center gap-1.5 md:hidden">
        {images.map((url, index) => (
          <button
            key={url}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ver imagen ${index + 1}`}
            aria-current={index === active}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              index === active ? "bg-brand-dark w-4" : "w-1.5 bg-gray-300",
            )}
          />
        ))}
      </div>

      {/* Desktop: thumbnails */}
      <div className="hidden gap-2 overflow-x-auto pb-1 md:flex">
        {images.map((url, index) => (
          <button
            key={url}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ver imagen ${index + 1}`}
            aria-current={index === active}
            className={cn(
              "focus-visible:ring-brand-accent size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none",
              index === active
                ? "border-brand-accent"
                : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <img
              src={url}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Imagen anterior" : "Imagen siguiente"}
      className={cn(
        "text-brand-dark absolute top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm transition-opacity duration-200 md:flex",
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 disabled:invisible",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
