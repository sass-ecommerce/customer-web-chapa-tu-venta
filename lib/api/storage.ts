export type PresignedViewResponse = {
  code: number;
  message: string;
  data: {
    viewUrl: string;
  };
};

export async function fetchPresignedViewUrl(key: string): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_API_URL;
  return fetch(
    `${baseUrl}/api/storage/presigned-view?key=${encodeURIComponent(key)}`,
  );
}

// Resolved server-side (callers only run in Server Components) so the client
// never needs to fetch a presigned URL itself. Presigned URLs expire after 1h
// server-side, which is fine for a single page render.
export async function resolveImageUrl(
  key: string | undefined,
): Promise<string | undefined> {
  if (!key) return undefined;
  try {
    const res = await fetchPresignedViewUrl(key);
    if (!res.ok) return undefined;
    const json: PresignedViewResponse = await res.json();
    return json.data.viewUrl;
  } catch {
    return undefined;
  }
}
