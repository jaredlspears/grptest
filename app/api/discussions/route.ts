import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { generateId } from "@/lib/id";
import type { Discussion, DiscussionInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: DiscussionInput = await request.json();

    if (!body.title || !Array.isArray(body.sections) || body.sections.length === 0) {
      return NextResponse.json(
        { error: "title and at least one section are required" },
        { status: 400 }
      );
    }

    const id = generateId();
    const discussion: Discussion = {
      id,
      title: body.title,
      author: body.author ?? "",
      createdAt: new Date().toISOString(),
      sections: body.sections,
    };

    await put(`discussions/${id}.json`, JSON.stringify(discussion), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/discussions error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
