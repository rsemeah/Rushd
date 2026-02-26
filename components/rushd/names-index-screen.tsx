"use client"

import { useState, useMemo } from "react"
import { ChevronRight, Search } from "lucide-react"
import { namesOfAllah, nameCategories } from "@/lib/names-data"
import type { NameOfAllah } from "@/lib/names-data"

interface NamesIndexScreenProps {
  engagedNames: Set<number>
  onSelectName: (name: NameOfAllah) => void
}

export function NamesIndexScreen({ engagedNames, onSelectName }: NamesIndexScreenProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    let list = namesOfAllah
    if (activeCategory !== "All") {
      list = list.filter((n) => n.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (n) =>
          n.transliteration.toLowerCase().includes(q) ||
          n.meaning.toLowerCase().includes(q) ||
          n.arabic.includes(search) ||
          n.stateKeywords.some((k) => k.includes(q))
      )
    }
    return list
  }, [search, activeCategory])

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <main className="flex-1 px-6 pt-8">
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-4 mb-4 bg-surface border border-divider">
          <Search className="h-5 w-5 shrink-0 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, meaning, or what you\u2019re feeling\u2026"
            className="flex-1 bg-transparent text-base focus:outline-none text-text-primary placeholder:text-text-secondary/50"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6" style={{ scrollbarWidth: "none" }}>
          {nameCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase transition-colors border ${
                activeCategory === cat
                  ? "bg-gold/15 text-gold border-gold"
                  : "bg-transparent text-text-secondary border-divider"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Names list */}
        <div>
          {filtered.map((name, i) => {
            const completed = engagedNames.has(name.id)
            return (
              <button
                key={name.id}
                onClick={() => onSelectName(name)}
                className={`group flex w-full items-center text-left transition-colors ${
                  i < filtered.length - 1 ? "border-b border-divider" : ""
                } ${completed ? "border-l-2 border-l-green" : "border-l-2 border-l-transparent"}`}
              >
                <div className="flex items-center gap-4 flex-1 py-5 px-3">
                  {/* Number */}
                  <span className="text-sm tabular-nums w-6 text-right shrink-0 text-text-secondary/40">
                    {String(name.id).padStart(2, "0")}
                  </span>

                  {/* Arabic name */}
                  <span
                    className="shrink-0 font-serif text-2xl text-gold min-w-[72px]"
                    dir="rtl"
                    lang="ar"
                  >
                    {name.arabic}
                  </span>

                  {/* Transliteration + English */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium truncate text-text-primary">
                      {name.transliteration}
                    </p>
                    <p className="text-sm truncate text-text-secondary">
                      {name.meaning}
                    </p>
                  </div>

                  {/* Progress arc */}
                  <div className="shrink-0 h-7 w-7">
                    <svg viewBox="0 0 24 24" className="h-7 w-7">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        className="stroke-divider"
                        strokeWidth="1.5"
                      />
                      {completed && (
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          className="stroke-gold"
                          strokeWidth="1.5"
                          strokeDasharray="63"
                          strokeDashoffset="0"
                          transform="rotate(-90 12 12)"
                        />
                      )}
                    </svg>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="h-5 w-5 shrink-0 text-text-secondary/30" />
                </div>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
