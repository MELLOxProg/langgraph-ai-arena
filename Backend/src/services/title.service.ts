import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import config from "../config/config.js";

const titleModel = new ChatGroq({ model: "openai/gpt-oss-20b", apiKey: config.GROQ_API_KEY });

function fallbackTitle(message: string) {
  const title = message.replace(/\s+/g, " ").trim().split(/[.!?\n]/)[0] || "";
  return title.slice(0, 48) || "New Arena Match";
}

export async function generateChatTitle(message: string) {
  if (!config.GROQ_API_KEY) return fallbackTitle(message);

  try {
    const response = await titleModel.invoke([
      new SystemMessage("Generate a clear, concise 2-4 word title for this coding challenge. Return only the title."),
      new HumanMessage(message),
    ]);
    return response.text.replace(/^['\"\s]+|['\"\s]+$/g, "").slice(0, 60) || fallbackTitle(message);
  } catch (error) {
    console.warn("GPT-OSS title generation unavailable; using fallback title.", error instanceof Error ? error.message : error);
    return fallbackTitle(message);
  }
}