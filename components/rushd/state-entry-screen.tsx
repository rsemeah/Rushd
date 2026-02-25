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
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex items-center px-5 pt-6 pb-2">
        <button
          onClick={onBack}
          style={{ color: "#8A9AB5" }}
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-5">
        {/* Heading -- 26px SemiBold left-aligned, no subheading */}
        <h2
          className="text-[26px] font-semibold tracking-tight mb-8"
          style={{ color: "#F5F0E8" }}
        >
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
                className="group flex w-full items-center text-left transition-all"
                style={{
                  height: "56px",
                  borderBottom:
                    i < emotionalStates.length - 1
                      ? "1px solid #1E2A3A"
                      : "none",
                  backgroundColor: isSelected ? "#162035" : "transparent",
                }}
                aria-pressed={isSelected}
              >
                {/* Gold left indicator */}
                <div
                  className="w-[3px] self-stretch transition-colors"
                  style={{
                    backgroundColor: isSelected ? "#C1A67B" : "transparent",
                  }}
                />
                <span
                  className="flex-1 px-4 text-[15px] font-medium transition-colors"
                  style={{
                    color: isSelected ? "#F5F0E8" : "#8A9AB5",
                  }}
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
            className="w-full bg-transparent py-3 text-sm focus:outline-none"
            style={{
              color: "#F5F0E8",
              borderBottom: "1px solid #1E2A3A",
            }}
          />
        </div>

        {/* CTA -- right-aligned gold text with arrow */}
        {canProceed && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={onFindName}
              className="group flex items-center gap-2 text-sm font-medium tracking-wide transition-colors"
              style={{ color: "#C1A67B" }}
            >
              <span>{"Find the Name \u2192"}</span>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
