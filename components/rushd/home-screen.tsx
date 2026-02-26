"use client"

import { User } from "lucide-react"
import type { NameOfAllah } from "@/lib/names-data"
import type { Screen } from "@/lib/app-state"
import { ThemeToggle } from "@/components/theme-toggle"

interface HomeScreenProps {
  dailyName: NameOfAllah
  onNavigate: (screen: Screen, nameOverride?: NameOfAllah) => void
}

export function HomeScreen({ dailyName, onNavigate }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 pt-8 pb-2">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold">
          RUSHD
        </span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center text-text-secondary"
            aria-label="Profile"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* TODAY'S NAME label */}
      <div className="px-6 pt-8">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gold">
          {"Today\u2019s Name"}
        </p>
      </div>

      {/* The Name block -- hero, 50% of screen */}
      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        {/* Arabic -- dominant */}
        <p
          className="font-serif leading-none text-arabic text-7xl sm:text-8xl"
          dir="rtl"
          lang="ar"
        >
          {dailyName.arabic}
        </p>

        {/* Transliteration */}
        <p className="mt-4 text-xl font-medium tracking-wide text-gold sm:text-2xl">
          {dailyName.transliteration}
        </p>

        {/* English meaning */}
        <p className="mt-2 text-base text-text-primary sm:text-lg">
          {dailyName.meaning}
        </p>

        {/* Reflection -- italic muted */}
        <p className="mt-4 text-base italic max-w-sm text-text-secondary sm:text-lg">
          {dailyName.reflectionPrompt}
        </p>
      </div>

      {/* Three entry door cards */}
      <div className="px-6 pb-6 flex flex-col gap-4">
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
      className="group flex w-full items-center text-left transition-colors bg-surface border-l-[3px] border-gold"
    >
      <div className="flex-1 py-5 px-5">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
          {label}
        </p>
        <p className="mt-1 text-base text-text-primary">
          {description}
        </p>
      </div>
      <div className="pr-5 text-text-secondary">
        <svg
          className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
