"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import type { NameOfAllah } from "@/lib/names-data"

interface OutputScreenProps {
  name: NameOfAllah
  onSave: () => void
  onDone: () => void
  onBack: () => void
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="py-6 border-b border-rule">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-3">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  )
}

export function OutputScreen({ name, onSave, onDone, onBack }: OutputScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
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
        {/* Name header block */}
        <div className="mb-2">
          <p
            className="text-6xl leading-none text-foreground"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {name.arabic}
          </p>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="text-sm font-medium text-gold tracking-wide">
              {name.transliteration}
            </p>
            <span className="text-muted-foreground/30">|</span>
            <p className="text-sm text-muted-foreground">
              {name.meaning}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground tracking-wide">
              {name.scholar}
            </span>
          </div>
        </div>

        <div className="h-px bg-rule mt-6" />

        {/* Four Pillars */}
        <Section label="What this Name affirms">
          <p>{name.creed}</p>
        </Section>

        <Section label="What this corrects in you">
          <p>{name.correction}</p>
        </Section>

        <Section label="How this changes how you treat others">
          <p>{name.relationship}</p>
        </Section>

        <Section label="How this changes how you act today">
          <p>{name.conduct}</p>
        </Section>

        {/* Dhikr */}
        <section className="py-6 border-b border-rule">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Dhikr
          </p>
          <p
            className="text-3xl text-foreground"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {name.dhikr}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {name.dhikrTransliteration}
          </p>
        </section>

        {/* Du'a */}
        <Section label="Du'a">
          <p>{name.dua}</p>
        </Section>

        {/* Action */}
        <Section label="One action">
          <p>{name.action}</p>
        </Section>

        {/* Bottom actions */}
        <div className="flex items-center justify-between py-8">
          <button
            onClick={onDone}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Done
          </button>
          <button
            onClick={onSave}
            className="group flex items-center gap-2 text-gold text-sm font-medium tracking-wide transition-colors hover:text-foreground"
          >
            <span>Save session</span>
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
        </div>
      </main>
    </div>
  )
}
