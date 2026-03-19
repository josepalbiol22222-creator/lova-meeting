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

  // Confirmation view — separate card
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
          <div className="relative overflow-hidden border-b border-lova-border/30 lg:w-[290px] lg:shrink-0 lg:border-b-0 lg:border-r">
            {/* Gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-lova-pink-50/80 via-white/40 to-white/0" />
            {/* Decorative arc */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-lova-pink/[0.07] to-transparent" />

            <div className="relative p-8 lg:p-9">
              {/* Avatar */}
              <div className="mb-6 inline-flex">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-lova-pink to-lova-pink-light shadow-lg shadow-lova-pink/20 ring-[3px] ring-white">
                    {organizer.avatar ? (
                      <img
                        src={organizer.avatar}
                        alt={organizer.name}
                        className="h-full w-full rounded-[18px] object-cover"
                      />
                    ) : (
                      <span className="font-heading text-lg font-bold text-white tracking-wide">
                        {organizer.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  {/* Factorial badge */}
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-white bg-white shadow-sm">
                    <FactorialLogo className="h-3 w-3" color="#FF355E" />
                  </div>
                </div>
              </div>

              {/* Name & company */}
              <div className="mb-0.5 flex items-center gap-1.5">
                <p className="text-[13px] font-medium text-lova-text-muted">
                  {organizer.name}
                </p>
                {organizer.company && (
                  <>
                    <span className="text-lova-text-muted/30">&middot;</span>
                    <p className="text-[13px] font-medium text-lova-text-muted/60">{organizer.company}</p>
                  </>
                )}
              </div>
              <h1 className="mt-0.5 font-heading text-[23px] font-extrabold leading-[1.2] tracking-[-0.01em] text-lova-text">
                {meetingTitle}
              </h1>

              {meetingDescription && (
                <p className="mt-3 text-[13px] leading-[1.6] text-lova-text-muted/80">
                  {meetingDescription}
                </p>
              )}

              {/* Divider */}
              <div className="my-5 h-px bg-gradient-to-r from-lova-border/60 via-lova-border/30 to-transparent" />

              {/* Meta — compact horizontal chips */}
              <div className="flex flex-wrap gap-2">
                <MetaChip icon={Clock} text={`${selectedDuration}m`} />
                <MetaChip icon={Video} text="Google Meet" />
                <MetaChip icon={Globe} text={timezone.split("/").pop()?.replace(/_/g, " ") || timezone} />
              </div>

              {/* Duration selector */}
              {durations.length > 1 && step === "select" && (
                <div className="mt-5">
                  <DurationSelector
                    durations={durations}
                    selected={selectedDuration}
                    onChange={setSelectedDuration}
                  />
                </div>
              )}

              {/* Selected slot summary (form step) */}
              {step === "form" && selectedDate && selectedTime && (
                <div className="mt-5 animate-fade-up">
                  <div className="rounded-2xl border border-lova-pink/15 bg-gradient-to-br from-lova-pink-50 to-white p-4">
                    <p className="text-[13.5px] font-semibold text-lova-text">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="mt-0.5 text-[12.5px] font-medium text-lova-pink">
                      {formatTime(selectedTime)} – {formatEndTime(selectedTime, selectedDuration)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ═══ Right panel ═══ */}
          <div className="flex-1 p-8 lg:p-9">
            {step === "select" && (
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-0">
                {/* Calendar */}
                <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedDate ? "sm:w-[54%] sm:pr-7 sm:border-r sm:border-lova-border/25" : "w-full"}`}>
                  <DateSelector
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div className="animate-slide-right sm:w-[46%] sm:pl-7">
                    <TimeSelector
                      date={selectedDate}
                      duration={selectedDuration}
                      onSelect={handleTimeSelect}
                    />
                  </div>
                )}
              </div>
            )}

            {step === "form" && (
              <div className="animate-slide-right">
                <BookingForm
                  onSubmit={handleFormSubmit}
                  onBack={handleBackToSelect}
                />
              </div>
            )}
          </div>
        </div>
      </WidgetShell>
    </div>
  );
}

/* ═══ Sub-components ═══ */

function WidgetShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Pink accent line at top */}
      <div className="absolute left-8 right-8 top-0 z-10 h-[2.5px] rounded-full bg-gradient-to-r from-transparent via-lova-pink to-transparent opacity-40" />
      {/* Card */}
      <div className="overflow-hidden rounded-[26px] border border-lova-border/40 bg-white/[0.97] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(209,77,114,0.04)] backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

function MetaChip({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg bg-lova-pink-50/70 px-2.5 py-1.5">
      <Icon className="h-3 w-3 text-lova-pink/70" />
      <span className="text-[11.5px] font-medium text-lova-text-muted">{text}</span>
    </div>
  );
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatEndTime(time: string, duration: number): string {
  const [h, m] = time.split(":").map(Number);
  const totalMin = h * 60 + m + duration;
  const endH = Math.floor(totalMin / 60) % 24;
  const endM = totalMin % 60;
  const ampm = endH >= 12 ? "PM" : "AM";
  const hour12 = endH % 12 || 12;
  return `${hour12}:${endM.toString().padStart(2, "0")} ${ampm}`;
}
