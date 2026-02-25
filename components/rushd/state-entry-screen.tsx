"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
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
    <div className="flex min-h-screen flex-col bg-background pb-16">
      {/* Header */}
      <header className="flex items-center px-6 pt-8 pb-6">
        <button
          onClick={onBack}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-6">
        {/* Title */}
        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-8">
          {"What's pulling at you?"}
        </h2>

        {/* Vertical state list */}
        <div role="group" aria-label="Emotional states">
          {emotionalStates.map((state, i) => {
            const isSelected = selectedStates.includes(state.id)
            return (
              <button
                key={state.id}
                onClick={() => onToggleState(state.id)}
                className={`group flex w-full items-center text-left transition-all ${
                  i < emotionalStates.length - 1 ? "border-b border-rule" : ""
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`w-0.5 self-stretch transition-colors ${
                    isSelected ? "bg-gold" : "bg-transparent"
                  }`}
                />
                <span
                  className={`flex-1 py-4 pl-4 text-base font-medium transition-colors ${
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground/70"
                  }`}
                >
                  {state.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Free text -- single line, minimal */}
        <div className="mt-8">
          <input
            type="text"
            value={localFreeText}
            onChange={(e) => handleFreeTextChange(e.target.value)}
            placeholder="Or say it directly..."
            className="w-full border-b border-rule bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-gold focus:outline-none"
          />
        </div>

        {/* CTA -- right-aligned text link with arrow */}
        <div className="mt-10 flex justify-end">
          {canProceed && (
            <button
              onClick={onFindName}
              className="group flex items-center gap-2 text-gold text-sm font-medium tracking-wide transition-colors hover:text-foreground"
            >
              <span>Find the Name</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
