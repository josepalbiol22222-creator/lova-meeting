"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateSelectorProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

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

function isWeekend(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay();
  return d === 0 || d === 6;
}

// Simulated slot availability (0-1 density) for visual indicator
function getAvailabilityDensity(day: number): number {
  const densities = [0.8, 0.6, 0.9, 0.3, 0.7, 0, 0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0, 0, 0.7, 0.5, 0.8, 0.4, 0.9, 0, 0, 0.6, 0.3, 0.8, 0.7, 0.5, 0, 0, 0.4, 0.9];
  return densities[(day - 1) % densities.length];
}

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

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
            className="group flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:bg-lova-pink-50 disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 text-lova-text-muted group-hover:text-lova-pink" />
          </button>
          <button
            onClick={nextMonth}
            className="group flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:bg-lova-pink-50"
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
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(viewYear, viewMonth, day);
          const isToday = isSameDay(date, today);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const weekend = isWeekend(viewYear, viewMonth, day);
          const past = isPast(day);
          const disabled = past || weekend;
          const density = disabled ? 0 : getAvailabilityDensity(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className="group relative flex h-10 items-center justify-center rounded-[12px] transition-all duration-200"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, #d14d72, #e8749a)"
                  : undefined,
                boxShadow: isSelected
                  ? "0 4px 12px rgba(209, 77, 114, 0.25), 0 1px 3px rgba(209, 77, 114, 0.15)"
                  : undefined,
              }}
            >
              {/* Availability dot indicator */}
              {!disabled && !isSelected && density > 0 && (
                <span
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all group-hover:scale-150"
                  style={{
                    backgroundColor: `rgba(209, 77, 114, ${0.2 + density * 0.4})`,
                  }}
                />
              )}

              {/* Today ring */}
              {isToday && !isSelected && (
                <span className="absolute inset-0.5 rounded-[10px] border-2 border-lova-pink/25" />
              )}

              <span
                className={`relative z-10 text-[13px] font-medium transition-all ${
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

              {/* Hover background */}
              {!disabled && !isSelected && (
                <span className="absolute inset-0.5 rounded-[10px] bg-lova-pink-50 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
          );
        })}
      </div>

      {/* Timezone indicator */}
      <div className="mt-4 flex items-center gap-1.5">
        <div className="h-1 w-1 rounded-full bg-lova-pink/40" />
        <span className="text-[11px] tracking-wide text-lova-text-muted/50">
          {Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ")}
        </span>
      </div>
    </div>
  );
}
