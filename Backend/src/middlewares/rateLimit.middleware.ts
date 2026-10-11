import { rateLimit } from "express-rate-limit";
import type { Request } from "express";

// Keys are the login email or the authenticated user id rather than the client IP:
// requests arrive through the Vercel and Render proxies, so the IP Express sees is not reliable.
const shared = {
  standardHeaders: "draft-8" as const,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
};

// Failed login attempts per email, to slow down password guessing.
export const loginLimiter = rateLimit({
  ...shared,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  keyGenerator: (req: Request) => `login:${String(req.body?.email ?? "").trim().toLowerCase()}`,
  message: { message: "Too many failed login attempts. Please try again in 15 minutes." },
});

// Arena runs per user; each run makes several LLM calls against shared provider quotas.
// Must be mounted after authUser so req.user is set.
export const arenaLimiter = rateLimit({
  ...shared,
  windowMs: 60 * 1000,
  limit: 5,
  keyGenerator: (req: Request) => `arena:${req.user!.id}`,
  message: { message: "You're sending arena requests too quickly. Please wait a minute and try again." },
});
