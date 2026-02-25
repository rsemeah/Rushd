"use client"

import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { NameOfAllah } from "@/lib/names-data"

interface HomeScreenProps {
  dailyName: NameOfAllah
  onCheckIn: () => void
}

export function HomeScreen({ dailyName, onCheckIn }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Rushd
        </h1>
        <button
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      {/* Daily Anchor Name Card */}
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="rounded-xl bg-card p-8 shadow-sm">
            {/* Arabic Name */}
            <p
              className="text-center font-serif text-5xl leading-tight text-foreground"
              dir="rtl"
              lang="ar"
            >
              {dailyName.arabic}
            </p>

            {/* Transliteration */}
            <p className="mt-3 text-center text-sm italic tracking-wide text-muted-foreground">
              {dailyName.transliteration}
            </p>

            {/* English Meaning */}
            <p className="mt-1 text-center text-base font-medium text-foreground">
              {dailyName.meaning}
            </p>

            <Separator className="my-6" />

            {/* Reflection Prompt */}
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              {dailyName.reflectionPrompt}
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={onCheckIn}
            className="mt-8 w-full rounded-lg bg-primary py-6 text-base font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            Check in now
          </Button>
        </div>
      </main>
    </div>
  )
}
