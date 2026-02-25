"use client"

import Image from "next/image"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
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
        <div className="h-5 w-5" />
        <button
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/rushd-logo.png"
              alt="Rushd"
              width={140}
              height={140}
              className="rounded-2xl"
              priority
            />
          </div>

          {/* Tagline */}
          <p className="text-center text-sm tracking-[0.2em] uppercase text-primary mb-10"
             style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Clarity &middot; Wisdom &middot; Elevation
          </p>

          {/* Daily Anchor Name Card */}
          <div className="rounded-2xl border border-border bg-card p-8 relative overflow-hidden">
            {/* Subtle gold corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 opacity-10">
              <svg viewBox="0 0 64 64" fill="none">
                <path d="M0 0L64 0L0 64Z" fill="#C1A67B" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 rotate-180">
              <svg viewBox="0 0 64 64" fill="none">
                <path d="M0 0L64 0L0 64Z" fill="#C1A67B" />
              </svg>
            </div>

            {/* Section Label */}
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-6">
              {"Today's Anchor"}
            </p>

            {/* Arabic Name */}
            <p
              className="text-center text-5xl leading-tight text-foreground"
              dir="rtl"
              lang="ar"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {dailyName.arabic}
            </p>

            {/* Transliteration */}
            <p className="mt-3 text-center text-sm tracking-wide text-primary"
               style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              {dailyName.transliteration}
            </p>

            {/* English Meaning */}
            <p className="mt-1 text-center text-base font-medium text-foreground">
              {dailyName.meaning}
            </p>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <svg className="h-3 w-3 text-primary" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" />
              </svg>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Reflection Prompt */}
            <p className="text-center text-sm leading-relaxed text-muted-foreground"
               style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              {dailyName.reflectionPrompt}
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={onCheckIn}
            className="mt-8 w-full rounded-xl bg-primary py-6 text-base font-semibold text-primary-foreground tracking-wide transition-all hover:bg-gold-dark active:scale-[0.98]"
          >
            Begin Session
          </Button>
        </div>
      </main>
    </div>
  )
}
