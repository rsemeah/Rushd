export interface NameOfAllah {
  id: number
  arabic: string
  transliteration: string
  meaning: string
  reflectionPrompt: string
  creed: string
  correction: string
  relationship: string
  conduct: string
  dhikr: string
  dhikrTransliteration: string
  dua: string
  action: string
  scholar: string
  stateKeywords: string[]
}

export const namesOfAllah: NameOfAllah[] = [
  {
    id: 1,
    arabic: "الوَكِيل",
    transliteration: "Al-Wakil",
    meaning: "The Trustee",
    reflectionPrompt: "What are you carrying that was never yours to hold?",
    creed: "Allah is the ultimate Trustee and Disposer of affairs. He manages all matters with perfect wisdom, and nothing escapes His care. His trusteeship is not passive — it is active, intentional, and complete.",
    correction: "The belief that your constant worry is what keeps things together. Control is an illusion you maintain at the cost of your peace. Delegation to Allah is not negligence — it is the highest form of strategic trust.",
    relationship: "Stop micromanaging people you love. Trust them with the space to grow, fail, and return. Your role is presence, not surveillance.",
    conduct: "Identify one thing today that you are gripping too tightly. Release it — not by abandoning responsibility, but by doing your part and entrusting the outcome to the One who manages all affairs.",
    dhikr: "يَا وَكِيل",
    dhikrTransliteration: "Ya Wakil",
    dua: "O Allah, You are Al-Wakil — I entrust to You what I cannot control, and I ask You to manage my affairs with Your perfect wisdom.",
    action: "Write down the one thing consuming your mental energy. Do what you can about it today — then consciously hand it over.",
    scholar: "Sheikh Khalid Al-Rashid",
    stateKeywords: ["overwhelmed", "worrying", "stuck", "exhausted"]
  },
  {
    id: 2,
    arabic: "الحَلِيم",
    transliteration: "Al-Halim",
    meaning: "The Forbearing",
    reflectionPrompt: "When was the last time you confused patience with weakness?",
    creed: "Allah withholds punishment despite having the power to act immediately. His forbearance is not weakness. It is deliberate, infinite, and active.",
    correction: "The assumption that immediate reaction is righteous reaction. Speed is not justice. Pause is not weakness.",
    relationship: "Address the behavior, not the person. Speak once calm. Do not escalate what you can absorb.",
    conduct: "Respond, do not react. If you need to escalate — do it with principle, not emotion.",
    dhikr: "يَا حَلِيم",
    dhikrTransliteration: "Ya Halim",
    dua: "O Allah, You are Al-Halim — make me forbearing with those who test me, as You are forbearing with me.",
    action: "Before your next difficult conversation — wait. Respond after the heat has passed, not inside it.",
    scholar: "Sheikh Ahmad Al-Tamimi",
    stateKeywords: ["angry", "overwhelmed", "stuck"]
  },
  {
    id: 3,
    arabic: "الوَدُود",
    transliteration: "Al-Wadud",
    meaning: "The Loving",
    reflectionPrompt: "Do you believe you are loved — even when you feel undeserving?",
    creed: "Allah's love is not earned through perfection. It is a gift that precedes your effort. He loves those who turn to Him, again and again, regardless of their state.",
    correction: "The belief that you must be flawless to be worthy of love. You confuse Allah's standards with human conditions. His love does not withdraw the way people's does.",
    relationship: "Be the first to show warmth. Do not wait for others to earn your affection. Love is a practice, not a transaction.",
    conduct: "Reach out to someone you have been distant from. Not because they deserve it — because love, like Allah's, should not be conditional on the other person's perfection.",
    dhikr: "يَا وَدُود",
    dhikrTransliteration: "Ya Wadud",
    dua: "O Allah, You are Al-Wadud — fill my heart with love for You and make me a source of warmth to those around me.",
    action: "Send one message today to someone you care about — not because they reached out, but because you choose to.",
    scholar: "Sheikh Yasir Qadhi",
    stateKeywords: ["alone", "distant from Allah", "numb", "hopeless"]
  },
  {
    id: 4,
    arabic: "الغَفَّار",
    transliteration: "Al-Ghaffar",
    meaning: "The Repeatedly Forgiving",
    reflectionPrompt: "What would change if you believed your past was already forgiven?",
    creed: "Allah does not merely forgive — He forgives repeatedly, covering sins as though they never occurred. His forgiveness is active, seeking those who return to Him.",
    correction: "The habit of carrying guilt as identity. You are not defined by your worst moments. Carrying shame beyond its purpose is not humility — it is a rejection of Allah's mercy.",
    relationship: "Forgive what you have been holding against someone. Not because they apologized — because holding it is heavier than releasing it.",
    conduct: "Name the guilt you carry. Acknowledge it. Then make istighfar and move forward — not backward into the same loop.",
    dhikr: "يَا غَفَّار",
    dhikrTransliteration: "Ya Ghaffar",
    dua: "O Allah, You are Al-Ghaffar — forgive what I carry in shame, and free me from the weight of what I cannot undo.",
    action: "Perform a two-rakat prayer of tawbah today. Let the guilt end at the sajdah.",
    scholar: "Sheikh Salman Al-Oadah",
    stateKeywords: ["guilty", "hopeless", "distant from Allah", "stuck"]
  },
  {
    id: 5,
    arabic: "الصَّبُور",
    transliteration: "As-Sabur",
    meaning: "The Patient",
    reflectionPrompt: "What are you rushing that was meant to unfold slowly?",
    creed: "Allah's patience is without limit. He does not hasten punishment, nor does He rush what He has willed to unfold gradually. His timeline is purposeful.",
    correction: "The compulsion to see results immediately. You treat delay as denial. You mistake the unfolding for abandonment. Patience is not passive — it is the discipline of trust.",
    relationship: "Give people time to change. Do not demand transformation on your schedule. Growth is not instant, and your impatience may be the pressure that breaks what could have healed.",
    conduct: "Stop checking for the outcome. Do the work. Plant the seed. Walk away from the soil and let the rain come on its own terms.",
    dhikr: "يَا صَبُور",
    dhikrTransliteration: "Ya Sabur",
    dua: "O Allah, You are As-Sabur — grant me patience with Your timing and peace with what I cannot accelerate.",
    action: "Identify the one thing you keep checking on. Step away from it for 24 hours. Let it breathe.",
    scholar: "Sheikh Muhammad Al-Munajjid",
    stateKeywords: ["exhausted", "stuck", "worrying", "overwhelmed"]
  },
  {
    id: 6,
    arabic: "النُّور",
    transliteration: "An-Nur",
    meaning: "The Light",
    reflectionPrompt: "Where in your life do you need clarity most?",
    creed: "Allah is the Light of the heavens and the earth. He illuminates the path for those who seek, and no darkness can extinguish His guidance.",
    correction: "The belief that confusion is permanent. You are not lost — you are in the part of the journey where the light has not yet reached. Seek it actively.",
    relationship: "Be a source of clarity for someone today. Not advice — clarity. Help them see what they already know but cannot yet articulate.",
    conduct: "Make one decision you have been avoiding. Step toward the light of clarity, even if the full path is not yet visible.",
    dhikr: "يَا نُور",
    dhikrTransliteration: "Ya Nur",
    dua: "O Allah, You are An-Nur — place light in my heart, light in my sight, and light on my path.",
    action: "Write down the decision you have been postponing. Make it today, even if imperfectly.",
    scholar: "Sheikh Ibn Uthaymin",
    stateKeywords: ["numb", "hopeless", "stuck", "distant from Allah"]
  },
  {
    id: 7,
    arabic: "الرَّزَّاق",
    transliteration: "Ar-Razzaq",
    meaning: "The Provider",
    reflectionPrompt: "What provision are you overlooking because it did not arrive the way you expected?",
    creed: "Allah provides for all creation without measure. His provision is not limited to wealth — it includes health, relationships, time, and guidance. No soul is forgotten.",
    correction: "The anxiety that there is not enough. Scarcity thinking is a lie that erodes gratitude. You have been provided for every single day of your life — even the ones that felt like loss.",
    relationship: "Be generous without calculating the return. Give freely — not from surplus, but from trust that your own provision is guaranteed.",
    conduct: "Give something away today. Time, money, knowledge, attention. Break the scarcity loop with one act of deliberate generosity.",
    dhikr: "يَا رَزَّاق",
    dhikrTransliteration: "Ya Razzaq",
    dua: "O Allah, You are Ar-Razzaq — provide for me from where I do not expect, and make me grateful for what I already have.",
    action: "Give one thing away today — freely, without expectation of return.",
    scholar: "Sheikh Ibn Baz",
    stateKeywords: ["worrying", "exhausted", "alone", "overwhelmed"]
  }
]

