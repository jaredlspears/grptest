export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-3">
        {/* Wordmark */}
        <h1 className="font-serif font-semibold text-[var(--ink)] text-4xl tracking-tight">
          GrpTest
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base text-[var(--ink-soft)]">
          Quick discussion sharing
        </p>

        {/* Gold accent line */}
        <div className="flex justify-center pt-2">
          <span
            className="block h-0.5 w-8 rounded-full"
            style={{ backgroundColor: "var(--gold)" }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center">
        <p className="font-sans text-[11px] text-[var(--ink-faint)] tracking-wide">
          test app · grplaunch.app coming soon
        </p>
      </footer>
    </main>
  );
}
