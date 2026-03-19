"use client";

import { Calendar, Clock, User, Video, RotateCcw } from "lucide-react";

interface ConfirmationProps {
  name: string;
  email: string;
  date: Date;
  time: string;
  duration: number;
  organizerName: string;
  onBookAnother: () => void;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function Confirmation({
  name,
  email,
  date,
  time,
  duration,
  organizerName,
  onBookAnother,
}: ConfirmationProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated checkmark */}
      <div className="mb-6 animate-check-bg">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle
            cx="36"
            cy="36"
            r="32"
            stroke="#d14d72"
            strokeWidth="3"
            fill="none"
            className="animate-check-circle"
          />
          <circle cx="36" cy="36" r="28" fill="#fef1f5" />
          <path
            d="M24 36l8 8 16-16"
            stroke="#d14d72"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="animate-check-draw"
          />
        </svg>
      </div>

      <h3 className="font-heading text-[24px] font-bold text-lova-text">
        You&apos;re booked!
      </h3>
      <p className="mt-2 text-[14px] text-lova-text-muted">
        A calendar invitation has been sent to
      </p>
      <p className="mt-0.5 text-[14px] font-semibold text-lova-text">
        {email}
      </p>

      {/* Details card */}
      <div
        className="mt-7 w-full animate-fade-up rounded-2xl border border-lova-border/40 bg-gradient-to-b from-white to-lova-cream/30 p-5"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <div className="space-y-3.5">
          <DetailRow icon={Calendar}>
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </DetailRow>
          <DetailRow icon={Clock}>
            {formatTime(time)} &middot; {duration} minutes
          </DetailRow>
          <DetailRow icon={Video}>
            Google Meet &middot; link in your invite
          </DetailRow>
          <DetailRow icon={User}>
            {name} with {organizerName}
          </DetailRow>
        </div>
      </div>

      <button
        onClick={onBookAnother}
        className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-lova-text-muted transition-colors hover:text-lova-pink"
      >
        <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-45" />
        Schedule another meeting
      </button>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  children,
}: {
  icon: typeof Calendar;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lova-pink-50">
        <Icon className="h-4 w-4 text-lova-pink" />
      </div>
      <span className="text-left text-[13.5px] text-lova-text">{children}</span>
    </div>
  );
}
