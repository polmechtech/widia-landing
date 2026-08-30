import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "allegro_oauth_state";
const DEFAULT_ALLEGRO_CLIENT_ID = "60f9f0c6597e4eb99ba6d9c1852a9cbc";

export async function GET(request: NextRequest) {
  const clientId = process.env.ALLEGRO_CLIENT_ID || DEFAULT_ALLEGRO_CLIENT_ID;
  const adminSecret = process.env.ADMIN_SECRET;
  const suppliedSecret = request.nextUrl.searchParams.get("key");

  if (adminSecret && suppliedSecret !== adminSecret) {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });
  }

  const state = randomBytes(24).toString("hex");
  const redirectUri = `${request.nextUrl.origin}/api/allegro/callback`;
  const authorizationUrl = new URL("https://allegro.pl/auth/oauth/authorize");
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}
