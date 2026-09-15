import { tavily as Tavily } from "@tavily/core";
import config from "../config/config.js";

const tavily = config.TAVILY_API_KEY ? Tavily({ apiKey: config.TAVILY_API_KEY }) : null;

export async function searchInternet({ query }: { query: string }) {
  if (!tavily) return "Web search is unavailable because TAVILY_API_KEY is not configured.";
  const results = await tavily.search(query, { maxResults: 5 });
  return JSON.stringify(results);
}