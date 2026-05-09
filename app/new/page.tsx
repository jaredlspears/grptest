"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseContent } from "@/lib/parseContent";
import Link from "next/link";

export default function NewDiscussion() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!content.trim()) {
      setError("Please paste some content.");
      return;
    }

    const parsed = parseContent(content, title.trim(), author.trim());
    if (parsed.sections.length === 0) {
      setError(
        'No sections found. Make sure your content has ## headings for each section.'
      );
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }

      const { id } = await res.json();

      // Save to localStorage so it shows on home
      const existing = JSON.parse(
        localStorage.getItem("grptest-discussions") ?? "[]"
      );
      existing.unshift({ id, title: title.trim(), createdAt: new Date().toISOString() });
      localStorage.setItem("grptest-discussions", JSON.stringify(existing));

      router.push(`/d/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

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

        {/* Heading */}
        <div>
          <h1 className="font-serif font-semibold text-[var(--ink)] text-2xl">
            New discussion
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. April 27 — About His Business"
              className="w-full px-4 py-3 rounded-lg border font-sans text-sm text-[var(--ink)] bg-[var(--card)] placeholder:text-[var(--ink-faint)] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20"
              style={{ borderColor: "var(--line)" }}
            />
          </div>

          {/* Author */}
          <div className="space-y-1.5">
            <label className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
              Author{" "}
              <span className="normal-case tracking-normal font-normal text-[var(--ink-faint)]">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border font-sans text-sm text-[var(--ink)] bg-[var(--card)] placeholder:text-[var(--ink-faint)] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20"
              style={{ borderColor: "var(--line)" }}
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`## Section 1 — The Question\nParagraph text here...\n\n- First question?\n- Second question?\n\n## Section 2 — The Answer\nAnother paragraph...\n\n- Question for this section?`}
              rows={14}
              className="w-full px-4 py-3 rounded-lg border font-sans text-sm text-[var(--ink)] bg-[var(--card)] placeholder:text-[var(--ink-faint)] outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 resize-y"
              style={{ borderColor: "var(--line)" }}
            />
            <p className="font-sans text-xs text-[var(--ink-faint)]">
              Use <code className="bg-[var(--surface)] px-1 rounded">## Section heading</code> to separate sections.
              Questions start with <code className="bg-[var(--surface)] px-1 rounded">- </code>.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="font-sans text-sm text-red-500">{error}</p>
          )}

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-medium text-sm text-[var(--card)] transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {saving ? "Saving…" : "Save discussion"}
          </button>
        </div>
      </div>
    </main>
  );
}
