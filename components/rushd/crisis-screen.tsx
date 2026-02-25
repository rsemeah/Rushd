"use client"

import { Button } from "@/components/ui/button"

interface CrisisScreenProps {
  onContinue: () => void
}

export function CrisisScreen({ onContinue }: CrisisScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-8">
      <div className="max-w-sm text-center">
        {/* Gold diamond accent */}
        <div className="flex justify-center mb-6">
          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
          We see you.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {"What you're feeling right now matters. You don't have to carry this alone."}
        </p>

        <Button
          asChild
          className="mt-10 w-full rounded-xl bg-primary py-6 text-base font-semibold text-primary-foreground tracking-wide transition-all hover:bg-gold-dark active:scale-[0.98]"
        >
          <a href="tel:988" aria-label="Call crisis hotline">
            Talk to someone now
          </a>
        </Button>

        <button
          onClick={onContinue}
          className="mt-6 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Continue to Rushd
        </button>
      </div>
    </div>
  )
}
