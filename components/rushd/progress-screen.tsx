"use client"

import { useMemo } from "react"
import { namesOfAllah } from "@/lib/names-data"

interface ProgressScreenProps {
  streak: number
  calendarDots: Record<string, boolean>
  engagedNames: Set<number>
}

function getCalendarDays(): { date: string; label: string }[] {
  const days: { date: string; label: string }[] = []
  const now = new Date()
  for (let i = 27; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    days.push({
      date: d.toISOString().split("T")[0],
      label: d.getDate().toString(),
    })
  }
  return days
}

export function ProgressScreen({
  streak,
  calendarDots,
  engagedNames,
}: ProgressScreenProps) {
  const days = useMemo(() => getCalendarDays(), [])

  return (
    <div className="flex min-h-screen flex-col bg-background pb-16">
      <main className="flex-1 px-6 pt-12">
        {/* Streak */}
        <div className="mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Current streak
          </p>
        </div>
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-5xl font-bold tabular-nums text-foreground">
            {streak}
          </span>
          <span className="text-sm text-muted-foreground">
            {streak === 1 ? "day" : "days"}
          </span>
        </div>

        <div className="h-px bg-rule mb-8" />

        {/* Consistency */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Last 28 days
        </p>
        <div className="grid grid-cols-7 gap-x-3 gap-y-2 mb-8" role="group" aria-label="Check-in calendar">
          {days.map((day) => {
            const checkedIn = calendarDots[day.date]
            return (
              <div key={day.date} className="flex flex-col items-center gap-1.5">
                <span className="text-[9px] text-muted-foreground/40 tabular-nums">
                  {day.label}
                </span>
                <div
                  className={`h-2 w-2 transition-colors ${
                    checkedIn
                      ? "bg-gold"
                      : "bg-rule"
                  }`}
                  aria-label={`${day.date}: ${checkedIn ? "Checked in" : "Missed"}`}
                />
              </div>
            )
          })}
        </div>

        <div className="h-px bg-rule mb-8" />

        {/* Mastery */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Names engaged
        </p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold tabular-nums text-foreground">
            {engagedNames.size}
          </span>
          <span className="text-sm text-muted-foreground">of 99</span>
        </div>

        {/* Names grid -- minimal squares */}
        <div className="grid grid-cols-11 gap-1" role="group" aria-label="Names mastery grid">
          {namesOfAllah.map((name) => {
            const engaged = engagedNames.has(name.id)
            return (
              <div
                key={name.id}
                className={`aspect-square transition-colors ${
                  engaged ? "bg-gold" : "bg-rule"
                }`}
                title={name.transliteration}
                aria-label={`${name.transliteration}: ${engaged ? "Engaged" : "Not yet"}`}
              />
            )
          })}
        </div>

        <p className="mt-8 pb-4 text-xs text-muted-foreground">
          Keep returning.
        </p>
      </main>
    </div>
  )
}
