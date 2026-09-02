import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "widia_allegro_oauth_state";

export async function GET(request: NextRequest) {
  const clientId = process.env.ALLEGRO_CLIENT_ID;
  if (!clientId) return NextResponse.json({ error: "Brakuje ALLEGRO_CLIENT_ID" }, { status: 500 });

  const state = randomBytes(24).toString("hex");
  const redirectUri = `${request.nextUrl.origin}/api/allegro/callback`;
  const url = new URL("https://allegro.pl/auth/oauth/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return response;
}
