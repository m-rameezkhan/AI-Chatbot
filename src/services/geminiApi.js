// src/services/geminiApi.js
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generate structured pitch response with context
 * @param {string} userMessage - Current user input
 * @param {Array} history - Previous messages [{sender: "user"|"ai", text: object|string}]
 */
export async function generatePitchResponse(userMessage, history = []) {
  try {
    // Check if there is an existing AI response to update
    let lastAI = history
      .slice()
      .reverse()
      .find((m) => m.sender === "ai");

    let context = lastAI ? JSON.stringify(lastAI.text) : null;

    const prompt = context
      ? `
You are PitchGen AI — an AI startup assistant.
There is an existing pitch JSON below:

${context}

Update this pitch according to the user's new input:

"${userMessage}"

Return the full updated JSON in the same format:
{
  "startupName": "...",
  "tagline": "...",
  "pitch": "...",
  "targetAudience": "...",
  "landingPageCopy": {
    "headline": "...",
    "subheadline": "...",
    "callToAction": "..."
  }
}`
      : `
You are PitchGen AI — an AI startup assistant.
Generate a new startup pitch based on the user's idea:
"${userMessage}"
Return the output in JSON format like this:
{
  "startupName": "...",
  "tagline": "...",
  "pitch": "...",
  "targetAudience": "...",
  "landingPageCopy": {
    "headline": "...",
    "subheadline": "...",
    "callToAction": "..."
  }
}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Strip code fences
    let text = result.text.replace(/```(json)?/g, "").trim();

    let output;
    try {
      output = JSON.parse(text);
    } catch (err) {
      console.warn("Gemini returned non-JSON text. Wrapping as plain text:", text);
      output = {
        startupName: "",
        tagline: "",
        pitch: text,
        targetAudience: "",
        landingPageCopy: {
          headline: "",
          subheadline: "",
          callToAction: "",
        },
      };
    }

    return output;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return {
      startupName: "",
      tagline: "",
      pitch: "⚠️ Sorry, something went wrong while generating your pitch.",
      targetAudience: "",
      landingPageCopy: {
        headline: "",
        subheadline: "",
        callToAction: "",
      },
    };
  }
}
