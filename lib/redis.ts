import { Redis } from "@upstash/redis";

export function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return { url, token };
}

export function getRedisClient() {
  const { url, token } = getRedisConfig();
  if (!url || !token) {
    throw new Error("Brakuje konfiguracji Redis (UPSTASH_REDIS_REST_* lub KV_REST_API_*).");
  }
  return new Redis({ url, token });
}
