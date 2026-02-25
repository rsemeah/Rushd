"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import type { NameOfAllah } from "@/lib/names-data"

interface OutputScreenProps {
  name: NameOfAllah
  onSave: () => void
  onDone: () => void
  onBack: () => void
  onGoDeeper: () => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3"
      style={{ color: "#8A9AB5" }}
    >
      {children}
    </p>
  )
}

function Divider() {
  return <div className="h-px my-6" style={{ backgroundColor: "#1E2A3A" }} />
}

export function OutputScreen({ name, onSave, onDone, onBack, onGoDeeper }: OutputScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex items-center px-5 pt-6 pb-4">
        <button
          onClick={onBack}
          style={{ color: "#8A9AB5" }}
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-5">
        {/* Name header -- same layout as Study */}
        <div className="flex items-start justify-between gap-4 pb-4">
          <div className="flex-1">
            <p
              className="text-sm font-medium tracking-wide"
              style={{ color: "#C1A67B" }}
            >
              {name.transliteration}
            </p>
            <p className="mt-0.5 text-sm" style={{ color: "#F5F0E8" }}>
              {name.meaning}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" style={{ color: "#2D4A3E" }} />
              <span
                className="text-[10px] tracking-wide px-2 py-0.5"
                style={{ color: "#2D4A3E", backgroundColor: "rgba(45,74,62,0.15)" }}
              >
                {name.scholar}
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
            {name.arabic}
          </p>
        </div>

        <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

        {/* KNOW -- condensed single paragraph */}
        <div className="py-6">
          <SectionLabel>Know</SectionLabel>
          <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.9 }}>
            {name.creed}
          </p>
        </div>

        <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

        {/* FEEL -- condensed */}
        <div className="py-6">
          <SectionLabel>Feel</SectionLabel>
          <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.9 }}>
            {name.feelAnswer}
          </p>
        </div>

        <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

        {/* LIVE -- condensed */}
        <div className="py-6">
          <SectionLabel>Live</SectionLabel>
          <div className="flex flex-col gap-2">
            {name.liveStatements.map((stmt, i) => (
              <div
                key={i}
                className="py-2.5 px-4"
                style={{ borderLeft: "3px solid #C1A67B" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8" }}>
                  {stmt}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

        {/* Dhikr + Du'a */}
        <div className="py-6">
          <SectionLabel>Dhikr</SectionLabel>
          <p
            className="text-center leading-none"
            dir="rtl"
            lang="ar"
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "36px",
              color: "#C1A67B",
            }}
          >
            {name.dhikr}
          </p>
          <p className="text-center mt-1 text-xs" style={{ color: "#8A9AB5" }}>
            {name.dhikrTransliteration}
          </p>
          <p className="text-center mt-3 text-sm italic" style={{ color: "#F5F0E8", opacity: 0.8 }}>
            {name.dua}
          </p>
        </div>

        <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

        {/* One action */}
        <div className="py-6">
          <SectionLabel>One action</SectionLabel>
          <p className="text-sm leading-relaxed font-semibold" style={{ color: "#F5F0E8" }}>
            {name.action}
          </p>
        </div>

        <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

        {/* Bottom actions */}
        <div className="flex items-center justify-between py-6">
          <button
            onClick={onGoDeeper}
            className="text-sm font-medium tracking-wide transition-colors"
            style={{ color: "#C1A67B" }}
          >
            {"Go deeper \u2192"}
          </button>
          <button
            onClick={onSave}
            className="text-sm font-medium tracking-wide transition-colors"
            style={{ color: "#C1A67B" }}
          >
            {"Save session \u2192"}
          </button>
        </div>
      </main>
    </div>
  )
}
