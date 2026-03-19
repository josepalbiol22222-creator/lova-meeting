"use client";

import { Calendar, Clock, User, Video, RotateCcw } from "lucide-react";
import { useDictionary } from "@/i18n/dictionary-context";
import { useLocale } from "@/i18n/locale-context";

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
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-5 animate-check-bg">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="25" stroke="#FF355E" strokeWidth="2" fill="none" className="animate-check-circle" />
          <circle cx="28" cy="28" r="22" fill="#FFF0F3" />
          <path d="M18 28l7 7 13-13" stroke="#FF355E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-check-draw" />
        </svg>
      </div>

      <p className="text-[12px] font-semibold tracking-widest text-radical uppercase">{dict.confirmation.confirmed}</p>
      <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.01em] text-navy">{dict.confirmation.meetingScheduled}</h3>
      <p className="mt-2.5 max-w-[260px] text-[13px] leading-relaxed text-navy-40">
        {dict.confirmation.calendarInviteSent} <span className="font-medium text-navy">{email}</span>
      </p>

      <div className="mt-8 w-full animate-fade-up rounded-2xl border border-navy-5 bg-navy-2/50 p-5" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <div className="space-y-3">
          <DetailRow icon={Calendar}>{date.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</DetailRow>
          <DetailRow icon={Clock}>{formatTime(time)} &middot; {duration} {dict.confirmation.minutes}</DetailRow>
          <DetailRow icon={Video}>{dict.booking.googleMeet} &middot; <span className="text-viridian-dark">{dict.confirmation.linkInInvite}</span></DetailRow>
          <DetailRow icon={User}>{name} {dict.confirmation.with} {organizerName}</DetailRow>
        </div>
      </div>

      <button onClick={onBookAnother} className="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-10 bg-white px-5 py-2.5 text-[12.5px] font-semibold text-navy-60 shadow-sm transition-all hover:border-radical/30 hover:text-radical hover:shadow-md hover:shadow-radical/5">
        <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-90" /> {dict.confirmation.scheduleAnother}
      </button>

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
