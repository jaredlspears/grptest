import { notFound } from "next/navigation";
import { getDiscussion } from "@/lib/getDiscussion";
import ParticipantView from "./ParticipantView";

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
