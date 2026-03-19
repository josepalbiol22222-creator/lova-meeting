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
    <div className="flex gap-1.5">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`rounded-xl px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-250 ${
            selected === d
              ? "bg-gradient-to-r from-lova-pink to-lova-pink-light text-white shadow-md shadow-lova-pink/20"
              : "bg-lova-pink-50/60 text-lova-text-muted hover:bg-lova-pink-50 hover:text-lova-pink"
          }`}
        >
          {d} min
        </button>
      ))}
    </div>
  );
}
