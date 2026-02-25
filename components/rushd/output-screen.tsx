"use client"

import { ArrowLeft, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
        {label}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-foreground">{content}</p>
    </section>
  )
}

export function OutputScreen({ name, onSave, onDone, onBack }: OutputScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
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

      <main className="flex-1 px-6 pt-2">
        {/* Name Header Card */}
        <div className="rounded-xl bg-primary px-6 py-8">
          <p
            className="text-center font-serif text-5xl leading-tight text-primary-foreground"
            dir="rtl"
            lang="ar"
          >
            {name.arabic}
          </p>
          <p className="mt-3 text-center text-sm italic tracking-wide text-primary-foreground/70">
            {name.transliteration}
          </p>
          <p className="mt-1 text-center text-base font-medium text-primary-foreground">
            {name.meaning}
          </p>

          {/* Scholar Badge */}
          <div className="mt-5 flex items-center justify-end gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-medium text-accent-foreground">
              <ShieldCheck className="h-3 w-3" />
              {"Reviewed"} &middot; {name.scholar}
            </span>
          </div>
        </div>

        {/* Four Pillars */}
        <div className="mt-6 rounded-xl bg-card p-6 shadow-sm">
          <PillarSection
            label="What this Name affirms"
            content={name.creed}
          />
          <Separator />
          <PillarSection
            label="What this corrects in you"
            content={name.correction}
          />
          <Separator />
          <PillarSection
            label="How this changes how you treat others"
            content={name.relationship}
          />
          <Separator />
          <PillarSection
            label="How this changes how you act today"
            content={name.conduct}
          />
        </div>

        {/* Dhikr, Du'a, Action */}
        <div className="mt-4 rounded-xl bg-card p-6 shadow-sm">
          {/* Dhikr */}
          <section className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
              Dhikr
            </p>
            <p
              className="mt-3 text-center font-serif text-3xl text-foreground"
              dir="rtl"
              lang="ar"
            >
              {name.dhikr}
            </p>
            <p className="mt-1 text-center text-xs italic text-muted-foreground">
              {name.dhikrTransliteration}
            </p>
          </section>

          <Separator />

          {/* Du'a */}
          <section className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
              {"Du'a"}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground">
              {name.dua}
            </p>
          </section>

          <Separator />

          {/* Action */}
          <section className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
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
            className="w-full rounded-lg bg-primary py-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            Save this session
          </Button>
          <Button
            onClick={onDone}
            variant="ghost"
            className="w-full rounded-lg py-6 text-base font-medium text-muted-foreground transition-all hover:text-foreground"
          >
            {"I'm done for now"}
          </Button>
        </div>
      </main>
    </div>
  )
}
