export type PresignedViewResponse = {
  code: number;
  message: string;
  data: {
    viewUrl: string;
  };
};

// Routed through /api/storage/presigned-view (same-origin) for consistency
// with the products proxy.
export async function fetchPresignedViewUrl(key: string): Promise<string> {
  const res = await fetch(
    `/api/storage/presigned-view?key=${encodeURIComponent(key)}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch presigned view URL: ${res.status}`);
  }

  const json: PresignedViewResponse = await res.json();
  return json.data.viewUrl;
}
