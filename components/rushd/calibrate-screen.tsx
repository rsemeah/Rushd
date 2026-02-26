"use client"

import { useState, useCallback } from "react"
import { ShieldCheck } from "lucide-react"
import { detectCrisis } from "@/lib/names-data"

interface CalibrationResult {
  state_detected: string[]
  primary_name: string
  arabic: string
  transliteration: string
  english: string
  why: string
  know: string
  feel: string
  live: string
  dua: string
  action: string
  risk_level: "standard" | "crisis" | "scholar_required" | "vague"
}

interface CalibrateScreenProps {
  onCrisis: () => void
  onGoDeeper: (transliteration: string) => void
}

type Phase = "input" | "processing" | "output" | "error" | "scholar" | "vague"

export function CalibrateScreen({ onCrisis, onGoDeeper }: CalibrateScreenProps) {
  const [phase, setPhase] = useState<Phase>("input")
  const [input, setInput] = useState("")
  const [result, setResult] = useState<CalibrationResult | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [vagueAttempts, setVagueAttempts] = useState(0)

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    // Client-side crisis detection -- immediate
    if (detectCrisis(trimmed)) {
      onCrisis()
      return
    }

    setPhase("processing")

    try {
      const res = await fetch("/api/calibrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: trimmed }),
      })

      const data = await res.json()

      if (data.message) {
        // Scholar required from character limit
        setErrorMessage(data.message)
        setPhase("scholar")
        return
      }

      if (!data.output) {
        setErrorMessage("Something went wrong.")
        setPhase("error")
        return
      }

      const output = data.output as CalibrationResult

      if (output.risk_level === "crisis") {
        onCrisis()
        return
      }

      if (output.risk_level === "scholar_required") {
        setErrorMessage("That\u2019s a question for a scholar, not an app.")
        setPhase("scholar")
        return
      }

      if (output.risk_level === "vague") {
        if (vagueAttempts === 0) {
          setVagueAttempts(1)
          setPhase("vague")
          return
        }
        // Second vague attempt -- just show error
        setErrorMessage("Try describing a specific moment or feeling.")
        setPhase("error")
        return
      }

      setResult(output)
      setPhase("output")
    } catch {
      setErrorMessage("Connection failed. Try again.")
      setPhase("error")
    }
  }, [input, onCrisis, vagueAttempts])

  const handleReset = useCallback(() => {
    setInput("")
    setResult(null)
    setPhase("input")
    setVagueAttempts(0)
    setErrorMessage("")
  }, [])

  // INPUT STATE
  if (phase === "input" || phase === "vague") {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-24">
        <div className="flex flex-1 flex-col justify-center px-6">
          {/* Single field, full width, centered vertically */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            rows={4}
            placeholder={
              phase === "vague"
                ? "Can you say more about what\u2019s actually happening for you right now?"
                : "What\u2019s happening?"
            }
            className="w-full resize-none bg-transparent text-xl font-medium focus:outline-none text-text-primary border-b border-divider placeholder:text-text-secondary/50"
            style={{ caretColor: "var(--gold)" }}
            autoFocus
          />
          <p className="mt-4 text-base italic text-text-secondary">
            Describe your situation, your feeling, or what weighing on you. Be direct.
          </p>

          {/* Character count -- understated */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs tabular-nums text-text-secondary/40">
              {input.length}/500
            </span>

            {/* Submit arrow */}
            {input.trim().length > 0 && (
              <button
                onClick={handleSubmit}
                className="flex h-12 w-12 items-center justify-center transition-colors text-gold"
                aria-label="Submit"
              >
                <svg viewBox="0 0 16 16" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // PROCESSING STATE
  if (phase === "processing") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background pb-24">
        <p className="text-base text-text-secondary">
          Finding the Name...
        </p>
      </div>
    )
  }

  // SCHOLAR REQUIRED
  if (phase === "scholar") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-24">
        <p className="text-xl font-medium text-center mb-8 text-text-primary">
          {errorMessage}
        </p>
        <button
          onClick={handleReset}
          className="text-base font-medium tracking-wide text-gold"
        >
          {"Try something else \u2192"}
        </button>
      </div>
    )
  }

  // ERROR STATE
  if (phase === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-24">
        <p className="text-base mb-6 text-text-secondary">
          {errorMessage}
        </p>
        <button
          onClick={handleReset}
          className="text-base font-medium tracking-wide text-gold"
        >
          {"Start over \u2192"}
        </button>
      </div>
    )
  }

  // OUTPUT STATE -- structured Name delivery
  if (phase === "output" && result) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-24">
        <main className="flex-1 overflow-y-auto px-6 pt-8">
          {/* WHAT YOU SHARED */}
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-text-secondary">
            What you shared
          </p>
          <div className="py-4 px-5 mb-6 bg-elevated">
            <p className="text-base italic leading-relaxed text-text-primary/80">
              {input}
            </p>
          </div>

          {/* Thin rule */}
          <div className="h-px bg-divider" />

          {/* THE NAME */}
          <div className="py-6">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-gold">
              The Name
            </p>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-base font-medium tracking-wide text-gold sm:text-lg">
                  {result.transliteration}
                </p>
                <p className="mt-1 text-base text-text-primary">
                  {result.english}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green" />
                  <span className="text-xs tracking-wide px-2 py-1 text-green bg-green/15">
                    Scholar verified
                  </span>
                </div>
              </div>
              <p
                className="font-serif leading-none text-arabic text-5xl sm:text-6xl"
                dir="rtl"
                lang="ar"
              >
                {result.arabic}
              </p>
            </div>
          </div>

          <div className="h-px bg-divider" />

          {/* WHY THIS NAME */}
          <div className="py-6">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-text-secondary">
              Why this Name
            </p>
            <p className="text-base leading-relaxed text-text-primary/90">
              {result.why}
            </p>
          </div>

          <div className="h-px bg-divider" />

          {/* THREE LAYERS -- condensed */}
          <div className="py-6 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 text-text-secondary">
                Know
              </p>
              <p className="text-base leading-relaxed text-text-primary/90">
                {result.know}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 text-text-secondary">
                Feel
              </p>
              <p className="text-base leading-relaxed text-text-primary/90">
                {result.feel}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 text-text-secondary">
                Live
              </p>
              <div className="py-4 px-5 border-l-[3px] border-gold">
                <p className="text-base leading-relaxed text-text-primary">
                  {result.live}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-divider" />

          {/* DU'A + ACTION */}
          <div className="py-6">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-text-secondary">
              {"Du\u2019a"}
            </p>
            <p className="text-base italic leading-relaxed text-text-primary/80">
              {result.dua}
            </p>
          </div>

          <div className="h-px bg-divider" />

          <div className="py-6">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-text-secondary">
              One action
            </p>
            <p className="text-base leading-relaxed font-semibold text-text-primary">
              {result.action}
            </p>
          </div>

          <div className="h-px bg-divider" />

          {/* Bottom actions */}
          <div className="flex items-center justify-between py-6">
            <button
              onClick={() => onGoDeeper(result.transliteration)}
              className="text-base font-medium tracking-wide text-gold"
            >
              {"Go deeper \u2192"}
            </button>
            <button
              onClick={handleReset}
              className="text-base font-medium tracking-wide text-text-secondary"
            >
              {"New calibration \u2192"}
            </button>
          </div>
        </main>
      </div>
    )
  }

  return null
}
