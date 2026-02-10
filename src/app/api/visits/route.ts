import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const VISIT_COUNT_KEY = "site:visits";
const PUBLIC_VISIT_COUNT_KEY = "site:visits:public";
const OWNER_VISIT_COUNT_KEY = "site:visits:owner";
const IGNORE_COOKIE = "visit_ignore";
const UID_COOKIE = "visit_uid";
const HISTORY_DAYS = 10;

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
  const today = new Date();
  const dates = Array.from({ length: HISTORY_DAYS }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - index);
    return date.toISOString().slice(0, 10);
  });
  const todayPublicKey = `site:visits:public:${dates[0]}`;
  const todayUniqueKey = `site:visits:public:unique:${dates[0]}`;
  const todayOwnerKey = `${OWNER_VISIT_COUNT_KEY}:${dates[0]}`;
  const todayOwnerUniqueKey = `${OWNER_VISIT_COUNT_KEY}:unique:${dates[0]}`;

  const { client, source } = getRedisClient();

  if (!client) {
    return NextResponse.json({
      count: 0,
      publicCount: 0,
      todayCount: 0,
      todayUnique: 0,
      history: [],
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
    await Promise.all([
      client.incr(VISIT_COUNT_KEY),
      client.incr(todayOwnerKey),
      client.sadd(todayOwnerUniqueKey, uid),
    ]);
  }

  const publicKeys = dates.map((date) => `site:visits:public:${date}`);
  const uniqueKeys = dates.map((date) => `site:visits:public:unique:${date}`);
  const ownerKeys = dates.map((date) => `${OWNER_VISIT_COUNT_KEY}:${date}`);
  const ownerUniqueKeys = dates.map(
    (date) => `${OWNER_VISIT_COUNT_KEY}:unique:${date}`
  );

  const [
    count,
    publicCount,
    publicCounts,
    uniqueCounts,
    ownerCounts,
    ownerUniqueCounts,
  ] = await Promise.all([
    client.get<number>(VISIT_COUNT_KEY),
    client.get<number>(PUBLIC_VISIT_COUNT_KEY),
    client.mget<number[]>(...publicKeys),
    Promise.all(uniqueKeys.map((key) => client.scard(key))),
    client.mget<number[]>(...ownerKeys),
    Promise.all(ownerUniqueKeys.map((key) => client.scard(key))),
  ]);

  const history = dates.map((date, index) => ({
    date,
    total:
      (publicCounts?.[index] ?? 0) +
      (shouldIgnore ? (ownerCounts?.[index] ?? 0) : 0),
    unique:
      (uniqueCounts[index] ?? 0) +
      (shouldIgnore ? (ownerUniqueCounts[index] ?? 0) : 0),
  }));

  const response = NextResponse.json({
    count: count ?? 0,
    publicCount: publicCount ?? 0,
    todayCount: history[0]?.total ?? 0,
    todayUnique: history[0]?.unique ?? 0,
    history,
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
