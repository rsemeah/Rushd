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
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <main className="flex-1 px-5 pt-6">
        {/* Search bar */}
        <div
          className="flex items-center gap-2 px-3 py-3 mb-4"
          style={{ backgroundColor: "#111E32", border: "1px solid #1E2A3A" }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: "#8A9AB5" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, meaning, or what you\u2019re feeling\u2026"
            className="flex-1 bg-transparent text-sm focus:outline-none"
            style={{ color: "#F5F0E8" }}
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5" style={{ scrollbarWidth: "none" }}>
          {nameCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors"
              style={{
                backgroundColor: activeCategory === cat ? "rgba(193,166,123,0.15)" : "transparent",
                color: activeCategory === cat ? "#C1A67B" : "#8A9AB5",
                border: `1px solid ${activeCategory === cat ? "#C1A67B" : "#1E2A3A"}`,
              }}
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
                className="group flex w-full items-center text-left transition-colors"
                style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid #1E2A3A" : "none",
                  borderLeft: completed ? "2px solid #2D4A3E" : "2px solid transparent",
                }}
              >
                <div className="flex items-center gap-4 flex-1 py-4 px-2">
                  {/* Number */}
                  <span
                    className="text-xs tabular-nums w-5 text-right shrink-0"
                    style={{ color: "#8A9AB5", opacity: 0.4 }}
                  >
                    {String(name.id).padStart(2, "0")}
                  </span>

                  {/* Arabic name */}
                  <span
                    className="shrink-0"
                    dir="rtl"
                    lang="ar"
                    style={{
                      fontFamily: "'Amiri', serif",
                      fontSize: "20px",
                      color: "#C1A67B",
                      minWidth: "60px",
                    }}
                  >
                    {name.arabic}
                  </span>

                  {/* Transliteration + English */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#F5F0E8" }}>
                      {name.transliteration}
                    </p>
                    <p className="text-xs truncate" style={{ color: "#8A9AB5" }}>
                      {name.meaning}
                    </p>
                  </div>

                  {/* Progress arc */}
                  <div className="shrink-0 h-6 w-6">
                    <svg viewBox="0 0 24 24" className="h-6 w-6">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="#1E2A3A"
                        strokeWidth="1.5"
                      />
                      {completed && (
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#C1A67B"
                          strokeWidth="1.5"
                          strokeDasharray="63"
                          strokeDashoffset="0"
                          transform="rotate(-90 12 12)"
                        />
                      )}
                    </svg>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#8A9AB5", opacity: 0.3 }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
