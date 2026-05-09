import { notFound } from "next/navigation";
import type { Discussion } from "@/lib/types";
import ParticipantView from "./ParticipantView";

async function getDiscussion(id: string): Promise<Discussion | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/discussions/${id}`, {
      cache: "no-store",
    });
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
