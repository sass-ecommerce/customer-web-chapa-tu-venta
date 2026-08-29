import { cn } from "@/lib/utils/utils";
import { ProductImagePlaceholder } from "@/components/home/product-image-placeholder";

export function ProductImage({
  imageUrl,
  alt,
  className,
}: {
  imageUrl?: string;
  alt: string;
  className?: string;
}) {
  if (!imageUrl) {
    return <ProductImagePlaceholder />;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
