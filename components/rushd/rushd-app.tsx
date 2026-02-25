"use client"

import { useState, useCallback, useMemo } from "react"
import type { Screen } from "@/lib/app-state"
import { getDailyName, findNameForStates, namesOfAllah } from "@/lib/names-data"
import type { NameOfAllah } from "@/lib/names-data"
import { BottomNav } from "./bottom-nav"
import { HomeScreen } from "./home-screen"
import { StudyScreen } from "./study-screen"
import { StateEntryScreen } from "./state-entry-screen"
import { OutputScreen } from "./output-screen"
import { ProgressScreen } from "./progress-screen"
import { NamesIndexScreen } from "./names-index-screen"
import { CalibrateScreen } from "./calibrate-screen"
import { CrisisScreen } from "./crisis-screen"

interface Reflection {
  nameId: number
  text: string
  date: string
}

export function RushdApp() {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [freeText, setFreeText] = useState("")
  const [currentName, setCurrentName] = useState<NameOfAllah | null>(null)
  const [engagedNames, setEngagedNames] = useState<Set<number>>(new Set())
  const [streak, setStreak] = useState(0)
  const [calendarDots, setCalendarDots] = useState<Record<string, boolean>>({})
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [prevScreen, setPrevScreen] = useState<Screen>("home")

  const dailyName = useMemo(() => getDailyName(), [])

  const handleNavigate = useCallback((s: Screen, nameOverride?: NameOfAllah) => {
    if (nameOverride) {
      setCurrentName(nameOverride)
    }
    setPrevScreen(screen)
    setScreen(s)
  }, [screen])

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
    setScreen("check-in-output")
  }, [selectedStates])

  const handleSaveSession = useCallback(() => {
    if (currentName) {
      const today = new Date().toISOString().split("T")[0]
      setEngagedNames((prev) => new Set(prev).add(currentName.id))
      setCalendarDots((prev) => ({ ...prev, [today]: true }))
      setStreak((prev) => prev + 1)
      setReflections((prev) => [
        { nameId: currentName.id, text: currentName.action, date: today },
        ...prev,
      ])
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
    setScreen("check-in")
  }, [])

  const handleGoDeeper = useCallback(() => {
    if (currentName) {
      setScreen("study")
    }
  }, [currentName])

  const handleSelectNameFromIndex = useCallback((name: NameOfAllah) => {
    setCurrentName(name)
    setScreen("study")
  }, [])

  // Calibrate "Go deeper" -- find the matching name from our data by transliteration
  const handleCalibrateGoDeeper = useCallback((transliteration: string) => {
    const match = namesOfAllah.find(
      (n) => n.transliteration.toLowerCase() === transliteration.toLowerCase()
    )
    if (match) {
      setCurrentName(match)
      setScreen("study")
    }
  }, [])

  return (
    <div className="relative mx-auto min-h-screen max-w-md" style={{ backgroundColor: "#0B1120" }}>
      {screen === "home" && (
        <HomeScreen dailyName={dailyName} onNavigate={handleNavigate} />
      )}

      {screen === "study" && currentName && (
        <StudyScreen
          name={currentName}
          onBack={() => setScreen(prevScreen)}
        />
      )}

      {screen === "check-in" && (
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

      {screen === "check-in-output" && currentName && (
        <OutputScreen
          name={currentName}
          onSave={handleSaveSession}
          onDone={handleDone}
          onBack={() => setScreen("check-in")}
          onGoDeeper={handleGoDeeper}
        />
      )}

      {screen === "calibrate" && (
        <CalibrateScreen
          onCrisis={handleCrisis}
          onGoDeeper={handleCalibrateGoDeeper}
        />
      )}

      {screen === "journey" && (
        <ProgressScreen
          streak={streak}
          calendarDots={calendarDots}
          engagedNames={engagedNames}
          recentReflections={reflections}
        />
      )}

      {screen === "names-index" && (
        <NamesIndexScreen
          engagedNames={engagedNames}
          onSelectName={handleSelectNameFromIndex}
        />
      )}

      {screen === "crisis" && (
        <CrisisScreen onContinue={handleCrisisContinue} />
      )}

      {screen !== "crisis" && (
        <BottomNav currentScreen={screen} onNavigate={handleNavigate} />
      )}
    </div>
  )
}
