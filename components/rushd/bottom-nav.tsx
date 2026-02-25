"use client"

import { Home, BookOpen, BarChart2 } from "lucide-react"
import type { Screen } from "@/lib/app-state"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const items = [
    { screen: "home" as Screen, icon: Home, label: "Home" },
    { screen: "state-entry" as Screen, icon: BookOpen, label: "Session" },
    { screen: "progress" as Screen, icon: BarChart2, label: "Progress" },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-rule bg-background"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-4">
        {items.map((item) => {
          const isActive =
            currentScreen === item.screen ||
            (item.screen === "state-entry" &&
              (currentScreen === "state-entry" || currentScreen === "output"))
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`transition-colors ${
                isActive
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
