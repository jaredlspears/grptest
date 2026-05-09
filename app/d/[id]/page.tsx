import Link from "next/link";
import { notFound } from "next/navigation";
import type { Discussion } from "@/lib/types";
import ShareBlock from "./ShareBlock";

async function getDiscussion(id: string): Promise<Discussion | null> {
  try {
    const baseUrl =
      process.env.VERCEL_URL
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

export default async function DiscussionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const discussion = await getDiscussion(id);

  if (!discussion) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-sans text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
        >
          ← Back
        </Link>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif font-semibold text-[var(--ink)] text-2xl leading-snug">
            {discussion.title}
          </h1>
          {discussion.author && (
            <p className="font-sans text-sm text-[var(--ink-soft)]">
              {discussion.author}
            </p>
          )}
        </div>

        {/* Share block */}
        <ShareBlock id={id} />

        {/* Sections preview */}
        <div className="space-y-3">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
            {discussion.sections.length}{" "}
            {discussion.sections.length === 1 ? "section" : "sections"}
          </p>
          <ul className="space-y-2">
            {discussion.sections.map((s, i) => (
              <li
                key={i}
                className="bg-[var(--card)] border rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="min-w-0">
                  <p className="font-sans text-sm font-medium text-[var(--ink)] truncate">
                    {s.heading || `Section ${i + 1}`}
                  </p>
                  <p className="font-sans text-xs text-[var(--ink-faint)]">
                    {s.questions.length}{" "}
                    {s.questions.length === 1 ? "question" : "questions"}
                  </p>
                </div>
                <span className="font-sans text-xs text-[var(--ink-faint)] shrink-0">
                  {i + 1} / {discussion.sections.length}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
