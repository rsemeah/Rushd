"use client"

import { Home, BookOpen, TrendingUp } from "lucide-react"
import type { Screen } from "@/lib/app-state"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const items = [
    { screen: "home" as Screen, icon: Home, label: "Home" },
    { screen: "state-entry" as Screen, icon: BookOpen, label: "Session" },
    { screen: "progress" as Screen, icon: TrendingUp, label: "Progress" },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-6 py-3">
        {items.map((item) => {
          const isActive =
            currentScreen === item.screen ||
            (item.screen === "state-entry" &&
              (currentScreen === "state-entry" || currentScreen === "output"))
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[11px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
