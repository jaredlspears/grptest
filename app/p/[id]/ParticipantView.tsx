"use client";

import { useState } from "react";
import type { Discussion } from "@/lib/types";

export default function ParticipantView({
  discussion,
}: {
  discussion: Discussion;
}) {
  const [index, setIndex] = useState(0);
  const total = discussion.sections.length;
  const section = discussion.sections[index];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Top bar */}
      <header className="px-4 pt-8 pb-4 max-w-2xl mx-auto w-full">
        <h1 className="font-serif font-medium text-[var(--ink)] text-xl leading-snug">
          {discussion.title}
        </h1>
        {discussion.author && (
          <p className="font-sans text-xs text-[var(--ink-faint)] mt-0.5">
            {discussion.author}
          </p>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pb-32 max-w-2xl mx-auto w-full space-y-4">
        {/* Section indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border" style={{ borderColor: "var(--line)" }}>
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "var(--gold)" }}
          />
          <span className="font-sans text-xs font-medium text-[var(--ink-faint)]">
            Section {index + 1} of {total}
          </span>
        </div>

        {/* Section heading */}
        {section.heading && (
          <h2 className="font-serif font-medium text-[var(--ink)] text-lg leading-snug">
            {section.heading}
          </h2>
        )}

        {/* Paragraph */}
        {section.body && (
          <div
            className="bg-[var(--card)] border rounded-xl p-6"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="font-serif text-[var(--ink)] leading-relaxed whitespace-pre-wrap"
              style={{ fontSize: "17px", lineHeight: "1.75" }}
            >
              {section.body}
            </p>
          </div>
        )}

        {/* Questions */}
        {section.questions.length > 0 && (
          <div className="space-y-2">
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
              Discussion questions
            </p>
            <ul className="space-y-2">
              {section.questions.map((q, i) => (
                <li
                  key={i}
                  className="bg-[var(--card)] border rounded-xl px-5 py-4 flex gap-3"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                  <p className="font-sans font-medium text-[var(--ink)] leading-snug" style={{ fontSize: "15px" }}>
                    {q}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Sticky bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t px-4 py-4"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="px-5 py-2.5 rounded-lg border font-sans font-medium text-sm text-[var(--ink)] transition-opacity disabled:opacity-30"
            style={{ borderColor: "var(--line)" }}
          >
            ← Previous
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {discussion.sections.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === index ? "var(--ink)" : "var(--line)",
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to section ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            disabled={index === total - 1}
            className="px-5 py-2.5 rounded-lg font-sans font-medium text-sm text-[var(--card)] transition-opacity disabled:opacity-30"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Next →
          </button>
        </div>
      </nav>
    </div>
  );
}
