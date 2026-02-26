import { generateText } from "ai"
import { z } from "zod"
import { namesOfAllah } from "@/lib/names-data"

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

You MUST select from this list. Do not invent Names.

IMPORTANT: You MUST respond with ONLY a valid JSON object matching this exact schema:
{
  "state_detected": ["array of detected emotional states"],
  "primary_name": "the internal name identifier",
  "arabic": "Arabic text of the Name",
  "transliteration": "transliteration of the Name",
  "english": "English meaning",
  "why": "2-3 sentences explanation",
  "know": "1 sentence creedal meaning",
  "feel": "1 sentence on false belief exposed",
  "live": "1 concrete behavioral instruction",
  "dua": "short du'a with the Name",
  "action": "one concrete action for today",
  "risk_level": "standard" | "crisis" | "scholar_required" | "vague"
}

Do NOT include any text before or after the JSON. Return ONLY the JSON object.`

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
    // Using Vercel AI Gateway - no API key needed for supported providers
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: SYSTEM_PROMPT,
      prompt: input.trim(),
    })

    // Parse the JSON response from the LLM
    let output
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("No JSON found in response")
      }
      const parsed = JSON.parse(jsonMatch[0])
      output = calibrationSchema.parse(parsed)
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      console.error("[v0] Raw response:", text)
      return Response.json({ error: "Failed to process response. Try again." }, { status: 500 })
    }

    return Response.json({ output })
  } catch (e) {
    console.error("[v0] AI calibration error:", e)
    return Response.json({ error: "Connection failed. Try again." }, { status: 500 })
  }
}
