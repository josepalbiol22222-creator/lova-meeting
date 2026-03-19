"use client";

import { Calendar, Clock, User, Video, RotateCcw } from "lucide-react";
import { FactorialLogo } from "@/components/ui/factorial-logo";

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
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export function Confirmation({ name, email, date, time, duration, organizerName, onBookAnother }: ConfirmationProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-7 animate-check-bg">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="#FF355E" strokeWidth="2.5" fill="none" className="animate-check-circle" />
          <circle cx="40" cy="40" r="32" fill="#FFF0F3" />
          <path d="M26 40l10 10 18-18" stroke="#FF355E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-check-draw" />
        </svg>
      </div>

      <h3 className="font-heading text-[26px] font-extrabold tracking-[-0.02em] text-navy">You&apos;re booked!</h3>
      <p className="mt-2 max-w-[280px] text-[13.5px] leading-relaxed text-navy-40">
        A calendar invitation has been sent to <span className="font-semibold text-navy">{email}</span>
      </p>

      <div className="mt-8 w-full animate-fade-up rounded-2xl border border-navy-5 bg-navy-2/50 p-5" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <div className="space-y-3">
          <DetailRow icon={Calendar}>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</DetailRow>
          <DetailRow icon={Clock}>{formatTime(time)} &middot; {duration} minutes</DetailRow>
          <DetailRow icon={Video}>Google Meet &middot; <span className="text-viridian-dark">link in your invite</span></DetailRow>
          <DetailRow icon={User}>{name} with {organizerName}</DetailRow>
        </div>
      </div>

      <button onClick={onBookAnother} className="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-10 bg-white px-5 py-2.5 text-[12.5px] font-semibold text-navy-60 shadow-sm transition-all hover:border-radical/30 hover:text-radical hover:shadow-md hover:shadow-radical/5">
        <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-90" /> Schedule another
      </button>

      <div className="mt-8 flex items-center gap-1.5 opacity-20">
        <FactorialLogo className="h-2.5 w-2.5" color="#1A1A31" />
        <span className="text-[9px] font-semibold tracking-widest text-navy uppercase">Scheduled with Factorial</span>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, children }: { icon: typeof Calendar; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-sm">
        <Icon className="h-[14px] w-[14px] text-radical" />
      </div>
      <span className="text-left text-[13px] text-navy-80">{children}</span>
    </div>
  );
}
