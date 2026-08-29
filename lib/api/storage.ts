export type PresignedViewResponse = {
  code: number;
  message: string;
  data: {
    viewUrl: string;
  };
};

// Server-side call straight to the upstream storage API — used when
// building DisplayProduct on the server, where CORS doesn't apply.
export async function fetchPresignedViewUrlUpstream(
  key: string,
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_API_URL;
  return fetch(
    `${baseUrl}/api/storage/presigned-view?key=${encodeURIComponent(key)}`,
  );
}
