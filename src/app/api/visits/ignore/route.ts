import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const IGNORE_COOKIE = "visit_ignore";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const expected = process.env.VISIT_IGNORE_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(IGNORE_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ ok: true });
}
