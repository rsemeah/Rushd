export interface NameOfAllah {
  id: number
  arabic: string
  transliteration: string
  meaning: string
  reflectionPrompt: string
  // Study tab: KNOW
  creed: string
  doesNotMean: string
  quranicRef: string
  hadithRef: string
  // Study tab: FEEL
  feelQuestion: string
  feelAnswer: string
  feelWork: string
  feelRelationships: string
  feelSelfTalk: string
  // Study tab: LIVE
  liveQuestion: string
  liveStatements: string[]
  dhikr: string
  dhikrTransliteration: string
  dua: string
  action: string
  // Meta
  scholar: string
  stateKeywords: string[]
  category: string
}

export const namesOfAllah: NameOfAllah[] = [
  {
    id: 1,
    arabic: "\u0627\u0644\u0648\u064E\u0643\u0650\u064A\u0644",
    transliteration: "Al-Wakil",
    meaning: "The Trustee",
    reflectionPrompt: "What are you carrying that was never yours to hold?",
    creed: "Allah is the ultimate Trustee and Disposer of affairs. He manages all matters with perfect wisdom, and nothing escapes His care. His trusteeship is not passive \u2014 it is active, intentional, and complete.",
    doesNotMean: "It does not mean you abandon effort. Trusting Allah with outcomes does not remove the obligation of action. It means you separate your duty from the result.",
    quranicRef: "\u062D\u064E\u0633\u0652\u0628\u064F\u0646\u064E\u0627 \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0648\u064E\u0646\u0650\u0639\u0652\u0645\u064E \u0627\u0644\u0652\u0648\u064E\u0643\u0650\u064A\u0644\u064F \u2014 \u0622\u0644 \u0639\u0645\u0631\u0627\u0646 3:173 \u2014 \u201CSufficient for us is Allah, and He is the best Trustee.\u201D",
    hadithRef: "The Prophet \uFDFA said: \u201CIf you were to rely upon Allah with the reliance He is due, He would provide for you as He provides for the birds.\u201D \u2014 Tirmidhi",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "Al-Wakil exposes the belief that your constant worry is what keeps things together. Control is an illusion you maintain at the cost of your peace.",
    feelWork: "You over-manage outcomes. You check, double-check, and still lose sleep. Release the grip \u2014 do your part, then step back.",
    feelRelationships: "You micromanage the people you love because you don\u2019t trust them to get it right. Trust is a form of respect.",
    feelSelfTalk: "You tell yourself \u201Cif I don\u2019t handle this, no one will.\u201D That is not strength. That is exhaustion wearing a mask.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You do your part and then sleep \u2014 actually sleep.",
      "You stop checking for updates on things you\u2019ve already handed over.",
      "You distinguish between your responsibility and Allah\u2019s domain."
    ],
    dhikr: "\u064A\u064E\u0627 \u0648\u064E\u0643\u0650\u064A\u0644",
    dhikrTransliteration: "Ya Wakil",
    dua: "O Allah, You are Al-Wakil \u2014 I entrust to You what I cannot control, and I ask You to manage my affairs with Your perfect wisdom.",
    action: "Write down the one thing consuming your mental energy. Do what you can about it today \u2014 then consciously hand it over.",
    scholar: "Sheikh Khalid Al-Rashid",
    stateKeywords: ["overwhelmed", "worrying", "stuck", "exhausted", "under-pressure"],
    category: "Openings"
  },
  {
    id: 2,
    arabic: "\u0627\u0644\u062D\u064E\u0644\u0650\u064A\u0645",
    transliteration: "Al-\u1E24al\u012Bm",
    meaning: "The Forbearing",
    reflectionPrompt: "What are you withholding that patience would release?",
    creed: "Allah withholds punishment despite having the power to act immediately. His forbearance is not weakness. It is deliberate, infinite, and active.",
    doesNotMean: "It does not mean Allah is indifferent to wrongdoing. It does not mean consequences are removed. It means the timing of justice belongs to Him.",
    quranicRef: "\u0648\u064E\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u063A\u064E\u0641\u064F\u0648\u0631\u064C \u062D\u064E\u0644\u0650\u064A\u0645\u064C \u2014 \u0627\u0644\u0628\u0642\u0631\u0629 2:225 \u2014 \u201CAnd Allah is Forgiving and Forbearing.\u201D",
    hadithRef: "The Prophet \uFDFA said: \u201CNo one is more patient over hurtful words than Allah. They attribute a son to Him, yet He still provides for them.\u201D \u2014 Bukhari",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "Al-\u1E24al\u012Bm exposes the belief that your immediate anger is righteous. That you are the rightful judge of the moment. That speed equals justice.",
    feelWork: "You react before the facts arrive. You escalate in meetings. You send the email before the heat passes. Stop.",
    feelRelationships: "You punish people with silence or sharpness. Address the behaviour, not the person. Speak once calm.",
    feelSelfTalk: "You tell yourself you have a right to be angry. Maybe. But having a right and exercising it wisely are different things.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You delay response until the emotion has passed.",
      "You separate the behavior from the person.",
      "You trust that justice does not require your heat."
    ],
    dhikr: "\u064A\u064E\u0627 \u062D\u064E\u0644\u0650\u064A\u0645",
    dhikrTransliteration: "Ya \u1E24al\u012Bm",
    dua: "O Allah, You are Al-\u1E24al\u012Bm \u2014 make me forbearing with those who test me, as You are forbearing with me.",
    action: "Before your next difficult conversation \u2014 wait. Let the heat pass. Respond from principle.",
    scholar: "Sheikh Ahmad Al-Tamimi",
    stateKeywords: ["angry", "overwhelmed", "stuck", "arrogant"],
    category: "Justice"
  },
  {
    id: 3,
    arabic: "\u0627\u0644\u0648\u064E\u062F\u064F\u0648\u062F",
    transliteration: "Al-Wad\u016Bd",
    meaning: "The Loving",
    reflectionPrompt: "Do you believe you are loved \u2014 even when you feel undeserving?",
    creed: "Allah\u2019s love is not earned through perfection. It is a gift that precedes your effort. He loves those who turn to Him, again and again, regardless of their state.",
    doesNotMean: "It does not mean love without standards. Allah\u2019s love comes with guidance. He loves those who strive, repent, and purify \u2014 not those who are passive about their state.",
    quranicRef: "\u0648\u064E\u0647\u064F\u0648\u064E \u0627\u0644\u063A\u064E\u0641\u064F\u0648\u0631\u064F \u0627\u0644\u0648\u064E\u062F\u064F\u0648\u062F\u064F \u2014 \u0627\u0644\u0628\u0631\u0648\u062C 85:14 \u2014 \u201CAnd He is the Forgiving, the Loving.\u201D",
    hadithRef: "The Prophet \uFDFA said: \u201CWhen Allah loves a servant, He calls Jibril and says: I love so-and-so, so love him.\u201D \u2014 Bukhari & Muslim",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "Al-Wad\u016Bd exposes the belief that you must be flawless to be worthy of love. You confuse Allah\u2019s standards with human conditions.",
    feelWork: "You perform for approval instead of purpose. Recognition is not love. Stop conflating them.",
    feelRelationships: "You withhold warmth until it\u2019s earned. That\u2019s not protection \u2014 that\u2019s fear. Be the first to extend.",
    feelSelfTalk: "You believe your failings disqualify you from being loved. They don\u2019t. That\u2019s the whole point of this Name.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You stop performing and start being present.",
      "You reach out first \u2014 not because they earned it, but because love isn\u2019t transactional.",
      "You accept that being loved does not require being perfect."
    ],
    dhikr: "\u064A\u064E\u0627 \u0648\u064E\u062F\u064F\u0648\u062F",
    dhikrTransliteration: "Ya Wad\u016Bd",
    dua: "O Allah, You are Al-Wad\u016Bd \u2014 fill my heart with love for You and make me a source of warmth to those around me.",
    action: "Send one message today to someone you care about \u2014 not because they reached out, but because you choose to.",
    scholar: "Sheikh Yasir Qadhi",
    stateKeywords: ["alone", "distant from Allah", "numb", "hopeless", "spiritually-empty"],
    category: "Mercy"
  },
  {
    id: 4,
    arabic: "\u0627\u0644\u063A\u064E\u0641\u0651\u064E\u0627\u0631",
    transliteration: "Al-Ghaff\u0101r",
    meaning: "The Repeatedly Forgiving",
    reflectionPrompt: "What would change if you believed your past was already forgiven?",
    creed: "Allah does not merely forgive \u2014 He forgives repeatedly, covering sins as though they never occurred. His forgiveness is active, seeking those who return to Him.",
    doesNotMean: "It does not mean sins are trivial. Forgiveness does not erase accountability \u2014 it means the door remains open. Taking it lightly is itself the danger.",
    quranicRef: "\u0648\u064E\u0625\u0650\u0646\u0651\u0650\u064A \u0644\u064E\u063A\u064E\u0641\u0651\u064E\u0627\u0631\u064C \u0644\u0650\u0645\u064E\u0646 \u062A\u064E\u0627\u0628\u064E \u2014 \u0637\u0647 20:82 \u2014 \u201CAnd indeed, I am Repeatedly Forgiving of whoever repents.\u201D",
    hadithRef: "The Prophet \uFDFA said: \u201CBy Allah, I seek forgiveness from Allah and I turn to Him in repentance more than seventy times a day.\u201D \u2014 Bukhari",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "Al-Ghaff\u0101r exposes the habit of carrying guilt as identity. You are not defined by your worst moments.",
    feelWork: "You replay past failures in meetings, in reviews, in your head. The loop is not humility \u2014 it is self-destruction.",
    feelRelationships: "You hold grudges because you hold them against yourself first. Release both.",
    feelSelfTalk: "You say \u201CI should have known better.\u201D Maybe. But shame beyond its purpose is not repentance \u2014 it is self-punishment.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You name the guilt, make tawbah, and move forward.",
      "You stop rehearsing what you cannot undo.",
      "You forgive others because you finally believe you are forgiven."
    ],
    dhikr: "\u064A\u064E\u0627 \u063A\u064E\u0641\u0651\u064E\u0627\u0631",
    dhikrTransliteration: "Ya Ghaff\u0101r",
    dua: "O Allah, You are Al-Ghaff\u0101r \u2014 forgive what I carry in shame, and free me from the weight of what I cannot undo.",
    action: "Perform a two-rakat prayer of tawbah today. Let the guilt end at the sajdah.",
    scholar: "Sheikh Salman Al-Oadah",
    stateKeywords: ["guilty", "hopeless", "distant from Allah", "stuck"],
    category: "Mercy"
  },
  {
    id: 5,
    arabic: "\u0627\u0644\u0635\u0651\u064E\u0628\u064F\u0648\u0631",
    transliteration: "A\u1E63-\u1E62ab\u016Br",
    meaning: "The Patient",
    reflectionPrompt: "What are you rushing that was meant to unfold slowly?",
    creed: "Allah\u2019s patience is without limit. He does not hasten punishment, nor does He rush what He has willed to unfold gradually. His timeline is purposeful.",
    doesNotMean: "It does not mean delay is denial. Patience is not absence. It is the architecture of divine timing \u2014 precise, not slow.",
    quranicRef: "\u0648\u064E\u0627\u0635\u0652\u0628\u0650\u0631\u0652 \u0641\u064E\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0644\u064E\u0627 \u064A\u064F\u0636\u0650\u064A\u0639\u064F \u0623\u064E\u062C\u0652\u0631\u064E \u0627\u0644\u0652\u0645\u064F\u062D\u0652\u0633\u0650\u0646\u0650\u064A\u0646\u064E \u2014 \u0647\u0648\u062F 11:115 \u2014 \u201CAnd be patient, for indeed Allah does not allow to be lost the reward of those who do good.\u201D",
    hadithRef: "The Prophet \uFDFA said: \u201CHow wonderful is the affair of the believer, for his affairs are all good.\u201D \u2014 Muslim",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "A\u1E63-\u1E62ab\u016Br exposes the compulsion to see results immediately. You treat delay as denial. You mistake the unfolding for abandonment.",
    feelWork: "You check metrics hourly. You refresh. You follow up too soon. The seed does not grow faster because you watch it.",
    feelRelationships: "You demand transformation on your schedule. Growth is not instant. Your impatience may break what could have healed.",
    feelSelfTalk: "You say \u201Cnothing is changing.\u201D It is. You\u2019re just measuring on the wrong timescale.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You stop checking for the outcome and focus on the process.",
      "You give people time to change without pressuring them.",
      "You trust that what is delayed is not denied."
    ],
    dhikr: "\u064A\u064E\u0627 \u0635\u064E\u0628\u064F\u0648\u0631",
    dhikrTransliteration: "Ya \u1E62ab\u016Br",
    dua: "O Allah, You are A\u1E63-\u1E62ab\u016Br \u2014 grant me patience with Your timing and peace with what I cannot accelerate.",
    action: "Identify the one thing you keep checking on. Step away from it for 24 hours. Let it breathe.",
    scholar: "Sheikh Muhammad Al-Munajjid",
    stateKeywords: ["exhausted", "stuck", "worrying", "overwhelmed", "under-pressure"],
    category: "Power"
  },
  {
    id: 6,
    arabic: "\u0627\u0644\u0646\u0651\u064F\u0648\u0631",
    transliteration: "An-N\u016Br",
    meaning: "The Light",
    reflectionPrompt: "Where in your life do you need clarity most?",
    creed: "Allah is the Light of the heavens and the earth. He illuminates the path for those who seek, and no darkness can extinguish His guidance.",
    doesNotMean: "It does not mean the path will always be obvious. Light reveals gradually. Clarity is not the absence of confusion \u2014 it is the willingness to walk forward anyway.",
    quranicRef: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0646\u064F\u0648\u0631\u064F \u0627\u0644\u0633\u0651\u064E\u0645\u064E\u0627\u0648\u064E\u0627\u062A\u0650 \u0648\u064E\u0627\u0644\u0623\u064E\u0631\u0652\u0636\u0650 \u2014 \u0627\u0644\u0646\u0648\u0631 24:35 \u2014 \u201CAllah is the Light of the heavens and the earth.\u201D",
    hadithRef: "The Prophet \uFDFA made du\u2019a: \u201CO Allah, place light in my heart, light in my sight, light in my hearing.\u201D \u2014 Muslim",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "An-N\u016Br exposes the belief that confusion is permanent. You are not lost \u2014 you are in the part of the journey where the light has not yet reached.",
    feelWork: "You avoid decisions because the full picture isn\u2019t visible. Clarity comes through movement, not waiting.",
    feelRelationships: "You withdraw instead of communicating. Bring things into the light. Say the thing.",
    feelSelfTalk: "You say \u201CI don\u2019t know what to do.\u201D Start with what you do know. The rest follows.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You make the decision you\u2019ve been avoiding.",
      "You bring hidden things into the open \u2014 conversations, debts, feelings.",
      "You trust that seeking guidance is itself a form of light."
    ],
    dhikr: "\u064A\u064E\u0627 \u0646\u064F\u0648\u0631",
    dhikrTransliteration: "Ya N\u016Br",
    dua: "O Allah, You are An-N\u016Br \u2014 place light in my heart, light in my sight, and light on my path.",
    action: "Write down the decision you have been postponing. Make it today, even if imperfectly.",
    scholar: "Sheikh Ibn Uthaymin",
    stateKeywords: ["numb", "hopeless", "stuck", "distant from Allah", "spiritually-empty"],
    category: "Openings"
  },
  {
    id: 7,
    arabic: "\u0627\u0644\u0631\u0651\u064E\u0632\u0651\u064E\u0627\u0642",
    transliteration: "Ar-Razz\u0101q",
    meaning: "The Provider",
    reflectionPrompt: "What provision are you overlooking because it did not arrive the way you expected?",
    creed: "Allah provides for all creation without measure. His provision is not limited to wealth \u2014 it includes health, relationships, time, and guidance. No soul is forgotten.",
    doesNotMean: "It does not mean wealth is guaranteed in the form you want. Provision includes what is withheld \u2014 that too is a form of giving.",
    quranicRef: "\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0647\u064F\u0648\u064E \u0627\u0644\u0631\u0651\u064E\u0632\u0651\u064E\u0627\u0642\u064F \u0630\u064F\u0648 \u0627\u0644\u0642\u064F\u0648\u0651\u064E\u0629\u0650 \u0627\u0644\u0652\u0645\u064E\u062A\u0650\u064A\u0646\u064F \u2014 \u0627\u0644\u0630\u0627\u0631\u064A\u0627\u062A 51:58 \u2014 \u201CIndeed, it is Allah who is the Provider, the firm possessor of strength.\u201D",
    hadithRef: "The Prophet \uFDFA said: \u201CThere is no soul on earth but that its provision has been written.\u201D \u2014 Muslim",
    feelQuestion: "What false belief in you does this Name expose?",
    feelAnswer: "Ar-Razz\u0101q exposes scarcity thinking. You have been provided for every single day of your life \u2014 even the ones that felt like loss.",
    feelWork: "You hoard opportunities. You compete instead of collaborate. There is enough.",
    feelRelationships: "You keep score. You calculate who gave more. Generosity does not require a balance sheet.",
    feelSelfTalk: "You say \u201Cthere isn\u2019t enough.\u201D There is. You\u2019re measuring the wrong account.",
    liveQuestion: "What changes when you truly believe this Name?",
    liveStatements: [
      "You give without calculating the return.",
      "You stop hoarding and start trusting.",
      "You recognise provision in forms you didn\u2019t expect."
    ],
    dhikr: "\u064A\u064E\u0627 \u0631\u064E\u0632\u0651\u064E\u0627\u0642",
    dhikrTransliteration: "Ya Razz\u0101q",
    dua: "O Allah, You are Ar-Razz\u0101q \u2014 provide for me from where I do not expect, and make me grateful for what I already have.",
    action: "Give one thing away today \u2014 freely, without expectation of return.",
    scholar: "Sheikh Ibn Baz",
    stateKeywords: ["worrying", "exhausted", "alone", "overwhelmed", "grieving"],
    category: "Provision"
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
  { id: "under-pressure", label: "Under pressure" },
  { id: "arrogant", label: "Arrogant / inflated" },
  { id: "grieving", label: "Grieving" },
  { id: "spiritually-empty", label: "Spiritually empty" },
]

export const nameCategories = ["All", "Mercy", "Justice", "Power", "Openings", "Healing", "Provision"]

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
