import type { NameOfAllah } from "./names-data"

export type Screen =
  | "home"
  | "study"
  | "check-in"
  | "check-in-output"
  | "journey"
  | "names-index"
  | "crisis"

export interface Session {
  id: string
  date: string
  nameId: number
  states: string[]
  reflection?: string
}

export interface AppState {
  currentScreen: Screen
  selectedStates: string[]
  freeText: string
  currentName: NameOfAllah | null
  sessions: Session[]
  engagedNames: Set<number>
  streak: number
  calendarDots: Record<string, boolean>
}

export function getInitialState(): AppState {
  return {
    currentScreen: "home",
    selectedStates: [],
    freeText: "",
    currentName: null,
    sessions: [],
    engagedNames: new Set(),
    streak: 0,
    calendarDots: {},
  }
}
