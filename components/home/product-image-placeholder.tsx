import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export function ProductImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gray-100 text-gray-300",
        className,
      )}
    >
      <ImageOff className="size-6" />
    </div>
  );
}
