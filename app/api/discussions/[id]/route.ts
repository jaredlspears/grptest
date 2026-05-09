import { list } from "@vercel/blob";
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

    const { blobs } = await list({ prefix: `discussions/${id}.json`, limit: 1 });

    if (!blobs.length) {
      return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
    }

    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
    }

    const discussion: Discussion = await res.json();
    return NextResponse.json(discussion);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("GET /api/discussions/[id] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
