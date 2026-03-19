"use client";

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

export function TimeSelector({ date, duration, onSelect }: TimeSelectorProps) {
  const slots = generateSlots(duration);

  // Simulate some slots as unavailable (for demo)
  const unavailable = new Set([2, 5, 7]);

  return (
    <div>
      <h3 className="mb-3 font-heading text-sm font-bold text-lova-text">
        {date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </h3>
      <div className="flex max-h-[320px] flex-col gap-2 overflow-y-auto pr-1">
        {slots.map((slot, i) => {
          const disabled = unavailable.has(i);
          return (
            <button
              key={slot}
              disabled={disabled}
              onClick={() => onSelect(slot)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                disabled
                  ? "cursor-not-allowed bg-white/30 text-lova-text-muted/40 line-through"
                  : "border border-lova-border bg-white/60 text-lova-text hover:border-lova-pink/30 hover:bg-lova-pink/5 hover:text-lova-pink"
              }`}
            >
              {formatTime(slot)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
