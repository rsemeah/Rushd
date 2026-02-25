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
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <main className="flex-1 px-5 pt-6">
        {/* Header */}
        <h2
          className="text-xl font-medium tracking-tight mb-8"
          style={{ color: "#F5F0E8" }}
        >
          Your Path Through the Names
        </h2>

        {/* THE 99 grid -- 9 columns */}
        <div className="grid grid-cols-9 gap-[3px]" role="group" aria-label="99 Names progress grid">
          {allTiles.map((tile) => {
            const engaged = engagedNames.has(tile.id)
            return (
              <div
                key={tile.id}
                className="relative aspect-square flex items-center justify-center"
                style={{ backgroundColor: engaged ? "#162035" : "#1E2A3A" }}
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
                      stroke="#C1A67B"
                      strokeWidth="1"
                      strokeDasharray="63"
                      strokeDashoffset="0"
                    />
                  </svg>
                )}
                <span
                  className="relative z-10"
                  dir="rtl"
                  lang="ar"
                  style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "13px",
                    color: engaged ? "#F5F0E8" : "#8A9AB5",
                    opacity: engaged ? 1 : 0.4,
                  }}
                >
                  {tile.abbr}
                </span>
              </div>
            )
          })}
        </div>

        {/* Counter */}
        <p className="mt-4 text-[13px]" style={{ color: "#8A9AB5" }}>
          {engagedNames.size} of 99 Names engaged
        </p>

        {/* Divider */}
        <div className="h-px my-6" style={{ backgroundColor: "#1E2A3A" }} />

        {/* Streak -- secondary, understated */}
        <p className="text-sm" style={{ color: "#8A9AB5" }}>
          {streak > 0
            ? `${streak}-day streak`
            : "No active streak"}
        </p>

        {/* Calendar dot grid -- 5 weeks, minimal */}
        <div className="grid grid-cols-7 gap-1.5 mt-4" role="group" aria-label="Check-in calendar">
          {days.map((day) => {
            const checkedIn = calendarDots[day.date]
            return (
              <div
                key={day.date}
                className="flex h-4 w-4 items-center justify-center"
                aria-label={`${day.date}: ${checkedIn ? "Checked in" : "Missed"}`}
              >
                <div
                  className="h-2 w-2"
                  style={{
                    backgroundColor: checkedIn ? "#C1A67B" : "#1E2A3A",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-px my-6" style={{ backgroundColor: "#1E2A3A" }} />

        {/* Recent reflections */}
        <p
          className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "#8A9AB5" }}
        >
          Recent reflections
        </p>
        {recentReflections.length === 0 ? (
          <p className="text-sm" style={{ color: "#8A9AB5", opacity: 0.5 }}>
            No reflections yet. Complete a session to begin.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentReflections.slice(0, 3).map((ref, i) => {
              const name = namesOfAllah.find((n) => n.id === ref.nameId)
              return (
                <div key={i} className="py-3" style={{ borderBottom: "1px solid #1E2A3A" }}>
                  <p className="text-sm font-medium" style={{ color: "#C1A67B" }}>
                    {name?.transliteration || "Unknown"}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#F5F0E8", opacity: 0.8 }}>
                    {ref.text}
                  </p>
                  <p className="mt-1 text-[11px]" style={{ color: "#8A9AB5", opacity: 0.5 }}>
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
