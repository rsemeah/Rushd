"use client"

interface CrisisScreenProps {
  onContinue: () => void
}

export function CrisisScreen({ onContinue }: CrisisScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="max-w-sm text-center">
        {/* Main message */}
        <h2 className="text-3xl font-semibold tracking-tight mb-4 text-text-primary">
          We see you.
        </h2>

        <p className="text-lg leading-relaxed mb-10 text-text-secondary">
          {"What you\u2019re feeling matters. You don\u2019t have to carry this alone."}
        </p>

        {/* Gold filled CTA */}
        <a
          href="tel:988"
          className="inline-block w-full py-5 text-base font-semibold tracking-wide text-center transition-colors bg-gold text-primary-foreground"
          aria-label="Call crisis hotline"
        >
          Talk to someone now
        </a>

        {/* Crisis line number */}
        <p className="mt-4 text-base text-text-secondary">
          988 Suicide and Crisis Lifeline
        </p>

        {/* Thin rule */}
        <div className="h-px my-8 w-full bg-divider" />

        {/* Continue link -- small, not prominent */}
        <button
          onClick={onContinue}
          className="text-sm transition-colors text-text-secondary"
        >
          Continue to Rushd
        </button>
      </div>
    </div>
  )
}
