"use client";

import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { IntroItem, IntroItemContent, IntroItemIcon } from "./intro-item";

type VisitCountResponse = {
  count: number;
  publicCount: number;
  todayCount: number;
  todayUnique: number;
  ignored: boolean;
};

export function VisitCount() {
  const [count, setCount] = useState<number | null>(null);
  const [publicCount, setPublicCount] = useState<number | null>(null);
  const [todayCount, setTodayCount] = useState<number | null>(null);
  const [todayUnique, setTodayUnique] = useState<number | null>(null);
  const [ignored, setIgnored] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/visits", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as VisitCountResponse;
        if (isMounted) {
          setCount(data.count);
          setPublicCount(data.publicCount);
          setTodayCount(data.todayCount);
          setTodayUnique(data.todayUnique);
          setIgnored(data.ignored);
        }
      } catch {
        // noop
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  if (
    count === null ||
    publicCount === null ||
    todayCount === null ||
    todayUnique === null ||
    ignored === null
  ) {
    return null;
  }

  // Only show count for the owner (ignore cookie set)
  if (!ignored) {
    return null;
  }

  return (
    <IntroItem>
      <IntroItemIcon>
        <EyeIcon />
      </IntroItemIcon>
      <IntroItemContent
        aria-label={`총 방문자수 ${count.toLocaleString()}명(내 제외 ${publicCount.toLocaleString()}명, 오늘 ${todayCount.toLocaleString()}명(내 제외 ${todayUnique.toLocaleString()}명))`}
      >
        총 {count.toLocaleString()}명({publicCount.toLocaleString()}명) · 오늘{" "}
        {todayCount.toLocaleString()}명({todayUnique.toLocaleString()}명)
      </IntroItemContent>
    </IntroItem>
  );
}
