"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateSelectorProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-based (Mon=0, Sun=6)
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

export function DateSelector({ selected, onSelect }: DateSelectorProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < todayStart;
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div>
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-lova-text">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="rounded-lg p-1.5 text-lova-text-muted transition-colors hover:bg-white/80 hover:text-lova-text disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="rounded-lg p-1.5 text-lova-text-muted transition-colors hover:bg-white/80 hover:text-lova-text"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-lova-text-muted"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(viewYear, viewMonth, day);
          const isToday = isSameDay(date, today);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const disabled = isPast(day) || isWeekend(viewYear, viewMonth, day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? "bg-lova-pink text-white shadow-md shadow-lova-pink/20"
                  : isToday
                    ? "bg-lova-pink/10 text-lova-pink hover:bg-lova-pink/20"
                    : disabled
                      ? "text-lova-text-muted/30 cursor-not-allowed"
                      : "text-lova-text hover:bg-white/80"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Timezone */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-lova-text-muted">
        <span>
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </span>
      </div>
    </div>
  );
}
