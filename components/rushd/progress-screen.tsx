"use client"

import { useMemo } from "react"
import { namesOfAllah } from "@/lib/names-data"

interface ProgressScreenProps {
  streak: number
  calendarDots: Record<string, boolean>
  engagedNames: Set<number>
  recentReflections: { nameId: number; text: string; date: string }[]
}

function getCalendarDays(): { date: string; label: string }[] {
  const days: { date: string; label: string }[] = []
  const now = new Date()
  for (let i = 34; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    days.push({
      date: d.toISOString().split("T")[0],
      label: d.getDate().toString(),
    })
  }
  return days
}

// Generate 99 abbreviation tiles
const allTiles = Array.from({ length: 99 }, (_, i) => {
  const name = namesOfAllah[i % namesOfAllah.length]
  // Use first 2 chars of Arabic as abbreviation
  const abbr = name ? name.arabic.slice(0, 3) : String(i + 1)
  return { id: i + 1, abbr, transliteration: name?.transliteration || `Name ${i + 1}` }
})

export function ProgressScreen({
  streak,
  calendarDots,
  engagedNames,
  recentReflections,
}: ProgressScreenProps) {
  const days = useMemo(() => getCalendarDays(), [])

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <main className="flex-1 px-6 pt-8">
        {/* Header */}
        <h2 className="text-2xl font-medium tracking-tight mb-8 text-text-primary">
          Your Path Through the Names
        </h2>

        {/* THE 99 grid -- 9 columns */}
        <div className="grid grid-cols-9 gap-1" role="group" aria-label="99 Names progress grid">
          {allTiles.map((tile) => {
            const engaged = engagedNames.has(tile.id)
            return (
              <div
                key={tile.id}
                className={`relative aspect-square flex items-center justify-center ${
                  engaged ? "bg-elevated" : "bg-divider"
                }`}
                title={tile.transliteration}
                aria-label={`${tile.transliteration}: ${engaged ? "Engaged" : "Not yet"}`}
              >
                {/* Gold arc for engaged names */}
                {engaged && (
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      className="stroke-gold"
                      strokeWidth="1"
                      strokeDasharray="63"
                      strokeDashoffset="0"
                    />
                  </svg>
                )}
                <span
                  className={`relative z-10 font-serif text-sm ${
                    engaged ? "text-arabic" : "text-text-secondary opacity-40"
                  }`}
                  dir="rtl"
                  lang="ar"
                >
                  {tile.abbr}
                </span>
              </div>
            )
          })}
        </div>

        {/* Counter */}
        <p className="mt-4 text-sm text-text-secondary">
          {engagedNames.size} of 99 Names engaged
        </p>

        {/* Divider */}
        <div className="h-px my-6 bg-divider" />

        {/* Streak -- secondary, understated */}
        <p className="text-base text-text-secondary">
          {streak > 0
            ? `${streak}-day streak`
            : "No active streak"}
        </p>

        {/* Calendar dot grid -- 5 weeks, minimal */}
        <div className="grid grid-cols-7 gap-2 mt-4" role="group" aria-label="Check-in calendar">
          {days.map((day) => {
            const checkedIn = calendarDots[day.date]
            return (
              <div
                key={day.date}
                className="flex h-5 w-5 items-center justify-center"
                aria-label={`${day.date}: ${checkedIn ? "Checked in" : "Missed"}`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    checkedIn ? "bg-gold" : "bg-divider"
                  }`}
                />
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-px my-6 bg-divider" />

        {/* Recent reflections */}
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-text-secondary">
          Recent reflections
        </p>
        {recentReflections.length === 0 ? (
          <p className="text-base text-text-secondary opacity-50">
            No reflections yet. Complete a session to begin.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentReflections.slice(0, 3).map((ref, i) => {
              const name = namesOfAllah.find((n) => n.id === ref.nameId)
              return (
                <div key={i} className="py-4 border-b border-divider">
                  <p className="text-base font-medium text-gold">
                    {name?.transliteration || "Unknown"}
                  </p>
                  <p className="mt-2 text-base text-text-primary opacity-80">
                    {ref.text}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary opacity-50">
                    {ref.date}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
