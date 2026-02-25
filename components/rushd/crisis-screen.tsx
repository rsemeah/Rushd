"use client"

interface CrisisScreenProps {
  onContinue: () => void
}

export function CrisisScreen({ onContinue }: CrisisScreenProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-background px-6">
      <div className="max-w-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-6">
          Pause
        </p>

        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-4">
          We see you.
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground mb-12">
          {"What you're feeling right now matters. You don't have to carry this alone."}
        </p>

        <div className="h-px bg-rule mb-8" />

        <a
          href="tel:988"
          className="group flex items-center gap-2 text-gold text-sm font-medium tracking-wide transition-colors hover:text-foreground mb-8"
          aria-label="Call crisis hotline"
        >
          <span>Talk to someone now</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        <button
          onClick={onContinue}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Continue to Rushd
        </button>
      </div>
    </div>
  )
}
