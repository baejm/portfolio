"use client";

import { EyeIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  date: string; // yyyy-mm-dd
  total: number;
  unique: number;
};

type CalendarCell = {
  key: string;
  date: string | null;
  day: number | null;
  total: number;
  unique: number;
  isToday: boolean;
  hasData: boolean;
};

type MonthlyCalendar = {
  monthKey: string; // yyyy-mm
  monthLabel: string;
  cells: CalendarCell[];
};

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");
  return `${year}.${month}`;
}

function buildMonthlyCalendars(history: VisitHistoryItem[]): MonthlyCalendar[] {
  const historyByDate = new Map(history.map((item) => [item.date, item]));
  const monthOrder: string[] = [];

  for (const item of history) {
    const monthKey = item.date.slice(0, 7);
    if (!monthOrder.includes(monthKey)) {
      monthOrder.push(monthKey);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return monthOrder.map((monthKey) => {
    const [yearString, monthString] = monthKey.split("-");
    const year = Number(yearString);
    const month = Number(monthString);

    const firstDayOfMonth = new Date(Date.UTC(year, month - 1, 1));
    const startWeekday = firstDayOfMonth.getUTCDay();
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();

    const cells: CalendarCell[] = [];

    for (let i = 0; i < startWeekday; i += 1) {
      cells.push({
        key: `${monthKey}-empty-${i}`,
        date: null,
        day: null,
        total: 0,
        unique: 0,
        isToday: false,
        hasData: false,
      });
    }

    for (let day = 1; day <= lastDay; day += 1) {
      const date = `${monthKey}-${String(day).padStart(2, "0")}`;
      const item = historyByDate.get(date);
      cells.push({
        key: date,
        date,
        day,
        total: item?.total ?? 0,
        unique: item?.unique ?? 0,
        isToday: date === today,
        hasData: Boolean(item),
      });
    }

    while (cells.length % 7 !== 0) {
      cells.push({
        key: `${monthKey}-tail-${cells.length}`,
        date: null,
        day: null,
        total: 0,
        unique: 0,
        isToday: false,
        hasData: false,
      });
    }

    return {
      monthKey,
      monthLabel: formatMonthLabel(monthKey),
      cells,
    };
  });
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

  const monthlyCalendars = useMemo(
    () => buildMonthlyCalendars(history),
    [history]
  );

  if (
    count === null ||
    publicCount === null ||
    todayCount === null ||
    todayUnique === null ||
    ignored === null
  ) {
    return null;
  }

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

      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>최근 1년 조회</DialogTitle>
          <DialogDescription>
            날짜별 조회 수를 월 단위 달력으로 표시합니다. 괄호 안은 고유 방문자
            수입니다.
          </DialogDescription>
        </DialogHeader>

        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            집계된 방문 데이터가 없습니다.
          </p>
        ) : (
          <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
            {monthlyCalendars.map((month) => (
              <section
                key={month.monthKey}
                className="rounded-xl border border-muted-foreground/10 p-3"
              >
                <h3 className="mb-2 text-sm font-semibold">
                  {month.monthLabel}
                </h3>
                <div className="mb-1 grid grid-cols-7 gap-1">
                  {WEEKDAY_LABELS.map((label) => (
                    <div
                      key={`${month.monthKey}-${label}`}
                      className="text-center text-[11px] text-muted-foreground"
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {month.cells.map((cell) => (
                    <div
                      key={cell.key}
                      className={[
                        "min-h-[56px] rounded-md border px-1 py-1",
                        cell.date
                          ? "border-muted-foreground/10"
                          : "border-transparent bg-transparent",
                        cell.isToday ? "ring-1 ring-primary/40" : "",
                      ].join(" ")}
                    >
                      {cell.date ? (
                        <div className="space-y-0.5">
                          <p className="text-[10px] leading-none font-semibold">
                            {cell.day}
                          </p>
                          <p className="text-[10px] leading-none text-muted-foreground">
                            {cell.hasData ? `${cell.total}회` : "-"}
                          </p>
                          <p className="text-[10px] leading-none text-muted-foreground">
                            {cell.hasData ? `(고유 ${cell.unique}명)` : ""}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
