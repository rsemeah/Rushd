"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { emotionalStates, detectCrisis } from "@/lib/names-data"

interface StateEntryScreenProps {
  selectedStates: string[]
  onToggleState: (stateId: string) => void
  onFreeTextChange: (text: string) => void
  freeText: string
  onFindName: () => void
  onBack: () => void
  onCrisis: () => void
}

export function StateEntryScreen({
  selectedStates,
  onToggleState,
  onFreeTextChange,
  freeText,
  onFindName,
  onBack,
  onCrisis,
}: StateEntryScreenProps) {
  const [localFreeText, setLocalFreeText] = useState(freeText)

  const handleFreeTextChange = (text: string) => {
    setLocalFreeText(text)
    onFreeTextChange(text)
    if (detectCrisis(text)) {
      onCrisis()
    }
  }

  const canProceed = selectedStates.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 pt-6 pb-2">
        <button
          onClick={onBack}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-6 pt-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {"What's pulling at you right now?"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {"Select what resonates. There's no wrong answer."}
        </p>

        {/* State Cards Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3" role="group" aria-label="Emotional states">
          {emotionalStates.map((state) => {
            const isSelected = selectedStates.includes(state.id)
            return (
              <button
                key={state.id}
                onClick={() => onToggleState(state.id)}
                className={`rounded-xl px-4 py-4 text-left text-sm font-medium transition-all ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5 text-foreground"
                    : "border border-border bg-card text-foreground hover:border-muted-foreground/30"
                }`}
                aria-pressed={isSelected}
              >
                {state.label}
              </button>
            )
          })}
        </div>

        {/* Free Text */}
        <div className="mt-6">
          <textarea
            value={localFreeText}
            onChange={(e) => handleFreeTextChange(e.target.value)}
            placeholder="Or describe it in your own words..."
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
            rows={3}
          />
        </div>

        {/* CTA */}
        <Button
          onClick={onFindName}
          disabled={!canProceed}
          className="mt-8 w-full rounded-lg bg-primary py-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
        >
          Find my Name
        </Button>
      </main>
    </div>
  )
}
