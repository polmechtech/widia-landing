import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();
const REFRESH_KEY = "widia:allegro:refresh_token";
const OFFER_ID = "16667510739";
const NEW_TITLE = "Frez do rowków nasadzany 140 x 40/30 x 6 mm 6 Z HM węglik spiekany";

async function getToken() {
  const refreshToken = await redis.get<string>(REFRESH_KEY);
  const clientId = process.env.ALLEGRO_CLIENT_ID;
  const clientSecret = process.env.ALLEGRO_CLIENT_SECRET;
  if (!refreshToken || !clientId || !clientSecret) throw new Error("Brakuje danych autoryzacji Allegro WIDIA");
  const response = await fetch("https://allegro.pl/auth/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.access_token) throw new Error(data?.error_description ?? "Błąd odświeżania tokenu Allegro");
  if (data.refresh_token) await redis.set(REFRESH_KEY, data.refresh_token);
  return data.access_token as string;
}

export async function GET() {
  try {
    const token = await getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.allegro.public.v1+json",
    };
    const currentResponse = await fetch(`https://api.allegro.pl/sale/offers/${OFFER_ID}`, { headers, cache: "no-store" });
    const current = await currentResponse.json().catch(() => null);
    if (!currentResponse.ok) {
      return NextResponse.json({ ok: false, step: "read", status: currentResponse.status, error: current?.errors?.[0]?.message ?? "Nie udało się pobrać oferty" }, { status: 502 });
    }
    const updateResponse = await fetch(`https://api.allegro.pl/sale/offers/${OFFER_ID}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/vnd.allegro.public.v1+json" },
      body: JSON.stringify({ ...current, name: NEW_TITLE }),
      cache: "no-store",
    });
    const updated = await updateResponse.json().catch(() => null);
    if (!updateResponse.ok) {
      return NextResponse.json({ ok: false, step: "update", status: updateResponse.status, error: updated?.errors?.[0]?.message ?? "Allegro odrzuciło zmianę" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, offerId: OFFER_ID, name: updated?.name ?? NEW_TITLE });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Nieznany błąd" }, { status: 500 });
  }
}
