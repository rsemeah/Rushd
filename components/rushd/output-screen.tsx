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
    <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-text-secondary">
      {children}
    </p>
  )
}

export function OutputScreen({ name, onSave, onBack, onGoDeeper }: OutputScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <header className="flex items-center px-6 pt-8 pb-4">
        <button
          onClick={onBack}
          className="text-text-secondary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-6">
        {/* Name header -- same layout as Study */}
        <div className="flex items-start justify-between gap-4 pb-4">
          <div className="flex-1">
            <p className="text-base font-medium tracking-wide text-gold sm:text-lg">
              {name.transliteration}
            </p>
            <p className="mt-1 text-base text-text-primary">
              {name.meaning}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green" />
              <span className="text-xs tracking-wide px-2 py-1 text-green bg-green/15">
                {name.scholar}
              </span>
            </div>
          </div>
          <p
            className="font-serif leading-none text-arabic text-5xl sm:text-6xl"
            dir="rtl"
            lang="ar"
          >
            {name.arabic}
          </p>
        </div>

        <div className="h-px bg-divider" />

        {/* KNOW -- condensed single paragraph */}
        <div className="py-6">
          <SectionLabel>Know</SectionLabel>
          <p className="text-base leading-relaxed text-text-primary/90">
            {name.creed}
          </p>
        </div>

        <div className="h-px bg-divider" />

        {/* FEEL -- condensed */}
        <div className="py-6">
          <SectionLabel>Feel</SectionLabel>
          <p className="text-base leading-relaxed text-text-primary/90">
            {name.feelAnswer}
          </p>
        </div>

        <div className="h-px bg-divider" />

        {/* LIVE -- condensed */}
        <div className="py-6">
          <SectionLabel>Live</SectionLabel>
          <div className="flex flex-col gap-3">
            {name.liveStatements.map((stmt, i) => (
              <div
                key={i}
                className="py-4 px-5 border-l-[3px] border-gold"
              >
                <p className="text-base leading-relaxed text-text-primary">
                  {stmt}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-divider" />

        {/* Dhikr + Du'a */}
        <div className="py-6">
          <SectionLabel>Dhikr</SectionLabel>
          <p
            className="text-center leading-none font-serif text-gold text-4xl"
            dir="rtl"
            lang="ar"
          >
            {name.dhikr}
          </p>
          <p className="text-center mt-2 text-sm text-text-secondary">
            {name.dhikrTransliteration}
          </p>
          <p className="text-center mt-4 text-base italic text-text-primary/80">
            {name.dua}
          </p>
        </div>

        <div className="h-px bg-divider" />

        {/* One action */}
        <div className="py-6">
          <SectionLabel>One action</SectionLabel>
          <p className="text-base leading-relaxed font-semibold text-text-primary">
            {name.action}
          </p>
        </div>

        <div className="h-px bg-divider" />

        {/* Bottom actions */}
        <div className="flex items-center justify-between py-6">
          <button
            onClick={onGoDeeper}
            className="text-base font-medium tracking-wide transition-colors text-gold"
          >
            {"Go deeper \u2192"}
          </button>
          <button
            onClick={onSave}
            className="text-base font-medium tracking-wide transition-colors text-gold"
          >
            {"Save session \u2192"}
          </button>
        </div>
      </main>
    </div>
  )
}
