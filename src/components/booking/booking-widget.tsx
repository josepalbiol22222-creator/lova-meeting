"use client";

import { useState } from "react";
import { DurationSelector } from "./duration-selector";
import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";
import { BookingForm } from "./booking-form";
import { Confirmation } from "./confirmation";
import { User, Clock, Video, Globe } from "lucide-react";

type Step = "date" | "time" | "form" | "confirmed";

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

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleFormSubmit = (data: { name: string; email: string }) => {
    setBookedDetails(data);
    setStep("confirmed");
  };

  const handleBackToDate = () => {
    setSelectedTime(null);
    setStep("date");
    setSelectedDate(null);
  };

  const handleBackToTime = () => {
    setSelectedTime(null);
    setStep("time");
  };

  const handleReset = () => {
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setBookedDetails(null);
  };

  if (step === "confirmed" && bookedDetails && selectedDate) {
    return (
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-lova-border bg-white/90 shadow-xl shadow-black/5 backdrop-blur-md">
          <div className="p-8">
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
    <div className="w-full max-w-3xl">
      <div className="overflow-hidden rounded-3xl border border-lova-border bg-white/90 shadow-xl shadow-black/5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row">
          {/* Left panel - Meeting info */}
          <div className="border-b border-lova-border bg-white/50 p-8 md:w-72 md:shrink-0 md:border-b-0 md:border-r">
            {/* Avatar */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lova-pink to-lova-pink-light shadow-lg shadow-lova-pink/20">
              {organizer.avatar ? (
                <img
                  src={organizer.avatar}
                  alt={organizer.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="font-heading text-xl font-bold text-white">
                  {organizer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-lova-text-muted">
              {organizer.name}
            </p>
            <h2 className="mt-1 font-heading text-xl font-bold text-lova-text">
              {meetingTitle}
            </h2>

            {meetingDescription && (
              <p className="mt-3 text-sm leading-relaxed text-lova-text-muted">
                {meetingDescription}
              </p>
            )}

            {/* Meeting details */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-lova-text-muted">
                <Clock className="h-4 w-4 text-lova-pink" />
                <span>{selectedDuration} min</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-lova-text-muted">
                <Video className="h-4 w-4 text-lova-pink" />
                <span>Google Meet</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-lova-text-muted">
                <Globe className="h-4 w-4 text-lova-pink" />
                <span>{timezone}</span>
              </div>
            </div>

            {/* Duration selector */}
            {durations.length > 1 && step !== "form" && (
              <div className="mt-5">
                <DurationSelector
                  durations={durations}
                  selected={selectedDuration}
                  onChange={(d) => {
                    setSelectedDuration(d);
                    if (step === "time") {
                      setStep("time"); // re-render time slots
                    }
                  }}
                />
              </div>
            )}

            {/* Selected date/time summary when in form step */}
            {step === "form" && selectedDate && selectedTime && (
              <div className="mt-5 rounded-xl bg-lova-pink/5 p-3">
                <p className="text-sm font-semibold text-lova-text">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-lova-text-muted">
                  {formatTime(selectedTime)} - {formatEndTime(selectedTime, selectedDuration)}
                </p>
              </div>
            )}
          </div>

          {/* Right panel - Calendar / Times / Form */}
          <div className="flex-1 p-8">
            {step === "date" && (
              <div>
                <h3 className="mb-5 font-heading text-base font-bold text-lova-text">
                  Select a Date
                </h3>
                <DateSelector
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                />
              </div>
            )}

            {step === "time" && selectedDate && (
              <div>
                <button
                  onClick={handleBackToDate}
                  className="mb-4 text-sm font-medium text-lova-pink hover:text-lova-pink-dark"
                >
                  &larr; Back to calendar
                </button>
                <h3 className="mb-1 font-heading text-base font-bold text-lova-text">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <p className="mb-5 text-sm text-lova-text-muted">
                  Select a time
                </p>
                <TimeSelector
                  date={selectedDate}
                  duration={selectedDuration}
                  onSelect={handleTimeSelect}
                />
              </div>
            )}

            {step === "form" && (
              <div>
                <button
                  onClick={handleBackToTime}
                  className="mb-4 text-sm font-medium text-lova-pink hover:text-lova-pink-dark"
                >
                  &larr; Back to times
                </button>
                <h3 className="mb-5 font-heading text-base font-bold text-lova-text">
                  Enter Details
                </h3>
                <BookingForm
                  onSubmit={handleFormSubmit}
                  onBack={handleBackToTime}
                />
              </div>
            )}
          </div>
        </div>
      </div>
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
