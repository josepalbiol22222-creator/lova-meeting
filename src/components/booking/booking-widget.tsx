"use client";

import { useState, useCallback } from "react";
import { DurationSelector } from "./duration-selector";
import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";
import { BookingForm } from "./booking-form";
import { Confirmation } from "./confirmation";
import { Clock, Video, Globe } from "lucide-react";
import { FactorialLogo } from "@/components/ui/factorial-logo";

type Step = "select" | "form" | "confirmed";

interface OrganizerInfo {
  name: string;
  avatar: string | null;
  title: string;
  company?: string;
}

interface BookingWidgetProps {
  organizer: OrganizerInfo;
  meetingTitle: string;
  meetingDescription: string;
  durations: number[];
  defaultDuration: number;
}

export function BookingWidget({
  organizer,
  meetingTitle,
  meetingDescription,
  durations,
  defaultDuration,
}: BookingWidgetProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedDetails, setBookedDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setStep("form");
  }, []);

  const handleFormSubmit = useCallback((data: { name: string; email: string }) => {
    setBookedDetails(data);
    setStep("confirmed");
  }, []);

  const handleBackToSelect = useCallback(() => {
    setSelectedTime(null);
    setStep("select");
  }, []);

  const handleReset = useCallback(() => {
    setStep("select");
    setSelectedDate(null);
    setSelectedTime(null);
    setBookedDetails(null);
  }, []);

  if (step === "confirmed" && bookedDetails && selectedDate) {
    return (
      <div className="w-full max-w-[480px] animate-scale-in">
        <WidgetShell>
          <div className="p-10 sm:p-12">
            <Confirmation
              name={bookedDetails.name}
              email={bookedDetails.email}
              date={selectedDate}
              time={selectedTime!}
              duration={selectedDuration}
              organizerName={organizer.name}
              onBookAnother={handleReset}
            />
          </div>
        </WidgetShell>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[880px] animate-fade-up">
      <WidgetShell>
        <div className="flex flex-col lg:flex-row">
          {/* ═══ Left panel ═══ */}
          <div className="relative overflow-hidden border-b border-navy-5 lg:w-[290px] lg:shrink-0 lg:border-b-0 lg:border-r">
            {/* Gradient bg — subtle radical warmth */}
            <div className="absolute inset-0 bg-gradient-to-b from-radical-50/60 via-white/60 to-white/0" />
            {/* Frobel decorative circle */}
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full border border-radical/[0.06]" />
            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full border border-viridian/[0.05]" />

            <div className="relative p-8 lg:p-9">
              {/* Avatar + Factorial badge */}
              <div className="mb-5 inline-flex">
                <div className="relative">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-radical to-radical-light shadow-lg shadow-radical/15 ring-[3px] ring-white">
                    {organizer.avatar ? (
                      <img src={organizer.avatar} alt={organizer.name} className="h-full w-full rounded-2xl object-cover" />
                    ) : (
                      <span className="font-heading text-[17px] font-bold text-white tracking-wide">
                        {organizer.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-white shadow-sm">
                    <FactorialLogo className="h-2.5 w-2.5" color="#FF355E" />
                  </div>
                </div>
              </div>

              {/* Name + company */}
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-medium text-navy-60">{organizer.name}</p>
                {organizer.company && (
                  <>
                    <span className="text-navy-20">&middot;</span>
                    <p className="text-[13px] text-navy-40">{organizer.company}</p>
                  </>
                )}
              </div>

              <h1 className="mt-1 font-heading text-[22px] font-extrabold leading-[1.2] tracking-[-0.01em] text-navy">
                {meetingTitle}
              </h1>

              {meetingDescription && (
                <p className="mt-3 text-[13px] leading-[1.65] text-navy-40">
                  {meetingDescription}
                </p>
              )}

              {/* Divider */}
              <div className="my-5 h-px bg-gradient-to-r from-navy-10 via-navy-5 to-transparent" />

              {/* Meta chips */}
              <div className="flex flex-wrap gap-1.5">
                <MetaChip icon={Clock} text={`${selectedDuration}m`} />
                <MetaChip icon={Video} text="Google Meet" />
                <MetaChip icon={Globe} text={timezone.split("/").pop()?.replace(/_/g, " ") || timezone} />
              </div>

              {/* Duration tabs */}
              {durations.length > 1 && step === "select" && (
                <div className="mt-5">
                  <DurationSelector durations={durations} selected={selectedDuration} onChange={setSelectedDuration} />
                </div>
              )}

              {/* Selected slot summary */}
              {step === "form" && selectedDate && selectedTime && (
                <div className="mt-5 animate-fade-up">
                  <div className="rounded-xl border border-radical/10 bg-radical-50 p-3.5">
                    <p className="text-[13px] font-semibold text-navy">
                      {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                    </p>
                    <p className="mt-0.5 text-[12px] font-semibold text-radical">
                      {formatTime(selectedTime)} – {formatEndTime(selectedTime, selectedDuration)}
                    </p>
                  </div>
                </div>
              )}

              {/* Factorial watermark at bottom of panel */}
              <div className="mt-6 flex items-center gap-1.5 opacity-[0.15]">
                <FactorialLogo className="h-3 w-3" color="#1A1A31" />
                <span className="text-[9px] font-semibold tracking-widest text-navy uppercase">Factorial</span>
              </div>
            </div>
          </div>

          {/* ═══ Right panel ═══ */}
          <div className="flex-1 p-8 lg:p-9">
            {step === "select" && (
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-0">
                <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedDate ? "sm:w-[54%] sm:pr-7 sm:border-r sm:border-navy-5/60" : "w-full"}`}>
                  <DateSelector selected={selectedDate} onSelect={setSelectedDate} />
                </div>
                {selectedDate && (
                  <div className="animate-slide-right sm:w-[46%] sm:pl-7">
                    <TimeSelector date={selectedDate} duration={selectedDuration} onSelect={handleTimeSelect} />
                  </div>
                )}
              </div>
            )}

            {step === "form" && (
              <div className="animate-slide-right">
                <BookingForm onSubmit={handleFormSubmit} onBack={handleBackToSelect} />
              </div>
            )}
          </div>
        </div>
      </WidgetShell>
    </div>
  );
}

function WidgetShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Factorial radical accent line */}
      <div className="absolute left-10 right-10 top-0 z-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-radical to-transparent opacity-30" />
      <div className="overflow-hidden rounded-[24px] border border-navy-5 bg-white/[0.97] shadow-[0_1px_2px_rgba(26,26,49,0.04),0_4px_16px_rgba(26,26,49,0.04),0_12px_48px_rgba(255,53,94,0.03)] backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

function MetaChip({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-navy-2 px-2.5 py-1.5">
      <Icon className="h-3 w-3 text-navy-40" />
      <span className="text-[11px] font-medium text-navy-60">{text}</span>
    </div>
  );
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function formatEndTime(time: string, duration: number): string {
  const [h, m] = time.split(":").map(Number);
  const t = h * 60 + m + duration;
  const eH = Math.floor(t / 60) % 24;
  const eM = t % 60;
  return `${eH % 12 || 12}:${eM.toString().padStart(2, "0")} ${eH >= 12 ? "PM" : "AM"}`;
}
