"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useDictionary } from "@/i18n/dictionary-context";

interface DateSelectorProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const DENSITY_MAP = [0.8, 0.6, 0.9, 0.3, 0.7, 0, 0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0, 0, 0.7, 0.5, 0.8, 0.4, 0.9, 0, 0, 0.6, 0.3, 0.8, 0.7, 0.5, 0, 0, 0.4, 0.9] as const;

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
function isSameDay(a: Date, b: Date) { return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear(); }

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
  const dict = useDictionary();
  const today = useMemo(() => new Date(), []);
  const todayStart = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()), [today]);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const { daysInMonth, firstDay } = useMemo(() => ({
    daysInMonth: getDaysInMonth(viewYear, viewMonth),
    firstDay: getFirstDayOfMonth(viewYear, viewMonth),
  }), [viewYear, viewMonth]);

  const prevMonth = useCallback(() => {
    setViewMonth((m) => { if (m === 0) { setViewYear((y) => y - 1); return 11; } return m - 1; });
  }, []);
  const nextMonth = useCallback(() => {
    setViewMonth((m) => { if (m === 11) { setViewYear((y) => y + 1); return 0; } return m + 1; });
  }, []);

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " "), []);

  const daysMeta = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(viewYear, viewMonth, day);
      const dow = date.getDay();
      const disabled = date < todayStart || dow === 0 || dow === 6;
      const isToday = isSameDay(date, today);
      const density = disabled ? 0 : DENSITY_MAP[(day - 1) % DENSITY_MAP.length];
      return { day, date, disabled, isToday, density };
    });
  }, [viewYear, viewMonth, todayStart, today, daysInMonth]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-navy">{dict.calendar.months[viewMonth]}</h3>
          <p className="text-[11px] font-medium text-navy-20">{viewYear}</p>
        </div>
        <div className="flex gap-0.5">
          <button onClick={prevMonth} disabled={!canGoPrev} className="flex h-8 w-8 items-center justify-center rounded-full text-navy-40 transition-all hover:bg-radical-50 hover:text-radical disabled:opacity-15">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-full text-navy-40 transition-all hover:bg-radical-50 hover:text-radical">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {dict.calendar.days.map((day: string) => (
          <div key={day} className="flex h-8 items-center justify-center text-[10.5px] font-semibold tracking-wider text-navy-20 uppercase">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {Array.from({ length: firstDay }, (_, i) => <div key={`e-${i}`} className="h-11" />)}

        {daysMeta.map(({ day, date, disabled, isToday, density }) => {
          const isSelected = selected ? isSameDay(date, selected) : false;
          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`group relative flex h-11 items-center justify-center rounded-[13px] transition-all duration-150 ${isSelected ? "date-selected" : ""}`}
            >
              {isToday && !isSelected && (
                <span className="absolute bottom-1.5 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-radical/40" />
              )}
              {!disabled && !isSelected && !isToday && density > 0 && (
                <span className="absolute bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-radical transition-transform group-hover:scale-[1.8]" style={{ opacity: 0.15 + density * 0.35 }} />
              )}
              <span className={`relative z-10 text-[13px] transition-all ${
                isSelected ? "font-bold text-white"
                  : isToday ? "font-bold text-radical"
                  : disabled ? "text-navy-10"
                  : "font-medium text-navy group-hover:text-radical"
              }`}>{day}</span>
              {!disabled && !isSelected && (
                <span className="absolute inset-1 rounded-[10px] bg-radical-50/70 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <Globe className="h-3 w-3 text-navy-20" />
        <span className="text-[10.5px] text-navy-20">{timezone}</span>
      </div>
    </div>
  );
}
