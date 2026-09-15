import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import config from "../config/config.js";

export function authUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token as string | undefined;
  if (!token) return res.status(401).json({ message: "Token not provided" });

  try {
    req.user = jwt.verify(token, config.JWT_SECRET) as { id: string; username: string };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}