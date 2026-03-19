"use client";

import { useMemo } from "react";
import { Sun, Sunset } from "lucide-react";

interface TimeSelectorProps {
  date: Date;
  duration: number;
  onSelect: (time: string) => void;
}

function generateSlots(duration: number): string[] {
  const slots: string[] = [];
  for (let h = 9; h < 17; h++) {
    for (let m = 0; m < 60; m += duration) {
      if (h * 60 + m + duration <= 17 * 60) {
        slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
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

export function TimeSelector({ date, duration, onSelect }: TimeSelectorProps) {
  const slots = useMemo(() => generateSlots(duration), [duration]);

  const { morning, afternoon } = useMemo(() => {
    const seed = date.getDate();
    const unavailable = new Set(
      slots.map((_, i) => i).filter((i) => (i + seed) % 7 === 0)
    );
    const available = slots.filter((_, i) => !unavailable.has(i));

    return {
      morning: available.filter((s) => {
        const h = parseInt(s.split(":")[0]);
        return h < 12;
      }),
      afternoon: available.filter((s) => {
        const h = parseInt(s.split(":")[0]);
        return h >= 12;
      }),
    };
  }, [slots, date]);

  return (
    <div>
      <p className="mb-4 font-heading text-[15px] font-bold text-lova-text">
        {date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="slots-scroll flex max-h-[360px] flex-col gap-4 overflow-y-auto pr-1">
        {/* Morning group */}
        {morning.length > 0 && (
          <SlotGroup
            icon={<Sun className="h-3 w-3" />}
            label="Morning"
            slots={morning}
            onSelect={onSelect}
            startIndex={0}
          />
        )}

        {/* Afternoon group */}
        {afternoon.length > 0 && (
          <SlotGroup
            icon={<Sunset className="h-3 w-3" />}
            label="Afternoon"
            slots={afternoon}
            onSelect={onSelect}
            startIndex={morning.length}
          />
        )}
      </div>
    </div>
  );
}

function SlotGroup({
  icon,
  label,
  slots,
  onSelect,
  startIndex,
}: {
  icon: React.ReactNode;
  label: string;
  slots: string[];
  onSelect: (time: string) => void;
  startIndex: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-lova-text-muted/50">
        {icon}
        <span className="text-[10.5px] font-semibold tracking-widest uppercase">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {slots.map((slot, i) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className="animate-slot-enter group relative flex items-center justify-between rounded-[14px] border border-transparent bg-lova-pink-50/40 px-4 py-[11px] transition-all duration-200 hover:border-lova-pink/30 hover:bg-lova-pink-50 hover:shadow-[0_2px_8px_rgba(209,77,114,0.08)]"
            style={{ animationDelay: `${(startIndex + i) * 35}ms` }}
          >
            <span className="text-[13px] font-semibold text-lova-text transition-colors group-hover:text-lova-pink">
              {formatTime(slot)}
            </span>
            <span className="flex items-center gap-0.5 text-[11px] font-semibold text-lova-pink opacity-0 transition-all duration-200 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0">
              Book
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:translate-x-px">
                <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
