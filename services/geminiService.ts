
import { GoogleGenAI } from "@google/genai";

// Always use direct process.env.API_KEY for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah asisten ahli jaringan komputer untuk siswa TKJ. Jawab pertanyaan seputar topologi jaringan dengan bahasa yang mudah dimengerti, edukatif, dan profesional. Gunakan format markdown.",
        temperature: 0.7,
      },
    });
    // Correctly access .text property (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, asisten AI sedang mengalami gangguan. Silakan coba lagi nanti.";
  }
};
