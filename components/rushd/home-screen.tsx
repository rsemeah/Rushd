"use client"

import Image from "next/image"
import type { NameOfAllah } from "@/lib/names-data"

interface HomeScreenProps {
  dailyName: NameOfAllah
  onCheckIn: () => void
}

export function HomeScreen({ dailyName, onCheckIn }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-16">
      <main className="flex flex-1 flex-col px-6 pt-12">
        {/* Logo mark */}
        <div className="flex items-center gap-3 mb-16">
          <Image
            src="/images/rushd-logo.png"
            alt="Rushd"
            width={36}
            height={36}
            className="rounded-sm opacity-90"
            priority
          />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground">
            Rushd
          </span>
        </div>

        {/* Daily Anchor */}
        <div className="mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {"Today's Anchor"}
          </p>
        </div>

        <div className="h-px bg-rule mb-8" />

        {/* Arabic Name -- large, commanding */}
        <p
          className="text-6xl leading-none text-foreground mb-3"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {dailyName.arabic}
        </p>

        {/* Transliteration + meaning on one line */}
        <p className="text-sm font-medium text-gold tracking-wide mb-1">
          {dailyName.transliteration}
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          {dailyName.meaning}
        </p>

        {/* Reflection prompt */}
        <p className="text-base leading-relaxed text-foreground/80 max-w-xs">
          {dailyName.reflectionPrompt}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA -- text link, not a button */}
        <button
          onClick={onCheckIn}
          className="group flex items-center gap-2 text-gold text-sm font-medium tracking-wide pb-8 transition-colors hover:text-foreground"
        >
          <span>Begin session</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </main>
    </div>
  )
}
