"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ShareBlock({ id }: { id: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}/p/${id}`);
  }, [id]);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!url) return null;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(url)}`;

  return (
    <div
      className="bg-[var(--card)] border rounded-xl p-5 space-y-4"
      style={{ borderColor: "var(--line)" }}
    >
      <p className="font-sans text-xs font-medium uppercase tracking-widest text-[var(--ink-faint)]">
        Share with participants
      </p>

      {/* URL row */}
      <div className="flex items-center gap-2">
        <code className="flex-1 font-mono text-sm text-[var(--ink)] bg-[var(--surface)] px-3 py-2 rounded-lg truncate min-w-0">
          {url}
        </code>
        <button
          onClick={copy}
          className="shrink-0 px-4 py-2.5 rounded-lg font-sans font-medium text-sm text-[var(--card)] transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* QR toggle */}
      <button
        onClick={() => setShowQr((v) => !v)}
        className="font-sans text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
      >
        {showQr ? "Hide QR code" : "Show QR code →"}
      </button>

      {/* QR code */}
      {showQr && (
        <div className="flex flex-col items-center gap-3 pt-1">
          <div
            className="border rounded-xl p-3 bg-white inline-block"
            style={{ borderColor: "var(--line)" }}
          >
            <Image
              src={qrSrc}
              alt="QR code for participant link"
              width={240}
              height={240}
              unoptimized
            />
          </div>
          <p className="font-sans text-xs text-[var(--ink-faint)] text-center">
            Display on projector or have participants scan with their phone camera.
          </p>
        </div>
      )}
    </div>
  );
}
