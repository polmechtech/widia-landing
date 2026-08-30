import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "allegro_oauth_state";
const REFRESH_TOKEN_KEY = "widia:allegro:refresh_token";
const ACCESS_TOKEN_KEY = "widia:allegro:access_token";
const ACCESS_TOKEN_TTL_KEY = "widia:allegro:access_token_ttl";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(STATE_COOKIE)?.value;
  const clientId = process.env.ALLEGRO_CLIENT_ID;
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET;
  const redirectUri = `${request.nextUrl.origin}/api/allegro/callback`;

  if (!code) {
    return NextResponse.json({ error: "Brakuje code" }, { status: 400 });
  }

  if (!returnedState || !expectedState || returnedState !== expectedState) {
    return NextResponse.json({ error: "Nieprawidłowy stan autoryzacji Allegro" }, { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Brakuje ALLEGRO_CLIENT_ID albo ALLEGRO_CLIENT_SECRET" },
      { status: 500 }
    );
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch("https://allegro.pl/auth/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const tokenData = await tokenResponse.json().catch(() => null);
  if (!tokenResponse.ok || !tokenData?.access_token || !tokenData?.refresh_token) {
    return NextResponse.json(
      {
        error: "Nie udało się zakończyć autoryzacji Allegro",
        details: tokenData?.error_description ?? tokenData?.error ?? `HTTP ${tokenResponse.status}`,
      },
      { status: 502 }
    );
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return NextResponse.json(
      { error: "Brakuje konfiguracji Redis potrzebnej do zapisania tokenu Allegro" },
      { status: 500 }
    );
  }

  const redis = new Redis({ url: redisUrl, token: redisToken });
  const expiresIn = Number(tokenData.expires_in ?? 3600);
  const validUntil = Date.now() + expiresIn * 1000;

  await Promise.all([
    redis.set(REFRESH_TOKEN_KEY, tokenData.refresh_token),
    redis.set(ACCESS_TOKEN_KEY, tokenData.access_token, { ex: Math.max(60, expiresIn) }),
    redis.set(ACCESS_TOKEN_TTL_KEY, validUntil, { ex: Math.max(60, expiresIn) }),
  ]);

  const response = NextResponse.redirect(new URL("/?allegro=connected", request.nextUrl.origin));
  response.cookies.delete(STATE_COOKIE);
  return response;
}
