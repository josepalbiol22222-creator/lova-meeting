"use client";

interface DurationSelectorProps {
  durations: number[];
  selected: number;
  onChange: (d: number) => void;
}

export function DurationSelector({ durations, selected, onChange }: DurationSelectorProps) {
  return (
    <div className="inline-flex rounded-xl bg-navy-2 p-1">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`relative rounded-[10px] px-4 py-[7px] text-[12px] font-semibold tracking-wide transition-all duration-200 ${
            selected === d
              ? "bg-white text-radical shadow-sm"
              : "text-navy-40 hover:text-navy-60"
          }`}
        >
          {d}m
        </button>
      ))}
    </div>
  );
}
