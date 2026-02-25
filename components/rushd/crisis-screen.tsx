"use client"

interface CrisisScreenProps {
  onContinue: () => void
}

export function CrisisScreen({ onContinue }: CrisisScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="max-w-sm text-center">
        {/* Main message */}
        <h2
          className="text-[28px] font-semibold tracking-tight mb-4"
          style={{ color: "#F5F0E8" }}
        >
          We see you.
        </h2>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "#8A9AB5" }}
        >
          {"What you\u2019re feeling matters. You don\u2019t have to carry this alone."}
        </p>

        {/* Gold filled CTA */}
        <a
          href="tel:988"
          className="inline-block w-full py-4 text-sm font-semibold tracking-wide text-center transition-colors"
          style={{
            backgroundColor: "#C1A67B",
            color: "#0B1120",
          }}
          aria-label="Call crisis hotline"
        >
          Talk to someone now
        </a>

        {/* Crisis line number */}
        <p className="mt-3 text-sm" style={{ color: "#8A9AB5" }}>
          988 Suicide and Crisis Lifeline
        </p>

        {/* Thin rule */}
        <div className="h-px my-8 w-full" style={{ backgroundColor: "#1E2A3A" }} />

        {/* Continue link -- small, not prominent */}
        <button
          onClick={onContinue}
          className="text-xs transition-colors"
          style={{ color: "#8A9AB5" }}
        >
          Continue to Rushd
        </button>
      </div>
    </div>
  )
}
