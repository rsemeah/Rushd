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
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <header className="flex items-center px-6 pt-8 pb-2">
        <button
          onClick={onBack}
          className="text-text-secondary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-6">
        {/* Heading -- 26px SemiBold left-aligned, no subheading */}
        <h2 className="text-2xl font-semibold tracking-tight mb-8 text-text-primary sm:text-3xl">
          {"What\u2019s pulling at you?"}
        </h2>

        {/* Vertical list, rule-separated, 56px rows */}
        <div role="group" aria-label="Emotional states">
          {emotionalStates.map((state, i) => {
            const isSelected = selectedStates.includes(state.id)
            return (
              <button
                key={state.id}
                onClick={() => onToggleState(state.id)}
                className={`group flex w-full items-center text-left transition-all h-14 ${
                  i < emotionalStates.length - 1 ? "border-b border-divider" : ""
                } ${isSelected ? "bg-elevated" : "bg-transparent"}`}
                aria-pressed={isSelected}
              >
                {/* Gold left indicator */}
                <div
                  className={`w-[3px] self-stretch transition-colors ${
                    isSelected ? "bg-gold" : "bg-transparent"
                  }`}
                />
                <span
                  className={`flex-1 px-4 text-base font-medium transition-colors ${
                    isSelected ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {state.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Open text -- minimal single line */}
        <div className="mt-6">
          <input
            type="text"
            value={localFreeText}
            onChange={(e) => handleFreeTextChange(e.target.value)}
            placeholder="Or describe it directly\u2026"
            className="w-full bg-transparent py-4 text-base focus:outline-none text-text-primary border-b border-divider placeholder:text-text-secondary/50"
          />
        </div>

        {/* CTA -- right-aligned gold text with arrow */}
        {canProceed && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={onFindName}
              className="group flex items-center gap-2 text-base font-medium tracking-wide transition-colors text-gold"
            >
              <span>{"Find the Name \u2192"}</span>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
