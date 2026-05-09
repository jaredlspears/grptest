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

    // Construct the blob URL and fetch the JSON directly
    const blobMeta = await head(
      `discussions/${id}.json`
    ).catch(() => null);

    if (!blobMeta) {
      return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
    }

    const res = await fetch(blobMeta.url);
    if (!res.ok) {
      return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
    }

    const discussion: Discussion = await res.json();
    return NextResponse.json(discussion);
  } catch (err) {
    console.error("GET /api/discussions/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
