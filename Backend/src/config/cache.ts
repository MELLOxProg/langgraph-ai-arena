import { Redis } from "ioredis";
import config from "./config.js";

const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
  lazyConnect: true,
});

redis.on("error", (error: Error) => {
  console.error("Redis connection error:", error.message);
});

export async function blacklistToken(token: string, ttlSeconds: number) {
  if (redis.status === "wait") await redis.connect();
  await redis.set(token, Date.now().toString(), "EX", Math.max(ttlSeconds, 1));
}

export async function isTokenBlacklisted(token: string) {
  if (redis.status === "wait") await redis.connect();
  return Boolean(await redis.get(token));
}