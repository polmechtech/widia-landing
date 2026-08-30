import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const target = new URL("/api/allegro/authorize", request.nextUrl.origin);
  const key = request.nextUrl.searchParams.get("key");
  if (key) target.searchParams.set("key", key);
  return NextResponse.redirect(target);
}
