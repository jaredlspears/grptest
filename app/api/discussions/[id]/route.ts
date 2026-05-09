import { head } from "@vercel/blob";
import { NextResponse } from "next/server";
import type { Discussion } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !/^[a-z0-9]{6}$/.test(id)) {
      return NextResponse.json({ error: "Invalid discussion ID" }, { status: 400 });
    }

    const blobInfo = await head(`discussions/${id}.json`);
    const res = await fetch(blobInfo.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Blob fetch failed: ${res.status}`);
    const discussion: Discussion = await res.json();

    return NextResponse.json(discussion);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("GET /api/discussions/[id] error:", msg);
    // Treat any error as not found for participants
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }
}
