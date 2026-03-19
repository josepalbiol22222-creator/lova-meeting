"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateSelectorProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const DENSITY_MAP = [0.8, 0.6, 0.9, 0.3, 0.7, 0, 0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0, 0, 0.7, 0.5, 0.8, 0.4, 0.9, 0, 0, 0.6, 0.3, 0.8, 0.7, 0.5, 0, 0, 0.4, 0.9] as const;

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
  const today = useMemo(() => new Date(), []);
  const todayStart = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const { daysInMonth, firstDay } = useMemo(
    () => ({
      daysInMonth: getDaysInMonth(viewYear, viewMonth),
      firstDay: getFirstDayOfMonth(viewYear, viewMonth),
    }),
    [viewYear, viewMonth]
  );

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " "),
    []
  );

  // Pre-compute day metadata to avoid per-render object creation
  const daysMeta = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(viewYear, viewMonth, day);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = date < todayStart;
      const disabled = isPast || isWeekend;
      const isToday = isSameDay(date, today);
      const density = disabled ? 0 : DENSITY_MAP[(day - 1) % DENSITY_MAP.length];
      return { day, date, disabled, isToday, density };
    });
  }, [viewYear, viewMonth, todayStart, today, daysInMonth]);

  return (
    <div>
      {/* Month navigation */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-heading text-[17px] font-bold text-lova-text">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="group flex h-8 w-8 items-center justify-center rounded-xl transition-colors hover:bg-lova-pink-50 disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 text-lova-text-muted group-hover:text-lova-pink" />
          </button>
          <button
            onClick={nextMonth}
            className="group flex h-8 w-8 items-center justify-center rounded-xl transition-colors hover:bg-lova-pink-50"
          >
            <ChevronRight className="h-4 w-4 text-lova-text-muted group-hover:text-lova-pink" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="mb-1.5 grid grid-cols-7 gap-0.5">
        {DAYS.map((day) => (
          <div
            key={day}
            className="pb-2 text-center text-[11px] font-semibold tracking-wider text-lova-text-muted/60 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`e-${i}`} className="h-10" />
        ))}

        {daysMeta.map(({ day, date, disabled, isToday, density }) => {
          const isSelected = selected ? isSameDay(date, selected) : false;

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`group relative flex h-10 items-center justify-center rounded-[12px] transition-colors ${
                isSelected ? "date-selected" : ""
              }`}
            >
              {/* Availability dot */}
              {!disabled && !isSelected && density > 0 && (
                <span
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lova-pink transition-transform group-hover:scale-150"
                  style={{ opacity: 0.2 + density * 0.4 }}
                />
              )}

              {/* Today ring */}
              {isToday && !isSelected && (
                <span className="absolute inset-0.5 rounded-[10px] border-2 border-lova-pink/25" />
              )}

              <span
                className={`relative z-10 text-[13px] font-medium transition-colors ${
                  isSelected
                    ? "text-white font-semibold"
                    : isToday
                      ? "text-lova-pink font-semibold"
                      : disabled
                        ? "text-lova-text-muted/20"
                        : "text-lova-text group-hover:text-lova-pink group-hover:font-semibold"
                }`}
              >
                {day}
              </span>

              {/* Hover bg */}
              {!disabled && !isSelected && (
                <span className="absolute inset-0.5 rounded-[10px] bg-lova-pink-50 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
          );
        })}
      </div>

      {/* Timezone */}
      <div className="mt-4 flex items-center gap-1.5">
        <div className="h-1 w-1 rounded-full bg-lova-pink/40" />
        <span className="text-[11px] tracking-wide text-lova-text-muted/50">
          {timezone}
        </span>
      </div>
    </div>
  );
}
