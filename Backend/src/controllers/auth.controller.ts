import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import userModel from "../models/user.model.js";
import { setAuthCookie } from "../services/auth.service.js";

function publicUser(user: { _id: unknown; username: string; email: string }) {
  return { id: user._id, username: user.username, email: user.email };
}

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body as { username?: string; email?: string; password?: string };
  if (!username || !email || !password || password.length < 6) return res.status(400).json({ message: "Username, email, and a password of at least 6 characters are required" });
  const existing = await userModel.findOne({ $or: [{ email }, { username }] });
  if (existing) return res.status(400).json({ message: "User already registered" });
  const user = await userModel.create({ username, email, password });
  setAuthCookie(res, { id: String(user._id), username: user.username });
  return res.status(201).json({ message: "User registered successfully", user: publicUser(user) });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };
  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !password || !(await bcrypt.compare(password, user.password || ""))) return res.status(400).json({ message: "Invalid credentials." });
  setAuthCookie(res, { id: String(user._id), username: user.username });
  return res.status(200).json({ message: "User logged in successfully", user: publicUser(user) });
}

export async function getMe(req: Request, res: Response) {
  const user = await userModel.findById(req.user!.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ message: "User retrieved successfully", user });
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  return res.json({ message: "User logged out successfully" });
}