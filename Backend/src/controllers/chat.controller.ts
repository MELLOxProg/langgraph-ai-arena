import type { Request, Response } from "express";
import runGraph from "../services/ai/graph.ai.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle } from "../services/title.service.js";

const MAX_CONTEXT_MESSAGES = 4;
const MAX_CONTEXT_CHARS = 800;

export async function sendMessage(req: Request, res: Response) {
  const { message, chat: chatId } = req.body as {
    message?: string;
    chat?: string;
  };
  if (!message?.trim())
    return res.status(400).json({ message: "Message is required" });

  let chat = chatId
    ? await chatModel.findOne({ _id: chatId, user: req.user!.id })
    : null;
  if (chatId && !chat)
    return res.status(404).json({ message: "Chat not found" });
  if (!chat)
    chat = await chatModel.create({
      user: req.user!.id,
      title: await generateChatTitle(message),
    });

  await messageModel.create({ chat: chat._id, content: message, role: "user" });
  // Only the last few prior messages, each truncated, to keep prompts under provider TPM limits.
  const history = await messageModel
    .find({ chat: chat._id })
    .sort({ createdAt: -1 })
    .skip(1)
    .limit(MAX_CONTEXT_MESSAGES);
  const context = history
    .reverse()
    .map(
      (entry) =>
        `${entry.role === "user" ? "User" : "Arena response"}: ${entry.content.slice(0, MAX_CONTEXT_CHARS)}`,
    )
    .join("\n\n");
  let result;
  try {
    result = await runGraph(message, context);
  } catch (error) {
    console.error("Arena graph failed:", error);
    const { status, statusCode } = error as { status?: number; statusCode?: number };
    if ((status ?? statusCode) === 429)
      return res.status(429).json({ message: "An AI provider's rate limit was reached. Please wait a minute and try again." });
    return res.status(502).json({ message: "The arena failed to generate a response. Please try again." });
  }
  const aiMessage = await messageModel.create({
    chat: chat._id,
    content: JSON.stringify(result),
    role: "ai",
  });
  return res.status(201).json({ chat, aiMessage, data: result });
}

export async function getChats(req: Request, res: Response) {
  const chats = await chatModel
    .find({ user: req.user!.id })
    .sort({ updatedAt: -1 });
  return res.json({ chats });
}

export async function getMessages(req: Request, res: Response) {
  const chat = await chatModel.findOne({
    _id: req.params.chatId,
    user: req.user!.id,
  });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  const messages = await messageModel
    .find({ chat: chat._id })
    .sort({ createdAt: 1 });
  return res.json({ messages });
}

export async function deleteChat(req: Request, res: Response) {
  const chat = await chatModel.findOneAndDelete({
    _id: req.params.chatId,
    user: req.user!.id,
  });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  await messageModel.deleteMany({ chat: chat._id });
  return res.json({ message: "Chat deleted successfully" });
}