export const emotionalStates = [
  { id: "overwhelmed", label: "Overwhelmed" },
  { id: "worrying", label: "Anxious" },
  { id: "angry", label: "Angry" },
  { id: "distant from Allah", label: "Distant from Allah" },
  { id: "numb", label: "Numb" },
  { id: "alone", label: "Alone" },
  { id: "guilty", label: "Guilty" },
  { id: "exhausted", label: "Exhausted" },
  { id: "hopeless", label: "Hopeless" },
  { id: "stuck", label: "Stuck" },
]

export function findNameForStates(selectedStates: string[]): NameOfAllah {
  let bestMatch = namesOfAllah[0]
  let bestScore = 0

  for (const name of namesOfAllah) {
    const score = selectedStates.filter(state =>
      name.stateKeywords.includes(state)
    ).length
    if (score > bestScore) {
      bestScore = score
      bestMatch = name
    }
  }

  return bestMatch
}

export function getDailyName(): NameOfAllah {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return namesOfAllah[dayOfYear % namesOfAllah.length]
}

export const crisisKeywords = [
  "suicide", "kill myself", "end it all", "want to die",
  "no reason to live", "better off dead", "self-harm", "hurt myself"
]

export function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase()
  return crisisKeywords.some(keyword => lower.includes(keyword))
}
