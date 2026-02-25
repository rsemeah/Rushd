"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NameOfAllah } from "@/lib/names-data"

interface OutputScreenProps {
  name: NameOfAllah
  onSave: () => void
  onDone: () => void
  onBack: () => void
}

function PillarSection({
  label,
  content,
}: {
  label: string
  content: string
}) {
  return (
    <section className="py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        {label}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-foreground">{content}</p>
    </section>
  )
}

function PillarDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-border" />
      <svg className="h-2 w-2 text-primary/40" viewBox="0 0 8 8" fill="currentColor">
        <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" />
      </svg>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export function OutputScreen({ name, onSave, onDone, onBack }: OutputScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 pt-6 pb-2">
        <button
          onClick={onBack}
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 px-6 pt-2">
        {/* Name Header Card */}
        <div className="rounded-2xl border border-primary/20 bg-secondary px-6 py-8 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br" />

          <p
            className="text-center text-5xl leading-tight text-foreground"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {name.arabic}
          </p>
          <p className="mt-3 text-center text-sm tracking-wide text-primary"
             style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {name.transliteration}
          </p>
          <p className="mt-1 text-center text-base font-medium text-foreground">
            {name.meaning}
          </p>

          {/* Scholar Badge */}
          <div className="mt-5 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-[10px] font-medium text-primary">
              <ShieldCheck className="h-3 w-3" />
              {"Reviewed"} &middot; {name.scholar}
            </span>
          </div>
        </div>

        {/* Four Pillars */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <PillarSection
            label="What this Name affirms"
            content={name.creed}
          />
          <PillarDivider />
          <PillarSection
            label="What this corrects in you"
            content={name.correction}
          />
          <PillarDivider />
          <PillarSection
            label="How this changes how you treat others"
            content={name.relationship}
          />
          <PillarDivider />
          <PillarSection
            label="How this changes how you act today"
            content={name.conduct}
          />
        </div>

        {/* Dhikr, Du'a, Action */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          {/* Dhikr */}
          <section className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Dhikr
            </p>
            <p
              className="mt-3 text-center text-3xl text-foreground"
              dir="rtl"
              lang="ar"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {name.dhikr}
            </p>
            <p className="mt-1 text-center text-xs text-muted-foreground"
               style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              {name.dhikrTransliteration}
            </p>
          </section>

          <PillarDivider />

          {/* Du'a */}
          <section className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {"Du'a"}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground">
              {name.dua}
            </p>
          </section>

          <PillarDivider />

          {/* Action */}
          <section className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              One Action
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground">
              {name.action}
            </p>
          </section>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col gap-3 pb-4">
          <Button
            onClick={onSave}
            className="w-full rounded-xl bg-primary py-6 text-base font-semibold text-primary-foreground tracking-wide transition-all hover:bg-gold-dark active:scale-[0.98]"
          >
            Save this session
          </Button>
          <Button
            onClick={onDone}
            variant="ghost"
            className="w-full rounded-xl py-6 text-base font-medium text-muted-foreground transition-all hover:text-primary hover:bg-transparent"
          >
            {"I'm done for now"}
          </Button>
        </div>
      </main>
    </div>
  )
}
