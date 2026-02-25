"use client"

import { Button } from "@/components/ui/button"

interface CrisisScreenProps {
  onContinue: () => void
}

export function CrisisScreen({ onContinue }: CrisisScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-8">
      <div className="max-w-sm text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">
          We see you.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
          {"What you're feeling right now matters. You don't have to carry this alone."}
        </p>

        <Button
          asChild
          className="mt-10 w-full rounded-lg bg-primary-foreground py-6 text-base font-medium text-primary transition-all hover:opacity-90"
        >
          <a href="tel:988" aria-label="Call crisis hotline">
            Talk to someone now
          </a>
        </Button>

        <button
          onClick={onContinue}
          className="mt-6 text-sm text-primary-foreground/50 underline-offset-4 transition-colors hover:text-primary-foreground/70 hover:underline"
        >
          Continue to Rushd
        </button>
      </div>
    </div>
  )
}
