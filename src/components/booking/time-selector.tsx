"use client";

import { useMemo } from "react";

interface TimeSelectorProps {
  date: Date;
  duration: number;
  onSelect: (time: string) => void;
}

function generateSlots(duration: number): string[] {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 17;

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += duration) {
      const endMinutes = h * 60 + m + duration;
      if (endMinutes <= endHour * 60) {
        const hour = h.toString().padStart(2, "0");
        const min = m.toString().padStart(2, "0");
        slots.push(`${hour}:${min}`);
      }
    }
  }
  return slots;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatEndTime(time: string, duration: number): string {
  const [h, m] = time.split(":").map(Number);
  const totalMin = h * 60 + m + duration;
  const endH = Math.floor(totalMin / 60) % 24;
  const endM = totalMin % 60;
  const ampm = endH >= 12 ? "PM" : "AM";
  const hour12 = endH % 12 || 12;
  return `${hour12}:${endM.toString().padStart(2, "0")} ${ampm}`;
}

export function TimeSelector({ date, duration, onSelect }: TimeSelectorProps) {
  const slots = useMemo(() => generateSlots(duration), [duration]);

  const availableSlots = useMemo(() => {
    const seed = date.getDate();
    const unavailable = new Set(
      slots.map((_, i) => i).filter((i) => (i + seed) % 7 === 0)
    );
    return slots.filter((_, i) => !unavailable.has(i));
  }, [slots, date]);

  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold tracking-widest text-lova-text-muted/60 uppercase">
        Available times
      </p>
      <p className="mb-4 font-heading text-[15px] font-bold text-lova-text">
        {date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="slots-scroll flex max-h-[340px] flex-col gap-1.5 overflow-y-auto pr-1">
        {availableSlots.map((slot, i) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className="animate-slot-enter group relative flex items-center justify-between rounded-xl border border-lova-border/50 bg-white/70 px-4 py-3 transition-all duration-200 hover:border-lova-pink/40 hover:bg-lova-pink-50 hover:shadow-sm hover:shadow-lova-pink/10"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="text-[13.5px] font-semibold text-lova-text transition-colors group-hover:text-lova-pink">
              {formatTime(slot)}
            </span>

            {/* Confirm label on hover */}
            <span className="text-[11px] font-semibold text-lova-pink opacity-0 transition-all duration-200 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0">
              Confirm →
            </span>

            {/* Subtle left accent bar on hover */}
            <span className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-lova-pink to-lova-pink-light transition-all duration-300 group-hover:h-6" />
          </button>
        ))}
      </div>
    </div>
  );
}
