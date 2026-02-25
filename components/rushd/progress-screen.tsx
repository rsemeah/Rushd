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

const allNamesGrid = namesOfAllah.map((n) => ({
  id: n.id,
  letter: n.arabic.slice(0, 3),
  transliteration: n.transliteration,
}))

export function ProgressScreen({
  streak,
  calendarDots,
  engagedNames,
}: ProgressScreenProps) {
  const days = useMemo(() => getCalendarDays(), [])

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Journey
        </h1>
      </header>

      <main className="flex-1 px-6 pt-4">
        {/* Streak Card */}
        <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-6 right-6 h-px bg-primary/30" />
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums text-primary"
                  style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {streak}
            </span>
            <span className="text-sm text-muted-foreground">
              {streak === 1 ? "day" : "days"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Current streak</p>
        </div>

        {/* Consistency - Calendar Dot Grid */}
        <section className="mt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Consistency
          </h3>
          <div className="mt-3 grid grid-cols-7 gap-2" role="group" aria-label="Check-in calendar">
            {days.map((day) => {
              const checkedIn = calendarDots[day.date]
              return (
                <div key={day.date} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground/60">
                    {day.label}
                  </span>
                  <div
                    className={`h-3.5 w-3.5 rounded-full transition-colors ${
                      checkedIn
                        ? "bg-primary"
                        : "border border-border bg-transparent"
                    }`}
                    aria-label={`${day.date}: ${checkedIn ? "Checked in" : "Missed"}`}
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Mastery - Names Grid */}
        <section className="mt-8">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Mastery
          </h3>
          <div className="mt-3 grid grid-cols-7 gap-2" role="group" aria-label="Names mastery grid">
            {allNamesGrid.map((name) => {
              const engaged = engagedNames.has(name.id)
              return (
                <div
                  key={name.id}
                  className="relative flex items-center justify-center"
                  title={name.transliteration}
                >
                  <svg className="h-10 w-10" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-border"
                    />
                    {engaged && (
                      <circle
                        cx="20"
                        cy="20"
                        r="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeDasharray={`${2 * Math.PI * 17}`}
                        strokeDashoffset={`${2 * Math.PI * 17 * 0.25}`}
                        strokeLinecap="round"
                        className="text-primary"
                        transform="rotate(-90 20 20)"
                      />
                    )}
                  </svg>
                  <span
                    className={`absolute text-[10px] font-medium ${
                      engaged ? "text-primary" : "text-muted-foreground"
                    }`}
                    dir="rtl"
                    lang="ar"
                  >
                    {name.letter}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Bottom Message */}
        <p className="mt-8 pb-4 text-center text-sm text-muted-foreground"
           style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          {"You've engaged with "}
          <span className="font-medium text-primary">{engagedNames.size}</span>
          {" Name"}
          {engagedNames.size !== 1 ? "s" : ""}
          {". Keep returning."}
        </p>
      </main>
    </div>
  )
}
