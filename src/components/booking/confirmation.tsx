"use client";

import { CheckCircle, Calendar, Clock, User, RotateCcw } from "lucide-react";

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
      {/* Success icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>

      <h3 className="font-heading text-2xl font-bold text-lova-text">
        Meeting confirmed!
      </h3>
      <p className="mt-2 text-sm text-lova-text-muted">
        A calendar invite has been sent to{" "}
        <span className="font-medium text-lova-text">{email}</span>
      </p>

      {/* Details card */}
      <div className="mt-6 w-full rounded-2xl border border-lova-border bg-white/60 p-5 text-left backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-lova-pink" />
            <span className="text-sm text-lova-text">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-lova-pink" />
            <span className="text-sm text-lova-text">
              {formatTime(time)} &middot; {duration} minutes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-lova-pink" />
            <span className="text-sm text-lova-text">
              {name} with {organizerName}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onBookAnother}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lova-pink transition-colors hover:text-lova-pink-dark"
      >
        <RotateCcw className="h-4 w-4" />
        Book another meeting
      </button>
    </div>
  );
}
