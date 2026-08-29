"use client";

import { cn } from "@/lib/utils/utils";
import { useProductImage } from "@/lib/queries/use-product-image";
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
    return <div className="h-full w-full animate-pulse bg-gray-100" />;
  }

  return (
    <img
      src={url}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
