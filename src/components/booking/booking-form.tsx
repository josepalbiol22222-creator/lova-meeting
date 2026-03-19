"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
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
    // Simulate network delay for polish
    setTimeout(() => {
      onSubmit({
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
      });
    }, 600);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Back button */}
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
          <FormField
            id="firstName"
            label="First name"
            required
            value={firstName}
            onChange={(v) => { setFirstName(v); clearError("firstName"); }}
            placeholder="John"
            error={errors.firstName}
          />
          <FormField
            id="lastName"
            label="Last name"
            required
            value={lastName}
            onChange={(v) => { setLastName(v); clearError("lastName"); }}
            placeholder="Doe"
            error={errors.lastName}
          />
        </div>

        <FormField
          id="email"
          label="Email"
          required
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); clearError("email"); }}
          placeholder="john@company.com"
          error={errors.email}
        />

        {/* Add guests toggle */}
        {!showGuests ? (
          <button
            type="button"
            onClick={() => setShowGuests(true)}
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-lova-pink transition-colors hover:text-lova-pink-dark"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Add guests
          </button>
        ) : (
          <div className="animate-fade-up">
            <FormField
              id="guests"
              label="Guest emails"
              value={guestEmails}
              onChange={setGuestEmails}
              placeholder="guest@company.com"
            />
            <p className="mt-1 text-[11px] text-lova-text-muted/60">
              Separate multiple emails with commas
            </p>
          </div>
        )}

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="mb-1.5 block text-[13px] font-medium text-lova-text"
          >
            Additional notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything you'd like to discuss..."
            rows={3}
            className="w-full resize-none rounded-xl border border-lova-border/60 bg-white/60 px-4 py-3 text-[13.5px] text-lova-text placeholder:text-lova-text-muted/35 backdrop-blur-sm transition-all duration-200 focus:border-lova-pink/40 focus:outline-none focus:ring-2 focus:ring-lova-pink/10"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-6 py-4 text-[14px] font-semibold text-white shadow-lg shadow-lova-pink/15 transition-all duration-300 hover:shadow-xl hover:shadow-lova-pink/25 hover:brightness-[1.03] disabled:opacity-70 disabled:cursor-not-allowed"
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

function FormField({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-lova-text"
      >
        {label}
        {required && <span className="ml-0.5 text-lova-pink">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-[13.5px] text-lova-text placeholder:text-lova-text-muted/35 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-lova-border/60 focus:border-lova-pink/40 focus:ring-lova-pink/10"
        }`}
      />
      {error && (
        <p className="mt-1 text-[11.5px] font-medium text-red-400">{error}</p>
      )}
    </div>
  );
}
