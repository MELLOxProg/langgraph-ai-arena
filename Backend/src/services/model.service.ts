import { ChatGoogle } from "../../node_modules/@langchain/google/dist/index.cjs";
import { ChatMistralAI } from "../../node_modules/@langchain/mistralai/dist/index.cjs";
import { ChatCohere } from "../../node_modules/@langchain/cohere/dist/index.cjs";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: config.GOOGLE_API_KEY,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: config.MISTRAL_API_KEY,
});

export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHERE_API_KEY,
});
