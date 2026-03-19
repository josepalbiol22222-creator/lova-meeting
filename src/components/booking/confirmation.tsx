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
      <div className="mb-7 animate-check-bg">
        <div className="relative">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#d14d72" strokeWidth="2.5" fill="none" className="animate-check-circle" />
            <circle cx="40" cy="40" r="32" fill="#fef1f5" />
            <path d="M26 40l10 10 18-18" stroke="#d14d72" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-check-draw" />
          </svg>
        </div>
      </div>

      <h3 className="font-heading text-[26px] font-extrabold tracking-[-0.02em] text-lova-text">
        You&apos;re booked!
      </h3>
      <p className="mt-2 max-w-[280px] text-[13.5px] leading-relaxed text-lova-text-muted">
        A calendar invitation has been sent to{" "}
        <span className="font-semibold text-lova-text">{email}</span>
      </p>

      {/* Details */}
      <div
        className="mt-8 w-full animate-fade-up rounded-2xl border border-lova-border/30 bg-gradient-to-b from-lova-pink-50/40 to-transparent p-5"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <div className="space-y-3">
          <DetailRow icon={Calendar}>
            {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </DetailRow>
          <DetailRow icon={Clock}>
            {formatTime(time)} &middot; {duration} minutes
          </DetailRow>
          <DetailRow icon={Video}>
            Google Meet &middot; <span className="text-lova-pink">link in your invite</span>
          </DetailRow>
          <DetailRow icon={User}>
            {name} with {organizerName}
          </DetailRow>
        </div>
      </div>

      <button
        onClick={onBookAnother}
        className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-lova-border/40 bg-white px-5 py-2.5 text-[12.5px] font-semibold text-lova-text-muted shadow-sm transition-all hover:border-lova-pink/30 hover:text-lova-pink hover:shadow-md hover:shadow-lova-pink/5"
      >
        <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-90" />
        Schedule another
      </button>
    </div>
  );
}

function DetailRow({ icon: Icon, children }: { icon: typeof Calendar; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-sm">
        <Icon className="h-[14px] w-[14px] text-lova-pink" />
      </div>
      <span className="text-left text-[13px] text-lova-text">{children}</span>
    </div>
  );
}
