"use client";

interface ProgressBarProps {
  /** 0 = date, 1 = time, 2 = details, 3 = confirmed */
  currentStep: number;
}

const STEPS = ["Date", "Time", "Details", "Confirmed"];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-1">
      {STEPS.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={label} className="flex items-center gap-1">
            {/* Segment */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
                  i === 0 ? "w-8" : "w-8"
                } ${
                  isCompleted
                    ? "bg-radical"
                    : isActive
                      ? "bg-radical/40"
                      : "bg-navy-5"
                }`}
              />
              <span
                className={`text-[9.5px] tracking-wide transition-colors duration-300 ${
                  isCompleted
                    ? "font-medium text-radical"
                    : isActive
                      ? "font-medium text-navy-60"
                      : "text-navy-20"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Gap between segments */}
            {i < STEPS.length - 1 && <div className="mb-4 w-1" />}
          </div>
        );
      })}
    </div>
  );
}
