"use client"

import { useState } from "react"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import type { NameOfAllah } from "@/lib/names-data"

interface StudyScreenProps {
  name: NameOfAllah
  onBack: () => void
}

type Tab = "know" | "feel" | "live"

export function StudyScreen({ name, onBack }: StudyScreenProps) {
  const [tab, setTab] = useState<Tab>("know")
  const [stages, setStages] = useState<Record<string, boolean>>({
    memorised: false,
    understood: false,
    reflected: false,
    dua: false,
    applied: false,
    taught: false,
  })

  const toggleStage = (key: string) => {
    setStages((prev) => ({ ...prev, [key]: !prev[key] }))
  }

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

      {/* Persistent Name header */}
      <div className="px-6 pb-4">
        <div className="flex items-start justify-between gap-4">
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
      </div>

      {/* Divider */}
      <div className="h-px bg-divider" />

      {/* Tabs */}
      <div className="flex px-6 pt-5 gap-8">
        {(["know", "feel", "live"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-xs font-semibold tracking-[0.2em] uppercase transition-colors border-b ${
              tab === t
                ? "text-gold border-gold"
                : "text-text-secondary border-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
        {tab === "know" && <KnowTab name={name} />}
        {tab === "feel" && <FeelTab name={name} />}
        {tab === "live" && <LiveTab name={name} stages={stages} toggleStage={toggleStage} />}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-text-secondary">
      {children}
    </p>
  )
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed text-text-primary opacity-90">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="h-px my-6 bg-divider" />
}

function KnowTab({ name }: { name: NameOfAllah }) {
  return (
    <>
      <SectionLabel>What this Name affirms</SectionLabel>
      <SectionText>{name.creed}</SectionText>
      <Divider />
      <SectionLabel>What this Name does not mean</SectionLabel>
      <SectionText>{name.doesNotMean}</SectionText>
      <Divider />
      <SectionLabel>{"Qur\u2019anic occurrences"}</SectionLabel>
      <p
        className="text-xl leading-relaxed font-serif text-arabic"
        dir="rtl"
        lang="ar"
      >
        {name.quranicRef.split(" \u2014 ")[0]}
      </p>
      {name.quranicRef.includes(" \u2014 ") && (
        <p className="mt-2 text-sm text-text-secondary">
          {name.quranicRef.split(" \u2014 ").slice(1).join(" \u2014 ")}
        </p>
      )}
      <Divider />
      <SectionLabel>Hadith usage</SectionLabel>
      <SectionText>{name.hadithRef}</SectionText>
    </>
  )
}

function FeelTab({ name }: { name: NameOfAllah }) {
  return (
    <>
      {/* Central question */}
      <p className="text-xl font-medium text-center mb-6 text-text-primary sm:text-2xl">
        {name.feelQuestion}
      </p>
      <SectionText>{name.feelAnswer}</SectionText>
      <Divider />
      <SectionLabel>Where you feel this</SectionLabel>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-gold">
            In your work
          </p>
          <SectionText>{name.feelWork}</SectionText>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-gold">
            In your relationships
          </p>
          <SectionText>{name.feelRelationships}</SectionText>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-gold">
            In your self-talk
          </p>
          <SectionText>{name.feelSelfTalk}</SectionText>
        </div>
      </div>
    </>
  )
}

function LiveTab({
  name,
  stages,
  toggleStage,
}: {
  name: NameOfAllah
  stages: Record<string, boolean>
  toggleStage: (key: string) => void
}) {
  const stageLabels = [
    { key: "memorised", label: "Memorised" },
    { key: "understood", label: "Understood" },
    { key: "reflected", label: "Reflected" },
    { key: "dua", label: "Used in du\u2019a" },
    { key: "applied", label: "Applied" },
    { key: "taught", label: "Taught" },
  ]

  return (
    <>
      {/* Central question */}
      <p className="text-xl font-medium text-center mb-6 text-text-primary sm:text-2xl">
        {name.liveQuestion}
      </p>

      {/* Behavioral statements with gold left border */}
      <div className="flex flex-col gap-4 mb-6">
        {name.liveStatements.map((stmt, i) => (
          <div
            key={i}
            className="py-4 px-5 border-l-[3px] border-gold bg-surface/50"
          >
            <p className="text-base leading-relaxed text-text-primary">
              {stmt}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Dhikr */}
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
      <p className="text-center mt-4 text-base italic text-text-primary opacity-80">
        {name.dua}
      </p>

      <Divider />

      {/* One action */}
      <SectionLabel>One action</SectionLabel>
      <p className="text-base leading-relaxed font-semibold text-text-primary">
        {name.action}
      </p>

      <Divider />

      {/* Ahsaha stages */}
      <SectionLabel>{"A\u1E25\u1E63\u0101h\u0101 stages"}</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {stageLabels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleStage(key)}
            className={`flex items-center gap-3 py-3 px-4 text-left transition-colors border ${
              stages[key]
                ? "bg-gold/10 border-gold"
                : "bg-transparent border-divider"
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center shrink-0 border ${
                stages[key] ? "border-gold" : "border-text-secondary"
              }`}
            >
              {stages[key] && (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path d="M2 6l3 3 5-5" className="stroke-gold" strokeWidth="1.5" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm ${stages[key] ? "text-gold" : "text-text-secondary"}`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
