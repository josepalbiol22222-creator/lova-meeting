"use client";

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
    <div className="inline-flex rounded-xl bg-lova-pink-50/50 p-1">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`relative rounded-[10px] px-4 py-[7px] text-[12px] font-semibold tracking-wide transition-all duration-250 ${
            selected === d
              ? "bg-white text-lova-pink shadow-sm"
              : "text-lova-text-muted/60 hover:text-lova-text-muted"
          }`}
        >
          {d}m
        </button>
      ))}
    </div>
  );
}
