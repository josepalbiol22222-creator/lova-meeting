"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, UserPlus, ArrowRight } from "lucide-react";

interface BookingFormProps {
  onSubmit: (data: { name: string; email: string }) => void;
  onBack: () => void;
}

export function BookingForm({ onSubmit, onBack }: BookingFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [guestEmails, setGuestEmails] = useState("");
  const [showGuests, setShowGuests] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!firstName.trim()) newErrors.firstName = "Required";
      if (!lastName.trim()) newErrors.lastName = "Required";
      if (!email.trim()) {
        newErrors.email = "Required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Enter a valid email";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        onSubmit({
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
        });
      }, 600);
    },
    [firstName, lastName, email, onSubmit]
  );

  const toggleGuests = useCallback(() => setShowGuests(true), []);

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white/60 px-4 py-3 text-[13.5px] text-lova-text placeholder:text-lova-text-muted/35 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-lova-border/60 focus:border-lova-pink/40 focus:ring-lova-pink/10"
    }`;

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="group mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-lova-text-muted transition-colors hover:text-lova-pink"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>

      <h3 className="mb-6 font-heading text-[19px] font-bold text-lova-text">
        Your details
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-[13px] font-medium text-lova-text">
              First name<span className="ml-0.5 text-lova-pink">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }}
              placeholder="John"
              className={inputClass("firstName")}
            />
            {errors.firstName && <p className="mt-1 text-[11.5px] font-medium text-red-400">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-[13px] font-medium text-lova-text">
              Last name<span className="ml-0.5 text-lova-pink">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }}
              placeholder="Doe"
              className={inputClass("lastName")}
            />
            {errors.lastName && <p className="mt-1 text-[11.5px] font-medium text-red-400">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-lova-text">
            Email<span className="ml-0.5 text-lova-pink">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
            placeholder="john@company.com"
            className={inputClass("email")}
          />
          {errors.email && <p className="mt-1 text-[11.5px] font-medium text-red-400">{errors.email}</p>}
        </div>

        {!showGuests ? (
          <button
            type="button"
            onClick={toggleGuests}
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-lova-pink transition-colors hover:text-lova-pink-dark"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Add guests
          </button>
        ) : (
          <div className="animate-fade-up">
            <label htmlFor="guests" className="mb-1.5 block text-[13px] font-medium text-lova-text">
              Guest emails
            </label>
            <input
              id="guests"
              type="text"
              value={guestEmails}
              onChange={(e) => setGuestEmails(e.target.value)}
              placeholder="guest@company.com"
              className={inputClass("guests")}
            />
            <p className="mt-1 text-[11px] text-lova-text-muted/60">
              Separate multiple emails with commas
            </p>
          </div>
        )}

        <div>
          <label htmlFor="notes" className="mb-1.5 block text-[13px] font-medium text-lova-text">
            Additional notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything you'd like to discuss..."
            rows={3}
            className="w-full resize-none rounded-xl border border-lova-border/60 bg-white/60 px-4 py-3 text-[13.5px] text-lova-text placeholder:text-lova-text-muted/35 backdrop-blur-sm transition-colors focus:border-lova-pink/40 focus:outline-none focus:ring-2 focus:ring-lova-pink/10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-6 py-4 text-[14px] font-semibold text-white shadow-lg shadow-lova-pink/15 transition-all hover:shadow-xl hover:shadow-lova-pink/25 hover:brightness-[1.03] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            Schedule Meeting
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
