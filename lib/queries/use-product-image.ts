"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPresignedViewUrl } from "@/lib/api/storage";

// Presigned URLs expire after 1h server-side; refetch well before that.
const STALE_TIME = 50 * 60 * 1000;

export function useProductImage(imageKey: string | undefined) {
  return useQuery({
    queryKey: ["product-image", imageKey],
    queryFn: () => fetchPresignedViewUrl(imageKey as string),
    enabled: Boolean(imageKey),
    staleTime: STALE_TIME,
  });
}
