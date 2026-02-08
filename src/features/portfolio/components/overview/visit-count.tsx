"use client";

import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { IntroItem, IntroItemContent, IntroItemIcon } from "./intro-item";

type VisitCountResponse = {
  count: number;
  publicCount: number;
};

export function VisitCount() {
  const [count, setCount] = useState<number | null>(null);
  const [publicCount, setPublicCount] = useState<number | null>(null);

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

  if (count === null || publicCount === null) {
    return null;
  }

  // Only show count for the owner (ignore cookie set)
  if (publicCount === count) {
    return null;
  }

  return (
    <IntroItem>
      <IntroItemIcon>
        <EyeIcon />
      </IntroItemIcon>
      <IntroItemContent
        aria-label={`방문자수 ${count.toLocaleString()}명 (내 접속 제외 ${publicCount.toLocaleString()}명)`}
      >
        방문자수 {count.toLocaleString()}명({publicCount.toLocaleString()}명)
      </IntroItemContent>
    </IntroItem>
  );
}
