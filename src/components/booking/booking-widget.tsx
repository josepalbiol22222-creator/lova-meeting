"use client";

import { useState, useCallback } from "react";
import { DurationSelector } from "./duration-selector";
import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";
import { BookingForm } from "./booking-form";
import { Confirmation } from "./confirmation";
import { Clock, Video, Globe, MapPin } from "lucide-react";

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

  // Confirmation view
  if (step === "confirmed" && bookedDetails && selectedDate) {
    return (
      <div className="w-full max-w-lg animate-scale-in">
        <div className="overflow-hidden rounded-[28px] border border-lova-border/60 bg-white/95 shadow-2xl shadow-lova-pink/[0.04] backdrop-blur-xl">
          <div className="p-10">
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
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[860px] animate-fade-up">
      <div className="overflow-hidden rounded-[28px] border border-lova-border/60 bg-white/95 shadow-2xl shadow-lova-pink/[0.04] backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row">
          {/* ═══ Left panel - Meeting info ═══ */}
          <div className="relative border-b border-lova-border/40 bg-gradient-to-b from-white/80 to-lova-cream/30 p-8 lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r lg:p-9">
            {/* Decorative corner accent */}
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-bl from-lova-pink-50 to-transparent opacity-60 lg:rounded-bl-full" />

            {/* Avatar */}
            <div className="relative mb-5">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-lova-pink to-lova-pink-light shadow-lg shadow-lova-pink/15">
                {organizer.avatar ? (
                  <img
                    src={organizer.avatar}
                    alt={organizer.name}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <span className="font-heading text-[22px] font-bold text-white">
                    {organizer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
            </div>

            <p className="text-[13px] font-medium tracking-wide text-lova-text-muted uppercase">
              {organizer.name}
            </p>
            <h1 className="mt-1 font-heading text-[22px] font-bold leading-tight text-lova-text">
              {meetingTitle}
            </h1>

            {meetingDescription && (
              <p className="mt-3 text-[13.5px] leading-relaxed text-lova-text-muted">
                {meetingDescription}
              </p>
            )}

            {/* Meeting meta */}
            <div className="mt-6 space-y-2.5">
              <MetaItem icon={Clock} text={`${selectedDuration} min`} />
              <MetaItem icon={Video} text="Google Meet" />
              <MetaItem icon={Globe} text={timezone.replace(/_/g, " ")} />
            </div>

            {/* Duration pills */}
            {durations.length > 1 && step === "select" && (
              <div className="mt-6 pt-5 border-t border-lova-border/40">
                <p className="mb-2.5 text-[11px] font-semibold tracking-widest text-lova-text-muted/70 uppercase">
                  Duration
                </p>
                <DurationSelector
                  durations={durations}
                  selected={selectedDuration}
                  onChange={setSelectedDuration}
                />
              </div>
            )}

            {/* Selected slot summary (form step) */}
            {step === "form" && selectedDate && selectedTime && (
              <div className="mt-6 animate-fade-up">
                <div className="rounded-2xl bg-lova-pink-50 p-4">
                  <p className="text-sm font-semibold text-lova-text">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-0.5 text-[13px] text-lova-pink">
                    {formatTime(selectedTime)} – {formatEndTime(selectedTime, selectedDuration)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ═══ Right panel - Interactive area ═══ */}
          <div className="flex-1 p-8 lg:p-9">
            {step === "select" && (
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-0">
                {/* Calendar */}
                <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedDate ? "sm:w-[55%] sm:pr-6 sm:border-r sm:border-lova-border/30" : "w-full"}`}>
                  <DateSelector
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>

                {/* Time slots - slides in when date selected */}
                {selectedDate && (
                  <div className="animate-slide-right sm:w-[45%] sm:pl-6">
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
      </div>
    </div>
  );
}

function MetaItem({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lova-pink-50">
        <Icon className="h-3.5 w-3.5 text-lova-pink" />
      </div>
      <span className="text-[13px] text-lova-text-muted">{text}</span>
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
