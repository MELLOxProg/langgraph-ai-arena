import type { Request, Response } from "express";
import runGraph from "../ai/graph.ai.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle } from "../services/title.service.js";

export async function sendMessage(req: Request, res: Response) {
  const { message, chat: chatId } = req.body as { message?: string; chat?: string };
  if (!message?.trim()) return res.status(400).json({ message: "Message is required" });

  let chat = chatId ? await chatModel.findOne({ _id: chatId, user: req.user!.id }) : null;
  if (chatId && !chat) return res.status(404).json({ message: "Chat not found" });
  if (!chat) chat = await chatModel.create({ user: req.user!.id, title: await generateChatTitle(message) });

  await messageModel.create({ chat: chat._id, content: message, role: "user" });
  const result = await runGraph(message);
  const aiMessage = await messageModel.create({ chat: chat._id, content: JSON.stringify(result), role: "ai" });
  return res.status(201).json({ chat, aiMessage, data: result });
}

export async function getChats(req: Request, res: Response) {
  const chats = await chatModel.find({ user: req.user!.id }).sort({ updatedAt: -1 });
  return res.json({ chats });
}

export async function getMessages(req: Request, res: Response) {
  const chat = await chatModel.findOne({ _id: req.params.chatId, user: req.user!.id });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  const messages = await messageModel.find({ chat: chat._id }).sort({ createdAt: 1 });
  return res.json({ messages });
}

export async function deleteChat(req: Request, res: Response) {
  const chat = await chatModel.findOneAndDelete({ _id: req.params.chatId, user: req.user!.id });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  await messageModel.deleteMany({ chat: chat._id });
  return res.json({ message: "Chat deleted successfully" });
}