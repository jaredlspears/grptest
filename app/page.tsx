"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SavedDiscussion = {
  id: string;
  title: string;
  createdAt: string;
};

export default function Home() {
  const [saved, setSaved] = useState<SavedDiscussion[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("grptest-discussions");
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  function remove(id: string) {
    const updated = saved.filter((d) => d.id !== id);
    setSaved(updated);
    localStorage.setItem("grptest-discussions", JSON.stringify(updated));
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-serif font-semibold text-[var(--ink)] text-3xl tracking-tight">
            GrpTest
          </h1>
          <div className="flex items-center gap-2">
            <span
              className="block h-0.5 w-6 rounded-full"
              style={{ backgroundColor: "var(--gold)" }}
            />
            <p className="font-sans text-sm text-[var(--ink-soft)]">
              Discussion prep
            </p>
          </div>
        </div>

        {/* New discussion button */}
        <Link
          href="/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-medium text-sm text-[var(--card)] transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <span>+ New discussion</span>
        </Link>

        {/* Saved discussions */}
        {saved.length > 0 && (
          <div className="space-y-3">
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
              Saved discussions
            </p>
            <ul className="space-y-2">
              {saved.map((d) => (
                <li
                  key={d.id}
                  className="bg-[var(--card)] border rounded-xl p-5 flex items-center justify-between gap-4"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="space-y-0.5 min-w-0">
                    <p className="font-serif font-medium text-[var(--ink)] truncate">
                      {d.title}
                    </p>
                    <p className="font-sans text-xs text-[var(--ink-faint)]">
                      {new Date(d.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" · "}
                      <span className="font-mono">{d.id}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/d/${d.id}`}
                      className="font-sans text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                    >
                      Open →
                    </Link>
                    <button
                      onClick={() => remove(d.id)}
                      className="font-sans text-xs text-[var(--ink-faint)] hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {saved.length === 0 && (
          <p className="font-sans text-sm text-[var(--ink-faint)]">
            No saved discussions yet. Create one above.
          </p>
        )}

        {/* Footer */}
        <footer className="pt-8">
          <p className="font-sans text-[11px] text-[var(--ink-faint)] tracking-wide">
            test app · grplaunch.app coming soon
          </p>
        </footer>
      </div>
    </main>
  );
}
