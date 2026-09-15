import jwt from "jsonwebtoken";
import config from "../config/config.js";
import type { Response } from "express";

export function setAuthCookie(res: Response, user: { id: string; username: string }) {
  const token = jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, { expiresIn: "3d" });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 3 * 24 * 60 * 60 * 1000 });
}