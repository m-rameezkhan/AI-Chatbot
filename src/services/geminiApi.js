// src/services/geminiApi.js
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Generate structured pitch response
export async function generatePitchResponse(userMessage) {
  try {
    const prompt = `
You are PitchGen AI — an AI startup assistant.
Generate a startup pitch based on the user idea.
Return the output in JSON format like this:

{
  "startupName": "...",
  "tagline": "...",
  "pitch": "...",
  "targetAudience": "...",
  "landingPageCopy": "..."
}

User idea: ${userMessage}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    // Strip code fences if present
    let text = result.text.replace(/```(json)?/g, "").trim();

    // Parse JSON safely
    let output;
    try {
      output = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse Gemini JSON:", err);
      return {
        startupName: "",
        tagline: "",
        pitch: "⚠️ Sorry, AI returned invalid format.",
        targetAudience: "",
        landingPageCopy: "",
      };
    }

    return output;
  } catch (err) {
    console.error("Gemini Error:", err);
    return {
      startupName: "",
      tagline: "",
      pitch: "⚠️ Sorry, something went wrong while generating your pitch.",
      targetAudience: "",
      landingPageCopy: "",
    };
  }
}
