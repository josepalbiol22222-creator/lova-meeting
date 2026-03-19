"use client";

import { useState } from "react";
import { DurationSelector } from "./duration-selector";
import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";
import { BookingForm } from "./booking-form";
import { Confirmation } from "./confirmation";
import { User, Clock } from "lucide-react";

type Step = "date" | "form" | "confirmed";

interface OrganizerInfo {
  name: string;
  avatar: string | null;
  title: string;
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
  const [step, setStep] = useState<Step>("date");
  const [selectedDuration, setSelectedDuration] = useState(defaultDuration);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedDetails, setBookedDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleFormSubmit = (data: { name: string; email: string }) => {
    setBookedDetails(data);
    setStep("confirmed");
  };

  const handleBack = () => {
    if (step === "form") {
      setSelectedTime(null);
      setStep("date");
    }
  };

  const handleReset = () => {
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setBookedDetails(null);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-lova-border bg-lova-card shadow-xl shadow-black/5 backdrop-blur-md">
        {/* Header */}
        <div className="border-b border-lova-border bg-white/50 px-8 py-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lova-pink to-lova-pink-light shadow-md shadow-lova-pink/20">
              {organizer.avatar ? (
                <img
                  src={organizer.avatar}
                  alt={organizer.name}
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : (
                <User className="h-7 w-7 text-white" />
              )}
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-lova-text">
                {meetingTitle}
              </h2>
              <p className="text-sm text-lova-text-muted">
                with {organizer.name} &middot; {organizer.title}
              </p>
            </div>
          </div>
          {meetingDescription && (
            <p className="mt-3 text-sm leading-relaxed text-lova-text-muted">
              {meetingDescription}
            </p>
          )}

          {/* Duration selector */}
          {durations.length > 1 && step !== "confirmed" && (
            <div className="mt-4">
              <DurationSelector
                durations={durations}
                selected={selectedDuration}
                onChange={setSelectedDuration}
              />
            </div>
          )}

          {/* Selected info summary */}
          {selectedTime && step === "form" && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-lova-pink/10 px-3 py-2 text-sm font-medium text-lova-pink">
              <Clock className="h-4 w-4" />
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {selectedTime} &middot; {selectedDuration} min
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {step === "date" && (
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex-1">
                <DateSelector
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              </div>
              {selectedDate && (
                <div className="w-full sm:w-48">
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
            <BookingForm onSubmit={handleFormSubmit} onBack={handleBack} />
          )}

          {step === "confirmed" && bookedDetails && selectedDate && (
            <Confirmation
              name={bookedDetails.name}
              email={bookedDetails.email}
              date={selectedDate}
              time={selectedTime!}
              duration={selectedDuration}
              organizerName={organizer.name}
              onBookAnother={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
