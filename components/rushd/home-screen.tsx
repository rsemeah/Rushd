"use client"

import { User } from "lucide-react"
import type { NameOfAllah } from "@/lib/names-data"
import type { Screen } from "@/lib/app-state"

interface HomeScreenProps {
  dailyName: NameOfAllah
  onNavigate: (screen: Screen, nameOverride?: NameOfAllah) => void
}

export function HomeScreen({ dailyName, onNavigate }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-6 pb-2">
        <span
          className="text-[11px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: "#C1A67B" }}
        >
          RUSHD
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center"
          style={{ color: "#8A9AB5" }}
          aria-label="Profile"
        >
          <User className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </header>

      {/* TODAY'S NAME label */}
      <div className="px-5 pt-6">
        <p
          className="text-[11px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: "#C1A67B" }}
        >
          {"Today\u2019s Name"}
        </p>
      </div>

      {/* The Name block -- hero, 50% of screen */}
      <div className="flex flex-1 flex-col justify-center px-5">
        {/* Arabic -- dominant */}
        <p
          className="leading-none"
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: "'Amiri', serif",
            fontSize: "72px",
            color: "#F5F0E8",
          }}
        >
          {dailyName.arabic}
        </p>

        {/* Transliteration */}
        <p
          className="mt-3 text-lg font-medium tracking-wide"
          style={{ color: "#C1A67B" }}
        >
          {dailyName.transliteration}
        </p>

        {/* English meaning */}
        <p
          className="mt-1 text-[15px]"
          style={{ color: "#F5F0E8" }}
        >
          {dailyName.meaning}
        </p>

        {/* Reflection -- italic muted */}
        <p
          className="mt-3 text-[15px] italic max-w-xs"
          style={{ color: "#8A9AB5" }}
        >
          {dailyName.reflectionPrompt}
        </p>
      </div>

      {/* Three entry door cards */}
      <div className="px-5 pb-4 flex flex-col gap-3">
        <EntryCard
          label="Study this Name"
          description="Learn who Allah is"
          onClick={() => onNavigate("study", dailyName)}
        />
        <EntryCard
          label="Calibrate"
          description="Route to the right Name"
          onClick={() => onNavigate("calibrate")}
        />
        <EntryCard
          label="Check in"
          description="Struggling in a moment"
          onClick={() => onNavigate("check-in")}
        />
        <EntryCard
          label="My Journey"
          description="Long-term growth"
          onClick={() => onNavigate("journey")}
        />
      </div>
    </div>
  )
}

function EntryCard({
  label,
  description,
  onClick,
}: {
  label: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center text-left transition-colors"
      style={{ backgroundColor: "#111E32", borderLeft: "3px solid #C1A67B" }}
    >
      <div className="flex-1 py-4 px-4">
        <p
          className="text-[11px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: "#C1A67B" }}
        >
          {label}
        </p>
        <p
          className="mt-0.5 text-sm"
          style={{ color: "#F5F0E8" }}
        >
          {description}
        </p>
      </div>
      <div className="pr-4" style={{ color: "#8A9AB5" }}>
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 3l5 5-5 5" />
        </svg>
      </div>
    </button>
  )
}
