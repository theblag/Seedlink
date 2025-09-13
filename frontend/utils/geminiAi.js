// src/utils/geminiAI.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateAIResponse = async (userPrompt, systemPrompt = "") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = `${systemPrompt}\nUser: ${userPrompt}\nAI:`;
    const result = await model.generateContent(fullPrompt);
    // result.response is NOT a promise, just an object
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Sorry, I couldn't process your request at the moment.";
  }
};
