"use client"

import { Home, BookOpen, Heart, Compass } from "lucide-react"
import type { Screen } from "@/lib/app-state"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems: { screen: Screen; icon: typeof Home; label: string }[] = [
  { screen: "home", icon: Home, label: "Home" },
  { screen: "names-index", icon: BookOpen, label: "Study" },
  { screen: "check-in", icon: Heart, label: "Check In" },
  { screen: "journey", icon: Compass, label: "Journey" },
]

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "#0B1120",
        borderTop: "1px solid #1E2A3A",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-3.5">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.screen ||
            (item.screen === "check-in" &&
              (currentScreen === "check-in" || currentScreen === "check-in-output")) ||
            (item.screen === "names-index" &&
              currentScreen === "study")
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center gap-1 min-w-[48px] min-h-[44px] justify-center transition-colors"
              style={{
                color: isActive ? "#C1A67B" : "#8A9AB5",
              }}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <item.icon
                className="h-5 w-5"
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="text-[9px] font-medium tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
