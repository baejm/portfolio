"use client";

import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IntroItem, IntroItemIcon } from "./intro-item";

type VisitCountResponse = {
  count: number;
  publicCount: number;
  todayCount: number;
  todayUnique: number;
  ignored: boolean;
  history: VisitHistoryItem[];
};

type VisitHistoryItem = {
  date: string;
  total: number;
  unique: number;
};

function formatDateLabel(date: string) {
  return date.replaceAll("-", ".");
}

export function VisitCount() {
  const [count, setCount] = useState<number | null>(null);
  const [publicCount, setPublicCount] = useState<number | null>(null);
  const [todayCount, setTodayCount] = useState<number | null>(null);
  const [todayUnique, setTodayUnique] = useState<number | null>(null);
  const [ignored, setIgnored] = useState<boolean | null>(null);
  const [history, setHistory] = useState<VisitHistoryItem[]>([]);

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
          setHistory(data.history ?? []);
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
    <Dialog>
      <IntroItem>
        <IntroItemIcon>
          <EyeIcon />
        </IntroItemIcon>
        <DialogTrigger asChild>
          <button
            type="button"
            className="cursor-pointer text-left font-mono text-sm text-balance underline-offset-4 hover:underline"
            aria-label={`오늘 조회 ${todayCount.toLocaleString()}회(고유 ${todayUnique.toLocaleString()}명)`}
          >
            오늘 조회 {todayCount.toLocaleString()}회(고유{" "}
            {todayUnique.toLocaleString()}명)
          </button>
        </DialogTrigger>
      </IntroItem>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>최근 10일 조회</DialogTitle>
          <DialogDescription>괄호 안은 고유 방문자 수입니다.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              집계된 데이터가 없습니다.
            </p>
          ) : (
            history.map((item, index) => (
              <div
                key={item.date}
                className="flex items-center justify-between rounded-lg border border-muted-foreground/10 px-3 py-2 text-sm"
              >
                <span className="font-mono text-muted-foreground">
                  {index === 0 ? "오늘" : formatDateLabel(item.date)}
                </span>
                <span className="font-mono">
                  {item.total.toLocaleString()}회(고유{" "}
                  {item.unique.toLocaleString()}명)
                </span>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
