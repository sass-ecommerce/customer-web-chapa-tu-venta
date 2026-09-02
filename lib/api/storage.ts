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
