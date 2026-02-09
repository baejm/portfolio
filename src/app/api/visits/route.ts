import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const VISIT_COUNT_KEY = "site:visits";
const PUBLIC_VISIT_COUNT_KEY = "site:visits:public";
const IGNORE_COOKIE = "visit_ignore";
const UID_COOKIE = "visit_uid";

const redis = Redis.fromEnv();

function getRedisClient() {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return { client: Redis.fromEnv(), source: "upstash" };
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    return { client: new Redis({ url, token }), source: "vercel_kv" };
  }

  return { client: null, source: "none" as const };
}

export async function GET() {
  const cookieStore = await cookies();
  const shouldIgnore = cookieStore.get(IGNORE_COOKIE)?.value === "1";
  const today = new Date().toISOString().slice(0, 10);
  const todayPublicKey = `site:visits:public:${today}`;
  const todayUniqueKey = `site:visits:public:unique:${today}`;

  const { client, source } = getRedisClient();

  if (!client) {
    return NextResponse.json({
      count: 0,
      publicCount: 0,
      todayCount: 0,
      todayUnique: 0,
      ignored: shouldIgnore,
      source,
    });
  }

  let uid = cookieStore.get(UID_COOKIE)?.value;
  const shouldSetUid = !uid;
  if (!uid) {
    uid = crypto.randomUUID();
  }

  if (!shouldIgnore) {
    await Promise.all([
      client.incr(VISIT_COUNT_KEY),
      client.incr(PUBLIC_VISIT_COUNT_KEY),
      client.incr(todayPublicKey),
      client.sadd(todayUniqueKey, uid),
    ]);
  } else {
    await client.incr(VISIT_COUNT_KEY);
  }

  const [count, publicCount, todayCount, todayUnique] = await Promise.all([
    client.get<number>(VISIT_COUNT_KEY),
    client.get<number>(PUBLIC_VISIT_COUNT_KEY),
    client.get<number>(todayPublicKey),
    client.scard(todayUniqueKey),
  ]);

  const response = NextResponse.json({
    count: count ?? 0,
    publicCount: publicCount ?? 0,
    todayCount: todayCount ?? 0,
    todayUnique: todayUnique ?? 0,
    ignored: shouldIgnore,
    source,
  });

  if (shouldSetUid) {
    response.cookies.set(UID_COOKIE, uid, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}
