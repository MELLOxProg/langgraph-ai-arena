import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import config from "../config/config.js";
import { isTokenBlacklisted } from "../config/cache.js";

export async function authUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token as string | undefined;
  if (!token) return res.status(401).json({ message: "Token not provided" });

  try {
    if (await isTokenBlacklisted(token)) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = jwt.verify(token, config.JWT_SECRET) as { id: string; username: string };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}