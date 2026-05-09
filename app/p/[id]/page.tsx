import { notFound } from "next/navigation";
import { list } from "@vercel/blob";
import type { Discussion } from "@/lib/types";
import ParticipantView from "./ParticipantView";

async function getDiscussion(id: string): Promise<Discussion | null> {
  try {
    const { blobs } = await list({ prefix: `discussions/${id}.json`, limit: 1 });
    if (!blobs.length) return null;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ParticipantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const discussion = await getDiscussion(id);
  if (!discussion) notFound();

  return <ParticipantView discussion={discussion} />;
}
