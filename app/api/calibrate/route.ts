import { generateText, Output } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { z } from "zod"
import { namesOfAllah } from "@/lib/names-data"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const calibrationSchema = z.object({
  state_detected: z.array(z.string()),
  primary_name: z.string(),
  arabic: z.string(),
  transliteration: z.string(),
  english: z.string(),
  why: z.string(),
  know: z.string(),
  feel: z.string(),
  live: z.string(),
  dua: z.string(),
  action: z.string(),
  risk_level: z.enum(["standard", "crisis", "scholar_required", "vague"]),
})

const namesList = namesOfAllah.map((n) => ({
  id: n.id,
  transliteration: n.transliteration,
  meaning: n.meaning,
  stateKeywords: n.stateKeywords,
  creed: n.creed.substring(0, 120),
  feelAnswer: n.feelAnswer.substring(0, 120),
  action: n.action.substring(0, 100),
  arabic: n.arabic,
  dhikr: n.dhikr,
  dua: n.dua.substring(0, 120),
}))

const SYSTEM_PROMPT = `You are a constrained routing assistant for Rushd, an Islamic app built on the Names of Allah. You are NOT a chatbot. You are NOT a therapist. You are a routing tool.

Your only function is to:
1. Read the user's input
2. Identify the emotional or situational state
3. Return a structured JSON object matching them to exactly ONE Name of Allah from the provided list

Rules:
- Never say "I understand how you feel" or any variation
- Never use wellness language, therapy-speak, or soft encouragement
- Be direct, precise, and grounded in Islamic scholarship
- Write in second person ("You are..." not "The user is...")
- The "why" field: 2-3 sentences connecting the Name to the situation. Zero filler.
- The "know" field: 1 sentence on the creedal meaning, relevant to the situation
- The "feel" field: 1 sentence on what false belief this Name exposes
- The "live" field: 1 concrete behavioral instruction for today. Not a principle, not a platitude.
- The "action" field: one concrete action for today, specific to their situation
- The "dua" field: a short du'a incorporating the Name
- If the situation describes crisis (suicidal ideation, self-harm, wanting to die), set risk_level to "crisis" and leave all other text fields empty
- If the input requests a fatwa, ruling, or theological opinion, set risk_level to "scholar_required"
- If the input is too vague to determine an emotional state, set risk_level to "vague"

Available Names:
${JSON.stringify(namesList)}

You MUST select from this list. Do not invent Names.`

export async function POST(req: Request) {
  const { input } = await req.json()

  if (!input || typeof input !== "string" || input.trim().length === 0) {
    return Response.json({ error: "Input required." }, { status: 400 })
  }

  if (input.length > 500) {
    return Response.json(
      {
        output: {
          risk_level: "scholar_required",
          state_detected: [],
          primary_name: "",
          arabic: "",
          transliteration: "",
          english: "",
          why: "",
          know: "",
          feel: "",
          live: "",
          dua: "",
          action: "",
        },
        message: "Rushd isn\u2019t the right place for that question. A qualified scholar is.",
      },
      { status: 200 }
    )
  }

  try {
    const { output } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      output: Output.object({
        schema: calibrationSchema,
      }),
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: input.trim(),
        },
      ],
    })

    return Response.json({ output })
  } catch (e) {
    console.error("[v0] Groq calibration error:", e)
    return Response.json({ error: "Connection failed. Try again." }, { status: 500 })
  }
}
