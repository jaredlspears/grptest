import type { Discussion } from "./types";

export async function getDiscussion(id: string): Promise<Discussion | null> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error("BLOB_READ_WRITE_TOKEN not set");
      return null;
    }

    // Token format: vercel_blob_rw_{storeId}_{secret}
    // Store URL: https://{storeId}.public.blob.vercel-storage.com
    const parts = token.split("_");
    const storeId = parts[3]?.toLowerCase();
    if (!storeId) {
      console.error("Could not extract storeId from token");
      return null;
    }

    const blobUrl = `https://${storeId}.public.blob.vercel-storage.com/discussions/${id}.json`;
    console.log("Fetching blob:", blobUrl);

    const res = await fetch(blobUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error("Blob fetch failed:", res.status, blobUrl);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("getDiscussion error:", err);
    return null;
  }
}
