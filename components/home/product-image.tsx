"use client";

import { cn } from "@/lib/utils/utils";
import { useProductImage } from "@/lib/hooks/use-product-image";
import { ProductImagePlaceholder } from "@/components/home/product-image-placeholder";

export function ProductImage({
  imageKey,
  alt,
  className,
}: {
  imageKey?: string;
  alt: string;
  className?: string;
}) {
  const { data: url, isLoading } = useProductImage(imageKey);

  if (!imageKey || (!isLoading && !url)) {
    return <ProductImagePlaceholder />;
  }

  if (isLoading) {
    return <div className="w-full h-full bg-gray-100 animate-pulse" />;
  }

  return (
    <img
      src={url}
      alt={alt}
      className={cn("w-full h-full object-cover", className)}
    />
  );
}
