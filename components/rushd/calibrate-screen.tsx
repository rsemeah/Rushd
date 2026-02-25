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
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <div className="flex flex-1 flex-col justify-center px-5">
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
            className="w-full resize-none bg-transparent text-lg font-medium focus:outline-none"
            style={{
              color: "#F5F0E8",
              borderBottom: "1px solid #1E2A3A",
              caretColor: "#C1A67B",
            }}
            autoFocus
          />
          <p
            className="mt-3 text-sm italic"
            style={{ color: "#8A9AB5" }}
          >
            Describe your situation, your feeling, or what weighing on you. Be direct.
          </p>

          {/* Character count -- understated */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] tabular-nums" style={{ color: "#8A9AB5", opacity: 0.4 }}>
              {input.length}/500
            </span>

            {/* Submit arrow */}
            {input.trim().length > 0 && (
              <button
                onClick={handleSubmit}
                className="flex h-10 w-10 items-center justify-center transition-colors"
                style={{ color: "#C1A67B" }}
                aria-label="Submit"
              >
                <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background pb-20">
        <p className="text-sm" style={{ color: "#8A9AB5" }}>
          Finding the Name...
        </p>
      </div>
    )
  }

  // SCHOLAR REQUIRED
  if (phase === "scholar") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-20">
        <p
          className="text-lg font-medium text-center mb-8"
          style={{ color: "#F5F0E8" }}
        >
          {errorMessage}
        </p>
        <button
          onClick={handleReset}
          className="text-sm font-medium tracking-wide"
          style={{ color: "#C1A67B" }}
        >
          {"Try something else \u2192"}
        </button>
      </div>
    )
  }

  // ERROR STATE
  if (phase === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-20">
        <p className="text-sm mb-6" style={{ color: "#8A9AB5" }}>
          {errorMessage}
        </p>
        <button
          onClick={handleReset}
          className="text-sm font-medium tracking-wide"
          style={{ color: "#C1A67B" }}
        >
          {"Start over \u2192"}
        </button>
      </div>
    )
  }

  // OUTPUT STATE -- structured Name delivery
  if (phase === "output" && result) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <main className="flex-1 overflow-y-auto px-5 pt-6">
          {/* WHAT YOU SHARED */}
          <p
            className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "#8A9AB5" }}
          >
            What you shared
          </p>
          <div className="py-3 px-4 mb-6" style={{ backgroundColor: "#162035" }}>
            <p className="text-sm italic leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.8 }}>
              {input}
            </p>
          </div>

          {/* Thin rule */}
          <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

          {/* THE NAME */}
          <div className="py-6">
            <p
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ color: "#C1A67B" }}
            >
              The Name
            </p>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p
                  className="text-sm font-medium tracking-wide"
                  style={{ color: "#C1A67B" }}
                >
                  {result.transliteration}
                </p>
                <p className="mt-0.5 text-sm" style={{ color: "#F5F0E8" }}>
                  {result.english}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" style={{ color: "#2D4A3E" }} />
                  <span
                    className="text-[10px] tracking-wide px-2 py-0.5"
                    style={{ color: "#2D4A3E", backgroundColor: "rgba(45,74,62,0.15)" }}
                  >
                    Scholar verified
                  </span>
                </div>
              </div>
              <p
                className="leading-none"
                dir="rtl"
                lang="ar"
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "52px",
                  color: "#F5F0E8",
                }}
              >
                {result.arabic}
              </p>
            </div>
          </div>

          <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

          {/* WHY THIS NAME */}
          <div className="py-6">
            <p
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#8A9AB5" }}
            >
              Why this Name
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.9 }}>
              {result.why}
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

          {/* THREE LAYERS -- condensed */}
          <div className="py-6 flex flex-col gap-5">
            <div>
              <p
                className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2"
                style={{ color: "#8A9AB5" }}
              >
                Know
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.9 }}>
                {result.know}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2"
                style={{ color: "#8A9AB5" }}
              >
                Feel
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.9 }}>
                {result.feel}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2"
                style={{ color: "#8A9AB5" }}
              >
                Live
              </p>
              <div className="py-2.5 px-4" style={{ borderLeft: "3px solid #C1A67B" }}>
                <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8" }}>
                  {result.live}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

          {/* DU'A + ACTION */}
          <div className="py-6">
            <p
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#8A9AB5" }}
            >
              {"Du\u2019a"}
            </p>
            <p className="text-sm italic leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.8 }}>
              {result.dua}
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

          <div className="py-6">
            <p
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#8A9AB5" }}
            >
              One action
            </p>
            <p className="text-sm leading-relaxed font-semibold" style={{ color: "#F5F0E8" }}>
              {result.action}
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

          {/* Bottom actions */}
          <div className="flex items-center justify-between py-6">
            <button
              onClick={() => onGoDeeper(result.transliteration)}
              className="text-sm font-medium tracking-wide"
              style={{ color: "#C1A67B" }}
            >
              {"Go deeper \u2192"}
            </button>
            <button
              onClick={handleReset}
              className="text-sm font-medium tracking-wide"
              style={{ color: "#8A9AB5" }}
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
