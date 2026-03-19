"use client";

import { useState, useCallback } from "react";
import { DurationSelector } from "./duration-selector";
import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";
import { BookingForm } from "./booking-form";
import { Confirmation } from "./confirmation";
import { Clock, Video, Globe } from "lucide-react";
import { FactorialLogo } from "@/components/ui/factorial-logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ProgressBar } from "./progress-bar";
import { useDictionary } from "@/i18n/dictionary-context";
import { useLocale } from "@/i18n/locale-context";

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
  const dict = useDictionary();
  const locale = useLocale();

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
            <div className="mb-8 flex justify-center">
              <ProgressBar currentStep={3} />
            </div>
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
          <div className="relative border-b border-navy-5/40 lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r">
            {/* Subtle warm tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-radical-50/40 to-transparent" />

            <div className="relative p-7 lg:p-8">
              {/* Avatar inside card */}
              <div className="mb-5 flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-radical to-radical-light shadow-md shadow-radical/15">
                    {organizer.avatar ? (
                      <img src={organizer.avatar} alt={organizer.name} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      <span className="text-[15px] font-bold text-white">
                        {organizer.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-white bg-white shadow-sm">
                    <FactorialLogo className="h-2 w-2" color="#FF355E" />
                  </div>
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[12.5px] font-medium text-navy-40">
                    {organizer.name}{organizer.company && <span className="text-navy-20"> · {organizer.company}</span>}
                  </p>
                  <h1 className="text-[18px] font-semibold leading-[1.3] text-navy">
                    {meetingTitle}
                  </h1>
                </div>
              </div>

              {meetingDescription && (
                <p className="text-[12.5px] leading-[1.6] text-navy-40">
                  {meetingDescription}
                </p>
              )}

              {/* Divider */}
              <div className="my-4 h-px bg-navy-5/60" />

              {/* Meta chips */}
              <div className="flex flex-wrap gap-1.5">
                <MetaChip icon={Clock} text={`${selectedDuration}m`} />
                <MetaChip icon={Video} text={dict.booking.googleMeet} />
                <MetaChip icon={Globe} text={timezone.split("/").pop()?.replace(/_/g, " ") || timezone} />
              </div>

              {/* Duration tabs */}
              {durations.length > 1 && step === "select" && (
                <div className="mt-4">
                  <DurationSelector durations={durations} selected={selectedDuration} onChange={setSelectedDuration} />
                </div>
              )}

              {/* Language switcher */}
              <div className="mt-4">
                <LanguageSwitcher />
              </div>

              {/* Selected slot summary (form step) */}
              {step === "form" && selectedDate && selectedTime && (
                <div className="mt-4 animate-fade-up">
                  <div className="rounded-xl bg-radical-50/80 p-3">
                    <p className="text-[12.5px] font-semibold text-navy">
                      {selectedDate.toLocaleDateString(locale, { weekday: "long", month: "short", day: "numeric" })}
                    </p>
                    <p className="mt-0.5 text-[11.5px] font-semibold text-radical">
                      {formatTime(selectedTime)} – {formatEndTime(selectedTime, selectedDuration)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ═══ Right panel ═══ */}
          <div className="flex-1 p-7 lg:p-8">
            {/* Progress */}
            <div className="mb-6">
              <ProgressBar
                currentStep={
                  step === "form" ? 2 : selectedDate ? 1 : 0
                }
              />
            </div>

            {step === "select" && (
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-0">
                <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedDate ? "sm:w-[55%] sm:pr-6 sm:border-r sm:border-navy-5/50" : "w-full"}`}>
                  <DateSelector selected={selectedDate} onSelect={setSelectedDate} />
                </div>
                {selectedDate && (
                  <div className="animate-slide-right sm:w-[45%] sm:pl-6">
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
    <div className="flex flex-col items-center gap-4">
      <div className="w-full overflow-hidden rounded-[20px] border border-navy-10/50 bg-white shadow-[0_1px_3px_rgba(26,26,49,0.05),0_8px_24px_rgba(26,26,49,0.04)]">
        {children}
      </div>
      <div className="flex items-center gap-3">
        <img
          src="https://4960096.fs1.hubspotusercontent-eu1.net/hubfs/4960096/LOGO-RESOLVE-A-IN.gif"
          alt="Factorial"
          className="h-6 opacity-50"
        />
        <span className="text-navy-10">|</span>
        <p className="text-[11.5px] text-navy-20">
          Powered by <span className="font-medium text-navy-40">Lova</span>
        </p>
      </div>
    </div>
  );
}

function MetaChip({ icon: Icon, text }: { icon: typeof Clock; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg bg-navy-2 px-2.5 py-1.5">
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
