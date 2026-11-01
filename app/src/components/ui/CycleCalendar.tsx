"use client";

import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { fr } from "date-fns/locale";

export interface CycleCalendarProps {
  lastPeriodStart?: Date | string | null;
  cycleLength?: number;
  periodLength?: number;
  ovulationDate?: Date | string | null;
  fertileWindowStart?: Date | string | null;
  fertileWindowEnd?: Date | string | null;
}

function toDate(value?: Date | string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function CycleCalendar({
  lastPeriodStart,
  cycleLength = 28,
  periodLength = 5,
  ovulationDate,
  fertileWindowStart,
  fertileWindowEnd,
}: CycleCalendarProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const pad = (getDay(monthStart) + 6) % 7; // Monday-first

  const periodStart = toDate(lastPeriodStart);
  const ovulation = toDate(ovulationDate);
  const fertileStart = toDate(fertileWindowStart);
  const fertileEnd = toDate(fertileWindowEnd);

  const isPeriodDay = (day: Date) => {
    if (!periodStart) return false;
    const end = addDays(periodStart, periodLength - 1);
    return day >= periodStart && day <= end;
  };

  const isFertile = (day: Date) => {
    if (fertileStart && fertileEnd) {
      return day >= fertileStart && day <= fertileEnd;
    }
    if (!periodStart) return false;
    const ovu = addDays(periodStart, Math.max(1, cycleLength - 14) - 1);
    const start = addDays(ovu, -5);
    const end = addDays(ovu, 1);
    return day >= start && day <= end;
  };

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-4 border border-outline-variant/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-headline text-headline-sm text-on-surface font-bold capitalize">
          {format(today, "MMMM yyyy", { locale: fr })}
        </h3>
        <span className="font-label text-label-sm text-on-surface-variant">
          Jours colorés selon ton cycle
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="font-label text-label-sm text-on-surface-variant py-1"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: pad }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const period = isPeriodDay(day);
          const fertile = !period && isFertile(day);
          const ovu = ovulation ? isSameDay(day, ovulation) : false;
          const todayMark = isSameDay(day, today);
          return (
            <span
              key={day.toISOString()}
              className={`h-9 w-full rounded-xl flex items-center justify-center font-label text-label-sm ${
                todayMark
                  ? "ring-2 ring-primary text-primary font-bold"
                  : ""
              } ${
                period
                  ? "bg-[#ffdbcf] text-on-tertiary-fixed-variant"
                  : fertile
                    ? "bg-secondary-container/60 text-on-secondary-container"
                    : "bg-surface-container-low text-on-surface-variant"
              }`}
              title={
                period
                  ? "Jour de règles (estimation)"
                  : ovu
                    ? "Ovulation estimée"
                    : fertile
                      ? "Fenêtre fertile estimée"
                      : ""
              }
            >
              {format(day, "d")}
            </span>
          );
        })}
      </div>
    </div>
  );
}
