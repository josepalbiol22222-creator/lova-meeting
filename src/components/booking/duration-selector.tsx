"use client";

import { Clock } from "lucide-react";

interface DurationSelectorProps {
  durations: number[];
  selected: number;
  onChange: (d: number) => void;
}

export function DurationSelector({
  durations,
  selected,
  onChange,
}: DurationSelectorProps) {
  return (
    <div className="flex gap-2">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${
            selected === d
              ? "bg-lova-pink text-white shadow-md shadow-lova-pink/20"
              : "bg-white/60 text-lova-text-muted hover:bg-white/80 hover:text-lova-text"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          {d} min
        </button>
      ))}
    </div>
  );
}
