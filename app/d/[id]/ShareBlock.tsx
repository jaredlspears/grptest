"use client";

import { useEffect, useState } from "react";

export default function ShareBlock({ id }: { id: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}/p/${id}`);
  }, [id]);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!url) return null;

  return (
    <div
      className="bg-[var(--card)] border rounded-xl p-5 space-y-3"
      style={{ borderColor: "var(--line)" }}
    >
      <p className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
        Share link
      </p>
      <div className="flex items-center gap-2">
        <code className="flex-1 font-mono text-sm text-[var(--ink)] bg-[var(--surface)] px-3 py-2 rounded-lg truncate">
          {url}
        </code>
        <button
          onClick={copy}
          className="shrink-0 px-4 py-2 rounded-lg font-sans font-medium text-sm text-[var(--card)] transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="font-sans text-xs text-[var(--ink-faint)]">
        QR code coming in next step. For now, text or project this URL.
      </p>
    </div>
  );
}
