import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
const STATE_COOKIE = "widia_allegro_oauth_state";
const REFRESH_TOKEN_KEY = "widia:allegro:refresh_token:v2";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get(STATE_COOKIE)?.value;
  if (!code) return NextResponse.json({ error: "Brakuje code" }, { status: 400 });
  if (!state || !savedState || state !== savedState) {
    return NextResponse.json({ error: "Nieprawidłowy stan autoryzacji Allegro" }, { status: 400 });
  }

  const clientId = process.env.ALLEGRO_CLIENT_ID;
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Brakuje danych aplikacji Allegro" }, { status: 500 });
  }

  const redirectUri = `${request.nextUrl.origin}/api/allegro/callback`;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://allegro.pl/auth/oauth/token", {
    method: "POST",
    headers: { Authorization: `Basic ${basicAuth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json({ error: data?.error_description ?? data?.error ?? "Błąd autoryzacji Allegro" }, { status: response.status });
  }
  if (!data?.refresh_token) return NextResponse.json({ error: "Allegro nie zwróciło refresh tokenu" }, { status: 502 });

  await redis.set(REFRESH_TOKEN_KEY, data.refresh_token);
  const result = NextResponse.json({ ok: true, message: "Konto WIDIA zostało autoryzowane." });
  result.cookies.delete(STATE_COOKIE);
  return result;
}
