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

      {/* Persistent Name header */}
      <div className="px-5 pb-4">
        <div className="flex items-start justify-between gap-4">
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
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: "#1E2A3A" }} />

      {/* Tabs */}
      <div className="flex px-5 pt-4 gap-6">
        {(["know", "feel", "live"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="pb-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
            style={{
              color: tab === t ? "#C1A67B" : "#8A9AB5",
              borderBottom: tab === t ? "1px solid #C1A67B" : "1px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        {tab === "know" && <KnowTab name={name} />}
        {tab === "feel" && <FeelTab name={name} />}
        {tab === "live" && <LiveTab name={name} stages={stages} toggleStage={toggleStage} />}
      </div>
    </div>
  )
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

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.9 }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div className="h-px my-6" style={{ backgroundColor: "#1E2A3A" }} />
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
        className="text-lg leading-relaxed"
        dir="rtl"
        lang="ar"
        style={{ fontFamily: "'Amiri', serif", color: "#F5F0E8" }}
      >
        {name.quranicRef.split(" \u2014 ")[0]}
      </p>
      {name.quranicRef.includes(" \u2014 ") && (
        <p className="mt-1 text-xs" style={{ color: "#8A9AB5" }}>
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
      <p className="text-xl font-medium text-center mb-6" style={{ color: "#F5F0E8" }}>
        {name.feelQuestion}
      </p>
      <SectionText>{name.feelAnswer}</SectionText>
      <Divider />
      <SectionLabel>Where you feel this</SectionLabel>
      <div className="flex flex-col gap-5">
        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
            style={{ color: "#C1A67B" }}
          >
            In your work
          </p>
          <SectionText>{name.feelWork}</SectionText>
        </div>
        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
            style={{ color: "#C1A67B" }}
          >
            In your relationships
          </p>
          <SectionText>{name.feelRelationships}</SectionText>
        </div>
        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
            style={{ color: "#C1A67B" }}
          >
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
      <p className="text-xl font-medium text-center mb-6" style={{ color: "#F5F0E8" }}>
        {name.liveQuestion}
      </p>

      {/* Behavioral statements with gold left border */}
      <div className="flex flex-col gap-3 mb-6">
        {name.liveStatements.map((stmt, i) => (
          <div
            key={i}
            className="py-3 px-4"
            style={{ borderLeft: "3px solid #C1A67B", backgroundColor: "rgba(17,30,50,0.5)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8" }}>
              {stmt}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Dhikr */}
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

      <Divider />

      {/* One action */}
      <SectionLabel>One action</SectionLabel>
      <p className="text-sm leading-relaxed font-semibold" style={{ color: "#F5F0E8" }}>
        {name.action}
      </p>

      <Divider />

      {/* Ahsaha stages */}
      <SectionLabel>{"A\u1E25\u1E63\u0101h\u0101 stages"}</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {stageLabels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleStage(key)}
            className="flex items-center gap-2 py-2 px-3 text-left transition-colors"
            style={{
              backgroundColor: stages[key] ? "rgba(193,166,123,0.1)" : "transparent",
              border: `1px solid ${stages[key] ? "#C1A67B" : "#1E2A3A"}`,
            }}
          >
            <div
              className="flex h-4 w-4 items-center justify-center shrink-0"
              style={{
                border: `1px solid ${stages[key] ? "#C1A67B" : "#8A9AB5"}`,
              }}
            >
              {stages[key] && (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#C1A67B" strokeWidth="1.5" />
                </svg>
              )}
            </div>
            <span
              className="text-xs"
              style={{ color: stages[key] ? "#C1A67B" : "#8A9AB5" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
