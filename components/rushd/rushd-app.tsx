"use client"

import { useState, useCallback, useMemo } from "react"
import type { Screen } from "@/lib/app-state"
import { getDailyName, findNameForStates } from "@/lib/names-data"
import type { NameOfAllah } from "@/lib/names-data"
import { BottomNav } from "./bottom-nav"
import { HomeScreen } from "./home-screen"
import { StateEntryScreen } from "./state-entry-screen"
import { OutputScreen } from "./output-screen"
import { ProgressScreen } from "./progress-screen"
import { CrisisScreen } from "./crisis-screen"

export function RushdApp() {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [freeText, setFreeText] = useState("")
  const [currentName, setCurrentName] = useState<NameOfAllah | null>(null)
  const [engagedNames, setEngagedNames] = useState<Set<number>>(new Set())
  const [streak, setStreak] = useState(0)
  const [calendarDots, setCalendarDots] = useState<Record<string, boolean>>({})

  const dailyName = useMemo(() => getDailyName(), [])

  const handleNavigate = useCallback((s: Screen) => {
    setScreen(s)
  }, [])

  const handleCheckIn = useCallback(() => {
    setSelectedStates([])
    setFreeText("")
    setScreen("state-entry")
  }, [])

  const handleToggleState = useCallback((stateId: string) => {
    setSelectedStates((prev) =>
      prev.includes(stateId)
        ? prev.filter((s) => s !== stateId)
        : [...prev, stateId]
    )
  }, [])

  const handleFindName = useCallback(() => {
    const matched = findNameForStates(selectedStates)
    setCurrentName(matched)
    setScreen("output")
  }, [selectedStates])

  const handleSaveSession = useCallback(() => {
    if (currentName) {
      const today = new Date().toISOString().split("T")[0]
      setEngagedNames((prev) => new Set(prev).add(currentName.id))
      setCalendarDots((prev) => ({ ...prev, [today]: true }))
      setStreak((prev) => prev + 1)
    }
    setScreen("home")
    setSelectedStates([])
    setFreeText("")
    setCurrentName(null)
  }, [currentName])

  const handleDone = useCallback(() => {
    setScreen("home")
    setSelectedStates([])
    setFreeText("")
    setCurrentName(null)
  }, [])

  const handleCrisis = useCallback(() => {
    setScreen("crisis")
  }, [])

  const handleCrisisContinue = useCallback(() => {
    setScreen("state-entry")
  }, [])

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-background">
      {screen === "home" && (
        <HomeScreen dailyName={dailyName} onCheckIn={handleCheckIn} />
      )}

      {screen === "state-entry" && (
        <StateEntryScreen
          selectedStates={selectedStates}
          onToggleState={handleToggleState}
          onFreeTextChange={setFreeText}
          freeText={freeText}
          onFindName={handleFindName}
          onBack={handleDone}
          onCrisis={handleCrisis}
        />
      )}

      {screen === "output" && currentName && (
        <OutputScreen
          name={currentName}
          onSave={handleSaveSession}
          onDone={handleDone}
          onBack={() => setScreen("state-entry")}
        />
      )}

      {screen === "progress" && (
        <ProgressScreen
          streak={streak}
          calendarDots={calendarDots}
          engagedNames={engagedNames}
        />
      )}

      {screen === "crisis" && (
        <CrisisScreen onContinue={handleCrisisContinue} />
      )}

      {/* Bottom nav — hidden on crisis screen */}
      {screen !== "crisis" && (
        <BottomNav currentScreen={screen} onNavigate={handleNavigate} />
      )}
    </div>
  )
}
