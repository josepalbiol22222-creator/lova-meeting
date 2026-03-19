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

  // Simulate a few slots as unavailable based on date (for demo purposes)
  const seed = date.getDate();
  const unavailable = new Set(
    slots
      .map((_, i) => i)
      .filter((i) => (i + seed) % 7 === 0)
  );

  const availableSlots = slots.filter((_, i) => !unavailable.has(i));

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {availableSlots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className="rounded-xl border border-lova-border bg-white/60 px-3 py-3 text-sm font-medium text-lova-pink transition-all hover:border-lova-pink hover:bg-lova-pink hover:text-white hover:shadow-md hover:shadow-lova-pink/20"
        >
          {formatTime(slot)}
        </button>
      ))}
    </div>
  );
}
