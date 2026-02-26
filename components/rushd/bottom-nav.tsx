"use client"

import { Home, BookOpen, Heart, Compass } from "lucide-react"
import type { Screen } from "@/lib/app-state"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

function DiamondIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l10 10-10 10L2 12z" />
    </svg>
  )
}

const navItems: { screen: Screen; icon: typeof Home | typeof DiamondIcon; label: string }[] = [
  { screen: "home", icon: Home, label: "Home" },
  { screen: "names-index", icon: BookOpen, label: "Study" },
  { screen: "calibrate", icon: DiamondIcon, label: "Calibrate" },
  { screen: "check-in", icon: Heart, label: "Check In" },
  { screen: "journey", icon: Compass, label: "Journey" },
]

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-divider"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around py-4 lg:max-w-xl">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.screen ||
            (item.screen === "calibrate" && currentScreen === "calibrate-output") ||
            (item.screen === "check-in" &&
              (currentScreen === "check-in" || currentScreen === "check-in-output")) ||
            (item.screen === "names-index" && currentScreen === "study")
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center gap-1.5 min-w-[48px] min-h-[48px] justify-center transition-colors ${
                isActive ? "text-gold" : "text-text-secondary"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <item.icon
                className="h-6 w-6"
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="text-[10px] font-medium tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
