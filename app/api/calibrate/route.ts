import { generateText, Output } from "ai"
import { z } from "zod"
import { namesOfAllah } from "@/lib/names-data"

// Using nullable() instead of optional() for OpenAI compatibility with strict mode
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

const SYSTEM_PROMPT = `You are a routing assistant for Rushd, an Islamic app built on the 99 Names of Allah. You are NOT a chatbot or therapist - you are a routing tool.

Your function:
1. Read the user's emotional/situational state
2. Match them to exactly ONE Name of Allah from the list below
3. Return structured guidance

Rules:
- Be direct, precise, grounded in Islamic scholarship
- Write in second person ("You are..." not "The user is...")
- "why": 2-3 sentences connecting the Name to the situation. No filler.
- "know": 1 sentence on creedal meaning relevant to situation
- "feel": 1 sentence on false belief this Name exposes
- "live": 1 concrete behavioral instruction for today
- "action": one specific action for their situation
- "dua": a short du'a incorporating the Name
- If crisis (suicidal ideation, self-harm): set risk_level="crisis", leave text fields empty
- If fatwa/ruling requested: set risk_level="scholar_required"
- If too vague: set risk_level="vague"

Available Names (select from this list only):
${JSON.stringify(namesList)}`

export async function POST(req: Request) {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { input } = body

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
        message: "Rushd isn't the right place for that question. A qualified scholar is.",
      },
      { status: 200 }
    )
  }

  try {
    console.log("[v0] Starting AI calibration for input:", input.trim().substring(0, 50))
    
    // Using Vercel AI Gateway with structured output
    const result = await generateText({
      model: "openai/gpt-4o-mini" as Parameters<typeof generateText>[0]["model"],
      output: Output.object({
        schema: calibrationSchema,
      }),
      system: SYSTEM_PROMPT,
      prompt: input.trim(),
    })

    console.log("[v0] AI result received:", JSON.stringify(result).substring(0, 200))

    if (!result.output) {
      console.error("[v0] No output from AI, full result:", JSON.stringify(result))
      return Response.json({ error: "Failed to process response. Try again." }, { status: 500 })
    }

    console.log("[v0] Returning output:", JSON.stringify(result.output).substring(0, 100))
    return Response.json({ output: result.output })
  } catch (e: unknown) {
    const error = e as Error
    console.error("[v0] AI calibration error:", error.message)
    console.error("[v0] Error stack:", error.stack)
    return Response.json({ error: "Connection failed. Try again." }, { status: 500 })
  }
}
